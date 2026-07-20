---
name: git-hooks-automation
description: Automate checks with git hooks that stay fast, with server-side enforcement and documented escape hatches. Use when setting up pre-commit checks or fixing hooks that developers routinely bypass.
---

# Git hooks automation

Hooks run checks automatically at git lifecycle points: catch problems
before they spread. The design tension is real: hooks must be fast
enough that developers do not bypass them, yet the important checks
must be enforced where bypass is impossible (the server), because
local hooks are advisory.

## Method

1. **Keep pre-commit checks under a few seconds.** Format,
   lint the changed files only, catch secrets and large
   files, and quick syntax checks (see linting-setup,
   code-formatting): fast enough that developers never
   resent them. Slow pre-commit hooks (full test suites,
   whole-repo lints) get bypassed with `--no-verify` within
   a week, and then they protect nothing.
2. **Run only what is relevant, incrementally.** A
   pre-commit framework runs each tool against only the
   staged files matching its type, in parallel: this is
   what keeps hooks fast as the repo grows. Whole-repo
   checks on every commit scale badly; scope to the change.
3. **Enforce the important things server-side.** Local
   hooks are advisory (bypassable, and not everyone
   installs them); the real gate is CI and branch
   protection (see branch-strategy, deployment-pipelines):
   tests, security scans, and required checks run there
   where they cannot be skipped. Local hooks catch issues
   early for the developer's benefit; CI catches them for
   the team's safety. Do not rely on local hooks for
   anything that must not slip through.
4. **Prevent the catastrophic-and-permanent.** The highest-
   value hooks stop things that are painful to undo:
   secrets committed (see secrets-scanning: a leaked key
   stays in history), large binaries (bloat the repo
   forever: see git-history-hygiene), and broken merge
   markers. These earn their place even in a fast hook
   because the cost of missing them is disproportionate.
5. **Make hook setup automatic and version-controlled.**
   Hooks live in the repo (a pre-commit config, or a hooks
   directory wired via `core.hooksPath`) and install with
   one command or automatically on setup (see
   onboarding-docs): hooks that require manual per-developer
   installation are hooks half the team never runs.
   Version them so everyone runs the same checks.
6. **Provide and monitor the escape hatch.** `--no-verify`
   exists for genuine emergencies (a hotfix while a hook is
   misbehaving); do not try to block it (you cannot, and
   trying breaks trust), but rely on server-side
   enforcement so a local bypass cannot ship the problem.
   Frequent bypassing is a signal the hooks are too slow or
   too noisy: fix the hooks, do not blame the developers.

## Boundaries

- Local hooks improve the developer loop; they are not a
  security or quality boundary (that is CI: see
  deployment-pipelines). Designing a control that assumes
  every developer's local hooks ran is designing on sand.
- Hook overhead has to justify itself; a check that rarely
  catches anything but slows every commit is a bad trade,
  move it to CI or drop it (see the alert-fatigue analogy
  in alerting-design).
- Server-side hooks (pre-receive) can enforce policy for
  real (reject non-conforming pushes) but add operational
  complexity and are platform-specific; branch protection
  rules cover most needs more simply (see branch-strategy).
