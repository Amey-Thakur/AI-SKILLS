---
name: agent-quality-council
description: Hold a consistent standard across everything a company ships, with agents that review against written criteria and escalate disagreements rather than averaging them. Use when quality varies by who happened to do the work.
---

# Agent quality council

Quality drifts when the standard lives in individuals. A council makes
the standard explicit and applies it identically to every artefact,
which is the one thing agents do better than tired humans under
deadline.

## Team

- **Reviewers**: one per dimension that matters for the artefact type,
  such as correctness, clarity, and completeness.
- **Arbiter**: resolves disagreement between reviewers against the
  written standard, or escalates.

Shape: parallel dimension reviews converging on one verdict per
artefact.

## Method

1. **Write the standard per artefact type.** What good looks like for a
   document, a release, a support reply, or a report, with observable
   criteria rather than adjectives.
2. **Review dimensions in parallel and independently.** A single
   reviewer holding four concerns applies them unevenly; separate
   reviewers each apply one properly (see agent-design-review-panel).
3. **Make findings specific and actionable.** Location, the criterion
   missed, and what would satisfy it. Unactionable findings get ignored
   and teach people to ignore the council.
4. **Distinguish blocking from advisory.** Only criteria that genuinely
   must be met block, or the gate becomes an obstacle to route around
   (see agent-qa-gate).
5. **Escalate disagreement rather than averaging.** Two reviewers
   disagreeing on a real issue is information, and averaging destroys
   it.
6. **Track which criteria fail most.** Repeated failures point at a
   missing template, unclear guidance, or an unrealistic standard rather
   than at careless people.
7. **Revise the standard deliberately.** When an exception is accepted
   repeatedly, the standard is wrong and should change explicitly.

## Run it

In Claude Code, define one subagent per dimension reviewing the artefact
in parallel, each writing findings to its own file, then an arbiter pass
producing the verdict. Blocking findings stop the release until
resolved. Port to CrewAI as parallel review tasks into an arbitration
task, or LangGraph with a gate node.

## Signals it works

- Findings cite a written criterion rather than a preference.
- Blocking and advisory are distinguished, and blocking is rare.
- Repeated failures change the standard or the template.

## Boundaries

The council enforces a written standard; it cannot supply taste or
domain judgement, and a wrong standard applied consistently produces
consistently wrong output. Humans set the standard and decide
exceptions. Anything with legal, safety, or regulatory implications
needs qualified review beyond this gate.
