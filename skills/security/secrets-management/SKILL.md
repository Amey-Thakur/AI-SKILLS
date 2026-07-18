---
name: secrets-management
description: Keep credentials out of source by loading them from a controlled store, scanning for leaks, and rotating on a schedule. Use when adding a secret to an app, cleaning one out of a repository, or setting up how a service reads credentials at runtime.
---

# Secrets management

A secret committed to git is compromised the moment it lands, even if you
delete it on the next push: the history keeps it and crawlers read history.
The job is to keep secrets out of source entirely, load them at runtime from
a store you control, and rotate them on a cadence so any leak has a short
shelf life.

## Method

1. **Move secrets into a vault, not code.** Store credentials in HashiCorp
   Vault, AWS Secrets Manager, or GCP Secret Manager, never in source,
   config files, or Dockerfiles. Reference them by name and fetch at boot or
   inject them as environment variables through the platform.
2. **Keep .env files local and git-ignored.** Add `.env` to `.gitignore`
   before the first commit, check in a `.env.example` with keys and empty
   values, and load it with dotenv in development only. A real value must
   never reach the repository.
3. **Scan every commit and the whole history.** Run gitleaks or trufflehog
   in a pre-commit hook and in CI, then scan the full history once with
   `gitleaks detect --source . --log-opts="--all"`. The hook stops new
   leaks; the history scan surfaces old ones.
4. **Rotate on a fixed cadence and after any exposure.** Set a 30-to-90-day
   interval and automate it where the store supports it, such as Secrets
   Manager rotation functions. Treat any secret that touched a log, a
   screenshot, or a public repo as burned and rotate it now.
5. **Separate secrets per environment.** Give staging and production
   distinct credentials so a leaked staging key cannot reach production
   data, and never reuse one API key across services.
6. **Revoke the old value, do not just add a new one.** After rotating,
   disable or delete the prior credential at the provider so a copied secret
   stops working. Rotation without revocation leaves the leak live.

## Checks

- Does `gitleaks detect` over the full history return zero findings, or a
  documented allowlist entry for each?
- Can you name the last rotation date for every production secret?
- Would a leaked staging credential fail when tried against production?
- Is every secret in the repo also in the vault as its source of truth,
  rather than the repo being the only copy?

## Boundaries

This covers application secrets and their lifecycle, not the access policy
on the vault itself (see least-privilege) or how a secret is used in a
cryptographic operation (see crypto-usage). Rotation cadence and vault
choice follow your platform and compliance requirements; when the two
disagree, meet the stricter one.
