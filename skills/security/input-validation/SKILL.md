---
name: input-validation
description: Validate untrusted input at every trust boundary with allowlists, canonicalization, and hard limits so malformed data never reaches logic. Use when accepting data from requests, files, uploads, or third-party APIs.
---

# Input validation

Input validation is the wall between the outside world and code that trusts
its arguments. It fails when validation is scattered, negative (blocklists),
or run after the value has already been used. Do it once, at the boundary,
before anything downstream reads the value.

## Method

1. **Validate at the boundary, not deep in the stack.** Check input where it
   enters: the request handler, the deserializer, the file parser. Once a
   value passes the wall, downstream code may assume it is well-formed.
   Validation buried three calls deep leaves the first two calls exposed.
2. **Prefer allowlists over blocklists.** Define what is legal (a set of
   country codes, `^[a-z0-9_]{3,32}$` for a username, an enum of statuses)
   and reject the rest. Blocklists lose: attackers find the encoding, the
   Unicode homoglyph, or the case you did not enumerate.
3. **Canonicalize before you check.** Normalize first, validate second, or
   an attacker slips past with an alternate encoding. Decode percent-
   encoding, resolve `..` and symlinks in paths, apply Unicode NFC,
   lowercase the host. Validating the raw form then using the decoded form
   is the classic path-traversal bug.
4. **Cap length, count, and depth.** Set a maximum on every string, array,
   upload, and nested-JSON depth. A 2 GB "username" or a 10,000-level nested
   object is a denial of service you accepted by omission. Reject at the
   limit with a clear error.
5. **Check type and range, then parse to a typed value.** Confirm the
   integer is an integer within bounds, the date parses, the enum is a
   member. Convert to the real type at the boundary so downstream code
   handles `int` and `Date`, not `str`.
6. **Fail closed with a specific error.** On invalid input, reject and stop;
   do not coerce, truncate silently, or "fix" it. Say which field failed and
   why, but never echo the raw bad value into an error page unescaped.

## Checks

- Does each field have an explicit rule, or does some input reach logic only
  because nothing rejected it?
- Do you canonicalize before validating everywhere a value is later decoded?
- Is there a length or size cap on every unbounded input, including request
  bodies?

## Boundaries

Input validation shrinks attack surface; it does not replace output encoding
or parameterized queries. A validated string can still be dangerous in a SQL
statement or an HTML page, so defend those sinks separately (see
sql-injection-defense and xss-defense). Ownership checks (does this user own
this order?) belong with authorization, not here.
