---
name: agent-training-academy
description: Turn internal knowledge into role-based learning paths with agents that build, test, and keep material current as systems change. Use when onboarding is slow because knowledge lives in people rather than in material.
---

# Agent training academy

Internal knowledge decays because writing it down is nobody's priority
and updating it is nobody's job. Agents are well suited to both: turning
existing artefacts into learning paths and detecting when the underlying
systems have moved.

## Team

- **Curriculum designer**: builds a role-based path from existing docs,
  code, and runbooks.
- **Material writer** (`technical-writing`): produces the lesson and
  its exercise.
- **Freshness checker**: detects when source material has changed and
  flags affected lessons.

Shape: build once per role, then continuous freshness maintenance.

## Method

1. **Start from the role's first month.** What someone must be able to
   do by week one, week two, and month one, which is a far more useful
   organising principle than topic coverage.
2. **Build from existing artefacts.** Runbooks, architecture notes, and
   real incidents make better material than invented examples, and they
   stay closer to reality (see runbook-writing).
3. **Give every lesson a check.** A task the learner performs, not a
   quiz, since the point is capability rather than recall.
4. **Link to the source rather than copying it.** Duplicated
   documentation diverges immediately; the lesson should teach and point
   (see documentation).
5. **Detect drift automatically.** When a referenced document or system
   changes, the affected lessons are flagged for review rather than
   quietly going stale.
6. **Capture what new joiners actually got stuck on.** Their questions
   are the highest-signal input to the next version of the path (see
   contributor-onboarding).
7. **Keep paths short and sequenced.** A long curriculum is abandoned;
   a short one that unblocks the first real task gets finished.

## Run it

In Claude Code, run the designer over the docs directory into a path
file per role, the writer per lesson into its own file, and the
freshness checker on a schedule comparing referenced sources against
their last-reviewed state. Port to CrewAI as a build crew plus a
scheduled maintenance task.

## Signals it works

- New joiners complete a real task by the end of week one.
- Lessons flag themselves when their source material changes.
- Questions from joiners feed the next revision.

## Boundaries

Agents assemble and maintain material; they do not assess people, which
is a management responsibility with fairness and legal implications (see
agent-people-ops-desk). Material covering safety, compliance, or
regulated procedures needs qualified review before use. Internal
material often contains sensitive detail and needs access control (see
data-classification).
