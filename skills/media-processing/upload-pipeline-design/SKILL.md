---
name: upload-pipeline-design
description: Move a file from the user's device to durable storage and a processed state, with validation, progress, and recovery at every stage. Use when building any feature that accepts files.
---

# Upload pipeline design

An upload is a multi-stage pipeline that can fail at each stage: the
transfer, the validation, the storage write, and the processing. Treating
it as one operation produces orphaned files, phantom records, and
uploads that appear to work and silently do not.

## Method

1. **Upload directly to storage, not through your server.** Pre-signed
   URLs keep large transfers off application servers, which otherwise
   become the bottleneck and the memory problem.
2. **Create the record before the upload, not after.** A pending record
   with a known id lets you track, resume, and clean up; a record
   created on success loses every failed attempt.
3. **Validate server-side after arrival.** Client checks are for
   feedback only, and content type must be verified from the bytes
   rather than trusted from the extension (see file-upload-safety).
4. **Make each stage independently retryable.** Transfer, validation,
   and processing each fail for different reasons and should not force a
   re-upload of a file that already arrived.
5. **Report progress honestly.** Distinguish uploading from processing,
   since a progress bar at one hundred percent followed by a wait feels
   broken.
6. **Sweep orphans on a schedule.** Files without records and records
   without files accumulate from every partial failure and cost storage
   forever (see media-storage-tiering).
7. **Set limits explicitly and state them up front.** Size, type, and
   count, enforced server-side and shown before the user selects a file.

## Boundaries

The pipeline moves and validates; content moderation and virus scanning
are separate stages with their own requirements (see file-upload-safety).
Direct-to-storage uploads need careful credential scoping so a
pre-signed URL cannot be reused for arbitrary writes. Very large files
need resumable transfer rather than a single request (see
resumable-uploads).
