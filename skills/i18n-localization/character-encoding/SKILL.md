---
name: character-encoding
description: Handle Unicode end to end so text survives storage, transport, and display without mojibake or truncation mid-character. Use when text arrives corrupted, lengths behave oddly, or emoji break a field.
---

# Character encoding

Encoding bugs look like corruption but are almost always a mismatch: one
layer wrote in one encoding and another read in a different one. Getting
this right is mostly about being explicit at every boundary and using
UTF-8 everywhere you can.

## Method

1. **Use UTF-8 throughout and declare it everywhere.** Database, tables,
   columns, connection, HTTP headers, and file reads. A single layer
   defaulting to something else produces the classic garbled output.
2. **Know that a character is not a byte or a code unit.** Length limits
   measured in bytes cut multi-byte characters in half, and a validator
   counting units mis-measures anything outside the basic range.
3. **Count what the user perceives when it matters.** Emoji, combining
   accents, and flags are several code points rendered as one character,
   so a character limit needs grapheme awareness to behave sanely.
4. **Normalise on input.** Deciding one normalisation form at the
   boundary makes comparison, deduplication, and search consistent (see
   locale-aware-sorting).
5. **Check the database column type actually supports full Unicode.**
   Some engines have a legacy utf8 that stops short of the full range and
   silently rejects or truncates emoji.
6. **Validate rather than strip.** Removing characters you did not
   expect mangles legitimate names; rejecting with a clear message is
   more honest than silent mutilation.

## Boundaries

- Encoding correctness does not imply rendering correctness; a font
  still needs the glyphs (see text-expansion-layout).
- Legacy systems may genuinely require another encoding, in which case
  convert explicitly at the boundary and document it.
- Normalisation can alter strings that some systems treat as distinct,
  so apply it consistently rather than selectively.
