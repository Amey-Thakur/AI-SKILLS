---
name: todo-hygiene
description: Keep TODO comments actionable by requiring an owner, a ticket, and an expiry, or deleting them. Use when writing, reviewing, or sweeping in-code TODO, FIXME, and HACK markers.
---

# TODO hygiene

A TODO is a promise the code makes to itself, and most are never kept. They
rot into archaeology that no one dares delete and no one acts on. A TODO
earns its place only when it names who owns it, which ticket tracks it, and
when it expires.

## Method

1. **Require a triple on every TODO:** owner, ticket, expiry date. Format it
   so it reads at a glance: `TODO(asmith, PROJ-4821, 2026-09-01): drop the
   v1 fallback once all clients ship`. A bare `// TODO: fix this` gets
   resolved or deleted in the same change, never merged.
2. **Delete instead of deferring when the fix is small.** Ask whether the
   work is cheaper than the comment plus the ticket plus every future
   reread. Often it is: resolve it now and write no marker at all.
3. **Grade by marker word.** `TODO` for deferred work, `FIXME` for
   known-broken code, `HACK` for deliberate ugliness with a stated reason.
   Do not invent a fourth. A mixed vocabulary makes `grep` useless.
4. **Point to a tracked item, not your memory.** Every TODO that survives
   review links to an issue with an owner and a backlog slot. Comment-only
   TODOs are invisible to planning and outlive whoever wrote them.
5. **Sweep on a schedule.** Run `grep -rn "TODO\|FIXME\|HACK" src/` as a
   monthly chore or a CI report. Any marker past its expiry date fails the
   check: resolve it, re-date it with a reason, or delete it.
6. **Never park a security or data-loss issue in a TODO.** Those become a
   tracked ticket immediately or get fixed in the branch. A code comment is
   not an incident response.

## Checks

- Does every TODO in the diff name an owner, a ticket, and a date?
- Can you `grep` one marker word and find every deferred item of that kind?
- Would the oldest TODO in the file survive you reading it aloud to the
  person named as its owner?

## Boundaries

Where a linter already enforces a format (ESLint `no-warning-comments`, a
custom Semgrep rule), match its shape instead of imposing this one:
consistency beats preference. Throwaway spikes and prototypes that will
never merge are exempt.
