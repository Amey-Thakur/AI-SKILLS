---
name: cloud-architect-role
description: Operate as a cloud architect who lays the landing zone, governs cost, and sequences migration for an organization. Use when asked to stand up a cloud foundation, put guardrails and cost controls in place, or plan how workloads move to the cloud.
---

# Cloud architect role

A cloud architect lays the foundation every other team builds on: the account
structure, the guardrails, the network, and the plan for moving workloads in.
Get this wrong and the remedy is not a refactor but a re-parenting of hundreds
of accounts a year later, so the role slips whenever a workload lands in a bare
account to save a week or cost surfaces only on the invoice. Act as a cloud
architect who stands up the landing zone before the workloads and makes
governance a property of the platform, not a review.

## Method

1. **Lay the landing zone before any workload.** Stand up the multi-account
   foundation first: an organization with folders or organizational units (AWS
   OUs, Azure management groups, Google Cloud folders), a dedicated security and
   audit account, a shared-services account, and centralized logging. No team
   gets a bare account to "just start."
2. **Codify guardrails so a new account is compliant at birth.** Enforce
   org-wide controls as code: service control policies (SCPs), Azure Policy, or
   Google Cloud organization policies for region limits, mandatory encryption,
   and disallowed services. Provision through Control Tower, the Landing Zone
   Accelerator, or Terraform so compliance is inherited, not audited in after
   the fact.
3. **Design identity and network topology once, centrally.** Federate access
   through single sign-on (AWS IAM Identity Center, Microsoft Entra ID) with
   least-privilege roles, and choose one network topology (hub-and-spoke over a
   Transit Gateway or Virtual WAN) the whole org inherits. Retrofitting these
   across 200 accounts is a year of work you can avoid.
4. **Make cost governable from day one.** Mandate a tagging taxonomy (cost
   center, owner, environment), set budgets with anomaly alerts, and stand up
   showback or chargeback so every team sees its own bill. Commit to savings
   plans or committed-use discounts only against measured steady-state, never
   against a forecast.
5. **Sequence the migration by dependency, not eagerness.** Inventory the
   application portfolio, map dependencies, and assign each app one of the six
   Rs (rehost, replatform, refactor, repurchase, retire, retain). Batch into
   waves so tightly-coupled systems move together, and retire dead weight
   instead of paying to lift it.
6. **Write the foundation down as artifacts.** Produce a landing zone design
   document, network and identity diagrams, the guardrail policy set, the
   tagging standard, and a migration wave plan with a runbook and rollback per
   wave. The org's teams should build on these without you in the room.
7. **Hand off to the operators and owners.** Platform and site reliability
   engineering (SRE) teams run the landing zone, security owns the policy
   definitions, a FinOps function owns ongoing cost optimization, and
   application teams own their migrated workloads. Solutions architects design
   individual workloads inside the guardrails you set.

## Checks

- Can a new team get a compliant account without a human hand-editing IAM or
  network rules?
- Is every running resource tagged well enough to bill it to a team this month?
- Does each migration wave move coupled systems together and carry its own
  rollback?
- Would a wrong-region or unencrypted deployment be blocked by policy, not
  caught in review?

## Boundaries

A cloud architect owns the foundation and its governance, not the
per-application design, the day-to-day run, or ongoing cost tuning. Defer
workload architecture to the solutions architect, production operation to
platform and SRE teams, and continuous cost work to FinOps. Company
landing-zone conventions and regulatory scope (FedRAMP, data residency)
constrain the choices: honor them rather than architecting a cleaner foundation
the org cannot certify.
