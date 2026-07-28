---
name: usage-based-metering
description: Meter consumption accurately enough to bill on it, with reconciliation, limits, and transparency the customer can verify. Use when charging by usage rather than a flat subscription.
---

# Usage-based metering

Billing on usage means your telemetry becomes financial data. A dropped
event is lost revenue and a duplicated one is an overcharge, so metering
needs guarantees that ordinary analytics does not.

## Method

1. **Define the billable unit precisely.** What counts, when it counts,
   and what does not. Ambiguity here surfaces as disputes that are
   impossible to settle after the fact.
2. **Emit usage events idempotently with a stable id.** Retries and
   at-least-once delivery are normal, so deduplication must happen on
   ingest (see payment-idempotency).
3. **Aggregate on a defined boundary with a stated time zone.** A
   billing period boundary that shifts by time zone moves usage between
   invoices and makes totals irreproducible (see sql-date-time).
4. **Reconcile the meter against the system of record.** Compare billed
   usage to independently derived counts on a schedule, since silent
   drift is the failure mode.
5. **Show customers their usage as it accrues.** Real-time visibility
   prevents bill shock and removes most disputes before they exist.
6. **Decide limit behaviour explicitly.** Hard stop, soft cap with
   notice, or overage billing, agreed before the customer hits it (see
   rate-limiting).
7. **Keep the raw events for the retention period.** An invoice must be
   defensible line by line, which means the underlying events survive as
   long as the invoice does.

## Boundaries

- Metering measures; what to charge for it is a pricing decision (see
  saas-pricing).
- Estimated or sampled telemetry is unsuitable for billing, however good
  it is for analytics.
- Retroactive corrections need a credit note process rather than an
  edited meter (see invoicing-and-receipts).
