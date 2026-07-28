---
name: project-closure
description: End a project deliberately, with handover, documentation, and a decision about what happens to what was built. Use when a project reaches its goal or is being stopped.
---

# Project closure

Projects often stop rather than close: the team disperses, ownership is
unclear, and the thing built becomes an orphan that surprises somebody
during an incident months later.

## Method

1. **Confirm the outcome against the original goal.** What was achieved
   compared to what was scoped, honestly, including what was dropped
   (see project-scoping).
2. **Assign ongoing ownership explicitly.** Who maintains, supports, and
   is paged for what was built, because unowned systems are the most
   expensive legacy a project leaves.
3. **Hand over the knowledge, not just the code.** Runbooks, known
   issues, and the decisions behind the design (see runbook-writing).
4. **Close or transfer the open work.** Remaining items are either
   transferred with an owner or closed with a reason, never left in a
   dormant board.
5. **Release the resources deliberately.** Environments, licences, and
   access no longer needed, since these accumulate cost silently (see
   agent-vendor-operations).
6. **Run the retrospective before people disperse.** Memory and
   availability both decay immediately after closure (see
   project-retrospective).
7. **Communicate closure to stakeholders.** People with an interest need
   to know it ended and what the outcome was.

## Boundaries

Closure ends the project, not the system, which continues to need
support and eventually retirement (see feature-sunsetting). Cancelled
projects need closure too, and skipping it because the outcome was
disappointing leaves the worst mess. Handover requires a receiving owner
who has agreed.
