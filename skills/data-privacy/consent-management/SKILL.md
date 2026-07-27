---
name: consent-management
description: Ask for, record, and honour consent so processing has a lawful basis and withdrawal actually stops it. Use when adding tracking, marketing, or any optional processing of personal data.
---

# Consent management

Consent is a permission with a lifecycle: it must be freely given,
specific, recorded, and as easy to withdraw as to grant. Most consent
failures are not the banner but what happens after: the flag is stored
and then nothing downstream reads it.

## Method

1. **Ask separately for separate purposes.** Analytics, personalisation,
   and marketing are distinct choices, and bundling them into one
   accept is what regulators single out. Granularity is the point.
2. **Make refusal as cheap as acceptance.** A prominent accept beside a
   buried reject is not freely given consent. Equal weight for both
   options is the test to apply to your own banner.
3. **Record what was consented to and when.** Store the purpose, the
   version of the wording shown, the timestamp, and the mechanism. When
   asked to prove consent, a boolean column proves nothing.
4. **Gate the code path, not just the UI.** The tracker must not load,
   the event must not fire, and the profile must not build until the
   flag says yes. Consent that only hides a banner is theatre.
5. **Make withdrawal propagate.** Withdrawal has to reach every system
   that received the data, including analytics stores and vendors, and
   it takes effect going forward without deleting what lawful
   processing already produced unless erasure is also requested (see
   right-to-erasure, vendor-data-processing).
6. **Re-ask when the purpose changes.** New processing needs new
   consent; silently widening what an old yes covers is the most common
   way a compliant system drifts out of compliance.

## Boundaries

- Consent is one lawful basis among several, and often the weakest.
  Contract or legitimate interest may fit better and can be more
  durable, which is a legal determination rather than an engineering
  one.
- Consent for cookies and consent for processing are governed by
  different rules in some jurisdictions; do not assume one covers the
  other.
- A consent platform records choices; honouring them across your own
  systems remains your engineering work.
