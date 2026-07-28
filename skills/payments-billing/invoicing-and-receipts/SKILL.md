---
name: invoicing-and-receipts
description: Produce invoices and receipts that are accurate, immutable, and contain what tax authorities and customers require. Use when billing businesses or operating where invoices are legally regulated.
---

# Invoicing and receipts

An invoice is a legal record, not a formatted email. It must be
accurate, sequential in many jurisdictions, and never silently edited
after issue. Getting this wrong is discovered during an audit rather
than in testing.

## Method

1. **Treat an issued invoice as immutable.** Corrections happen through
   a credit note and a new invoice, never by editing the original.
   Mutable invoices destroy the audit trail.
2. **Include what the jurisdiction requires.** Legal entity names and
   addresses, tax identifiers, invoice number, dates, line items, tax
   breakdown, and currency. Requirements differ by country and are not
   optional.
3. **Use a gapless sequence where required.** Several jurisdictions
   require unbroken numbering, which means the sequence cannot come from
   a source that skips on failure.
4. **Show tax as its own line with the rate applied.** Customers need it
   to reclaim, and authorities need it to verify (see
   tax-calculation).
5. **Separate the receipt from the invoice.** A receipt confirms payment
   and an invoice requests it; conflating them confuses business
   customers and accounting alike.
6. **Store the rendered document, not just the data.** Regenerating an
   old invoice from current templates and tax rules produces a document
   that differs from the one issued.
7. **Make historical invoices retrievable by the customer.** Self-serve
   access removes a large share of billing support requests.

## Boundaries

- Invoice requirements are legal and jurisdiction-specific; this is not
  tax or legal advice and needs local qualified input.
- Retention periods are set by law, often several years, and override
  your data minimisation instincts (see right-to-erasure).
- E-invoicing mandates in some countries require submission in
  specified formats to government systems.
