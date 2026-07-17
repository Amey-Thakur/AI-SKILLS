---
name: code-documentation
description: Write code comments and API docs that carry what the code cannot say, and nothing it already does. Use when documenting functions, modules, or tricky passages.
---

# Code documentation

The code says what happens. Documentation exists for everything else: why,
when, what must stay true, and what will bite. Write for the maintainer at
their moment of confusion.

## Method

1. **Comment the why, never the what.** "Retry three times" restates the
   loop; "the vendor API drops roughly 1 in 50 calls under load, and three
   retries brings failure below our SLO" earns its bytes. Before writing a
   comment, ask what the reader cannot learn from the code below it.
2. **Document the contract at every public boundary:** what the function
   promises, what it requires, what happens on bad input, whether it is
   safe to call twice, what it costs (network? blocking? allocation-heavy?).
   Private helpers usually need a good name more than a docstring.
3. **Mark the landmines explicitly.** Ordering requirements ("must run
   after migrations"), units ("milliseconds"), thread-safety, the reason a
   simpler approach was rejected. These comments prevent the confident
   refactor that breaks production.
4. **Keep examples honest and runnable.** One realistic call with its
   actual result beats three paragraphs. If the example cannot be tested,
   it will drift; prefer examples that live in tests or doctests.
5. **Delete lies on sight.** A comment contradicting the code is worse
   than none, because half the readers will trust it. Editing code means
   auditing its comments in the same change.
6. **Match the house style:** the project's docstring format, tone, and
   density. A file where every second line is commented reads as noise;
   one comment on the genuinely surprising line reads as a flare.

## What not to write

- Restatements: "increment i by one".
- Changelogs in comments: version control already remembers.
- Commented-out code: delete it; the attic is git.
- Apologies without information: "hack, sorry" helps nobody, while
  "workaround for framework issue #4182, removable at v3" is a plan.

## Litmus test

Cover the code and read only the comments and names: do you know what this
module is for, what its edges are, and what you must not break? Then cover
the comments: does anything in the code surprise you that a comment should
have flagged?
