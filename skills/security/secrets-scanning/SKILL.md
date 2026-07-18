---
name: secrets-scanning
description: Scan commit history and CI for leaked credentials and rotate on every hit, because a pushed secret is already compromised. Use when hardening a repo against committed keys or responding to a suspected leak.
---

# Secrets scanning

A committed secret is compromised the moment it is pushed, and git history keeps
it long after you delete the line. Scanning finds the leak; rotation is the only
thing that closes it. Confuse the two, delete the line and move on, and you have
left a working key in every clone.

## Method

1. **Stop secrets before the commit lands.** Install a pre-commit hook (`gitleaks
   protect`, `detect-secrets`) so a key never reaches history at all. This is the
   only fully preventive control, and it is far cheaper than any cleanup after
   the push.
2. **Scan the whole history, not just the tip.** Run `gitleaks detect` or
   trufflehog across every commit and every branch. A secret rotated at HEAD is
   still live in the old commit a fork or a stale clone happily keeps.
3. **Gate CI on newly added secrets.** Add a scanner step that fails the pipeline
   when a pull request introduces a match. Feed it the provider rulesets (AWS,
   GCP, Stripe, Slack, private keys) plus high-entropy detection for the ones no
   rule names.
4. **Treat every hit as live and rotate first.** The order does not change:
   revoke the exposed credential at the provider, issue a replacement, deploy it,
   then remove the string. Deleting the commit without revoking leaves a valid
   key out there for anyone who already pulled.
5. **Do not mistake history rewriting for remediation.** `git filter-repo` or BFG
   can scrub the secret from history, but assume it was harvested the second it
   landed. Rewriting is cleanup; rotation is the fix, and the two are not
   interchangeable.
6. **Tune false positives with a documented allowlist.** Give example keys, test
   fixtures, and public keys an allowlist entry with a reason, so the scanner
   keeps blocking real leaks instead of being switched off for crying wolf.
7. **Move rotated secrets into a manager.** Store them in Vault, AWS Secrets
   Manager, or the CI secret store and inject at runtime. A secret that exists
   only in the runtime environment cannot be committed by accident tomorrow.

## Checks

- Does a fresh clone plus a full-history scan come back clean on every branch?
- When a key leaks, is it revoked at the provider inside the hour, not merely
  deleted from the file?
- Are CI secrets injected at runtime, with none of them present in the repo or
  the built image?

## Boundaries

Scanning finds string-shaped secrets and misses credentials passed by other
means; it also cannot judge whether a given match is truly sensitive. Storage
and rotation mechanics overlap secrets-management, but detection and the
rotate-on-hit response are this skill's job.
