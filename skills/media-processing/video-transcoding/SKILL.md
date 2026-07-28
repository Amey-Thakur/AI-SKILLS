---
name: video-transcoding
description: Convert uploaded video into the renditions needed for reliable playback across devices and bandwidths. Use when accepting user video or delivering video that must play everywhere.
---

# Video transcoding

Uploaded video arrives in whatever the recording device produced, which
is rarely what plays reliably everywhere. Transcoding produces a ladder
of renditions so playback adapts to the viewer's connection instead of
buffering.

## Method

1. **Produce a rendition ladder, not one output.** Several resolutions
   and bitrates so adaptive streaming can switch as bandwidth changes.
2. **Use adaptive streaming formats for anything long.** Segmented
   delivery lets the player change rendition mid-playback, which
   progressive download cannot do.
3. **Normalise on ingest.** Container, codec, frame rate, and audio
   levels standardised, because the variety of what users upload is
   larger than any player handles.
4. **Transcode asynchronously with visible status.** It takes minutes,
   so the upload completes and processing continues, with the user told
   which stage it is in (see media-processing-queue).
5. **Extract a poster frame and duration at ingest.** Both are needed
   immediately by the interface and are cheap to produce during the same
   pass (see thumbnail-generation).
6. **Cap input and reject early.** Duration and resolution limits
   enforced before transcoding, since the cost of processing a huge file
   is paid before you discover it was too big.
7. **Keep the original unless storage forbids it.** Re-transcoding from
   a transcoded copy compounds quality loss and blocks future format
   changes.

## Boundaries

Transcoding is computationally expensive and usually the largest cost in
a video feature, which often makes a managed service the right answer.
Codec licensing has commercial implications in some deployments. Live
streaming is a different problem with latency constraints transcoding
pipelines do not meet.
