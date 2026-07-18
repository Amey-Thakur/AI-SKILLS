// Build every generated catalog artifact from the skills/ and prompts/
// folders, so nothing machine-readable can drift from the actual content.
// Run from the repository root after adding or editing entries:
//
//   node scripts/build-index.mjs
//
// Produces: index.json (+ docs/ copy), llms.txt, CATALOG.md, the README
// category table, and .claude-plugin/marketplace.json. Reads only
// frontmatter; fails loudly on a malformed entry rather than emitting a
// partial catalog.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const RAW_BASE = "https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main";
const SITE = "https://amey-thakur.github.io/AI-SKILLS/";

function frontmatter(path) {
  const text = readFileSync(path, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`No frontmatter in ${path}`);
  const fields = {};
  let currentKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      fields[currentKey] = kv[2].trim().replace(/^"(.*)"$/, "$1");
    } else if (/^\s+-\s+/.test(line) && currentKey) {
      if (!Array.isArray(fields[currentKey])) fields[currentKey] = [];
      fields[currentKey].push(line.replace(/^\s+-\s+/, "").replace(/^"(.*)"$/, "$1"));
    }
  }
  if (!fields.name || !fields.description) {
    throw new Error(`Missing name or description in ${path}`);
  }
  return fields;
}

const entries = [];
const seenNames = new Set();

for (const category of readdirSync("skills").sort()) {
  if (!statSync(join("skills", category)).isDirectory()) continue;
  for (const dir of readdirSync(join("skills", category)).sort()) {
    const path = join("skills", category, dir, "SKILL.md");
    statSync(path); // throws if a skill folder lacks its SKILL.md
    const fm = frontmatter(path);
    if (fm.name !== dir) throw new Error(`Name mismatch: folder ${dir} vs name ${fm.name}`);
    if (seenNames.has(fm.name)) throw new Error(`Duplicate skill name: ${fm.name}`);
    seenNames.add(fm.name);
    entries.push({
      kind: "skill",
      name: fm.name,
      category,
      description: fm.description,
      path: `skills/${category}/${dir}/SKILL.md`,
      raw_url: `${RAW_BASE}/skills/${category}/${dir}/SKILL.md`,
    });
  }
}

for (const file of readdirSync("prompts").sort()) {
  if (!file.endsWith(".md")) continue;
  const path = join("prompts", file);
  const fm = frontmatter(path);
  if (fm.name !== file.replace(/\.md$/, "")) {
    throw new Error(`Name mismatch: file ${file} vs name ${fm.name}`);
  }
  entries.push({
    kind: "prompt",
    name: fm.name,
    category: "prompts",
    description: fm.description,
    variables: Array.isArray(fm.variables) ? fm.variables : [],
    settings: fm.settings ?? "",
    path: `prompts/${file}`,
    raw_url: `${RAW_BASE}/prompts/${file}`,
  });
}

const skills = entries.filter((e) => e.kind === "skill");
const prompts = entries.filter((e) => e.kind === "prompt");
const categories = [...new Set(skills.map((e) => e.category))];

const index = {
  name: "AI Skills",
  description: "Plug-and-play skills and prompts for every AI coding agent.",
  homepage: SITE,
  repository: "https://github.com/Amey-Thakur/AI-SKILLS",
  ecosystem_index: `${RAW_BASE}/ecosystem.json`,
  license: "MIT",
  count: { skills: skills.length, prompts: prompts.length, categories: categories.length },
  categories,
  entries,
};

writeFileSync("index.json", JSON.stringify(index, null, 2) + "\n");
/* The website is served from docs/, so it gets its own copy of the catalog
   and of the ecosystem index. */
writeFileSync(join("docs", "index.json"), JSON.stringify(index, null, 2) + "\n");
writeFileSync(join("docs", "ecosystem.json"), readFileSync("ecosystem.json"));

