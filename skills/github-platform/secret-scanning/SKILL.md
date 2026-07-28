---
name: secret-scanning
description: Detect committed credentials, respond correctly when one is found, and prevent the next one. Use when setting up a repository or after a credential appears in history.
---

# Secret scanning

A credential in a repository is compromised the moment it is pushed,
whether or not anyone noticed. The response that matters is rotation,
because removing it from history does not un-publish it.

## Method

1. **Enable scanning on push and on history.** Detection at push time
   prevents the commit; historical scanning finds what is already there.
2. **Rotate first, always.** Revoke and reissue the credential before
   anything else, since it must be assumed captured (see
   secrets-management).
3. **Then remove it from history if warranted.** Rewriting history is
   disruptive and does not undo exposure, so it is cleanup rather than
   remediation.
4. **Assume public means indexed.** Public repository credentials are
   scraped within minutes by automated tools, so speed of rotation is
   the whole response.
5. **Prevent with pre-commit hooks.** Local detection before the push
   catches most accidents at the cheapest point (see
   git-hooks-automation).
6. **Remove the reason to commit secrets.** Environment variables and a
   secret manager with a smooth local workflow, because friction is why
   people paste keys into files.
7. **Investigate what the credential could reach.** Rotation closes the
   door; the incident question is what happened while it was open (see
   security-incident-response).

## Boundaries

Scanning detects recognisable patterns and misses custom formats and
encoded secrets. Detection is not prevention, and history rewriting
breaks every clone. Private repositories reduce exposure without
eliminating it, since anyone with access can copy it.
