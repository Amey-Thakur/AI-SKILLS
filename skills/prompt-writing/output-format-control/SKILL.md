---
name: output-format-control
description: Get output in exactly the structure downstream code expects, using schemas, examples, and validation rather than hope. Use when a model's output is parsed by a program rather than read by a person.
---

# Output format control

Prose is forgiving and parsers are not. Any prompt whose output feeds
code needs the format specified, demonstrated, and validated, because a
model that returns the right answer in the wrong shape is a failure to
the caller.

## Method

1. **Use structured output features where available.** Schema-enforced
   generation is far more reliable than asking politely for JSON, and it
   should be the default when supported.
2. **Show the exact shape.** One example of the output, complete and
   well-formed, teaches format better than a description of it.
3. **Specify what goes in each field.** Type, allowed values, and what
   to do when the value is unknown, since an unspecified null is filled
   with invention.
4. **Forbid the wrapper explicitly.** Models add preamble, explanation,
   and code fences by default; saying return only the object is
   necessary and works.
5. **Validate and retry on failure.** Parse, validate against the
   schema, and retry with the specific error, which fixes the vast
   majority of malformed outputs (see mcp-error-handling).
6. **Keep the schema small.** Deeply nested structures with many
   optional fields produce more errors, so ask for what you need.
7. **Handle the refusal case in the schema.** A field for cannot answer
   is better than forcing a fabricated value into a required field.

## Boundaries

Format control governs shape, not correctness: a schema-valid answer can
be entirely wrong. Strict formats can suppress useful nuance, so
human-facing output usually should not be over-structured. Schema
support and behaviour vary between providers (see prompt-testing).
