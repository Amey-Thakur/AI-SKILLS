---
name: c-memory-safety
description: Write C with explicit ownership conventions, bounds discipline, and sanitizers wired into every test run. Use when writing or reviewing C code, or hunting memory corruption.
---

# C memory safety

C gives you no checker, so you build one from three parts: conventions
that make ownership visible, APIs that make bounds explicit, and
sanitizers that catch what convention missed. Teams that skip any leg
ship the corruption the other two would have caught.

## Method

1. **Declare ownership in names and comments.** Every pointer-
   returning or pointer-taking function states who frees: suffix
   conventions (`_create/_destroy`, `_take` for ownership transfer,
   `_borrow`/const for no transfer), a `/* caller owns result */`
   comment where names cannot carry it. Ambiguity here is where
   double-frees and leaks breed; the convention is your borrow
   checker.
2. **Pair every resource with one owner and one release path.**
   Allocate and free in the same module; single-exit cleanup with
   `goto err` chains (release in reverse order) keeps error paths
   from leaking; NULL-out pointers after free so use-after-free
   becomes a crash instead of silent reuse. One clear owner per
   allocation; shared ownership in C is a design smell to engineer
   away, not manage.
3. **Make every buffer carry its size.** Functions take
   `(buf, len)` pairs or a slice struct; strings use explicit-length
   APIs (`snprintf`, `strnlen`, memccpy-style) and ban the unbounded
   family (`gets`, `strcpy`, `sprintf`) via lint. Integer overflow
   in size math is the pre-corruption bug: check multiplications
   (`calloc` over `malloc(n*size)`), use size_t consistently, and
   validate untrusted lengths at the boundary (see input-validation).
4. **Run sanitizers as the default test build.**
   AddressSanitizer+UndefinedBehaviorSanitizer on every test and
   fuzz run (cheap, catches use-after-free, overflows, UB);
   MemorySanitizer or Valgrind for uninitialized reads where ASan is
   blind; ThreadSanitizer on concurrent code (see race-conditions).
   A sanitizer finding is a bug even when the test passes; CI treats
   it as failure (see fuzz-testing for the input side).
5. **Prefer arena and pool lifetimes for complex object graphs.**
   Allocating related objects from one arena freed wholesale
   converts N ownership decisions into one, eliminates leak classes,
   and often wins performance; per-request/per-phase arenas fit
   servers and parsers naturally.
6. **Harden the production build.** Fortify source, stack
   protectors, ASLR/PIE, RELRO as defaults; assertions on invariants
   kept in release for corruption-adjacent code (fail fast beats
   corrupt slowly; see defensive-programming). Crashes then arrive
   with dumps you can read (see core-dumps).

## Boundaries

- These practices reduce, not eliminate, memory unsafety; for new
  components with hostile input, weigh writing them in Rust and
  linking via FFI (see ffi-boundaries) as the stronger fix.
- Legacy code adopts this incrementally: sanitize tests first, add
  bounds at the trust boundary, refactor ownership as you touch
  functions, not in a big bang.
- Kernel, embedded, and allocator-free environments constrain the
  toolbox (no ASan on target); compensate with host-side unit tests
  under sanitizers and stricter review (see embedded-debugging).
