---
name: deserialization-safety
description: Treat any serialized bytes from outside the program as hostile, parsing them through schema-validated formats instead of native object reconstructors. Use when reading pickles, Java or PHP serialized objects, YAML, or any encoded structure that arrives from a user, a queue, or a cache.
---

# Deserialization safety

Native deserializers were built to reconstruct trusted objects, and many of
them will instantiate arbitrary classes and run code as a side effect of
parsing. Feed one attacker-controlled bytes and you have handed over remote
code execution before your own logic runs a single line. The rule is blunt:
untrusted input never reaches a native object deserializer, only a data
format you can validate against a schema.

## Method

1. **Never unpickle untrusted data.** Python `pickle`, `marshal`, and
   `dill` execute constructors during load; the same holds for Java
   `ObjectInputStream`, Ruby `Marshal.load`, and PHP `unserialize`. If the
   bytes crossed a trust boundary, none of these are an option, whatever the
   convenience.
2. **Prefer a data format with no code path.** Move the interface to JSON,
   or to a schema-first format like Protocol Buffers, and reconstruct your
   own objects from the parsed fields. These carry data, not instructions to
   instantiate classes.
3. **Load YAML safely.** Use `yaml.safe_load`, never `yaml.load` with the
   default loader, because full YAML can construct arbitrary Python objects
   through tags. Treat `safe_load` as the only YAML entry point for external
   input.
4. **Validate the parsed structure against a schema.** After parsing, run
   the data through pydantic, JSON Schema, or zod so shape, types, and
   ranges are enforced before any field is used. Parsing proves it is
   well-formed; validation proves it is what you expect.
5. **If a native format is unavoidable, restrict the allowed classes.** When
   an existing protocol forces Java or .NET serialization, use a resolver or
   look-ahead filter that permits only an explicit allowlist of classes, and
   sign the payload so only your own producer can generate it.
6. **Authenticate the source when the format stays binary.** Wrap cache and
   queue payloads in an HMAC or a signature so a poisoned cache entry or a
   forged message is rejected before deserialization, not after it has
   already run.

## Signals

- Does any code path reach `pickle.loads`, `Marshal.load`, or
  `ObjectInputStream` on bytes that originate outside the process?
- Is every external structure validated against a declared schema before its
  fields are read?
- Is YAML from users loaded exclusively through `safe_load`?
- Are cache and queue payloads integrity-checked so a tampered entry fails
  closed?

## Boundaries

This covers decoding serialized input, not the authorization of who may send
it or what the validated data then does. Trusted internal formats between
services you fully control are a lighter risk, though signing them still
pays off. Schema validation confirms structure, not business rules: a
well-typed request can still be an unauthorized one, which auth handles.
