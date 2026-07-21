---
name: review-my-code
description: Review code for bugs, security issues, and clarity, with severity-ranked findings and concrete fixes.
variables:
  - "{code}: the code to review (a function, file, or diff)"
  - "{context}: language, what it does, and any specific concern"
settings: "Temperature 0.2-0.4 for careful, grounded review."
---

Review this code. Report only what you can defend with evidence from the code.

{code}

Context: {context}

Method:
1. State in one sentence what the code is meant to do, so we agree on intent.
2. Hunt in priority order: correctness (logic errors, off-by-one, null/error
   paths, race conditions), security (unvalidated input reaching queries,
   paths, or shell; secrets; missing authz), reliability (what happens when
   the input is empty, the call fails, two callers race), then
   maintainability (naming, duplication, dead code, missing tests).
3. For each finding: file/line, the defect in one sentence, the concrete
   failing input or scenario, and a suggested fix.
4. Rank by severity, worst first: Blocker, Major, Minor, Nit. Lead with the
   verdict ("N findings, worst is X").

Rules: verify before reporting (construct the failing case; if you cannot, ask
it as a question, do not assert it). Do not flag style a formatter enforces.
If the code is solid, say so plainly rather than inventing findings.
