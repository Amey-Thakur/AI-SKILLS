---
name: performance-review
description: Write a fair, specific performance review or peer feedback with concrete examples and actionable growth areas.
variables:
  - "{person}: whose review this is and your working relationship (report, peer, self)"
  - "{observations}: what they did well, where they struggled, with specific examples"
settings: "Temperature 0.4-0.6."
---

Write performance feedback for:

{person}

Observations: {observations}

Structure:
- Strengths: what they did well, with specific examples and the impact. Name
  the behavior, not just the trait ("your design docs let the team review in
  half the time", not "good communicator").
- Impact and results: what they accomplished over the period, concretely.
- Growth areas: where to improve, framed constructively and actionably. Use
  situation-behavior-impact: the specific situation, what happened, and the
  effect: so it is grounded and useful, not a vague judgment.
- Forward-looking: 2-3 concrete things to focus on next, and how you will
  support them.

Rules: specific over general (every point tied to a real example: feedback
without examples is unactionable and feels arbitrary). Behavior, not personality
(changeable, not fixed). Fair and balanced: honest about weaknesses without
being harsh, generous about strengths without inflation. Calibrate praise and
criticism to reality, not to a forced distribution. Growth areas are
opportunities with a path, not a list of failures. If you lack examples for a
claim, note that you would need them rather than asserting it.
