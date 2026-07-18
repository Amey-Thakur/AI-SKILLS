---
name: style-guides
description: Write a code style guide people actually follow by deciding once, automating enforcement, and logging exceptions. Use when style debates recur in review or a new guide is being drafted.
---

# Style guides

A style guide exists to end arguments, not to start them. Most guides fail
the same way: they list opinions no tool checks, so compliance depends on
whoever reviews the pull request that day, and the debates the guide was
meant to settle come back one comment thread at a time.

## Method

1. **Write only rules a machine can enforce.** Before adding a rule, name the
   tool and config that will check it: a `.prettierrc` line, an ESLint rule id,
   a `ruff` code. A rule no linter can flag is a preference, and preferences
   belong in mentoring, not in a document people are told to obey.
2. **Adopt a standard instead of inventing one.** Reach for Black, gofmt,
   Prettier, or `ruff format` and take their defaults whole. The point of a
   formatter is that no one owns the decision: tabs versus spaces stops being
   your opinion and becomes the tool's output. Bikeshedding dies when there is
   nothing left to paint.
3. **Decide once and record why.** For each genuine choice (naming, error
   wrapping, import order), write one line of rationale next to the rule. When
   someone reopens it in six months, the answer is a link, not a re-argument.
4. **Enforce in CI and pre-commit, not in review.** Run the formatter and
   linter as a pre-commit hook and as a required CI check that blocks merge.
   Humans review logic; machines review style. A reviewer typing "nit: spacing"
   is a broken pipeline, not a diligent colleague.
5. **Format the whole repo in one commit, then bisect around it.** Land the
   initial reformat as a single isolated commit and add its hash to
   `.git-blame-ignore-revs` so it never pollutes `git blame`. Mixing a reformat
   into feature commits buries every real change.
6. **Allow exceptions, but make them cost a line.** Permit inline overrides
   (`// eslint-disable-next-line`, `# noqa`) only with a trailing reason, and
   grep for them in review. An exceptions log kept this way shows which rules
   fight reality and should be loosened.
7. **Change the guide by pull request.** The guide is code: edits go through
   review, land with the enforcing config in the same commit, and take effect
   for everyone at once. A rule that changes by hallway consensus binds no one.

## Checks

- Pick a random rule: can you point at the exact tool and config that enforces
  it? If not, delete it or automate it.
- Does a fresh clone pass style checks with one command, no manual steps?
- When someone questions a rule, is the answer a recorded rationale, not a
  fresh debate?

## Boundaries

This covers style: formatting, naming, and mechanical consistency. It does not
settle architecture or API shape, which need human judgment and design review.
Where a language has a dominant community standard, adopt it over anything
bespoke; consistency with the wider ecosystem outranks local taste.
