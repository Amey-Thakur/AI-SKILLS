---
name: design-notification-system
description: Design notifications with a frequency budget, the right channel per message, and real user control.
variables:
  - "{events}: what the product would notify about and how urgent each is"
  - "{users}: who they are and how they currently receive updates"
settings: "Temperature 0.3."
---

Design notifications for:

{events}

Users: {users}

Use notification-strategy, digest-design, notification-batching, and
unsubscribe-and-preferences.

Produce:
- Each event classified: must act, should know, or might find interesting.
- Channel per class, defaulting to the least interruptive that works.
- What is batched into a digest and at what cadence.
- The global frequency cap per user.
- Preference controls, granular enough to reduce rather than only stop.
- Quiet hours and time zone handling.
- What is sent regardless of preference, and why.

Rules: default to the least interruptive channel. Every notification
needs an action or it belongs in a digest. Cap frequency globally rather
than per feature. Make unsubscribing easy, since it beats a complaint.
