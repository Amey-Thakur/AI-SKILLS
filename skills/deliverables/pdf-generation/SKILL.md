---
name: pdf-generation
description: Produce PDFs programmatically with correct fonts, page breaks, and accessibility, from templates that survive content changes. Use when generating invoices, reports, certificates, or statements.
---

# PDF generation

PDF is a fixed-layout format, which makes it excellent for documents
that must look identical everywhere and awkward for content whose length
varies. Most generation bugs are page breaks and fonts.

## Method

1. **Choose the approach by document complexity.** HTML rendered to PDF
   suits document-like output and reuses web skills; a PDF library suits
   precise layout and forms.
2. **Embed fonts explicitly.** A font available on the developer's
   machine and missing on the server produces silently substituted
   output (see format-selection).
3. **Design for variable content length.** Tables that span pages need
   repeated headers, and fixed positioning breaks the moment content
   grows (see text-expansion-layout).
4. **Control page breaks deliberately.** Keep headings with their
   content and avoid orphaned rows, since default breaking produces
   documents that look careless.
5. **Generate asynchronously for anything large.** PDF rendering is slow
   enough that it belongs in a queue rather than a request (see
   media-processing-queue).
6. **Make it accessible where it matters.** Tagged structure, reading
   order, and text rather than images of text, which is a legal
   requirement in many contexts (see accessibility-review).
7. **Store the rendered file, not just the data.** Regenerating an old
   document from current templates produces something different from
   what was issued (see invoicing-and-receipts).

## Boundaries

PDF is fixed layout and reads badly on small screens, so it is often the
wrong choice for content that could be a web page. Rendering engines
differ in support, particularly for newer CSS. Extracting data back out
is unreliable (see document-parsing).
