---
name: browser-devtools
description: Debug a slow or broken web page with the browser's built-in tools: the network waterfall, the performance panel, and source maps back to original code. Use when a page loads slowly, janks while running, or throws in minified bundle code you cannot read.
---

# Browser DevTools

The browser already records everything a page does: every request, every
frame, every stack. The trouble is that the evidence is minified, interleaved,
and spread across four panels, so people reload and squint instead of reading
it. Learning where each fact lives turns a vague "it feels slow" into a named
request or function.

## Method

1. **Read the network waterfall left to right, not top to bottom.** Open the
   Network panel, reload, and sort by start time. A staircase where each
   request waits for the previous is a dependency chain to break; a wall of
   requests starting together but stalled is connection or priority
   contention. Hover a bar to split DNS, connect, TLS, TTFB, and download.
2. **Chase the long TTFB versus the long download separately.** A bar that is
   mostly the green wait segment is the server thinking; the fix is backend or
   caching. A bar mostly blue transfer is payload size; the fix is compression
   or a smaller asset. The waterfall segment colors tell you which team owns
   the delay.
3. **Record a performance trace around the actual jank.** In the Performance
   panel, click record, do the slow interaction, stop. Find the long task,
   the gray block over 50ms that blocks the main thread, and expand its flame
   chart. Wide yellow is scripting, purple is layout and reflow, green is
   paint: the color says whether to fix JS or CSS.
4. **Wire up source maps before reading any stack.** A stack trace into
   `bundle.min.js:1:48213` is useless. Confirm the build emits source maps and
   DevTools loads them (Sources shows original file names), so exceptions,
   breakpoints, and the performance flame chart all point at the `.ts` or
   `.jsx` you wrote instead of the compiled blob.
5. **Catch layout thrash in the performance trace.** Repeated purple layout
   bars interleaved with scripting mean code is reading a geometry property
   like `offsetHeight` and then writing style in a loop, forcing synchronous
   reflow each pass. Batch the reads, then the writes, and the purple
   collapses.
6. **Confirm the fix with an apples-to-apples reload.** Set the Network panel
   to disable cache and throttle to "Fast 3G" or a fixed CPU slowdown so the
   before and after run under identical conditions. A change that only helps
   on your warm cache and fast machine has not helped a user.

## Signals

- Can you name the single request or long task that owns most of the delay?
- Do stack traces and the flame chart resolve to original source, not bundles?
- Does the improvement hold under throttling and a disabled cache?

## Boundaries

DevTools measures one page in one browser on your machine. Field performance
across real devices needs Real User Monitoring, and a bug that only appears in
another engine belongs in that browser's own tools. Backend latency behind a
slow TTFB is a server problem this panel can only point at.
