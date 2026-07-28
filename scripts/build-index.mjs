// Build every generated catalog artifact from the skills/ and prompts/
// folders, so nothing machine-readable can drift from the actual content.
// Run from the repository root after adding or editing entries:
//
//   node scripts/build-index.mjs
//
// Produces: index.json (+ docs/ copy), llms.txt, CATALOG.md, the README
// category table, and .claude-plugin/marketplace.json. Reads only
// frontmatter; fails loudly on a malformed entry rather than emitting a
// partial catalog.

import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const RAW_BASE = "https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main";
const SITE = "https://amey-thakur.github.io/AI-SKILLS/";

function frontmatter(path) {
  const text = readFileSync(path, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`No frontmatter in ${path}`);
  const fields = {};
  let currentKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const raw = kv[2].trim();
      /* A YAML plain scalar may not contain ": ", so an unquoted value with a
         colon makes the whole block unparseable for every real YAML loader
         (Claude Code, Cursor) even though this regex reader would accept it.
         Reject it here rather than shipping a skill that silently fails to
         load. Quote the value in the file to fix. */
      if (!/^["']/.test(raw) && /:\s/.test(raw)) {
        throw new Error(
          `Unquoted "${currentKey}" contains ": " in ${path}\n` +
            `  ${raw}\n  Wrap the value in double quotes so the frontmatter is valid YAML.`
        );
      }
      fields[currentKey] = raw.replace(/^"(.*)"$/, "$1");
    } else if (/^\s+-\s+/.test(line) && currentKey) {
      if (!Array.isArray(fields[currentKey])) fields[currentKey] = [];
      fields[currentKey].push(line.replace(/^\s+-\s+/, "").replace(/^"(.*)"$/, "$1"));
    }
  }
  if (!fields.name || !fields.description) {
    throw new Error(`Missing name or description in ${path}`);
  }
  return fields;
}

const entries = [];
const seenNames = new Set();

for (const category of readdirSync("skills").sort()) {
  if (!statSync(join("skills", category)).isDirectory()) continue;
  for (const dir of readdirSync(join("skills", category)).sort()) {
    const path = join("skills", category, dir, "SKILL.md");
    statSync(path); // throws if a skill folder lacks its SKILL.md
    const fm = frontmatter(path);
    if (fm.name !== dir) throw new Error(`Name mismatch: folder ${dir} vs name ${fm.name}`);
    if (seenNames.has(fm.name)) throw new Error(`Duplicate skill name: ${fm.name}`);
    seenNames.add(fm.name);
    /* Every skill description ends with a trigger sentence ("Use when ...",
       and a few "Use after / at / in ..."). Lift it into its own field, minus
       the leading "Use ", so it reads as a "when to reach for this" clause and
       an agent can select from the index alone without fetching each file. */
    const triggerSentence = fm.description
      .split(/(?<=[.!?])\s+/)
      .reverse()
      .find((s) => /^Use\s+\S/i.test(s.trim()));
    if (!triggerSentence) {
      throw new Error(
        `No "Use ..." trigger sentence in ${path}\n` +
          `  Agents select from index.json on use_when, so a skill without one is unfindable.`
      );
    }
    const useWhen = triggerSentence
      .trim()
      .replace(/^Use\s+/i, "")
      .replace(/[.!?]+$/, "");
    entries.push({
      kind: "skill",
      name: fm.name,
      category,
      description: fm.description,
      ...(useWhen ? { use_when: useWhen } : {}),
      path: `skills/${category}/${dir}/SKILL.md`,
      raw_url: `${RAW_BASE}/skills/${category}/${dir}/SKILL.md`,
    });
  }
}

for (const file of readdirSync("prompts").sort()) {
  if (!file.endsWith(".md")) continue;
  const path = join("prompts", file);
  const fm = frontmatter(path);
  if (fm.name !== file.replace(/\.md$/, "")) {
    throw new Error(`Name mismatch: file ${file} vs name ${fm.name}`);
  }
  entries.push({
    kind: "prompt",
    name: fm.name,
    category: "prompts",
    description: fm.description,
    variables: Array.isArray(fm.variables) ? fm.variables : [],
    settings: fm.settings ?? "",
    path: `prompts/${file}`,
    raw_url: `${RAW_BASE}/prompts/${file}`,
  });
}

