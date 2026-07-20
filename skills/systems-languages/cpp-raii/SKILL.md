---
name: cpp-raii
description: Manage every resource through RAII with the rule of zero, correct smart-pointer selection, and move semantics. Use when writing modern C++ or reviewing code with manual new/delete or leaky error paths.
---

# C++ RAII

Every resource (memory, file, lock, socket, GPU handle) lives in an
object whose constructor acquires and destructor releases. Once that
is true everywhere, early returns and exceptions cannot leak, and
cleanup order becomes deterministic scope order.

## Method

1. **Aim for the rule of zero.** Compose classes from members that
   already manage themselves (`std::string`, `std::vector`,
   `unique_ptr`, `lock_guard`); then the compiler-generated special
   members are correct and you write none of them. Only resource-
   *owning* wrapper classes implement the rule of five, and each
   such class does exactly one job: own that resource.
2. **Pick the pointer by ownership, not habit.**
   `std::unique_ptr` is the default for owned heap objects (zero
   overhead, moves express transfer); `std::shared_ptr` only when
   lifetime is genuinely shared by design (and `weak_ptr` breaks the
   cycles); raw pointers and references mean "borrowed, non-owning,
   never freed by me": document lifetime expectations at the API
   (see rust-ownership for the same taxonomy enforced by a
   compiler).
3. **Allocate with make functions, never naked new.**
   `std::make_unique`/`make_shared` tie allocation to the owner in
   one expression; a `new` outside a smart-pointer constructor is a
   review flag. `delete` appearing anywhere outside a custom
   deleter means an ownership hole.
4. **Wrap every non-memory resource the same way.** Files, mutexes
   (`lock_guard`/`unique_lock`, see deadlock-analysis), transactions
   (commit/rollback in destructor via scope guards), C handles from
   libraries (`unique_ptr` with custom deleter). If cleanup appears
   in function bodies instead of destructors, error paths will
   eventually skip it.
5. **Use move semantics as ownership transfer syntax.** Return by
   value (RVO/moves make it cheap), take sinks by value and move
   into place, mark moved-from objects as valid-but-empty. Write
   `noexcept` on moves (containers fall back to copies otherwise);
   never throw from destructors: report or terminate, because a
   throwing destructor during unwind ends the process.
6. **Let scope express lifetime in reviews.** The audit question for
   any function: every acquired thing owned by a named object whose
   scope matches the intended lifetime? Ad hoc cleanup blocks,
   `goto`-style flags, and paired init/teardown calls are the C
   idiom this skill replaces (see c-memory-safety when C interop
   forces it).

## Boundaries

- `shared_ptr` is not a garbage collector: cycles leak, atomic
  refcounts cost, and "shared because deciding an owner was hard"
  is deferred design debt.
- RAII manages resources, not object relationships; parent-child
  back-pointers and observer lists still need lifetime thought
  (weak_ptr, handles, or explicit unregistration).
- Interop with C APIs and exception-unsafe legacy code confines
  RAII benefits to the wrapped boundary; wrap at the edge
  immediately rather than letting raw handles roam (see
  ffi-boundaries).
