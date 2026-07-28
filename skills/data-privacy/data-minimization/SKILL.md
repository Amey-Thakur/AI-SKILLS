---
name: data-minimization
description: Collect and keep only the personal data a feature actually needs, so exposure, cost, and compliance burden all shrink at once. Use when designing a form, an event schema, a log line, or any system that touches personal data.
---

# Data minimization

Every field you collect is a field you must secure, justify, retain,
delete, and disclose. Minimization is the cheapest privacy control
there is, because data you never held cannot leak, cannot be subpoenaed,
and never appears in a breach notice.

## Method

1. **Tie every field to a stated purpose.** Before a field enters a
   form, an event, or a log, name the decision it supports. Fields kept
   because they might be useful later are the ones that show up in
   incidents with nobody able to explain why they existed.
2. **Prefer derived over raw.** Store an age band rather than a birth
   date, a region rather than a precise location, a hash rather than
   the identifier itself when you only need to match. The narrower form
   answers the same question with less to lose.
3. **Separate identity from behaviour.** Keep identifiers in one place
   and events in another, joined by a surrogate key. Analytics that
   never carries names is analytics that cannot leak them (see
   data-anonymization).
4. **Watch the accidental collectors.** Logs, crash reports, analytics
   payloads, and support screenshots collect personal data nobody
   planned for. Redact at the point of capture rather than promising to
   clean it up later (see structured-logging).
5. **Set an expiry with the field, not afterwards.** Deciding how long
   something lives at the moment you add it is far easier than
   reconstructing a retention policy for a table that has grown for
   three years (see right-to-erasure).
6. **Re-check on every schema change.** New fields arrive with new
   features and rarely get the same scrutiny as the original design, so
   make a quick purpose check part of review (see privacy-by-design).

## Boundaries

- Minimization reduces exposure; it does not replace access control or
  encryption for what you do keep (see authz-design,
  data-encryption).
- Some data is legally required to retain, and minimizing it is not
  yours to decide (see data-classification, vendor-data-processing).
- Aggregation is not automatically anonymous; small groups remain
  identifiable (see data-anonymization).
