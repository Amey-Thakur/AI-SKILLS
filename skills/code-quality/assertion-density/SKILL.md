---
name: assertion-density
description: Place assertions where invariants are established or must hold: constructors, public boundaries, and loop bodies. Use when hardening code whose silent violations would otherwise surface far from their cause.
---

# Assertion density

An assertion is an executable claim about what must be true at a point in the
program, and its worth is proximity: it fails at the cause, not three stack
frames later where the bad value finally breaks something. Scattering asserts at
random adds noise; placing them where invariants actually live turns a class of
debugging sessions into one clear failure. The skill is knowing those places.

## Method

1. **Assert preconditions at every public boundary.** At the top of an exported
   function, check the arguments the caller must honor: `assert n >= 0`,
   non-null, index in range. A caller's mistake becomes a message at the door.
2. **Establish class invariants in the constructor.** After construction, assert
   the object sits in a legal state: `assert self.balance >= 0`, both ends of a
   range ordered. An object that cannot exist badly never spreads a bad state.
3. **Guard the loop invariant inside the loop.** Assert the property the loop
   maintains each pass: an index stays in bounds, a running sum stays
   non-negative, a heap stays ordered. The assert catches the pass that breaks it.
4. **Check postconditions before returning.** Ahead of `return result`, assert
   what you promised: the output is sorted, its length matches the input, no null
   slipped through. This defends the contract callers are about to rely on.
5. **Assert the impossible branch.** In an else or default you believe
   unreachable, write `assert False, "unreachable: " + state` rather than a
   silent pass. If reality disagrees, you learn at once and precisely.
6. **Keep assertions cheap and side-effect free.** Never `assert queue.pop()`:
   builds that strip asserts, like `python -O` or `NDEBUG`, would drop the pop
   too. Assert conditions; compute nothing the program itself depends on.

## Litmus tests

- When this assert fires, does the message point at the cause or a symptom?
- Would stripping assertions in a release build change any behavior? It must not.
- Can you name the invariant each assert defends in a sentence? If not, cut it.

## Boundaries

Assertions guard programmer errors, not user input or I/O failure: validate
untrusted data with real error handling that survives in production, since
asserts may compile out. Hot loops where an assert measurably costs throughput
are a judgment call; some teams gate expensive checks behind a debug flag.
