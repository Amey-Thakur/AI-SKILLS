---
name: commit-messages
description: Write commit messages that explain change and intent so history stays useful. Use when committing work or asked to draft a commit message for a diff.
---

# Commit messages

A commit message is documentation with a captive audience: everyone who ever
runs `git blame` on this line. Write for the person debugging at 2 a.m. two
years from now.

## Method

1. **One change per commit.** If the diff mixes a bug fix with a rename and
   a formatting pass, split it before writing anything. A message cannot be
   honest about three changes at once.
2. **Subject line: imperative, ≤ 50 characters, no trailing period.**
   "Fix stale cache on user switch", not "Fixed some caching issues". The
   test: the subject completes the sentence *"If applied, this commit will
   …"*.
3. **Body: the why, not the what.** The diff already shows what changed.
   The body carries what the diff cannot: why this approach, what else was
   tried, what breaks without it, which trade-off was accepted. Wrap at 72
   characters. A one-line body beats a missing one: "Without this, deleting
   a notebook left its documents in search results."
4. **Reference, don't recount.** Link the issue or incident instead of
   restating it; state behavior instead of narrating your afternoon.
5. **Never write these subjects:** "fix", "wip", "updates", "address
   comments", "more changes". Each is a hole in history exactly where
   someone will need a rope.

## Litmus tests

- Could a reviewer decide whether to cherry-pick this commit onto a release
  branch from the message alone?
- Does the message still make sense with no access to the pull request, the
  chat thread, or you?
- If this commit causes a regression, does the message give the person
  reverting it enough context to know what they are giving up?

## Boundaries

Follow the repository's existing convention when one exists (Conventional
Commits prefixes, issue-tag prefixes, co-author trailers): consistency in a
shared history outranks personal taste. This skill governs the content;
the project governs the shape.
