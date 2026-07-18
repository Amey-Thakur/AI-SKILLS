---
name: accessibility-review
description: Audit a UI for real accessibility, keyboard-first, with concrete failures and fixes rather than checkbox compliance. Use when reviewing or building any user interface.
---

# Accessibility review

Accessibility is whether real people can use the thing: with a keyboard, a
screen reader, low vision, or a tremor: not whether a linter is quiet.
Audit by use, report by failure.

## Method

1. **Walk the keyboard path first.** Unplug the mouse mentally and complete
   the page's primary task with Tab, Shift+Tab, Enter, Space, Escape, and
   arrows. Every failure is a finding:
   - Focus that vanishes (no visible indicator) or lands somewhere absurd.
   - Interactive things you cannot reach (`div onclick` without `tabindex`
     and key handling: a native `<button>` fixes all of it at once).
   - Traps: modals you cannot Escape, menus that swallow Tab.
   - Order that jumps around the visual layout.
2. **Read the page as the accessibility tree.** Every control needs an
   accessible name (visible label, `aria-label`, or `alt`); every input a
   programmatic label (`for`/`id` or wrapping); images `alt` text that says
   what matters (`alt=""` for decoration); headings a real hierarchy
   (one `h1`, no skipped levels: structure, not styling).
3. **Check state and change announcements.** Toggles carry `aria-pressed`
   or `aria-expanded`; errors are associated with their field
   (`aria-describedby`), not floating red text; async updates that matter
   (saved, failed, loading) reach `aria-live` regions; the modal traps
   focus in and returns it on close.
4. **Check the visual floor.** Text contrast 4.5:1 (3:1 for large text and
   UI parts); information never carried by color alone (the red/green dot
   needs a label); layout survives 200% zoom; animation respects
   `prefers-reduced-motion`; touch targets are not miniature.
5. **Report by task, ranked by exclusion.** "A keyboard user cannot send a
   message" is a blocker; "the decorative divider is announced" is minor.
   Each finding: who is excluded, where, the failing behavior, the concrete
   fix: which is usually *use the native element*.

## Rules

- Native elements first (`button`, `a`, `label`, `select`, `dialog`);
  ARIA is the patch, not the plan. Wrong ARIA is worse than none.
- Test the actual behaviors, not the attribute presence: `aria-label=""`
  passes a grep and fails a person.
- Accessibility notes belong in the same review as everything else, at the
  same severity scale. A blocker is a blocker.
