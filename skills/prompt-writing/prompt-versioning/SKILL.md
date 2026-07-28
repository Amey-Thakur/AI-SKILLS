---
name: prompt-versioning
description: Manage prompts as versioned artefacts with review, rollback, and a record of what changed and why. Use when prompts affect production behaviour and more than one person edits them.
---

# Prompt versioning

A prompt edit changes product behaviour for every user immediately, with
none of the safeguards code changes get. Versioning applies those
safeguards: review, history, rollback, and knowing which version
produced which output.

## Method

1. **Keep prompts in version control.** Not in a database field edited
   through an admin panel, since that has no history, review, or
   rollback.
2. **Review prompt changes like code.** A second pair of eyes catches
   the instruction that will misfire on cases the author did not
   consider (see code-review).
3. **Record the version with every output.** When investigating a bad
   response, knowing which prompt produced it is the first question
   (see audit-logging).
4. **Test before merge.** The case set runs in the pipeline, and a
   regression blocks the change (see prompt-testing).
5. **Keep rollback immediate.** Reverting to the previous prompt should
   be as fast as reverting code, because prompt regressions are found in
   production.
6. **Write the intent in the commit.** What behaviour this change is
   meant to alter, which is what makes the history useful later.
7. **Pin the model version alongside.** A prompt is tuned to a model,
   and the pairing is what reproduces behaviour (pin the model
   identifier, never a floating alias).

## Boundaries

Versioning tracks prompts; it cannot version the model behind them,
which providers update independently. Prompts embedded in application
code need extraction before this is practical. Non-determinism means an
identical prompt and model can still produce different output.
