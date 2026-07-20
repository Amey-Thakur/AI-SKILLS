---
name: mobile-input-ux
description: Make mobile forms and controls fast to use with correct keyboards, reachable touch targets, and restrained haptics. Use when building input-heavy mobile screens or fixing form abandonment on small screens.
---

# Mobile input UX

Every keystroke on a phone costs more than on a desktop. The method is to
remove keystrokes, then make the remaining ones land correctly.

## Method

1. **Declare the right keyboard per field.** Email, phone, numeric, URL
   keyboard types; autocapitalize off for identifiers; autocorrect off for
   names and codes. One wrong keyboard type doubles error rate on that
   field.
2. **Feed the autofill engines.** Set content types (iOS
   `textContentType`, Android `autofillHints`) for name, email, address,
   one-time codes, and passwords. OTP fields that auto-read from SMS turn
   a 20-second task into one tap.
3. **Size and space touch targets.** Minimum 44x44pt (iOS) / 48x48dp
   (Android), with 8pt+ spacing between destructive and common actions.
   Put primary actions in thumb reach (bottom half); top corners are the
   most expensive real estate on large phones.
4. **Manage the keyboard as layout.** The keyboard covers a third of the
   screen: scroll the focused field into view, keep the submit button
   visible (inputAccessory / imeOptions), and never trap the user behind a
   keyboard with no dismiss affordance.
5. **Validate at the right moment.** Inline-validate on blur, not on every
   keystroke; show errors next to the field with plain language; never
   clear entered data on error. Submit stays enabled and reports what is
   missing on tap: a disabled button with no explanation is a dead end.
6. **Cut fields ruthlessly.** Every optional field costs completions:
   derive city from postal code, split payment from profile, default
   country from locale. A form that fits one screen without scrolling
   converts measurably better.
7. **Use haptics as punctuation, not decoration.** Light impact for
   confirmations and selection changes, notification haptics for
   success/failure; respect system settings. Constant buzzing trains users
   to ignore it.

## Boundaries

- Tablets and foldables break thumb-reach assumptions; test layouts at
  both size classes rather than scaling the phone design up.
- Accessibility is the floor: targets, labels, and error announcements
  must work with screen readers and switch access; see accessible-forms.
- Do not suppress paste on any field, including passwords and OTP; it
  defeats managers and helps nobody.
