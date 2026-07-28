---
name: procurement-brief
description: Write requirements for a purchase before looking at vendors, so the comparison is not shaped by whoever demos best.
variables:
  - "{need}: the problem to solve, current workaround, and who will use it"
  - "{constraints}: budget, timeline, integration, and compliance requirements"
settings: "Temperature 0.3."
---

Write a procurement brief for:

{need}

Constraints: {constraints}

Use agent-procurement-desk.

Produce:
- The problem stated without naming a solution category.
- Must-have requirements, each testable.
- Should-have and nice-to-have, weighted.
- Integration requirements with existing systems.
- Data and security requirements.
- Budget range and total cost boundaries.
- How candidates will be evaluated and by whom.

Rules: write requirements from your use case before seeing any vendor
material. Every must-have needs a way to test it in a trial. Do not
specify a solution where a requirement would do. Include exit
requirements such as data export from the start.
