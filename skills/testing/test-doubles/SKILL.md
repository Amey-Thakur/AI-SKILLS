---
name: test-doubles
description: Choose stubs, fakes, and mocks deliberately and default to verifying state over interaction so tests survive refactors. Use when a test needs to stand in for a slow, external, or nondeterministic dependency.
---

# Test doubles

A test double replaces a real dependency the test cannot afford: a payment
gateway, a system clock, a database round trip. The trap is reaching for a
mock by reflex and asserting that a method was called, which pins the code's
internal wiring rather than its result. Such tests fail on every refactor that
keeps behavior intact, and they pass while behavior is quietly broken. Pick
the double that matches what you actually need to control.

## Method

1. **Name the double you mean.** A stub returns canned answers, a fake is a
   working lightweight implementation such as an in-memory repository, a mock
   records calls for later verification, a spy wraps a real object to observe
   it. Loose talk of "mock everything" hides which of these the test needs.
2. **Default to state verification.** Drive the system through the double,
   then assert on the returned value or resulting state:
   `assert account.balance == 40`. This survives any refactor that preserves
   the outcome, which is the entire reason the test exists.
3. **Reserve mocks for interaction that is the behavior.** Verify a call only
   when the call is itself the observable effect: an email was sent, an event
   was published, a card was charged. `verify(gateway).charge(500)` is right
   when charging is what the code exists to do.
4. **Prefer a fake to a pile of stubs.** For a repository or clock, one small
   in-memory fake reused across tests reads cleaner than restubbing each
   method per test, and it catches sequencing bugs a lone stub cannot.
5. **Only double what you own or what hurts.** Wrap a third-party SDK behind
   your own interface and fake that, instead of mocking the vendor's types.
   Doubling a type you do not control freezes assumptions the next version
   breaks.
6. **Keep doubles honest with a contract test.** A fake that drifts from the
   real dependency yields false green. Run one shared suite against both the
   fake and the real implementation so their behavior stays aligned.

## Checks

- If you renamed a private method without changing behavior, would this test
  still pass?
- Does each mock verification match an effect a user or another system can
  observe?
- Do several doubles in one test signal a unit with too many collaborators to
  isolate cleanly?

## Boundaries

This is about choosing and placing doubles, not about seam design or the
real-dependency end of the scale: defer wiring seams to integration-testing
and library choice to the project. Mocking frameworks vary, so follow the one
already in the suite.
