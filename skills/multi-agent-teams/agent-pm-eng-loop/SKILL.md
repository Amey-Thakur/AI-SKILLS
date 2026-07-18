---
name: agent-pm-eng-loop
description: Pair a product-manager agent with engineer agents through spec, pushback, scope negotiation, and acceptance so the build matches intent. Use when an agent team must turn a fuzzy request into a shipped, accepted increment.
---

# PM and engineering loop

An engineer agent handed a vague request builds the literal words and calls it
done. A PM agent handed a backlog writes wishes no one can build. The value is
in the friction between them: the PM states the problem and the acceptance bar,
the engineers push back on cost, and scope gets negotiated in the open before a
line is written. Without the loop, the mismatch surfaces in review three weeks
late.

## Team

- **PM agent** (`product-manager-role`): owns the problem, the metric, the
  acceptance criteria.
- **Engineer agents** (`backend-engineer-role`, `frontend-engineer-role`): build,
  and push back on cost.
- **Acceptance agent** (`qa-engineer-role`): checks the build against criteria,
  no self-grading.

Shape: a negotiation loop, then build, then an acceptance gate.

## Method

1. **PM writes the spec first.** `spec.md` states the problem, one success metric
   and its guardrail, non-goals, and acceptance criteria as checkable statements
   ("a signed-out user hitting /app lands on login in under 300ms"). A criterion
   you cannot check is a wish.
2. **Engineers return a pushback memo.** Before building, they flag the expensive
   20 percent, name feasibility risks, and propose a cheaper path. An agent that
   silently complies hides the tradeoff instead of surfacing it.
3. **Negotiate scope in the open.** The PM cuts to a real v1 and records deferred
   items with reasons in a "later" list. Deferral is a decision on the record,
   not a dropped ball.
4. **Freeze the criteria.** Lock the acceptance list before code; later changes
   go to a dated change log in `spec.md`, so "done" does not move while the work
   is in flight.
5. **Engineers build and demo against the list.** The handoff is a working
   increment plus a demo note mapping each criterion to how it is met.
6. **Acceptance agent runs the gate.** Pass or fail per criterion in
   `acceptance.md`, executed by an agent that did not write the code. Failures
   loop back to the engineers, not the PM.
7. **PM signs off on outcome, not effort.** Accept only when criteria pass and
   the increment plausibly moves the named metric; record the call.

## Run it

In Claude Code, run the PM and each engineer as subagents sharing `spec.md`; the
orchestrator sequences write, pushback, negotiate, build, then spawns a fresh
acceptance subagent so the grader is not the builder, looping on failures. Port
it to CrewAI as a sequential process with a re-run on failed acceptance, to
AutoGen as a two-agent chat plus a critic, or to LangGraph as a graph with a
conditional edge from acceptance back to the build node.

## Signals it works

- The pushback memo changes the spec at least sometimes; pure compliance means
  the PM is unchallenged.
- Acceptance is run by a different agent than the one that built the feature.
- Deferred scope lives in a written "later" list, not in someone's memory.

## Boundaries

This owns the loop from request to accepted increment, not architecture, which
`staff-engineer` weighs in on, nor the roadmap above it. The success metric and
guardrail come from real product context you supply; agents cannot invent them.
A human approves anything that ships to users or spends real budget.
