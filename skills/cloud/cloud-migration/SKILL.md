---
name: cloud-migration
description: Migrate workloads to the cloud with honest 6R triage, dependency mapping, and rehearsed cutovers with rollback. Use when planning a datacenter exit or moving systems between clouds.
---

# Cloud migration

Migrations fail on undiscovered dependencies and unrehearsed cutovers,
not on the copying. Inventory first, move in dependency order, and
never cut over anything you cannot cut back.

## Method

1. **Inventory before strategy.** Every application with: owner,
   criticality, data stores, inbound/outbound dependencies (from
   network flows and connection logs, not memory), compliance
   constraints, and licensing. The dependency map decides move groups;
   apps that chat constantly move together or suffer cross-premises
   latency.
2. **Triage with the 6Rs, honestly.** Rehost (lift-and-shift: fastest,
   deferred benefits), replatform (swap self-managed DB for managed:
   the usual sweet spot), refactor (rearchitect: only where the
   business case is explicit), repurchase (SaaS replaces it), retire
   (10-20% of any old estate; the cheapest R), retain (compliance or
   latency pins it). Default rehost/replatform under deadline;
   refactoring during migration doubles both risks.
3. **Land on a prepared foundation.** Accounts/projects, network
   (see cloud-networking), IAM baseline (see iam-design), logging, and
   IaC pipelines (see infrastructure-as-code) exist before the first
   workload arrives. Migrating onto console-clicked infrastructure
   imports the old mess into the new bill.
4. **Move data with CDC, not downtime.** Bulk-load a snapshot, stream
   changes (log-based CDC; see change-data-capture) until lag is
   seconds, verify counts and checksums continuously. For files,
   sync + delta passes. The data pipeline running clean for a week is
   the prerequisite for any cutover date.
5. **Cut over behind a switch you control.** DNS TTLs dropped in
   advance, traffic moved by weighted routing or a proxy layer,
   old system kept in sync (reverse replication if writes move) for
   the rollback window. Rehearse the whole cutover and the rollback
   on the staging copy: the rehearsal timing becomes the runbook (see
   runbook-writing). Cut low-risk groups first; the crown jewels go
   last with the practiced playbook.
6. **Close the loop per wave.** Hypercare window with old-vs-new
   dashboards (latency, errors, cost), then decommission on a date:
   the old servers left "just in case" are the migration's unfinished
   30%. Post-wave review feeds the next wave's plan.

## Boundaries

- Lift-and-shift carries oversized on-prem specs into per-hour
  billing; schedule the rightsizing pass (see cloud-cost-optimization)
  within the first quarter or the business case quietly dies.
- Latency-sensitive pairs split across premises during a long
  migration need measured tolerance, not hope; sequence them into one
  wave when in doubt.
- Cloud-to-cloud moves change the egress math and the managed-service
  mappings, but the method (inventory, CDC, rehearsed cutover) is
  identical; the trap is assuming service equivalence without testing.
