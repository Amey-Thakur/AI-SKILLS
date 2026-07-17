// Build index.json and llms.txt from the skills/ and prompts/ folders, so the
// machine-readable catalog can never drift from the actual content. Run from
// the repository root after adding or editing entries:
//
//   node scripts/build-index.mjs
//
// Reads only frontmatter (name, description, variables); fails loudly on a
// malformed entry rather than emitting a partial catalog.

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

for (const dir of readdirSync("skills").sort()) {
  const path = join("skills", dir, "SKILL.md");
  statSync(path); // throws if a skill folder lacks its SKILL.md
  const fm = frontmatter(path);
  if (fm.name !== dir) throw new Error(`Name mismatch: folder ${dir} vs name ${fm.name}`);
  entries.push({
    kind: "skill",
    name: fm.name,
    description: fm.description,
    path: `skills/${dir}/SKILL.md`,
    raw_url: `${RAW_BASE}/skills/${dir}/SKILL.md`,
  });
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
    description: fm.description,
    variables: Array.isArray(fm.variables) ? fm.variables : [],
    settings: fm.settings ?? "",
    path: `prompts/${file}`,
    raw_url: `${RAW_BASE}/prompts/${file}`,
  });
}

const index = {
  name: "AI Skills",
  description: "Plug-and-play skills and prompts for every AI coding agent.",
  homepage: SITE,
  repository: "https://github.com/Amey-Thakur/AI-SKILLS",
  ecosystem_index: `${RAW_BASE}/ecosystem.json`,
  license: "MIT",
  count: { skills: entries.filter((e) => e.kind === "skill").length, prompts: entries.filter((e) => e.kind === "prompt").length },
  entries,
};

writeFileSync("index.json", JSON.stringify(index, null, 2) + "\n");
/* The website is served from docs/, so it gets its own copy of the catalog
   and of the ecosystem index. */
writeFileSync(join("docs", "index.json"), JSON.stringify(index, null, 2) + "\n");
writeFileSync(join("docs", "ecosystem.json"), readFileSync("ecosystem.json"));

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
  "## Skills",
  "",
  ...entries.filter((e) => e.kind === "skill").map((e) => `- [${e.name}](${e.raw_url}): ${e.description}`),
  "",
  "## Prompts",
  "",
  ...entries.filter((e) => e.kind === "prompt").map((e) => `- [${e.name}](${e.raw_url}): ${e.description}`),
  "",
].join("\n");

writeFileSync("llms.txt", llms);

/* Regenerate the README's library table between its markers, so the list of
   entries can never drift from the folders. */
const skills = entries.filter((e) => e.kind === "skill");
const prompts = entries.filter((e) => e.kind === "prompt");
const rows = Math.max(skills.length, prompts.length);
const tableLines = [
  `| Skills: how to work (${skills.length}) | Prompts: ready to run (${prompts.length}) |`,
  "|---|---|",
];
for (let i = 0; i < rows; i++) {
  const s = skills[i] ? `[${skills[i].name}](${skills[i].path})` : "";
  const p = prompts[i] ? `[${prompts[i].name}](${prompts[i].path})` : "";
  tableLines.push(`| ${s} | ${p} |`);
}
const readme = readFileSync("README.md", "utf8");
const updated = readme.replace(
  /<!-- library:start -->[\s\S]*<!-- library:end -->/,
  `<!-- library:start -->\n${tableLines.join("\n")}\n<!-- library:end -->`,
);
if (updated === readme && !readme.includes("<!-- library:start -->")) {
  throw new Error("README is missing the library markers");
}
writeFileSync("README.md", updated);

console.log(`index.json + llms.txt + README table: ${index.count.skills} skills, ${index.count.prompts} prompts`);
