---
name: spreadsheet-collaboration
description: Share workbooks so several people can work without overwriting each other or creating competing versions. Use when more than one person edits the same spreadsheet.
---

# Spreadsheet collaboration

Spreadsheets are single-owner tools used collaboratively, which produces
the familiar failure of three files with similar names and different
numbers. Structure and conventions prevent most of it.

## Method

1. **Keep one authoritative copy in shared storage.** Emailed
   attachments fork immediately, and reconciling forks is manual and
   error-prone.
2. **Protect structure and formulas.** Lock everything except the input
   cells so collaborators cannot accidentally overwrite calculations
   (see data-validation-rules).
3. **Separate input areas per person where possible.** Different sheets
   or clearly marked sections reduce simultaneous edit conflicts.
4. **Use comments for discussion.** Notes in cells beat a parallel email
   thread that nobody can find later (see comments-and-annotations).
5. **Establish a version convention.** Either rely on the platform's
   history or use a dated naming scheme, and never both inconsistently.
6. **Record who owns the file.** An unowned shared workbook decays and
   nobody knows whether its numbers are current.
7. **Snapshot before major changes.** A copy before restructuring is the
   cheapest possible insurance (see version-history-ux).

## Boundaries

Concurrent editing support varies substantially between platforms and
desktop versions. Spreadsheets lack the access control and audit trail
of an application, which matters for sensitive data (see
data-classification). Heavy collaboration is a signal the process needs
a real system.
