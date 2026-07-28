---
description: "Rank candidate work by value, effort, and confidence, with the reasoning visible enough to argue with."
argument-hint: "[candidates]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Prioritise:

{candidates}

Goals: {goals}

Use prioritization-frameworks and agent-goal-cascade.

Produce:
- Each item scored on value, effort, and confidence, with the basis.
- How each serves a stated goal, or a note that it does not.
- The ranked list.
- What is being deferred and what that costs.
- Dependencies that force sequencing regardless of rank.
- The items where confidence is low enough to need discovery first.

Rules: mark low-confidence estimates rather than presenting them as
equal. Items serving no stated goal should be flagged, not quietly
ranked. Effort estimates are ranges. State what would change the order.
