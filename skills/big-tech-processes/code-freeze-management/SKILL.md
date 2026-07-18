---
name: code-freeze-management
description: Manage a code freeze with a scoped declaration, risk-classed changes, a fast exception process, and a planned thaw. Use when you need to stabilize a codebase ahead of a release, a holiday peak, or a high-stakes event without halting all work.
---

# Code freeze management

A code freeze pauses non-essential changes so a codebase can stabilize before a
moment where a regression is expensive: a major release, retail peak, or a
conference demo. It buys stability by spending velocity, and it goes wrong two
ways. Too loose, and it is a freeze nobody honors; too rigid, and it blocks the
one urgent bug fix while shipping nothing safer. The craft is a scoped freeze
with a clear exception path and a deliberate exit.

## Method

1. **Declare scope and dates precisely.** State which branches and services are
   frozen, the exact start and end, and the reason. "Freeze everything" that no
   one believes does less than a narrow freeze people actually respect, because a
   rule ignored teaches everyone the next one is optional too.
2. **Classify changes by risk, not by how loudly the author wants it.** Publish
   three buckets: allowed freely (docs, tests, code behind an off flag), allowed
   with approval (customer-blocking bug fix), and blocked (refactors, dependency
   bumps, new features). Clear classes let people self-triage instead of asking.
3. **Run a fast exception process with a named freeze owner.** An exception
   request states the change, the risk of shipping it, the risk of withholding it,
   the blast radius, and the rollback. The owner or a small change-advisory board
   answers in minutes; a committee that takes days defeats the point.
4. **Require every exception to be reversible.** During a freeze the bar is
   turn-off-ability: a change behind a flag you can disable without a deploy is far
   cheaper to allow than one that needs a rollback to undo. Reversibility, not
   size, is what makes a freeze-time change safe.
5. **Keep the pipeline hot.** Merges to the release line may pause, but keep
   building, testing, and staging everything else. A freeze that also stops CI
   just dams up a hundred untested changes that all land at once on thaw, turning
   a small risk into a big bang.
6. **Plan the thaw before the freeze ends.** Decide the order changes merge back,
   who confirms staging is clean, and a soak window before the next risky change.
   An abrupt thaw at 5 p.m. on Friday throws away the stability the freeze just
   bought.
7. **Communicate daily and end it explicitly.** Announce the start, send daily
   reminders, and post an unambiguous "thawed" message. A fuzzy ending leaves half
   the team still frozen and half already shipping into each other.

## Signals

- Can an engineer read the risk classes and decide their own change without asking
  the freeze owner?
- Does every granted exception have a flag or a one-step revert?
- Is there a written thaw order, or does everything merge back the instant the
  clock runs out?

## Boundaries

A freeze trades speed for safety, so justify it with a real event rather than
reflex. It is not a substitute for a strong test suite or progressive delivery:
teams with solid canary analysis and instant rollback need shorter and rarer
freezes. Follow your org's change-management convention for approval authority and
records.
