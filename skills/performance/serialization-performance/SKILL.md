---
name: serialization-performance
description: Cut the CPU and bytes spent turning objects into wire or disk format by choosing the right format, reusing schemas and buffers, and avoiding copies. Use when serialization shows up in the profile, payloads are large, or encode/decode latency dominates a hot request path.
---

# Serialization performance

Every service that crosses a process boundary pays to encode and decode, and on
a hot path that cost can rival the work itself. JSON is readable and slow; binary
formats are fast and opaque. The wins come from choosing the format for the job,
reusing the expensive setup, and not copying bytes you could read in place.

## Method

1. **Measure encode and decode separately.** Profile both directions on real
   payloads; decode is often the more expensive half. Confirm serialization is a
   genuine share of the request, not a rounding error you are about to
   over-engineer.
2. **Match the format to the boundary.** Human-facing or debug APIs can afford
   JSON. High-volume internal RPC wants a schema binary format: Protobuf or
   Cap'n Proto for RPC, Avro for data pipelines, MessagePack for a compact
   JSON-shaped drop-in. Pick for throughput and payload size, not familiarity.
3. **Reuse schemas, codecs, and parsers.** Compile the Protobuf descriptor, Avro
   schema, or JSON schema once and hold it; recompiling per call is pure waste.
   Reuse a configured encoder (a pooled encoder, a `TSerializer`) rather than
   constructing one per message.
4. **Reuse buffers to cut allocation.** Encode into a pooled or preallocated byte
   buffer (`sync.Pool`, a reused `bytes.Buffer`, a scratch array) so a high-QPS
   path does not allocate and free a fresh buffer per message and feed the
   collector.
5. **Read in place with zero-copy where the format allows.** Flatbuffers and
   Cap'n Proto let you access fields with no parse step; memory-mapped Arrow and
   read-only byte views avoid copying large blobs. Slice or view the underlying
   bytes instead of duplicating them into new objects.
6. **Serialize only what the consumer needs.** Trim fields the reader ignores,
   project columns for a columnar format, and stream a large collection
   record-by-record instead of building one giant in-memory document. Fewer bytes
   encoded is less CPU and less GC.

## Litmus tests

- Was the format chosen from measured throughput and size, not defaulted to
  JSON?
- Is the schema or codec compiled once and reused, not rebuilt per call?
- Does a high-QPS encoder reuse buffers instead of allocating per message?
- For large payloads, do you view bytes in place rather than copy them?

## Boundaries

This covers turning objects into bytes and back. Compressing those bytes after
encoding, and picking the codec, is compression-tradeoffs; reducing the number of
round trips that carry them is io-optimization. Schema evolution and versioning
are the format's own contract, not a performance question.
