---
description: "Turn a transcript or rough notes into minutes people actually consult - decisions, actions, and open questions first."
argument-hint: "[notes]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write minutes for {meeting} from the notes below.

Order (most consulted first):
1. **Decisions**: each as one sentence stating what was decided and, when
   present, who decided or dissented. A decision reversed later in the
   meeting appears once, in its final form.
2. **Actions**: one line each: task (imperative): owner: due date. Only
   names and dates from the notes; "unassigned" and "no date" are honest
   values.
3. **Open questions**: raised but unresolved, phrased so the owner of the
   next meeting can put them on an agenda.
4. **Discussion summary**: one short paragraph per topic, capturing the
   substance of positions, not the play-by-play. Attribute stances only
   when the notes clearly do.

Rules:
- Nothing invented: no smoothing a disagreement into a consensus, no
  inferred deadlines.
- Neutral register: minutes record, they do not editorialize.
- If the notes are too fragmentary for a section, write "not captured in
  the notes" rather than reconstructing.

<notes>
{notes}
</notes>
