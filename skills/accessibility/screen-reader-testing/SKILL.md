---
name: screen-reader-testing
description: Test with real screen readers, verifying announcements, live regions, and navigation, not just automated checks. Use when validating accessibility of UI that automated tools cannot fully assess.
---

# Screen reader testing

Automated accessibility checkers catch maybe a third of issues;
the rest (does it announce sensibly, does the flow make sense, do
updates get spoken) require using an actual screen reader. Testing with
one is the only way to know what a blind user actually experiences,
and it routinely surprises sighted developers.

## Method

1. **Test with the real tools users use.** NVDA (free,
   Windows, most common), VoiceOver (built into macOS/iOS),
   JAWS (widespread in enterprise), TalkBack (Android):
   test with at least NVDA or VoiceOver, ideally the ones
   your users use. Screen readers differ in behavior, so
   what works in one can fail in another; the common ones
   cover most users.
2. **Learn the basic navigation, then use it.** How to move
   by element, by heading, by landmark, by link, by form
   control (each screen reader has these modes): because
   users navigate by structure, jumping between headings
   and landmarks, not reading top to bottom. Testing this
   way reveals whether your heading hierarchy and landmarks
   (see docs-information-architecture's structure, aria-
   usage) actually help navigation.
3. **Verify announcements make sense.** Tab through and
   listen: is each control announced with its name, role,
   and state ("Save, button", "Email, edit, required")?
   Do buttons say what they do, do form fields announce
   their labels and errors (see accessible-forms), do
   images have meaningful or empty alt as appropriate (see
   alt-text-writing)? Announcements that are missing,
   wrong, or redundant ("button button") are the bugs only
   this testing finds.
4. **Test dynamic updates and live regions.** Content that
   changes without a page load (form errors appearing,
   a cart count updating, a loading-then-loaded state, a
   toast notification) must be announced: `aria-live`
   regions (polite for non-urgent, assertive for
   important) make updates spoken. Test that changes are
   announced and not over-announced (an aria-live region
   that re-reads constantly is as bad as silence): this is
   invisible to visual testing entirely.
5. **Follow the whole flow, not just components.** Complete
   a real task with the screen reader (sign up, check out,
   submit a form): the individual pieces can each be
   accessible while the flow is confusing (focus lands
   somewhere unexpected after an action, an error is not
   announced, a modal does not manage focus: see focus-
   management). The end-to-end experience is what matters.
6. **Combine automated and manual testing.** Run automated
   checkers (axe, WAVE, Lighthouse) first to catch the
   mechanical issues (missing alt, low contrast, missing
   labels) cheaply, then manual screen-reader testing for
   what they cannot assess (does it make sense, does it
   flow). Automated tools are a floor, not a ceiling; the
   manual test is where real accessibility is verified.

## Boundaries

- Screen-reader testing by a sighted developer approximates
  but does not replace testing with actual blind users and
  accessibility experts, who catch issues and friction a
  learner misses. Involve real users for anything critical.
- Screen readers are one assistive technology; others
  (switch access, voice control, magnification, braille
  displays) have their own testing needs. Keyboard
  accessibility (see keyboard-navigation) is the shared
  foundation.
- Cross-screen-reader differences are real; test the
  primary ones and follow standards (semantic HTML, correct
  ARIA: see aria-usage) rather than coding to one screen
  reader's quirks, which breaks the others.
