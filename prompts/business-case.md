---
name: business-case
description: Make the case for an investment with costs, benefits, risks, and the option of not doing it.
variables:
  - "{proposal}: what you want to do and why now"
  - "{context}: current situation, constraints, and who decides"
settings: "Temperature 0.3."
---

Write a business case for:

{proposal}

Context: {context}

Use capital-allocation and project-risk-management.

Structure:
- The problem and its cost today, quantified where possible.
- The proposal and what changes.
- Costs: build, run, and opportunity cost of the people involved.
- Benefits, with how they would be measured after the fact.
- Risks and what would be done about each.
- The do-nothing option and what it costs.
- A staged option, if the full commitment can be deferred.

Rules: quantify what can be quantified and mark the rest as judgement.
Include the option of not proceeding as a genuine alternative. State the
payback period. Do not present benefits without saying how they would be
verified afterwards.
