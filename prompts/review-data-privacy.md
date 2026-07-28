---
name: review-data-privacy
description: Review a feature for privacy: what is collected, where it goes, how long it stays, and whether deletion works.
variables:
  - "{feature}: what the feature does and what data it touches"
  - "{context}: users, jurisdictions, vendors, and existing policies"
settings: "Temperature 0.2."
---

Review privacy for:

{feature}

Context: {context}

Use privacy-by-design, data-minimization, right-to-erasure, and
vendor-data-processing.

Produce:
- Every field collected and the purpose each serves.
- Fields that could be removed, derived, or aggregated instead.
- Where the data flows: stores, logs, analytics, and vendors.
- Retention per store, and whether deletion reaches all of them.
- Cross-border transfer implications.
- Consent requirements, if any.
- Findings ranked by risk to the person.

Rules: challenge every field against a stated purpose. Trace data into
logs and analytics, which are where collection is unplanned. Verify
deletion reaches derived copies. This is an engineering review, not legal
advice; flag anything needing counsel.
