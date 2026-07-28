---
name: data-validation-rules
description: Constrain what can be entered into a spreadsheet so errors are prevented at input rather than found in analysis. Use when a spreadsheet is filled in by people.
---

# Data validation rules

Any spreadsheet other people fill in will receive data you did not
expect. Validation at the point of entry is far cheaper than cleaning
afterwards and prevents the silent errors that cleaning misses.

## Method

1. **Constrain to lists where values are categorical.** A dropdown
   eliminates spelling variation entirely, which is the largest source
   of aggregation errors.
2. **Set ranges on numbers and dates.** Bounds catch transposed digits
   and wrong-year entries at the moment they happen.
3. **Write the input message.** Explaining what is expected before the
   error prevents most errors (see form-design).
4. **Write helpful error messages.** What is wrong and what is
   acceptable, since a generic rejection leads to workarounds (see
   error-messages).
5. **Protect formula cells.** Locking calculated cells prevents the
   common accident of typing over a formula (see
   spreadsheet-collaboration).
6. **Highlight invalid existing data.** Validation applies to new entry,
   so existing violations need flagging separately.
7. **Keep reference lists on a separate sheet.** Maintained in one place
   and referenced, rather than duplicated into each dropdown.

## Boundaries

Validation constrains entry and can be bypassed by pasting, so it
reduces rather than eliminates bad data. Over-constraining frustrates
users who have legitimate exceptions. Genuine data entry at volume
belongs in an application with real validation (see form-design).
