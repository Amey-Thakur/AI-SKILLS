---
name: weight-initialization
description: Initialise parameters so signal and gradients propagate at usable scale from the first step. Use when a deep network fails to train from the start or diverges immediately.
---

# Weight initialization

Initialisation sets the scale at which signal and gradients flow before
any learning happens. Get it wrong and activations saturate or vanish
through depth, and the network never starts learning, which looks like a
mysterious failure rather than a scale problem.

## Method

1. **Use the standard scheme for your activation.** The
   variance-preserving initialisers are derived for specific
   activation functions, and using the wrong pairing degrades
   deep networks.
2. **Never initialise weights to zero or a constant.** Identical
   parameters receive identical gradients and stay identical, so the
   network has one effective unit per layer.
3. **Initialise biases to zero by default.** Exceptions exist for gates
   and specific architectures and should be deliberate rather than
   inherited.
4. **Check activation statistics at initialisation.** Mean and variance
   per layer on one forward pass shows immediately whether signal is
   dying or exploding through depth.
5. **Let normalisation layers reduce sensitivity.** They make training
   far more robust to initialisation, which is much of why they are
   ubiquitous.
6. **Scale residual branches down.** Initialising residual paths near
   zero keeps very deep networks stable at the start.
7. **Load pretrained weights where available.** Transfer from a
   pretrained model beats any initialisation scheme when the domains are
   related (see fine-tuning-vs-prompting).

## Boundaries

Initialisation matters most for deep networks trained from scratch and
is largely irrelevant when fine-tuning. Frameworks default sensibly, so
this is usually a diagnostic concern rather than a design one.
Initialisation cannot rescue an unstable architecture or learning rate
(see learning-rate-schedules).
