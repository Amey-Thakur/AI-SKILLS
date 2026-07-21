---
name: okr-draft
description: Draft OKRs with an inspiring objective and measurable, outcome-based key results, avoiding vanity and task-lists.
variables:
  - "{goal}: the team or company goal or direction for the period"
  - "{context}: the timeframe, the team, and current baselines if known"
settings: "Temperature 0.4-0.6."
---

Draft OKRs for: {goal}

Context: {context}

For the Objective:
- Qualitative, memorable, and directional: what we want to achieve and why it
  matters. It should motivate, not measure ("Delight new users in their first
  week", not "Increase D7 retention").

For each Key Result (2-4 per objective):
- Measurable and outcome-based: a number that proves the objective was met.
  "D7 retention from 35% to 50%" (an outcome), not "Ship the onboarding
  redesign" (a task: tasks are how you might move the KR, not the KR itself).
- Ambitious but not impossible: a stretch that is uncomfortable, roughly
  70%-achievable if things go well.
- Include a baseline and a target so progress is trackable.

Rules: the most common OKR mistake is key results that are task lists or vanity
metrics: keep them outcomes that would survive Goodhart (gaming the metric
should not be possible without achieving the real goal). Include guardrails
where a KR could be gamed at the cost of something else. Keep it to 1-2
objectives with 2-4 KRs each: more is unfocused. If a baseline is unknown, flag
that measuring it is step zero.
