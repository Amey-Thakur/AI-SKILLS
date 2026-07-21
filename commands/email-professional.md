---
description: "Draft a professional email that gets to the point, lands the right tone, and makes the next step obvious."
argument-hint: "[purpose]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Draft an email.

Purpose: {purpose}
Recipient: {recipient}
Must include: {key_points}
Tone: {tone}

Rules:
- Subject line first: specific and scannable ("Contract renewal - decision
  needed by Friday", never "Quick question").
- First sentence states why you are writing. No "hope this finds you well"
  unless the relationship genuinely calls for warmth - and then one line,
  specific, not boilerplate.
- One paragraph per point from {key_points}, shortest workable version.
- If anything is being asked of the recipient, end with exactly what and by
  when, as its own line.
- Close simply. No "please do not hesitate", no triple sign-offs.
- Use only facts given; put [square brackets] around anything you had to
  leave for the sender to fill (dates, amounts, names not provided).

Output the subject line, then the email body. Nothing else.
