---
name: exploratory-testing
description: Run structured unscripted testing with charters, tours, and timeboxed sessions to find bugs scripted tests never imagined. Use when probing a new or risky feature for problems no one thought to write a test for.
---

# Exploratory testing

Scripted tests only check what someone already thought to write down. The
bugs that reach users live in the gaps: the odd sequence, the pasted input,
the feature interaction nobody spec'd. Exploratory testing is deliberate
learning while testing, structured enough to be accountable and repeatable,
loose enough to chase a hunch the moment it appears.

## Method

1. **Write a charter before you start.** State the mission in one sentence:
   "Explore checkout with expired and stacked coupons to find pricing
   errors." The charter bounds the session and makes it reviewable later,
   unlike aimless clicking.
2. **Timebox the session.** Commit to a fixed block, typically 60 to 90
   minutes, focused on that one charter. The clock forces prioritization and
   keeps a session from sprawling into an unaccountable afternoon.
3. **Pick a tour to shape the exploration.** Follow a theme: a money tour
   touches every price and currency path, a data tour pushes values through
   create-read-update-delete, an interruption tour kills the network or hits
   back mid-flow. Tours turn wandering into coverage.
4. **Vary inputs deliberately.** Attack boundaries and the unexpected: empty,
   maximum length, negative, Unicode, emoji, a pasted spreadsheet cell, a
   double-clicked submit, the browser back button after payment. Bugs cluster
   where inputs were never anticipated.
5. **Take notes as you go.** Record what you did, what you saw, and what you
   want to revisit, tagged as bug, question, or idea. Session-based test
   management calls this the session sheet; it is the evidence the session
   happened and what it covered.
6. **Capture reproduction the instant you find a bug.** Note exact steps,
   inputs, and environment while they are fresh, with a screenshot or
   recording. A bug you cannot reproduce is a rumor, and memory decays within
   minutes of moving on.
7. **Debrief and convert findings.** After the session, review notes with the
   team, file the confirmed bugs, and turn each reproducible one into a
   scripted regression test so it never returns unnoticed.

## Signals

- Could someone read your charter and session notes and understand exactly
  what was covered and what was skipped?
- Did the session produce reproducible bug reports, not just a vague "seemed
  flaky"?
- Are the confirmed findings on their way to becoming automated regression
  tests?

## Boundaries

Exploratory testing finds unknown unknowns; it does not replace a regression
suite, which cheaply guards behavior you already understand. Feed its
discoveries into unit-test-design and bdd-scenarios. Its value depends on
tester judgment and domain knowledge, so it resists full automation by
design.
