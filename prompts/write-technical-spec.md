---
name: write-technical-spec
description: Write a technical design document with the problem, the approach, the alternatives, and the risks.
variables:
  - "{problem}: what needs solving and the constraints"
  - "{context}: existing systems, scale, and team"
settings: "Temperature 0.3."
---

Write a technical spec for:

{problem}

Context: {context}

Use design-doc, architecture-decision-records, and failure-mode-analysis.

Structure:
- The problem and why it needs solving now.
- Requirements, functional and non-functional, with numbers.
- The proposed approach and how it works.
- Alternatives considered and why each was rejected.
- Failure modes and how each is handled.
- Migration or rollout plan.
- What is out of scope.
- Open questions.

Rules: state non-functional requirements as numbers rather than
adjectives. Alternatives must be genuine, including the one you nearly
chose. Cover the failure modes, since specs are usually silent there.
Mark open questions rather than resolving them by assumption.
