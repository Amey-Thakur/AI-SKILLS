---
name: design-doc
description: Write an engineering design doc that states the problem, weighs options, and lets reviewers approve or push back.
variables:
  - "{problem}: the problem or feature the design addresses"
  - "{context}: current system, constraints, requirements, and any options you are considering"
settings: "Temperature 0.3-0.5."
---

Write an engineering design doc for:

{problem}

Context: {context}

Structure (Google-style design doc):
- Context and problem: what we are solving and why now, with the background a
  reviewer needs. Include goals and explicit non-goals (what this does NOT do).
- Requirements and constraints: functional and non-functional, and the hard
  constraints (deadlines, dependencies, compliance).
- Proposed design: the approach, the architecture, the data model, the key
  interfaces. Enough detail that a reviewer can find the flaws.
- Alternatives considered: the other options and why you did not choose them.
  This is where a design doc earns trust: showing you weighed the space.
- Tradeoffs and risks: what this design gives up, what could go wrong, and how
  you mitigate it. Cover failure modes, rollout, and rollback.
- Open questions: what is still undecided and needs input.

Rules: write to be reviewed, not to sell: surface the weaknesses, do not hide
them. Justify decisions with reasons a reviewer can challenge. Concrete over
hand-wavy (name the technologies, the numbers, the interfaces). If a section
is thin because a decision is genuinely open, put it in Open Questions rather
than faking certainty.
