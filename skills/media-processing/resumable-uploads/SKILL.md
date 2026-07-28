---
name: resumable-uploads
description: Let large uploads survive network interruption by chunking and resuming from the last confirmed part. Use when files are large enough that a failed upload is a real cost to the user.
---

# Resumable uploads

On a mobile network, a large single-request upload is a gamble that
restarts from zero when it fails. Chunked, resumable transfer converts
that into a pause, which is the difference between a usable feature and
one people avoid.

## Method

1. **Establish a session before transferring.** A session id the client
   can use to ask what has been received, which is what makes resumption
   possible at all.
2. **Chunk at a size that balances overhead and loss.** A few megabytes
   is typical: small enough that a failure is cheap, large enough that
   per-chunk overhead stays negligible.
3. **Let the client query received offset.** On reconnect it asks where
   to continue rather than guessing, which avoids both gaps and
   duplicate transfer.
4. **Make chunk writes idempotent.** A retried chunk must not duplicate
   or corrupt, since retries are the normal case here (see idempotency).
5. **Verify the whole file after assembly.** A checksum computed by the
   client and confirmed by the server catches the corrupted chunk that
   individually succeeded.
6. **Expire abandoned sessions.** Partial uploads consume storage
   indefinitely otherwise, and the expiry must be long enough to survive
   a genuinely long interruption.
7. **Use the platform's protocol where one exists.** Storage providers
   offer multipart upload with these semantics already implemented and
   tested.

## Boundaries

Resumability adds coordination state and complexity that small files do
not justify. It cannot help when the file itself changes between
attempts, so the client must detect that and restart. Parallel chunk
upload speeds transfer and complicates ordering and error handling.
