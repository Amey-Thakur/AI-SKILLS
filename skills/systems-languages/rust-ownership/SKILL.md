---
name: rust-ownership
description: Work with the borrow checker through ownership-first design instead of fighting it with clones and unsafe. Use when writing Rust or resolving borrow-checker errors that feel unwinnable.
---

# Rust ownership

The borrow checker enforces one rule: every value has one owner, and
you may have many readers or one writer, never both. Designs that
encode this rule compile smoothly; designs that hide it fight the
checker forever.

## Method

1. **Read the error as a design hint first.** Persistent borrow
   errors usually mean the data's ownership story is unclear: two
   things want to own one value, or a reference wants to outlive its
   source. Ask "who owns this, who borrows it, for how long" before
   reaching for workarounds; the restructure is usually smaller than
   the fight.
2. **Default to owned data at boundaries.** Structs own their fields
   (`String`, `Vec<T>`); functions take `&T`/`&mut T` for use,
   `T` when consuming, and return owned values. References inside
   structs demand lifetimes and infect every user; reserve them for
   deliberate zero-copy designs (parsers, views) where the payoff is
   measured.
3. **Restructure before you clone; clone before you unsafe.**
   Move the borrow's scope tighter (end it before the mutation),
   split structs so disjoint fields borrow independently (borrow
   splitting works per-field, not through methods), take indexes
   instead of references into collections you will mutate. When the
   fix is disproportionate, a `.clone()` with a comment is honest
   engineering; measure before assuming it is the bottleneck (see
   python-performance's profiling ethic, applied anywhere).
4. **Use the shared-state escape hatches by name.** `Rc<T>`
   (single-thread shared ownership), `Arc<T>` (across threads),
   `RefCell<T>`/`Mutex<T>` (interior mutability, checked at
   runtime): each is a documented decision that the aliasing rule
   moves from compile time to runtime. `Rc<RefCell<T>>` everywhere is
   a sign the design wants a different shape: consider handles/ids
   into a central store (the ECS idea; see entity-component-system).
5. **Add lifetimes only when elision stops.** Most signatures need no
   annotations; when the compiler asks, the annotation is you telling
   it which input the output borrows from
   (`fn first<'a>(s: &'a str, sep: &str) -> &'a str`). If a lifetime
   spreads through the codebase causing pain, the borrowed design is
   wrong for that data; own it instead.
6. **Let iterator and pattern styles avoid borrow puzzles.**
   Iterator chains, `match`/`if let` with ownership-aware patterns
   (`ref`, destructuring), and `entry()` APIs on maps express in one
   construct what manual index-and-mutate loops turn into
   borrow-checker arguments.

## Boundaries

- `unsafe` does not turn off the aliasing rules; it makes you the
  checker, with UB as the failure mode (see unsafe-code-review).
  It is for FFI and vetted primitives, not borrow-error escape.
- Async Rust adds `'static` bounds, `Send`/`Sync`, and self-borrow
  issues beyond this skill; the ownership instincts here are the
  prerequisite, not the whole story.
- Fighting the checker on graph-shaped data (doubly-linked, cyclic)
  is structural: use arenas, indexes, or an existing crate rather
  than pointer gymnastics.
