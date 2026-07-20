---
name: form-handling
description: Build forms with validation timing, error display, and submission states that respect users and screen readers. Use when creating or reviewing any form, or fixing premature-error or lost-input complaints.
---

# Form handling

A form's quality is mostly its timing: when errors appear, when the button
disables, when focus moves. Get the timing wrong and a technically correct
form still feels hostile.

## Method

1. **Validate on the right event per field.** Do not validate on every
   keystroke from the first character; that scolds users mid-typing. Validate a
   field on blur once touched, then re-validate on change so a corrected field
   clears its error immediately. Validate everything on submit as the backstop.
   Track a `touched` flag per field to gate the first error.
2. **Show one error per field, next to the field, tied by aria.** Render the
   message adjacent to its input, set `aria-invalid` on the input, and link the
   message with `aria-describedby` pointing at the error element's id. Give the
   error container `role="alert"` or `aria-live="polite"` so it is announced
   when it appears. A red border alone fails colorblind and screen-reader users.
3. **On submit failure, move focus to the first invalid field.** After a failed
   submit, focus the first field with an error (or a summary that links to it)
   so keyboard and screen-reader users are taken to the problem instead of
   hunting. Announce a submission-level error with a live region.
4. **Model submission as explicit states.** `idle`, `submitting`, `success`,
   `error`. Disable the submit button and show a pending indicator during
   `submitting` to prevent double submits, but never disable the whole form so
   users can still read what they entered. Re-enable and show a specific error
   on failure, keeping their input intact.
5. **Preserve user input across every failure.** Never clear fields on a failed
   submit or a validation error. Keep the entered values, keep scroll position
   reasonable, and only reset after a confirmed success. Losing a filled form
   is the fastest way to lose the user.
6. **Keep the native semantics.** Use a real `<form>` with `onSubmit`, real
   `<label>` elements associated to inputs, and a real submit `<button>` so
   Enter-to-submit, autofill, and password managers work. Reach for a library
   (React Hook Form, Formik) when field arrays, cross-field rules, or many
   fields make hand-rolled state error-prone.

## Boundaries

- Server-side validation is still required; client validation is UX, not a
  security or integrity boundary.
- Payment, password, and identity fields have handling rules beyond this;
  never auto-fill or transmit them per this skill alone.
- Multi-step wizards add per-step persistence and navigation concerns not
  covered here.
