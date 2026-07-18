---
name: rubber-duck-protocol
description: Explain the failing code line by line in writing until the sentence you cannot finish exposes the false assumption. Use when you are stuck, re-reading the same code, sure it should work, and it does not.
---

# Rubber duck protocol

Most stubborn bugs are not in the code, they are in your model of the code: a
belief about what a line does that is quietly wrong. Reading silently lets you
skim straight past that belief. Explaining every step in writing to an imagined
listener forces each assumption into words, and the false one is the sentence
you cannot say with a straight face.

## Method

1. **Write to a listener who knows nothing.** Address a real reader: a
   teammate, the bug ticket, a plain text file. Explaining to someone you must
   not lose forces you to justify the steps you would otherwise wave past.
2. **Narrate line by line, claiming what each does.** For every line write
   "this takes X and produces Y." The bug hides in a line you assert without
   checking, so the payoff is in the boring lines you most want to skip.
3. **State the concrete value you expect at each step.** Not "it parses the
   date," but "after this, `d` is a `date` for 2026-07-17." Naming the exact
   expected value is where wrong assumptions surface into daylight.
4. **Stop at the sentence you cannot finish.** When you write "and then it
   returns the sorted list" and pause because you are no longer sure it sorts,
   you have found the suspect. The hesitation is the signal, not the verdict.
5. **Go verify that exact claim now.** Do not reason further about it. Open the
   function, read the docs, print the value. The duck's only job is to locate
   the untested belief; check it against reality immediately.
6. **Explain the data, not only the logic.** Walk one real input through the
   code by hand. Assumptions about shape, null, encoding, or units hide in the
   data far more often than in the control flow.
7. **Write the corrected sentence when you are done.** Restate the line as it
   truly behaves. That sentence is often the exact comment or commit message the
   fix needs anyway.

## Litmus tests

- Did you write full sentences, or skim and call it explaining?
- Which specific sentence did you stall on, and did you verify it before moving on?
- Can you now state the false belief you held in one plain sentence?

## Boundaries

The duck locates a wrong assumption fast, but it does not prove the fix: once it
points at a line, confirm with a probe from scientific-debugging or a failing
test from reproduction-first. For faults with no stable trigger, no amount of
narration substitutes for capturing the race.
