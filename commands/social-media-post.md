---
description: "Write a social media post or caption tuned to the platform, with a hook, a point, and a clear call to action."
argument-hint: "[message]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a social media post for {platform}.

Message: {message}
Goal: {goal}

Tune to the platform:
- Open with a hook in the first line (it decides whether anyone reads on; the
  rest may be collapsed behind "more").
- Match the platform's norms: length, tone, formatting, and how it treats
  links and hashtags. LinkedIn is professional and story-led; X is tight and
  punchy; Instagram/TikTok captions are casual and visual-first.
- One clear point and one call to action, aligned to the goal.
- Suggest 3-5 relevant hashtags where the platform uses them (relevant, not a
  wall), and note if the post assumes an image/video.

Give me 2-3 variations with different hooks so I can pick. Keep them concrete
and specific, not generic hype. No fake urgency, no engagement-bait, no
cliches. If a claim needs a fact I have not given, mark it as a placeholder.
