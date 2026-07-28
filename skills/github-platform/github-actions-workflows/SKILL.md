---
name: github-actions-workflows
description: Write CI workflows that are fast, readable, and cheap, with the right triggers, caching, and matrix strategy. Use when setting up or fixing automation on a repository.
---

# GitHub Actions workflows

A workflow is code that runs on every change, and it degrades the same
way code does: slow, flaky, and full of steps nobody understands.
Keeping it fast and comprehensible is what keeps people running it
rather than routing around it.

## Method

1. **Trigger on what you actually need.** Push to the default branch and
   pull requests covers most cases; triggering on everything burns
   minutes and produces duplicate runs on the same commit.
2. **Filter by path where the repository is mixed.** Documentation
   changes should not run the full test suite, and path filters are the
   cheapest speed improvement available.
3. **Cache dependencies deliberately.** A correct cache key including
   the lockfile hash saves most of the run time, and a wrong one serves
   stale dependencies silently.
4. **Use a matrix for genuine variation.** Operating systems and
   language versions you support, not every combination that exists,
   since the matrix multiplies cost.
5. **Fail fast on cheap checks.** Lint and type checks before the long
   test suite, so an obvious error returns in a minute rather than
   twenty (see continuous-integration).
6. **Pin actions to a commit, not a tag.** A tag can be moved, which
   makes it an unpinned dependency in a privileged context (see
   actions-security).
7. **Keep workflows readable.** Named steps, extracted scripts, and
   reusable workflows for shared logic, because a wall of inline shell
   is unmaintainable.

## Boundaries

Workflows automate checks; they do not replace review judgement. Runner
minutes and concurrency are billed and limited, so cost is a real
constraint at scale. Complex build logic belongs in scripts the
repository can run locally rather than embedded in the workflow.
