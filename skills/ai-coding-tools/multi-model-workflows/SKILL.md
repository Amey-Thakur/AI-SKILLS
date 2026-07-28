---
name: multi-model-workflows
description: Use more than one model or tool deliberately, playing to their differences rather than switching at random. Use when one model is consistently weak on part of your workflow.
---

# Multi-model workflows

Models differ in speed, cost, context handling, and behaviour on
specific task types. Using several deliberately can beat any single one,
provided the split is based on measurement rather than impression.

## Method

1. **Measure before splitting.** A defined comparison on your own tasks
   is the only reliable basis, since general benchmarks may not reflect
   your work (see agent-eval-design).
2. **Split by task type, not by preference.** Long-context
   summarisation, precise code editing, and open-ended design have
   genuinely different demands (see agent-specialist-router).
3. **Keep prompts portable.** Instructions tuned to one model's quirks
   do not transfer, so favour clear structure over model-specific tricks
   (see prompt-structure).
4. **Use a second model for verification.** An independent model
   reviewing another's output catches errors a self-review will not (see
   agent-generate-and-verify).
5. **Standardise the handoff format.** Structured intermediate output
   lets tools be swapped without rewriting the workflow (see
   agent-handoff-protocol).
6. **Watch the coordination overhead.** Moving context between tools
   costs tokens and time and can exceed the quality gain.
7. **Re-evaluate periodically.** Model capabilities change quickly, and
   a split decided a year ago is probably wrong now (see
   prompt-testing).

## Boundaries

Multiple models mean multiple failure modes, prompt sets, and bills to
maintain. Differences narrow as models improve, which erodes the
justification. Consistency of behaviour within one workflow has value
that switching sacrifices.
