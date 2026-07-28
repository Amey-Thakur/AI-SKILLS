---
name: transactional-messaging
description: Send the messages a user is waiting for, such as receipts, resets, and confirmations, with reliability and clarity that marketing messages do not need. Use when building password resets, receipts, or order confirmations.
---

# Transactional messaging

A transactional message is one the user is actively waiting for, which
makes latency and delivery non-negotiable in a way marketing never is.
It also usually cannot be unsubscribed from, which places obligations on
what it may contain.

## Method

1. **Separate transactional from marketing at the infrastructure
   level.** Different sending domains and streams, so a marketing
   reputation problem cannot block a password reset (see
   email-deliverability).
2. **Send immediately and monitor latency.** A reset arriving in five
   minutes is a failed reset, because the user has already retried
   twice.
3. **Say the one thing plainly.** The code, the amount, the status,
   visible without scrolling and without marketing wrapped around it.
4. **Keep promotional content out.** Adding marketing to a receipt can
   reclassify it as commercial mail in some jurisdictions, with
   consent obligations attached.
5. **Make it verifiable and safe.** Users are trained by phishing to
   distrust these, so consistent sender identity and no unexpected link
   patterns matter (see phishing-resistance).
6. **Retry with alerting on failure.** A failed transactional send is an
   incident, not a metric, and needs a fallback channel where the action
   is critical.
7. **Include what the user needs to self-serve.** Order number, support
   path, and what happens next, so the message reduces support contact
   rather than causing it.

## Boundaries

Transactional exemptions from consent rules are narrow and depend on
content; adding promotion can remove the exemption (see
pii-handling). Delivery is best effort even at high reliability, so
critical flows need an in-product path that does not depend on a message
arriving.
