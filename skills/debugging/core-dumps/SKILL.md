---
name: core-dumps
description: Extract the cause of a crash from a core dump using symbols, backtraces, and post-mortem inspection. Use when a native process died with a signal and left a core file, or when you have a crash dump but no live process to attach to.
---

# Core dumps

A core dump is the process frozen at the instant it died: registers, stack,
and heap preserved. It is the only witness to a crash you cannot reproduce.
Wasted without symbols it is a wall of hex, so the whole job is turning that
snapshot back into named functions, arguments, and the one bad pointer.

## Method

1. **Make sure cores are actually written.** Check `ulimit -c` (often `0`,
   which silently discards them) and set `ulimit -c unlimited`. Find where
   they land via `cat /proc/sys/kernel/core_pattern`; systemd hosts route
   them to `coredumpctl`, so `coredumpctl list` and `coredumpctl dump` pull
   the file. No core means no post-mortem, so fix this before the next crash.
2. **Match the binary and symbols to the exact build.** Load the dump with
   the identical executable that produced it: `gdb ./app core.1234`. Mismatch
   by one commit and every address resolves to the wrong function. Install
   the matching `-dbg`/`debuginfo` package or point at your separated
   `.debug` file so `gdb` can map addresses to names.
3. **Read the backtrace first.** `bt` prints the call stack at death; `bt
   full` adds local variables per frame. The top frame is where the signal
   hit (`SIGSEGV`, `SIGABRT`), and the frames below are how it got there.
   `info registers` shows the faulting address in the offending register.
4. **Walk to the frame you own and inspect state.** `frame N` selects a
   frame, `print var` and `p *ptr` dump values, `x/16xw $sp` examines memory
   around the stack pointer. A `SIGSEGV` on a read of `0x0` means a null
   deref: find which variable holds that null and which frame set it.
5. **Read the signal as a clue, not just a fact.** `SIGSEGV` is a bad
   address, `SIGABRT` is usually an assertion or `abort()` from a detected
   invariant, `SIGBUS` is misalignment or a truncated mmap, `SIGFPE` is a
   divide by zero. The signal narrows the class of bug before you read code.
6. **Cross-check with the allocator and sanitizer story.** A freed pointer
   reused (`0xdeadbeef`-style poison, or glibc's `free(): invalid pointer`)
   points at use-after-free or double-free. Rebuild under AddressSanitizer to
   catch it live once you know roughly where, since a dump shows the wreck
   but not always the moment of corruption.

## Checks

- Does every frame in `bt` resolve to a function name, not a bare address?
- Does the faulting address in the registers match a variable you can name?
- Does the signal type agree with the code path the backtrace points to?

## Boundaries

Cores from stripped release binaries, JIT-compiled runtimes, or heavily
optimized code give partial or misleading stacks; inlining erases frames and
optimized-out locals read as garbage. Managed runtimes (JVM, .NET) have their
own dump tools (`jcmd`, `dotnet-dump`) that beat `gdb` on those stacks.
