---
name: crypto-usage
description: Use cryptography by calling vetted libraries with authenticated defaults and storing keys in a KMS, never by designing a scheme. Use when adding encryption, choosing a cipher or mode, or reviewing code that handles keys or ciphertext.
---

# Crypto usage

Cryptography fails quietly: code that encrypts and decrypts correctly in a
test can still leak plaintext through a reused nonce, a padding oracle, or a
homegrown construction. The rule is to never design your own scheme and
never call a low-level primitive directly. Pick a vetted library, use its
authenticated high-level interface, and store keys somewhere other than the
code.

## Method

1. **Call a high-level library, not raw primitives.** Use libsodium
   (PyNaCl), Google Tink, or the language's maintained `cryptography`
   package instead of bare OpenSSL AES calls. These pick safe modes, key
   sizes, and padding so you cannot assemble an insecure combination by
   accident.
2. **Default to AEAD for encryption.** Use an authenticated cipher such as
   AES-256-GCM, ChaCha20-Poly1305, or `crypto_secretbox` so decryption
   verifies integrity and rejects tampered ciphertext. Unauthenticated CBC
   or ECB invites padding-oracle and bit-flipping attacks; do not use them.
3. **Never reuse a nonce with a key.** Generate a fresh random nonce per
   message for GCM, or use a library that manages nonces for you. A repeated
   nonce under one key breaks GCM catastrophically, exposing plaintext and
   the authentication key.
4. **Derive keys from passwords with a KDF.** For passwords use Argon2id or
   bcrypt (see password-storage); to turn a passphrase into a key use Argon2
   or scrypt. Never key a cipher directly from a raw SHA-256 of a password.
5. **Keep keys out of source and in a KMS.** Generate and store keys in AWS
   KMS, GCP KMS, or an HSM, and encrypt data keys under a master key with
   envelope encryption. The application handles ciphertext and a wrapped
   key, never the raw master.
6. **Compare secrets in constant time.** Check MACs and tokens with
   `hmac.compare_digest` or the library equivalent, not `==`. A byte-by-byte
   `==` leaks match position through timing.

## Signals

- Does every ciphertext carry an authentication tag, with zero ECB or
  unauthenticated CBC in the codebase?
- Is there any hand-rolled cipher, custom padding, or "encryption" that is
  really XOR or base64?
- Are keys generated and stored in a KMS or HSM, never hardcoded or
  committed?
- Do secret comparisons use a constant-time function?

## Boundaries

This is about using cryptography correctly, not designing protocols or
vetting a novel scheme, which needs a cryptographer. Password hashing has
its own skill (password-storage), as does transport encryption
(tls-configuration). Regulatory algorithm mandates such as FIPS override
these defaults where they apply.
