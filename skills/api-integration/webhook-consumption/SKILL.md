---
name: webhook-consumption
description: Receive webhooks reliably, verifying authenticity and handling duplicates, ordering, and retries. Use when a provider pushes events to your service.
---

# Webhook consumption

A webhook endpoint is an unauthenticated public write path until you
verify it, and providers deliver at least once with no ordering
guarantee. Both facts must be designed for rather than discovered.

## Method

1. **Verify the signature before anything else.** An endpoint that acts
   on unverified payloads can be driven by anyone who knows the URL
   (see mcp-security-boundaries).
2. **Respond immediately and process asynchronously.** Acknowledge
   within the provider's timeout and queue the work, since slow
   processing causes retries and duplicates.
3. **Deduplicate by event id.** Redelivery is normal, and processing a
   payment event twice is the failure this prevents (see idempotency).
4. **Do not assume order.** Events arrive out of sequence, so use
   timestamps or version numbers in the payload rather than arrival
   order (see message-ordering).
5. **Handle unknown event types gracefully.** Providers add types, and
   an endpoint that errors on unrecognised events generates retries and
   alerts for no reason.
6. **Reconcile periodically against the provider's API.** Webhooks get
   lost, so a scheduled comparison catches what the push missed (see
   payment-reconciliation).
7. **Monitor delivery failures from both sides.** Their dashboard and
   your error rate together, since a silently failing endpoint looks
   identical to no events.

## Boundaries

Webhooks are best effort even from good providers, which is why
reconciliation is not optional. Payload contents are provider-defined
and change. Public endpoints attract scanning and need rate limiting
independent of signature verification.
