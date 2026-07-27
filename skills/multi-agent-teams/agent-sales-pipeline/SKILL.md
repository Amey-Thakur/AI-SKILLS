---
name: agent-sales-pipeline
description: Staff a pipeline with agents that research accounts, qualify leads against explicit criteria, draft outreach for human sending, and keep the CRM honest. Use when lead flow needs consistent handling and the pipeline record keeps rotting.
---

# Agent sales pipeline

Pipelines rot in predictable ways: unqualified leads consume attention,
notes go unwritten, and stages stop meaning anything. Agents are good at
the parts salespeople skip, which is research, hygiene, and consistent
follow-up drafting, and poor at the part that matters most, which is
the relationship.

## Team

- **Researcher** (`agent-competitive-analysis-team`): builds an account
  brief from public sources.
- **Qualifier**: scores the lead against written criteria and records
  why, including disqualifications.
- **Drafter** (`cold-email`): prepares outreach and follow-ups for a
  human to review and send.
- **Hygienist**: keeps stages, next steps, and dates accurate.

Shape: a per-lead pipeline, researcher to qualifier to drafter, with
the hygienist running as a scheduled sweep.

## Method

1. **Write the qualification criteria down first.** Fit, need, timing,
   and budget expressed as questions with observable answers. Without
   them the qualifier invents standards and applies them unevenly.
2. **Research before contact, always.** The brief covers what the
   account does, plausible need, and recent public signals, so outreach
   references something real rather than a template variable.
3. **Let the qualifier disqualify.** A pipeline everything enters is
   not a pipeline, and recording why a lead was dropped is what makes
   the criteria improvable.
4. **Draft outreach, never send it.** A human reads and sends anything
   that reaches a person. This is the boundary that keeps the company's
   voice and reputation intact.
5. **Make stage changes require evidence.** Advancing a deal needs a
   recorded reason, a date, and a next step, which is what stops a
   pipeline full of stale optimism.
6. **Sweep for rot on a cadence.** Deals with no activity past a
   threshold get flagged for a decision rather than aging silently.
7. **Report the funnel honestly.** Conversion by stage, time in stage,
   and loss reasons, with losses categorised rather than blamed on
   price by default.

## Run it

In Claude Code, run researcher and qualifier per lead into a per-account
file, with the drafter producing a message that a human approves before
sending. The hygienist runs as a scheduled sweep over the pipeline
directory. Port to CrewAI as a crew per lead, or to LangGraph with a
qualification gate that routes disqualified leads to an archive node.

## Signals it works

- Disqualified leads are recorded with reasons and stay out.
- Every open deal has a dated next step and evidence for its stage.
- Outreach references specifics from the brief rather than a template.

## Boundaries

Agents research, qualify, and draft; humans build relationships, make
promises, negotiate, and send. Never let an agent send outreach
autonomously, commit to pricing or terms, or store personal data
outside the systems your privacy policy covers (see data-minimization,
consent-management). Contact and messaging rules vary by jurisdiction
and are a legal question, not a growth tactic.
