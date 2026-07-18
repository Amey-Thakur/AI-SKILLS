---
name: image-optimization
description: Serve right-sized images by encoding modern formats, generating responsive srcset widths, and deferring offscreen decode while prioritizing the hero. Use when images are the heaviest bytes on a page or the LCP element loads slowly.
---

# Image optimization

Images are usually the heaviest bytes on a page and the most common Largest
Contentful Paint element. Shipping one oversized original to every device wastes
bandwidth on phones and delays the first meaningful paint. Serve the right
format, the right dimensions for the viewport, and decode off the critical path.

## Method

1. **Encode to a modern format.** Serve AVIF or WebP with a JPEG fallback through
   `<picture>`. AVIF is often 30 to 50 percent smaller than JPEG at equal
   quality. Produce it with `sharp`, Squoosh, or a build step; never ship the
   camera's original file.
2. **Generate responsive widths with srcset.** Produce several sizes and let the
   browser choose: `srcset` plus `sizes` so a phone downloads a 400px image and
   not the 2000px desktop one. On mobile this is the single biggest byte win.
3. **Declare width and height, or an aspect ratio.** Missing dimensions let the
   image shift the layout as it loads. Setting them, or `aspect-ratio`, lets the
   browser reserve the box and keeps CLS near zero.
4. **Lazy-load below the fold, prioritize above it.** Add `loading="lazy"` to
   offscreen images to defer their fetch, and `fetchpriority="high"` with a
   preload on the LCP image to pull it forward. Never lazy-load the hero: it
   delays LCP.
5. **Decode asynchronously and cover the gap.** Set `decoding="async"` so the
   browser decodes off the main thread. For large images, show a low-quality
   placeholder or a solid color so the space is not a blank box during load.
6. **Compress to a target, not to lossless.** Tune quality to roughly 75 to 85
   for photographs and strip metadata. Confirm in the network panel that the
   delivered bytes match the displayed size, not the source resolution.

## Checks

- Does each image ship as AVIF or WebP with a fallback, not a raw JPEG or PNG?
- Does a phone download a phone-sized file through srcset?
- Do images carry dimensions so they never shift the layout?
- Is the LCP image prioritized while everything below the fold is lazy?

## Boundaries

Tying these fixes to the LCP and CLS numbers is web-vitals; delivering the bytes
from an edge cache is cdn-strategy. Vector graphics and icon fonts follow
different rules. This skill covers raster images on the web.
