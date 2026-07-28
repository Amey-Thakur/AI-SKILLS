---
description: "Write a report that leads with the finding, supports it proportionally, and states its own limits."
argument-hint: "[findings]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a report on:

{findings}

Audience: {audience}

Use report-writing and statistical-inference where numbers are involved.

Structure:
- Summary that stands alone: finding, basis, recommendation.
- The finding, stated before the method.
- Evidence, proportional to the claim.
- Interpretation, kept separate from the finding.
- Limitations: what the analysis cannot support.
- Recommendations with owners.
- Detail in appendices.

Rules: conclusion first. Keep finding, interpretation, and recommendation
visibly separate, since merging them hides which is which. State
limitations plainly rather than burying them. Do not overclaim beyond the
evidence.
