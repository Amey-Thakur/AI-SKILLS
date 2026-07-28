---
name: agent-iterative-refinement
description: Improve output through repeated critique and revision against a fixed standard, stopping when the standard is met or gains stop. Use when first-pass output is close but not good enough and the quality bar is writable.
---

# Agent iterative refinement

A first draft is rarely the best an agent can do, and asking it to try
again produces a different draft rather than a better one. Refinement
works when each round has a specific critique to act on and a standard
to be measured against.

## Method

1. **Write the standard before the first draft.** Criteria the output
   must meet, specific enough to check. Refining against taste produces
   drift rather than improvement (see agent-quality-council).
2. **Critique against the criteria, one round at a time.** A list of
   specific gaps with locations, not a general assessment.
3. **Revise the draft rather than regenerating it.** The instruction is
   to fix these things and keep the rest, or each round trades old
   problems for new ones.
4. **Use a separate critic.** Self-critique in the same context is
   weaker, because the model defends what it just wrote (see
   agent-generate-and-verify).
5. **Stop on the standard, or on diminishing returns.** Two rounds carry
   most of the gain; by the fourth you are usually paying for changes
   nobody wanted.
6. **Watch for oscillation.** A change reverted in the next round means
   the criteria conflict, which is a standard problem rather than a
   drafting one.
7. **Keep every version.** The third draft is sometimes worse than the
   second, and without history that is unrecoverable.

## Boundaries

Refinement polishes; it cannot rescue a draft built on the wrong
premise, where the answer is to restart with a better brief. Each round
costs a full generation, so the loop needs a cap. A standard that cannot
be written down cannot be refined against, and that work belongs to a
human.
