---
name: video-description
description: Write a YouTube video description that hooks the reader, helps search, and includes the standard useful sections.
variables:
  - "{video}: what the video is about and its key points"
  - "{links}: links, timestamps, and calls to action to include"
settings: "Temperature 0.5-0.7."
---

Write a YouTube description for:

{video}
Links / timestamps / CTAs: {links}

Structure:
- First 1-2 lines: the most important, because only these show before "show
  more" and they feed search. Hook the reader and state what the video
  delivers, working in the natural search terms someone would type (without
  keyword-stuffing).
- A short paragraph expanding on what the video covers and why it is worth
  watching.
- Chapters/timestamps if provided (these also create clickable chapters and
  help retention).
- Links: relevant resources, related videos, the creator's links, formatted
  clearly.
- Calls to action: subscribe, related content, whatever fits: placed after the
  value, not begged first.

Rules: front-load the important text and search terms (the first lines do the
work). Genuinely descriptive, not keyword salad (YouTube and viewers both
penalize spam). Include the useful stuff (timestamps, links) the viewer
actually wants. Keep it readable, not a wall. Mark any link or timestamp I did
not provide as a placeholder. Suggest 3-5 relevant tags too.
