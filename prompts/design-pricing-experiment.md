---
name: design-pricing-experiment
description: Test a pricing change safely, given that pricing tests affect real revenue and existing customers.
variables:
  - "{change}: the pricing change and the reasoning behind it"
  - "{context}: current pricing, customer base, and contractual commitments"
settings: "Temperature 0.3."
---

Design a pricing test for:

{change}

Context: {context}

Use saas-pricing, pricing-change-migration, and ab-test-design.

Produce:
- What you are trying to learn.
- Who is exposed: new customers only, or a segment.
- How existing customers are protected.
- Metrics: conversion, average value, and retention together.
- Duration, given that pricing effects appear late.
- The decision rule and the rollback plan.
- Communication if anyone notices different prices.

Rules: never change prices for existing customers as an experiment.
Measure retention alongside conversion, since a price cut that lifts
signups and drops quality is a loss. Pricing tests raise fairness and
legal questions needing review before running.
