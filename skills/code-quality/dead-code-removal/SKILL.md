---
name: dead-code-removal
description: Find code that can never run and delete it without breaking a caller you missed. Use when pruning unused functions, branches, feature flags, or files.
---

# Dead code removal

Unused code is not free: it is read during every search, dragged along in every
refactor, and trusted during every audit, all for logic that never executes.
The risk is deleting something that only looks dead, so removal is a
verification job before it is a deletion job.

## Method

1. **Confirm no reference before touching a symbol.** Grep the whole tree, not
   just the current package: `grep -rn "functionName" .`. Include tests,
   config, string-based lookups, and reflection or dependency-injection names
   that a symbol search misses. Zero hits across all of these is the bar.
2. **Read a coverage report to find never-run lines.** Run the suite under
   coverage (`coverage.py`, `c8`, `go test -cover`) and look for functions and
   branches sitting at 0 percent. Coverage flags candidates; it does not prove
   death, since untested is not the same as unreachable. Pair it with grep.
3. **Check exported and dynamic surfaces harder.** A public export, a route
   handler, a serialized class name, or a plugin entry can be called by code you
   do not own. For these, search callers outside the repo, or deprecate for one
   release and watch the logs before deleting.
4. **Clear feature-flag residue once a flag is settled.** When a flag has been
   fully on or off for good, delete the dead branch, inline the live one, then
   remove the flag definition and its config keys. Leaving `if (flags.newFlow)`
   after the rollout finished breeds paths no one tests.
5. **Delete, do not comment out.** Version control holds the history; a
   commented-out block just becomes code that searches still match and no test
   covers. Remove it cleanly and let `git log` be the archive.
6. **Delete in small, reversible commits and let CI referee.** One symbol or one
   flag per commit, with the full test and build run each time. If something
   only looked dead, a red build or a `git bisect` points straight at the change
   that removed it.

## Signals

- Does `grep -rn` across the entire repo, tests and config included, return zero
  uses of the symbol?
- Is the line at 0 percent coverage because it cannot run, or only because no
  test exercises it yet?
- After removing a flag, does any config file, dashboard, or deploy script still
  name it?

## Boundaries

Public library APIs are not dead just because this repo does not call them:
consumers you cannot see may, so follow a deprecation cycle instead of deleting
outright. Reflection-heavy or plugin-based code, where usage is invisible to
static search, defers to a human who knows the runtime wiring.
