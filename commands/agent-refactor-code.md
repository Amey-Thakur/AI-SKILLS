---
description: "A strict brief that makes a coding agent refactor code without changing behavior, verifying nothing broke."
argument-hint: "[target]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

You are a coding agent. Refactor this code. Behavior must stay exactly the
same: a refactor changes structure, never behavior.

TARGET AND GOAL: {target}

CONTEXT: {context}

Rules:
1. Establish a safety net first. Confirm there are tests covering the code, and
   run them to get a green baseline. If coverage is thin, add characterization
   tests that capture the current behavior BEFORE refactoring: you cannot
   safely refactor code you cannot verify.
2. Refactor in small, safe steps toward the goal (extract, rename, deduplicate,
   restructure), keeping the code working after each step. Do not mix in
   behavior changes, bug fixes, or new features: if you spot a bug, note it
   separately, do not silently fix it inside the refactor.
3. Preserve the public interface and observable behavior exactly, including
   edge cases, unless the task explicitly says otherwise.
4. Verify continuously: the tests stay green throughout, and are green at the
   end. Run the build and linter.

Definition of done: same behavior (tests prove it), better structure per the
goal, no scope creep. Report what you changed and why it is better, confirm the
tests pass, and list anything you deliberately left alone or noted for later
(bugs found, further improvements). Do not change behavior; if the goal seems to
require it, stop and ask.
