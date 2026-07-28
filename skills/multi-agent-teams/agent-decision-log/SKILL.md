---
name: agent-decision-log
description: Record what was decided, by whom, on what basis, and when to revisit, so decisions are not relitigated or silently forgotten. Use when the same discussion recurs and nobody remembers why the current approach was chosen.
---

# Agent decision log

Undocumented decisions get remade, usually worse and always slower. A
decision log is cheap to keep and disproportionately valuable, because
the expensive part of any decision is the context that produced it, and
that is exactly what evaporates.

## Method

1. **Record the decision, not the discussion.** What was chosen, the
   alternatives rejected, and the reason. Meeting transcripts are not a
   decision record (see architecture-decision-records).
2. **Capture the basis, including the uncertainty.** What was believed
   at the time and how confident, which is what makes a later review
   fair rather than hindsight-driven (see decision-journals).
3. **Name the decision maker.** Not the group, the person, since
   accountability that is collective is accountability that is absent.
4. **Set a revisit trigger, not just a date.** What would need to change
   for this to be reconsidered, so review is prompted by events rather
   than by the calendar.
5. **Make it searchable at the point of need.** A log nobody finds when
   the question recurs has failed, so it must be linked from where the
   work happens.
6. **Record reversals as new decisions.** Changing course is normal;
   quietly changing course without a record is how an organisation loses
   its memory.
7. **Keep it short.** A paragraph per decision gets written; a template
   with twelve fields does not.

## Boundaries

The log records; it does not decide, and a well-documented bad decision
is still bad. Decisions about people and anything legally sensitive
belong in restricted systems rather than a shared log (see
data-classification). A log is only as honest as what people are willing
to write down, which depends on whether being wrong is survivable.
