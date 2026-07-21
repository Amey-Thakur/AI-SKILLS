---
name: visual-hierarchy
description: Guide the eye to what matters through size, contrast, spacing, and grouping so a screen reads at a glance. Use when a design feels cluttered, flat, or hard to scan, or when laying out any interface or page.
---

# Visual hierarchy

Visual hierarchy is the order in which the eye takes in a screen. When it
matches the importance of the content, the interface reads effortlessly;
when everything shouts equally, the user is lost. The tools are few
(size, weight, color, space, position) and the discipline is restraint.

## Method

1. **Decide the importance order first.** Before styling, rank what
   matters on this screen: the one primary action, the key information,
   the secondary options, the rarely-needed. Design cannot make everything
   prominent; deciding what recedes is as important as what stands out.
2. **Use size and weight for the biggest signals.** Larger and bolder
   reads as more important; the eye goes there first. A clear type scale
   (a few sizes, used consistently) creates hierarchy across headings,
   body, and captions (see web-typography, design-systems). Reserve the
   largest, boldest treatment for the genuinely most important.
3. **Use contrast to draw and color to mean.** High contrast pulls
   attention (the primary button is the boldest thing; secondary actions
   recede to outline or text). Give color meaning (one accent for the
   primary action, semantic colors for status), and do not spend attention
   on decoration (see css-theming, dark-mode). Everything emphasized means
   nothing emphasized.
4. **Let whitespace do the work.** Space separates and groups more
   powerfully than lines and boxes. Generous space around an element makes
   it prominent; tight space binds related things together. Crowded
   designs read as cluttered because nothing has room to matter; space is
   not wasted, it is structure (see css-layout).
5. **Group by proximity and alignment.** Related things go together and
   line up; unrelated things get separated. The eye reads aligned,
   grouped elements as organized and scans them fast; scattered,
   misaligned ones read as chaos. Consistent alignment is most of what
   makes a layout feel designed.
6. **Guide the scan path.** People scan in predictable patterns (top-left
   first, F- and Z-shaped for text-heavy and sparse layouts). Place the
   most important thing where the eye lands, and sequence the flow down
   the priority order. Test by squinting: the blur should still show what
   matters most.

## Boundaries

- Hierarchy serves the content's real priorities; imposing drama on a
  screen where everything is genuinely equal (a data table) is wrong. Not
  every screen needs a hero.
- Visual prominence and accessibility differ: contrast for hierarchy must
  still meet contrast ratios for legibility, and color must not be the
  only signal (see color-contrast, accessibility-review).
- Restraint is the hardest part: the urge to emphasize everything and add
  more is what destroys hierarchy. When in doubt, remove and calm down,
  do not add (see usability-heuristics' minimalism).
