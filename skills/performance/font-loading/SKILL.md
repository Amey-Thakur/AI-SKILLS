---
name: font-loading
description: Load web fonts without layout shift by subsetting the file, setting font-display, preloading first-paint weights, and matching fallback metrics. Use when custom fonts cause invisible text, a flash of restyle, or a CLS spike.
---

# Font loading

Web fonts arrive after the HTML and CSS that reference them, so the browser must
choose: hide the text until the font loads, or show a fallback and reflow when
the real font swaps in. The first flashes invisible text, the second jumps the
layout. Load fonts so text is readable immediately and nothing moves when the
swap happens.

## Method

1. **Set `font-display` in every `@font-face`.** Use `swap` to show fallback text
   at once and swap later, or `optional` to skip the swap on slow connections.
   Never leave the default `block`, which hides text for the whole fetch.
2. **Preload the weights first paint needs.** Add `<link rel="preload" as="font"
   type="font/woff2" crossorigin>` for the one or two faces above the fold so the
   fetch starts before the CSS is even parsed.
3. **Subset to the characters you actually use.** Strip unused glyphs and scripts
   with `glyphhanger` or `pyftsubset`; a Latin-only subset can be a fraction of
   the full file. Split by script with `unicode-range` so only the needed subsets
   download.
4. **Ship woff2 and nothing else.** woff2 is the smallest format and universally
   supported. Drop woff, ttf, and eot fallbacks unless you must serve ancient
   browsers: fewer formats mean smaller CSS and one fetch per face.
5. **Match fallback metrics to kill the swap shift.** Set `size-adjust`,
   `ascent-override`, and `descent-override` on a fallback `@font-face`, or use a
   tool like Fontaine, so the fallback fills the same space and the swap does not
   move text.
6. **Self-host instead of a third-party origin.** Serving fonts from your own
   domain removes a cross-origin connection and DNS lookup from the critical path
   and avoids a render-blocking request to a font CDN.

## Signals

- Is text visible during the font load rather than blank?
- Are first-paint fonts preloaded, so the fetch is not discovered late?
- Does the shipped file carry only the glyphs the site uses?
- Does the fallback-to-webfont swap leave the layout unmoved?

## Boundaries

The layout-shift metric this feeds is web-vitals' CLS; right-sizing images that
also shift layout is image-optimization. Variable-font axes and icon fonts carry
separate tradeoffs. Delivery caching defers to cdn-strategy.
