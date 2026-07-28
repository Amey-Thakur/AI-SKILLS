---
name: metadata-stripping
description: Remove embedded metadata such as location, device, and author from user files before they are stored or shared. Use when users upload photographs or documents that others will see.
---

# Metadata stripping

A photograph often carries the exact coordinates where it was taken, the
device that took it, and sometimes the owner's name. A document carries
authors, revision history, and occasionally deleted text. Users rarely
know, and publishing it for them is a privacy failure with real
consequences.

## Method

1. **Strip by default on ingest.** Opt-in preservation for the cases
   that need it, because defaults are what protect the users who never
   read settings (see data-minimization).
2. **Know what each format hides.** Images carry location and device;
   office documents carry authors, comments, and tracked changes; PDFs
   carry creation software and sometimes removed content.
3. **Keep what the product genuinely needs.** Orientation must be
   applied then discarded, and capture time may be needed for sorting.
   Everything else goes.
4. **Strip before the file is reachable.** Doing it after publication
   leaves a window where the original was served, and caches may retain
   it (see cdn-strategy).
5. **Warn when preserving.** If a feature depends on retaining
   metadata, say so at upload, since users assume stripping.
6. **Handle documents beyond visible content.** Hidden slides,
   off-canvas text, and revision history are not visible in a viewer and
   are fully present in the file.
7. **Verify by re-reading the stored file.** Confirming the metadata is
   actually gone is a cheap test and the only proof.

## Boundaries

Stripping removes embedded metadata; the image content itself may still
reveal location, which no metadata tool addresses. Some workflows
legitimately require metadata, such as photography and forensics, where
preservation is the requirement. Stripping cannot recover privacy for
files already shared.
