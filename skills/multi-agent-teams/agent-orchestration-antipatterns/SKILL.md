---
name: agent-orchestration-antipatterns
description: Guard a multi-agent team against the structural failures single agents never hit: context lost across handoffs, false agreement, and runaway cost. Use when a team costs more than one agent or trusts its own output, and you need to find out why.
---

# Multi-agent orchestration antipatterns

Multi-agent teams fail in ways a single agent never does: context decays across
handoffs, agents on the same model agree with each other instead of with
reality, and loops with no exit burn budget until a rate limit stops them. These
are structural bugs, not domain bugs, and they hide behind output that looks
finished. Guard against them explicitly or the team costs more than one agent and
trusts itself more than it should.

## Team

- **Orchestrator**: owns the run budget and the handoff contract.
- **Workers**: the function agents from any team in this category.
- **Auditor**: an independent agent that reads the run ledger and flags breaches.

Shape: a monitor wrapping any sequential, parallel, or looping team, with a hard
budget guard. Handoffs are logged to `run-ledger.jsonl`: from, to, artifact path
and hash, tokens, decision.

## Method

1. **Telephone loss: pass artifacts, not summaries of summaries.** Each handoff
   degrades when an agent re-paraphrases the last one's prose. Forward the
   structured artifact (`findings.jsonl`, a scorecard, a surface map) unchanged
   and let the next agent read source. Hash it in the ledger so silent rewrites
   show.
2. **Echo consensus: independence before aggregation.** Agents sharing a model
   and context agree because they anchored, not because they are right. Have
   scorers write before seeing each other, assign one agent the explicit negation,
   and never read "all three agreed" as confidence when all three read one input.
3. **Cost spirals: a hard budget and a stop test on every loop.** A
   fix-and-recheck or debate loop with no exit burns tokens to the rate limit. Set
   a max round count (three to five), a per-run token budget, and a written stop
   condition ("no new critical"), checked at the top of each iteration.
4. **False fan-out: split on disjoint work or do not fan out.** Five agents on
   overlapping scope produce four duplicates and a merge headache at 5x cost. Fan
   out only when sub-tasks are genuinely independent (per surface, per competitor,
   per sub-question); otherwise one agent is cheaper and better.
5. **Orphaned artifacts: name and route every handoff.** If agent B cannot tell
   which file agent A wrote, it invents or redoes the work. Fix the artifact name
   and location in the orchestration, not in prose an agent might skip.
6. **Judge capture: keep the grader independent of the graded.** An agent scoring
   its own or a teammate's work inflates. The referee, verifier, or auditor must
   not have written what it evaluates, and you ship the judge's number, not the
   author's.
7. **Silent failure: point the auditor at the ledger, not the happy path.** Route
   `run-ledger.jsonl` to an independent auditor that checks each handoff has a
   real artifact, each loop hit its stop condition, and no agent graded itself.
   Halt the run on a breach.

## Run it

In Claude Code, log every subagent handoff to `run-ledger.jsonl`, enforce the
round and token budget in the orchestrator loop rather than trusting an agent to
stop itself, and run the auditor as a separate subagent that can halt the run.
Port the guards to CrewAI via `max_iter` and a manager that inspects task
outputs, to AutoGen via `max_round` plus a termination function on the GroupChat,
or to LangGraph via a recursion limit and a conditional edge into an audit node.

## Signals it works

- Handoffs pass the actual artifact, and its hash matches on both ends.
- Every loop in the run has a written stop condition that has actually fired.
- The independent auditor has halted at least one run, so the guard is real.

## Boundaries

This is a cross-cutting guard for the teams in this category, not a team that
ships a function on its own; pair it with the skill that builds the team. It
catches structural failures (lost context, false agreement, runaway loops), not
domain errors inside a correct-looking artifact. Budgets, round caps, and what
counts as a breach are yours to set against cost and risk tolerance.
