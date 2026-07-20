---
name: mvp-scoping
description: Scope minimum viable products around the riskiest assumption, cut to learn fast, and hold an explicit quality floor. Use when defining a first version or rescuing an MVP that grew into a v3.
---

# MVP scoping

An MVP is the smallest thing that tests the riskiest assumption with
real users. "Minimum" is defined by the learning goal, "viable" by a
quality floor: forget either half and you ship either a bloated v1
or an insulting demo.

## Method

1. **Name the riskiest assumption first.** Demand ("will
   anyone want this"), behavior ("will they do the key action
   repeatedly"), feasibility ("can we deliver the promise"),
   or willingness-to-pay: rank by kill-probability times cost
   of being wrong, and aim the MVP at the top one (see
   product-discovery, hypothesis-driven-work). An MVP that
   tests nothing risky is just a small product.
2. **Choose the cheapest vehicle that tests it.** Ladder:
   landing page with signup (demand), concierge (deliver the
   value manually: tests demand and learn the workflow),
   Wizard-of-Oz (real interface, humans behind the curtain),
   single-path product (one segment, one workflow,
   end-to-end). Climb only as high as the assumption
   requires; fake doors are ethical when users learn the
   truth promptly and cheaply (see product-discovery step 5).
3. **Cut scope by narrowing, not by thinning.** One user
   segment, one core workflow, done properly: beats every
   feature at half-quality. The cut list is explicit and
   published (see user-story-writing's out-of-scope rule):
   payments can be invoices, admin can be you running SQL,
   settings can be defaults: manual backstage is the
   signature MVP move (see concierge above).
4. **Set the viability floor deliberately.** The core loop
   works reliably, data is safe (see security-review basics:
   auth, backups: non-negotiable even at MVP), and the
   experience clears "would recommend to a peer" for the
   target segment. Below the floor you are testing "do users
   tolerate broken software" (answer: no) instead of your
   actual assumption.
5. **Define the learning metrics before launch.** What
   activation, repeat usage, or conversion number confirms
   the assumption; what number kills it; by when (see
   product-metrics, ab-test-design's pre-registration
   ethic). "We will see how it goes" converts the MVP's
   entire purpose into vibes.
6. **Decide the day the data arrives.** Persevere (assumption
   held: invest), pivot (assumption died but an adjacent one
   looks alive), kill (record why: see decision-journals).
   Also decide the *code's* fate honestly: concierge and
   Wizard-of-Oz scaffolding is disposable by design;
   a single-path product MVP that validated becomes the
   foundation, so its core got built to keep (see
   rewrite-vs-refactor for when that call was wrong).

## Boundaries

- Regulated domains and trust-critical categories (payments,
  health) raise the viability floor structurally; the
  learning ladder still applies below the product level
  (letters of intent, pilots: see clinical-adjacent and
  compliance realities).
- MVP is a learning tool for new value; replatforming and
  v2s of proven products are delivery projects where
  "minimum" logic misleads (see cloud-migration's
  strangler patterns instead).
- Shipping the MVP is the midpoint: unmaintained MVPs that
  linger for years as load-bearing infrastructure are the
  industry's favorite postmortem (see tech-debt-register:
  log the debt the day you take it).
