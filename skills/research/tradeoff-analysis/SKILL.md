---
name: tradeoff-analysis
description: Compare options with explicit weighted criteria, sensitivity checks, and reversibility awareness. Use when facing a consequential choice between alternatives with no obvious winner.
---

# Tradeoff analysis

Most consequential decisions are tradeoffs: no option wins on every
axis, and the choice is which sacrifices to accept. Making the criteria
and their weights explicit turns a gut argument into an examinable one,
where the real disagreement (about what matters, not which option) can
surface and be resolved.

## Method

1. **Name the criteria that actually matter, and weight
   them.** The dimensions the decision turns on (cost,
   speed, risk, maintainability, reversibility) with rough
   weights reflecting their importance to *this* decision:
   the weights are where the strategy lives, and making them
   explicit exposes disagreements that "I just think A is
   better" hides (see prioritization-frameworks' same
   move). Beware inventing criteria to justify a
   pre-made choice.
2. **Score options against each criterion, honestly.** Coarse
   scores (high/medium/low, or 1-5) against each dimension,
   from evidence where possible (see estimation-techniques):
   precision is false here (a 7.3 vs 6.8 is noise), so keep
   it coarse and focus on the clear differences. Steelman
   each option's strengths, including the one you lean
   against (see scientific-critical-thinking's fairness).
3. **Check sensitivity to the weights.** Does the winner
   change if you shift the weights a little? A robust
   decision wins across reasonable weightings; a fragile one
   depends on exact weights nobody can defend (which means
   the honest answer is "it's close, and here's what it
   hinges on"). Sensitivity analysis is what separates a
   real conclusion from a rigged spreadsheet.
4. **Weight reversibility heavily.** Reversible decisions
   (two-way doors) deserve fast, cheap analysis and a bias
   to act (you can undo them: see the decision-velocity in
   mvp-scoping); irreversible ones (one-way doors: data
   migrations, public commitments, architecture you cannot
   easily unwind) deserve much deeper analysis. Matching
   analysis depth to reversibility is the single highest-
   leverage tradeoff-analysis habit (see the effort
   calibration below).
5. **Surface the assumptions and unknowns.** What must be
   true for each option to be the right one, and what you do
   not know that would change the answer: sometimes the
   output is not "choose A" but "run this cheap test first"
   (see hypothesis-driven-work), because the deciding fact
   is unknown and cheaply learnable.
6. **Record the decision and revisit it.** Capture the
   chosen option, the tradeoffs accepted, and the reasoning
   (see decision-journals, architecture-decision-records):
   so the decision can be evaluated later and so future
   people know why (and can revisit if the assumptions
   change). A tradeoff made and forgotten gets relitigated
   endlessly.

## Boundaries

- Match analysis effort to stakes and reversibility:
  agonizing over a reversible low-stakes choice wastes the
  analysis on the wrong decision (see mvp-scoping's
  two-way-door speed). Most decisions deserve a quick
  version of this, few deserve the full treatment.
- Explicit scoring structures the argument; it does not
  compute the answer (the weights and scores are
  judgments, and false precision is a real trap). The
  matrix is a thinking aid, not an oracle.
- Some decisions resist quantification (values, strategy,
  culture); there the method is making the tradeoffs
  explicit and reasoning about them, not forcing numbers
  onto the unquantifiable (see the qualitative-override in
  prioritization-frameworks).
