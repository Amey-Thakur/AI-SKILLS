---
name: clickjacking-defense
description: Stop UI redress attacks by declaring who may frame your pages, using frame-ancestors as the primary control and X-Frame-Options as the fallback. Use when hardening any page that performs sensitive actions on a click, especially authenticated dashboards and confirmation flows.
---

# Clickjacking defense

Clickjacking loads your real page in an invisible frame over the attacker's
decoy, so the victim's click lands on your "Transfer" or "Grant access"
button while they think they clicked something harmless. The defense is a
server-declared framing policy: state exactly who may embed your page, and
browsers refuse the rest before a pixel renders.

## Method

1. **Set `Content-Security-Policy: frame-ancestors` as the primary control.**
   Send `frame-ancestors 'none'` on pages nobody should embed, or
   `frame-ancestors 'self' https://partner.example.com` where a known partner
   frames you. This is the modern, most expressive control and it accepts
   multiple origins, which `X-Frame-Options` cannot.
2. **Keep `X-Frame-Options` as a fallback, matched to the CSP.** Send
   `X-Frame-Options: DENY` (or `SAMEORIGIN`) for older browsers that ignore
   `frame-ancestors`. Make the two agree: a `DENY` header plus a permissive
   CSP is a contradiction that confuses review and some clients.
3. **Send the header on every response, not just the login page.** Apply it
   at the middleware, reverse proxy, or CDN so every route including error
   pages, embedded widgets, and API-rendered HTML carries it. One unprotected
   sensitive route is the whole hole.
4. **Do not list an origin you would not trust to overlay you.** `SAMEORIGIN`
   still permits your own pages to frame each other; if any same-origin page
   can host user content, that becomes a framing vector. Allow only origins
   whose framing you actually intend.
5. **Require re-authentication or a typed confirmation on the riskiest
   actions.** For irreversible operations, a step that a framed click cannot
   satisfy alone (re-enter password, type a confirmation phrase) removes the
   single-click payoff even if a frame slips through.
6. **Verify the rendered header, not just the config.** A proxy or a
   meta-tag attempt can strip or fail to emit it; `frame-ancestors` has no
   valid `<meta>` form, so confirm it arrives as a real response header.

## Checks

- Does `curl -I` on a sensitive page show `frame-ancestors` and a matching
  `X-Frame-Options`?
- Does an `<iframe>` pointing at your page from another origin render blank or
  get blocked in the console?
- Are the two headers consistent, never `DENY` alongside a permissive CSP?
- Do error pages and embedded routes carry the policy too?

## Boundaries

This blocks framing-based UI redress only. It does not stop XSS, CSRF, or a
popup-based social-engineering attack, and it says nothing about what a
legitimately framed partner does with the embed. Setting `frame-ancestors`
too tight can break intended embeds: coordinate with the teams that frame you
rather than defaulting to `'none'` on shared widgets.
