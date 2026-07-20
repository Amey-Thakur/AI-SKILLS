---
name: cloud-storage-selection
description: Match data to object, block, or file storage tiers by access pattern, consistency, and cost per operation. Use when choosing cloud storage for a workload or auditing storage spend and latency.
---

# Cloud storage selection

Storage classes differ by orders of magnitude in latency, throughput,
and cost per GB versus per operation. Pick by access pattern first,
durability/consistency second, unit cost third; the wrong axis order
produces expensive surprises.

## Method

1. **Start from the access pattern.** Write-once-read-many blobs
   (assets, backups, data lake): object storage. Random-access block
   I/O for one instance (databases, filesystems): block volumes.
   Shared POSIX semantics across many instances (legacy apps, some ML
   training): file storage, the most expensive convenience. Streaming
   append + replay: a log system, not storage at all (see
   message-queues).
2. **Object storage is the default; learn its physics.** Effectively
   infinite scale, 11-nines durability, strong read-after-write
   consistency on the majors now, but: latency per request is tens of
   ms (batch small objects; millions of 4KB files is an anti-pattern),
   listing is expensive, renames are copies, and per-request pricing
   punishes chatty access. Design keys for your read patterns
   (prefix = partition; see data-partitioning) and serve users through
   presigned URLs (see file-storage-design).
3. **Tier objects by temperature, with retrieval math.** Standard for
   hot, infrequent-access for monthly-touched (half the storage price,
   plus per-GB retrieval), archive tiers for compliance copies
   (retrieval hours + fees + minimum storage durations). Lifecycle
   rules automate transitions (see data-retention); before archiving,
   compute the retrieval scenario cost: archives you restore quarterly
   can cost more than standard.
4. **Size block storage by IOPS and throughput, not GB.** Volume
   performance scales with type and provisioning; databases want
   provisioned-IOPS SSD with headroom over measured p95 (see
   io-optimization), everything else rides general-purpose. Block
   snapshots are incremental and cheap: schedule them, test restores
   (see backup-restore), and delete orphaned volumes: the classic
   silent spend.
5. **Treat file storage as the exception you justify.** It solves
   "many writers need POSIX" at 3-10x object cost with real throughput
   ceilings per mount. Before adopting: can the app use object APIs,
   or per-instance block + replication? Legitimate uses: lift-and-shift
   legacy (see cloud-migration), shared training data with
   file-semantics tooling.
6. **Re-audit yearly with the bill.** Cost per GB stored, per million
   requests, and per GB retrieved, by bucket/volume tag (see
   cloud-cost-optimization); the top surprise is always request or
   retrieval charges on a "cheap" tier misused as hot storage.

## Boundaries

- Databases and caches are data services, not storage tiers; choosing
  managed Postgres vs self-run is managed-vs-selfhosted territory.
- Cross-region replication doubles storage cost and adds egress;
  demand the requirement in RPO numbers first (see multi-region-design).
- Consistency guarantees differ by provider and operation (listing
  after delete, multipart visibility); verify the specific semantics
  your correctness depends on rather than assuming.
