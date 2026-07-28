---
name: thumbnail-generation
description: Produce preview images for files of every type, consistently sized and generated without blocking the user. Use when a file list or gallery needs visual previews.
---

# Thumbnail generation

A thumbnail is a small derived image that the interface needs
immediately and the source cannot provide cheaply. The problems are
consistency across wildly different source types and doing the work
without making the user wait.

## Method

1. **Generate asynchronously with a placeholder.** The upload completes,
   the thumbnail appears shortly after, and the interface never blocks
   on it (see media-processing-queue).
2. **Define one output contract.** Dimensions, aspect handling, and
   format identical regardless of source type, so layouts are
   predictable.
3. **Decide crop versus fit deliberately.** Cropping to a uniform grid
   looks tidy and hides content; fitting preserves the image and creates
   uneven layouts. Choose per surface.
4. **Extract meaningfully per type.** First page for documents, a frame
   past the opening black for video, a rendered preview for code or
   text. A generic file icon is the fallback, not the strategy.
5. **Handle failure with a typed placeholder.** A file that cannot be
   thumbnailed shows its type clearly rather than a broken image.
6. **Regenerate on demand for new sizes.** Design a new dimension to be
   backfillable, since the first redesign will need one.
7. **Sandbox the generation.** Thumbnailing parses untrusted files with
   complex libraries, which is a well-known attack surface (see
   file-upload-safety).

## Boundaries

Thumbnails are derived and always regenerable, so they need no backup
and can be regenerated after a format change. Rendering some formats
requires heavy dependencies that may be better isolated or outsourced.
Previews of restricted content inherit its access controls and must not
be served from a public path.
