---
name: build-website
description: Build a small site with the simplest stack that fits, fast by default and editable afterwards.
variables:
  - "{site}: what the site is for, its pages, and who maintains it"
  - "{content}: the actual copy, or the sections it needs"
settings: "Temperature 0.4."
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
