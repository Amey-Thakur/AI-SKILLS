---
name: code-review-comments
description: Write review comments that land by labeling severity and separating genuine questions from directives. Use when leaving comments on a pull request or coaching someone on how theirs read.
---

# Code review comments

A review comment interrupts a person mid-flow. It lands when the author can
tell in one read how much it matters and what to do next. Comments that bury
a blocker among nitpicks, or dress a firm objection as a coy question, waste
both people's time and stall the merge.

## Method

1. **Label severity up front.** Prefix each comment: `blocking:`, `nit:`,
   `question:`, `praise:`, following a convention like Conventional
   Comments. The author triages a 30-comment review in seconds when severity
   is explicit, and guesses wrong when it is not.
2. **Separate directives from questions honestly.** If a change must happen,
   say so: "blocking: this leaks the DB connection on the error path." If you
   are genuinely unsure, ask a real question and mean it. A rhetorical "did
   you consider...?" that actually demands a change reads as passive.
3. **Say why, and show how where it is cheap.** "This N+1 fires one query
   per row; batch it with a single `WHERE id IN (...)`" beats "inefficient."
   The reason lets the author generalize; a GitHub suggestion block lets them
   accept the fix in one click.
4. **Comment on the code, never the coder.** "This function does three
   things," not "you always over-scope." Keep it to the diff in front of you;
   opinions about someone's habits belong in a private conversation.
5. **Cap the nits, or automate them.** More than a few `nit:` on style means
   a linter rule is missing. Push spacing, import order, and naming casing
   into `prettier`, `eslint`, or `ruff` so review spends on logic.
6. **Reach a verdict.** Do not leave a review in limbo with ten comments and
   no decision. If nothing blocks, approve and trust the author with the
   nits. Reserve "request changes" for real blockers.

## Litmus tests

- Can the author sort your comments into "must fix now" and "later" without
  asking you?
- Does each blocking comment state a concrete failure, not a preference?
- Would you say the comment out loud, in these words, to the author's face?

## Boundaries

Team norms on approval gates and required reviewers override personal style:
follow the repo's `CODEOWNERS` and review policy. A design disagreement too
large for a line comment belongs in a call or a design doc, not a buried
thread.
