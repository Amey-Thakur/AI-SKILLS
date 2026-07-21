---
name: alt-text-writing
description: Write alt text that conveys an image's purpose, marks decorative images empty, and handles functional and complex images. Use when adding images to content or auditing alt text.
---

# Alt text writing

Alt text is what a screen reader speaks in place of an image, and what
shows when an image fails to load. Good alt text conveys the image's
*purpose in context*, not a literal description; the most common
mistakes are missing alt, useless alt ("image"), and describing
decorative images that should be silent.

## Method

1. **Convey purpose in context, not literal description.**
   The same image needs different alt text depending on why
   it is there: a photo of a person might be "Dr. Jane Smith"
   in a bio, "Team member smiling" in a culture page, or
   nothing if purely decorative. Ask "what does this image
   communicate here, and what would a sighted user take from
   it?": that meaning is the alt text, not an inventory of
   pixels.
2. **Mark decorative images empty.** Images that add no
   information (backgrounds, dividers, decorative flourishes,
   an icon next to text that already says the same thing)
   get `alt=""` (empty, not missing): so the screen reader
   skips them entirely. Decorative images with descriptive
   alt, or with no alt attribute at all (screen readers then
   read the filename: "IMG_4021.jpg"), are noise that
   clutters the experience.
3. **Describe functional images by their action.** An image
   that is a link or button (a magnifying-glass search icon,
   a logo linking home) gets alt describing the *function*,
   not the appearance: "Search", "Home", not "magnifying
   glass icon". The user needs to know what activating it
   does (see aria-usage's function-not-appearance rule for
   icon buttons), because that is the image's purpose.
4. **Keep it concise; put length where it belongs.** Alt
   text is typically a phrase or short sentence; a screen
   reader reads it in full with no formatting, so a
   paragraph is tiresome. For images needing long
   description (a complex chart, a detailed diagram),
   provide a short alt plus a longer description in the
   surrounding text or a linked/adjacent description (see
   the complex-figure handling below).
5. **Handle complex images with text alternatives.** Charts,
   graphs, infographics, and diagrams carry data that a
   short alt cannot: provide the information in accessible
   text (a data table for a chart, a text summary of a
   diagram: see the data-behind-the-visual in scientific-
   visualization) so the content, not just "bar chart", is
   available. The image is a convenience for sighted users;
   the text is the accessible source of the same
   information.
6. **Do not start with "image of" and do not stuff
   keywords.** Screen readers already announce it as an
   image, so "image of a cat" is redundant ("a cat"
   suffices); and alt text is for users, not SEO keyword
   stuffing (which degrades the experience and search both:
   see technical-seo's honest-markup rule). Write for the
   person listening.

## Boundaries

- Alt text quality depends on context and authorial intent;
  it cannot be fully automated (AI-generated alt describes
  content but often misses purpose-in-context), though it
  can draft a starting point a human refines. The
  purpose-in-context judgment is human.
- Alt text serves images; other media (video, audio) need
  captions, transcripts, and audio descriptions, which are
  separate techniques for separate content types.
- Empty alt (decorative) versus descriptive alt versus
  functional alt are three distinct decisions per image;
  the frequent failure is applying one rule to all images
  rather than deciding each image's role.
