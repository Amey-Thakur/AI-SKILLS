---
name: subject-access-requests
description: Answer a request for a copy of someone's data completely, on time, and without exposing anyone else. Use when building an export path or responding to an access request.
---

# Subject access requests

An access request asks a simple question that most systems answer
badly: what do you hold about me. Answering means finding every store,
assembling it in a form a person can read, and removing other people
who appear in the same records.

## Method

1. **Verify identity proportionately.** Enough to be confident, not so
   much that you collect new sensitive data to satisfy a request. An
   authenticated session is usually the strongest and cheapest proof.
2. **Search every store the map lists.** Primary database, warehouse,
   logs, support tickets, email, and vendors all hold personal data,
   and an export covering only the main database is incomplete (see
   data-lineage, right-to-erasure).
3. **Return something a person can actually read.** A machine dump with
   internal codes technically complies and practically fails; include
   labels, dates, and a short explanation of each section.
4. **Redact third parties.** Records mentioning other people, internal
   authors, or another customer's data must be removed or masked,
   because an access right is not a right to someone else's data.
5. **Automate the common path.** A self-serve export in the product
   handles most requests instantly and reduces the manual work to the
   unusual cases, which is where the deadline risk lives.
6. **Track the clock and the completeness.** Requests have statutory
   deadlines, so record when each arrived, what was searched, and when
   it was answered (see audit-logging).

## Boundaries

- Access rights differ by jurisdiction in scope, deadline, and
  exemptions, so the legal parameters are not an engineering choice.
- Some material is legitimately withheld, including trade secrets and
  other people's data, and deciding that is a review step rather than
  an automated one.
- An export is a snapshot; it does not commit you to keeping the data
  longer than your retention policy allows.
