---
name: list-virtualization
description: Virtualize long lists so only visible rows mount, with correct handling of dynamic heights and scroll anchoring. Use when a long list or table janks, or before building any list that can grow unbounded.
---

# List virtualization

Rendering ten thousand DOM nodes is slow to mount, slow to scroll, and heavy
in memory. Virtualization renders only the rows in view plus a small buffer,
recycling nodes as the user scrolls.

## Method

1. **Virtualize by count and cost, not on instinct.** The threshold is where
   mount or scroll actually janks: usually a few hundred rows, sooner if each
   row is heavy (images, charts). Below that, virtualization adds complexity
   and breaks Ctrl+F, so measure first. Prefer pagination or "load more" when
   the data is genuinely unbounded; virtualization and paging compose.
2. **Reach for a maintained windowing library.** Use TanStack Virtual,
   react-window, or react-virtuoso rather than hand-rolling scroll math. They
   handle the absolute-positioned viewport, the translated inner container, the
   overscan buffer, and edge cases you will otherwise rediscover as bugs.
3. **Measure dynamic row heights; do not guess them wrong.** If rows vary in
   height, use the library's dynamic-measurement mode (a `measureElement` ref
   or `estimateSize` plus remeasure) so the scrollbar and offsets stay
   accurate. A fixed estimate on variable content makes the scrollbar lie and
   the list jump. Fixed-height rows are far simpler; use them when you can.
4. **Preserve scroll position when content shifts (anchoring).** When items
   prepend above the viewport (loading older messages, a growing feed), anchor
   scroll to a stable item so the view does not jump. Maintain the scroll
   offset relative to an anchor element across the insert, or use the library's
   scroll-anchoring support. This is the classic chat-scroll bug.
5. **Keep keys stable and rows pure.** Key each row by a stable id, never by
   index, or recycling will reassign state to the wrong row. Memoize row
   components and pass primitive props so scrolling does not re-render every
   visible row. An expensive, non-memoized row defeats the windowing win.
6. **Do not break accessibility and find-in-page silently.** Virtualized
   off-screen rows are not in the DOM, so screen-reader traversal and browser
   find skip them. Provide a search or filter over the full dataset, set proper
   list/grid roles and `aria-rowcount`, and keep keyboard navigation working
   across the windowed boundary.

## Boundaries

- Short or bounded lists do not need this; it trades findability and
  complexity for a scroll win that small lists do not require.
- Horizontal virtualization and virtualized grids add axis complexity beyond
  this vertical-list method.
- Print, export, and full-text search over the whole dataset must read the
  source data, not the mounted rows.
