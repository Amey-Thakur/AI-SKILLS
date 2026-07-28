---
name: on-call-health
description: Run an on-call rotation that is sustainable, with alert hygiene, fair distribution, and follow-through on what caused the pages. Use when on-call is dreaded or people are leaving because of it.
---

# On-call health

On-call is where reliability debt is paid, by people, at night. A
rotation that burns people out loses the institutional knowledge that
made the system operable, which is an expensive way to learn.

## Method

1. **Track pages per shift and treat the number as a target.** More than
   a couple of interrupting pages per shift is unsustainable and should
   drive work (see alerting-design).
2. **Delete alerts nobody acts on.** An alert that is always
   acknowledged and ignored trains people to ignore all of them.
3. **Every page needs a runbook.** Being woken without instructions is
   both slower and worse for the person (see runbook-writing).
4. **Fix the causes, prioritised.** Follow-up work from incidents must
   be scheduled, or the same page recurs indefinitely (see
   incident-postmortem).
5. **Compensate and protect recovery.** Time off after a bad night is
   not generosity, it is how you keep people.
6. **Share the rotation broadly.** A small rotation is fragile and
   concentrates burnout; broadening it also spreads system knowledge.
7. **Hand over deliberately.** A written handover of ongoing issues
   prevents the next shift rediscovering them (see oncall-handoff).

## Boundaries

On-call health depends on system reliability, so process improvements
cannot compensate for a fundamentally unstable system. Rotations need
enough people, which is a staffing decision. Working-hours expectations
and compensation for on-call are employment matters (see
agent-people-ops-desk).
