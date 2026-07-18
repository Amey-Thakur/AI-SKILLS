---
name: debugger-fluency
description: Drive a real debugger with breakpoints, watch expressions, and conditional stops to read live program state at the moment of failure. Use when a bug needs you to see the call stack and variables as it breaks, not reconstruct them afterward.
---

# Debugger fluency

A debugger freezes the program where the bug lives and lets you read every
variable, frame, and expression at that instant. Many developers reach only for
print statements because they never learned the handful of commands that make a
debugger fast. Those commands trade an afternoon of recompiling for one
inspected pause.

## Method

1. **Break at the fault, not at `main`.** Set the breakpoint on the misbehaving
   line or the exception itself: `breakpoint()` in Python, a gutter dot in the
   IDE, or `break file.py:88`. Stepping from the entry point through everything
   wastes the tool.
2. **Master the five movements.** Step over (`n`) runs a line, step into (`s`)
   enters a call, continue (`c`) runs to the next stop, finish (`r`) returns
   from the frame, and up/down walk the stack. The rest is convenience.
3. **Use conditional breakpoints inside loops.** Stop only when it matters:
   `break process.py:40 if user_id == 4187`. Instead of hitting continue nine
   hundred times you land exactly on the iteration that fails.
4. **Watch expressions, not just variables.** Add `order.total - sum(items)` as
   a watch so the debugger re-evaluates it at every stop. The moment the
   invariant breaks you see it, without scanning raw fields by eye.
5. **Walk the stack from the crash.** On an exception, drop into a post-mortem
   with `pdb.pm()` or "break on caught exception," then move `up` through the
   callers reading locals. The bad value was often set three frames above where
   it blew up.
6. **Mutate state live to test a fix.** Reassign a variable at the prompt and
   continue, or evaluate the corrected expression in place. Confirm the
   hypothesis holds before you edit a single line of source.
7. **Script the repeat with a startup file.** Put recurring breakpoints and
   commands in a `.pdbrc` or a launch config so re-entering the session drops
   you at the scene without retyping the setup.

## Signals

- Do you reach the failing state in one continue, not fifty manual steps?
- Can you name the frame where the wrong value first appears?
- Do your watch expressions encode the invariant, so a stop explains itself?

## Boundaries

Where you cannot attach, a locked container, a hot production path, or a timing
race a breakpoint would freeze, fall back to print-debugging or heisenbugs. A
debugger inspects one run, so reproduce the failure reliably with
reproduction-first before you open it.
