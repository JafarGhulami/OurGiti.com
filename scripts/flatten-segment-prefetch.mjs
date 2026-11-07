/**
 * Postbuild fix for `output: "export"` segment prefetches (Next 16.3–16.4; still needed in 16.4.5).
 *
 * `next build` writes nested segment payloads inside the route group's folder,
 * e.g. `out/__next.!KHNpdGUp/__PAGE__.txt`
 * (`!KHNpdGUp` = base64 "(site)"), but the client requests the flat name
 * `out/__next.!KHNpdGUp.__PAGE__.txt`. The mismatch 404s
 * every page prefetch (navigation still works via the full payload, just
 * slower). This copies each nested file to its flat name next to the folder.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let copied = 0;

function flatten(dir, prefix, targetDir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const name = `${prefix}.${entry}`;
    if (statSync(full).isDirectory()) {
      flatten(full, name, targetDir);
    } else if (entry.endsWith(".txt")) {
      const target = join(targetDir, name);
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry.startsWith("__next.")) flatten(full, entry, dir);
    else if (entry !== "_next") walk(full);
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  console.log(`flatten-segment-prefetch: ${copied} file(s)`);
}
