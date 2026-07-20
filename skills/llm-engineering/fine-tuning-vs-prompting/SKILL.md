---
name: fine-tuning-vs-prompting
description: Decide between prompting, retrieval, and fine-tuning with eval-first discipline and honest data requirements. Use when someone proposes fine-tuning or a prompt has hit its ceiling.
---

# Fine-tuning vs prompting

The escalation ladder is prompting, then retrieval, then fine-tuning:
each step up costs more to build and maintain. Most "we need to
fine-tune" conversations end two rungs lower once the eval suite
exists; build it first, then climb only while the numbers demand.

## Method

1. **Exhaust prompting with measurement.** Clear
   instructions, few-shot examples chosen from real cases,
   decomposition into smaller calls (see
   prompt-engineering): iterated against the eval suite
   (see llm-eval-design: without it, "prompting failed" is
   an anecdote). Most quality gaps close here; the ceiling
   is real but higher than the first frustrated afternoon
   suggests.
2. **Route knowledge problems to retrieval.** Missing,
   private, or fresh facts are RAG's job (see
   rag-pipeline): retrieval updates instantly, cites
   sources, and costs no training run. Fine-tuning is the
   wrong tool for knowledge: models fine-tuned on facts
   hallucinate confidently at the gaps, and every content
   update means retraining (see embeddings-selection for
   the retrieval quality levers).
3. **Fine-tune for form, not facts.** The legitimate
   targets: consistent style/persona at scale, reliable
   structured formats a schema cannot fully constrain
   (see structured-output first), domain-dialect fluency
   (specialized notation), latency/cost (distilling a big
   model's behavior on your narrow task into a small one:
   see llm-cost-latency's tiering: fine-tuning is how
   the small tier passes the bar), and instruction-
   following patterns prompts keep failing to pin.
4. **Cost the data honestly before committing.** Hundreds
   to thousands of high-quality input/output pairs shaped
   exactly like production traffic: curated, deduplicated,
   quality-filtered (garbage pairs teach garbage:
   see feature-engineering's leakage vigilance
   transposed): plus a held-out eval slice never trained
   on (see train-test-discipline). If the org cannot
   produce that dataset, it cannot fine-tune, whatever
   the enthusiasm.
5. **Run the tune as an experiment.** Baseline the
   prompted incumbent on the eval suite, train
   (parameter-efficient LoRA-class first: cheaper,
   swappable), compare per-slice, and check the
   side-effects: fine-tunes drift on out-of-distribution
   inputs and can degrade general capability and safety
   behaviors: eval beyond the target task (see
   model-evaluation's uncertainty and slicing, and
   llm-guardrails' refusal sets).
6. **Budget the maintenance tail.** A fine-tune couples
   you to a base model snapshot: provider model
   retirements force retrains, every dataset improvement
   is a new run and eval cycle, and prompt changes
   interact with tuned behavior (see
   experiment-tracking for keeping the runs honest,
   model-deployment for the rollout machinery). The
   ladder's lower rungs have no such tail: which is why
   the decision defaults downward.

## Boundaries

- Hybrids are normal: fine-tuned format + RAG facts +
  a system prompt is a common production stack; the
  decision is per capability gap, not one global
  choice.
- RLHF-class preference tuning and full pretraining are
  different undertakings with different data and teams;
  this skill covers supervised fine-tuning's decision.
- Provider fine-tuning inherits the provider's terms
  (data use, model access, portability); check the exit
  path before uploading your dataset (see
  managed-vs-selfhosted's lock-in grading).
