---
name: conversation-design
description: Design multi-turn conversational systems with state tracking, memory injection, topic handling, and repair. Use when building chat assistants or fixing bots that forget, drift, or trap users.
---

# Conversation design

A conversation is a state machine the user cannot see. The design work
is making that state coherent across turns: what the system remembers,
how it handles topic shifts, and how it recovers when it or the user
gets lost.

## Method

1. **Separate durable state from turn context.** Track the
   conversation's structured state explicitly (current goal,
   collected slots, decisions made, user identity) rather than
   trusting the model to re-derive it from raw history every
   turn; inject that state as compact facts (see
   context-window-management's pin rule, agent-memory for
   cross-session persistence). History compaction then cannot
   lose the load-bearing facts.
2. **Handle topic shifts as first-class events.** Users
   abandon, digress, and return: detect topic changes,
   preserve the interrupted task's state for resumption
   ("we were setting up your export, want to finish?"), and
   do not force linear flows on non-linear humans. Rigid
   scripts that ignore "actually, different question" are the
   signature of bots users escape from.
3. **Ground each turn in the right context.** Retrieve
   per-turn what this turn needs (see rag-pipeline), carry
   forward references ("it", "that one") by resolving them
   against tracked state, and re-inject constraints the model
   drifts from over long conversations (tone, role, refusal
   rules: see llm-guardrails). Long chats erode instruction-
   following; periodic re-grounding is the fix.
4. **Design repair explicitly.** Misunderstanding recovery
   (the user says "no, I meant X": update state, do not
   restart), clarification when genuinely ambiguous (ask,
   do not guess and barrel on), and graceful "I don't know /
   let me get a human" paths (see llm-guardrails' escalation).
   The measure of a conversation system is how well it
   handles being wrong, not how well it handles the happy
   path.
5. **Bound the conversation's power at each turn.** Actions
   the conversation can trigger go through the same
   validation and authz as any request (see tool-use-design,
   authz-design): a user (or an injected instruction in
   retrieved content) must not talk the system into
   privileged actions it would refuse directly. The dialogue
   is untrusted input end to end.
6. **Evaluate multi-turn, not single-turn.** Test whole
   conversations: state carried correctly across turns,
   corrections honored, topic switches survived, repair
   working (see llm-eval-design's multi-turn cases); mine
   real transcripts for the failure patterns (see
   llm-observability) and turn each into a scripted eval.
   Single-turn QA evals pass while the actual conversational
   experience fails.

## Boundaries

- Not everything should be a conversation: a form is faster
  than a chat for structured input, and forcing dialogue
  onto transactional tasks adds turns users resent (see
  mobile-input-ux's field-cutting: same instinct).
- Long conversations hit context limits; the compaction and
  state-externalization discipline (see
  context-window-management) is the prerequisite, not an
  afterthought.
- Voice adds latency, barge-in, and ASR-error handling on
  top of these text concerns; the state and repair design
  transfers, the turn-taking mechanics do not.
