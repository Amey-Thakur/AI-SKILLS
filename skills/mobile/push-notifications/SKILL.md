---
name: push-notifications
description: Deliver mobile push that users keep enabled by asking permission at the right moment, managing token lifecycle, using categories and silent pushes correctly, and respecting quiet hours. Use when adding push, debugging non-delivery, or opt-in rates are low.
---

# Push notifications

Push is a permission you can lose once and rarely regain. The recurring
failures are asking for permission on first launch, treating the device
token as permanent, and sending at hours that get the app muted or deleted.
Earn the opt-in, keep the token fresh, and send with restraint.

## Method

1. **Ask for permission in context, after showing value, never on cold
   launch.** Prime with a custom pre-permission screen that explains what
   the user will get, then trigger the OS dialog only when they opt in.
   iOS grants one system prompt; a first-launch denial is close to
   permanent, recoverable only by sending the user to Settings. Trigger the
   real prompt at a moment tied to a benefit the user just asked for.
2. **Treat the device token as volatile and sync it server-side.** Tokens
   rotate on reinstall, restore, app update, and at the platform's
   discretion. Capture every `didRegisterForRemoteNotifications` and FCM
   `onNewToken`, upload with the user and device id, and prune tokens the
   push service reports as unregistered so you stop sending to dead
   installs.
3. **Define notification categories with actions and channels.** Register
   categories/actions so users act from the notification (reply, approve),
   and on Android create granular channels (transactional, social,
   marketing) so users disable one class without muting all. One firehose
   channel gets the whole app silenced the first time marketing overreaches.
4. **Use silent/background pushes for data, not as a delivery hack.** Send
   `content-available` or a data-only FCM message to prefetch or sync, and
   accept that the OS throttles and may drop them; never rely on silent
   push for guaranteed delivery. Set correct priority: high only for
   time-critical alerts, since abusing high priority gets an app deprioritized.
5. **Respect quiet hours and per-user frequency.** Convert send times to
   each user's local timezone, hold non-urgent sends inside a quiet window
   (roughly 9pm to 8am), and cap frequency per category. Let genuinely
   urgent alerts (security, real-time) bypass, and make that distinction
   explicit in the payload.
6. **Instrument the whole funnel and reconcile with the provider.** Track
   permission granted, token registered, sent, delivered (APNs/FCM
   receipts), and opened. A high sent count with low delivered points at
   dead tokens or throttling, not at copy.

## Checklist

- Does the OS prompt fire only after a value-establishing moment, gated by
  a primer?
- Are rotated tokens captured on reinstall and restore, and dead tokens
  pruned from the send list?
- Can a user mute marketing without losing transactional alerts?
- Are non-urgent sends held to the recipient's local daytime?

## Boundaries

This covers client permission, token lifecycle, and send policy. The APNs
p8/certificate and FCM key setup and the server-side send infrastructure
are their own configuration. Routing a notification tap to the right screen
with a correct back stack is mobile-navigation and deep-linking. In-app
messaging that renders inside the running app is a separate channel.
