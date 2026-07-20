---
name: technical-seo
description: Make sites crawlable, fast, and structured so search finds what deserves finding, without tricks that expire. Use when improving organic traffic or auditing a site's search health.
---

# Technical SEO

Technical SEO removes the obstacles between good content and the
index; it cannot rank content that deserves obscurity. Work in
order: crawlable, then fast, then structured, then measured: and
build nothing that depends on a loophole.

## Method

1. **Verify crawl and index basics first.** Search Console
   as the ground truth: coverage report for what is
   indexed vs excluded and why; robots.txt not blocking
   what should rank; XML sitemap generated from the real
   page set (see docs-as-code: generate, never hand-
   maintain), canonical tags on every page (self-
   referencing by default) so URL variants (params, trailing
   slashes, http/https) consolidate instead of competing;
   404s for gone content, 301s for moved (chains
   collapsed), and pagination/faceted URLs deliberately
   managed (noindex or canonical) so crawl budget is not
   spent on infinite filter permutations.
2. **Make rendering crawler-friendly.** Server-render or
   pre-render the content that must rank (client-only
   rendering delays and sometimes loses indexing: see
   frontend-build-tooling's SSR options); meaningful
   content in the HTML, not behind interactions; one H1,
   logical heading tree (see docs-information-architecture,
   accessibility's shared interest: the crawler is a
   screen reader with a budget).
3. **Hit the speed bars for real users.** Core Web Vitals
   (LCP, INP, CLS) green on field data, not just lab (see
   web-vitals for the how: image optimization, font
   loading, layout stability: see image-optimization,
   font-loading); mobile-first because indexing is (see
   responsive-design). Speed is a ranking factor, a
   conversion factor, and the same work (see
   landing-page-strategy step 5).
4. **Mark up what the page actually is.** Structured data
   (JSON-LD: Article, Product, FAQ, HowTo, Organization)
   where the content genuinely matches the type: rich
   results and entity clarity, validated in the testing
   tools; honest markup only (marking up fake reviews is
   a manual-action magnet). Titles and meta descriptions
   as the search snippet's copy: outcome-first, unique
   per page, written like the tiny ads they are (see
   landing-page-strategy's headline discipline).
5. **Architect internal links as an importance map.**
   The pages you most want ranked get the most internal
   links, from relevant anchors (see
   docs-information-architecture); orphan pages
   (reachable only by sitemap) rank like orphans;
   hub-and-spoke topic clusters (pillar page linking
   detailed children) match how engines model topical
   authority: which is content strategy wearing
   information architecture's clothes (see
   developer-marketing for what earns external links:
   the part no tag can fake).
6. **Measure by query cohort, iterate quarterly.**
   Search Console queries by page: impressions,
   position, click-through (title/description tests move
   CTR at constant position); track the money queries'
   trajectory, not vanity aggregates (see
   product-metrics' vanity warning); after site changes
   (migrations especially: see cloud-migration's
   rehearsal ethic applied to URL moves: map every URL,
   301 everything, monitor coverage daily for a month),
   verify nothing deserving fell out.

## Boundaries

- Tricks (bought links, doorway pages, scraped content,
  keyword stuffing) work until the next core update and
  then subtract; every hour on loopholes is an hour not
  spent on content that earns links (see
  developer-marketing's trust economics).
- SEO latency is quarters, not sprints; commitments to
  leadership should promise process and leading
  indicators, not ranking dates (see
  status-updates' honesty about uncertainty).
- Content quality is the actual ranking engine; technical
  SEO is table stakes plumbing. When plumbing is green
  and rankings are not, the answer lives in the writing
  (see technical-writing, tutorial-writing).
