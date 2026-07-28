---
name: write-proposal
description: Write a client proposal that shows you understood the problem, with scope, price, and risks stated.
variables:
  - "{brief}: what the client asked for and what you understand their problem to be"
  - "{approach}: how you would do it, the timeline, and the commercial terms"
settings: "Temperature 0.3."
---

Write a proposal for:

{brief}

Approach: {approach}

Use proposal-writing and project-scoping.

Structure:
- Their problem in their words, first.
- Your approach in stages, with what they see at each.
- Scope: what is included and, explicitly, what is not.
- Price, its basis, and what would change it.
- Risks and how each is handled.
- What you need from them, with dates.
- Brief, directly relevant credentials.

Rules: lead with their problem rather than your credentials. State
exclusions explicitly, since that prevents the later disagreement. Be
specific about what changes the price. Note that the resulting agreement
needs legal review.
