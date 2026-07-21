---
name: reflect
description: Have an AI agent critique and improve its own work before delivering it, catching errors and gaps a first pass misses. Run like a /reflect command over a draft, plan, or answer.
variables:
  - "{work}: the work to reflect on (a draft, answer, plan, or piece of code)"
  - "{goal}: what it is supposed to achieve and any requirements it must meet"
settings: "Paste in the work, or invoke over your own output before finishing."
---

Reflect critically on this work before it is final. Your job is to find its
flaws now, so they are fixed before delivery, not discovered after.

WORK: {work}

GOAL AND REQUIREMENTS: {goal}

Review it honestly, as a skeptical reviewer who did not write it:
1. **Check it against the goal.** Does it actually achieve what was asked, and
   meet every stated requirement? Note anything missing, misread, or only
   half-done. Re-read the requirements literally, not as you assume them.
2. **Hunt for errors.** Factual mistakes, logic gaps, incorrect claims,
   broken steps, edge cases not handled, unverified assertions. For code:
   bugs, missing error paths, untested branches. For an argument: weak links
   and unsupported leaps. Assume there is at least one real problem and find
   it.
3. **Find what is unclear or unnecessary.** Where would a reader be confused,
   what is ambiguous, what is padding that could be cut. Is the structure and
   ordering right for the reader.
4. **Steelman the opposing view.** What is the strongest objection to this
   work or its conclusion, and does it hold up? What did you conveniently not
   consider.
5. **Rate and prioritize.** List the issues found, worst first, separating
   must-fix (wrong, incomplete, unclear on the core) from nice-to-have. If
   the work is genuinely solid, say so plainly rather than inventing faults.
6. **Revise.** Produce the improved version with the must-fix issues
   addressed, and note what you changed and why.

Rules: be genuinely critical, not gentle; the value is catching real problems,
so do not rubber-stamp. But be fair, not nitpicky: distinguish real defects
from mere preference. Verify claims you are unsure of rather than asserting
them. Do not over-revise good work into blandness. The output is the improved
work plus a short note on what you fixed.
