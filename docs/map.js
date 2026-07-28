/*
 * Name: map.js
 * Purpose: Draw the library as a connection map.
 * Description: Reads index.json and lays the catalog out with a small force
 *   simulation, then paints it to a 2D canvas with an optional perspective
 *   projection so the same layout serves both the flat and the rotatable view.
 *   Repulsion uses a spatial hash rather than every pair, which is what keeps
 *   1,250 nodes interactive without a rendering library. Positions come from
 *   the `related` field, so what the map shows is the same structure an agent
 *   reads from the index.
 * Tech Stack: Vanilla JavaScript, Canvas 2D
 * License: MIT
 * Author: Amey Thakur (https://github.com/Amey-Thakur)
 * Date: 2026-07-28
 */
(function () {
  "use strict";

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var tip = document.getElementById("tip");
  var detail = document.getElementById("detail");
  var legend = document.getElementById("legend");
  var linkCountEl = document.getElementById("link-count");

  var C = {};
  function readColors() {
    var s = getComputedStyle(document.documentElement);
    var g = function (n, f) { return (s.getPropertyValue(n) || f).trim(); };
    C.bg = g("--surface", "#1a1815");
    C.line = g("--border", "#322e29");
    C.lineHot = g("--accent", "#d8a24a");
    C.text = g("--text-2", "#c8c0b3");
    C.textDim = g("--text-4", "#857c6e");
    C.accent = g("--accent", "#d8a24a");
    C.skill = g("--text-3", "#a49b8c");
    C.prompt = g("--accent-strong", "#e6b45f");
  }
  window.readColors = readColors;
  readColors();

  /* ---------------------------------------------------------------- state */
  var raw = null;                 // index.json
  var view = { cat: null, entry: null };
  var mode = "cat", dim = 2, minW = 10;   // must match the slider's default
  var focus = null, hover = null, query = "";
  var rotX = -0.35, rotY = 0.6, zoom = 1, panX = 0, panY = 0;
  var settleTicks = 0, settleTarget = 0, rafId = 0;

  /* ------------------------------------------------------------ geometry */
  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return r;
  }

  function project(n, r) {
    var x = n.x, y = n.y, z = dim === 3 ? n.z : 0;
    if (dim === 3) {
      var cy = Math.cos(rotY), sy = Math.sin(rotY);
      var x1 = x * cy - z * sy, z1 = x * sy + z * cy;
      var cx = Math.cos(rotX), sx = Math.sin(rotX);
      var y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
      x = x1; y = y1; z = z2;
    }
    var f = 900, s = dim === 3 ? f / (f + z) : 1;
    return {
      sx: r.width / 2 + (x * zoom * s) + panX,
      sy: r.height / 2 + (y * zoom * s) + panY,
      s: s, z: z,
    };
  }

  /* ------------------------------------------------------------- layout */
  /* Attraction along links, repulsion only between nearby nodes via a spatial
     hash. Comparing every pair would be 780,000 checks per tick at entry level;
     this keeps it to a handful of buckets each. */
  function layout(g, iterations) {
    var nodes = g.nodes, links = g.links;
    var spread = Math.sqrt(nodes.length) * 26;
    nodes.forEach(function (n, i) {
      if (n.x === undefined) {
        var a = i * 2.399963, rr = spread * Math.sqrt(i / nodes.length);
        n.x = Math.cos(a) * rr;
        n.y = Math.sin(a) * rr;
        n.z = (i % 2 ? 1 : -1) * rr * 0.45;
        n.vx = n.vy = n.vz = 0;
      }
    });
    settleTicks = 0;
    settleTarget = iterations;
    g.spread = spread;
    /* Repulsion scales with how much room each node needs, so categories push
       apart hard enough to read while 1,250 entries stay a dense cloud. */
    g.repel = nodes.length <= 240 ? 52000 : 2600;
    g.cell = 46;
  }

  function repel(a, b, k) {
    var ux = a.x - b.x, uy = a.y - b.y, uz = a.z - b.z;
    var d2 = ux * ux + uy * uy + uz * uz + 1;
    var d = Math.sqrt(d2);
    var f = k / d2;
    a.vx += (ux / d) * f; a.vy += (uy / d) * f; a.vz += (uz / d) * f;
    b.vx -= (ux / d) * f; b.vy -= (uy / d) * f; b.vz -= (uz / d) * f;
  }

  function tick(g) {
    var nodes = g.nodes, links = g.links, i, j;
    var k = g.repel;

    if (nodes.length <= 240) {
      /* Few enough nodes to compare every pair, which lays out far more evenly
         than an approximation at this size. */
      for (i = 0; i < nodes.length; i++)
        for (j = i + 1; j < nodes.length; j++) repel(nodes[i], nodes[j], k);
    } else {
      var cell = g.cell, buckets = Object.create(null);
      for (i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var key = ((n.x / cell) | 0) + "," + ((n.y / cell) | 0) + "," + ((n.z / cell) | 0);
        (buckets[key] || (buckets[key] = [])).push(n);
      }
      var keys = Object.keys(buckets);
      for (i = 0; i < keys.length; i++) {
        var parts = keys[i].split(","), bx = +parts[0], by = +parts[1], bz = +parts[2];
        var here = buckets[keys[i]];
        for (var dx = 0; dx <= 1; dx++) for (var dy = -1; dy <= 1; dy++) for (var dz = -1; dz <= 1; dz++) {
          if (dx === 0 && (dy < 0 || (dy === 0 && dz < 0))) continue;   // each pair once
          var other = buckets[(bx + dx) + "," + (by + dy) + "," + (bz + dz)];
          if (!other) continue;
          for (var p = 0; p < here.length; p++)
            for (var q = 0; q < other.length; q++) {
              if (here[p] === other[q]) continue;
              if (other === here && q <= p) continue;
              repel(here[p], other[q], k);
            }
        }
      }
    }

    for (i = 0; i < links.length; i++) {
      var l = links[i], a = l.a, b = l.b;
      var ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z;
      var d = Math.sqrt(ux * ux + uy * uy + uz * uz) + 0.01;
      var f = (d - l.rest) * 0.008 * Math.min(l.w, 10);
      a.vx += (ux / d) * f; a.vy += (uy / d) * f; a.vz += (uz / d) * f;
      b.vx -= (ux / d) * f; b.vy -= (uy / d) * f; b.vz -= (uz / d) * f;
    }

    /* Just enough centering to stop the whole cloud drifting off. */
    for (i = 0; i < nodes.length; i++) {
      var m = nodes[i];
      m.vx -= m.x * 0.0006; m.vy -= m.y * 0.0006; m.vz -= m.z * 0.0006;
      m.vx *= 0.84; m.vy *= 0.84; m.vz *= 0.84;
      m.x += m.vx; m.y += m.vy; m.z += m.vz;
    }
  }

  /* Frame the settled cloud so it fills the canvas whatever its final size. */
  function fitView() {
    var g = graph(), r = canvas.getBoundingClientRect();
    if (!g.nodes.length) return;
    var maxR = 0;
    g.nodes.forEach(function (n) {
      var d = Math.sqrt(n.x * n.x + n.y * n.y + (dim === 3 ? n.z * n.z : 0));
      if (d > maxR) maxR = d;
    });
    if (!maxR) return;
    zoom = Math.min(3, (Math.min(r.width, r.height) * 0.42) / maxR);
    panX = panY = 0;
  }

  /* --------------------------------------------------------------- build */
  function buildCategories() {
    var byCat = Object.create(null), pos = Object.create(null);
    raw.entries.forEach(function (e) {
      (byCat[e.category] || (byCat[e.category] = [])).push(e);
      pos[e.name] = e;
    });
    var nodes = Object.keys(byCat).sort().map(function (c) {
      return { id: c, label: c, count: byCat[c].length, kind: "category",
               r: 5 + Math.sqrt(byCat[c].length) * 2.1 };
    });
    var index = Object.create(null);
    nodes.forEach(function (n) { index[n.id] = n; });

    var pairs = Object.create(null);
    raw.entries.forEach(function (e) {
      (e.related || []).forEach(function (rn) {
        var t = pos[rn];
        if (!t || t.category === e.category) return;
        var k = e.category < t.category ? e.category + "|" + t.category : t.category + "|" + e.category;
        pairs[k] = (pairs[k] || 0) + 1;
      });
    });
    var links = Object.keys(pairs).map(function (k) {
      var p = k.split("|");
      return { a: index[p[0]], b: index[p[1]], w: pairs[k], rest: 230 };
    }).filter(function (l) { return l.a && l.b && l.w >= 3; });
    return { nodes: nodes, links: links, index: index };
  }

  function buildEntries() {
    var nodes = raw.entries.map(function (e) {
      return { id: e.name, label: e.name, kind: e.kind, category: e.category,
               description: e.description, use_when: e.use_when || "",
               path: e.path, related: e.related || [], r: e.kind === "prompt" ? 3.2 : 2.8 };
    });
    var index = Object.create(null);
    nodes.forEach(function (n) { if (!index[n.id]) index[n.id] = n; });
    var seen = Object.create(null), links = [];
    nodes.forEach(function (n) {
      n.related.forEach(function (rn) {
        var t = index[rn];
        if (!t || t === n) return;
        var k = n.id < rn ? n.id + "|" + rn : rn + "|" + n.id;
        if (seen[k]) return;
        seen[k] = 1;
        links.push({ a: n, b: t, w: 1, rest: 42 });
      });
    });
    return { nodes: nodes, links: links, index: index };
  }

  function graph() {
    if (mode === "cat") {
      if (!view.cat) { view.cat = buildCategories(); layout(view.cat, 260); }
      return view.cat;
    }
    if (!view.entry) { view.entry = buildEntries(); layout(view.entry, 200); }
    return view.entry;
  }

  /* ---------------------------------------------------------------- draw */
  function visibleLinks(g) {
    if (mode === "cat") return g.links.filter(function (l) { return l.w >= minW; });
    /* At entry level every link is weight 1, so the slider narrows the view to
       the focused neighbourhood instead, which is what keeps 6,000 edges from
       becoming a solid mass. */
    if (focus) {
      return g.links.filter(function (l) { return l.a === focus || l.b === focus; });
    }
    return g.links;
  }

  function matches(n) {
    if (!query) return false;
    return n.label.indexOf(query) !== -1 ||
      (n.category && n.category.indexOf(query) !== -1) ||
      (n.description && n.description.toLowerCase().indexOf(query) !== -1);
  }

  function draw() {
    var g = graph();
    var r = size();
    ctx.clearRect(0, 0, r.width, r.height);

    var links = visibleLinks(g);
    var pts = g.nodes.map(function (n) { return project(n, r); });
    var byNode = new Map();
    g.nodes.forEach(function (n, i) { byNode.set(n, pts[i]); });

    var dim3 = dim === 3;
    var anyQuery = !!query;
    var neighbours = null;
    if (focus) {
      neighbours = new Set([focus]);
      links.forEach(function (l) { if (l.a === focus) neighbours.add(l.b); if (l.b === focus) neighbours.add(l.a); });
    }

    // links first, faint
    ctx.lineWidth = 1;
    links.forEach(function (l) {
      var pa = byNode.get(l.a), pb = byNode.get(l.b);
      if (!pa || !pb) return;
      var hot = focus && (l.a === focus || l.b === focus);
      ctx.strokeStyle = hot ? C.lineHot : C.line;
      ctx.globalAlpha = hot ? 0.55 : (mode === "cat" ? Math.min(0.5, 0.08 + l.w / 60) : (focus ? 0.06 : 0.13));
      ctx.beginPath();
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(pb.sx, pb.sy);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // nodes, painted back to front so the 3D view reads correctly
    var order = g.nodes.map(function (n, i) { return i; });
    if (dim3) order.sort(function (a, b) { return pts[b].z - pts[a].z; });

    order.forEach(function (i) {
      var n = g.nodes[i], p = pts[i];
      var isHit = anyQuery && matches(n);
      var dimmed = (anyQuery && !isHit) || (neighbours && !neighbours.has(n));
      var rad = Math.max(1.2, n.r * (dim3 ? p.s : 1) * (mode === "cat" ? 1 : 1));
      ctx.globalAlpha = dimmed ? 0.12 : 1;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
      ctx.fillStyle = n === focus ? C.accent
        : isHit ? C.accent
        : n.kind === "prompt" ? C.prompt
        : n.kind === "category" ? C.accent
        : C.skill;
      ctx.fill();
      if (n === hover || n === focus) {
        ctx.strokeStyle = C.accent; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, rad + 3.5, 0, Math.PI * 2); ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;

    // labels: categories always, entries only when few enough to read
    /* Labels are the thing that turns a map into a hairball, so only draw the
       ones a reader can actually use: the biggest categories, whatever is
       hovered or focused, and search hits. */
    ctx.font = '11px "Play", ui-monospace, Consolas, monospace';
    ctx.textAlign = "center";
    var bigEnough = null;
    if (mode === "cat") {
      var sorted = g.nodes.slice().sort(function (a, b) { return b.count - a.count; });
      bigEnough = new Set(sorted.slice(0, anyQuery ? 0 : 22));
    }
    order.forEach(function (i) {
      var n = g.nodes[i], p = pts[i];
      var show = n === focus || n === hover || (anyQuery && matches(n)) ||
        (neighbours && neighbours.has(n)) || (bigEnough && bigEnough.has(n));
      if (!show) return;
      ctx.fillStyle = (n === focus || n === hover) ? C.accent : C.text;
      ctx.globalAlpha = (n === focus || n === hover) ? 1 : 0.8;
      ctx.fillText(n.label, p.sx, p.sy - n.r * (dim === 3 ? p.s : 1) - 6);
    });
    ctx.globalAlpha = 1;

    linkCountEl.textContent = mode === "cat" ? links.length + " links" : (focus ? links.length + " links" : "all");
    legend.innerHTML = mode === "cat"
      ? "<b>" + g.nodes.length + " categories</b><br>dot size = entries<br>line = shared references"
      : "<b>" + g.nodes.length + " entries</b><br>skills and <span style='color:" + C.prompt + "'>prompts</span><br>click one to focus";
  }
  window.draw = draw;

  /* --------------------------------------------------------- animation */
  function frame() {
    var g = graph();
    if (settleTicks < settleTarget) {
      var budget = mode === "cat" ? 6 : 2;
      for (var i = 0; i < budget && settleTicks < settleTarget; i++) { tick(g); settleTicks++; }
      if (settleTicks >= settleTarget) fitView();
      draw();
      rafId = requestAnimationFrame(frame);
      return;
    }
    draw();
    rafId = 0;
  }
  function kick() { if (!rafId) rafId = requestAnimationFrame(frame); }

  /* ------------------------------------------------------- interaction */
  function nodeAt(clientX, clientY) {
    var g = graph(), r = canvas.getBoundingClientRect();
    var mx = clientX - r.left, my = clientY - r.top;
    var best = null, bestD = 18;
    g.nodes.forEach(function (n) {
      var p = project(n, r);
      var d = Math.hypot(p.sx - mx, p.sy - my);
      var hitR = Math.max(6, n.r * (dim === 3 ? p.s : 1) + 4);
      if (d < hitR && d < bestD) { bestD = d; best = n; }
    });
    return best;
  }

  var drag = null;
  canvas.addEventListener("pointerdown", function (e) {
    canvas.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY, moved: false, rx: rotX, ry: rotY, px: panX, py: panY, shift: e.shiftKey };
    canvas.classList.add("dragging");
  });
  canvas.addEventListener("pointermove", function (e) {
    if (drag) {
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      if (dim === 3 && !drag.shift) {
        rotY = drag.ry + dx * 0.006;
        rotX = drag.rx + dy * 0.006;
      } else {
        panX = drag.px + dx;
        panY = drag.py + dy;
      }
      draw();
      return;
    }
    var n = nodeAt(e.clientX, e.clientY);
    if (n !== hover) { hover = n; draw(); }
    if (n) {
      var r = canvas.getBoundingClientRect();
      tip.style.display = "block";
      tip.style.left = Math.min(r.width - 290, e.clientX - r.left + 14) + "px";
      tip.style.top = (e.clientY - r.top + 14) + "px";
      tip.innerHTML = "";
      var nm = document.createElement("span");
      nm.className = "t-name"; nm.textContent = n.label;
      var meta = document.createElement("span");
      meta.className = "t-meta";
      meta.textContent = n.kind === "category"
        ? n.count + " entries"
        : n.kind + " · " + n.category;
      tip.appendChild(nm); tip.appendChild(meta);
      if (n.use_when) {
        var uw = document.createElement("div");
        uw.style.marginTop = "5px";
        uw.textContent = "Use " + n.use_when;
        tip.appendChild(uw);
      }
    } else {
      tip.style.display = "none";
    }
  });
  function endDrag(e) {
    if (!drag) return;
    var wasClick = !drag.moved;
    drag = null;
    canvas.classList.remove("dragging");
    if (wasClick) {
      var n = nodeAt(e.clientX, e.clientY);
      select(n);
    }
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", function () { drag = null; canvas.classList.remove("dragging"); });
  canvas.addEventListener("pointerleave", function () { hover = null; tip.style.display = "none"; draw(); });
  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    zoom = Math.max(0.25, Math.min(6, zoom * (e.deltaY < 0 ? 1.12 : 0.89)));
    draw();
  }, { passive: false });

  /* ------------------------------------------------------------ detail */
  function link(name) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = name;
    b.addEventListener("click", function () {
      var g = graph();
      var t = g.index[name];
      if (t) { select(t); }
    });
    return b;
  }

  function select(n) {
    focus = n || null;
    if (!n) {
      detail.innerHTML = '<p class="empty-state">Click a node to see what it connects to. Drag to rotate, scroll to zoom.</p>';
      draw();
      return;
    }
    detail.innerHTML = "";
    var h = document.createElement("h2");
    h.textContent = n.label;
    var meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = n.kind === "category" ? n.count + " entries" : n.kind + " · " + n.category;
    detail.appendChild(h); detail.appendChild(meta);

    if (n.kind === "category") {
      var g = graph();
      var partners = g.links.filter(function (l) { return l.a === n || l.b === n; })
        .sort(function (a, b) { return b.w - a.w; }).slice(0, 8);
      var h3 = document.createElement("h3");
      h3.textContent = "Most connected to";
      detail.appendChild(h3);
      var ul = document.createElement("ul");
      partners.forEach(function (l) {
        var other = l.a === n ? l.b : l.a;
        var li = document.createElement("li");
        var b = link(other.id);
        b.textContent = other.id + "  ·  " + l.w;
        li.appendChild(b); ul.appendChild(li);
      });
      detail.appendChild(ul);
      var hint = document.createElement("p");
      hint.className = "empty-state";
      hint.textContent = "Switch to Entries to see the skills and prompts inside it.";
      detail.appendChild(hint);
      draw();
      return;
    }

    var d = document.createElement("p");
    d.className = "d";
    d.textContent = n.description;
    detail.appendChild(d);

    if (n.related.length) {
      var h3b = document.createElement("h3");
      h3b.textContent = "Works with";
      detail.appendChild(h3b);
      var ul2 = document.createElement("ul");
      n.related.forEach(function (rn) {
        var li = document.createElement("li");
        li.appendChild(link(rn));
        ul2.appendChild(li);
      });
      detail.appendChild(ul2);
    }
    var open = document.createElement("a");
    open.className = "open";
    open.href = "https://github.com/Amey-Thakur/AI-SKILLS/blob/main/" + n.path;
    open.textContent = "Open " + n.label;
    detail.appendChild(open);
    draw();
  }

  /* ----------------------------------------------------------- controls */
  function press(id, on) { document.getElementById(id).setAttribute("aria-pressed", on ? "true" : "false"); }
  function setMode(m) {
    if (mode === m) return;
    mode = m; focus = null; hover = null;
    press("mode-cat", m === "cat"); press("mode-entry", m === "entry");
    select(null);
    kick();
  }
  function setDim(d) {
    if (dim === d) return;
    dim = d;
    press("dim-2d", d === 2); press("dim-3d", d === 3);
    draw();
  }
  document.getElementById("mode-cat").addEventListener("click", function () { setMode("cat"); });
  document.getElementById("mode-entry").addEventListener("click", function () { setMode("entry"); });
  document.getElementById("dim-2d").addEventListener("click", function () { setDim(2); });
  document.getElementById("dim-3d").addEventListener("click", function () { setDim(3); });
  document.getElementById("link-strength").addEventListener("input", function (e) {
    minW = Number(e.target.value);
    draw();
  });
  var searchEl = document.getElementById("map-search");
  searchEl.addEventListener("input", function (e) {
    query = e.target.value.trim().toLowerCase();
    draw();
  });
  searchEl.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || !query) return;
    var g = graph();
    var hit = g.nodes.filter(matches)[0];
    if (hit) { if (mode !== "entry" && hit.kind !== "category") setMode("entry"); select(hit); }
  });
  window.addEventListener("resize", function () { draw(); });

  /* --------------------------------------------------------------- load */
  fetch("index.json").then(function (r) { return r.json(); }).then(function (data) {
    raw = data;
    /* Paint once straight away. The settling loop runs on requestAnimationFrame,
       which does not fire while the tab is in the background, and without this
       the map would stay blank until the tab was focused. */
    draw();
    kick();
  }).catch(function () {
    detail.innerHTML = '<p class="empty-state">Could not load the catalog. ' +
      'Browse the library on the <a href="./">home page</a> instead.</p>';
    legend.textContent = "";
  });
})();
