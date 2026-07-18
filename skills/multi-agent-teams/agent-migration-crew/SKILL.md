---
name: agent-migration-crew
description: Run a team of migration agents that inventories the work, transforms each slice in isolation, verifies it, and merges under strict discipline. Use when a large mechanical change like a framework bump, an API rename, or a schema move spans many files and one agent would lose the thread or break main.
---

# Agent migration crew

Hand a whole migration to one agent and you get a giant uncommittable diff that
fails halfway and cannot be bisected. A crew cuts it into slices: one agent
catalogs the work, several transform isolated slices in parallel, one verifies
each, and one merges them one at a time so main never goes red. Isolation and
merge order are the entire game.

## Method

1. **Inventory agent catalogs every call site.** Scan for everything the
   migration touches: files, imports, schema references, config. Output
   `inventory.csv`: item, location, dependency order, blast radius, assigned
   slice. Nothing transforms before the inventory is complete, because a missed
   call site is a broken build later.
2. **Slice along dependency edges.** Group items into slices small enough to
   review in one sitting, ordered so no slice depends on one not yet merged. Leaf
   modules first, shared core last.
3. **Transformers work in isolated worktrees.** Fan out one agent per slice, each
   on its own git worktree touching only that slice's files. Load
   `backend-engineer-role`. Output a branch and a diff. Isolation is why two
   transformers never poison each other's context.
4. **Verifier gates each slice.** Load `qa-engineer-role`. Run the slice's tests
   plus a before-and-after behavior check, since a migration must preserve
   behavior, not merely compile. Output `verify-<slice>.md`: tests run, results,
   any output diff. A slice that changes behavior fails and routes back.
5. **Merge coordinator serializes integration.** Load `release-manager-role`.
   Merge verified slices one at a time in dependency order, rebasing each on the
   freshly merged main and re-running the suite before the next. Never merge two
   at once; that is how a green pair turns red together.
6. **Keep main releasable throughout.** Every merged slice leaves main building
   and passing. If a merge breaks main, revert it at once and send the slice back
   rather than stacking fixes on a broken base.

## Run it

In Claude Code, run the inventory agent first, then spawn transformer subagents
in a parallel batch, each in its own worktree so edits never collide. Run the
verifier per slice, then merge sequentially as orchestrator. Pass `inventory.csv`
and the per-slice verify files as shared artifacts. Terminate when every
inventory row is transformed, verified, and merged with main green, or when a
slice fails verify twice and escalates for a design fix. To port, use LangGraph
with a fan-out over slices and a sequential merge node, a CrewAI Crew with
parallel transform tasks and a gating verify task, or AutoGen agents coordinating
through a shared task list.

## Signals it works

- Main builds and passes after every single merge, not only at the end.
- Each transformer's diff touches only its slice's files from the inventory.
- Behavior verification, not just compilation, gates each slice.

## Boundaries

This crew handles mechanical migrations where the target state is known, not
redesigns where the new shape is still in question. It defers the cutover and any
data backfill to the team's release process, and it will not merge a slice a
human owner has not signed off when the change is irreversible.
