---
name: media-processing-queue
description: Run transcoding, thumbnailing, and extraction as queued background work with progress, retries, and failure visibility. Use when media processing takes long enough that it cannot happen in the request.
---

# Media processing queue

Media work is slow, CPU heavy, and prone to failing on a small
proportion of inputs. That combination belongs in a queue with explicit
states rather than in a request handler, and the design question is what
the user sees while it runs.

## Method

1. **Model the states explicitly.** Queued, processing, complete,
   failed, each visible to the interface, because a file stuck between
   states is the most common support question.
2. **Make jobs idempotent and re-runnable.** Reprocessing must be safe,
   since retries and format changes both require it (see idempotency).
3. **Separate queues by cost.** A long video transcode should not block
   a thumbnail behind it, and one queue for everything guarantees it
   will.
4. **Set timeouts and memory limits per job.** A malformed file can
   consume a worker indefinitely, and unbounded jobs take out the whole
   pipeline.
5. **Retry the transient and quarantine the permanent.** A network
   failure retries; a corrupt file fails permanently and moves to a dead
   letter queue for inspection rather than looping.
6. **Show progress honestly.** Stage-level progress is achievable and
   truthful where percentage often is not, and no progress at all reads
   as broken.
7. **Alert on queue depth and failure rate.** Both indicate a problem
   before users report it, and depth predicts the outage (see
   alerting-design).

## Boundaries

Queues decouple timing; they do not reduce total work, and capacity must
still match demand (see capacity-planning). Users must be able to use the
product while processing continues, which shapes the interface.
Processing untrusted files needs isolation regardless of queueing (see
file-upload-safety).
