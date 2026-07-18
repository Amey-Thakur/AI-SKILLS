---
name: stack-trace-reading
description: Read a stack trace to find the cause frame instead of stopping at the symptom on top. Use when an exception, panic, or error dump lands and you need to locate the line that is actually wrong.
---

# Stack trace reading

A stack trace is a story told backwards. The top frame is where the program
noticed the problem, which is rarely where the problem started. The reflex
to fix the topmost line patches a symptom and leaves the cause. Read the
trace as a map from where you are to your own code that put you there.

## Method

1. **Read the exception type and message first, together.** `NullPointer`,
   `KeyError: 'user_id'`, `ECONNREFUSED 127.0.0.1:5432`: the type says what
   rule broke and the message says on what value. That pair alone often
   names the cause before you look at a single frame.
2. **Find the boundary between your code and the library.** Traces run
   deepest-call-on-top in most runtimes (Java, JS, Ruby) and deepest-on-
   bottom in Python. Scan for the first frame in a path you own, next to
   the framework or standard-library frames. The bug usually sits at that
   seam, where your data entered someone else's code.
3. **Separate cause frames from symptom frames.** The top frame is where it
   threw. The frame that passed the bad value is a few steps down, in your
   code. A null dereferenced in a library means your caller handed it null;
   walk down until the arguments become yours, and read what you passed.
4. **Follow "Caused by" and "During handling" to the original.** Wrapped
   exceptions chain: Java prints `Caused by:` deeper, Python prints "The
   above exception was the direct cause". The root cause is the last link
   in that chain, not the first one printed. Read to the bottom of the chain
   before forming a hypothesis.
5. **Map frames to versions with line numbers.** A frame is `file:line` for
   a reason. Open that exact line at the committed revision, not `main`.
   Minified or optimized stacks need a source map or symbol file first, or
   the line numbers point at nothing real.
6. **Discard async and framework noise deliberately.** Event loops,
   thread pools, and promise machinery fill traces with frames you did not
   write and cannot fix. Collapse them mentally and keep only the frames in
   your packages: that shortened trace is the one to reason about.

## Signals

- Can you name the exact line in your own code that created the bad value?
- Did you read to the end of the "Caused by" chain, not just the first line?
- Does the frame you plan to fix hold the cause, or just where it surfaced?

## Boundaries

Stack overflow, memory corruption, and optimized release builds produce
traces that lie: inlined frames vanish, tail calls collapse, and the top
frame may be a victim of earlier damage. There, trust a core dump or a
sanitizer over the printed trace, and see the core-dumps skill.
