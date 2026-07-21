---
name: time-series-analysis
description: Analyze and forecast time-ordered data respecting trend, seasonality, autocorrelation, and the arrow of time. Use when working with data indexed by time: metrics, sales, sensor readings, or any forecast.
---

# Time series analysis

Time series data breaks the assumption most methods rely on: that
observations are independent. Yesterday predicts today, patterns repeat
seasonally, and the future must never leak into the past. Analyzing it
correctly means respecting time's structure and its one-way arrow.

## Method

1. **Decompose into trend, seasonality, and residual.** Most series are a
   long-term trend, plus repeating seasonal cycles (daily, weekly, yearly),
   plus noise. Separating them (visually first: see data-visualization)
   tells you what is driving the series and what to model. A "surprising
   spike" is often just the weekly or holiday pattern.
2. **Respect autocorrelation.** Observations near in time are correlated,
   which violates the independence that standard statistical tests and
   train/test splits assume. This is why you cannot randomly shuffle time
   series data and why naive confidence intervals are too narrow. Account
   for it (autocorrelation plots reveal the structure).
3. **Split by time, never randomly.** Train on the past, test on the
   future, in order. A random split lets the model peek at future points to
   predict past ones, producing a fantasy score that collapses in
   production (see train-test-discipline). Use walk-forward validation
   (expanding or rolling window) to estimate real forecast performance.
4. **Guard against look-ahead leakage.** Every feature must use only
   information available at prediction time: a rolling average must not
   include the current or future point, a "total for the month" must not
   be known mid-month. Look-ahead leakage is the signature time-series bug
   and it makes backtests lie (see feature-engineering-tabular's
   point-in-time rule).
5. **Match the forecasting method to the series.** Simple baselines first
   (last value, seasonal naive, moving average): often hard to beat and the
   honest yardstick (see ml-baselines). Then classical methods (exponential
   smoothing, ARIMA) for clear trend/seasonality, or ML/deep models for
   complex multi-series problems. Do not reach for an LSTM before beating
   the seasonal-naive baseline.
6. **Handle the practical realities.** Missing timestamps and irregular
   intervals (resample deliberately), regime changes and structural breaks
   (a pandemic, a launch: the past may not predict the future through them),
   and non-stationarity (differencing or detrending where methods require
   stationary input).

## Boundaries

- Forecasts carry growing uncertainty the further out they go; report
  prediction intervals, not just point forecasts, and distrust confident
  long-horizon predictions (see statistical-inference).
- Correlation-in-time is still not causation; two series trending together
  (or a lag relationship) can be coincidence or a shared driver (see
  correlation-causation).
- Structural breaks defeat any model trained before them; monitor for them
  and know that no method forecasts through an unprecedented regime change
  (see drift-monitoring).
