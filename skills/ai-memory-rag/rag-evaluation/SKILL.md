---
name: rag-evaluation
description: Measure retrieval and generation separately against a judged set, so you know whether a wrong answer came from the search or the model. Use when a RAG system is unreliable and every fix is a guess.
---

# RAG evaluation

A RAG system fails in two distinct places: it retrieved the wrong
material, or it retrieved the right material and answered badly.
Evaluating end to end tells you it is broken; evaluating the stages
separately tells you where.

## Method

1. **Build a judged set from real questions.** Actual user questions
   with the passages that answer them and an acceptable answer,
   assembled once and maintained.
2. **Measure retrieval independently.** Was the answering passage in the
   top results? This single number isolates half the system and is the
   cheapest to improve (see relevance-tuning).
3. **Measure faithfulness separately.** Given the retrieved context, is
   the answer supported by it? An unfaithful answer with correct
   retrieval is a generation problem.
4. **Check for the confident empty case.** When nothing relevant was
   retrieved, does the system say so or invent an answer? This is the
   most damaging failure and the least measured.
5. **Test the questions your corpus cannot answer.** A system that
   refuses appropriately is working correctly, and a judged set of only
   answerable questions never tests it.
6. **Re-run on every change.** Chunking, embedding model, prompt, and
   reranker all interact, and a change that improves one stage can
   degrade the whole (see agent-eval-design).
7. **Track disagreement with human judgement.** Automated scoring drifts
   from what users consider a good answer, so periodic human review
   calibrates it.

## Boundaries

Evaluation measures the cases in the judged set, which ages as the
corpus and the questions change. Automated faithfulness scoring is
imperfect and can be gamed by hedging. Good scores on a small set do not
generalise to a long tail of unusual questions.
