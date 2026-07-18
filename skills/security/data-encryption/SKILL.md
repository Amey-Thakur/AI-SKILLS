---
name: data-encryption
description: Encrypt data at rest and in transit with vetted primitives and a managed key service that rotates on schedule. Use when handling sensitive data on disk or over the network, or when reviewing how a system stores and moves it.
---

# Data encryption

Encryption turns a stolen disk or a sniffed connection into a non-event, but
only when the keys are managed as carefully as the data. Hardcoded keys and
homemade ciphers imitate protection while leaving the door open, which is worse
than none because it buys false confidence.

## Method

1. **Require TLS 1.2 or higher on every hop,** service-to-service traffic
   included. Terminate with certificates from a managed CA (ACM, Let's Encrypt),
   disable TLS 1.0 and 1.1 and weak ciphers, and turn on HSTS at public edges so
   no downgrade slips through.
2. **Encrypt at rest with AES-256 via managed storage encryption:** EBS, S3
   SSE-KMS, RDS, Cloud SQL. Switch it on at creation, because retrofitting an
   unencrypted volume is a full migration, not a config toggle.
3. **Hold keys in a KMS, never in code.** Use AWS KMS, GCP KMS, or HashiCorp
   Vault, and let the application call the service to encrypt, decrypt, or unwrap
   a data key without ever touching the master key. Scan the repo for
   high-entropy strings before each release.
4. **Use envelope encryption for bulk data.** Generate a data encryption key
   (DEK) per object, encrypt the payload with it, wrap the DEK under the KMS
   master key (KEK), and store the wrapped DEK beside the ciphertext. One master
   key then protects millions of objects it never directly touches.
5. **Rotate on a clock and on compromise.** Enable automatic annual rotation of
   master keys and re-wrap DEKs against the new version; on a suspected leak,
   rotate now and re-encrypt. Rotation you cannot complete in a day is a plan,
   not a control.
6. **Reach for vetted primitives only.** libsodium/NaCl, the platform crypto
   library, or AES-GCM for authenticated encryption. Never ECB mode, never a
   static or reused IV, and never MD5 or SHA-1 where the value bears security
   weight.
7. **Scope key use with least privilege.** Grant encrypt and decrypt separately,
   per service. An ingestion service that only writes should not hold a decrypt
   grant, or one stolen credential reads the whole store.

## Checks

- Does any endpoint still accept TLS 1.0 or 1.1, or fall back to plaintext HTTP?
- Can you rotate a master key today without shipping an application code change?
- Is any key, IV, or password sitting anywhere in the git history?

## Boundaries

This covers transport and storage encryption. Finding secrets that slipped into
code is secrets-scanning. Choosing algorithms for a regulated regime (FIPS
140-2, for example) follows that standard's approved list, not general
preference.
