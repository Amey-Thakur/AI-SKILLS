---
name: code-duplication
description: Decide when repeated code should be unified and when a duplicate is the cheaper choice. Use when tempted to extract a shared helper or facing copy-pasted code.
---

# Code duplication

Not all repetition is duplication. Two blocks that look alike but change for
different reasons are a coincidence, and unifying them couples things that
should move apart. The costly mistake is the wrong abstraction: it is harder to
back out of than the duplication it replaced.

## Method

1. **Wait for the rule of three.** Two copies are cheap to keep in sync by hand;
   extract on the third appearance, when the pattern and its variation points
   are clear. Abstracting from two examples guesses at the shape and usually
   guesses wrong.
2. **Unify by reason to change, not by appearance.** Ask whether the copies must
   always change together. A tax calculation shared across invoices and receipts
   that must stay identical is real duplication; two validators that happen to
   share four lines today are not. Same shape, different reasons: leave them.
3. **Extract the stable core, parameterize the difference.** When you do unify,
   the shared function holds what is truly common and takes the varying parts as
   arguments. If the parameter list balloons with flags that switch behavior,
   the cases were less alike than they looked; stop.
4. **Price the wrong abstraction honestly.** A bad shared helper taxes every
   caller: each reads its flags, each fears changing it, each adds a branch for
   its special case until the body is a pile of `if (mode === ...)`. That cost
   compounds silently, while duplication's cost stays visible and local.
5. **Inline back to duplicates when an abstraction fights you.** If a shared
   function has grown special-case branches for half its callers, delete it and
   give each caller its own copy again. Reversing a bad merge is progress, not
   backsliding; two clear duplicates beat one tangled union.
6. **Never unify across a module boundary for looks alone.** Sharing code
   couples the sharers' release and change cycles. Two teams' near-identical
   helpers can be correct precisely because each owns and evolves its own; a
   library forced between them is a dependency, not a favor.

## Signals

- Do the copies change together every time, or have they drifted for good
  reasons?
- Does the proposed shared function take more than one or two behavior-switching
  flags? That is the wrong abstraction forming.
- Would inlining a struggling helper back into its callers make each one clearer
  to read?

## Boundaries

Some repetition is banned regardless of count: a security rule or a protocol
constant copied in two places is a bug waiting to diverge and belongs in one
named home. This skill governs logic and structure; for bare repeated literals
see magic-numbers, and for the mechanics of the extraction itself see
refactoring.
