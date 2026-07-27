---
name: agent-people-ops-desk
description: Support the recurring people function with agents that maintain onboarding paths, keep policy documents current, prepare review inputs, and flag gaps, while every human decision stays human. Use when a growing team keeps reinventing process.
---

# Agent people ops desk

The people function has a large administrative layer that decays
quietly: onboarding checklists go stale, policies contradict practice,
and review cycles start from a blank page. Agents maintain that layer
well. Everything involving a judgement about a person stays with a
person, without exception.

## Team

- **Onboarding maintainer**: keeps role-specific ramp paths current
  against the systems and docs that actually exist.
- **Policy librarian**: tracks policy documents, flags contradictions
  and out-of-date references.
- **Review preparer** (`giving-feedback`, `one-on-one-meetings`):
  assembles factual inputs a manager uses to write a review.

Shape: standing maintenance on a cadence, plus per-cycle preparation.

## Method

1. **Keep onboarding as a living checklist per role.** Access, tools,
   first tasks, and who to meet, verified against reality rather than
   copied from the last hire (see mentoring-engineers).
2. **Detect policy drift by comparison.** Compare policy text against
   current practice and other policies, flagging contradictions for a
   human to resolve rather than editing policy autonomously.
3. **Prepare review inputs from facts, not opinions.** Shipped work,
   documented contributions, and stated goals, assembled and cited. The
   assessment itself is the manager's to write.
4. **Never let an agent evaluate a person.** No scoring, ranking, or
   recommendation about individuals. This is a hard line, both for
   fairness and because it is regulated in many jurisdictions.
5. **Track the calendar of obligations.** Probation dates, review
   cycles, training renewals, and right-to-work checks, surfaced ahead
   of time.
6. **Keep personal data tightly scoped.** People data is sensitive by
   default, so access is narrow, retention is defined, and agents see
   the minimum needed (see data-classification, data-minimization).
7. **Escalate anything with a human consequence.** Performance
   concerns, complaints, and conflicts go to a person immediately and
   are never processed by an agent.

## Run it

In Claude Code, run the maintainers on a schedule over your internal
docs directory, writing findings for a human to action, and run the
review preparer per cycle producing an input pack per person that only
their manager reads. Keep people data out of shared contexts. Port to
CrewAI as scheduled maintenance tasks with a strict human gate.

## Signals it works

- New joiners follow a checklist that matches reality.
- Policy contradictions surface before someone hits them.
- Managers start reviews from assembled facts, never from a draft
  assessment.

## Boundaries

This desk maintains process and assembles facts. It does not evaluate,
rank, hire, discipline, or terminate, and it does not advise on
employment law, which varies by jurisdiction and needs qualified input.
Automated decision-making about people carries legal restrictions in
many places. Employee data is sensitive, and complaints or grievances go
straight to a human.
