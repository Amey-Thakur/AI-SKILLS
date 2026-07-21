---
name: first-principles-thinking
description: Reason from fundamental truths by excavating assumptions and rebuilding from constraints, knowing when analogy is faster. Use when stuck in a solution space defined by convention or challenging an inherited assumption.
---

# First-principles thinking

First-principles reasoning strips a problem down to what must be true
(physics, math, hard constraints) and rebuilds from there, rather than
reasoning by analogy from how things are usually done. It is expensive
and slow, so reserve it for the problems where convention is the trap.

## Method

1. **Surface the assumptions holding the current solution
   in place.** List what "everyone knows" about the problem,
   then ask of each: is this a law, or a convention? "Batteries
   cost $600/kWh" was treated as fixed until someone asked
   what the *materials* cost. Most stuck problems are stuck
   inside an assumption nobody has questioned (see
   scientific-critical-thinking's interrogation).
2. **Separate hard constraints from inherited choices.**
   Physics, math, budget, and law are real constraints;
   "we've always done it this way", "the industry standard",
   and "the framework expects it" are choices wearing
   constraints' clothing. The first-principles move is
   discarding the choices and keeping only the constraints,
   then seeing what design space opens.
3. **Rebuild from the fundamentals.** With only the hard
   constraints, construct a solution from scratch: what is
   the minimum that must be true, and what is the simplest
   thing satisfying it? The rebuilt solution often differs
   radically from the conventional one, because the
   conventional one accreted around assumptions you just
   removed.
4. **Use analogy for speed, first principles for
   breakthroughs.** Reasoning by analogy ("do what worked
   before / what others do") is fast, usually right, and
   correct to default to: most problems are not worth
   rebuilding from scratch (see the effort calibration in
   tradeoff-analysis). First-principles thinking is the
   expensive tool for when the analogy-based answers are all
   unsatisfying and you suspect a shared wrong assumption.
5. **Check the rebuild against reality.** A from-scratch
   solution can be theoretically elegant and practically
   wrong (it ignored a constraint you did not know was
   hard); validate the rebuilt idea against the real
   constraints and cheap experiments before betting on it
   (see hypothesis-driven-work, experiment-design-basics).
   First principles generates candidates; testing confirms
   them.
6. **Apply it to decompose, not just to invent.** Beyond
   inventing new solutions, first-principles reasoning
   clarifies problems: breaking a vague goal into its
   fundamental components ("what actually makes this slow /
   expensive / hard") often dissolves the confusion that
   analogy papered over (see the decomposition in
   estimation-techniques, algorithmic-optimization).

## Boundaries

- First-principles thinking is expensive; applying it to
  every decision is paralysis, and most decisions rightly
  run on analogy and convention (which encode real
  accumulated wisdom). Reserve it for high-stakes problems
  where convention seems to be failing.
- Removing an assumption you do not fully understand can
  discard a real constraint (Chesterton's fence: know why
  the fence is there before removing it). Excavate
  assumptions carefully, not recklessly.
- The output is hypotheses, not conclusions; a
  first-principles argument still needs empirical
  validation (see scientific-critical-thinking), because
  reasoning from fundamentals can be rigorous and still
  wrong about which fundamentals apply.
