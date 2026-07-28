---
name: branch-protection
description: Configure rules that stop unreviewed or broken code reaching the default branch, without making routine work impossible. Use when setting up a shared repository or after an incident traced to a direct push.
---

# Branch protection

Protection rules encode what must be true before code lands. The
failure modes are opposite: too little and anything merges, too much and
people route around the process or the repository stalls waiting for
reviewers who do not exist.

## Method

1. **Require pull requests to the default branch.** Direct pushes bypass
   every other control, and this single rule is the foundation.
2. **Require the checks that actually matter.** Tests, lint, and build,
   marked required so a red run blocks merge (see
   github-actions-workflows).
3. **Set review requirements to match the team.** One reviewer is
   meaningful; two on a three-person team means work stops when someone
   is away.
4. **Require branches to be current before merge.** It prevents the
   passing-check-but-broken-main case where two compatible changes
   conflict semantically.
5. **Route review by ownership.** Requiring review from the owning team
   for their paths puts the change in front of the people who
   understand it (see code-owners).
6. **Dismiss stale approvals on new commits.** An approval of an earlier
   version is not an approval of what will merge.
7. **Decide the emergency path in advance.** Who can bypass, how it is
   recorded, and what review happens afterwards, because an
   unconsidered bypass path becomes the normal one (see
   incident-response).

## Boundaries

Protection enforces process rather than quality; required checks that
test nothing provide false assurance. Administrators can usually bypass
rules, so protection is a guardrail rather than a control against a
determined insider. Excessive requirements on a small team cause more
harm than they prevent.
