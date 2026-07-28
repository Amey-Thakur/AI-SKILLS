---
name: executive-summary
description: Compress a long document into a summary that stands alone and leads with the conclusion.
variables:
  - "{document}: the full document or its key content"
  - "{reader}: who reads it and what decision they face"
settings: "Temperature 0.3."
---

Write an executive summary of:

{document}

Reader: {reader}

Use exec-one-pager and report-writing.

Produce:
- The conclusion or recommendation, first.
- The three or four points that support it.
- The numbers that matter, with their basis.
- Risks and what is uncertain.
- The decision or action requested.

Rules: it must be readable alone, without the full document. Lead with
the conclusion rather than the background. Include what is uncertain,
since a summary that hides caveats misleads. Keep to one page. Do not
introduce anything not in the source.
