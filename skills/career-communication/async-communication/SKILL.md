---
name: async-communication
description: Run write-first collaboration with the right document types, response-time norms, and meetings reserved for what writing cannot do. Use when improving distributed-team communication or cutting meeting load.
---

# Async communication

Async trades immediacy for quality and inclusion: written thought
over interrupt-driven reaction, timezone fairness over hallway
advantage. It works only when the norms are explicit; "we use Slack"
is not a communication design.

## Method

1. **Sort by half-life, then choose the channel.** Decisions,
   designs, and status that someone will need in a month go
   in durable, searchable homes (docs, ADRs, PR
   descriptions: see architecture-decision-records,
   status-updates); chat is for coordination with a
   half-life of hours: anything decided in a thread gets
   promoted to the durable home *by the decider* (see
   decision-journals). Chat-as-archive is where
   organizational memory goes to die.
2. **Write to be actioned, not just read.** Lead with the
   ask and the deadline ("Decision needed by Thu: A or B,
   context below": see exec-briefing's
   bottom-line-up-front); structure for skimming (headings,
   bold leads: see technical-writing); name the specific
   people who must respond: "thoughts, anyone?" addressed
   to a channel is a request nobody owns (see
   code-owners' explicitness).
3. **Set response-time norms per channel, then respect
   them.** E.g.: chat mentions ~4 working hours, docs and
   review requests ~24-48 hours, urgent = phone/page (see
   alerting-design: paging is a contract, not a mood):
   published, so silence has meaning and nobody camps in
   their inbox performing availability. Focus time is the
   *point* of async; norms that require constant monitoring
   rebuilt the open-plan office in software.
4. **Disagree in documents with structure.** Comment threads
   on the artifact, positions with reasons, and a named
   decider with a deadline (see rfc-process,
   design-critique's steelmanning); two full round-trips of
   written disagreement without convergence is the trigger
   for a synchronous call: with the outcome written back to
   the doc. Async absolutism turns resolvable conflicts
   into week-long comment wars.
5. **Reserve meetings for their real work.** Genuine
   synchronous value: contentious decisions after written
   context failed, creative jamming, relationship building,
   delivering hard news (see giving-feedback's stakes
   calibration). Every meeting: agenda and pre-read before
   (no pre-read, no meeting), notes and decisions after, to
   the durable home (see one-on-one-meetings excepted:
   relationships are the agenda). Kill status meetings that
   a written update replaces (see status-updates).
6. **Design for the timezones you actually span.** A
   4-hour-overlap team can lean on same-day threads; a
   12-hour-split team hands work off with written state
   ("where I stopped, what is blocked, what I need":
   see oncall-handoff's discipline daily-sized): decisions
   structured so a colleague can act without waking you.
   Recorded walkthroughs (5-minute videos) carry nuance
   that text drops, at async's price.

## Boundaries

- Async amplifies writing skill gaps; invest in the
  team's writing (see technical-writing) or the loudest
  writers replace the loudest talkers as the new
  unfairness.
- Emotional and interpersonal repair does not compress
  into text; escalate to voice early when tone starts
  curdling (misread intent compounds per message).
- Fully-async cultures still need scheduled human
  contact; the norm protects focus, not isolation
  (see one-on-one-meetings' protected slot).
