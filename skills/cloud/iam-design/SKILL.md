---
name: iam-design
description: Structure cloud IAM with role-based access, short-lived credentials, and permission boundaries that hold at scale. Use when designing cloud access control or cleaning up accumulated permissions.
---

# IAM design

Identity is the real security perimeter in the cloud. The design goal:
every principal holds the least it needs, nothing is permanent, and the
whole arrangement is reviewable by a human in an afternoon.

## Method

1. **Grant to roles, never to individuals.** Humans assume roles
   (engineer, oncall, auditor) through SSO group membership; workloads
   get per-service roles. Direct user grants are unreviewable snowflakes;
   when the org chart changes, group membership changes and IAM follows.
2. **Kill long-lived credentials.** Humans: SSO with MFA into temporary
   session credentials. Workloads: platform-issued identity (instance
   profiles, workload identity, OIDC federation from CI), never access
   keys in env vars or repos (see secrets-management). Any static key
   that must exist gets rotation and a usage alarm.
3. **Scope by resource and condition, not service-wide stars.**
   `s3:GetObject` on `arn:...:bucket/tenant-a/*`, conditions on VPC
   source, tags, or org ID. `Action: *` on `Resource: *` grants appear
   in incident reports, not designs. Separate read from write roles;
   most consumers only need read.
4. **Cap delegation with permission boundaries.** Teams that create
   roles (platform, CI) operate under boundaries that cap what any role
   they create can do; org-level policies (SCPs) deny the never-events
   globally: leaving allowed regions, disabling audit logs, making
   buckets public. This is how self-service and safety coexist.
5. **Make elevation an event.** Break-glass admin via just-in-time
   elevation: time-boxed, ticket-linked, alerting on use, reviewed
   after. Standing admin should be near zero; if oncall needs admin
   nightly, the runbooks need better scoped roles instead.
6. **Review with data, not memory.** Access analyzers and last-used
   data flag unused permissions and external-facing grants; prune
   quarterly. Alert on privilege-escalation primitives specifically:
   iam:PassRole with broad scope, policy-attach rights, and role trust
   edits are the paths from "some access" to "all access".

## Boundaries

- IAM is authorization for cloud APIs; your application's user-facing
  permissions are a separate model (see authz-design), and conflating
  them couples tenants to your infrastructure.
- Least privilege that blocks daily work gets bypassed with shared
  roles; iterate scopes with the teams or lose the whole game.
- Multi-account/project separation is the coarse isolation IAM rides
  on; if everything lives in one account, boundaries are doing a job
  accounts should.
