---
name: push-notification-permissions
description: Ask for push permission at a moment when the value is obvious, and handle denial gracefully, because the prompt only comes once. Use when adding push to a mobile or web product.
---

# Push notification permissions

The permission prompt is a one-shot resource on most platforms. Asking
on first launch, before any value has been shown, converts a majority
into permanent denials that no later feature can recover.

## Method

1. **Never ask on first launch.** The user has no reason to say yes and
   the denial is effectively permanent.
2. **Ask at a moment of obvious value.** Right after the user does
   something whose follow-up genuinely warrants a notification, such as
   watching an item or starting a long job.
3. **Pre-ask in your own interface first.** A soft prompt explaining
   what will be sent, with a decline that does not consume the system
   prompt, preserves the real ask for people likely to accept.
4. **Say specifically what you will send.** Vague requests are declined;
   we will tell you when your report is ready is accepted.
5. **Handle denial without degrading the product.** Fall back to in-app
   and email, and never nag, since repeated prompting is both against
   platform guidance and self-defeating (see in-app-messaging).
6. **Offer a path back.** Users who later want notifications need
   guidance to the system settings, since your app cannot re-prompt.
7. **Honour the permission's meaning.** Accepting notifications about
   one thing is not consent to marketing (see
   unsubscribe-and-preferences).

## Boundaries

Platform rules govern prompt behaviour and change between OS versions.
Permission granted is not engagement, and a granted permission abused
leads to system-level muting you cannot see. Web push has its own
constraints and much lower acceptance than mobile.
