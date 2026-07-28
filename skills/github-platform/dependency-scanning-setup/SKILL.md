---
name: dependency-scanning-setup
description: Configure automated dependency and vulnerability scanning at a cadence people will actually act on. Use when dependencies drift or vulnerabilities go unnoticed.
---

# Dependency scanning setup

Automated dependency updates solve a real problem and create another:
a flood of pull requests nobody merges. The configuration that works
groups updates, runs on a survivable cadence, and separates security
alerts from routine bumps.

## Method

1. **Separate security alerts from version updates.** Vulnerability
   notifications should be rare and actionable; routine bumps are
   maintenance and should not compete with them.
2. **Group updates into one pull request per ecosystem.** Ten separate
   bumps is ten reviews and ten CI runs for one decision.
3. **Choose a cadence the team can absorb.** Monthly grouped updates get
   merged; weekly per-dependency updates get ignored, and an ignored
   update process is worse than none.
4. **Exclude major versions from automation.** Breaking changes need
   migration work and block a whole batch when included (see
   semantic-versioning).
5. **Require CI to pass before merge.** An automated update that breaks
   the build must not be mergeable, which makes the test suite the real
   gate.
6. **Assign an owner for the update queue.** Unowned automation
   accumulates, and someone must be accountable for merging or closing.
7. **Review the configuration when the noise returns.** Rising unmerged
   counts mean the cadence or grouping is wrong rather than the team
   being lax.

## Boundaries

Scanning finds known vulnerabilities in declared dependencies; vendored
and transitive code may be missed (see supply-chain-security). A
vulnerability alert is not always exploitable in your usage, which needs
assessment rather than reflexive upgrading. Automation cannot judge
whether an update is safe beyond what tests cover.
