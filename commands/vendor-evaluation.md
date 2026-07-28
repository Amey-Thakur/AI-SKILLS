---
description: "Compare vendors against weighted criteria fixed before the vendor list, including total and exit cost."
argument-hint: "[need]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Evaluate these vendors:

{candidates}

Requirement: {need}

Use agent-procurement-desk and vendor-data-processing.

Produce:
- Weighted criteria derived from the requirement, written before scoring.
- A comparison grid with explicit unknowns where information is missing.
- Data handling: where data goes, subprocessors, deletion and export.
- Total cost including implementation, migration, and overage.
- Exit cost: export formats, notice period, and what breaks on leaving.
- A recommendation with the runner-up and why it lost.

Rules: score every vendor on the same grid. Mark unknowns rather than
assuming favourably. Treat vendor security claims as claims. Note that
contract terms need legal review before signature.
