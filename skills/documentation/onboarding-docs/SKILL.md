---
name: onboarding-docs
description: Write onboarding docs that get a new contributor to a verified working setup and a first contribution fast. Use when new joiners struggle to get started or setup instructions keep breaking.
---

# Onboarding docs

Onboarding documentation is measured by one number: time from "new
person" to "made their first useful contribution". Every unexplained
step, every setup instruction that fails silently, every piece of
tribal knowledge not written down adds days and erodes the newcomer's
confidence.

## Method

1. **Get to a verified working setup, step by step.** Exact
   setup instructions (tested on a clean machine, because
   yours has years of accumulated state the newcomer's does
   not: see tutorial-writing's clean-environment testing),
   with a verification after the critical steps ("run this;
   you should see X") so failures surface immediately, not
   three steps later. A setup guide that assumes prior state
   fails every actual new hire.
2. **Automate setup where you can, document the rest.** A
   setup script or dev container (see docker-image-
   optimization) that does the mechanical steps, with docs
   explaining what it did and the manual pieces it cannot;
   the less a human must hand-execute, the fewer ways it
   breaks. Automated-and-documented beats a twenty-step
   manual checklist that drifts.
3. **Provide a first-contribution path.** A curated set of
   good-first-issues (see community-building,
   open-source-maintainer-role), a walkthrough of the
   contribution workflow (branch, PR, review, CI: see
   branch-strategy, pull-request-size), and the local
   feedback loop (how to run tests, lint, the app): the
   newcomer needs a *safe small win* early, and pointing
   them at a real change with guardrails delivers it.
4. **Write down the tribal knowledge.** The context that
   lives in senior heads: why the architecture is this way
   (link the vision and ADRs: see technical-vision,
   architecture-decision-records), the non-obvious
   conventions, who owns what (see code-owners), where to
   ask for help. This is the highest-value and most-often-
   missing onboarding content, because the people who know
   it forgot they had to learn it.
5. **Map the codebase and the workflow.** A high-level tour
   (what lives where, the main flows: see architecture-
   diagrams at Context/Container level) and the day-to-day
   rhythm (standups, reviews, releases: see standup,
   deployment-pipelines): orientation, not exhaustive
   detail. The newcomer needs a map to explore from, not
   the whole territory memorized.
6. **Let each new hire fix the onboarding.** The newest
   person is the only one who can see what the docs assume
   and omit; make "improve the onboarding doc" their first
   task (see boy-scout-rule): this is the mechanism that
   keeps onboarding current, because it decays exactly as
   fast as the codebase changes and only fresh eyes catch
   the drift.

## Boundaries

- Onboarding docs get someone productive; they are not
  comprehensive reference (see docs-information-
  architecture) and should not try to be, a newcomer
  drowns in completeness. Orient and launch, link the
  depth.
- The docs cannot replace human onboarding (a buddy,
  questions answered: see mentoring-engineers); they
  reduce the load and cover the mechanical parts so humans
  spend their time on the judgment parts.
- Setup docs rot faster than most (every dependency and
  tooling change can break them); the new-hire-fixes-it
  loop and clean-machine testing are what keep them alive
  (see docs-maintenance).
