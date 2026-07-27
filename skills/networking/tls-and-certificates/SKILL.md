---
name: tls-and-certificates
description: Issue, install, renew, and debug TLS certificates so connections stay encrypted and trusted without surprise expiry. Use when setting up HTTPS, rotating a certificate, or diagnosing a trust or handshake error.
---

# TLS and certificates

A certificate proves a server is who it claims to be, and the chain
proves the certificate came from someone the client already trusts.
Nearly every TLS incident is one of three things: an expired
certificate, an incomplete chain, or a name that does not match.

## Method

1. **Match the certificate to every name it serves.** The name the
   client typed must appear in the subject alternative names,
   including both apex and www when both are used. A wildcard covers
   one label only, so it does not cover a nested subdomain.
2. **Serve the full chain, not just the leaf.** Servers must send the
   leaf plus any intermediates. Browsers often paper over a missing
   intermediate from cache while API clients and mobile apps fail
   outright, so test with a client that has no cache.
3. **Automate renewal and alert well before expiry.** Short-lived
   certificates are the norm, so renewal must be automatic and
   monitored, with an alert weeks ahead rather than hours. Expiry is
   the most common TLS outage and the most preventable.
4. **Keep the private key private and rotate on exposure.** Keys never
   leave the host or key store, never enter version control, and are
   replaced rather than merely re-issued if they might have leaked
   (see secrets-management). A certificate for a leaked key is worth
   nothing.
5. **Read handshake failures literally.** Unknown authority means a
   chain or trust store problem, name mismatch means the wrong
   certificate, and a protocol alert means the two ends share no
   acceptable settings. Fix what the error names instead of lowering
   security until it connects.
6. **Prefer modern defaults and disable what is broken.** Current
   protocol versions and cipher suites only, HSTS once you are
   confident, and stapled revocation to speed validation (see
   api-security). Old protocol support is a liability, not
   compatibility.

## Boundaries

- TLS secures data in transit between two endpoints; it says nothing
  about storage, authorization, or what the server does with the data
  afterwards (see encryption-at-rest, authn-design).
- A valid certificate proves control of a name, not that the operator
  is honest. Trust in the party is a separate question.
- Terminating TLS at a proxy leaves the hop beyond it in the clear
  unless you re-encrypt; decide deliberately whether that segment is
  trusted.
