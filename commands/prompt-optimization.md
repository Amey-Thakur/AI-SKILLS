---
description: "Improve an underperforming prompt through structured changes measured against fixed cases."
argument-hint: "[prompt]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
