---
name: notification-batching
description: Group related events so a burst of activity produces one message instead of twenty, with rules that stay predictable. Use when a single action generates many notifications or activity comes in bursts.
---

# Notification batching

One person doing one thing can generate a dozen notifications: a
comment, a mention, an assignment, an edit. Batching collapses the burst
into a single message, and the design question is how long to wait
before deciding the burst is over.

## Method

1. **Batch by the entity the user cares about.** Everything that
   happened to one document or one thread, since that is how people
   think about it, not by event type.
2. **Use a short debounce window.** Waiting a few minutes after the last
   event catches the burst without making the notification stale (see
   batching-and-debouncing).
3. **Cap the wait.** A continuously active thread must still notify
   eventually, or a busy discussion produces silence.
4. **Summarise the batch meaningfully.** Three people commented on your
   document beats three separate messages and beats a list of three
   identical lines.
5. **Let urgency bypass batching.** A direct mention or an assignment
   may deserve immediate delivery while ambient activity batches (see
   notification-strategy).
6. **Collapse repeats of the same event.** Someone editing five times in
   a minute is one edit from the reader's perspective.
7. **Keep batching rules explainable.** Users who cannot predict when
   they will be told something lose trust in the channel entirely.

## Boundaries

Batching trades immediacy for volume, which is wrong for anything
time-critical. Per-user batching state costs storage and complexity at
scale. Cross-channel batching is harder, since a push already sent
cannot be un-sent when the digest goes out later.
