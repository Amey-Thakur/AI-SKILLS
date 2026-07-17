---
name: meeting-minutes
description: Turn a transcript or rough notes into minutes people actually consult - decisions, actions, and open questions first.
variables:
  - "{notes}: the transcript or raw notes"
  - "{meeting}: what the meeting was and who attended, if not in the notes"
settings: "Temperature 0-0.3."
---

Write minutes for {meeting} from the notes below.

Order (most consulted first):
1. **Decisions** — each as one sentence stating what was decided and, when
   present, who decided or dissented. A decision reversed later in the
   meeting appears once, in its final form.
2. **Actions** — one line each: task (imperative) — owner — due date. Only
   names and dates from the notes; "unassigned" and "no date" are honest
   values.
3. **Open questions** — raised but unresolved, phrased so the owner of the
   next meeting can put them on an agenda.
4. **Discussion summary** — one short paragraph per topic, capturing the
   substance of positions, not the play-by-play. Attribute stances only
   when the notes clearly do.

Rules:
- Nothing invented: no smoothing a disagreement into a consensus, no
  inferred deadlines.
- Neutral register — minutes record, they do not editorialize.
- If the notes are too fragmentary for a section, write "not captured in
  the notes" rather than reconstructing.

<notes>
{notes}
</notes>
