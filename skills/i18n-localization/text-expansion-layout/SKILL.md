---
name: text-expansion-layout
description: Design interfaces that survive translated text growing or shrinking substantially, without truncation or broken layout. Use when building UI that will be translated, or fixing clipped text in another language.
---

# Text expansion layout

Translated text rarely matches the source length. German and Finnish
commonly run much longer than English, while Chinese and Japanese are
shorter, and short strings expand proportionally most. A layout tuned to
English breaks quietly everywhere else.

## Method

1. **Design to the longest plausible string, not the English one.** Fixed
   widths sized to the source are the primary cause of clipped
   translations.
2. **Let containers grow and wrap.** Flexible layouts that reflow absorb
   expansion, while absolute positioning and single-line assumptions do
   not (see css-layout).
3. **Give buttons and labels room without centring on emptiness.**
   Minimum widths keep short translations from looking broken while
   allowing long ones to expand.
4. **Never truncate meaning silently.** If space is genuinely fixed, show
   the full text on hover or focus, and prefer wrapping to ellipsis for
   anything a user must read (see accessibility-review).
5. **Test with pseudo-localised strings early.** Padded pseudo text
   surfaces expansion breakage before any real translation exists (see
   pseudo-localization).
6. **Watch the composite cases.** Text next to an icon, inside a table
   header, or in a fixed navigation bar is where expansion collides with
   other constraints.

## Boundaries

- Layout tolerance handles length; it does not handle direction, which
  is a separate mirroring concern (see rtl-layout).
- Some scripts need more vertical space per line, so height flexibility
  matters as much as width.
- Extremely constrained surfaces such as watch faces may genuinely
  require shorter source copy rather than a layout fix.
