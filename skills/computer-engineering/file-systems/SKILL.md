---
name: file-systems
description: Understand how files, directories, and durability actually work, so data written is data that survives a crash. Use when writing files that matter or debugging corruption and permission problems.
---

# File systems

Writing a file appears simple and involves caching, buffering, and
metadata that determine whether the data survives a power failure. Most
data loss in application code comes from assuming a write means durable.

## Method

1. **Know that writing is not persisting.** Data sits in buffers until
   flushed and synced, and a crash before that loses it however
   successfully the write returned.
2. **Use atomic replacement for important files.** Write to a temporary
   file, sync it, then rename over the target, since rename is atomic
   and a partial write is not (see backup-restore).
3. **Sync the directory too when creating files.** The file's data and
   the directory entry are separate metadata, and both need durability.
4. **Understand path resolution and symlinks.** A path is resolved at
   use time, which is the basis of a whole class of race conditions in
   privileged code (see file-upload-safety).
5. **Handle permissions and ownership explicitly.** Files inherit
   defaults that differ between environments, which is why permission
   bugs appear only in production.
6. **Respect the limits.** Maximum path length, filename character
   restrictions, and case sensitivity differ between systems and break
   cross-platform code.
7. **Do not use the filesystem as a database.** Concurrent access,
   partial writes, and locking are solved problems elsewhere, and
   directory-as-index designs fail at scale (see file-storage-design).

## Boundaries

Behaviour differs substantially between filesystems and operating
systems, particularly for durability guarantees. Network and distributed
filesystems break assumptions that hold locally, especially around
locking. Cloud object storage is not a filesystem and has different
consistency semantics (see cloud-storage-selection).
