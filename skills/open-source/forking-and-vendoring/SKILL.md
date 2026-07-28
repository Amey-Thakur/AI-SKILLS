---
name: forking-and-vendoring
description: Decide between patching upstream, forking, and vendoring a dependency, and carry the ongoing cost knowingly. Use when a dependency needs a change you cannot get merged, or is unmaintained.
---

# Forking and vendoring

Every fork is a permanent maintenance commitment traded for immediate
control. The decision is rarely whether you can fork, which is always
yes, but whether you will still want to be maintaining it in two years.

## Method

1. **Try upstream first and time-box it.** A patch with tests and a
   clear rationale, with a decision point after a set wait. Most changes
   land if they are small and well argued (see contributor-onboarding).
2. **Prefer extension to modification.** Configuration, plugins, and
   wrappers survive upstream updates; a patched internal does not.
3. **Vendor when you need pinning, fork when you need divergence.**
   Vendoring copies a known version under your control; forking commits
   you to carrying changes forward against a moving upstream.
4. **Record why, in the tree.** A note explaining the divergence and the
   upstream state saves the next person weeks and prevents an accidental
   revert during an upgrade.
5. **Keep the diff small and rebasable.** The larger the divergence, the
   sooner merging upstream becomes impractical and the fork becomes
   permanent by default.
6. **Set a review date.** Check whether upstream fixed it, whether the
   fork is still needed, and whether abandoning your change is now the
   cheapest option.

## Boundaries

- Forking is a licence-permitted right and still a social act; a hostile
  fork has community consequences beyond the code (see
  project-governance).
- Vendored code inherits your security obligations, including patching
  it yourself when upstream does (see supply-chain-security).
- An unmaintained dependency is sometimes best replaced rather than
  adopted, since a fork makes you the maintainer.
