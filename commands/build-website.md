---
description: "Build a small site with the simplest stack that fits, fast by default and editable afterwards."
argument-hint: "[site]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Build a site for:

{site}

Content: {content}

Use website-building, responsive-design, and web-vitals.

Produce:
- The stack, justified by the site's actual needs rather than habit.
- Page structure with semantic markup.
- Complete HTML and CSS for the pages, mobile first.
- Accessible navigation, headings, and focus states.
- Performance choices: image handling, fonts, and what is not loaded.
- How the owner updates content without a build step.

Rules: choose the simplest thing that works; do not add a framework a
brochure site does not need. Semantic HTML before ARIA. Include real
copy rather than placeholder text. State what still needs a designer.
