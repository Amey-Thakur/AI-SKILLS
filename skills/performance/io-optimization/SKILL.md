---
name: io-optimization
description: Reduce input/output cost by cutting round trips, moving fewer bytes, and turning random access into sequential access. Use when a workload is IO-bound: disk, network, or syscall overhead dominates while the CPU sits idle.
---

# IO optimization

Input/output is slow per operation and cheap per byte once started, so the
enemy is the number of operations and the distance a disk head or network
packet has to travel. A loop that reads one row per query, or writes one byte
per syscall, spends almost all its time in overhead. Fix IO by batching calls,
shrinking payloads, and following the medium's grain.

## Method

1. **Confirm the workload is IO-bound.** Check that CPU utilization is low while
   throughput lags: `iostat`, `iotop`, `%iowait` in `top`, or a profiler showing
   time parked in read and write. If the CPU is pinned instead, this is the
   wrong skill.
2. **Batch many small operations into few large ones.** Replace per-row queries
   with one `IN` list or bulk fetch, per-record writes with a `COPY` or
   multi-row insert, per-item HTTP calls with a batch endpoint. One round trip
   of a thousand items beats a thousand round trips whose cost is latency, not
   size.
3. **Buffer at the boundary.** Wrap raw file and socket handles in a buffered
   reader and writer (`bufio`, `BufferedReader`, `BufferedOutputStream`) so the
   kernel sees 64KB syscalls, not one per byte. Flush deliberately; do not
   `fsync` per record when a batch fsync is correct.
4. **Prefer sequential access to random.** Disks and read-ahead reward in-order
   access; a sequential scan can beat scattered seeks by an order of magnitude
   even on SSDs. Sort work by key before reading, lay files out to be read the
   way they are written, and let the page cache and prefetcher help.
5. **Move fewer bytes.** Request only the columns and rows you need instead of
   `SELECT *` then filtering in code. Compress payloads that cross a slow link so
   you trade cheap CPU for scarce bandwidth. Cache or memoize reads whose source
   has not changed.
6. **Overlap IO with work.** Issue reads ahead of when they are consumed, use
   async or a small thread pool so a request in flight does not block unrelated
   computation, and pipeline stages so disk and CPU stay busy at once.

## Signals

- Is `%iowait` high and CPU low, confirming IO is the bottleneck?
- Did operation count per unit of work drop, not just per-op latency?
- Is access sequential where the medium rewards it, or still seek-heavy?
- Are payloads trimmed to needed bytes before they cross the wire or platter?

## Boundaries

This cuts the cost and count of IO operations. Choosing a compression codec by
ratio and CPU is compression-tradeoffs; structuring the event loop that overlaps
async IO is async-io-patterns. Database-side query cost and indexing defer to
sql-optimization.
