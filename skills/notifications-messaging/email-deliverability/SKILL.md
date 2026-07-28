---
name: email-deliverability
description: Get email into the inbox rather than the spam folder, through authentication, reputation, and list hygiene. Use when email is not arriving or engagement suddenly drops.
---

# Email deliverability

Sending email is easy and arriving is not. Deliverability is a
reputation system you participate in whether or not you know it, and
most failures come from missing authentication or from sending to people
who never asked.

## Method

1. **Authenticate fully before anything else.** SPF, DKIM, and DMARC
   correctly configured for the sending domain. Without them, delivery
   is unreliable regardless of content.
2. **Separate streams by type and domain.** Transactional and marketing
   on different subdomains so their reputations cannot contaminate each
   other (see transactional-messaging).
3. **Warm new sending domains gradually.** Volume ramped over weeks,
   because a cold domain sending at full volume looks exactly like a
   spammer.
4. **Send only to people who asked.** Purchased and scraped lists
   produce complaints and spam-trap hits, which is the fastest way to
   destroy a domain's reputation permanently.
5. **Remove bounces and inactives promptly.** Hard bounces go
   immediately, and long-term non-openers should be sunset, since
   sending to dead addresses signals poor practice.
6. **Make unsubscribing trivial and instant.** A hard unsubscribe path
   reduces complaints, and complaints damage reputation far more than
   unsubscribes do (see unsubscribe-and-preferences).
7. **Monitor the feedback signals.** Complaint rate, bounce rate, and
   authentication failures, watched continuously rather than
   investigated after a drop.

## Boundaries

Deliverability improves the odds; no configuration guarantees inbox
placement, and receiving providers make their own decisions. Rules
differ between providers and change without notice. Consent
requirements for commercial mail are legal and vary by jurisdiction.
