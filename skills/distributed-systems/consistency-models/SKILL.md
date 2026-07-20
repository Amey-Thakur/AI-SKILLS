---
name: consistency-models
description: Choose the weakest consistency model each use case tolerates, from linearizable to eventual. Use when designing replicated data paths or explaining anomalies users report as bugs.
---

# Consistency models

Consistency is a spectrum of promises about what reads see. Stronger
promises cost latency and availability; the craft is matching each data
path to the weakest model its users will not notice.

## Method

1. **Know the ladder.** Linearizable: reads see the latest committed
   write, globally ordered; costs quorum coordination. Sequential: one
   global order, possibly stale. Causal: effects follow causes
   (a reply never precedes its comment). Session guarantees:
   read-your-writes, monotonic reads. Eventual: replicas converge,
   nothing else promised.
2. **Classify each path by anomaly, not by preference.** Ask "what does
   the user see if this read is 2 seconds stale?" A feed: fine. Their own
   just-posted comment missing: broken (needs read-your-writes). An
   account balance check before withdrawal: broken (needs
   linearizability or a serialized ledger).
3. **Buy session guarantees cheaply.** Read-your-writes: route the
   writer's next reads to the primary briefly (sticky session or
   written-at timestamp gate). Monotonic reads: pin a session to one
   replica. These fix most user-visible anomalies without global
   coordination.
4. **Reserve linearizability for decisions.** Uniqueness (usernames),
   inventory decrements, leader election, financial invariants: route
   through the primary/consensus path. Everything else reads replicas.
   One system commonly runs both: linearizable writes, eventual reads,
   session patches where users notice.
5. **Read your database's fine print.** "Strong consistency" in vendor
   docs may mean per-key, per-partition, or only with specific read
   settings (quorum reads, `linearizable` flags). Replicas of a
   single-leader database are eventually consistent followers; that is
   where most accidental staleness ships from.
6. **Surface staleness when you serve it.** Timestamps ("as of 14:02"),
   optimistic UI reconciling later, or version tokens the client echoes
   back; designed staleness is invisible, undesigned staleness is a bug
   report.

## Boundaries

- Consistency models order reads and writes; they do not give you
  multi-key transactions. That is isolation (see
  transactions-isolation), a separate axis.
- Under partition you choose consistency or availability per operation
  (see partition-tolerance); no configuration removes the choice.
- Clocks cannot substitute for ordering (see clock-skew); last-write-wins
  by wall clock silently drops concurrent writes.
