---
name: supply-chain-defense
description: Harden the build pipeline by pinning what runs, generating provenance, and signing artifacts so tampering shows. Use when securing a CI/CD workflow, setting up artifact signing, or reviewing how releases are built and shipped.
---

# Supply chain defense

The build pipeline is a privileged machine that turns source into artifacts
your users trust, and it runs third-party code on every push. If an attacker
edits a build step, swaps a base image, or repoints a tag, the malicious
output ships signed and looks legitimate. Hardening means pinning what runs,
proving where each artifact came from, and signing it so tampering is
detectable.

## Method

1. **Pin CI actions to a commit SHA, not a tag.** Write
   `uses: actions/checkout@<40-char-sha>` instead of `@v4`. A tag is mutable
   and can be repointed at malicious code; a commit cannot. Let Dependabot
   bump the SHAs so pinning does not go stale.
2. **Lock base images by digest.** Reference container bases as
   `image@sha256:...` in Dockerfiles and CI, never `:latest`. Rebuilds then
   use the bytes you reviewed instead of whatever the tag points at today.
3. **Grant the pipeline least privilege.** Set `permissions: contents: read`
   at the top of a GitHub Actions workflow and widen per job only where a
   step truly needs write or `id-token`. A compromised step then cannot push
   to the repo or mint a release.
4. **Generate provenance for every artifact.** Produce a SLSA provenance
   attestation with `slsa-github-generator` or `cosign attest`, recording
   the source commit, builder, and inputs. Consumers can then verify the
   artifact came from the commit you claim, not from someone's laptop.
5. **Sign artifacts and verify on deploy.** Sign images and packages with
   Sigstore cosign (`cosign sign`), keyless through OIDC where possible, and
   gate deployment on `cosign verify`. An unsigned or wrongly signed
   artifact never reaches production.
6. **Keep secrets away from untrusted triggers.** Do not expose deployment
   or signing secrets to `pull_request` workflows from forks. A fork PR must
   not be able to read the key that signs your releases.

## Checks

- Does every `uses:` and base image reference resolve to a SHA or digest,
  with zero floating tags?
- Can you verify a production artifact's provenance back to a specific
  source commit?
- Does the deploy step reject an artifact whose cosign signature fails?
- Do fork pull requests run without access to release or deploy
  credentials?

## Boundaries

This hardens how artifacts are built and released, not the third-party
source that goes in (see dependency-auditing) or the runtime that executes
the output. Provenance proves origin, not that the source was safe. Follow
your platform's mandated attestation format where one exists.
