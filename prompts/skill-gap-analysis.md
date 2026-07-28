---
name: skill-gap-analysis
description: Assess the gap between current and required capability using demonstrated evidence rather than confidence.
variables:
  - "{required}: the capabilities the role or project needs"
  - "{current}: what has actually been demonstrated, with examples"
settings: "Temperature 0.3."
---

Analyse the skill gap for:

Required: {required}

Demonstrated: {current}

Use skill-assessment and deliberate-practice.

Produce:
- Each capability rated by evidence, not by confidence.
- Where evidence is missing rather than the capability being absent.
- Gaps ranked by how much they block the work.
- For the top gaps: what practice would close them and how you would
  know.
- What can be worked around rather than learned.
- A realistic timeframe.

Rules: rate on demonstrated evidence and mark unevidenced items as
unknown rather than absent. Distinguish gaps that block from gaps that
are merely uncomfortable. Self-assessment is unreliable, so note where
external calibration is needed.
