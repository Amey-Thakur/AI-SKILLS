---
name: css-cascade
description: Manage specificity with layers, :where, and low-specificity selectors so overrides stay predictable. Use when styles fight each other, !important spreads, or you are setting selector conventions for a codebase.
---

# CSS cascade

Every "CSS is broken" bug is the cascade working exactly as specified.
Win by keeping specificity low and flat, so source order and layers decide,
and by knowing the resolution order cold.

## Method

1. **Know the order that decides.** Importance, then origin, then cascade
   layer, then specificity, then source order. Inline styles and
   `!important` invert layer logic; a `style` attribute beats any selector,
   and `!important` in an earlier layer beats later layers.
2. **Structure with @layer.** Declare once, in order of increasing power:
   `@layer reset, base, components, utilities;`. Anything unlayered beats
   all layers, so put third-party CSS into a layer
   (`@import url(lib.css) layer(vendor)`) to cap its power forever.
3. **Keep component selectors at one class.** `.card-title`, not
   `.card .header h2`. Descendant chains encode DOM structure into
   specificity and make every future override a war. One class deep means
   any later rule with one class can override cleanly.
4. **Erase specificity where you need reach.** `:where(.theme-dark a)` has
   zero specificity: perfect for defaults meant to be overridden. `:is()`
   takes the specificity of its strongest argument; use it for brevity,
   `:where()` for humility.
5. **Reserve !important for utilities and a11y overrides.** A utility like
   `.visually-hidden` may claim it by design. Anywhere else it is a
   confession that specificity got away; refactor the competing selector
   instead of escalating.
6. **Debug from the computed pane.** Devtools shows the winning rule and
   every loser struck through, with layer attribution. Find who wins and
   why before writing a stronger selector; the fix is usually weakening
   the winner, not strengthening the loser.

## Boundaries

- Inherited properties (color, font) reaching a child is inheritance, not
  the cascade; `inherit`/`initial`/`revert-layer` are the levers there.
- Shadow DOM isolates styles by design; piercing it is a component API
  conversation (custom properties, parts), not a selector trick.
- Custom properties resolve at use time, not declaration time; a variable
  override follows the same cascade rules as any declaration.
