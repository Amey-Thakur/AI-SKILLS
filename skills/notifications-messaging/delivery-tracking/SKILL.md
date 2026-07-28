---
name: delivery-tracking
description: Know whether a message was accepted, delivered, opened, and acted on, and treat failures as events rather than statistics. Use when messages are assumed delivered and support tickets say otherwise.
---

# Delivery tracking

Sending is not delivering. Between your system and the user sit
providers, filters, devices, and permissions, each capable of dropping a
message silently. Tracking is what turns an assumption into a fact.

## Method

1. **Record each stage separately.** Queued, sent, accepted by the
   provider, delivered, opened, acted on. Collapsing these hides where
   the loss happened.
2. **Consume provider webhooks.** Bounces, deferrals, and complaints
   arrive asynchronously, and a system that only records the send call
   knows almost nothing (see webhooks-design).
3. **Alert on failure of critical messages.** A failed password reset is
   an incident for that user, not a line in a report (see
   transactional-messaging).
4. **Distinguish hard from soft failures.** A permanent address failure
   needs list removal; a temporary one needs retry. Treating them alike
   damages reputation (see email-deliverability).
5. **Correlate to the triggering event.** Tracking that cannot answer
   whether this order's confirmation arrived is not answering the
   question support asks.
6. **Interpret open tracking cautiously.** Image blocking and privacy
   proxies make opens an unreliable lower bound rather than a
   measurement.
7. **Retain long enough to answer disputes.** Delivery evidence is what
   settles the argument about whether a notice was sent.

## Boundaries

Tracking shows delivery to a device or mailbox, never that a human read
it. Open and click tracking involves collecting behavioural data and
needs privacy consideration (see data-minimization). Some channels
provide no delivery feedback at all, and that limit should be
acknowledged rather than assumed away.
