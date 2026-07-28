---
name: write-eval-suite
description: Build an evaluation suite for an AI feature with cases, criteria, and thresholds fixed in advance.
variables:
  - "{feature}: what the AI feature does and what good output looks like"
  - "{failures}: known failure modes or examples of bad output"
settings: "Temperature 0.2."
---

Build an evaluation suite for:

{feature}

Known failures: {failures}

Use agent-eval-design and prompt-testing.

Produce:
- Cases drawn from real usage, including the known failures.
- Pass criteria per case: exact, rubric, or judged.
- Adversarial cases: empty, very long, contradictory, injection attempts.
- Cases the system should refuse, and what correct refusal looks like.
- How many runs per case, given non-determinism.
- The threshold that counts as passing.
- What triggers a re-run: prompt changes and model upgrades.

Rules: fix criteria before running. Include refusal cases, since a system
that never refuses is a failure mode. Run each case several times and
use a pass rate rather than a single result. State what the suite does
not cover.
