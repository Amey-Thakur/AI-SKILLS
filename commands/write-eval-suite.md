---
description: "Build an evaluation suite for an AI feature with cases, criteria, and thresholds fixed in advance."
argument-hint: "[feature]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
