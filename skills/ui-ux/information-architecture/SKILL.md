---
name: information-architecture
description: Organize a product's content and navigation around how users think, so they can find things and know where they are. Use when structuring an app's navigation, a site's sections, or a feature's information.
---

# Information architecture

Information architecture is how a product's content and features are
organized, labeled, and connected. Good IA is invisible: users find what
they need and always know where they are. Bad IA is why people cannot find
a feature that exists.

## Method

1. **Structure around the user's mental model, not the org chart.** Group
   and label things the way users think about them and expect to find
   them, not by how the company is departmentalized or the database is
   built. The classic failure is navigation mirroring internal teams
   ("check the Platform tab") that means nothing to users.
2. **Learn the model with card sorting.** To find how users group things,
   have them sort the content into categories that make sense to them
   (open sort for discovery, closed for validation). Your intuition about
   categories is often wrong; the users' groupings are the IA.
3. **Label in the users' words.** Navigation labels and category names use
   the terms users search for and recognize, not clever branding or
   internal jargon (see ux-writing). A section nobody can name is a
   section nobody finds. Test labels: given the label, can users predict
   what is under it?
4. **Keep hierarchy shallow and balanced.** Prefer breadth to depth within
   reason: deeply nested content (click, click, click to reach anything)
   hides it. Aim for the important things within a couple of levels.
   Wildly unbalanced trees (one category with 50 items, another with 2)
   signal a grouping problem.
5. **Make location and navigation obvious.** Users should always know
   where they are (clear current-page indication, breadcrumbs where depth
   warrants) and how to get elsewhere (visible, consistent navigation; see
   frontend-routing, usability-heuristics). Support both browsing and
   searching, since users split between them.
6. **Design for findability, then validate.** After structuring, test it:
   tree testing (can users find a given item in the structure?) and
   first-click testing reveal where the IA misleads. An IA that makes
   sense to its designer but not its users has failed (see
   usability-testing).

## Boundaries

- IA is the structure; visual and interaction design present it (see
  visual-hierarchy, interaction-design). A sound structure can be poorly
  presented and vice versa; both matter.
- IA evolves with the product; a structure that fit ten features breaks at
  a hundred. Revisit it when navigation starts accreting "Other" and
  "More" catch-alls (the IA smell equivalent of a utils file).
- Search reduces but does not remove the need for good structure; users
  browse, share links, and build mental maps, all of which depend on IA.
