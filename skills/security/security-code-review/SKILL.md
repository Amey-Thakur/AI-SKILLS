---
name: security-code-review
description: Read a diff for security by tracing attacker-controlled input to dangerous operations and checking every trust boundary it crosses. Use when reviewing code that handles input, queries, files, output rendering, or authorization.
---

# Security code review

A security review follows tainted data, not code style. One question repeats at
every line: can attacker-controlled input reach a dangerous operation without
being neutralized on the way? Miss the path and the bug ships looking completely
ordinary.

## Method

1. **List sources and sinks before reading logic.** Sources are where untrusted
   data enters: request params, headers, cookies, uploaded files, queue
   messages, third-party responses, the environment. Sinks are where it does
   harm: SQL, shell, filesystem paths, HTML output, redirects, deserializers,
   template engines, reflection.
2. **Trace each source to each sink.** Follow the variable through assignments
   and calls. Taint clears only at a real sanitizer for that exact sink: a
   parameterized query, a context-aware encoder, path canonicalization plus an
   allowlist. A type cast is not sanitization.
3. **Run the boundary checklist at every trust edge:** input validated against
   an allowlist, output encoded for its context, authentication present,
   authorization confirming ownership, size and rate bounded, errors that do not
   leak internals. A gap in any one of those is a finding.
4. **Split injection checks by interpreter.** SQL: bound parameters, never
   concatenation. Shell: argument arrays, never a string command, never
   `shell=True` on user input. HTML: encode for context (body versus attribute
   versus URL versus script). No interpreter ever eats a string built by
   formatting user data.
5. **Check authorization at the object level.** For every id read from the
   request, confirm the code proves the caller may touch that specific object.
   Missing this is IDOR, the most common real finding and invisible to a linter.
6. **Name the quiet sinks:** open redirects, SSRF through user-supplied URLs,
   XXE in XML parsers, prototype pollution, unsafe deserialization (pickle,
   native Java, `yaml.load`). None look dangerous until you know the shape.
7. **Write each finding as a path, source to sink.** "`req.query.file` reaches
   `fs.readFile` at line 40 with no canonicalization, so `../../` reads any
   file." A finding with no traceable path is a guess in a bug's clothing.

## Checks

- For each user input in the diff, can you name where it lands and exactly what
  sanitizes it before it gets there?
- Does every request-supplied id get an ownership check before it is used?
- Are all SQL and shell calls parameterized, with no string concatenation of
  input anywhere?

## Boundaries

This is the how-to-read companion to security-review, which ranks findings by
exploitability. Taint engines (CodeQL, Semgrep) surface candidate paths but miss
authorization logic entirely, so a human reviewer owns that judgment.
