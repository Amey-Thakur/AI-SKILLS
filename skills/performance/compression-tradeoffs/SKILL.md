---
name: compression-tradeoffs
description: Choose a compression codec and level by weighing size reduction against CPU cost, and place compression where the bytes are actually scarce. Use when deciding whether and how to compress payloads, logs, or stored data, or when compression is burning CPU for little gain.
---

# Compression tradeoffs

Compression spends CPU to save bytes, and whether that trade pays depends
entirely on which resource is scarce. On a slow network almost any codec wins;
on a fast local link, compressing can be slower than sending the data raw. The
decision is codec, level, and placement, made from the real bottleneck, not a
default set once and forgotten.

## Method

1. **Identify the scarce resource first.** Compress only when bytes cost more
   than the CPU to shrink them: a metered or slow link, expensive storage, a
   bandwidth-bound transfer. If the link is fast and the CPU is hot, compression
   can lose; measure before assuming it helps.
2. **Pick the codec by the ratio-versus-speed curve.** LZ4 and Snappy compress
   and decompress fastest at a modest ratio, good for hot internal traffic and
   on-disk blocks. Zstd is the strong default: near-LZ4 speed at low levels, near
   gzip ratio higher up, tunable across the range. Gzip is the
   compatible-everywhere middle. Brotli reaches the best ratio for static web
   assets at high CPU cost.
3. **Tune the level to the access pattern, not the maximum.** Compress-once
   read-many data (static assets, cold archives) justifies a high level (brotli
   11, zstd 19) because the CPU is amortized over every read. Compress-once
   read-once streaming data wants a low fast level; a high level there just adds
   latency for bytes nobody rereads.
4. **Place compression where it fits the resource.** Compress web responses at
   the CDN or gateway edge, database and log storage at rest, internal RPC only
   when the payload and link make it pay. Precompress static assets at build time
   so the server serves a stored `.br` or `.gz`, not one recomputed per request.
5. **Never double-compress or compress the incompressible.** Already-compressed
   data (JPEG, PNG, MP4, an encrypted or gzipped blob) gains nothing and wastes
   CPU; skip it. Content negotiation must not re-gzip a body the origin already
   compressed.
6. **Benchmark on representative data.** Ratio and speed swing wildly by content;
   measure your real payloads with `zstd -b`, a codec benchmark, or end-to-end
   timing that counts CPU and transfer together. Choose the point on the curve
   that minimizes total time or cost, not peak ratio.

## Signals

- Is compression applied only where bytes are scarcer than the CPU to shrink
  them?
- Does the codec choice match the speed-versus-ratio need of that path?
- Is the level set from read-many versus read-once, not pinned to maximum?
- Are already-compressed and tiny payloads skipped rather than reprocessed?

## Boundaries

This chooses and places the codec. Cutting round trips and moving fewer bytes
overall is io-optimization; the encode step that produces those bytes is
serialization-performance. HTTP-level negotiation of `Content-Encoding` follows
http-caching and the protocol's own rules.
