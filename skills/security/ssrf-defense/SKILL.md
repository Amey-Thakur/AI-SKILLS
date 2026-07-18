---
name: ssrf-defense
description: Prevent server-side request forgery by constraining where a user-influenced URL can make the server connect. Use when the server fetches a URL that came from a user: webhooks, link previews, image proxies, PDF renderers, or import-from-URL features.
---

# SSRF defense

When your server fetches a URL a user supplied, the user is really choosing
what your server connects to, and your server sits inside the network they
cannot reach directly. Server-side request forgery turns a harmless-looking
"fetch this image" into a read of the cloud metadata endpoint, an internal
admin panel, or a database port. Blocklists of `localhost` and `127.0.0.1`
fail immediately; the fix is a positive allowlist enforced after DNS
resolves.

## Method

1. **Allowlist destinations, do not blocklist them.** Decide the exact
   hosts or domains the feature legitimately reaches and reject everything
   else. Blocklists miss `0.0.0.0`, `[::1]`, `2130706433` as an integer,
   `169.254.169.254`, and internal names that resolve to private space.
2. **Resolve DNS, then validate the resolved IP.** Look up the host, check
   every returned address against RFC 1918, loopback, link-local, and
   unique-local ranges, and only then connect. Validating the hostname
   before resolution leaves you open to DNS rebinding.
3. **Pin the connection to the address you validated.** Between your check
   and the socket, DNS can change answers. Resolve once and connect to that
   IP, or use a library like `advocate` or a custom resolver that enforces
   the check at connect time, closing the time-of-check gap.
4. **Block the cloud metadata endpoint explicitly.** Deny `169.254.169.254`
   and the IMDS ranges on every provider, and where you run on AWS require
   IMDSv2 so a bare GET cannot lift credentials even if a request slips
   through.
5. **Disable redirect following, or revalidate each hop.** A permitted URL
   can 302 to `http://169.254.169.254/`. Set the client to not follow
   redirects, or intercept every hop and run the same IP check before
   continuing.
6. **Strip the response and the port surface.** Allow only `http` and
   `https` on `80` and `443`, never `file://`, `gopher://`, or `ftp://`, and
   return only the bytes the feature needs so error text and headers do not
   exfiltrate internal responses.

## Litmus tests

- Does a URL resolving to `169.254.169.254`, `127.0.0.1`, or a `10.x`
  address get rejected before any connection opens?
- Is the validated target the resolved IP, not the hostname string?
- Does an allowed URL that redirects to an internal address get stopped at
  the redirect?
- Are non-HTTP schemes and non-standard ports refused outright?

## Boundaries

This governs where the server may connect, not what it does with authorized
responses. Egress firewall rules and a locked-down network are the second
layer and should exist regardless: a metadata block at the app is not a
substitute for network policy. Signed, provider-issued webhook URLs you
control are a different trust model than arbitrary user input.
