---
name: vendor-data-processing
description: Assess and control what third-party services do with personal data you send them, before and after integration. Use when adding a vendor, SDK, or API that will receive user data.
---

# Vendor data processing

Every integration extends your data perimeter to someone else's
systems. The vendor's controls become your controls, their breach
becomes your notification obligation, and their subprocessors become
part of your data map.

## Method

1. **Establish what the vendor actually receives.** Not what the
   integration is for, but what the payload contains, including
   identifiers, IP addresses, and anything incidental in free text or
   logs (see data-minimization).
2. **Check purpose limits.** Whether the vendor may use your data to
   improve their own products, train models, or build profiles is the
   question that most often surprises teams after signing.
3. **Enumerate subprocessors and locations.** The vendor's own vendors
   process your data too, and their regions matter (see
   cross-border-transfers).
4. **Confirm deletion and export paths before integrating.** How you
   get data out and how you make them delete it decides whether you can
   honour your own obligations (see right-to-erasure,
   subject-access-requests).
5. **Scope credentials and access narrowly.** Least privilege for the
   vendor's key, restricted endpoints, and revocation you can perform
   yourself in minutes (see secrets-management, api-security).
6. **Re-review on change.** SDK updates widen collection, terms change,
   and subprocessor lists grow, so periodic re-checks catch drift that
   the original assessment cannot.

## Boundaries

- Contractual terms are legal instruments; engineering verifies what
  the integration does technically, which is often narrower or wider
  than the contract describes.
- A vendor's certification is evidence, not a guarantee, and it does
  not transfer your accountability to them.
- Client-side SDKs can collect far more than the documented API
  suggests; inspect traffic rather than trusting the description.
