---
name: python-performance
description: Profile first, then remove Python-level overhead through vectorization, better algorithms, or a compiled extension. Use when Python code is too slow and you must decide where and how to optimize.
---

# Python performance

Python overhead is per-operation, so wins come from doing fewer Python-level
operations: better algorithms first, then batch work into C-backed calls,
then compile the hot loop.

## Method

1. **Profile before touching code.** `python -m cProfile -s cumtime app.py`
   for call-level, `py-spy top --pid N` for live processes without
   restarting, `line_profiler` for a single hot function. Optimizing an
   unprofiled guess wastes days; the hot spot is rarely where you think.
2. **Fix the algorithm before the language.** An O(n^2) membership scan
   beaten into a set lookup outruns any rewrite. Check data-structure fit:
   list for order, set/dict for membership, deque for both-ends, heapq for
   top-k.
3. **Vectorize numeric loops.** A numpy expression over an array replaces a
   Python loop with one C loop, commonly 10-100x. The trap is accidental
   element-wise Python (calling `float()` per item, object-dtype arrays);
   keep dtypes numeric and operations whole-array.
4. **Cut allocation and attribute churn in hot loops.** Hoist
   `self.method` and global lookups to locals, reuse buffers, prefer
   comprehensions over `append` loops. These 10-30% wins are free but only
   matter inside the measured hot path.
5. **Escalate to compiled code deliberately.** Order of preference: an
   existing C-backed library (numpy, polars, re2), `functools.lru_cache`
   over recomputation, Cython or a small Rust extension (pyo3/maturin) for
   the one hot function. Keep the compiled surface minimal; it is the code
   you can no longer read in a debugger.
6. **Verify with a benchmark, not a feeling.** `timeit` or `pytest-benchmark`
   with realistic data sizes, before and after, committed next to the code
   so regressions are visible.

## Boundaries

- Do not optimize I/O-bound code with these techniques; overlap the waiting
  instead (async, threads, batching requests).
- Free-threaded and JIT builds change constants, not complexity; algorithmic
  wins carry across interpreters, micro-tricks may not.
- Readability is a cost you pay forever; take the 2x that keeps the code
  plain over the 2.3x that obfuscates it.
