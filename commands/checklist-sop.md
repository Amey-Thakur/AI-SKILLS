---
description: "Turn a process into a clear checklist or standard operating procedure (SOP) anyone can follow without you."
argument-hint: "[process]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Turn this into a checklist / SOP:

{process}

Who follows it: {audience}

Produce:
- A title and a one-line statement of what this procedure accomplishes and when
  to use it.
- The steps in order, each: a single concrete action stated as an imperative
  ("Verify X", "Run Y"), specific enough that the reader does not have to guess.
  Break compound steps apart so nothing is skipped.
- Where a step has a decision point, state the condition and both branches
  ("If the check fails, do Z; otherwise continue").
- Verification: how to confirm each critical step worked before moving on, and
  how to know the whole procedure succeeded.
- Prerequisites at the top (access, tools, information needed) and any warnings
  for the destructive or irreversible steps (flag them clearly).

Rules: written for someone doing it for the first time without you in the room:
no assumed knowledge the audience lacks, no vague steps ("configure the
settings" is not a step). Concrete and checkable (a checklist item you cannot
tick off with certainty is not done right). Include the failure and rollback
path where a step can go wrong. Note where the process should be tested or
where it needs an owner to keep it current. Output as a numbered checklist.
