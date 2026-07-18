---
name: magic-numbers
description: Replace unexplained literal values with named constants that carry their meaning, without over-formalizing the obvious. Use when a bare number or string encodes a rule.
---

# Magic numbers

A magic number is a literal whose meaning lives only in the author's head:
`if (age >= 18)`, `sleep(86400)`, `status === 3`. The reader cannot tell a
deliberate threshold from a typo, and a value that recurs must be found and
changed in every spot at once. The fix is a name, applied with judgment about
which literals actually need one.

## Method

1. **Name any literal that encodes a rule or a fact.** `MINIMUM_AGE = 18`,
   `SECONDS_PER_DAY = 86400`, `Status.SHIPPED = 3`. The name turns a mystery
   value into a statement the reader can check against the domain.
2. **Leave the truly self-evident bare.** `for (i = 0; ...)`, `x * 2` to double,
   `arr[0]` for the first element: naming these adds ceremony without meaning.
   The test is whether a name would tell the reader anything the literal does
   not already say.
3. **Name the recurrence even when each use looks obvious.** A `0.08` tax rate
   in five files is five edits and one guaranteed miss the day it changes. One
   `TAX_RATE` constant makes the change atomic and greppable, whatever the
   value's apparent simplicity.
4. **Put the constant where its meaning lives.** A domain rule belongs beside
   the domain code, or in a config it can be tuned from, not in a distant
   `constants.js` dumping ground that forces a reader to jump away to learn one
   number. Group by meaning, not by "it is a constant".
5. **Model a closed set as an enum, not loose constants.** Order states, error
   codes, and role levels are a fixed set: an enum lets the compiler reject
   `status === 7` and keeps the names traveling together. Scattered `STATUS_A`
   and `STATUS_B` lose that check.
6. **Keep units and provenance in the name or a neighbor comment.**
   `TIMEOUT_MS = 30000`, not `TIMEOUT = 30000`; `MAX_UPLOAD_BYTES`, not
   `MAX_UPLOAD`. Where the value comes from a spec or vendor limit, cite it so
   no one quietly rounds it off later.

## Checks

- Could a new reader change this threshold correctly using only the name, with
  no source archaeology?
- Does the same value appear in more than one place under different literals?
  Unify it before it diverges.
- Is a naked number carrying a unit (ms, bytes, percent) without saying so
  anywhere near it?

## Boundaries

Do not manufacture constants for genuinely obvious literals or one-off values
used once in clear context; over-naming buries the few numbers that matter under
noise like `ONE = 1`. Per-environment values belong in configuration, not source
constants. For repeated non-numeric literals and shared rules, this overlaps
code-duplication.
