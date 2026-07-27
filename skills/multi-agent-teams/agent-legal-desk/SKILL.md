---
name: agent-legal-desk
description: Use agents to triage contracts and policies, extract obligations, flag unusual terms, and prepare a lawyer's review rather than replace it. Use when routine agreements pile up and nothing is tracked after signature.
---

# Agent legal desk

Most contract pain is not interpretation but administration: nobody
knows what was agreed, when it renews, or which clauses are unusual.
Agents are strong at extraction and comparison against a known standard
and must never be trusted with the judgement call, which is why this
desk ends at a lawyer rather than at a decision.

## Team

- **Extractor**: pulls parties, term, renewal, payment, liability,
  termination, and data terms into a structured summary.
- **Deviation checker**: compares each clause against your standard
  position and flags every difference.
- **Obligation tracker**: records what the agreement commits you to do
  and by when.

Shape: a per-document pipeline ending in a review pack for counsel,
plus a standing obligations register.

## Method

1. **Write your standard positions down.** Acceptable liability cap,
   notice period, payment terms, and data handling. Without a baseline
   the checker has nothing to deviate from and flags noise.
2. **Extract into a fixed schema.** The same fields every time, with a
   not-found marker rather than an inference. Missing terms matter as
   much as present ones.
3. **Flag deviations with the exact text.** Quote the clause, state the
   standard position, and describe the gap plainly. Never characterise
   the legal effect, which is counsel's call.
4. **Route by risk, not by volume.** Routine agreements matching
   standard positions go to a light review; anything touching
   liability, indemnity, IP, or personal data goes to a lawyer
   regardless of size (see vendor-data-processing).
5. **Track obligations after signature.** Renewal and notice dates,
   deliverables, and reporting duties belong in a register with alerts,
   because the expensive failures are missed dates, not bad clauses.
6. **Keep an auditable trail.** Which version was reviewed, what was
   flagged, who approved, and when.
7. **Re-check the register on change.** Renegotiations and amendments
   supersede terms, and a stale register is worse than none.

## Run it

In Claude Code, run the extractor and checker over a document directory
into a structured summary file per agreement, with the obligation
register as a single tracked file the scheduler re-reads for upcoming
dates. Route the pack to a human. Port to LangGraph with a risk-routing
node, or CrewAI as a sequential crew per document.

## Signals it works

- Every agreement has a structured summary and a named risk route.
- Renewal and notice dates surface before they matter.
- Flags quote the actual clause rather than paraphrasing it.

## Boundaries

This is document triage and administration, not legal advice, and
nothing it produces should be relied on as such. Agents do not approve,
sign, negotiate, or interpret legal effect; a qualified lawyer does.
Contract text is confidential, so the model and storage you use must be
acceptable under your obligations (see data-classification).
