---
name: llm-guardrails
description: Layer input filtering, output validation, injection defense, and human escalation around LLM features. Use when an LLM system faces untrusted input or its outputs carry real-world consequences.
---

# LLM guardrails

Guardrails assume the model will sometimes be wrong, manipulated, or
both, and make the *system* safe anyway. The architecture is defense
in depth: filter what enters, validate what leaves, privilege-limit
what the model can touch, and route the irreducible risk to humans.

## Method

1. **Treat all model-visible content as untrusted.** User
   messages, retrieved documents, tool results, and web
   content can all carry injected instructions
   ("ignore your instructions and..."): the defense is
   structural, not politeness: delimit data from
   instructions in the prompt, strip/flag
   instruction-shaped content in retrieved data, and
   never let model output *directly* trigger privileged
   actions (see tool-use-design's boundary: server-side
   authz decides, the model only requests).
2. **Bound the blast radius by construction.** The
   agent's credentials scope to the task (see
   least-privilege, iam-design); destructive tools
   require confirmation or policy approval (see
   automation-guardrails); spending, sending, and
   deleting have hard caps and rate limits independent
   of model judgment (see rate-limiting). Assume
   injection *succeeds* and ask what the attacker then
   controls: that inventory is your real exposure
   (see threat-modeling).
3. **Filter inputs proportionate to the surface.**
   Moderation classifiers for abuse categories on public
   surfaces; jailbreak-pattern detection where stakes
   justify it; size/rate limits always (see
   request-validation): tuned against false positives,
   because over-blocking legitimate users is its own
   failure (measure both directions: see
   llm-eval-design's should-not-refuse sets).
4. **Validate outputs before they act or ship.**
   Structured outputs against schema (see
   structured-output), citations against sources
   (groundedness checks for RAG: see rag-pipeline),
   policy checks on generated content (PII leakage:
   see pii-handling; unsafe categories), and
   plausibility bounds on extracted values: with a
   defined action per failure (regenerate, redact,
   escalate: see api-error-responses' decision
   discipline).
5. **Design the human escalation path.** Confidence
   thresholds, sensitive-topic triggers, user requests
   for a human, and repeated failure loops route to
   people: with context handed over (conversation
   summary, what was attempted: see
   agent-handoff-protocol's contract, human edition)
   and honest UI about the transition (see
   conversation-design). Systems without an escape
   hatch convert edge cases into incidents.
6. **Red-team and monitor continuously.** Adversarial
   testing before launch and on a cadence (injection
   attempts through every input channel including
   documents and tool results: see
   penetration-test-prep's mindset); production
   monitoring for guardrail trigger rates, novel
   attack patterns, and refusal drift (see
   llm-observability, security-incident-response for
   when one lands); every confirmed bypass becomes an
   eval case (see llm-eval-design's regression loop).

## Boundaries

- Guardrails reduce and contain risk; they do not
  produce a safe-by-construction system: capability
  decisions (what the system can do at all) dominate
  any filter stack, and some deployments are wrong at
  the capability level.
- Over-restriction is a real cost: measured
  false-refusal rates and user friction belong in the
  same review as bypass rates (see
  product-metrics' guardrail symmetry).
- Compliance regimes (privacy, sector rules) set
  floors that engineering judgment cannot waive;
  involve the owning functions early (see
  pii-handling, data-retention).
