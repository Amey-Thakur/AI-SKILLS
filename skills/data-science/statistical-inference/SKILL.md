---
name: statistical-inference
description: Draw honest conclusions from samples using hypothesis tests, confidence intervals, and significance read correctly. Use when deciding whether an effect is real, comparing groups, or reporting uncertainty.
---

# Statistical inference

Inference is reasoning from a sample to a conclusion about the world, with
honest uncertainty. The failures are famous: p-hacking, confusing
significance with importance, and reading "not significant" as "no effect".
Done right, inference tells you what your data can and cannot support.

## Method

1. **State the hypothesis and the test before looking.** Define the null and
   alternative, the metric, and the test, before peeking at results.
   Deciding what counts as significant after seeing the data is p-hacking,
   and it manufactures false findings (see the pre-registration ethic in
   ab-test-design, experiment-design-basics).
2. **Report the effect size and interval, not just the p-value.** A p-value
   answers "could this be noise?" but says nothing about how big or
   important the effect is. Report the estimate with a confidence interval:
   "a 2% lift, 95% CI [0.3%, 3.7%]" tells you both the size and the
   uncertainty, where "p < 0.05" alone hides both.
3. **Interpret significance honestly.** Statistical significance is not
   practical importance (a trivial effect is significant with enough data);
   non-significance is not proof of no effect (it may mean the test was
   underpowered). "We could not detect an effect" is the honest reading of
   a null result, not "there is no effect".
4. **Check the test's assumptions.** Tests assume things (independence,
   distribution, equal variance, sample size); a t-test on tiny skewed
   samples, or a test on correlated observations, gives a confident wrong
   answer. Match the test to the data, and use non-parametric or
   resampling methods (bootstrap) when assumptions do not hold.
5. **Account for multiple comparisons.** Test twenty things and one will
   look significant by chance. When running many tests, correct for it
   (Bonferroni, false discovery rate) or you will "discover" noise. This is
   how dredging a dataset produces impressive nonsense.
6. **Mind the sample and its power.** Conclusions are only as good as the
   sample's representativeness (a biased sample invalidates the inference
   regardless of the math; see correlation-causation) and its size (too
   small and you cannot detect real effects; see statistical-power for
   sizing before collecting).

## Boundaries

- Inference quantifies uncertainty from sampling; it does not fix bias,
  confounding, or a bad study design. A perfect p-value on a confounded
  comparison is a confident illusion (see correlation-causation).
- Significance is a threshold convention, not a law of nature; the 0.05
  line is arbitrary, and treating it as a magic pass/fail encourages
  p-hacking. Report the actual numbers and let them speak.
- Frequentist and Bayesian framings answer subtly different questions;
  this covers the common frequentist toolkit. For decisions under
  uncertainty with priors, see the Bayesian approach (pymc).
