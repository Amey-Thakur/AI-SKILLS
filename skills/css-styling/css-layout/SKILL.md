---
name: css-layout
description: Choose between flexbox and grid by content shape and build layouts that survive real content. Use when structuring a page or component layout, or fixing overflow and alignment bugs.
---

# CSS layout

Flexbox distributes space along one axis from the content out; grid assigns
space in two axes from the container in. Choose by which side should be in
charge.

## Method

1. **One axis: flex. Two axes: grid.** A toolbar, nav row, or centered
   stack is flex. A page shell, card grid, or form with aligned labels is
   grid. If you are nesting three flex containers to fake rows and
   columns, it was grid all along.
2. **Let intrinsic sizing work.** `min-width: auto` on flex children
   blocks shrinking below content size and causes the classic overflow;
   fix with `min-width: 0` on the child that should truncate. In grid,
   prefer `minmax(0, 1fr)` over bare `1fr` for the same reason.
3. **Reach for the stock recipes.**
   - Center anything: `display: grid; place-items: center`.
   - Sidebar: `grid-template-columns: minmax(150px, 25%) 1fr`.
   - Responsive cards without media queries:
     `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))`.
   - Sticky footer: grid rows `auto 1fr auto` on the page shell.
4. **Space with gap, not margins.** `gap` belongs to the container and
   cannot double up or leak outside; margins on children fight collapse
   rules and edge cases. Margins are for one-off exceptions.
5. **Name grid areas for anything structural.** `grid-template-areas`
   makes the layout readable in devtools and lets a media query rearrange
   the page by reassigning areas, touching no child selectors.
6. **Test with hostile content.** The 40-character German compound word,
   the empty list, the 3-line title where you expected one. A layout that
   only works with lorem ipsum is not done; `overflow-wrap: break-word`
   and `text-overflow: ellipsis` decisions belong in the design, not the
   bug queue.

## Boundaries

- Do not position with absolute offsets what flow can lay out; absolute
  positioning is for overlays and adornments, and it removes the element
  from everyone else's layout math.
- Floats are for wrapping text around images, nothing else.
- Container queries change what a child can respond to; see
  responsive-design for when component-level response beats page-level.
