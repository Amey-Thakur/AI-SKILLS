---
name: debugging
description: Find the root cause of a bug with a hypothesis-driven loop instead of guess-and-patch. Use when something fails, crashes, or behaves wrongly and the cause is not yet known.
---

# Debugging

The goal is the *cause*, not the symptom's disappearance. A fix applied
without understanding is a second bug waiting.

## Method

1. **Reproduce before anything else.** Get the exact failing input, command,
   or click path, and confirm you can trigger the failure on demand. A bug
   you cannot reproduce is a bug you cannot verify fixed. If reproduction is
   impossible, gather the evidence you do have (logs, stack trace, timing)
   and say plainly that the fix will be a hypothesis.
2. **State the symptom precisely.** "Fails" is not a symptom. "Returns 200
   with an empty list when the user has 3 orders" is. Write down expected vs
   actual; the gap between them is the search space.
3. **Form one falsifiable hypothesis.** "The cache returns stale data
   because the key omits the user id" — specific enough that an experiment
   can kill it. If you have three hypotheses, rank by likelihood and cheapest
   test first.
4. **Run the smallest experiment that can falsify it.** Read the code path,
   add one log line, write a one-case test, bisect the commit range, or
   shrink the failing input by halves. One variable per experiment; change
   two things and you have learned nothing.
5. **Loop.** Each dead hypothesis narrows the space. When an experiment
   confirms the cause, you should be able to explain the entire chain:
   trigger → mechanism → observed symptom. If any link is fuzzy, keep going.
6. **Fix the cause, then prove it.** The reproduction from step 1 must now
   pass, and the fix should come with a test that fails without it. Then
   look sideways once: does the same mistake exist in sibling code?

## Anti-patterns to refuse

- Patching the symptom ("add a null check") without knowing why the value
  was null.
- Changing code at random until the error moves.
- Declaring victory because the error stopped appearing *once*.
- Blaming the framework, compiler, or cosmic rays before your own code has
  been ruled out with evidence. It is your code, roughly always.

## When stuck

Explain the bug out loud to the reader: symptom, everything ruled out, the
remaining suspects. Half of these explanations end mid-sentence with "…oh."
The other half hand the next person a real map instead of a shrug.
