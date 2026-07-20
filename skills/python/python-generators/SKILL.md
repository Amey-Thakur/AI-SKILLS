---
name: python-generators
description: Build lazy pipelines with generators and itertools, trading materialized lists for constant memory, and know when eager evaluation is the right call. Use when processing streams, large or infinite sequences, or composing data transformations.
---

# Python generators

A generator computes one item at a time and forgets it, so memory stays flat
regardless of stream length. That laziness is the tool's power and its trap:
a generator is consumed once and holds no length.

## Method

1. **Default to a generator for sequential single-pass data.** A generator
   function (`yield`) or expression (`(f(x) for x in xs)`) processes a file,
   query, or API stream without loading it all. Memory is O(1) in the stream
   size, and the first result arrives before the last is read.
2. **Materialize a list when you need random access, length, or reuse.**
   `len`, indexing, slicing, sorting, and iterating twice all require a list;
   a generator supports none of them and is exhausted after one pass. If the
   data fits in memory and you touch it more than once, a list is simpler and
   faster. Choose consciously, not by habit.
3. **Compose pipelines as chained generators.** `records = parse(lines);
   valid = (r for r in records if ok(r)); shaped = (transform(r) for r in
   valid)`. Each stage is lazy, so the whole chain still streams and no
   intermediate list forms. This reads as a data flow and stays memory-flat
   over huge inputs.
4. **Reach for itertools before hand-rolling.** `islice` for windows and
   limits, `chain` to concatenate, `groupby` on sorted keys, `tee` to fork
   (with care, since it buffers), `takewhile`/`dropwhile` for edges, and
   `count`/`cycle`/`repeat` for infinite sources. These are C-level and
   correct on edge cases you would otherwise get wrong.
5. **Delegate to a subgenerator with `yield from`.** When one generator
   should yield everything another produces, `yield from sub()` replaces a
   manual `for x in sub(): yield x`, and it also forwards `send`/`throw` and
   the return value. Use it to flatten recursive structures cleanly.
6. **Guard the exhaustion and side-effect traps.** Re-iterating a spent
   generator yields nothing silently rather than erroring, a common bug.
   Generators are lazy, so exceptions and side effects fire only when
   consumed; do not rely on a generator you never iterate. Close long-lived
   generators to run their `finally` cleanup.

## Boundaries

- Laziness delays work, it does not remove it. A generator feeding a
  `list()` at the end saved nothing and added indirection.
- Generators cost per-item overhead; for small in-memory collections a list
  comprehension is faster and clearer.
- Sharing one generator across threads is unsafe. Give each consumer its own,
  or materialize once.
