---
name: pii-handling
description: Minimize, classify, mask, and expire personal data so any leak or legal request reaches as little of it as possible. Use when designing storage, logging, or analytics that touch names, contacts, identifiers, or other personal data.
---

# PII handling

Personal data is a liability that compounds. Every field you keep is something
you can leak, something a subpoena can reach, and an obligation you carry until
you delete it. The discipline is to collect less, guard what stays, and purge on
a clock instead of hoarding by default.

## Method

1. **Classify each field before it lands.** Tag every column public, internal,
   PII, or sensitive PII (health, biometric, financial, government id). Keep the
   map in code or a data catalog so masking and retention rules key off the tag,
   not off a person remembering which column held a birth date.
2. **Minimize at the point of collection.** Store what you use and nothing else:
   the last four digits of a card, not the full number; an age band, not a date
   of birth; a coarse region, not raw coordinates. A field you never collected
   is a field that cannot leak.
3. **Mask on the way out.** Redact in logs and errors (`a***@x.com`), tokenize
   card numbers, and back reads with database views that expose masked columns
   by default, so a stray `SELECT *` does not spill raw values into a dump.
4. **Pseudonymize before data reaches analytics.** Swap direct identifiers for a
   per-subject token in the warehouse and in non-production copies, and keep the
   re-identification key in a separate, tightly scoped vault. Analysts get the
   shape of the data without the people in it.
5. **Set retention per class and enforce it in a job.** Give each dataset a TTL
   (support tickets two years, auth logs 90 days) and run a scheduled purge that
   deletes rows for real. "Keep forever" must be a deliberate choice, never the
   default nobody revisited.
6. **Build one lookup path that finds every copy.** An access or deletion
   request has to reach the primary store, replicas, backups, the search index,
   and analytics. A GDPR or CCPA erasure that skips the warehouse copy is not an
   erasure.
7. **Encrypt sensitive PII at the field level.** Put envelope encryption on
   government ids and health data on top of disk encryption, so a raw table dump
   is not a breach by itself.

## Checks

- Pick a user id: can you list every place their personal data lives in under a
  minute?
- Does a raw email, card number, or national id ever surface in logs, stack
  traces, or analytics events?
- When retention expires, does a job actually delete the rows, or does the
  policy live only in a wiki page?

## Boundaries

Classification thresholds and lawful basis are legal calls; defer to your data
protection officer. The encryption mechanics belong to data-encryption. This
skill decides what to protect, how coarsely to keep it, and for how long.
