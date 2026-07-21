---
name: self-reflection
description: Have an agent critique and improve its own output before delivering, catching errors a first pass misses, without spiraling. Use when correctness matters and an agent should check its own work rather than ship the first draft.
---

# Self-reflection

An agent's first output is a first draft, and first drafts have errors the
agent can catch if it looks. Self-reflection is the agent reviewing its own
work critically before delivering it: a cheap, high-value step that turns
plausible-but-wrong into checked-and-right. The craft is making the
critique genuine and bounded, not theater or an infinite loop.

## Method

1. **Separate the critic from the author.** Reflection works when the agent
   reviews as a skeptic who did not write the work, actively looking for
   what is wrong, not admiring it. A review that assumes the work is good
   finds nothing. Prompt the critique to assume at least one real problem
   exists and find it (see review-my-code's evidence-first ethic).
2. **Check against the goal and requirements first.** Does the output
   actually do what was asked and meet every stated requirement? Re-read the
   requirements literally; the most common failure is confidently solving a
   slightly different problem than the one posed (see goal-driven-execution's
   done-condition).
3. **Verify claims, do not just re-read them.** For facts and numbers, check
   them against sources rather than trusting the draft (see fact-checking);
   for code, run it or trace it, do not eyeball it (see verify skill); for
   reasoning, test the weak links. Reflection that only re-reads catches
   wording, not errors.
4. **Prioritize findings, worst first.** Separate must-fix (wrong,
   incomplete, unclear on the core) from nice-to-have polish, and address the
   must-fixes. Not every observation deserves a rewrite; the goal is a
   correct, clear result, not an endlessly buffed one.
5. **Bound the reflection.** One or two reflection passes catch most of the
   value; beyond that, returns diminish and the agent can spiral, second-
   guessing correct work or oscillating between versions. Set a cap, and if
   reflection stops finding real problems, stop and deliver (see
   agentic-loops' termination).
6. **Know when reflection cannot self-correct.** An agent blind to its own
   error (a wrong assumption it also uses to check) will not catch it by
   reflecting; genuinely high-stakes work needs an independent check (a
   different model, a tool, a human), not just more self-review (see
   agent-eval-design, llm-guardrails).

## Boundaries

- Self-reflection improves the average output but is not a correctness
  guarantee; an agent can confidently ratify its own mistake. For anything
  where being wrong is costly, pair it with external verification (see
  agent-eval-design, agent-qa-gate).
- Reflection has a cost (tokens, latency); reserve the deeper self-review for
  work where correctness matters, not every trivial response (see
  llm-cost-latency).
- Over-reflection degrades good work (blandness, needless churn) and wastes
  budget; the discipline is bounded, prioritized critique, not infinite
  self-doubt.
