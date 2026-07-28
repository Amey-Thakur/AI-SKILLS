---
name: live-cursors-and-selection
description: Render other people's cursors and selections so they inform rather than distract, and stay correct as content changes. Use when showing where collaborators are working in a shared document.
---

# Live cursors and selection

Remote cursors are the clearest signal in collaborative editing: they
show where someone is about to change something. They are also the
easiest thing to make annoying, through jitter, clutter, and labels that
cover the text being edited.

## Method

1. **Transform remote positions through local edits.** A cursor position
   sent before your edit must be adjusted for it, or cursors drift and
   land in the wrong place.
2. **Interpolate movement rather than snapping.** Smooth transitions at
   a modest update rate read as natural; discrete jumps read as broken
   (see presence-and-awareness).
3. **Assign stable, distinguishable colours per participant.** Stable
   across the session so people learn them, and chosen for contrast
   against the content rather than for palette aesthetics (see
   color-contrast).
4. **Label on demand, not permanently.** A persistent name tag on every
   cursor covers the document; show the name on hover, on movement, or
   briefly on arrival.
5. **Render selections as a subtle background.** They must be visible
   without competing with the text or with the local user's own
   selection.
6. **Fade idle cursors.** A cursor that has not moved for a while is
   noise, and dimming it keeps attention on active collaborators.
7. **Cap the number rendered.** Beyond a handful, cursors stop being
   informative; summarise the rest as a count.

## Boundaries

- Cursor sharing reveals attention, which is not always welcome, so
  view-only or invisible modes matter (see data-minimization).
- Precise cursor rendering in complex layouts such as tables and
  embedded editors is genuinely hard and often approximated.
- Cursors are an enhancement and must never block editing when their
  channel fails.
