---
description: "Assess the gap between current and required capability using demonstrated evidence rather than confidence."
argument-hint: "[required]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
