---
description: "Review objectives honestly against outcomes, separating execution failure from wrong strategy."
argument-hint: "[okrs]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Review these objectives:

{okrs}

Period context: {context}

Use agent-strategy-review, okr-draft, and project-retrospective.

Produce:
- Each key result against target, with the real number.
- Whether misses were execution or the objective being wrong.
- Objectives that were achieved but did not produce the intended
  outcome.
- What was learned that changes the next set.
- Which objectives should carry forward, change, or be dropped.
- What was predicted at the start that turned out false.

Rules: distinguish execution failure from strategy failure, since they
need opposite responses. A key result hit without the outcome moving
means the wrong measure was chosen. Continuing an objective is a decision
to record, not a default.
