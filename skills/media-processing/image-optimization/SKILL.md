---
name: image-optimization
description: Deliver images at the right format, size, and quality for each context so pages stay fast without visible degradation. Use when images dominate page weight or load slowly on mobile.
---

# Image optimization

Images are usually the largest thing on a page and the easiest to
improve. The work is generating the right variants once and serving the
smallest one that still looks correct on the device asking.

## Method

1. **Resize to the largest size actually displayed.** Serving a
   four-thousand-pixel image into a four-hundred-pixel slot wastes
   almost all of the bytes, and this is the single biggest win.
2. **Choose format by content and support.** Modern formats compress
   photographs substantially better than legacy ones, with fallbacks
   negotiated by the browser (see format-selection).
3. **Generate variants at ingest, not per request.** A fixed set of
   widths produced once and cached beats resizing on demand, which is
   expensive and cacheable only by URL anyway.
4. **Tune quality by content type.** Photographs tolerate aggressive
   compression; screenshots, text, and line art show artefacts quickly
   and need higher settings or a lossless format.
5. **Strip metadata on ingest.** It adds weight and often contains
   location and device information the uploader did not intend to share
   (see metadata-stripping).
6. **Serve responsively with explicit dimensions.** Width descriptors
   let the browser choose, and stated dimensions prevent layout shift as
   images load.
7. **Lazy load below the fold, eagerly load what is visible.** The
   largest visible image should be prioritised rather than deferred (see
   web-vitals).

## Boundaries

Optimisation trades fidelity for size, and some contexts such as
photography portfolios and medical imagery cannot accept the trade.
Variant generation costs storage and processing at ingest. Automated
quality settings occasionally produce visible artefacts and need spot
checking on real content.
