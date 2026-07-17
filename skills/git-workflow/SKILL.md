---
name: git-workflow
description: Use git safely and legibly: branches, history, merges, conflicts, and recovery. Use when managing branches, cleaning history, resolving conflicts, or undoing mistakes.
---

# Git workflow

History is a product for future readers. Keep it truthful, navigable, and
recoverable, and never make a destructive move without an exit.

## Method

1. **Branch per intention.** One branch, one purpose, named for it
   (fix-stale-cache, add-export-api). Branch from the current default
   branch unless told otherwise, and pull before branching so the work
   starts current.
2. **Commit in reviewable slices.** Each commit compiles and passes tests
   on its own; message subjects state the change in the imperative. Mixed
   concerns get split before pushing, because history is read per commit.
3. **Sync deliberately.** Prefer rebasing your unshared branch onto the
   updated base for linear history, or merge when the project convention
   says so; follow the house style. Never rebase or force-push commits
   others may have built on. When force is legitimate (your own feature
   branch after cleanup), use --force-with-lease so a teammate's surprise
   push survives.
4. **Resolve conflicts by intent, not by side.** For each conflict, answer
   what both changes were trying to do and produce the version that honors
   both, which is sometimes neither hunk verbatim. Build and test after
   resolving; a syntactically clean merge can still be semantically wrong.
   Never resolve by picking a side you do not understand.
5. **Recover calmly, in this order:** uncommitted mess: stash or checkout
   the file; wrong last commit: amend if unpushed, revert if pushed; lost
   work: reflog holds roughly everything from the last 90 days; wrong
   branch: cherry-pick the commits where they belong, then clean up.
   Revert beats reset on anything shared, because it preserves the record.
6. **Before any destructive command** (reset --hard, clean, force-push,
   branch -D), name what could be lost and check it is either saved or
   truly disposable. The thirty seconds of checking beats the afternoon of
   reflog archaeology.

## Rules

- Never commit secrets; once pushed, rotate the secret, since history
  removal alone is not containment.
- Do not rewrite public history without explicit agreement from everyone
  affected.
- Tags for releases, branches for work, stash for interruptions; the tool
  fits the job.
- When a repository has a convention (commit format, branch names, merge
  style), the convention wins over this document.
