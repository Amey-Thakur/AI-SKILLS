---
name: java-collections
description: Select Java collections by access pattern, use streams where they clarify, and default to immutability and records. Use when modeling data in Java or reviewing collection-heavy code.
---

# Java collections

Collection choice is an API statement: it tells readers the access
pattern, ordering, and mutability story. Choose for the dominant
operation, and let immutability be the default the exceptions argue
against.

## Method

1. **Choose by dominant operation.** `ArrayList` for indexed
   iteration (the default sequence); `ArrayDeque` for stack/queue
   ends (not `LinkedList`, whose pointer-chasing loses everywhere);
   `HashMap`/`HashSet` for membership and lookup;
   `LinkedHashMap` when iteration order must match insertion (and
   its access-order mode for small LRU caches); `TreeMap` for range
   queries and sorted iteration; `EnumMap`/`EnumSet` for enum keys
   (array-backed, near-free). Concurrent access: the
   `java.util.concurrent` versions, never `Collections.synchronizedX`
   wrappers with compound operations (see jvm-memory-model).
2. **Default to immutable snapshots at boundaries.** `List.of`,
   `Map.of`, `List.copyOf` for parameters, fields, and returns:
   callers cannot mutate your state, and safe publication comes free
   (see immutability-defaults). Return empty collections, never
   null (see null-handling). Mutable builders stay local to the
   method constructing them.
3. **Model data carriers as records.** `record Order(String id,
   Money total)`: equals/hashCode/toString correct by construction,
   shallow-immutable, pattern-matchable. Validate in the compact
   constructor; add derived accessors as methods. Records replace
   the Lombok-and-JavaBean boilerplate for value types (the
   python-dataclasses decision, JVM edition).
4. **Use streams for pipelines, loops for everything else.**
   Streams pay off for filter-map-collect chains and grouping
   (`Collectors.groupingBy`, `toMap` with a merge function: the
   two-arg `toMap` throws on duplicate keys, a classic production
   surprise). Prefer loops when you need index math, early exit
   with side effects, checked exceptions, or debuggability of a
   complex pipeline. Parallel streams only for CPU-bound work on
   large data with no shared mutable state, measured before and
   after (see benchmark-design); they share one common pool and can
   starve your server's other work.
5. **Size and box consciously on hot paths.** Pre-size maps/lists
   when cardinality is known (rehashing churns; see
   jvm-gc-selection allocation pressure); primitive arrays or
   specialized primitive collections where millions of boxed
   Integers would otherwise dominate the heap (see
   memory-optimization). These are profile-driven moves, not
   defaults.
6. **Expose the least interface.** Fields and signatures use
   `List`/`Map`/`Collection`, not `ArrayList`/`HashMap`;
   `SequencedCollection` where first/last matter. The
   implementation is your choice to change later (see
   api-surface-minimalism).

## Boundaries

- `Optional` is a return type for maybe-absence, not a field or
  parameter type; collections should be empty, not
  `Optional<List<T>>`.
- Sorting and hashing depend on correct `equals`/`hashCode`/
  `compareTo` contracts; mutable objects as map keys or set members
  whose hash changes after insertion are lost, not stored.
- Kotlin's collection interfaces overlay these classes with
  read-only views, not true immutability; cross-language code still
  needs the copyOf discipline (see kotlin-idioms).