const skills = entries.filter((e) => e.kind === "skill");
const prompts = entries.filter((e) => e.kind === "prompt");
const categories = [...new Set(skills.map((e) => e.category))];

/* Related entries, computed rather than hand-maintained.
   ------------------------------------------------------
   An agent selecting from this index gets `use_when` to find one entry, but
   nothing to tell it which entries work together, so composing a task across
   several (draft with a prompt, raise the bar with a skill) means guessing.
   Authored "(see x)" cross-references cover only part of the library, so they
   are used as a signal here rather than as the whole answer: TF-IDF over each
   entry's name, description and method lead-ins, cosine similarity, with a
   bonus where one entry already cites the other. Every entry gets neighbours,
   including the ones nothing links to. */
const RELATED_COUNT = 5;
{
  const STOP = new Set(
    ("the a an and or of to in for on with is are be that this it as by from at not you your we our " +
      "can will if when what how use used using make makes made than then so such into over under about " +
      "after before between during without within across each every both few more most other some any all " +
      "one two three which who whose there here their its them they").split(" "),
  );
  const tokenize = (s) =>
    s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

  const docs = entries.map((e) => {
    const raw = readFileSync(e.path, "utf8");
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
    const leads = [...body.matchAll(/^\d+\.\s+\*\*(.+?)\*\*/gm)].map((m) => m[1]).join(" ");
    const heads = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) => m[1]).join(" ");
    const words = e.name.replace(/-/g, " ");
    /* Name and description carry the intent, so they count twice. */
    const cites = new Set();
    const flat = raw.replace(/-\r?\n\s*/g, "-").replace(/\s+/g, " ");
    for (const m of flat.matchAll(/\(([^)]*\bsee\b[^)]*)\)/g))
      for (const t of m[1].matchAll(/[a-z0-9]+(?:-[a-z0-9]+)*/g)) cites.add(t[0]);
    return { terms: tokenize([words, words, e.description, e.description, leads, heads].join(" ")), cites };
  });

  const n = entries.length;
  const df = new Map();
  for (const d of docs) for (const t of new Set(d.terms)) df.set(t, (df.get(t) || 0) + 1);

  const vectors = docs.map((d) => {
    const tf = new Map();
    for (const t of d.terms) tf.set(t, (tf.get(t) || 0) + 1);
    const v = new Map();
    let norm = 0;
    for (const [t, f] of tf) {
      const w = (1 + Math.log(f)) * Math.log(n / (df.get(t) || 1));
      if (w <= 0) continue;
      v.set(t, w);
      norm += w * w;
    }
    norm = Math.sqrt(norm) || 1;
    for (const [t, w] of v) v.set(t, w / norm);
    return v;
  });

  /* Inverted index so this stays linear in practice; terms that appear in a
     large share of the library carry no signal and are skipped. */
  const postings = new Map();
  vectors.forEach((v, i) => {
    for (const [t, w] of v) {
      if (!postings.has(t)) postings.set(t, []);
      postings.get(t).push([i, w]);
    }
  });

  const index_of = new Map(entries.map((e, i) => [e.name, i]));
  entries.forEach((e, i) => {
    const score = new Float64Array(n);
    for (const [t, w] of vectors[i]) {
      const posting = postings.get(t);
      if (!posting || posting.length > 400) continue;
      for (const [j, w2] of posting) score[j] += w * w2;
    }
    const ranked = [];
    for (let j = 0; j < n; j++) {
      /* Skip by name, not just by index: six names are shared by a skill and a
         prompt, and listing that twin here would read as a self-reference. The
         pairing is not lost, since the shared name finds it. */
      if (entries[j].name === e.name) continue;
      let s = score[j];
      if (docs[i].cites.has(entries[j].name)) s += 0.35;
      if (docs[j].cites.has(e.name)) s += 0.2;
      if (s > 0.06) ranked.push([j, s]);
    }
    ranked.sort((a, b) => b[1] - a[1]);
    /* Deduplicate by name for the same reason: a shared name would otherwise
       occupy two of the five slots and resolve ambiguously. */
    const picked = [];
    const taken = new Set();
    for (const [j] of ranked) {
      const nm = entries[j].name;
      if (taken.has(nm)) continue;
      taken.add(nm);
      picked.push(nm);
      if (picked.length === RELATED_COUNT) break;
    }
    e.related = picked;
    if (index_of.size && e.related.some((r) => !index_of.has(r))) {
      throw new Error(`Computed a related entry that does not exist, for ${e.name}`);
    }
  });
}

