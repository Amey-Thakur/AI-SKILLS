---
description: "Estimate a task or project honestly, by decomposing it, surfacing unknowns, and giving a range not a false point."
argument-hint: "[work]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Estimate this work: {work}

Context: {context}

Approach:
1. Decompose it into the actual pieces of work (a task the size of a project is
   unestimable; a task the size of a day is). Break down until each piece is
   something you can size to within a factor of two.
2. Estimate each piece as a range (optimistic / likely / pessimistic), not a
   single number: the range is the honest answer, and its width shows the
   uncertainty.
3. Surface the unknowns and risks: the parts you cannot size well (a new
   technology, an unclear requirement, a dependency on another team). These are
   where estimates blow up: name them, and note what would reduce the
   uncertainty (a spike, a decision, an answer).
4. Add the invisible work people forget: testing, code review, deployment,
   documentation, meetings, the unexpected. Real projects spend a large
   fraction here.
5. Give the overall estimate as a range with your confidence, and the top 2-3
   risks that could push it past the high end.

Rules: honest over optimistic (the planning fallacy makes every estimate too
low: reference how long similar work actually took, not how long it feels).
Ranges, never false-precision points. If the work is too vague to estimate,
say what must be clarified first. Do not pad silently or sandbag: explain the
reasoning so the estimate can be trusted and challenged.
