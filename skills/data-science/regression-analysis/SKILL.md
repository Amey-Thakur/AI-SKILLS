---
name: regression-analysis
description: Fit and interpret regression models for insight, reading coefficients, fit, and caveats honestly rather than as causal truth. Use when using regression to understand relationships in data, not to build a predictive model.
---

# Regression analysis

Regression is the workhorse of analytics: it quantifies how outcomes relate
to inputs and lets you say "holding other things equal, X is associated
with this much Y". Its power is also its trap, because a coefficient looks
like a causal effect and usually is not. Interpreting it honestly is the
skill.

## Method

1. **Pick the form for the outcome.** Linear regression for continuous
   outcomes, logistic for binary (odds/probability), Poisson-family for
   counts. Using linear regression on a 0/1 outcome or ignoring the outcome
   type gives nonsense predictions and misleading coefficients.
2. **Read coefficients as "holding others constant".** Each coefficient is
   the association between that predictor and the outcome with the other
   included variables held fixed. This "controlling for" is only as good as
   the variables you included; an omitted confounder biases the
   coefficients you have (see correlation-causation). State the direction,
   size, and units, not just significance.
3. **Judge fit and the residuals, not just R-squared.** R-squared says how
   much variance is explained but nothing about correctness; a high R-squared
   can hide a mis-specified model, and a low one can still carry a real
   relationship. Plot the residuals: patterns reveal nonlinearity,
   heteroscedasticity, and outliers the summary numbers miss.
4. **Report uncertainty on every coefficient.** Coefficients are estimates
   with confidence intervals; a "significant" coefficient with a wide
   interval is weakly known. Give the interval, and remember that with
   enough data, tiny, unimportant effects become significant (see
   statistical-inference).
5. **Check the assumptions and the specification.** Multicollinearity (correlated
   predictors make individual coefficients unstable and uninterpretable),
   the right functional form (linear in the right variables, interactions
   where they matter), and influential outliers. A model that violates its
   assumptions produces confident, wrong coefficients.
6. **Resist the causal leap.** A regression coefficient is an association,
   not the effect of intervening, unless the data came from an experiment or
   you have carefully handled confounding. "Controlling for X" in a
   regression is not the same as an experiment; do not tell stakeholders a
   coefficient is what will happen if they change the input (see
   correlation-causation, experiment-analysis).

## Boundaries

- Interpretive regression (understanding relationships) and predictive
  modeling (forecasting an outcome) optimize for different things; a model
  built for insight is judged on honest coefficients and caveats, one for
  prediction on held-out accuracy (see model-evaluation, ml-problem-framing).
- Regression on observational data supports "associated with", not
  "causes"; the coefficient's causal interpretation requires a design
  (experiment, natural experiment) the regression alone does not provide.
- Complex relationships (strong nonlinearity, interactions, high
  dimensionality) may exceed what a readable regression captures; there the
  tradeoff is interpretability versus a flexible model you cannot explain as
  simply.
