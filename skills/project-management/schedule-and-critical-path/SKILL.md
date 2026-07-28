---
name: schedule-and-critical-path
description: Sequence work by dependency to find which tasks actually determine the finish date, and manage those. Use when a project has many parallel workstreams and an immovable date.
---

# Schedule and critical path

Not all late tasks delay a project. The critical path is the longest
chain of dependent work, and only delays on it move the end date.
Managing everything equally spreads attention where it does not matter.

## Method

1. **Map dependencies before durations.** What must precede what
   determines the shape, and durations only populate it (see
   project-scoping).
2. **Identify the longest dependent chain.** That chain is the project
   duration, and shortening anything else changes nothing.
3. **Focus management attention on the critical path.** Daily attention
   there and weekly elsewhere, because that is where delay is real.
4. **Know the slack on everything else.** Tasks off the path can slip by
   their slack without harm, which prevents false alarms and wasted
   escalation.
5. **Watch for the path changing.** A delayed non-critical task can
   become critical, so the path is re-derived rather than fixed at
   kickoff.
6. **Buffer at the end, not per task.** Per-task padding gets consumed
   by expanding work; a shared buffer at the project level survives.
7. **Start long-lead items first regardless of priority.** Procurement,
   approvals, and hiring have durations you cannot compress, so they gate
   everything (see agent-procurement-desk).

## Boundaries

Critical path analysis assumes dependencies and durations are known,
which is weakest exactly where projects are riskiest. It handles
sequence and not resource contention, where two critical tasks need the
same person. Highly uncertain work suits flow-based management better
than scheduling.
