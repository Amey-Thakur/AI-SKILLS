---
name: payment-integration
description: Integrate a payment provider so charges are authorised, confirmed, and recorded correctly even when the customer closes the tab. Use when adding checkout or moving to a new payment provider.
---

# Payment integration

A payment is a distributed transaction between your system, the
customer's browser, and a provider that may confirm minutes later. Every
serious bug here comes from treating it as a synchronous function call
that either returns success or fails.

## Method

1. **Never let card data touch your servers.** Use the provider's hosted
   fields or redirect so the sensitive data goes directly to them, which
   is what keeps your compliance burden small (see pci-scope-reduction).
2. **Treat the webhook as the source of truth, not the redirect.** The
   customer may close the tab before returning, and the browser
   confirmation can be lost or forged. The provider's signed
   notification is what confirms the money moved.
3. **Verify webhook signatures and replay protection.** An unverified
   webhook endpoint is an unauthenticated write to your billing state
   (see webhooks-design).
4. **Make the whole flow idempotent.** Retries and duplicate webhooks
   are normal, so every step must be safe to repeat (see
   payment-idempotency).
5. **Model the states explicitly.** Pending, authorised, captured,
   failed, refunded, disputed. Collapsing this into a boolean is what
   makes reconciliation impossible later (see payment-reconciliation).
6. **Handle authorisation and capture separately when they differ.**
   Authorising at checkout and capturing at fulfilment is common in
   physical goods and changes the timing of everything downstream.
7. **Test the failure paths deliberately.** Declines, expired cards,
   timeouts, and duplicate webhooks with the provider's test cards,
   because the happy path is the one that never breaks in production.

## Boundaries

- Integration moves money; deciding what to charge and when is product
  and legal territory (see subscription-billing, tax-calculation).
- Card network rules and provider terms constrain what you may do, and
  they override architectural preference.
- Never log full card details, and treat any accidental capture as an
  incident (see data-classification).
