---
name: agent-finance-desk
description: Run a standing finance function with agents that reconcile transactions, track runway, flag anomalies, and prepare reporting for a human to approve. Use when the money side of a business needs steady attention rather than a quarterly scramble.
---

# Agent finance desk

Finance fails quietly. Categorisation drifts, a subscription renews
unnoticed, invoices age, and nobody sees it until the quarter closes.
A finance desk of agents is worth having because the work is
repetitive, rule-bound, and unforgiving of gaps, which is exactly what
a scheduled agent loop does well and a busy founder does badly.

## Team

- **Bookkeeper**: ingests transactions, categorises, flags anything it
  cannot classify confidently.
- **Analyst** (`data-scientist-role`, `saas-metrics`): computes
  runway, burn, margin, and the movement since last period.
- **Controller**: checks the analyst's numbers against source records
  and challenges anything that moved without explanation.

Shape: a pipeline on a weekly close, bookkeeper to analyst to
controller, ending in a human sign-off.

## Method

1. **Fix the chart of accounts before automating.** Agents categorise
   consistently against a defined scheme and badly against a vague one,
   so the scheme is the prerequisite, not the output.
2. **Classify with an explicit unknown bucket.** Anything the
   bookkeeper cannot place with confidence goes to review rather than a
   plausible guess. A wrong category silently distorts every number
   downstream.
3. **Reconcile against the source, never the summary.** The controller
   compares computed figures to bank and processor records, because a
   spreadsheet that agrees with itself proves nothing.
4. **Report movement with a reason.** Every metric that changed
   materially needs a named cause, and unexplained movement is the
   finding, not a rounding note.
5. **Track commitments, not just spend.** Contracted renewals, annual
   plans, and unbilled work determine runway more than last month's
   card charges (see agent-procurement-desk).
6. **Escalate on threshold, not on schedule.** Runway below a set
   number of months, an anomalous charge, or an aging receivable
   interrupts immediately rather than waiting for the weekly file.
7. **Keep every figure traceable to a record.** Each number in the
   report links to the transactions behind it so a human can audit any
   line in seconds.

## Run it

In Claude Code, run the three roles as sequential subagents over
exported statements in a dated folder, with the controller's checks as
an explicit pass and the final report requiring human approval before
anything is filed or paid. Never grant payment credentials to an agent.
Port to CrewAI as a sequential crew, or to LangGraph with a
verification node that can send the analysis back for rework.

## Signals it works

- Unclassified transactions surface as questions rather than guesses.
- Every reported number can be traced to source records.
- Runway and anomaly alerts arrive when they happen, not at close.

## Boundaries

This desk prepares and checks; it does not file, pay, or advise. Tax
treatment, statutory filings, and audit opinions are the work of a
qualified accountant, and nothing produced here is financial or tax
advice. Agents must never hold payment credentials or move money.
Regulatory reporting has legal consequence for the human who signs it.
