---
name: privacy-by-design
description: Build privacy into a feature from the first design rather than bolting it on before launch. Use when starting any feature that will touch personal data.
---

# Privacy by design

Privacy retrofitted is expensive and usually partial, because the
schema, the events, and the vendor integrations all assumed data would
be available. Deciding at design time is cheaper than deciding at
review time, and far cheaper than deciding at incident time.

## Method

1. **State the data flow before writing code.** What is collected,
   where it travels, who can read it, how long it stays, and which
   vendors see it. A short flow written up front surfaces most issues
   while they are still cheap to fix.
2. **Default to the private setting.** Sharing off, visibility narrow,
   retention short. Defaults are what most users will live with, so
   they express your actual position more than your settings screen
   does.
3. **Design deletion at the same time as creation.** Every store that
   gains a write path needs a delete path, including caches, search
   indexes, backups, and downstream copies. Deletion designed later is
   deletion that misses places (see right-to-erasure).
4. **Keep the blast radius small.** Segment personal data away from
   general application data, restrict who and what can query it, and
   log access to it (see authz-design, audit-logging).
5. **Involve review early for high-risk processing.** Sensitive
   categories, large-scale profiling, and novel uses of data need a
   documented assessment before build, not after (see
   privacy-impact-assessment).
6. **Write down the decisions.** A short record of what you chose and
   why answers the audit question years later when everyone involved
   has moved on (see architecture-decision-records).

## Boundaries

- Privacy by design is an engineering discipline, not legal advice;
  lawful basis and jurisdictional questions belong to counsel.
- It reduces risk rather than eliminating it, and it does not replace
  security controls for the data you legitimately hold.
- A design decision only holds if it survives later features, so it
  needs periodic re-checking rather than one-time approval.
