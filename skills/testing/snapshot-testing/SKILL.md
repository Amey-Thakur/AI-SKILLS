---
name: snapshot-testing
description: Use snapshot tests for serialized output only, with disciplined review of every diff and hard limits on snapshot size. Use when pinning stable rendered output like markup or an API response shape.
---

# Snapshot testing

A snapshot test records a serialized output once and fails when it changes.
Used well, it pins a component's rendered markup or a response's shape
cheaply. Used badly, it becomes the worst kind of test: a giant blob nobody
reads, a diff approved with `--update` on reflex, a green check that asserts
only that today equals yesterday. The discipline is limiting what you
snapshot and treating every diff as a claim to verify.

## Method

1. **Snapshot serialized output, not behavior.** Snapshots fit stable
   serializable artifacts: rendered HTML, a JSON response, a formatter's
   output. For logic with a known expected value, write an explicit
   assertion, since a snapshot there only hides the intent.
2. **Keep each snapshot small enough to read.** Cap it at what a reviewer
   will actually scan, roughly a screen. Snapshot one component, not a whole
   page tree. A thousand-line snapshot gets rubber-stamped, which defeats the
   test.
3. **Review every diff as a real change.** A snapshot diff is the test asking
   whether you meant to change this. Read it, confirm the change is intended,
   and only then update. Update-all in a hook or CI turns the test into a
   rubber stamp.
4. **Strip nondeterminism before serializing.** Replace timestamps, UUIDs,
   and random ids with property matchers like `expect.any(String)` or stable
   fixtures. A snapshot that changes every run trains people to ignore its
   diffs.
5. **Store snapshots as reviewed source.** Commit them, read them in the pull
   request like code, and never let a snapshot land unseen. A snapshot nobody
   looked at is a recorded output, not an assertion.
6. **Prefer inline snapshots for small values.** Keep short snapshots inline
   with the test using `toMatchInlineSnapshot` so the expected output sits
   next to the code, not in a distant `.snap` file the reader never opens.

## Litmus tests

- Could a reviewer read this snapshot's diff and judge whether the change was
  intended?
- Does the snapshot exclude every value that varies between runs?
- Is anything asserted here by snapshot that a three-line explicit assertion
  would state more clearly?

## Boundaries

Snapshots pin serialized output, they do not verify logic or catch behavior a
human never reviews: for value assertions use unit-test-design, and for large
legacy outputs use golden-master with its own diff workflow. Follow the
framework's snapshot format, Jest, Vitest, or insta, over the specifics here.
