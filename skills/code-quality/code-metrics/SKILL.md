---
name: code-metrics
description: Read code metrics as smoke that points at where to look, not as verdicts that rank code good or bad. Use when triaging a large codebase for refactoring targets or reviewing metric-gated quality checks.
---

# Code metrics

A metric is an instrument, not a judge. Cyclomatic complexity, churn, and
coverage each measure one narrow thing, and treating any as a target invites
gaming: developers split functions to dodge a threshold without making the code
clearer. Used well, metrics answer "where do I look first?" across code too large
to read. Used badly, they become a quota that punishes honest code.

## Method

1. **Rank hotspots by churn times complexity, not either alone.** A complex file
   nobody edits is dormant; a simple file edited daily is fine. The product finds
   files that are both hard to grasp and constantly changing. `code-maat` and
   `git-of-theseus` compute this from git history.
2. **Read complexity as a prompt to inspect, then open the file.** A cyclomatic
   score of 30 from `radon`, `lizard`, or `gocyclo` means "go read this," not
   "this is broken." Some dense functions are correct; some tiny ones hide bugs.
3. **Trend metrics over time, not against an absolute.** Track whether a module's
   complexity and churn rise or fall release over release. Direction of travel
   tells you more than a snapshot measured against an arbitrary bar.
4. **Never gate a merge on a single number.** A hard "coverage must be 80%"
   rewards tests of trivial getters and punishes hard-to-test glue. Let metrics
   flag code for review, and let a person make the call.
5. **Cross-check metrics against defect and incident history.** Overlay the files
   that show up in bug fixes and postmortems onto your hotspot list. Where they
   agree you have a real target; where a metric fires alone, stay skeptical.
6. **Report with context, never as a leaderboard.** Say "these three files are
   high-churn, high-complexity, and appear in recent incidents" rather than
   ranking authors or files by score. The number opens a conversation, not closes it.

## Litmus tests

- For any flagged file, can you explain in words why it deserves attention?
- Would the metric survive being made a target, or get gamed within a sprint?
- Do the files it flags overlap with the files that actually cause incidents?

## Boundaries

Metrics inform prioritization; they do not settle correctness or design quality,
which need a person reading the code. Defer thresholds to team agreement, and
remember that a codebase's real problems, bad abstractions and unclear ownership,
often leave no numeric trace at all.
