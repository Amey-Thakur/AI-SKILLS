---
name: agent-delegation-protocol
description: Decide what to hand to an agent, what to keep with a human, and what to split, based on reversibility and consequence rather than capability alone. Use when deciding how much of a workflow to automate.
---

# Agent delegation protocol

The question is not what an agent can do but what it should. Capability
is necessary and insufficient: the deciding factors are how reversible
the action is, how visible a mistake would be, and who bears the
consequence when it goes wrong.

## Method

1. **Classify by reversibility first.** Easily undone work delegates
   freely; irreversible action does not, regardless of how confident the
   agent seems.
2. **Keep the consequence with the human.** Anything that spends money,
   binds the company, reaches a customer, or touches personal data stops
   at an approval (see agent-company-blueprint).
3. **Split rather than choosing all or nothing.** Agents draft, gather,
   check, and prepare; humans approve, send, and commit. This split
   captures most of the value with little of the risk.
4. **Delegate the whole task, not fragments.** Handing over an
   ambiguous fragment produces work that must be redone, which costs
   more than doing it (see agent-work-assignment).
5. **Define done before delegating.** The acceptance criteria are what
   make the output checkable, and unspecified quality is the most common
   cause of disappointing agent work.
6. **Verify proportionally to consequence.** Spot-check low-stakes
   output, review high-stakes output fully, and never accept unverified
   output that will be acted on irreversibly.
7. **Escalate on uncertainty by design.** An agent that stops and asks
   when confidence is low is more valuable than one that always
   produces something (see agent-escalation-ladder).

## Boundaries

This protocol governs delegation; it does not make an agent competent at
the delegated task, which needs evaluation against real outcomes (see
agent-eval-design). Regulated decisions, employment matters, and legal
or medical judgements are not delegable regardless of capability.
Accountability never delegates: the human remains answerable for what
their agents do.
