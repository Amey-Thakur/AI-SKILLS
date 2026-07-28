---
name: prompt-optimization
description: Improve an underperforming prompt through structured changes measured against fixed cases.
variables:
  - "{prompt}: the current prompt and what it produces"
  - "{failures}: the specific outputs that were wrong and why"
settings: "Temperature 0.3."
---

Improve this prompt:

{prompt}

Observed failures: {failures}

Use prompt-iteration, prompt-structure, and prompt-constraints.

Produce:
- A diagnosis of why the failures happen: structure, ambiguity, missing
  constraint, or a model limitation.
- The revised prompt.
- What changed and which failure each change addresses.
- Test cases including the failures, for regression.
- What to check next if the revision does not work.

Rules: change for a stated reason, not by rewriting wholesale. Prefer
removing instructions to adding them. State plainly where the failure is
a model limitation no prompt fixes. Keep the case set so the change is
verifiable.
