import { copyFileSync, existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const sitemap0 = join(distDir, "sitemap-0.xml");
const sitemap1 = join(distDir, "sitemap-1.xml");
const sitemapIndex = join(distDir, "sitemap-index.xml");
const sitemapOut = join(distDir, "sitemap.xml");

if (!existsSync(sitemap0)) {
  console.warn("[flatten-sitemap] sitemap-0.xml not found, skipping");
  process.exit(0);
}

if (existsSync(sitemap1)) {
  console.warn(
    "[flatten-sitemap] Multiple sitemap chunks detected, keeping index structure",
  );
  process.exit(0);
}

copyFileSync(sitemap0, sitemapOut);
unlinkSync(sitemap0);
if (existsSync(sitemapIndex)) {
  unlinkSync(sitemapIndex);
}

console.log("[flatten-sitemap] Wrote dist/sitemap.xml");
