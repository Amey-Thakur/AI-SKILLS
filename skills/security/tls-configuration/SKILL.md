---
name: tls-configuration
description: Configure transport layer security with modern protocol versions, automated certificate renewal, and strict transport enforcement. Use when standing up HTTPS on a server, terminating TLS at a proxy, or hardening an endpoint that already serves traffic.
---

# TLS configuration

A TLS setup that merely shows a padlock can still allow downgrade to a
broken cipher, serve a certificate that expired overnight, or let a browser
fall back to plaintext on the next visit. The job is to pin the protocol
floor, keep certificates fresh without a human in the loop, and make the
browser refuse anything but HTTPS after the first contact.

## Method

1. **Disable everything below TLS 1.2.** Turn off SSLv3, TLS 1.0, and
   TLS 1.1 explicitly. In nginx set `ssl_protocols TLSv1.2 TLSv1.3;`. Prefer
   1.3 where the client base allows it: it drops RSA key exchange and static
   ciphers by design, so the negotiation surface shrinks on its own.
2. **Choose the cipher list from a maintained source, not memory.** Paste
   the Mozilla SSL Configuration Generator "intermediate" profile for your
   server and version rather than handpicking suites. Set
   `ssl_prefer_server_ciphers off` for 1.3, and keep only forward-secret
   ECDHE suites on 1.2.
3. **Automate issuance and renewal with ACME.** Run certbot or acme.sh, or
   let Caddy and Traefik handle it inline. Renew at 30 days remaining, not
   at expiry, and reload the server after the hook installs the new cert.
   Never let a renewal depend on someone reading a calendar reminder.
4. **Send HSTS only once the whole origin is HTTPS.** Add
   `Strict-Transport-Security: max-age=31536000; includeSubDomains`. Ramp
   `max-age` up from a few hours while you confirm nothing still needs
   plaintext, because the browser will honor a bad value for its full life.
5. **Add `preload` deliberately, then submit to hstspreload.org.** Preload
   bakes the rule into the browser binary and is slow to reverse, so commit
   only when every subdomain, forever, will serve TLS.
6. **Staple OCSP and serve the full chain.** Enable
   `ssl_stapling on;` with a resolver so clients skip a revocation
   round-trip, and include intermediates in the chain file so mobile clients
   without the intermediate cached still validate.

## Checks

- Does `testssl.sh https://host` or SSL Labs report grade A with no protocol
  or cipher warnings?
- Does `openssl s_client -connect host:443 -tls1_1` fail to negotiate?
- Does the response carry an HSTS header with `max-age` at least 31536000
  once the origin is fully migrated?
- Will the certificate renew and reload untouched if every operator is on
  vacation the week it expires?

## Boundaries

This covers server and proxy configuration, not the certificate authority
trust decisions your organization makes or mutual TLS between services,
which carries its own key distribution problem. Where a managed load
balancer or CDN terminates TLS, configure it there and confirm the origin
leg is encrypted too rather than assuming the edge covers it.
