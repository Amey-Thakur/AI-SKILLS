---
name: form-design
description: Design forms people complete, with the fewest fields, clear labels, and error handling that helps rather than punishes. Use when collecting any information from users.
---

# Form design

Every field costs completion rate. Forms are where products lose people
who were willing to convert, usually to friction that served an internal
preference rather than a real need.

## Method

1. **Remove every field you do not need now.** Ask later, infer, or do
   without. This is the single largest lever on completion (see
   data-minimization).
2. **Label above the field and keep labels visible.** Placeholder-only
   labels vanish on focus and fail accessibility (see accessible-forms).
3. **Match input types to the data.** Correct keyboard on mobile,
   appropriate autocomplete, and sensible defaults reduce effort
   materially.
4. **Validate at the right moment.** On blur rather than on every
   keystroke, with success confirmed as clearly as failure.
5. **Write errors that say how to fix it.** Which field, what is wrong,
   and what is acceptable, positioned beside the field (see
   error-messages).
6. **Preserve input on failure, always.** Losing a completed form to a
   validation error is the most infuriating outcome and the most common.
7. **Break long forms into steps with progress.** Chunking reduces
   abandonment when the total genuinely cannot be shortened.

## Boundaries

Form design improves completion; it cannot make people give information
they are unwilling to share. Required fields have privacy and consent
implications (see consent-management). Complex conditional forms need
careful accessibility testing (see screen-reader-testing).
