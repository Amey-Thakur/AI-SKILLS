---
name: assess-technical-debt
description: Assess technical debt by what it costs now, and produce a paydown plan tied to upcoming work.
variables:
  - "{codebase}: the areas of concern and why they are painful"
  - "{roadmap}: what is being built next and where it touches those areas"
settings: "Temperature 0.3."
---

Assess technical debt in:

{codebase}

Upcoming work: {roadmap}

Use tech-debt-register, refactoring, and prioritization-frameworks.

Produce:
- Each area of debt with what it costs today, concretely.
- Which debt is on the path of upcoming work and which is not.
- What was a deliberate trade versus accumulated neglect.
- Paydown ranked by cost avoided, not by ugliness.
- What to leave alone, and why.
- How paydown attaches to feature work rather than needing its own
  project.
- What would tell you it is getting worse.

Rules: rank by cost incurred rather than by how much the code offends.
Debt in code nobody touches is often correctly ignored. Attach paydown
to work already going through the area. Say plainly what should be left
alone.
