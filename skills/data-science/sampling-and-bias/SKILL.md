---
name: sampling-and-bias
description: Judge whether a sample represents the population and spot the selection, survivorship, and response biases that invalidate conclusions. Use when drawing conclusions from data that is a sample of something larger, which is almost always.
---

# Sampling and bias

Nearly all data is a sample of a larger population, and the conclusion is
only as good as the sample is representative. Biased sampling is the
silent killer of analysis: the math is flawless, the p-value is tiny, and
the answer is wrong because the data was drawn wrong. Spotting it is a core
guardrail.

## Method

1. **Ask how the data was collected, first.** Before analyzing, understand
   how these particular observations came to be in the dataset: who was
   included, who was excluded, and by what process. Sampling bias lives in
   the collection, so a conclusion cannot be trusted without knowing the
   sample's origin (see exploratory-data-analysis).
2. **Watch for selection bias.** When inclusion in the sample is related to
   the thing you are studying, the relationship is distorted from the start.
   Users who opted in, customers who responded, the treated group that
   differed at baseline: each creates apparent effects from the selection
   itself, not the cause you infer (see correlation-causation's selection
   trap).
3. **Remember the survivors you cannot see.** Survivorship bias: analyzing
   only what remained (successful companies, retained users, planes that
   returned) misses the ones that dropped out, and the missing cases often
   hold the answer. "Successful startups did X" is meaningless without the
   failed ones that also did X. Always ask who is missing from the data.
4. **Account for non-response and self-selection.** Surveys and voluntary
   data over-represent those motivated to respond (the very satisfied and
   the very angry), who differ systematically from the silent majority. A
   90% satisfaction rate from a 5% response is not 90% satisfaction (see
   survey-questions).
5. **Check that the sample matches the population you care about.** Even a
   large, clean sample is biased if it is drawn from the wrong group (a
   model trained on one region's users, a metric from power users
   generalized to all). Representativeness, not just size, is what lets you
   generalize; a huge biased sample is confidently wrong (see the
   train/serve population mismatch in train-test-discipline).
6. **Prefer random or corrected sampling, and state the limits.** Random
   sampling from the target population is the defense; where you cannot get
   it, use known corrections (weighting, stratification) and, above all, be
   explicit about the sample's limits and who the conclusion does and does
   not apply to. Honesty about the sample is part of the finding (see
   data-storytelling).

## Boundaries

- No statistical technique fixes a fundamentally biased sample; sample size,
  significance, and fancy models all amplify a biased sample's wrong answer
  rather than correcting it (see statistical-inference).
- Some bias is unavoidable (you can only study who you can reach); the goal
  is to know its direction and magnitude and to bound the conclusion
  accordingly, not to pretend it is absent.
- Bias in the sample is distinct from bias in a model or metric, though they
  compound; addressing representativeness at collection is upstream of, and
  more powerful than, correcting downstream (see the fairness discussion in
  model-evaluation).
