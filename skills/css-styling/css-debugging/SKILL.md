---
name: css-debugging
description: Diagnose layout, stacking, and overflow bugs by isolating the failing rule with devtools instead of guessing. Use when an element is misplaced, invisible, unscrollable, or styled by something you cannot find.
---

# CSS debugging

CSS bugs are always one of a small set: the wrong rule won, the box is not
the size you think, the element is in a different formatting or stacking
context than you assume. Identify which, then the fix is mechanical.

## Method

1. **Read the computed pane before writing CSS.** Select the element:
   Computed shows the final value and links the winning rule; Styles
   shows every loser struck through. This answers "why is my rule
   ignored" in seconds (specificity, layer, or a typo'd property shown in
   yellow).
2. **See the real boxes.** Toggle the box-model inspector and hover the
   layout overlays (grid/flex badges in devtools). Half of "it moved 3px"
   is margin collapse, an inline element's line-height, or default
   `min-width: auto` on a flex child; the overlay shows it instantly.
3. **Bisect the DOM for mystery overflow.** For "the page scrolls
   sideways somewhere": `* { outline: 1px solid red }` (outline, not
   border, so layout is untouched), or delete DOM halves in the inspector
   until the culprit disappears. `overflow: clip` on a suspect confirms
   it.
4. **Debug stacking as contexts, not z-index values.** If z-index 9999
   loses, the element is inside a stacking context whose root sits lower.
   Walk ancestors for what creates contexts: transform, opacity < 1,
   filter, position+z-index, isolation. Fix at the context root or
   restructure; raising the number cannot escape the context.
5. **Check scrolling prerequisites as a chain.** A scroll container
   needs: a constrained size (something above it must limit height),
   `overflow: auto`, and content bigger than the box. "It won't scroll"
   is always a break in that chain, usually a parent without a height and
   a missing `min-height: 0` in a flex/grid column.
6. **Reduce before reporting or fixing.** Recreate the bug in a minimal
   pen with three elements. Either the reduction shows the misconception,
   or you have a browser-difference test case worth checking against
   another engine and filing.

## Boundaries

- Specificity wars are a design smell, not a debugging target; see
  css-cascade for the structural fix.
- Pixel differences across browsers in sub-pixel rounding and font
  rasterization are not bugs; do not chase identical rendering.
- If the fix requires `!important` or a magic number you cannot explain,
  you found a symptom; keep digging or document the constraint inline.
