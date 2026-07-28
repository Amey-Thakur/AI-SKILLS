---
name: agent-risk-register
description: Maintain a living register of business risks with agents that surface new ones, track mitigations, and force stale entries back to a decision. Use when risks are discussed in meetings and then forgotten until they happen.
---

# Agent risk register

A risk register works only if it changes behaviour. Most decay into a
spreadsheet reviewed annually, listing risks nobody owns. Agents can
keep it current because the maintenance is repetitive and the review
cadence is exactly what humans skip.

## Team

- **Scanner**: proposes new risks from incidents, changes, and external
  signals.
- **Assessor** (`risk-analysis`, `pre-mortem`): rates likelihood and
  impact with a stated basis.
- **Chaser**: tracks mitigation owners and dates, escalating what has
  stalled.

Shape: continuous intake with a scheduled review of the whole register.

## Method

1. **Write risks as specific consequences.** Losing the main cloud
   region for a day, not cloud risk. Vague entries cannot be assessed,
   mitigated, or closed.
2. **Rate likelihood and impact with a stated basis.** Whatever scale
   you use, the reasoning must be recorded, since unexplained ratings
   are unarguable and therefore unimprovable.
3. **Give every risk an owner and a decision.** Mitigate, accept,
   transfer, or avoid. An accepted risk is a legitimate outcome and must
   be recorded as a decision rather than an oversight.
4. **Track mitigations as work with dates.** A mitigation with no owner
   or date is an intention (see agent-compliance-desk).
5. **Feed the register from real events.** Incidents, near misses,
   audit findings, and dependency changes each propose entries
   automatically (see agent-postmortem-council).
6. **Force stale entries back to a decision.** Anything unreviewed past
   a threshold is escalated, since a register full of untouched entries
   is worse than a short honest one.
7. **Review the top risks on a fixed cadence with a human.** The review
   produces decisions, not acknowledgements.

## Run it

In Claude Code, keep the register as a single tracked file, run the
scanner on a schedule over incident and change records, the assessor on
new entries, and the chaser as a sweep that escalates. A human runs the
periodic review. Port to LangGraph with an intake node and a scheduled
escalation node.

## Signals it works

- Every open risk has an owner, a decision, and a review date.
- New risks arrive from real events rather than from brainstorming.
- Accepted risks are explicitly accepted, with a name attached.

## Boundaries

Agents maintain and chase; humans own risk decisions, which are
judgement calls with real consequences. Regulated risk frameworks have
their own requirements and are not satisfied by this register. Some
risks, particularly around people and legal exposure, must not be
recorded in shared systems at all.
