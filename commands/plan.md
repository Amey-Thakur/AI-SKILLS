---
description: "Turn a task or project into a clear, ordered plan with steps, milestones, and risks. A quick /plan command for anything you need to get done."
argument-hint: "[objective]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Make a plan for: {objective}

Context: {context}

Produce:
- The goal and what done looks like, stated concretely.
- The steps in order, grouped into milestones for anything sizable, with
  dependencies noted (what must happen before what) and what can go in
  parallel.
- The risks and unknowns: what could go wrong or block progress, and how to
  handle each. Flag the parts you are least sure about.
- The first concrete action to take now.

Rules: realistic over ambitious (account for the work people forget: testing,
review, the unexpected). Order by dependency and priority. Keep steps concrete
and actionable, not vague topics. Right-size the plan to the objective: a small
task needs a short list, a project needs milestones. If the objective is too
vague to plan, ask what would clarify it. For decomposing a big task into
subtasks see break-down-task; for an agent to execute a goal autonomously see
the goal prompt.
