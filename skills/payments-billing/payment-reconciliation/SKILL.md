---
name: payment-reconciliation
description: Match provider settlements against your own records so every charge, fee, refund, and payout is accounted for. Use when closing books, chasing a discrepancy, or building financial reporting.
---

# Payment reconciliation

Your database says what you charged; the provider's settlement says what
they actually moved, minus fees, plus refunds and disputes. These two
never match by default, and reconciliation is the process that explains
every difference.

## Method

1. **Reconcile against the settlement report, not the API.** The payout
   file is what corresponds to money in the bank, and it is the record
   an accountant will use.
2. **Match on a stable identifier both sides carry.** The provider's
   transaction id stored on your record makes matching mechanical rather
   than heuristic.
3. **Account for fees, refunds, disputes, and reserves separately.**
   Each moves money for a different reason, and lumping them into a
   variance means you have not reconciled, only noticed a gap.
4. **Expect timing differences and model them.** A charge today settles
   later, so period boundaries produce differences that are correct
   rather than errors (see sql-date-time).
5. **Investigate every unmatched item, however small.** Small
   discrepancies are usually a systematic bug that will grow, and the
   value is in the cause rather than the amount.
6. **Automate the match and review only exceptions.** Manual
   reconciliation stops happening under load, which is exactly when it
   matters (see agent-finance-desk).
7. **Reconcile bank to provider as well as provider to system.** Money
   can be correct at the provider and never arrive.

## Boundaries

- Reconciliation verifies movement; it is not accounting, and revenue
  recognition follows different rules (see revenue-recognition-basics).
- Provider reports differ in format and timing, and multi-provider setups
  multiply the work rather than sharing it.
- Currency conversion introduces differences that are genuine rather
  than errors (see currency-localization).
