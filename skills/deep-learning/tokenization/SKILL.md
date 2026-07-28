---
name: tokenization
description: Understand how text becomes tokens, and why token boundaries explain model behaviour on numbers, code, and non-English text. Use when a model behaves strangely on specific strings or costs more than expected.
---

# Tokenization

Models do not see characters or words; they see tokens produced by a
learned vocabulary. A surprising amount of model behaviour, including
arithmetic errors and cost differences between languages, follows
directly from where the boundaries fall.

## Method

1. **Know that tokens are subwords, not words.** Common words are one
   token, rare words split into several, and the split is learned rather
   than linguistic.
2. **Expect worse behaviour on badly tokenized content.** Numbers split
   inconsistently, which is part of why arithmetic is unreliable, and
   unusual identifiers fragment into many tokens.
3. **Account for language cost differences.** Text in languages
   under-represented in the vocabulary uses several times more tokens
   for the same content, affecting both cost and effective context (see
   character-encoding).
4. **Measure context in tokens, not characters.** A character estimate
   is a rough approximation that fails exactly when the content is
   unusual (see context-window-management).
5. **Watch whitespace and leading spaces.** They are part of tokens, so
   a word with and without a preceding space are different tokens, which
   affects prompting and matching.
6. **Understand vocabulary boundaries in fine-tuning.** Domain terms
   that fragment badly can justify vocabulary extension, at the cost of
   retraining embeddings.
7. **Inspect tokenization when debugging.** Looking at the actual token
   split explains behaviour that reasoning about the text cannot.

## Boundaries

Tokenizers differ between model families, so token counts and behaviour
do not transfer. Tokenization is fixed at training time and cannot be
changed for an existing model. It explains some failures and is not the
cause of most reasoning errors.
