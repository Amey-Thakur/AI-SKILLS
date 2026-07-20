---
name: ml-baselines
description: Establish heuristic and simple-model baselines that bound what complexity is worth. Use when starting any ML project or auditing whether a complex model earns its cost.
---

# ML baselines

A baseline is the price floor for complexity: every sophisticated model
must beat it by enough to pay for its own training, serving, and
maintenance. Skipping the baseline means never knowing what your
complexity purchased.

## Method

1. **Ladder up from trivial.** (a) Constant/majority predictor
   (the metric's floor; surprisingly informative about metric choice).
   (b) The incumbent: whatever rule, heuristic, or human process makes
   the decision today; this is the baseline that matters commercially
   (see ml-problem-framing). (c) One-feature rule: the single most
   predictive feature with a tuned threshold. (d) Simple model:
   regularized linear/logistic regression on the obvious features, or
   gradient boosting with defaults on tabular data.
2. **Give the simple model a fair fight.** Same data, same splits,
   same evaluation protocol as any contender (see
   train-test-discipline, model-evaluation); light tuning only
   (defaults plus regularization sweep). A strawman baseline
   (untuned, starved of features) manufactures fake wins that
   production will refund.
3. **Record baselines in the tracker.** Each rung logged like any run
   (see experiment-tracking), rerun whenever data version or metric
   changes; comparisons across regimes are the subtle way baselines
   go stale and deltas inflate.
4. **Judge complexity by marginal value.** For each step up
   (boosting over logistic, deep over boosting, ensemble over
   single): metric delta with uncertainty (see model-evaluation),
   serving cost and latency delta, and the ops delta (GPU serving,
   feature freshness, monitoring surface; see model-deployment,
   drift-monitoring). Inside the noise band, or paying 10x cost for
   decimals: the simpler rung wins, and often the boosted-trees rung
   is where tabular problems should stop.
5. **Keep the baseline alive in production.** The incumbent heuristic
   stays implemented as the fallback path (model outage, rollback
   target; see model-deployment) and, where feasible, a small holdout
   slice keeps measuring it online: the live delta is the project's
   ongoing justification, and its disappearance is drift telling you
   something (see drift-monitoring, ab-test-design).
6. **Let the baseline argue for shipping less.** When the one-feature
   rule captures 80% of the value, shipping it *this week* while the
   model matures is usually the right product decision; baselines are
   deliverables, not just yardsticks (see mvp-scoping).

## Boundaries

- Domains with mature pretrained models (text, vision) invert the
  ladder: the pretrained model with zero/few-shot is the baseline,
  and classical approaches are the challengers (see
  fine-tuning-vs-prompting).
- Beating the baseline offline does not guarantee beating it on the
  business metric; that final comparison is an experiment (see
  ab-test-design).
- A baseline nobody can reproduce is folklore; it lives in the
  tracker with code and data versions like everything else.
