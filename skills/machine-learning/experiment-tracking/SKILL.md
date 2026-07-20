---
name: experiment-tracking
description: Record every training run's code, data, config, and results so any model is reproducible and comparisons are honest. Use when setting up ML experiment infrastructure or untangling which run produced the prod model.
---

# Experiment tracking

The test of tracking: given the model file in production, can you name
the exact code, data, and config that produced it, and rerun it? If
not, you have artifacts, not experiments.

## Method

1. **Log the full provenance tuple per run.** Code version (commit
   hash, plus a dirty-tree warning), data version (dataset snapshot
   id or content hash, never "the table as of whenever"), full
   resolved config (every hyperparameter and feature flag, not just
   the ones you changed), environment (library versions, hardware),
   and seeds. Automate capture in the training entrypoint; manual
   logging lasts two weeks.
2. **Version data like code.** Immutable dataset snapshots
   (partition-pinned queries, content-addressed files, or a data
   versioning tool) referenced by id; "same query, different day"
   is a different dataset (see data-pipeline-design). The most common
   irreproducibility is silent upstream data change wearing the same
   table name.
3. **Log metrics with their evaluation context.** The metric, the
   split it was computed on, the slice results, and the threshold
   (see model-evaluation); training curves for iterative models.
   A bare "auc: 0.91" without which-split is future confusion,
   possibly future fraud.
4. **Store artifacts, register the winners.** Model binaries,
   preprocessing/pipeline objects, feature lists (see
   feature-engineering versioning), and evaluation reports attached
   to the run; promotion to staging/production goes through a model
   registry entry pointing back at its run. The registry-to-run link
   is what makes "what is prod running" a lookup instead of a
   forensic project (see model-deployment).
5. **Make comparisons apples-to-apples by construction.** Compare
   runs only on identical data version + evaluation protocol; the
   tracking UI's job is filtering runs by those fields. When the
   dataset or metric changes, rerun the baseline under the new regime
   rather than comparing across regimes (see ml-baselines).
6. **Name and note for future archaeologists.** Run names carry the
   hypothesis ("wider-window-features"), a one-line "why" note, and
   tags for the project/milestone; the deleted-after-lunch experiment
   you cannot recall is a week someone re-spends. Keep failed runs;
   negative results steer the search (see decision-journals for the
   same discipline on decisions).

## Boundaries

- Tracking records what happened; it does not bless it. A tracked run
  with a leaky split reproduces the leak perfectly (see
  train-test-discipline).
- Notebook-first exploration resists capture; graduate anything
  worth comparing into the tracked training entrypoint, and treat
  untracked results as anecdotes.
- Tool choice (MLflow/W&B-class) matters less than the discipline;
  adopt the lightest tool the team will actually keep using (see
  managed-vs-selfhosted).
