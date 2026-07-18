---
name: password-storage
description: Store passwords with a slow, salted, memory-hard hash and a plan to raise the cost over time. Use when building signup or login, migrating off a weak hash, or reviewing how a system persists user passwords.
---

# Password storage

A password database will eventually be dumped, so the only question that
matters is how long each password survives offline cracking after the
breach. Plaintext or a fast hash like MD5 or SHA-256 means every account
falls in hours. Correct storage uses a slow, salted, memory-hard function so
a stolen hash is expensive to reverse, plus a plan to raise the cost as
hardware improves.

## Method

1. **Hash with Argon2id or bcrypt, never a general-purpose hash.** Use
   Argon2id where the library exists, bcrypt otherwise. MD5, SHA-1,
   SHA-256, and even salted SHA are far too fast: a GPU tries billions per
   second against them.
2. **Set work factors deliberately.** For Argon2id start near 19 MiB of
   memory, 2 iterations, parallelism 1, and tune up until a hash takes 250
   to 500 ms on your hardware. For bcrypt use a cost of 12 or higher.
   Re-measure yearly as hardware speeds up.
3. **Let the library generate a per-user salt.** Argon2 and bcrypt embed a
   unique random salt in the output string automatically; store the whole
   string. A single global salt lets an attacker precompute one table
   against every row at once.
4. **Respect bcrypt's 72-byte limit and cap input length.** bcrypt silently
   truncates past 72 bytes; pre-hash with SHA-256 and base64 if you must
   accept longer, and reject absurdly long inputs so hashing cannot become a
   denial of service.
5. **Migrate by rehashing on login.** Store the algorithm and parameters
   with each hash. On a successful login, verify against the old scheme then
   rehash with the new one. For accounts that never return, wrap the legacy
   hash, such as `argon2(sha256(old))`, so nothing stays weakly stored.
6. **Verify with the library's constant-time function.** Call
   `argon2.verify` or `bcrypt.checkpw`, never a string `==` on the hashes.

## Checks

- Does the stored value start with `$argon2id$` or `$2b$`, never a bare hex
  digest?
- Does one hash take on the order of hundreds of milliseconds, not
  microseconds?
- Do two users with the same password have different stored hashes?
- Is there a code path that upgrades a legacy hash on the next successful
  login?

## Boundaries

This covers storing and verifying passwords, not the surrounding
authentication flow: rate limiting login attempts, MFA, and session
handling live elsewhere. Whether to store passwords at all versus delegating
to an identity provider is a design decision above this skill. The parameter
targets assume server-side hashing; adjust for your latency budget.
