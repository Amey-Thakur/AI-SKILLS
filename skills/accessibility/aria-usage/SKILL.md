---
name: aria-usage
description: Use ARIA correctly by preferring native HTML, applying roles/states/properties only where needed, and following known widget patterns. Use when making custom components accessible or fixing broken ARIA.
---

# ARIA usage

ARIA adds accessibility semantics where HTML falls short, and its first
rule is a warning: do not use ARIA if a native element does the job.
Most broken ARIA comes from adding it where it was not needed or
adding roles without the keyboard behavior and state management they
require. Native first, ARIA carefully.

## Method

1. **Prefer native HTML elements (the first rule of ARIA).**
   A `<button>` is accessible for free: focusable, keyboard-
   operable, announced as a button. A `<div role="button">`
   requires you to add tabindex, keyboard handlers, and
   states manually, and you will miss some. Use `<button>`,
   `<a>`, `<input>`, `<select>`, `<nav>`, `<main>` before
   reaching for ARIA: native semantics beat reimplemented
   ones every time.
2. **Understand roles, states, and properties.** Role (what
   it is: `role="tab"`), states (current condition, dynamic:
   `aria-selected="true"`, `aria-expanded="false"`),
   properties (characteristics, mostly static:
   `aria-label`, `aria-controls`). A role sets expectations
   the rest of the ARIA and the keyboard behavior must
   fulfill; `role="tab"` promises tab behavior you must then
   deliver.
3. **Follow the established widget patterns.** For custom
   widgets (tabs, menus, comboboxes, dialogs, tree,
   accordion), the ARIA Authoring Practices Guide defines
   the exact roles, states, and keyboard interactions
   expected: implement the whole pattern, not a subset.
   Half-implemented patterns (a role without its keyboard
   support: see keyboard-navigation) are worse than none,
   because they announce a behavior that then does not
   work.
4. **Keep ARIA states in sync with reality, always.**
   `aria-expanded`, `aria-checked`, `aria-selected`,
   `aria-hidden` must update the instant the UI state
   changes: a collapsed menu still saying
   `aria-expanded="true"` lies to the screen reader (see
   screen-reader-testing). The state attributes are the
   accessible truth; stale ones are accessibility bugs
   users cannot see but hit constantly.
5. **Name things accessibly, correctly.** Prefer visible
   labels associated properly (a `<label>` for an input:
   see accessible-forms); use `aria-label` or
   `aria-labelledby` only when no visible label exists or
   the accessible name must differ. Do not label things
   already named (labeling a `<button>Save</button>` with
   `aria-label="Save"` is redundant, and a mismatched one
   is a bug).
6. **Never use ARIA to hide broken semantics.**
   `aria-hidden="true"` on focusable content creates a trap
   (invisible to screen readers but still tab-focusable);
   `role` overrides that fight the element's real behavior
   confuse more than help. ARIA is a scalpel for gaps in
   native semantics, not a patch over structural problems:
   fix the structure (see the "no ARIA is better than bad
   ARIA" principle).

## Boundaries

- ARIA changes semantics announced to assistive tech; it
  does not add behavior. `role="button"` does not make a
  div clickable-by-keyboard: you add that yourself (see
  keyboard-navigation). ARIA describes; you must still
  implement.
- Testing with an actual screen reader is required (see
  screen-reader-testing): ARIA that looks right in code
  can announce wrong in practice, and automated checkers
  catch only a fraction. Verify with the real tool.
- ARIA is the fallback for custom components; if you find
  yourself writing extensive ARIA, first ask whether a
  native element or a well-tested accessible component
  library would serve better (the native-first rule,
  scaled up).
