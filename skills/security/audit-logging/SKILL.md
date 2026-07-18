---
name: audit-logging
description: Record security-relevant events in a tamper-evident, append-only log that answers who did what and when. Use when building or reviewing logging for authentication, authorization, privilege changes, or access to sensitive data.
---

# Audit logging

An audit log is the record you reach for after the fact: a breach, a dispute,
an auditor asking who touched an account. It fails two ways, by never capturing
the event or by letting the attacker edit it on the way out. A method has to
close both, so the log is complete and any change to it announces itself.

## Method

1. **Capture the full sentence per event:** actor (user id plus how they
   authenticated), action, target resource, timestamp in UTC ISO 8601, source
   (IP and request id), and outcome. On a denial, add the reason. A record
   missing the actor or the outcome cannot answer the question you will ask.
2. **Split the audit stream from application logs.** Send it to a dedicated
   append-only sink: an S3 bucket with Object Lock (WORM), AWS CloudTrail, or a
   write-only topic. Operational logs rotate and get pruned for cost, and audit
   records must never share that fate.
3. **Chain entries by hash so edits show.** Each record stores the SHA-256 of
   the previous record concatenated with its own payload, so deleting or
   altering one entry breaks every link after it. Re-verify the chain on a
   schedule and alert the instant a link fails to match.
4. **Give the writer INSERT and nothing else.** The account that appends audit
   rows holds no UPDATE or DELETE grant. Retention and expiry run as a separate
   job under separate credentials, so the path that writes cannot also rewrite.
5. **Log the events that carry weight:** authentication success and failure,
   authorization denials, role and privilege changes, secret access,
   configuration changes, and data export. Leave out high-volume routine reads
   unless the resource read is itself sensitive.
6. **Keep the secret out of the record.** Log that a password changed, not the
   new password; that a token was read, not its bytes. Mask personal data down
   to what an investigator genuinely needs to see.
7. **Make timestamps trustworthy.** Run NTP on every host, store UTC, and record
   both event time and ingest time so a backdated or delayed entry stands apart
   instead of blending in.

## Checks

- Can you answer "who deleted this record, and when" from the audit log alone,
  with no help from the application database?
- Does altering a single past entry get caught within one verification cycle?
- Is the sink genuinely append-only, writable but not deletable by the runtime
  role the application actually uses?

## Boundaries

Audit logging proves what happened; it neither prevents the action nor serves
as your general operational log, which structured-logging covers. Retention
periods and mandated formats (SOX, HIPAA, PCI DSS) come from compliance and
legal, not from this skill.
