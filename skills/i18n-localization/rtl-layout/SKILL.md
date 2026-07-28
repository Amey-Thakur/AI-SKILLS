---
name: rtl-layout
description: Support right-to-left languages by mirroring layout, icons, and interactions while leaving numbers and code untouched. Use when adding Arabic, Hebrew, Persian, or Urdu support to an interface.
---

# RTL layout

Right-to-left support is a mirroring problem, not a translation problem.
The text direction flips, and with it the reading order, the alignment,
the direction of progress, and most directional icons. What does not
flip is as important as what does.

## Method

1. **Use logical properties instead of physical ones.** Start and end
   rather than left and right in spacing, alignment, and borders lets one
   stylesheet serve both directions (see css-architecture).
2. **Set direction at the document root from the locale.** A single dir
   attribute drives the browser's own bidirectional algorithm, which
   handles most inline text correctly without intervention.
3. **Mirror directional icons, not all icons.** Back arrows, progress
   indicators, and chevrons flip; a clock, a checkmark, or a logo does
   not. Mirroring everything looks broken in a different way.
4. **Leave numbers, code, and identifiers alone.** Digits, URLs, and code
   samples read left to right inside RTL text, and forcing them to flip
   corrupts meaning.
5. **Check mixed-direction strings.** A Latin product name inside an
   Arabic sentence is where bidirectional rendering goes wrong, and it
   needs testing with real mixed content rather than pure samples.
6. **Test interactions, not just appearance.** Swipe directions, sliders,
   carousels, and keyboard arrow behaviour all carry directional meaning
   that a visual review misses.

## Boundaries

- RTL affects layout and direction; it does not change the translation
  itself, which remains a separate workstream.
- Some scripts need larger line height and different fonts to render
  legibly, which is typography rather than direction.
- Automatic flipping tools handle common cases and mis-flip icons and
  images, so the output still needs review.
