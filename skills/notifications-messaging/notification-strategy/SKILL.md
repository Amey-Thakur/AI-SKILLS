---
name: notification-strategy
description: Decide what deserves a notification, on which channel, and at what urgency, before building any of it. Use when notifications are added per feature and users are starting to mute everything.
---

# Notification strategy

Every notification spends attention the user did not agree to spend.
Products accumulate them one feature at a time, each defensible alone,
until the whole set is muted. Strategy is deciding centrally what earns
an interruption.

## Method

1. **Classify by whether the user must act.** Something needs you now,
   something happened you should know, and something you might find
   interesting are three different classes deserving different channels
   and urgency.
2. **Default to the least interruptive channel that works.** In-app,
   then digest, then email, then push. Escalating channel is a decision
   requiring justification rather than the starting point.
3. **Ask what the user does next.** A notification with no useful action
   is information, and information belongs in a digest or a feed (see
   digest-design).
4. **Make the sender pay a cost.** A review step before any new
   notification type ships prevents the gradual accumulation that kills
   the whole channel.
5. **Cap total frequency per user, globally.** Per-feature limits still
   sum to too many, so the ceiling belongs at the user level (see
   notification-batching).
6. **Write the copy at design time.** If a clear one-line message cannot
   be written, the notification is not well defined enough to send.
7. **Review engagement per type and retire the dead ones.** A type
   nobody opens is training users to ignore all of them.

## Boundaries

Strategy governs what you send; delivery reliability is a separate
concern (see delivery-tracking). Some notifications are legally required
regardless of preference, such as security and billing notices (see
transactional-messaging). Cultural and regional expectations about
interruption differ and are worth respecting.
