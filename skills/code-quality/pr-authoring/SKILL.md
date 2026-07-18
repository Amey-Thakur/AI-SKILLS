---
name: pr-authoring
description: Shape pull requests a reviewer can actually hold in their head, through small size, a why-first description, and a self-review pass. Use when opening a pull request or preparing a change for review.
---

# PR authoring

A pull request is a request for someone else's attention and judgment. A
reviewer holds a small change well and skims a large one, so a 1000-line PR
collects a rubber stamp exactly where it most needs scrutiny. Shape the PR
so a careful reader can keep the whole change in their head.

## Method

1. **Keep it under 400 lines of diff.** Defect detection falls off a cliff
   past a few hundred changed lines. If the work is bigger, split it: a
   refactor PR, then the feature PR stacked on top. Two readable PRs beat one
   boulder.
2. **Lead the description with why, then what.** First paragraph: the problem
   and the approach. Then the notable decisions and trade-offs. Link the
   issue for backstory rather than making the reviewer reconstruct intent
   from the diff.
3. **Do the first review yourself.** Before requesting anyone, read your own
   diff top to bottom in the PR view. That is where you catch the stray
   `console.log`, the commented-out block, the file you did not mean to
   touch. Fix them so the reviewer spends on logic.
4. **Annotate the non-obvious inline.** Leave author comments where a choice
   looks odd: "kept the loop instead of `map` because it short-circuits."
   Steer the reviewer past questions you can already answer.
5. **Separate mechanical commits from meaningful ones.** A pure rename or
   format pass in its own commit lets the reviewer skim it and focus on the
   behavior commit. A mixed commit forces line-by-line reading of noise.
6. **Green the checks before requesting review.** CI passing, tests added,
   lint clean. A red PR says "not ready" and burns a review cycle.
   Requesting review is a claim that you believe it is mergeable.

## Checks

- Is the diff small enough that a reviewer can read every line in one
  sitting?
- Does the description answer why before what?
- Did your own pass catch anything the reviewer should not have had to?

## Boundaries

Large mechanical migrations (a codemod, a dependency bump touching many
files) are legitimately big: flag them as such and point reviewers at the
few files that need real eyes. Defer to the team's PR template and merge
policy where one exists.
