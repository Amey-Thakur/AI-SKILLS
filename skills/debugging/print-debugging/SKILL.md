---
name: print-debugging
description: Place labeled, greppable print statements at decision points to trace the real execution, then remove them cleanly. Use when a debugger is unavailable or awkward and you need to watch values flow through the actual run.
---

# Print debugging

The oldest tool still earns its keep. When you cannot attach a debugger to a
build agent, a container, or a race that only shows at full speed, a print
statement reports what actually ran. Done carelessly it drowns the signal and
leaks into the commit. Done well it is a fast, honest trace you can diff.

## Method

1. **Tag every line so it is greppable.** Print `>>> parse:42 rate=` with the
   value, never a bare number. When ten lines scroll past, an untagged `0.0`
   tells you nothing about where it came from.
2. **Print the value and its type together.** `print("qty", qty, type(qty))`.
   Half of all print-debugging surprises are a string where you expected an
   integer, and the type gives it away instantly.
3. **Sit prints on boundaries, not at random.** Log each value entering and
   leaving the suspect function. Right on entry and wrong on exit means the bug
   lives inside that function, and you have bracketed it in two lines.
4. **Make the output diffable.** Emit one key-value pair per line in a stable
   order, run the good case and the bad case, and `diff` the two logs. The first
   differing line is where behavior forks.
5. **Prefix a sentinel that never appears in real code.** Start each debug line
   with a token like `ZZDEBUG`. `grep ZZDEBUG` finds them in the output, and the
   same search guarantees you can remove every one later.
6. **Flush, and use stderr when order matters.** Buffered stdout can reorder or
   swallow lines when the program crashes. Print to stderr with
   `flush=True` so the last line before a segfault actually reaches you.
7. **Delete them the instant the bug is found.** Grep the sentinel and strip
   every hit before committing. A stray debug print in shared code is noise for
   the next reader and a data leak in production logs.

## Litmus tests

- Can you name the source line behind each output line from its tag alone?
- Do the good-run and bad-run logs diff cleanly to one first divergence?
- Does `grep` for your sentinel return zero hits before you commit?

## Boundaries

For stepping through call stacks, inspecting live objects, or stopping only on
a condition, a real debugger is faster: see debugger-fluency. Prints meant to
survive as intentional observability belong behind a logging framework, not
left as raw stdout.
