---
name: security-incident-response
description: Run a security breach through containment, evidence preservation, and notification duties in the right order, under time pressure, without destroying the record you will need. Use when you suspect or confirm a compromise: leaked credentials, unauthorized access, malware, or exfiltrated data.
---

# Security incident response

A breach is discovered mid-panic, and the instinct to "clean it up
immediately" is exactly what wipes the forensic trail and violates
notification law. Response is a sequence: contain the bleeding without
tipping off or erasing the intruder, preserve what happened, then meet the
legal clocks that started ticking the moment you knew. Improvising the order
costs evidence, or costs a fine.

## Method

1. **Declare the incident and assign a single coordinator.** Open a dedicated
   channel, name one incident commander who owns decisions, and start a
   timestamped log of every action and finding. Diffuse ownership under
   pressure produces duplicated work and gaps.
2. **Contain without destroying evidence.** Isolate affected hosts from the
   network rather than powering them off, which erases volatile memory.
   Disable or rotate the compromised credentials and revoke active sessions
   and tokens, so containment does not depend on the attacker's cooperation.
3. **Preserve the record before you remediate.** Snapshot disks, capture
   memory, and copy relevant logs to write-once storage with hashes, because
   log retention windows expire and reimaging overwrites the source. You
   cannot investigate or notify accurately from data you deleted.
4. **Scope what was actually reached.** From the preserved logs, establish
   entry point, dwell time, which accounts and systems were touched, and what
   data classes were accessible or exfiltrated. The notification duty depends
   on this answer, so resist both under- and over-claiming.
5. **Meet the notification clocks deliberately.** GDPR requires notifying the
   supervisory authority within 72 hours of becoming aware of a personal-data
   breach; US state laws, HIPAA, PCI DSS, and contracts set their own
   deadlines. Loop in legal and privacy counsel early: they, not engineering,
   own the disclosure decision and wording.
6. **Eradicate, recover, then verify.** Remove the foothold, patch the entry
   vector, restore from known-clean backups, and rotate every secret the
   attacker could have seen. Watch the restored systems before declaring
   closure, since attackers plant persistence.
7. **Run a blameless postmortem.** Document timeline, root cause, and the
   control that would have caught it earlier, and turn each into a tracked
   action. An incident that teaches nothing invites its own rerun.

## Signals

- Is there one incident commander and a timestamped action log?
- Were disks and memory snapshotted before any host was reimaged?
- Is the personal-data notification clock (72 hours for GDPR) being tracked
  against a known "aware" timestamp?
- Were all potentially exposed credentials and tokens rotated, not just the
  one known-leaked pair?

## Boundaries

This is the operational spine, not legal advice: statutory and contractual
duties vary by jurisdiction, data type, and industry, and counsel owns the
disclosure call. It assumes preparation exists elsewhere (logging, backups,
an on-call rota); a plan first drafted during the breach will show its seams.
