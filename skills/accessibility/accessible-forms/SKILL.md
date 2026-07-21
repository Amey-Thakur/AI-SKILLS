---
name: accessible-forms
description: Build forms with associated labels, identified errors, clear instructions, and autocomplete attributes. Use when creating or auditing forms for accessibility.
---

# Accessible forms

Forms are where users accomplish tasks (sign up, buy, submit), and
inaccessible forms block those tasks entirely for some users. The
requirements are concrete: every field labeled and associated, every
error identified in text, instructions available, and the browser's
autofill enabled.

## Method

1. **Associate a real label with every field.** A
   `<label for="email">` tied to the input's id (or wrapping
   it): so clicking the label focuses the field and the
   screen reader announces the label when the field gets
   focus (see aria-usage: prefer real labels to aria-label).
   Placeholder text is not a label (it disappears on input
   and often fails contrast: see color-contrast); a field
   labeled only by placeholder is unlabeled the moment the
   user types.
2. **Identify errors in text, associated with the field.**
   When validation fails: describe the error in text ("Email
   must include an @"), associate it with the field
   (`aria-describedby` pointing to the error message), and
   move focus to (or announce: see screen-reader-testing's
   live regions) the first error. Color alone (a red border)
   does not tell a screen-reader or color-blind user what
   is wrong (see color-contrast's don't-rely-on-color):
   the error must be text they can perceive.
3. **Provide instructions and requirements up front.**
   Format requirements, which fields are required, and
   constraints stated before the user submits and fails:
   "Password must be at least 12 characters" shown with the
   field, not only in the error after. Required fields
   marked in text and with `aria-required` (not by color or
   an asterisk alone: see the multi-channel rule). Users
   should know the rules before hitting them.
4. **Enable autocomplete and the right input types.**
   `autocomplete` attributes (`autocomplete="email"`,
   `"name"`, `"one-time-code"`) let browsers and password
   managers autofill: a huge help for users with motor or
   cognitive disabilities, and everyone else (see the
   autofill discipline in mobile-input-ux). Correct input
   `type` (email, tel, number) triggers the right keyboard
   and validation. These reduce the typing burden that
   forms impose.
5. **Group related fields and controls.** Radio buttons and
   checkboxes for one question grouped in a `<fieldset>`
   with a `<legend>` (so the screen reader announces the
   group's question with each option); related sections
   with headings. Ungrouped radio options announce
   individually with no context ("yes, radio button" with
   no question) leaving users lost.
6. **Keep the submit path clear and forgiving.** The submit
   button reachable and labeled with its action ("Create
   account", not "Submit"); errors on submit do not clear
   entered data (see form-handling); success confirmed in a
   way screen readers announce. A form that clears itself on
   error or gives no submission feedback fails users
   exactly at the moment of completing their task.

## Boundaries

- Accessible forms combine several techniques (labels,
  errors, keyboard, focus: see keyboard-navigation, focus-
  management, screen-reader-testing); a form is accessible
  only when all hold, and the whole task can be completed
  with keyboard and screen reader.
- Complex custom form controls (date pickers, comboboxes,
  multi-selects) need the full ARIA widget patterns (see
  aria-usage) and are easy to get wrong; prefer native
  inputs or well-tested accessible libraries over custom
  ones where possible.
- Client-side validation UX (timing, inline vs on-submit:
  see form-handling) and accessibility overlap; the
  accessibility requirements (text errors, association,
  focus) apply regardless of the validation timing chosen.
