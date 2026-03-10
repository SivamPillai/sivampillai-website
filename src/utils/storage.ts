/**
 * Resolves an image reference to a full URL for display and SEO.
 * - If the value is already a full URL (http/https), returns it unchanged.
 * - Otherwise treats it as a path in Firebase Storage and builds the URL using
 *   PUBLIC_STORAGE_BASE_URL from env (e.g. public/blogs/onstage.webp → full URL).
 */
export function getStorageImageUrl(path: string | undefined): string | undefined {
  if (!path || typeof path !== "string") return undefined;
  const trimmed = path.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const base = import.meta.env.PUBLIC_STORAGE_BASE_URL as string | undefined;
  if (!base) return trimmed;

  const normalizedPath = trimmed.replace(/^\//, "");
  const encodedPath = encodeURIComponent(normalizedPath);
  const separator = base.endsWith("/") ? "" : "/";
  return `${base}${separator}${encodedPath}?alt=media`;
}
