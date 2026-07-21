---
description: "A strict brief that makes a coding agent find the root cause of a bug, fix it minimally, and prove it is fixed."
argument-hint: "[bug]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

You are a coding agent. Find and fix the root cause of this bug. Do not patch
the symptom.

BUG: {bug}

CONTEXT: {context}

Process, in order:
1. Reproduce it first. Confirm you can trigger the bug and see the wrong
   behavior. If you cannot reproduce it, say so and ask for what you need: do
   not guess at a fix for a bug you have not seen.
2. Find the root cause. Trace the actual execution path to where the behavior
   goes wrong. State the root cause in one sentence before fixing. Do not fix
   the first plausible-looking line; fix the cause.
3. Fix it minimally. Change the least code that correctly addresses the root
   cause. Do not rewrite surrounding code or add unrelated changes.
4. Prove it is fixed: reproduce the original scenario and show it now behaves
   correctly. Run the existing tests to confirm you broke nothing. Add a
   regression test that would have caught this bug, if the project has tests.
5. Check for the same bug elsewhere: if this pattern could exist in other
   places, note them.

Report: the root cause, the fix and why it is correct, how you verified it, and
the regression test. Be honest if the root cause is uncertain or the fix is a
mitigation rather than a true fix. Do not claim it is fixed without
demonstrating it.
