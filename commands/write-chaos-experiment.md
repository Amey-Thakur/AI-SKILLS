---
description: "Design a failure injection experiment that tests a specific resilience hypothesis safely."
argument-hint: "[hypothesis]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design a chaos experiment for this hypothesis:

{hypothesis}

System: {system}

Use the chaos-engineering skill, plus graceful-degradation for what
should happen.

Specify:
- The precise failure to inject and where.
- The blast radius, kept as small as possible for a first run.
- What is measured, including user-facing impact.
- The abort condition and how to stop immediately.
- Who must be present and informed.
- What result would confirm or refute the hypothesis.

Rules: start in a lower environment unless there is a reason not to. The
stop mechanism must be tested before the experiment. State the risk to
users explicitly. Never design an experiment without organisational
consent, and say so. If the system lacks the observability to see the
result, fix that first.
