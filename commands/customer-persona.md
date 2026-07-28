---
description: "Build a persona from evidence, capturing the job, the trigger, and the objection rather than demographics."
argument-hint: "[evidence]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Build a persona from:

{evidence}

Product context: {product}

Use customer-personas and customer-interviews.

Produce:
- The job they are trying to get done.
- The trigger: what changed that made them look now.
- Their current approach and what frustrates them about it.
- The objection that almost stops them buying.
- Who else is involved in the decision.
- Verbatim quotes supporting each point.

Rules: build only from the supplied evidence and mark anything inferred
as inference. Skip demographics unless they change behaviour. If the
evidence is too thin to support a persona, say so and state what to
gather. Do not invent quotes.