/* llms.txt: grouped by category so an agent can skim to the right section. */
const llms = [
  "# AI Skills",
  "",
  "> Plug-and-play skills and prompts for every AI coding agent. Each entry",
  "> below is self-contained markdown, fetchable at its URL. Skills are working",
  "> methods to follow; prompts are templates to fill and run. See AGENTS.md",
  "> for usage rules. Beyond this library, ecosystem.json indexes every major",
  "> skill collection on GitHub (8,000+ skills reachable):",
  `> ${RAW_BASE}/ecosystem.json`,
  "",
];
for (const cat of categories) {
  llms.push(`## Skills: ${cat}`, "");
  for (const e of skills.filter((s) => s.category === cat)) {
    llms.push(`- [${e.name}](${e.raw_url}): ${e.description}`);
  }
  llms.push("");
}
llms.push("## Prompts", "");
for (const e of prompts) llms.push(`- [${e.name}](${e.raw_url}): ${e.description}`);
llms.push("");
writeFileSync("llms.txt", llms.join("\n"));

/* CATALOG.md: the complete human-browsable listing, grouped by category. */
const catalog = [
  "# Catalog",
  "",
  `Every entry in the library: ${skills.length} skills in ${categories.length}`,
  `categories, plus ${prompts.length} prompts. Generated by`,
  "`scripts/build-index.mjs`; edit the entries, not this file.",
  "",
];
for (const cat of categories) {
  const list = skills.filter((s) => s.category === cat);
  catalog.push(`## ${cat} (${list.length})`, "");
  for (const e of list) catalog.push(`- [**${e.name}**](${e.path}): ${e.description}`);
  catalog.push("");
}
catalog.push(`## prompts (${prompts.length})`, "");
for (const e of prompts) catalog.push(`- [**${e.name}**](${e.path}): ${e.description}`);
catalog.push("");
writeFileSync("CATALOG.md", catalog.join("\n"));

/* README table between markers: one row per category, linking into the
   catalog, so the README stays readable at any library size. */
const anchor = (cat, n) => `${cat}-${n}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
const tableLines = [
  "| Category | Skills | For example |",
  "|---|---|---|",
];
for (const cat of categories) {
  const list = skills.filter((s) => s.category === cat);
  const sample = list.slice(0, 3).map((e) => e.name).join(", ");
  tableLines.push(`| [${cat}](CATALOG.md#${anchor(cat, list.length)}) | ${list.length} | ${sample} |`);
}
tableLines.push(
  `| [prompts](CATALOG.md#${anchor("prompts", prompts.length)}) | ${prompts.length} | ${prompts
    .slice(0, 3)
    .map((e) => e.name)
    .join(", ")} |`,
);
const readme = readFileSync("README.md", "utf8");
if (!readme.includes("<!-- library:start -->")) {
  throw new Error("README is missing the library markers");
}
writeFileSync(
  "README.md",
  readme.replace(
    /<!-- library:start -->[\s\S]*<!-- library:end -->/,
    `<!-- library:start -->\n${tableLines.join("\n")}\n<!-- library:end -->`,
  ),
);

/* Claude Code marketplace: one plugin per category, generated so the listing
   can never drift from the folders. */
const marketplace = {
  name: "ai-skills",
  owner: { name: "Amey Thakur", email: "ameythakur20@gmail.com" },
  metadata: {
    description: "Plug-and-play skills and prompts for every AI coding agent",
    version: "2.0.0",
  },
  plugins: categories.map((cat) => {
    const list = skills.filter((s) => s.category === cat);
    return {
      name: `${cat}-skills`,
      description: `${list.length} working methods for ${cat.replace(/-/g, " ")}: ${list
        .slice(0, 4)
        .map((e) => e.name)
        .join(", ")}, and more`,
      source: "./",
      strict: false,
      skills: list.map((e) => `./skills/${cat}/${e.name}`),
    };
  }),
};
writeFileSync(
  join(".claude-plugin", "marketplace.json"),
  JSON.stringify(marketplace, null, 2) + "\n",
);

console.log(
  `index.json + llms.txt + CATALOG.md + README table + marketplace.json: ` +
    `${skills.length} skills in ${categories.length} categories, ${prompts.length} prompts`,
);
