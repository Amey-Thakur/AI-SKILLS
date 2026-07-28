---
name: actions-security
description: Prevent workflow automation from becoming an attack path, through pinned actions, scoped tokens, and careful handling of untrusted input. Use when workflows handle secrets or run on pull requests from forks.
---

# Actions security

CI runs with credentials and executes code from the repository, which
makes it an attractive target. The dangerous configurations are workflows
triggered by outside contributions that also have access to secrets.

## Method

1. **Never expose secrets to fork pull requests.** The trigger that
   grants a token to untrusted code is the central risk, and any
   workflow needing secrets should not run on unreviewed forks.
2. **Treat pull request content as untrusted input.** Titles, branch
   names, and body text interpolated into shell commands are an
   injection path, so they belong in environment variables rather than
   inline (see input-validation).
3. **Pin third-party actions to a full commit hash.** Tags are mutable,
   and an action you trusted can change under you (see
   supply-chain-security).
4. **Scope the workflow token minimally.** Read-only by default with
   write permissions granted per job that needs them.
5. **Keep secrets out of logs.** Masking helps and is not complete, so
   avoid echoing anything derived from a secret (see
   secrets-management).
6. **Require approval for first-time contributors.** Manual approval
   before workflows run on a new contributor's pull request is a cheap
   and effective control.
7. **Review workflow changes as security changes.** A pull request
   editing a workflow can exfiltrate secrets, and it deserves the same
   scrutiny as a change to authentication code.

## Boundaries

These controls reduce exposure; a compromised maintainer account
bypasses all of them. Self-hosted runners have a substantially larger
attack surface and should not run untrusted code. Third-party actions
are dependencies with the same trust implications as any other.
