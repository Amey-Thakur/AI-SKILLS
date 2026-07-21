---
name: focus-management
description: Manage focus on route changes, in modals, and after actions, with visible focus indicators. Use when building single-page apps, dialogs, or dynamic UI where focus can get lost.
---

# Focus management

Focus is where keyboard and screen-reader users are on the page; when
the UI changes and focus is not managed, they get lost, stranded on a
removed element or left at the top while content changed below. Dynamic
interfaces must move focus deliberately and always show where it is.

## Method

1. **Move focus on route/view changes.** In single-page apps,
   navigating does not reload the page, so focus stays where
   it was (often on the clicked link, now gone): move focus
   to the new content's heading or main region, and announce
   the change (a live region or focusing an element with the
   new page's name: see screen-reader-testing's live
   regions). Without this, screen-reader users do not know
   the page changed and keyboard users tab from a stale
   position.
2. **Trap and return focus in modals.** When a dialog opens:
   move focus into it (the first focusable element or the
   dialog itself), trap focus within it while open (Tab
   cycles inside, does not escape to the page behind: the
   one intentional focus trap: see keyboard-navigation), and
   on close, return focus to the element that opened it. A
   modal that does not trap focus lets users tab into the
   hidden page behind it (confusing and broken); one that
   does not return focus strands them.
3. **Manage focus after actions that change the DOM.**
   Deleting the item that had focus, submitting a form,
   revealing new content: move focus somewhere sensible
   (the next item, a confirmation, the new content) rather
   than letting it fall to the top of the page or vanish
   (when a focused element is removed, focus goes to
   `<body>`, losing the user's place). Every action that
   removes or adds focusable content needs a focus decision.
4. **Keep focus visible, always.** A clear, high-contrast
   focus indicator (see color-contrast's non-text 3:1);
   never remove it (`outline: none`) without an equally
   visible replacement. Use `:focus-visible` to show the
   indicator for keyboard users without the outline
   appearing on mouse clicks (the common reason developers
   remove it): so keyboard users always see where they are
   and mouse users are not bothered.
5. **Do not steal or fight focus.** Auto-focusing
   aggressively (grabbing focus on page load to a signup
   field, moving focus during typing, focus that jumps
   unexpectedly) disorients and can trap: move focus in
   response to *user actions* and meaningful changes, not
   preemptively. A page that keeps yanking focus is as
   broken as one that loses it.
6. **Test focus by keyboard through real flows.** Tab
   through and perform tasks (open a modal, close it,
   delete an item, navigate): watch where focus goes at
   each step (see keyboard-navigation, screen-reader-
   testing). Focus bugs are invisible to visual and
   automated testing; only following focus through the
   actual flow reveals the strandings and traps.

## Boundaries

- Focus management is essential for dynamic interfaces
  (SPAs, modals, live updates) and less so for static
  pages where the browser handles it; the more your UI
  changes without page loads, the more explicit focus
  management it needs.
- It pairs with the other keyboard and screen-reader
  practices (see keyboard-navigation, screen-reader-
  testing, aria-usage); focus management without visible
  indicators or with a broken tab order is incomplete.
- Over-managing focus (moving it on every minor change)
  is as disorienting as never managing it; move focus
  for meaningful transitions and user actions, leave it
  alone for trivial updates.
