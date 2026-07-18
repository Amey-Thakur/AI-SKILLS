---
name: least-privilege
description: Scope every credential to the minimum actions it uses, with per-workload identities and expiry so a leak has a small blast radius. Use when writing an IAM policy, provisioning a service account, or reviewing an access grant.
---

# Least privilege

A credential tends to accumulate permissions and never shed them: someone
grants broad access to unblock a deploy, and it stays broad for years. When
that credential leaks, the blast radius is everything it could ever do, not
what it needed. Least privilege means each identity gets exactly the actions
it uses, and access expires unless renewed.

## Method

1. **Start from deny and add named actions.** Write IAM policies that grant
   specific actions on specific resources, such as `s3:GetObject` on one
   bucket ARN, never `s3:*` or `Resource: "*"`. A wildcard is a grant you
   cannot audit.
2. **Give each workload its own identity.** One service account per service,
   not a shared admin key. When a service is compromised or retired, you
   disable one account with a known, narrow scope instead of guessing what a
   shared key touched.
3. **Diff every IAM change before it merges.** Run the policy through AWS
   Access Analyzer or an equivalent, and read the diff for a broadened
   action or resource. Access Analyzer flags a grant that opens a resource
   to an external principal.
4. **Right-size from real usage.** Pull the last 90 days from CloudTrail or
   GCP Policy Analyzer and drop actions the identity never called. AWS
   surfaces this as last-accessed data; remove permissions unused past your
   window.
5. **Set expiry on credentials and grants.** Prefer short-lived tokens
   (STS AssumeRole, workload identity federation) over long-lived keys. For
   standing access, attach a review date and revoke on it so temporary
   elevation self-expires rather than lingering.
6. **Separate human and machine paths.** Humans authenticate through SSO
   with MFA and assume roles; machines use workload identity. Never hand a
   person a service account's static key, because it bypasses the controls
   the human path enforces.

## Litmus tests

- Does any production policy contain `*` in Action or Resource without a
  written justification?
- Can you name, per credential, the smallest role that still passes the test
  suite?
- Would Access Analyzer report zero unintended external or cross-account
  grants?
- Does every long-lived key have either an expiry or a scheduled review
  date?

## Boundaries

This scopes what an identity may do, not where its secret is stored or
rotated (see secrets-management) or how a user first proves identity. Cloud
IAM models differ; translate the principle to your provider's grammar rather
than copying ARNs. Some break-glass access must stay broad: gate it behind
approval and logging instead of narrowing it away.
