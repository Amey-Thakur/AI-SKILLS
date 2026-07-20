---
name: ffi-boundaries
description: Design foreign-function boundaries with explicit ownership, error translation, and contained panics/exceptions. Use when binding between Rust/Go/Python and C/C++ libraries or exposing your library over a C ABI.
---

# FFI boundaries

The C ABI is the lingua franca and it carries no safety: no ownership,
no lifetimes, no exceptions, no strings with lengths. Everything the
type systems on either side enforced must be re-established by
convention at the boundary, in writing.

## Method

1. **Write the contract per function.** For every crossing: who
   allocates, who frees, with which allocator (never free across
   allocator boundaries: the library provides `x_free()` for what
   `x_create()` returned); pointer validity duration (call-scoped or
   retained?); nullability of every pointer; thread-safety
   (callable from any thread? reentrant?). This contract is the
   SAFETY documentation the wrapper cites (see unsafe-code-review).
2. **Keep the boundary narrow and C-plain.** Cross with C types
   only: integers, raw pointers, length-tagged buffers
   (`ptr + len`, never assume NUL-termination), opaque handles
   (`struct Foo*` the other side never dereferences). Convert to
   rich native types (String, slices, structs) immediately inside
   the wrapper; business logic never touches boundary types.
3. **Translate errors at the edge.** C side: return codes plus a
   `last_error`/out-param message. Native side: convert codes into
   the language's error idiom (Result variants, exceptions,
   Go errors) with context (see rust-error-handling); never let
   callers see raw negative ints. Exposing your library: catch
   every panic/exception *at* the boundary
   (`catch_unwind`, `try/catch`) and return a code: unwinding across
   the C ABI is undefined behavior.
4. **Handle callbacks with double care.** A callback into native
   code carries: a `user_data` context pointer (kept alive by the
   caller for the registration's whole duration: document it),
   no unwinding out (wrap the body in the panic barrier), and a
   stated threading model (which thread calls it, may it re-enter
   the library?). Callback lifetime bugs are FFI's signature
   use-after-free.
5. **Automate the bindings, own the safe layer.** Generate raw
   bindings (bindgen, cgo, cffi-class tooling) so signatures track
   the header; hand-write the one safe wrapper layer that enforces
   the contract (RAII/Drop guards for handles: see cpp-raii,
   c-memory-safety pairing rules). Two layers, clearly separated:
   generated-unsafe and handwritten-safe.
6. **Test the boundary itself.** Round-trip tests for strings/buffers
   with embedded NULs and non-UTF8 bytes; leak tests cycling
   create/destroy under ASan/Valgrind (see memory-leaks); a
   double-free and use-after-free test proving your guards make them
   impossible; threaded smoke tests if the contract claims safety.
   Run under sanitizers in CI; FFI is exactly where they earn their
   keep.

## Boundaries

- Marshaling costs real time on chatty interfaces; batch crossings
  (arrays in, arrays out) rather than per-item calls when profiles
  say the boundary dominates (see python-performance step 5).
- Struct layout across the boundary requires repr(C)/packing
  agreement and versioning discipline; passing structs by value
  across ABIs with different compilers is a compatibility bug farm:
  prefer opaque handles plus accessors.
- Language-specific mechanisms (Go's cgo pointer rules, Python's
  GIL during callbacks) add rules on top of this skill; read the
  runtime's FFI documentation as part of the contract.
