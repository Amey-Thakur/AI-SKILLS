---
name: command-injection-defense
description: Run external programs without ever building a shell string from untrusted input, using argument arrays that bypass the shell entirely. Use when a program shells out to another binary, especially with any value that came from a user, a file, or the network.
---

# Command injection defense

The moment you assemble a command as a string and hand it to a shell, every
metacharacter in it becomes live: a semicolon, backtick, `$()`, or pipe in
user input runs a second command of the attacker's choosing. Quoting and
escaping are a losing arms race against shell parsing rules. The durable fix
is to never involve a shell: pass the program and its arguments as a list so
the operating system executes exactly one binary with exactly those args.

## Method

1. **Pass an argv array, never a command string.** Use
   `subprocess.run(["convert", src, dst])` in Python, `execFile` or
   `spawn` with an args array in Node, `exec.Command("git", "clone", url)`
   in Go. The arguments reach the program verbatim, so shell metacharacters
   are inert data.
2. **Keep `shell=True` and its equivalents out.** `subprocess` with
   `shell=True`, Node `exec`, Ruby backticks, and `system("string")` all
   invoke `/bin/sh` on your string. If you did not type a literal command,
   these must not appear in the diff.
3. **Never build the string even for the array.** Do not do
   `["sh", "-c", f"convert {name}"]`: that reintroduces the shell you just
   avoided. Put each value in its own array slot so the program, not a
   shell, receives it.
4. **Separate options from operands with `--`.** Insert `--` before any
   user-controlled path or value so a filename beginning with `-` is treated
   as an operand, not a flag. This stops argument injection, the quieter
   cousin where input becomes an unintended option.
5. **Validate the value against an allowlist when it selects behavior.**
   When input picks a subcommand, a branch name, or a mode, match it against
   a fixed set of permitted values rather than passing arbitrary text, even
   through an array.
6. **Prefer a native library over shelling out.** Resolve a hostname with
   the DNS library, not `dig`; manipulate images with a binding, not a
   `convert` subprocess. No child process means no command to inject into.

## Checks

- Does every process launch pass an argument list, with zero `shell=True`,
  `exec()`, backticks, or `sh -c` on a built string?
- Would input of `; rm -rf /` or `$(curl evil)` land as a literal argument,
  doing nothing?
- Is `--` present before user-controlled operands that could look like
  flags?
- Where a native library exists, is the subprocess justified rather than
  reached for by habit?

## Boundaries

This addresses OS command execution. Injection into SQL, LDAP, XML, or
template engines is the same disease in a different interpreter and needs
that interpreter's parameterized interface. Where a value genuinely must
reach a shell feature like a pipeline, build the pipeline in code with
connected process handles rather than a shell string.
