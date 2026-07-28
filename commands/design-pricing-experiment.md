---
description: "Test a pricing change safely, given that pricing tests affect real revenue and existing customers."
argument-hint: "[change]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
