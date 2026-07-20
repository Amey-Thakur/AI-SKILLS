---
name: gitops-workflow
description: Manage deployments declaratively from git as the source of truth, with reconciliation, secrets handling, and drift alerts. Use when adopting GitOps or fixing config drift and untracked cluster changes.
---

# GitOps workflow

Git holds the desired state; an agent continuously makes reality
match it. Deploys become commits, rollbacks become reverts, and the
cluster stops being a place where people click things nobody
records. The discipline is keeping git the *only* way state changes.

## Method

1. **Declare desired state in git, reconciled by an agent.**
   Manifests (Kubernetes, Terraform, Helm values) in a repo;
   a reconciler (Argo/Flux-class, or Terraform apply in CI)
   continuously converges the environment to match, and
   reports divergence. The repo is the source of truth
   (see infrastructure-as-code); the cluster is a cache of
   it.
2. **Change state only through pull requests.** Every
   deploy, config change, and scaling decision is a
   reviewed, merged commit (see pull-request-size,
   code-review): the git history becomes the deploy audit
   log and the rollback mechanism (revert the commit,
   reconciler undoes it: see rollback-strategy). Direct
   `kubectl edit` in production is the thing GitOps exists
   to eliminate.
3. **Separate config repos from app repos, promote by
   reference.** Application code builds an immutable
   artifact (see artifact-versioning); a separate
   environment/config repo pins which digest each
   environment runs. Promotion is a commit bumping the
   digest in the next environment's file (see
   deployment-pipelines): reviewable, revertible, and
   decoupled from code review.
4. **Handle secrets without committing them.** Never
   plaintext in git: sealed/encrypted secrets committed
   safely (SOPS, sealed-secrets: encrypted at rest, the
   cluster decrypts), or references to an external secret
   store the reconciler resolves (see secrets-management).
   The desired state is versioned; the secret values are
   not exposed by versioning them.
5. **Alert on drift and reconciliation failure.** The
   reconciler detects manual changes (someone edited the
   cluster directly) and either reverts them or alerts
   (see infrastructure-monitoring): standing drift means
   git is no longer the truth, which defeats the model.
   Failed reconciliations (bad manifest, quota) page like
   failed deploys.
6. **Make the reconciler observable and safe.** Sync
   status per app (in-sync, out-of-sync, degraded), health
   assessment (is the deployed thing actually working:
   see health-checks), progressive rollout hooks (canary
   integration: see canary-analysis), and a tested
   break-glass path for when the reconciler itself is
   down and you must act (documented: see runbook-writing).

## Boundaries

- GitOps fits declarative, convergent systems
  (Kubernetes, cloud infra); imperative one-shot
  operations (data migrations, backfills) run through
  pipelines, not reconcilers (see database-migrations,
  deployment-pipelines).
- The reconciler is now critical infrastructure with its
  own availability and upgrade concerns; a GitOps setup
  is not zero-ops, it relocates the ops.
- Multi-cluster and multi-tenant GitOps adds repo
  structure and access-control complexity (who can merge
  what into which environment: see least-privilege);
  design the repo topology before scaling it.
