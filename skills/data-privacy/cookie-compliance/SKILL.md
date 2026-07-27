---
name: cookie-compliance
description: Handle cookies and similar storage so non-essential ones only load after consent and the banner reflects reality. Use when adding analytics, embeds, or any client-side storage on a website.
---

# Cookie compliance

The rules cover any storage or reading on a user's device, not just
cookies, and they apply before the storage happens. Most sites fail not
at the banner but at the tags that fire while the banner is still on
screen.

## Method

1. **Inventory what actually gets set.** Load the site with a clean
   profile and list every cookie, local storage entry, and pixel, along
   with what set it. Inventories written from memory are always wrong.
2. **Classify each as strictly necessary or not.** Session, security,
   and load balancing are necessary; analytics, personalisation, and
   advertising are not, and the necessary category is narrower than
   most teams assume.
3. **Block non-essential scripts until consent.** The tag must not load
   at all, rather than loading and being told to behave. This is the
   single most common failure (see consent-management).
4. **Cover embeds and third-party widgets.** Video players, maps, chat
   widgets, and social embeds set storage on load, so gate them behind
   consent placeholders that explain what accepting enables.
5. **Keep the disclosure accurate and current.** The cookie notice
   should match the inventory, including purpose and duration, and it
   drifts every time a tag is added, so re-check on release.
6. **Make withdrawal work in-session.** Revoking should stop further
   collection immediately and clear what it can, not merely record a
   preference for next time.

## Boundaries

- Rules differ by jurisdiction in what counts as necessary and whether
  consent must be prior; the technical mechanism is the same but the
  thresholds are not.
- A consent platform blocks tags it knows about; anything added outside
  it stays unblocked, so the inventory remains your responsibility.
- Server-side tracking is not exempt merely because it avoids cookies
  (see data-minimization).
