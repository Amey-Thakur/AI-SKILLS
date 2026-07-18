---
name: cognitive-load
description: Cut the working memory a reader needs to follow code through locality, one idea per line, and naming that carries context. Use when a function makes reviewers scroll back, re-read, or hold several facts to grasp one line.
---

# Cognitive load

Working memory holds only a handful of items at once, so code that forces a
reader to track more than that becomes slow to read and easy to misread. The
job is to arrange code so each line is understandable from what is already on
screen. Without a method you optimize for fewer lines or clever expressions,
trading your convenience for every future reader's confusion.

## Method

1. **Keep a definition next to its use.** Declare a variable on the line before
   the loop that reads it, not forty lines up. When a name and its only use sit
   on one screen, the reader never scrolls back to recover what it meant.
2. **One idea per line.** Split `return transform(fetch(parse(input)))` into
   named steps: `parsed`, `record`, `result`. Each intermediate name is a label
   the reader rests on instead of unwinding four nested calls in their head.
3. **Replace bare literals with named context.** `if (status == 3)` becomes
   `if (status == Status.EXPIRED)`. The magic value forces a lookup elsewhere;
   the name carries the meaning inline where the reader already is.
4. **Cap nesting at two or three levels with early returns.** Guard clauses like
   `if (!user) return;` flatten the arrow of doom. Each indentation level is one
   more condition the reader must hold true while reading everything inside it.
5. **Shrink the count of live variables.** A block juggling eight mutable locals
   is eight things to track. Extract a sub-block into a function so its
   temporaries die at the boundary and drop out of the reader's memory.
6. **Name by role, not type or mechanics.** `remainingRetries` beats `i2`;
   `isEligible` beats `flag`. A name stating why the value exists spares the
   reader from reconstructing intent out of how the value gets used.

## Signals

- Read the function aloud once: if you lose the thread, so will everyone.
- Count the facts you must hold to parse the hardest line. Past four, redesign.
- If a reviewer asks "what is this variable again?", its definition is too far.

## Boundaries

Some domains carry irreducible complexity: a numerical kernel or a parser state
machine stays dense because the problem is dense. Reduce load without hiding
real behavior behind abstraction, and profile before restructuring hot code
that reads awkwardly for the sake of speed.
