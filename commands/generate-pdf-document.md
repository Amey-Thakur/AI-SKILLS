---
description: "Specify a generated PDF that survives variable content, with fonts, page breaks, and accessibility handled."
argument-hint: "[document]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