const index = {
  name: "AI Skills",
  description: "Plug-and-play skills and prompts for every AI coding agent.",
  homepage: SITE,
  repository: "https://github.com/Amey-Thakur/AI-SKILLS",
  ecosystem_index: `${RAW_BASE}/ecosystem.json`,
  license: "MIT",
  /* Self-describing operating instructions, so an agent that fetches only this
     index knows how to use the library without any user prompting. */
  agents: {
    autonomous: true,
    protocol:
      "Operate without the user naming a skill. For any task: name its intent; " +
      "match it against each skill's `use_when` trigger or each prompt's " +
      "`description`; take the 1-3 entries that genuinely fit; fetch each " +
      "entry's `raw_url` and apply it; then check the entry's own guardrail " +
      "section (`## Boundaries`, `## Rules`, or `## Litmus tests`) before " +
      "finishing. Prefer one strong match to several loose ones. Once you " +
      "have a match, its `related` field lists the five nearest entries, " +
      "which is where the companion prompt for a skill, or the skill that " +
      "raises the bar on a prompt's draft, usually is; judge each against " +
      "its own `use_when` before using it.",
    guide: `${RAW_BASE}/AGENTS.md`,
    llms_txt: `${RAW_BASE}/llms.txt`,
  },
  count: { skills: skills.length, prompts: prompts.length, categories: categories.length },
  categories,
  entries,
};

writeFileSync("index.json", JSON.stringify(index, null, 2) + "\n");
/* The website is served from docs/, so it gets its own copy of the catalog
   and of the ecosystem index. */
writeFileSync(join("docs", "index.json"), JSON.stringify(index, null, 2) + "\n");
writeFileSync(join("docs", "ecosystem.json"), readFileSync("ecosystem.json"));

/* llms.txt: grouped by category so an agent can skim to the right section. */
const llms = [
  "# AI Skills",
  "",
  "> Plug-and-play skills and prompts for every AI coding agent. Each entry",
  "> below is self-contained markdown, fetchable at its URL. Skills are working",
  "> methods to follow; prompts are templates to fill and run. See AGENTS.md",
  "> for usage rules. Beyond this library, ecosystem.json indexes every major",
  "> skill collection on GitHub (8,000+ skills reachable):",
  `> ${RAW_BASE}/ecosystem.json`,
  "",
  "## Use this autonomously",
  "",
  "You do not need the user to name a skill. For any task: (1) name the task's",
  "intent; (2) scan the entries below and match on each skill's \"Use when\"",
  "trigger or each prompt's description; (3) take the 1-3 that genuinely fit;",
  "(4) fetch the entry's URL and apply it; (5) check the entry's own guardrail",
  "section (\"Boundaries\", \"Rules\", or \"Litmus tests\") before finishing.",
  `Full protocol: ${RAW_BASE}/AGENTS.md`,
  "",
];
for (const cat of categories) {
  llms.push(`## Skills: ${cat}`, "");
  for (const e of skills.filter((s) => s.category === cat)) {
    llms.push(`- [${e.name}](${e.raw_url}): ${e.description}`);
  }
  llms.push("");
}
llms.push("## Prompts", "");
for (const e of prompts) llms.push(`- [${e.name}](${e.raw_url}): ${e.description}`);
llms.push("");
writeFileSync("llms.txt", llms.join("\n"));

/* CATALOG.md: the complete human-browsable listing, grouped by category. */
const catalog = [
  "# Catalog",
  "",
  `Every entry in the library: ${skills.length} skills in ${categories.length}`,
  `categories, plus ${prompts.length} prompts. Generated by`,
  "`scripts/build-index.mjs`; edit the entries, not this file.",
  "",
];
for (const cat of categories) {
  const list = skills.filter((s) => s.category === cat);
  catalog.push(`## ${cat} (${list.length})`, "");
  for (const e of list) catalog.push(`- [**${e.name}**](${e.path}): ${e.description}`);
  catalog.push("");
}
catalog.push(`## prompts (${prompts.length})`, "");
for (const e of prompts) catalog.push(`- [**${e.name}**](${e.path}): ${e.description}`);
catalog.push("");
writeFileSync("CATALOG.md", catalog.join("\n"));

/* README table between markers: one row per category, linking into the
   catalog, so the README stays readable at any library size. */
