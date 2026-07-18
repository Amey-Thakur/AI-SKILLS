---
name: file-upload-safety
description: Accept user file uploads without letting them become code execution, storage exhaustion, or a path into other users' data. Use when building an upload endpoint, an avatar or document feature, or any handler that writes client-supplied bytes to disk or object storage.
---

# File upload safety

An upload endpoint hands an attacker a way to place chosen bytes on your
infrastructure, and every naive handler treats those bytes too generously:
it trusts the declared type, writes under the declared name, and stores the
file where the web server will happily execute it. Safe uploads verify what
the bytes actually are, cap what they can consume, and store them where
nothing runs.

## Method

1. **Verify content by sniffing magic bytes, not the extension or
   Content-Type.** Both are client-supplied and forgeable. Read the leading
   bytes and confirm the real type with libmagic, Python `filetype`, or Apache
   Tika, then check that type against an allowlist of formats you actually
   support.
2. **Cap size before you read the whole body.** Set a limit at the proxy
   (`client_max_body_size 10m` in nginx) and enforce a matching one in the
   app so a streamed upload cannot fill the disk. Reject over-limit with 413
   instead of buffering to find out.
3. **Generate the stored name yourself.** Assign a UUID or content hash and
   discard the client filename for storage. Keep the original only as a
   display label, escaped, so `../../etc/passwd` or a null byte never reaches
   a filesystem path.
4. **Store outside the web root, ideally in object storage.** Put files in a
   bucket or a directory the application server will never interpret as code.
   If they must sit on the app host, mount that directory `noexec` and serve
   downloads through a handler, not a static path.
5. **Serve downloads with a forced type and disposition.** Return
   `Content-Type` from your verified type, add
   `Content-Disposition: attachment`, and set
   `X-Content-Type-Options: nosniff` so an HTML or SVG payload renders as a
   download rather than executing in the victim's session.
6. **Isolate tenants in the storage path.** Prefix keys with the owning user
   or org id and check that prefix on every read, so one account's upload URL
   can never enumerate or fetch another's.

## Signals

- Does renaming a PHP or HTML payload to `.jpg` get rejected at the
  magic-byte check rather than stored?
- Is there a hard size cap enforced before the full body is buffered in
  memory or on disk?
- Can a stored file ever land in a directory the web server will execute?
- Does fetching another user's file id return 403 or 404, not their bytes?

## Boundaries

This is about accepting and storing bytes safely, not scanning them for
malware, which needs a dedicated engine like ClamAV and a quarantine flow.
Image resizing and document parsing pull in libraries with their own
vulnerabilities: run those in a sandbox and keep them patched. Defer the
authorization model for who may upload to the app's broader access control.
