---
name: spreadsheet-automation
description: Automate repetitive spreadsheet work with scripts, knowing when the task has outgrown a spreadsheet entirely. Use when the same manual steps are repeated on a schedule.
---

# Spreadsheet automation

Automation removes the repetitive part of spreadsheet work and can
entrench a process that should have moved to a real system. Both
considerations belong in the decision.

## Method

1. **Automate the repeated, not the one-off.** The setup cost only pays
   back on recurring work, and most spreadsheet tasks are genuinely one
   off.
2. **Prefer built-in features to scripting.** Power Query, tables, and
   dynamic formulas solve most problems without code that only one
   person understands (see power-query).
3. **Keep scripts small and named clearly.** Long recorded macros are
   unmaintainable, and rewriting the recording into explicit steps pays
   for itself.
4. **Never hardcode ranges.** Scripts referencing fixed cells break the
   moment a row is inserted, which is the most common macro failure.
5. **Make scripts idempotent.** Running twice should not duplicate work,
   since a partial run followed by a rerun is the normal case (see
   idempotency).
6. **Handle errors visibly.** A script failing silently mid-way leaves
   the sheet in an unknown state, which is worse than stopping loudly.
7. **Recognise when to leave the spreadsheet.** Multi-user, scheduled,
   or data-critical processes belong in an application (see
   spreadsheet-modeling).

## Boundaries

Macro security restrictions block scripts in many organisations. Scripts
are typically written by one person and become unowned when they leave.
Automation of a bad process makes it faster rather than better (see
operations-management).
