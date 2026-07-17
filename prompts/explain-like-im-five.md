---
name: explain-like-im-five
description: Explain any concept in genuinely simple terms with one honest analogy, without becoming wrong.
variables:
  - "{concept}: the thing to explain"
  - "{level}: optional - actual audience if not literally five (e.g. a smart 12-year-old, a non-technical manager)"
settings: "Temperature 0.5-0.7."
---

Explain {concept} to {level}.

Rules:
- Open with one everyday analogy that carries the CORE mechanism, and stay
  inside that analogy while it holds. Pick it carefully: a good analogy
  maps cause and effect, not just appearance.
- No jargon at all. The first time a necessary term appears, define it in
  the same sentence with everyday words.
- Simplify by leaving detail out - never by saying something false. If the
  simple version cuts a corner that matters, say "this is mostly true;
  the full story adds ..." in one sentence at the end.
- Three short paragraphs maximum: what it is, how it works (the analogy at
  work), why anyone cares.
- End with the one-sentence version someone could repeat at dinner and be
  correct.

Do not be cute about it. Simple and clear, not babyish.
