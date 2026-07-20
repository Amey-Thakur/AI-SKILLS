---
name: changelog-writing
description: Write changelogs for humans, grouped by change type, with breaking changes called out and versions dated. Use when maintaining a changelog or replacing raw commit dumps with useful release notes.
---

# Changelog writing

A changelog tells users what changed and what they must do about it. It
is written for the human deciding whether and how to upgrade, not for
the machine that generated the commits: a dump of commit subjects is
not a changelog, it is a diff with worse formatting.

## Method

1. **Write for the upgrader's decision.** The reader is
   asking "should I upgrade, and what breaks if I do": lead
   with what affects them (breaking changes, new
   capabilities, fixes to bugs they hit), in their language,
   not internal commit-speak. "Refactored the auth module"
   means nothing to a user; "Sessions now expire after 24h
   (was 7 days)" tells them what to do.
2. **Group by type, newest version first.** The keep-a-
   changelog convention: per version, sections for Added,
   Changed, Deprecated, Removed, Fixed, Security: so a
   reader scans to the category they care about. A flat
   chronological list forces reading everything to find the
   breaking change buried in the middle.
3. **Call out breaking changes loudly, with migration.**
   Breaking changes get a prominent marker and a "how to
   migrate" note (see api-versioning, api-change-management):
   this is the single most important entry for anyone
   upgrading, and burying it causes broken deployments. If
   there is one thing the changelog gets right, it is this.
4. **Date every version, link the details.** Release date
   per version, version numbers matching the tags (see
   release-tagging, semver), and links to issues/PRs for
   readers who want the full story: the changelog is the
   summary, the linked items are the depth (see
   readme-writing's lean-and-link ethic).
5. **Generate the draft, curate the result.** Structured
   commits (conventional-commits: see commit-messages) let
   tooling draft the changelog grouped by type; then a human
   edits for the user's perspective (merging noise, writing
   the migration notes, promoting what matters): generated-
   then-curated is complete without being a commit dump.
   Pure generation lists every "fix typo"; pure hand-writing
   omits things.
6. **Keep an Unreleased section, update as you go.** Add
   entries when the change lands (in the same PR: see
   docs-as-code), accumulating under Unreleased, promoted to
   a version on release: so the changelog is never a
   scramble at release time and never forgets a change made
   three weeks ago.

## Boundaries

- The changelog is the technical record of changes;
  marketing release notes and launch announcements (see
  product-launch) are a different, audience-shaped document
  that may draw from it.
- Internal-only changes (refactors, test additions) that do
  not affect users can be omitted or minimized; the
  changelog serves users, not a complete audit of activity
  (that is git history: see git-history-hygiene).
- Automated changelog tooling is only as good as commit
  discipline; adopt it when the team's commit messages are
  reliable, curate always (see commit-messages).
