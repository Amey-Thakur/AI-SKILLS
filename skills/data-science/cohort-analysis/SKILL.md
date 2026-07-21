---
name: cohort-analysis
description: Group users by a shared start and track them over time to see retention, behavior, and trends that aggregates hide. Use when a blended metric looks stable or improving but you suspect the underlying behavior is changing.
---

# Cohort analysis

Blended metrics lie by mixing users of different ages and vintages. Cohort
analysis fixes this by grouping users by a shared starting point (usually
signup month) and following each group over time, so you see whether the
product is actually getting better or just growing over a worsening base.

## Method

1. **Define the cohort by a meaningful shared start.** Most often signup or
   first-purchase period (weekly or monthly cohorts), but any shared origin
   works (users from a campaign, a feature launch). The cohort's defining
   event is what you group by; the metric is what you track across their
   lifetime.
2. **Track the metric by cohort age, not calendar time.** Line up each
   cohort at "month 0, month 1, ..." from their own start, so you compare
   cohorts at the same age. This is what separates "our month-1 retention"
   (a real, comparable number) from a calendar metric that blends all ages.
3. **Read the cohort table both ways.** Down a column (same cohort age
   across vintages): is a newer cohort retaining better or worse than an
   older one at the same age? That tells you if the product is improving.
   Across a row (one cohort aging): the retention/decay curve shape. Both
   readings carry different insight.
4. **Use it to expose what blending hides.** A flat or rising blended metric
   can mask every cohort decaying, propped up by growth (new users
   replacing churned ones). Cohorts reveal this: if each successive cohort
   is worse at the same age, you have a worsening product hidden by a growth
   story (see the blending warning in saas-metrics, churn-analysis).
5. **Look for the retention plateau.** Healthy products retain a stable
   floor of users after early churn (the curve flattens); a curve that
   decays to zero means no lasting value. Where the curve stabilizes, and at
   what level, is a core signal of product-market fit (see user-activation,
   churn-analysis).
6. **Segment cohorts by acquisition and type.** Cohorts from different
   sources, plans, or first-actions retain differently; segmenting reveals
   which acquisition or onboarding produces users who stick (a channel
   whose cohorts decay fast is a quality problem, not a volume win; see
   funnel-analysis, correlation-causation on selection).

## Boundaries

- Cohort analysis shows patterns over time; it does not explain the cause.
  A worsening cohort trend is a signal to investigate (a product change, a
  shift in acquisition mix), not a diagnosis (see correlation-causation).
- Cohort tables need enough users per cohort to be stable; thin cohorts are
  noisy, so widen the period or wait for volume before reading small
  differences.
- Churn analysis is cohort analysis applied specifically to retention and
  churn drivers; this skill is the general technique, applicable to any
  metric by cohort (see churn-analysis for the churn-focused method).
