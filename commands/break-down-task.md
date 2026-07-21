---
description: "Break a goal into an ordered, actionable plan with dependencies and a clear first step."
argument-hint: "[goal]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Break this goal into an actionable plan: {goal}

Constraints: {constraints}

Produce:
1. The end state in one sentence: what "done" concretely looks like, so
   progress is measurable.
2. An ordered list of steps. Each step: a concrete action (starts with a
   verb), roughly how big it is (minutes/hours/days), and what it depends on.
   Order by dependency, and put the riskiest or most uncertain step early so
   failure is cheap.
3. The single first step you would do right now: small enough to start
   today, concrete enough that there is no ambiguity about what to do.
4. The biggest risk or unknown, and the cheapest way to reduce it.

Rules: steps must be actions, not topics ("write the login endpoint", not
"authentication"). Keep the list as short as the goal allows; do not
manufacture busywork. If the goal is too vague to plan, name what needs to be
decided first.
