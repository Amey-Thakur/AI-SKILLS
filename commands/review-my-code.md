---
description: "Review code for bugs, security issues, and clarity, with severity-ranked findings and concrete fixes."
argument-hint: "[code]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
