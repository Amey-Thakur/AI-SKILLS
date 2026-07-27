---
name: agent-procurement-desk
description: Evaluate vendors with agents that build a comparable requirement matrix, research each option, check security and data terms, and prepare a recommendation for human sign-off. Use when choosing tools or suppliers and comparisons keep drifting on vendor marketing.
---

# Agent procurement desk

Vendor selection goes wrong when the comparison is built from vendor
marketing rather than from your requirements, so every option looks
best on its own page. A procurement desk fixes the criteria first and
scores everything against the same grid.

## Team

- **Requirements owner**: turns the need into weighted, testable
  criteria before any vendor is looked at.
- **Researchers**: one per shortlisted vendor, filling the same grid
  from documentation and trials.
- **Risk reviewer** (`vendor-data-processing`): checks security, data
  handling, lock-in, and viability.
- **Synthesiser**: produces the comparison and a recommendation.

Shape: criteria first, parallel per-vendor research, one comparison
pack.

## Method

1. **Write weighted criteria before looking at vendors.** Must-have,
   should-have, and nice-to-have with weights, derived from your use
   case. Criteria written after demos always match whoever demoed best.
2. **Score every vendor on the same grid.** Same questions, same
   evidence standard, and an explicit unknown where the answer is not
   published, since unknowns are themselves a finding.
3. **Test the two or three that matter.** Documentation describes the
   happy path; a trial against your real workload finds the limits that
   decide the outcome.
4. **Price the total cost.** Licence plus implementation, migration,
   training, overage, and the cost of leaving. Headline price is rarely
   the deciding number.
5. **Review data and security terms as a gate, not a column.** Where
   data goes, who processes it, deletion and export paths, and
   subprocessors (see cross-border-transfers, data-classification).
6. **Assess exit before entry.** Export formats, contract notice, and
   what breaks when you leave. Lock-in discovered later is the most
   expensive finding in procurement.
7. **Recommend with the runner-up and the reason.** A single option
   presented as obvious hides the trade the decision maker needs.

## Run it

In Claude Code, write the criteria file first, spawn one researcher
subagent per vendor to fill an identical grid file, run the risk
reviewer over all of them, then synthesise into a comparison. Purchase
and signature remain human. Port to CrewAI as parallel research tasks
into one synthesis task.

## Signals it works

- Criteria and weights predate the vendor list.
- Every grid has explicit unknowns rather than optimistic assumptions.
- Total cost and exit cost appear alongside the headline price.

## Boundaries

Agents research and compare; humans negotiate, sign, and pay. Never let
an agent enter into agreements, accept terms of service, or share
confidential material with a vendor during evaluation. Contract terms
need legal review (see agent-legal-desk), and vendor claims about
security should be verified rather than believed.
