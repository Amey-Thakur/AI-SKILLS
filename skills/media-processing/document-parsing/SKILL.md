---
name: document-parsing
description: Extract text and structure from PDFs, office documents, and scans reliably enough to search, index, or summarise. Use when users upload documents whose contents the product must understand.
---

# Document parsing

Extracting text from documents is deceptively hard. A PDF may be text,
images of text, or both, with reading order that does not match visual
order. Robust parsing means detecting what you have and routing
accordingly rather than applying one extractor to everything.

## Method

1. **Detect the document type properly.** By content inspection rather
   than extension, since the extension is frequently wrong and
   occasionally hostile (see file-upload-safety).
2. **Try text extraction before OCR.** Embedded text is accurate and
   cheap; OCR is neither. Falling back only when extraction yields
   little is the right order.
3. **Preserve structure, not just characters.** Headings, lists, tables,
   and page boundaries carry meaning that a flat string discards, and
   downstream chunking depends on it.
4. **Handle multi-column and mixed layouts explicitly.** Naive
   extraction interleaves columns into nonsense, which is invisible
   until someone reads the output.
5. **Treat tables as a separate problem.** They rarely survive
   generic extraction and often need a dedicated approach or a
   documented limitation.
6. **Sandbox and resource-limit the parser.** Document parsers are a
   classic exploit surface, and malformed files can consume unbounded
   memory and time.
7. **Record extraction confidence.** Downstream features should know
   whether they are working with clean text or noisy OCR output (see
   full-text-search-design).

## Boundaries

Extraction quality is bounded by the source: a poor scan yields poor
text however good the pipeline. Complex layouts, handwriting, and
equations are unreliable and should be flagged rather than silently
mangled. Parsed content inherits the source document's confidentiality
(see data-classification).
