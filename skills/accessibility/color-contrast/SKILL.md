---
name: color-contrast
description: Meet WCAG contrast ratios for text and non-text, never rely on color alone, and verify with tools including in dark mode. Use when choosing colors for UI or auditing readability.
---

# Color contrast

Sufficient contrast between text and background is what makes an
interface readable for users with low vision, color blindness, or just
a sunlit screen. It is one of the most common accessibility failures
and one of the most checkable: the WCAG ratios are specific numbers you
can verify.

## Method

1. **Meet the WCAG text-contrast ratios.** Normal text needs
   at least 4.5:1 against its background (AA); large text
   (18pt+, or 14pt+ bold) needs 3:1. AAA raises these to 7:1
   and 4.5:1. These are measurable ratios, not opinions:
   check every text/background pair against them, including
   text over images and gradients (where contrast varies
   across the text: the hardest case).
2. **Do not rely on color alone to convey information.**
   Color-blind users (about 8% of men) cannot distinguish
   red-error from green-success if color is the only signal:
   pair color with an icon, text, pattern, or shape (a red
   X and a green check, not just red and green: see the
   error-signaling in accessible-forms). "Click the green
   button" and "required fields are red" fail without a
   second channel.
3. **Meet non-text contrast too.** UI components and
   meaningful graphics (form field borders, button edges,
   icons, focus indicators, chart elements) need 3:1
   against adjacent colors (WCAG 1.4.11): a form input whose
   border barely differs from the background is invisible to
   low-vision users. Focus indicators especially must be
   clearly visible (see keyboard-navigation, focus-
   management).
4. **Verify with tools, do not eyeball.** Contrast checkers
   (browser devtools, WebAIM contrast checker, axe: see
   screen-reader-testing's automated layer) compute the
   exact ratio: eyeballing is unreliable, especially for
   borderline pairs and for designers with normal vision.
   Automate contrast checks in CI where possible so a
   low-contrast color fails the build.
5. **Check both themes and all states.** Dark mode has its
   own contrast pairs that pass or fail independently (see
   dark-mode): a color meeting contrast on white can fail on
   dark gray. Also check hover, disabled, placeholder, and
   error states (disabled text is often too faint,
   placeholder text is a frequent failure): every color
   combination that appears is subject to the ratio.
6. **Build contrast into the design system.** Define a token
   palette where the allowed text/background combinations
   are pre-verified to pass (see css-theming's semantic
   tokens): so designers and developers use
   guaranteed-accessible pairs rather than checking each ad
   hoc. Contrast baked into the tokens is contrast that
   does not regress.

## Boundaries

- Contrast ratios are a floor for readability, not the
  whole of visual accessibility (font size, spacing, and
  typography also matter: see web-typography); passing
  contrast does not guarantee comfortable reading.
- The ratios are minimums; comfortable reading often
  wants more, and users with severe low vision may need
  far higher contrast or their own high-contrast mode
  (respect `forced-colors`: see dark-mode's boundary).
- Contrast is one WCAG success criterion among many; a
  page with perfect contrast can still be inaccessible in
  other ways (keyboard, screen reader: see keyboard-
  navigation, screen-reader-testing). It is necessary,
  not sufficient.
