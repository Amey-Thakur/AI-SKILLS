---
name: audio-processing
description: Normalise, compress, and prepare audio for reliable playback and transcription, handling levels and formats consistently. Use when accepting recorded audio or producing spoken content.
---

# Audio processing

Recorded audio arrives at wildly different levels, sample rates, and
quality. Without normalisation the listener adjusts volume between
clips, and downstream processing such as transcription degrades on the
quiet ones.

## Method

1. **Normalise loudness to a standard.** Perceptual loudness
   normalisation rather than peak, since peak-normalised audio still
   varies in perceived volume between recordings.
2. **Resample to one rate and channel layout.** A consistent internal
   format simplifies every later stage, and speech rarely benefits from
   high rates or stereo.
3. **Choose bitrate by content.** Speech is intelligible at rates far
   below music, and using a music bitrate for spoken content wastes most
   of the bytes.
4. **Trim silence at the edges, carefully.** Leading and trailing
   silence wastes time and storage, while aggressive trimming clips the
   first word.
5. **Preserve the original for reprocessing.** Transcription models and
   codecs improve, and reprocessing from a compressed derivative
   compounds loss.
6. **Extract duration and waveform data at ingest.** Both are needed by
   the interface immediately and are cheap during a pass you are already
   making.
7. **Prepare deliberately for transcription.** Mono, a suitable sample
   rate, and normalised levels materially improve accuracy (see
   document-parsing for the analogous extraction concern).

## Boundaries

Processing improves consistency; it cannot recover information a poor
recording never captured. Aggressive noise reduction introduces
artefacts that harm both listening and transcription. Voice recordings
are personal data and often biometric, with heightened obligations (see
data-classification).
