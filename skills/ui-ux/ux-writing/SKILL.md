---
name: ux-writing
description: Write the words inside an interface (labels, buttons, errors, empty states, microcopy) so they are clear, concise, and helpful. Use when writing or reviewing any text a user reads while using a product.
---

# UX writing

The words in an interface are part of the design. A button label, an error
message, an empty-state line: each guides or confuses a user mid-task. UX
writing is writing under the tightest constraint (space, and a user who
does not want to read), where every word must earn its place and do a job.

## Method

1. **Be clear above clever.** The user is trying to do something, not read
   your copy. A button that says exactly what it does ("Delete account")
   beats a witty one ("Say goodbye?"). Cleverness that costs a moment of
   confusion is a bad trade in an interface (see clear-writing). Save
   personality for where it does not block the task (see voice-and-tone).
2. **Write actions as verbs the user is taking.** Buttons and links say
   what happens: "Save changes", "Send invite", "Download report", not
   "OK", "Submit", or "Yes". A specific action label removes doubt about
   what a click does and reduces mistakes (see interaction-design).
3. **Make errors helpful, not blaming.** State what went wrong and, above
   all, what to do about it, in plain language: "That email is already
   registered. Sign in instead?" not "Error 422: constraint violation".
   Never blame the user; never expose internals (see empty-and-error-states,
   error-messages). The error message is a moment to help, not scold.
4. **Cut every word that does not help.** Interface text is read in
   glances; trim to the essential ("Enter your email" over "Please enter
   your email address in the field below"). Placeholder, helper, and label
   text should not repeat each other (see concise-writing).
5. **Guide empty and first-run states.** An empty screen is a chance to
   tell the user what goes here and how to start, not a dead end (see
   empty-and-error-states, onboarding-ux). The first thing a new user sees
   should orient and invite the first action.
6. **Stay consistent in terms and tone.** The same thing has the same name
   everywhere (not "folder" here and "collection" there); the voice is
   consistent across the product (see voice-and-tone, style-guides).
   Inconsistent terminology makes users wonder if two things are
   different.

## Boundaries

- UX writing serves the task and the moment; match the tone to the user's
  state (calm in errors, celebratory in success; see voice-and-tone).
  Humor in the wrong moment (a joke during a failed payment) breaks trust.
- Words cannot fix a broken flow or bad IA; if a screen needs a paragraph
  to explain itself, the design or structure is the problem (see
  information-architecture, interaction-design).
- Localization and accessibility constrain copy (length varies by
  language, screen readers read labels literally); write for translation
  and for assistive tech (see accessible-forms, aria-usage).
