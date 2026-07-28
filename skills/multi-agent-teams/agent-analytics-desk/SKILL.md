---
name: agent-analytics-desk
description: Turn business data into answered questions with agents that define the metric, pull it consistently, check it against a second source, and state what it does not prove. Use when numbers are quoted in meetings that nobody can reproduce.
---

# Agent analytics desk

Business analytics fails less on statistics than on definitions: two
people mean different things by active user and both are quoting real
queries. An analytics desk fixes the definition first and treats every
number as something that must be reproducible.

## Team

- **Definer**: writes the metric definition and the exact population
  before any query runs.
- **Analyst** (`data-scientist-role`, `product-metrics`): produces the
  number and the breakdown.
- **Skeptic** (`correlation-causation`): checks it against a second
  source and names what the number cannot support.

Shape: definition first, analysis, then an independent challenge.

## Method

1. **Write the metric definition before querying.** Population,
   time window, inclusion rules, and exclusions. Most disagreements
   about numbers are disagreements about this, discovered late.
2. **Keep definitions in one place and version them.** A metric that
   changes meaning silently makes every historical comparison wrong (see
   data-lineage).
3. **Produce the number with its breakdown.** A total without segments
   invites the wrong conclusion, and the segment is usually the actual
   finding.
4. **Verify against an independent source.** A second derivation, even a
   rough one, catches the query bug that a plausible number hides (see
   sql-joins).
5. **State what the number does not prove.** Correlation, seasonality,
   and selection effects named explicitly, since the misread is more
   expensive than the number is valuable.
6. **Answer the decision, not the request.** The question behind
   how many signups is usually whether something is working, and
   answering that directly is the desk's job.
7. **Keep the query with the answer.** Reproducibility is what
   distinguishes analysis from assertion.

## Run it

In Claude Code, require a definition file before the analyst subagent
runs, then run the skeptic as a separate pass over the analyst's output
and query. Both write into a dated question directory. Port to LangGraph
with a verification node that can return the analysis for rework, or
CrewAI as a sequential crew ending in a challenge task.

## Signals it works

- Every number ships with its definition and its query.
- The skeptic regularly changes or qualifies a conclusion.
- Metric definitions are versioned, so old comparisons stay valid.

## Boundaries

Agents compute and challenge; humans decide what to do. Statistical
inference beyond descriptive comparison needs qualified review (see
statistical-inference), and causal claims need a designed experiment
(see ab-test-design). Analytics on personal data stays inside your
privacy commitments (see data-minimization).
