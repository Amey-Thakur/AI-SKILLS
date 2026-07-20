---
name: responsive-design
description: Build layouts that adapt through fluid sizing, container queries, and content-driven breakpoints. Use when making a design work across screen sizes or replacing a brittle pile of media queries.
---

# Responsive design

Modern responsiveness is mostly not media queries: it is fluid values and
intrinsically flexible layouts, with queries reserved for genuine
rearrangement.

## Method

1. **Start mobile, one column, content in priority order.** The narrow
   view forces the hierarchy conversation; widening is additive. Desktop-
   first CSS accumulates unsetting rules (`float: none`, `width: auto`)
   that exist only to undo itself.
2. **Make size fluid before making it conditional.**
   `font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem)` and spacing built
   from the same pattern remove entire classes of breakpoints. Grid
   `auto-fit`/`minmax` handles card layouts with zero queries (see
   css-layout).
3. **Break where the content breaks, not at device names.** Widen the
   window until the design looks wrong; that width is the breakpoint.
   Device-name breakpoints (768px "tablet") encode 2015's hardware into
   your stylesheet.
4. **Query the container for components.** A card in a sidebar and the
   same card full-width need different layouts at the same viewport size.
   `container-type: inline-size` on the wrapper, then
   `@container (min-width: 24rem)` in the component. Media queries remain
   for page-level rearrangement and user preferences.
5. **Handle the non-width axes.** `@media (prefers-reduced-motion)`,
   `(prefers-color-scheme)`, `(hover: none)` for touch, and dynamic
   viewport units (`dvh`) so mobile browser chrome does not eat your
   full-height layouts. Test landscape phones; 400px tall is real.
6. **Let images do their part.** `srcset`/`sizes` for resolution,
   `aspect-ratio` to reserve space against layout shift,
   `object-fit: cover` for art-directed crops.

## Boundaries

- Hiding content at small sizes is a product decision, not a CSS
  convenience; if it is not worth showing on mobile, question whether it
  is worth showing at all.
- Fluid type needs floor and ceiling; unclamped viewport math fails
  accessibility zoom and ultrawide monitors.
- JS-measured breakpoints drift from CSS ones; if scripts must know the
  layout, read a custom property set by the same query.
