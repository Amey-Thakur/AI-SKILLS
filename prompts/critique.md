---
name: critique
description: Get honest, useful critical feedback on any piece of work, with strengths, weaknesses, and how to fix them. A quick /critique command.
variables:
  - "{work}: the work to critique (writing, a plan, an idea, a design, code)"
  - "{goal}: what it is trying to achieve and any bar it must clear"
settings: "Temperature 0.4-0.6."
---

Critique this:

{work}

What it is trying to achieve: {goal}

Review it as a thoughtful, honest reviewer:
- What works: the genuine strengths, briefly (so they are kept, not lost in a
  revision).
- What does not: the real weaknesses, in priority order, each with why it is a
  problem and specifically how to fix it. Be direct; vague praise helps
  nobody.
- What is missing: gaps, unaddressed cases, unanswered objections.
- The one or two changes that would most improve it.

Rules: honest and specific over gentle and generic (the point is to make the
work better). Critique the work, not the person. Distinguish real defects from
mere preference, and say so. If it is genuinely strong, say that plainly rather
than manufacturing faults. Ground each point in the work itself. For an agent
to critique its own output before delivering, see the reflect prompt; to argue
against an idea's premises, see devils-advocate.
