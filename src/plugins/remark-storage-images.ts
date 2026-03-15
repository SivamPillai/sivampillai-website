import type { Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * Resolves image URLs that point at Firebase Storage public paths.
 * In markdown you can use: ![alt](/public/projects/x001_raw_data.webp)
 * and it will be rewritten to the full Firebase Storage URL at build time.
 */
export function remarkStorageImages(storageBaseUrl: string | undefined) {
  if (!storageBaseUrl?.trim()) {
    return () => {};
  }
  const base = storageBaseUrl.replace(/\/$/, "");

  return (tree: Root) => {
    visit(tree, "image", (node) => {
      const url = node.url?.trim();
      if (!url || url.startsWith("http://") || url.startsWith("https://")) return;

      const path = url.startsWith("/") ? url.slice(1) : url;
      if (!path.startsWith("public/")) return;

      const encodedPath = encodeURIComponent(path);
      node.url = `${base}/${encodedPath}?alt=media`;
    });
  };
}
