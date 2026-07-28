---
name: generate-pdf-document
description: Specify a generated PDF that survives variable content, with fonts, page breaks, and accessibility handled.
variables:
  - "{document}: what the document is, its sections, and what varies per instance"
  - "{context}: how it is generated, at what volume, and who reads it"
settings: "Temperature 0.3."
---

Specify PDF generation for:

{document}

Context: {context}

Use pdf-generation and print-ready-output where it will be printed.

Produce:
- The approach: HTML rendering or a PDF library, with the reason.
- Page layout, margins, and what repeats on each page.
- How variable-length content is handled, including table page breaks.
- Fonts and how they are embedded.
- Accessibility: tagged structure and reading order.
- Where generation happens, and whether it is synchronous.
- What is stored: the rendered file as well as the data.

Rules: design for content that overflows, since fixed positioning breaks
first. Embed fonts explicitly. Store the rendered document, since
regenerating from current templates produces something different. State
the page size and whether it is for print or screen.
