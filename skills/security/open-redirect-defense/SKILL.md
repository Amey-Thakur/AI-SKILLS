---
name: open-redirect-defense
description: Validate every redirect destination against a server-side allowlist so a user-controlled target cannot bounce victims onto an attacker's site. Use when an endpoint reads a next, return_to, or callback parameter and sends the browser there.
---

# Open redirect defense

A redirect that trusts its `?next=` value lets an attacker forge a link on
your trusted domain that lands the victim on theirs. It fuels phishing that
survives a careful glance at the hostname, and in OAuth flows it delivers
authorization codes to the wrong party. The fix is not smarter parsing: it is
declining any destination you did not approve in advance.

## Method

1. **Prefer a redirect map to accepting URLs at all.** Where you can, carry a
   short key (`?next=inbox`) and resolve it against a server-side table of
   allowed paths. A parameter that never holds a URL cannot hold a hostile one.
2. **If you must accept a URL, allowlist the host after parsing.** Parse the
   target with a real URL parser, then confirm the host matches an explicit
   list of your domains by exact comparison. Never judge with `startsWith` or a
   substring: `https://yoursite.com.evil.com` and `https://evil.com/?u=yoursite.com`
   both beat prefix checks.
3. **Default to relative paths only.** When the feature only moves within your
   app, accept a target that begins with a single `/` and reject the rest.
   Block `//evil.com` and `/\evil.com`, which browsers read as
   protocol-relative jumps to another origin.
4. **Reject dangerous schemes outright.** Permit only `http` and `https`.
   Refuse `javascript:`, `data:`, and `mailto:`, which turn a redirect into
   script execution or a different trap entirely.
5. **Normalize before comparing.** Decode percent-encoding, fold backslashes to
   forward slashes, strip whitespace and control characters, and lowercase the
   host once, so `%2F%2Fevil.com` and mixed-case tricks cannot slip past a
   check that ran against the raw string.
6. **Pin OAuth and SSO callbacks to exact registered URIs.** Match the full
   callback URI against the pre-registered set with no wildcard on host or
   path. A loose callback allowlist is precisely how authorization codes get
   stolen.

## Checks

- Does `?next=https://evil.com` land on your domain or an error, never on
  evil.com?
- Are `//evil.com` and `/\evil.com` treated as external and refused?
- Is the host matched by exact allowlist entry, not `startsWith` or `includes`?
- Are OAuth callback URIs matched exactly, with no wildcard host or path?

## Boundaries

This governs where a redirect may send the browser, nothing else. It does not
authenticate the user or protect the session that outlives the hop (see
oauth-flows for callback trust). A domain you control that also hosts user
content can still be an unsafe target: allowlisting the host is necessary, not
always sufficient.
