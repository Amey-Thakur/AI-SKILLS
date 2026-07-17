---
name: agent-memory
description: Design memory for an AI agent so it recalls what matters and forgets the rest, without drowning in its own history. Use when adding persistence, context recall, or long-running state to an agent.
---

# Agent memory

An agent with no memory repeats itself; an agent that remembers everything
buries the signal and pays for it every turn. Memory design is the discipline
of keeping the right things, in the right form, retrievable at the right
moment.

## Method

1. **Separate the kinds of memory, because they have different lifetimes:**
   - Working memory: the current task's context, held for the task and
     discarded after. Keep it small and relevant; it is the most expensive
     tokens you spend.
   - Episodic memory: what happened (past conversations, actions, outcomes),
     stored and retrieved by relevance when a similar situation returns.
   - Semantic memory: durable facts the agent should always know (the user's
     name, preferences, standing constraints), kept small and always
     available.
   Conflating these is the root of most memory bloat.
2. **Write less than you are tempted to.** Not every turn deserves to be
   remembered. Store decisions, facts, outcomes, and preferences; discard the
   turn-by-turn chatter. A memory that records everything is a transcript,
   and a transcript is not memory.
3. **Retrieve by relevance, not recency alone.** When a task starts, pull the
   episodic and semantic memories that match it (by embedding similarity,
   keyword, or entity), not simply the last N. The useful memory is often
   from three sessions ago, not the last three turns.
4. **Summarize to survive growth.** When history exceeds the budget, compress
   older stretches into summaries that keep the load-bearing facts and drop
   the detail. Summarize hierarchically (turns into a session summary,
   sessions into a profile) so recall stays cheap as history grows without
   bound.
5. **Make memory correctable and inspectable.** The user or operator can see
   what the agent remembers and remove or edit it. A wrong fact remembered
   forever is worse than a fact forgotten, and memory is where quiet errors
   compound.
6. **Never store secrets or sensitive personal data in memory** unless it is
   required, scoped, and the user consented. Memory persists, which means a
   leak persists.

## Failure modes

- Context bloat: every turn appended verbatim until the window overflows and
  cost climbs. Fix with selective writes and summarization.
- Stale facts: a preference changed but the old one is still recalled and
  acted on. Timestamp memories and prefer the newest when they conflict.
- Irrelevant recall: recency-only retrieval floods the task with unrelated
  history. Retrieve by relevance.
- Silent drift: summaries lose a fact that later mattered. Keep the source
  retrievable, and summarize toward facts, not vibes.

## Boundaries

Memory is a system concern; use the platform's or framework's memory store
where one exists rather than inventing a parallel one. And memory is not a
substitute for the user telling the agent what they want now: recall informs
the current instruction, it never overrides it.
