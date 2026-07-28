---
name: print-ready-output
description: Prepare documents for physical printing with correct colour, bleed, resolution, and fonts, so what prints matches what you designed. Use when producing anything that will be professionally printed.
---

# Print-ready output

Print is unforgiving in ways screens are not: colour shifts, edges trim,
and low-resolution images that looked acceptable on a monitor look
obviously wrong on paper. The requirements are specific and mostly
mechanical.

## Method

1. **Work in the printer's colour space.** Screen colour does not
   reproduce directly in print, and bright screen colours are the ones
   that shift most.
2. **Add bleed and keep content inside the safe area.** Anything meant
   to reach the edge extends beyond the trim line, since cutting is not
   exact.
3. **Use adequate resolution for print.** Images sized for the web are
   visibly poor on paper, and upscaling does not recover detail (see
   image-optimization).
4. **Embed or outline all fonts.** A missing font at the printer means
   substitution or failure, and outlining removes the risk entirely.
5. **Check the printer's specification first.** Trim size, bleed,
   binding allowance, and file format differ between printers and are
   not negotiable at the last minute.
6. **Proof before the full run.** A physical proof catches colour and
   trim problems that no screen preview shows.
7. **Keep an editable source alongside the print file.** The flattened
   output cannot be revised, and reprints always need revision.

## Boundaries

Print output is fixed once produced, so errors are expensive rather than
patchable. Colour matching between devices is approximate at best.
Accessibility considerations differ in print, where text size and
contrast cannot be adjusted by the reader (see color-contrast).
