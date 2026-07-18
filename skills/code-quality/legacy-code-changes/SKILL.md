---
name: legacy-code-changes
description: Change untested legacy code safely using characterization tests, seams, and the sprout method. Use when you must modify code that has no tests and you cannot prove your change is harmless.
---

# Legacy code changes

Legacy code is code without tests, so you cannot change it and know you did
no harm. The instinct to rewrite is usually a trap: the safe path is to pin
the current behavior first, then make the smallest possible cut. Michael
Feathers named these moves, and they still hold.

## Method

1. **Characterize before you change.** Write tests that capture what the code
   does now, not what it should do. Feed it real inputs and assert the actual
   outputs, including the ugly ones. These tests document reality and turn a
   silent behavior change into a red bar.
2. **Find a seam to test at.** A seam is a place you can alter behavior
   without editing the code in question: a function argument, a subclass
   override, an injected dependency. Break a hidden `new Clock()` or global
   read into a parameter so the code becomes testable at all.
3. **Sprout new code, do not edit in place.** Write the new behavior in a
   fresh, fully tested method or class, then call it from one line in the old
   code. The tangle stays untouched while your addition is clean and covered.
4. **Wrap when new work must bracket the old path.** If behavior must happen
   before or after existing logic, rename the old method and have a new
   method of the old name call the original plus your addition. The old body
   moves unchanged.
5. **Cut the smallest hole.** Change the fewest lines that close the ticket.
   Every extra line touched in untested code is a bet with no test to
   collect on. Resist tidying the surrounding mess in this change.
6. **Bank the tests as coverage.** Keep the characterization tests after the
   change. They are now the safety net the next person lacked, converting
   this file from legacy to merely old.

## Signals

- If your change altered behavior by accident, would a characterization test
  go red?
- Did the new logic land in a tested unit rather than deep inside the
  untested block?
- Is the diff the minimum that closes the ticket?

## Boundaries

When a module is small, dead, or slated for deletion, a full characterization
suite can cost more than a careful rewrite: use judgment. This skill covers
making one change safely, not deciding whether to retire the system. For
staged replacement of a whole system, see strangler-fig.
