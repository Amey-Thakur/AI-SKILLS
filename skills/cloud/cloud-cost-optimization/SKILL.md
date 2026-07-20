---
name: cloud-cost-optimization
description: Cut cloud spend with tagging, rightsizing, commitment mix, and egress awareness, without breaking reliability. Use when the cloud bill needs reducing or a cost-review practice needs standing up.
---

# Cloud cost optimization

You cannot cut what you cannot attribute. Visibility first, then the
big three levers: rightsizing, commitments, and storage lifecycle;
everything else is decoration until those are done.

## Method

1. **Attribute before optimizing.** Enforce tags (team, service, env)
   at provision time via IaC policy, not wiki pleading; untagged
   resources get a weekly report and an owner hunt. Turn on the billing
   export to a queryable store; the console's month view hides the
   per-service trends you need.
2. **Rightsize from utilization, not fear.** Pull 30 days of p95
   CPU/memory per instance; anything under ~40% at p95 drops a size
   (halving cost per step). Do the same for provisioned IOPS,
   over-replicated dev databases, and idle load balancers. Schedule
   non-prod to sleep nights and weekends: 70% of the week is off-hours.
3. **Buy commitments for the floor, spot for the burst.** Cover the
   stable baseline (12 months of history says what that is) with
   savings plans/reserved capacity at 60-70% coverage; leave headroom
   on-demand. Fault-tolerant batch and CI go on spot at 60-90% off,
   with interruption handling tested (see kubernetes-workloads for
   disruption budgets).
4. **Lifecycle the storage.** Objects: transition to infrequent-access
   after 30 days, archive after 90, delete what compliance does not
   require (see data-retention); abort incomplete multipart uploads.
   Snapshots and orphaned volumes/IPs are the classic silent leak:
   sweep monthly.
5. **Respect egress and cross-zone gravity.** Data leaving the provider
   or crossing regions costs more than compute reading it in place.
   Process where data lives, cache at the edge, and check NAT gateway
   processing charges: a chatty service behind NAT can out-cost its
   instances.
6. **Institutionalize the loop.** Unit economics metric (cost per
   request/customer/GB) on a dashboard, anomaly alerts on daily spend,
   a monthly 30-minute review per team with the top-5 movers, and cost
   as a line item in design reviews (see architecture-review-board).
   One-off cleanups decay in a quarter; the loop does not.

## Boundaries

- Do not trade reliability invisibly: dropping multi-AZ, backups, or
  headroom is a risk decision for the service owner, not a cost
  optimizer's line edit.
- Engineering time is a cost too; a week of work to save $40/month
  fails its own review.
- Provider pricing shifts and this skill's ratios drift; re-verify
  numbers against current price sheets before big commitments.
