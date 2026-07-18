---
name: boolean-parameters
description: Replace opaque boolean flags with named enums or split functions so call sites read without the definition open. Use when a signature takes a bare boolean or a function branches on a mode flag.
---

# Boolean parameters

A boolean argument reads fine at the definition and lies at the call site:
`render(true, false)` tells the reader nothing about what is on and what is
off. Worse, a flag usually means the function does two different jobs bolted
together behind an `if`, and splitting them would be clearer than switching
between them.

## Method

1. **Read your call sites, not your signatures.** Find the bare
   `true`/`false` arguments: `createUser(data, true)`, `connect(host,
   false, true)`. If a reader must open the definition to learn what the
   boolean means, it is the wrong parameter. Grep for `, true)` and
   `, false)` to surface them.
2. **Replace a mode flag with an enum.** `setAlignment(true)` becomes
   `setAlignment(Alignment.Left)`; a two-value flag becomes a named type
   with two cases. The call site now states what it does, and a third mode
   later extends the enum instead of adding a second boolean.
3. **Split a function that branches on the flag.** If `save(data, isDraft)`
   is `if (isDraft) {...} else {...}` with two nearly separate bodies, make
   `saveDraft(data)` and `publish(data)`. Two honest names beat one
   function with a hidden fork inside it.
4. **Name the argument at the call when you cannot change the API.** For a
   boolean you do not own, use a keyword argument (`retry=True` in Python),
   an options object (`fetch(url, { cache: false })` in JS), or a named
   constant so the site reads. This is the fallback, not the goal.
5. **Never pass two booleans in a row.** `f(true, false, true)` is
   unreadable and one transposition away from a silent bug. Collect related
   flags into an options object or a small config type where each field is
   named at the call.
6. **Default the common case, require the rare one.** If a flag is true 95%
   of the time, an options object with a sensible default drops it from
   most calls entirely, leaving the flag visible only where behavior
   actually differs.

## Litmus tests

- Can you read a call site and know what every argument does without
  opening the definition?
- Does any function take two or more booleans in sequence?
- Is a boolean parameter really selecting between two behaviors that each
  deserve their own name?

## Boundaries

A single boolean on a well-named setter (`setVisible(true)`) reads fine and
needs no enum: the property name already carries the meaning. Established
library APIs you do not control set their own conventions; wrap them for
clarity at your call sites rather than forking them.
