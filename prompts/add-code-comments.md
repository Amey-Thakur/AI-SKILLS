---
name: add-code-comments
description: Add docstrings and comments that explain why, matching the code's existing style, without noise.
variables:
  - "{code}: the code to document"
  - "{style}: docstring convention (JSDoc, Google, NumPy, rustdoc), if any"
settings: "Temperature 0.2-0.4."
---

Add documentation to this code:

{code}

Docstring style: {style}

Rules:
- Public functions, classes, and modules get a docstring: what it does,
  parameters, return, and errors/exceptions it can raise. Follow the
  requested style convention exactly.
- Inline comments explain WHY, never what: the non-obvious reason, the
  constraint, the gotcha, the reference. Do not comment what the code plainly
  says (`i++ // increment i` is noise).
- Match the existing comment density and voice; do not over-comment clean
  self-explanatory code.
- State constraints and assumptions the code depends on but cannot express
  (units, invariants, thread-safety, ordering requirements).
- Do not change the code itself; only add documentation. If a comment is hard
  to write because the code is unclear, note that the code (not the comment)
  is the thing to fix.

Return the documented code.