const anchor = (cat, n) => `${cat}-${n}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
const tableLines = [
  "| Category | Skills | For example |",
  "|---|---|---|",
];
for (const cat of categories) {
  const list = skills.filter((s) => s.category === cat);
  const sample = list.slice(0, 3).map((e) => e.name).join(", ");
  tableLines.push(`| [${cat}](CATALOG.md#${anchor(cat, list.length)}) | ${list.length} | ${sample} |`);
}
tableLines.push(
  `| [prompts](CATALOG.md#${anchor("prompts", prompts.length)}) | ${prompts.length} | ${prompts
    .slice(0, 3)
    .map((e) => e.name)
    .join(", ")} |`,
);
const readme = readFileSync("README.md", "utf8");
if (!readme.includes("<!-- library:start -->")) {
  throw new Error("README is missing the library markers");
}
writeFileSync(
  "README.md",
  readme.replace(
    /<!-- library:start -->[\s\S]*<!-- library:end -->/,
    `<!-- library:start -->\n${tableLines.join("\n")}\n<!-- library:end -->`,
  ),
);

/* Slash commands: every prompt, regenerated as a Claude Code command so it
   installs plug-and-play (/summarize, /goal, and the rest). The same plain
   markdown drops into any other tool that reads a commands folder. */
mkdirSync("commands", { recursive: true });
const commandFiles = [];
for (const p of prompts) {
  const raw = readFileSync(p.path, "utf8");
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
  const firstVar = p.variables[0]
    ? String(p.variables[0]).replace(/^\{?([\w-]+)\}?.*$/, "$1")
    : "input";
  const desc = p.description.replace(/\s+/g, " ").trim();
  const command = [
    "---",
    `description: ${JSON.stringify(desc)}`,
    `argument-hint: ${JSON.stringify(`[${firstVar}]`)}`,
    "---",
    "",
    "You were invoked as a slash command. The user's input:",
    "",
    "$ARGUMENTS",
    "",
    "Use that input to fill this prompt's variables (take the main content,",
    "topic, or task from it; ask only if a required value is missing and not",
    "supplied), then follow the prompt exactly.",
    "",
    "---",
    "",
    body,
    "",
  ].join("\n");
  writeFileSync(join("commands", `${p.name}.md`), command);
  commandFiles.push(`./commands/${p.name}.md`);
}
/* Commands are generated, so the folder must mirror prompts/ exactly. Without
   this, renaming or deleting a prompt would leave its old command behind and
   ship a slash command backed by nothing. */
const expected = new Set(prompts.map((p) => `${p.name}.md`));
for (const file of readdirSync("commands")) {
  if (file.endsWith(".md") && !expected.has(file)) {
    rmSync(join("commands", file));
    console.log(`removed stale command: commands/${file}`);
  }
}

/* Claude Code marketplace: one plugin per category, generated so the listing
   can never drift from the folders. */
const marketplace = {
  name: "ai-skills",
  owner: { name: "Amey Thakur", email: "ameythakur20@gmail.com" },
  metadata: {
    description: "Plug-and-play skills and prompts for every AI coding agent",
    version: "2.0.0",
  },
  plugins: [
    ...categories.map((cat) => {
      const list = skills.filter((s) => s.category === cat);
      /* Name a handful, then say "and more" only when more actually exist:
         a category with four skills lists all four and must not claim a
         fifth. */
      const shown = list.slice(0, 4).map((e) => e.name).join(", ");
      return {
        name: `${cat}-skills`,
        description:
          `${list.length} working methods for ${cat.replace(/-/g, " ")}: ${shown}` +
          (list.length > 4 ? ", and more" : ""),
        source: "./",
        strict: false,
        skills: list.map((e) => `./skills/${cat}/${e.name}`),
      };
    }),
    {
      name: "ai-skills-commands",
      description: `${prompts.length} ready-to-run prompts as slash commands: summarize, tldr, explain, plan, goal, autoresearch, and more`,
      source: "./",
      strict: false,
      commands: commandFiles,
    },
  ],
};
writeFileSync(
  join(".claude-plugin", "marketplace.json"),
  JSON.stringify(marketplace, null, 2) + "\n",
);

console.log(
  `index.json + llms.txt + CATALOG.md + README table + marketplace.json: ` +
    `${skills.length} skills in ${categories.length} categories, ${prompts.length} prompts`,
);
