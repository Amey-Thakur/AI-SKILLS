---
name: dark-mode
description: Implement dark mode that honors system preference, allows manual override, and never flashes the wrong theme. Use when adding dark mode or fixing its flash, contrast, or image problems.
---

# Dark mode

Dark mode is a second design, not an inverted one. The mechanics are
simple; the craft is in the handoff between system preference, user
override, and first paint.

## Method

1. **Three-state preference: light, dark, system.** Default to system via
   `prefers-color-scheme`; store an explicit user choice (localStorage)
   only when they pick one, and keep following the OS when they chose
   "system". Listen for `change` on the media query so the app flips live
   at sunset.
2. **Kill the flash at first paint.** A tiny inline script in `<head>`
   reads the stored choice and stamps `data-theme` on `<html>` before any
   CSS applies. Also declare `color-scheme: light dark` so scrollbars,
   inputs, and default backgrounds render natively correct.
3. **Retune, do not invert.** Dark surfaces are dark gray (not black),
   elevation becomes lighter-surface instead of shadow, saturated brand
   colors need desaturating or lightening to hold contrast on dark. Run
   the contrast pass separately for each theme; 4.5:1 failures cluster in
   dark mode's muted text.
4. **Route it through tokens.** Only semantic custom properties change
   per theme (see css-theming); component CSS never mentions the theme.
   If you find `[data-theme="dark"] .card` in a component file, the token
   layer is missing a role.
5. **Handle images and media.** Dim photos slightly
   (`filter: brightness(.9)`) if they glare; swap logos with
   `<picture media="(prefers-color-scheme: dark)">` or a masked SVG using
   `currentColor`; keep `color-scheme` off embedded iframes you do not
   control.
6. **Test the forgotten surfaces.** Focus rings, selection color,
   placeholder text, disabled states, charts, and email/PDF exports; each
   has a default that betrays the theme.

## Boundaries

- Auto-darkening user-generated content (documents, embedded HTML) can
  destroy meaning; scope the theme to your chrome and leave content
  opt-in.
- `forced-colors: active` (Windows High Contrast) overrides both your
  themes; respect it rather than fighting it.
- A dark mode toggle in a cookie-consent-style banner is noise; put it in
  settings and remember it.
