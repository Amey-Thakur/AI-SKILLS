---
name: format-selection
description: Choose media formats and codecs by compatibility, quality, and licensing, with fallbacks for what the client cannot play. Use when deciding what to store and deliver.
---

# Format selection

Format choice trades compression against compatibility. The newest
formats are substantially smaller and unsupported somewhere, which is
why serving one format is either wasteful or broken for a subset of
users.

## Method

1. **Separate the archival format from the delivery format.** Keep a
   high-quality master and derive delivery variants, so a future format
   change does not require re-encoding from a lossy copy.
2. **Negotiate rather than detect.** Content negotiation and source sets
   let the client pick what it supports, which is more reliable than
   inferring from a user agent.
3. **Always provide a fallback.** A widely supported format alongside
   the modern one, since the alternative is a blank space for some
   users.
4. **Match the format to the content.** Photographic, graphic, and
   animated content compress best under different formats, and one
   default serves some badly.
5. **Consider licensing and patent exposure.** Some codecs carry
   licensing obligations that matter at commercial scale, and open
   alternatives may be the safer choice.
6. **Measure the actual saving on your own content.** Published
   compression figures come from standard test sets that may not
   resemble what your users upload.
7. **Revisit as support shifts.** Formats that needed a fallback two
   years ago may not now, and dropping a legacy variant reduces storage
   and complexity.

## Boundaries

Newer formats save bandwidth and cost encoding time and compatibility
risk. Support data is a moving target and needs periodic re-checking.
Some clients misreport capability, so fallbacks remain necessary even
when negotiation says otherwise.
