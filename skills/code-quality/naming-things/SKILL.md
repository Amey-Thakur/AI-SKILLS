---
name: naming-things
description: Choose names that carry meaning so readers grasp intent without chasing definitions. Use when naming variables, functions, types, or files, or when a name reads as vague.
---

# Naming things

A name is the interface every reader touches and the one thing the compiler
never checks for truth. Names are read far more often than written, so a vague
one taxes every future reader to reconstruct the meaning the author already
held.

## Method

1. **Size the name to the scope it lives in.** A three-line loop index can be
   `i`; a value passed across functions or modules needs a self-explaining
   phrase like `unacknowledgedEventCount`. Wider reach and less shared context
   demand a longer name.
2. **Spell words out; refuse invented abbreviations.** Write `request`,
   `message`, or the project's already-established short form, never a one-off
   `req2`, `msg`, or `flg`. Each abbreviation trades one saved keystroke for a
   lookup on every future read.
3. **Name the concept, not the container or type.** Prefer `dueInvoices` to
   `invoiceArray` or `data`. The type already appears in the declaration; spend
   the name on the meaning the type cannot express.
4. **Make booleans read as a claim at the branch.** `isActive`, `hasAccess`,
   and `shouldRetry` read cleanly in `if (hasAccess)`. Avoid negatives like
   `notReady` that force `if (!notReady)`, a double negative readers misparse.
5. **Keep one word per concept across the codebase.** If you `fetch` in one
   module, do not `get`, `load`, and `retrieve` the same thing elsewhere. Grep
   for the existing verb before coining a new one.
6. **Rename the moment the code reveals the true concept.** The stand-in name
   `flag` that turned out to gate exports should become `exportsUnlocked` now,
   while the change is one commit, not after ten call sites depend on the vague
   name.
7. **Cost the rename before you make it wide.** A function-local name is free
   to change; an exported symbol, a serialized field, or a database column
   ripples to callers, stored data, and other repos. For those, ship the new
   name beside the old, deprecate, then remove.

## Litmus tests

- Can a reader who lands mid-file guess what the name holds without scrolling
  to its definition?
- Does every abbreviation in the diff already appear elsewhere in the project,
  or did you just invent it?
- Read each boolean aloud inside its `if`: does it state a true or false claim,
  or pose a riddle?

## Boundaries

Established domain terms and house conventions outrank these rules: match the
codebase's accent even where you would choose otherwise. Some short names are
idiomatic (`i`, `err`, `id`), and lengthening them for a rule's sake only adds
noise. Where a linter already fixes casing and prefixes, follow it.
