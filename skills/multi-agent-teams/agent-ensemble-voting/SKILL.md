---
name: agent-ensemble-voting
description: Run the same task several times independently and combine the results by agreement, to damp variance on judgement calls. Use when output varies between runs and being consistently right matters more than being fast.
---

# Agent ensemble voting

Model output varies between runs, and on judgement calls that variance
is the problem. Running independently several times and taking agreement
converts an unstable single answer into a stabler one, with a useful
by-product: disagreement flags the hard cases.

## Method

1. **Make the runs genuinely independent.** Separate contexts, no shared
   history. Runs that see each other's answers converge on the first
   one rather than voting.
2. **Vary the approach, not just the seed.** Different framings or
   lenses find different errors; identical prompts mostly reproduce the
   same mistake (see agent-generate-and-verify).
3. **Use an odd number for binary decisions.** Three is usually enough,
   five where consequence is high. Beyond that the cost grows faster
   than the accuracy.
4. **Treat disagreement as the signal it is.** A split vote means the
   case is genuinely ambiguous and often deserves a human rather than a
   majority verdict.
5. **Vote on structured outputs, not prose.** Agreement is checkable on
   a classification or a number and nearly meaningless on two
   paragraphs of text.
6. **Require majority rather than plurality on important calls.** A
   two-to-one win on a consequential decision is weak evidence.
7. **Record the vote distribution, not just the winner.** Unanimity and
   a bare majority carry very different confidence and should be treated
   differently downstream.

## Boundaries

Voting reduces variance, not bias: if the model is systematically wrong
about something, every run agrees confidently. Cost multiplies by the
ensemble size. It suits decisions with a checkable answer and does not
work for generative tasks where there is no single right output.
