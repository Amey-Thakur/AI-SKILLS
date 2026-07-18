---
name: security-headers
description: Set the HTTP response headers that constrain what a browser will execute, embed, and leak on behalf of your origin. Use when hardening a web app against cross-site scripting, clickjacking, or referrer leakage, or when a security scan flags missing headers.
---

# Security headers

Response headers are the cheapest defense a web app has: a few lines tell
every browser what your pages are allowed to do, and browsers enforce them
for free. Skip them and a single injected script runs with full origin
privileges, your page loads inside an attacker's iframe, and full URLs with
tokens leak to third parties through the referrer.

## Method

1. **Start Content Security Policy in report-only.** Ship
   `Content-Security-Policy-Report-Only` with a `report-uri` or
   `report-to` endpoint first, watch what breaks for a week, then switch to
   the enforcing `Content-Security-Policy`. Enforcing blind guarantees a
   production outage.
2. **Build the CSP around nonces, not `unsafe-inline`.** Set
   `script-src 'self' 'nonce-<random>'` and stamp the same nonce on every
   legitimate inline script per request. `unsafe-inline` on `script-src`
   defeats the entire header, so treat it as not shipping CSP at all.
3. **Block framing with `frame-ancestors 'none'`.** Prefer the CSP
   directive over the legacy `X-Frame-Options: DENY`, and set both while old
   browsers linger. This is what stops clickjacking, where your page is
   overlaid invisibly on an attacker's site.
4. **Trim the referrer to `strict-origin-when-cross-origin`.** This sends
   the full path same-origin, only the origin cross-origin over HTTPS, and
   nothing when downgrading to HTTP, so query-string tokens and internal
   paths stop leaking to external sites and analytics.
5. **Set `X-Content-Type-Options: nosniff`.** This stops the browser from
   MIME-sniffing a response into a script, closing the trick where an upload
   served as text gets reinterpreted and executed.
6. **Scope powerful features with `Permissions-Policy`.** Disable what the
   app never uses: `Permissions-Policy: camera=(), microphone=(),
   geolocation=()`. A compromised script then cannot reach hardware you were
   never going to touch.

## Litmus tests

- Does securityheaders.com or an observatory scan return an A with no
  missing critical header?
- Does the CSP contain zero `unsafe-inline` or `unsafe-eval` on
  `script-src`, or a written reason it must?
- Does a cross-origin navigation leak only the origin, never the full path,
  in the `Referer` request header?
- Is the same header set applied to error pages and API responses, not just
  the happy-path HTML?

## Boundaries

Headers constrain the browser: they do nothing for non-browser clients and
do not sanitize the input that caused an injection in the first place. CSP
is defense in depth behind output encoding, not a replacement for it. Where
a framework or edge platform injects headers, configure them in one place
and verify the actual response rather than trusting the setting.
