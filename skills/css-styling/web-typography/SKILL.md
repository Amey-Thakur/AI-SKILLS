---
name: web-typography
description: Set a type scale, measure, and loading strategy that make text readable and stable across devices. Use when establishing typography for a site or fixing cramped, shifting, or slow-loading text.
---

# Web typography

Body text is the product for most sites. Get measure, leading, and loading
right and the design is 80% done before a single decorative choice.

## Method

1. **Set the measure first.** 45-75 characters per line for body copy;
   enforce with `max-width: 65ch` on prose containers, not on the page.
   Long-form reading quality collapses beyond 90ch faster than any font
   choice can rescue.
2. **Build a modest scale.** Base 1rem (never shrink the root), a ratio
   around 1.2-1.333, and only the steps you use: sm, base, lg, xl, 2xl
   covers most products. Make display sizes fluid with `clamp()` (see
   responsive-design); body text stays fixed or barely fluid.
3. **Tie leading to size and measure.** Body: 1.5-1.7 line-height,
   unitless. Headings: 1.1-1.25. Long lines need more leading, short
   lines less. Add space above headings (two-thirds) more than below
   (one-third) so sections cohere.
4. **Load fonts without breaking the page.** Self-host WOFF2, preload the
   one or two critical files, `font-display: swap`, and define
   `size-adjust`-tuned fallback metrics (or use a tool that generates
   them) so the swap does not reflow the page. Subset to the scripts you
   serve; a 40KB font beats a 400KB one on every metric that matters.
5. **Use variable fonts when you need three-plus weights.** One file
   serving 300-800 weights costs less than three static files and unlocks
   `font-variation-settings` animation; check the file is not carrying
   axes you never use.
6. **Turn on the quiet features.** `text-wrap: balance` on headings,
   `text-wrap: pretty` on paragraphs where supported;
   `font-variant-numeric: tabular-nums` in tables; real quotes and
   `hyphens: auto` for justified or narrow columns; `-webkit-font-
   smoothing` left alone.

## Boundaries

- Users zoom and override; px-based font sizes and `maximum-scale=1`
  fight accessibility and lose. Everything in rem.
- Icon fonts are ligature hacks with screen-reader side effects; use SVG.
- Brand display faces are for display; do not push a quirky face into
  10,000 words of documentation.
