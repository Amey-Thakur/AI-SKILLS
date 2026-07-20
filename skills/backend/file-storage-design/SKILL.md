---
name: file-storage-design
description: Store user files in object storage with presigned transfers, validation, and lifecycle rules. Use when building upload/download features or moving file handling off application servers.
---

# File storage design

Files go to object storage; your servers handle authorization and
metadata, never the bytes. Every design decision follows from keeping
payloads off your request path.

## Method

1. **Presign uploads, direct to the bucket.** Client asks your API for
   an upload URL; you authorize, generate a presigned PUT (or POST
   policy) scoped to one key, content-type, size limit, and short
   expiry; client uploads directly. Your API never proxies bytes, so
   uploads cannot exhaust your workers.
2. **Own the keys, never trust filenames.** Server generates the object
   key (`tenant/{id}/uploads/{uuid}`); the user's filename is metadata,
   stored and returned as Content-Disposition. User-controlled paths are
   traversal and overwrite attacks waiting (see path-traversal-defense).
3. **Verify after upload, before use.** A confirm endpoint (or bucket
   event) checks the object exists, size matches, magic bytes match the
   declared type (not the extension), then flips DB status to `ready`
   and enqueues scanning/thumbnailing as jobs. Files never referenced by
   a confirm get lifecycle-deleted (abandoned uploads are storage cost).
4. **Serve through presigned GETs or signed CDN URLs.** Short-lived
   (minutes) per-object URLs after your authz check; long-cache public
   assets go behind the CDN with immutable keys. Buckets stay private;
   a public bucket is an incident report with a delay timer.
5. **Model metadata in your database.** Owner, tenant, size, type,
   checksum, status, created_at; the bucket is a blob heap, your DB is
   the truth about whose file is whose. Deletes are DB-first (soft),
   object cleanup async, so a failed delete never orphans authorization.
6. **Set lifecycle rules in code.** Abandoned multipart uploads aborted
   after a day; temp/exports expire in days; cold originals transition
   to infrequent-access tiers; versioning plus a deletion grace window
   where compliance demands undelete.
7. **Bound everything.** Max size per type, allowed content types,
   per-user quotas and rate limits on URL issuance; large files go
   multipart with the same per-part signing.

## Boundaries

- User-uploaded HTML/SVG served from your domain is stored XSS; serve
  from a sandboxed domain with Content-Disposition: attachment or strict
  CSP (see file-upload-safety for the security-side detail).
- Files that must join transactions (tiny configs, thumbnails under a
  few KB) can live in the DB; anything bigger pays for itself in
  operational pain.
- Direct-to-bucket requires CORS configuration on the bucket; scope it
  to your origins and the PUT/POST methods only.
