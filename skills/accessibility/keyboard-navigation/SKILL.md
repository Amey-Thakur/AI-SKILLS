---
name: keyboard-navigation
description: Make interfaces fully keyboard-operable with logical focus order, no traps, skip links, and roving tabindex where needed. Use when building interactive UI or auditing keyboard accessibility.
---

# Keyboard navigation

Everything a mouse can do, a keyboard must do: this is the baseline for
users who cannot use a pointer (motor disabilities, screen-reader
users, power users). Keyboard access is also the foundation screen
readers build on, so getting it right serves multiple needs at once.

## Method

1. **Make every interactive element focusable and operable.**
   Native interactive elements (`<button>`, `<a>`, form
   controls) are keyboard-operable for free; custom ones
   (see aria-usage) need `tabindex="0"` plus key handlers
   (Enter/Space activate buttons, arrow keys navigate
   composite widgets). If a mouse user can click it, a
   keyboard user must be able to reach and activate it: a
   click handler on a `<div>` with no keyboard equivalent is
   the classic exclusion.
2. **Keep focus order logical.** Tab order follows the
   visual/reading order (top to bottom, left to right in
   most locales): driven by DOM order, not by positive
   tabindex values (which create maintenance nightmares and
   confusing jumps). If the visual order and DOM order
   diverge (CSS reordering), fix the DOM order or the
   layout; a tab order that jumps around the screen
   disorients.
3. **Never trap focus unintentionally.** Focus must be able
   to leave every component via keyboard; a widget that
   captures Tab and never releases it strands keyboard users
   (a real, common bug in custom modals and embeds). The
   one *intentional* trap is a modal dialog, which should
   trap focus *within* it while open and *return* focus on
   close (see focus-management): deliberate and reversible,
   never accidental and permanent.
4. **Provide skip links.** A "skip to main content" link as
   the first focusable element lets keyboard and screen-
   reader users bypass repeated navigation (tabbing through
   fifty nav links on every page is exhausting): visible on
   focus, jumping focus to the main content. This small
   addition dramatically improves the experience for
   keyboard users on content-heavy sites.
5. **Use roving tabindex for composite widgets.** In widgets
   like menus, toolbars, and grids, the whole widget is one
   tab stop, and arrow keys move *within* it (roving
   tabindex: one child has `tabindex="0"`, others
   `tabindex="-1"`, updated as focus moves): so users tab
   past the widget quickly and explore inside with arrows,
   matching the ARIA patterns (see aria-usage). Making every
   menu item a tab stop makes navigation tedious.
6. **Make focus visible, always.** A clear visible focus
   indicator (never `outline: none` without a replacement:
   see focus-management) so keyboard users can see where
   they are: an interface that is keyboard-operable but
   shows no focus is unusable, because the user is
   navigating blind. Style the focus indicator to be
   obvious, honoring `:focus-visible`.

## Boundaries

- Keyboard navigation is necessary but not sufficient for
  accessibility; it pairs with screen-reader semantics
  (see screen-reader-testing, aria-usage) and visible
  focus (see focus-management). All three together make an
  interface accessible.
- Test by actually navigating with only the keyboard
  (unplug the mouse): automated tools miss focus-order and
  trap issues that only manual keyboard testing reveals.
- Custom keyboard shortcuts (single-key access) can
  conflict with assistive tech and browser shortcuts;
  follow established patterns and make custom shortcuts
  configurable or scoped (see the shortcut cautions in
  mobile-input-ux's desktop cousin).
