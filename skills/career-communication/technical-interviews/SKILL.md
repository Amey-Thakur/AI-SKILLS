---
name: technical-interviews
description: Prepare for and perform in technical interviews with a practice system, aloud reasoning, and honest calibration. Use when preparing for coding, system design, or behavioral rounds.
---

# Technical interviews

Interviews measure a narrow skill: solving problems while narrating,
under time, for a stranger. That skill is trainable, and it is
adjacent to (not identical with) engineering ability: train it
deliberately.

## Method

1. **Map the loop, then allocate practice.** Get the actual
   format (coding rounds, system design, behavioral, domain
   deep-dive) from the recruiter and public interview guides;
   spend practice proportional to weight and your gap, not
   comfort: most engineers over-practice coding and
   under-practice behavioral stories and design narration.
2. **Practice coding as performance, not puzzles.** Timed
   sessions, talking aloud from the first minute: restate
   the problem, work an example by hand, state the brute
   force and its complexity, then improve (see
   big-o-in-practice); code cleanly with real names, then
   *test on paper* against edges before declaring done (see
   off-by-one-errors' habits). Pattern fluency (two
   pointers, BFS/DFS, hash-map tradeoffs, dynamic
   programming basics) over problem-count grinding: quality
   reps with review of your misses (see
   ml-error-analysis's ethic, applied to yourself).
3. **Run system design as a structured conversation.**
   Requirements and scale first (ask, do not assume:
   see scalability-planning's load-model-first),
   API and data model, high-level boxes, then deep-dive
   where the interviewer steers; name tradeoffs at every
   choice ("SQL for the transactional core, a queue to
   decouple the spike": see consistency-models,
   message-queues for the vocabulary). The evaluated skill
   is *driving* the design with reasons, not reciting a
   memorized architecture.
4. **Bank behavioral stories with structure.** Six to eight
   real stories (conflict, failure, leadership, ambiguity,
   impact) in situation-action-result shape with numbers
   and *your* specific role (see giving-feedback and
   incident-postmortem material: your best stories live
   there); practice them aloud until compact. "Tell me
   about a time" answers invented live ramble; banked ones
   land.
5. **Clarify before solving, always.** Inputs, scale,
   edge expectations, what "done" means: in every round;
   interviewers deliberately under-specify to see whether
   you discover requirements or charge at assumptions
   (see product-discovery's instinct, compressed to five
   minutes). Thinking silence is fine when narrated
   ("give me thirty seconds to consider the data
   structure").
6. **Calibrate after every round.** Write down the
   questions, where you struggled, what you would repeat:
   while fresh (see decision-journals); rejection signal
   is noisy (fit, calibration bars, luck), so grade
   yourself on process, iterate the weak round type, and
   keep a steady pipeline rather than serial one-company
   hopes (see engineering-resume for the top of that
   funnel).

## Boundaries

- Interview skill and job skill overlap imperfectly in
  both directions; do not let rejection redefine your
  ability, and do not let offer success excuse skipping
  real-skill growth (see mentoring-engineers).
- Company-specific formats (pair-programming on real
  code, take-homes, bar-raiser rounds: see
  bar-raiser-interviewing from the other chair) have
  their own preparation; reconnaissance beats generic
  grinding.
- Negotiation begins after the loop and is its own skill
  (see salary-negotiation); do not negotiate during
  technical rounds.
