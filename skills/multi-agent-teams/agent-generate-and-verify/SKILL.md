---
name: agent-generate-and-verify
description: Pair every generating agent with an independent verifier whose only job is to refute the output, so plausible-but-wrong work is caught before it ships. Use when an agent's output will be acted on and being wrong is expensive.
---

# Generate and verify

A single agent asked to produce and check its own work grades itself
generously, because the reasoning that produced the error also evaluates
it. Splitting generation from verification, with the verifier told to
refute rather than review, is the highest-value multi-agent pattern
there is.

## Method

1. **Give the verifier the opposite goal.** Not is this good but find
   what is wrong with this, defaulting to rejection when uncertain. A
   verifier asked to review agrees.
2. **Withhold the generator's reasoning from the verifier.** Give it the
   output and the source material, not the chain that produced it, or it
   inherits the same mistake (see agent-context-isolation).
3. **Require evidence for both verdicts.** A rejection names the
   specific flaw; an acceptance names what was checked. Unexplained
   verdicts are noise.
4. **Use several verifiers with different lenses when it matters.**
   Correctness, security, and does-this-reproduce catch different
   failure classes, and diversity beats repetition (see
   agent-ensemble-voting).
5. **Return failures to the generator with the specific objection.**
   Regenerating from scratch loses the good parts; targeted revision
   keeps them (see agent-iterative-refinement).
6. **Cap the loop.** Two or three rounds, then escalate to a human,
   because a claim that survives no verification round will not survive
   the fourth either.
7. **Track which verifications actually catch things.** A verifier that
   never rejects is either unnecessary or not doing its job.

## Boundaries

Verification raises confidence; it does not prove correctness, and a
verifier sharing the generator's blind spot confirms the error
confidently. Cost roughly doubles, so apply it where consequence
justifies it. For anything irreversible, human review remains the last
gate (see agent-human-checkpoint).
