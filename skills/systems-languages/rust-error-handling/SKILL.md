---
name: rust-error-handling
description: Design Rust error types with the thiserror/anyhow split, context chains, and a deliberate panic policy. Use when structuring errors in Rust libraries and applications.
---

# Rust error handling

`Result` makes every failure path visible in the signature. The design
work is choosing which errors are part of your API (typed, matchable)
and which are just reports for a human (context-rich, opaque).

## Method

1. **Split by audience: libraries type, applications report.**
   Libraries expose concrete error enums (callers must be able to
   match and react); `thiserror` derives the boilerplate. Application
   and binary code uses `anyhow::Result` (or eyre-class) where the
   only consumer is a log line or exit message. The boundary between
   them is where typed errors get context-wrapped and become reports.
2. **Design library enums for the caller's decisions.** One variant
   per *distinct reaction*: `NotFound`, `PermissionDenied`,
   `Retryable(io::Error)`: not one per internal call site. Mark enums
   `#[non_exhaustive]` so adding variants is not a breaking change
   (see api-change-management thinking); implement
   `std::error::Error` with `#[source]` chains so causes stay
   walkable.
3. **Add context at every meaningful boundary.**
   `.with_context(|| format!("loading config {path}"))` at the point
   that knows the filename, the query, the request id; the final
   report then reads as a story ("loading config X: permission
   denied") instead of a bare OS error. Context laid at each layer is
   what replaces stack traces in release builds.
4. **Use `?` everywhere; convert deliberately.** `?` with `From`
   impls (thiserror's `#[from]`) keeps the happy path linear. Resist
   blanket `Box<dyn Error>` in public signatures: it types nothing
   and forces downcasting on callers who needed to match.
5. **Write the panic policy down.** Panics are for violated
   invariants (bugs), never for expected failure: `unwrap()` in
   library code on I/O or parsing is a defect. Allowed:
   `expect("invariant: queue non-empty after push")` documenting why
   it cannot fail, tests, and prototypes clearly marked. Binaries
   set a top-level handler to log panics before dying (see
   error-tracking); servers decide panic=abort vs unwind per their
   supervisor model.
6. **Test the error paths as API.** Assert on matched variants and
   on user-visible report strings for key failures; error messages
   are UX (see error-messages) and regress like any other output.

## Boundaries

- Do not model expected absence as error: `Option` for "not there",
  `Result` for "went wrong"; conflating them blurs every caller's
  logic.
- Cross-FFI boundaries erase Rust errors; translate to codes/strings
  explicitly at the edge (see ffi-boundaries).
- Async cancellation and task join errors are control flow, not
  domain errors; handle them at the runtime boundary rather than
  threading them through domain enums.
