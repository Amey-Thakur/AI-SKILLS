---
name: approval-testing
description: Assert hard-to-specify output by reviewing a human-readable snapshot once, approving it, then failing on any later diff. Use when the correct result is easy to recognize but tedious to write as explicit assertions.
---

# Approval testing

Some outputs resist hand-written assertions: a rendered invoice, a generated
SQL query, a serialized object graph, an ASCII report. Spelling out every
field in `assertEquals` is brittle to write and unreadable afterward.
Approval testing inverts the flow: the code prints its result, a human reads
it once and approves it, and the framework guards that approved value from
then on.

## Method

1. **Emit output in a stable, diffable format.** Serialize to sorted JSON,
   pretty-printed text, or a canonical string. Unstable key order or trailing
   whitespace turns every run into a false diff, so normalize before you
   write.
2. **Split into received and approved files.** The run writes
   `invoice.received.txt`; the test compares it to `invoice.approved.txt`.
   A missing or mismatched approved file fails the test. Tools like
   ApprovalTests, Verify, syrupy, or insta manage this pair for you.
3. **Review the received file like a pull request.** Read it line by line and
   decide whether every value is correct. This review is the actual
   assertion; skimming it defeats the method. Wrong output you approve is
   wrong output you have now locked in.
4. **Approve by promoting received to approved.** Rename or run the approve
   command, then commit the approved file. It now lives in version control as
   the reviewed specification of the output.
5. **Wire a readable diff reporter.** Configure the framework to open a diff
   viewer on mismatch so the change is obvious at a glance. A wall of "line
   417 differs" trains people to re-approve blindly.
6. **Scrub nondeterminism before comparison.** Replace timestamps, GUIDs,
   temp paths, and random ids with fixed sentinel values. Anything that changes
   run to run must be masked, or the approval never stabilizes.
7. **Review approved-file changes in code review.** A diff to an `.approved`
   file in a pull request is a behavior change. Treat an unexplained one as a
   red flag, the same as a suspicious source edit.

## Litmus tests

- When output changes, does the diff show a human exactly what moved and let
  them accept or reject it in seconds?
- Is every run's received file byte-identical given the same input, with all
  volatile values masked?
- Would a reviewer notice an incorrect value slipping into an approved file
  during code review?

## Boundaries

Approval testing shines when output is large and recognition is easy; for a
rule expressible in one line, a plain assertion is clearer and defer to
unit-test-design. For screenshots specifically, use visual-regression-testing,
which handles image thresholds this text-oriented method cannot.
