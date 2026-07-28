---
name: relevance-tuning
description: Improve ranking with a judged evaluation set and measured changes rather than intuition. Use when search feels wrong and every proposed fix is someone's opinion.
---

# Relevance tuning

Relevance work goes wrong when it becomes a series of confident
adjustments nobody can evaluate. The discipline is having a way to say a
change made things better, which means a judged set and a metric before
any tuning starts.

## Method

1. **Build a judged query set first.** Fifty to a few hundred real
   queries with their known good results, drawn from actual logs rather
   than imagination.
2. **Pick a metric that matches the interface.** Precision at the number
   of visible results for a page of ten, or a rank-weighted measure when
   order matters throughout. Optimising a metric users never experience
   is wasted effort.
3. **Change one thing at a time and re-measure.** Field weights,
   matching model, and analyzers interact, so batched changes leave you
   unable to attribute the result.
4. **Watch the losers, not just the average.** A change that improves
   the mean while badly breaking a class of queries is usually a
   regression in disguise.
5. **Prefer signal over tweaking.** Adding a genuinely informative field
   such as popularity or recency usually beats another round of weight
   adjustment (see learning-to-rank basics in search-analytics).
6. **Validate offline gains online.** Judged sets approximate users, so
   confirm with an interleaving test or an experiment before declaring
   improvement (see ab-test-design).
7. **Keep the configuration in version control.** Relevance settings are
   code, and undocumented drift is why nobody dares touch search.

## Boundaries

- Tuning ranks what exists; missing or poor-quality content is a
  content problem, not a ranking one.
- Judged sets encode the judge's opinion and go stale as the corpus and
  the users change.
- Personalisation changes what correct means per user and needs its own
  evaluation approach.
