---
name: ml-error-analysis
description: Review model errors by hand, discover failing slices, and decide whether data or model fixes pay more. Use when a model underperforms and you need to know why before spending compute.
---

# ML error analysis

The fastest way to improve a model is to look at what it gets wrong,
one example at a time, until the failures organize into categories with
different cures. An hour of reading errors routinely redirects a month
of modeling.

## Method

1. **Sample errors deliberately.** From validation (never test; see
   train-test-discipline): the highest-confidence wrong predictions
   (model certain and mistaken: the most diagnostic), borderline
   cases near the threshold, and a random error sample as the
   control. 50-100 examples read by a human beats any aggregate
   metric for understanding.
2. **Tag each error with a cause hypothesis.** Label wrong (annotation
   error), feature wrong (missing/stale/corrupted input: check the
   actual feature values; see feature-engineering), example ambiguous
   (humans would disagree), pattern unlearned (model lacks capacity or
   signal), out-of-distribution (nothing like it in training). Keep
   the taxonomy small; count the buckets when done.
3. **Let the counts pick the fix.** Label noise dominant: clean labels
   or re-adjudicate guidelines (often the single highest-ROI fix).
   Feature bugs: fix pipelines (cheap, certain). Ambiguity: refine the
   target definition (see ml-problem-framing). Unlearned patterns
   with signal present: more features, more capacity, or more data
   *of that kind*: targeted collection beats bulk collection every
   time. OOD: expand training coverage or add an abstain path.
4. **Find the bad slices systematically.** Metrics by segment
   (see model-evaluation), then automated slice discovery: train a
   shallow tree to predict "model was wrong" from features/metadata;
   its top splits name your weak cohorts in plain language. Compare
   error rates against the slice's base rate: a slice can be worse
   yet unimportant, or slightly worse and business-critical.
5. **Convert findings into regression tests.** Each confirmed failure
   category becomes a named evaluation slice or behavioral test
   (perturbation and invariance checks) that future models must pass
   (see llm-eval-design for the generative analog); the analysis then
   compounds instead of evaporating after one fix cycle.
6. **Close the loop and re-analyze.** After the chosen fix, rerun the
   same analysis: did the targeted bucket shrink, did another grow,
   did aggregate improvement come from where you intended? Error
   analysis is a loop, not a phase; each cycle's notes live with the
   runs (see experiment-tracking).

## Boundaries

- Reading errors risks overfitting your judgment to validation; keep
  the final test set unseen, and confirm big decisions on fresh data.
- Feature-attribution tools (see shap-style explanations) complement
  but do not replace reading actual examples; attributions on a leaky
  or mislabeled dataset explain the artifact convincingly.
- Production error analysis inherits label latency and feedback-loop
  bias (see drift-monitoring); analyze recent labeled cohorts, not
  the convenient old ones.
