---
name: dns-fundamentals
description: Reason about DNS records, resolution, TTLs, and caching so name changes land predictably instead of mysteriously. Use when configuring a domain, moving a service, or debugging why a hostname resolves to the wrong place.
---

# DNS fundamentals

DNS is the first hop of almost every request and the last place people
look when something breaks. Most DNS incidents are not exotic: a TTL
was longer than the change window, a record was edited at a provider
nobody queries, or a stale cache still holds the old answer.

## Method

1. **Know which record answers which question.** A and AAAA map a name
   to an address, CNAME aliases one name to another, MX routes mail,
   TXT carries verification and policy, and NS delegates a zone.
   Picking the wrong type is the most common misconfiguration, and a
   CNAME at the zone apex is invalid in plain DNS, so it needs the
   provider's ALIAS equivalent.
2. **Treat TTL as your change window.** A record's TTL is how long
   resolvers may keep the old answer, so a 24-hour TTL means a 24-hour
   tail after any change. Lower it well before a planned move, make
   the change, then raise it again once the new value is stable.
3. **Verify at the authoritative server, not just locally.** Query the
   zone's own nameservers to see the truth, then a public resolver to
   see what the world currently gets. A difference between the two is
   cache, not misconfiguration, and it clears with time rather than
   with more edits.
4. **Confirm you are editing the zone that is live.** Domains often
   have records at a registrar, a DNS host, and a CDN, and only the
   delegated nameservers matter. Check the NS records before spending
   an hour editing a zone nobody queries.
5. **Give DNS its own redundancy.** Multiple nameservers across
   providers survive one provider's outage, and health-checked records
   steer traffic away from a dead endpoint (see dns-failover-and-
   traffic-steering). DNS is a dependency like any other.

## Boundaries

- DNS resolves names to addresses; it does not load balance with any
  precision. Round-robin records spread requests roughly at best, and
  caching skews the split (see load-balancing for real control).
- Propagation is a misnomer: nothing pushes, everything expires. If a
  change is not visible, suspect a cached TTL, not a stuck record.
- Registrar operations such as transfers, locks, and expiry sit
  outside the zone and can take days regardless of your TTLs.
