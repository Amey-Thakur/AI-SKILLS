---
name: binary-data-representation
description: Work with bytes, endianness, alignment, and binary formats so data written by one system is read correctly by another. Use when parsing binary protocols, file formats, or debugging corrupted data.
---

# Binary data representation

Text hides representation decisions that binary exposes: byte order,
alignment, signedness, and size. Cross-system binary data fails when two
sides disagree about any of these, usually silently and with plausible
wrong values.

## Method

1. **Fix the byte order explicitly.** Network protocols and file formats
   must specify endianness, and relying on the host's is what breaks
   when the data crosses machines.
2. **Specify exact widths.** Integer sizes vary by platform, so
   fixed-width types are the only safe choice in a wire format.
3. **Be explicit about signedness.** A negative number read as unsigned
   becomes enormous, which is a classic source of nonsensical values and
   allocation failures.
4. **Account for alignment and padding.** Structures in memory contain
   padding that is not part of the logical data, so writing a structure
   directly to disk is not a portable format.
5. **Validate length fields before allocating.** A corrupt or hostile
   length is the most common parsing vulnerability, and bounds checking
   comes before trust (see input-validation).
6. **Include a magic number and a version.** Identifying the format and
   its version at the start makes every future change survivable.
7. **Read hex dumps when debugging.** Looking at the actual bytes
   resolves in seconds what reasoning about the parser cannot.

## Boundaries

Binary formats are compact and fast and cost readability and
debuggability, which is why text formats persist for configuration.
Established serialisation libraries handle these concerns and should be
preferred to hand-rolled formats. Text encoding is a separate concern
with its own pitfalls (see character-encoding).
