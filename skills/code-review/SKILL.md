---
name: code-review
description: Review code changes for correctness, security, and maintainability with severity-ranked, evidence-based findings. Use when asked to review a diff, a pull request, or a file before merge.
---

# Code review

Review the change, not the author, and report only what you can defend with
evidence from the code in front of you.

## Method

1. **Understand the intent first.** Read the description, the tests, and the
   shape of the diff before judging a line. A "bug" that is deliberate
   behavior wastes everyone's time; state the intent back in one sentence
   before your first finding.
2. **Read in execution order, not file order.** Follow a request, event, or
   call from entry to exit through the changed code. Bugs live on the paths
   between hunks, not inside them.
3. **Hunt in this priority order:**
   - Correctness: logic inversions, off-by-one, unhandled error and `null`
     paths, race conditions, resource leaks, broken invariants.
   - Security: unvalidated input reaching queries, paths, URLs, or shell;
     secrets in code; authz checks missing on new surfaces.
   - Reliability: what happens when the network call fails, the file is
     missing, the input is empty, the list has one item, or two callers
     arrive at once.
   - Maintainability: misleading names, dead code, duplication of an
     existing helper, missing tests for the risky branch.
4. **Verify before you report.** For each candidate finding, construct the
   concrete failing scenario: the input or state that triggers it and the
   wrong result that follows. If you cannot construct one, it is a question,
   not a finding — ask it as a question.
5. **Rank by severity, worst first.** Blocker (data loss, security,
   crash), Major (wrong behavior on realistic input), Minor (confusing but
   correct), Nit (style). Never bury a Blocker under ten Nits.

## Reporting format

For each finding: **file:line — one-sentence defect — the failing scenario —
a suggested fix.** Lead with the verdict: "N findings, worst is X" so the
reader knows the stakes in the first line. If the change is good, say so
plainly and stop; inventing findings to look thorough is a defect in the
review, not the code.

## Boundaries

- Do not review style a formatter or linter already enforces.
- Do not demand rewrites of working code that is merely not how you would
  write it; that is preference, and it goes at Nit level or not at all.
- If the diff is too large to follow execution paths, say that first — "this
  needs splitting to review honestly" is a legitimate top finding.
