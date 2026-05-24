import { getCollection, type CollectionKey } from "astro:content";

export type PublishStatus = "wip" | "draft" | "published";

type PublishableEntry = {
  data: { publishStatus?: PublishStatus };
};

export function isPublished(entry: PublishableEntry): boolean {
  return (entry.data.publishStatus ?? "published") === "published";
}

export async function getPublishedCollection<K extends CollectionKey>(name: K) {
  const entries = await getCollection(name);
  return entries.filter(isPublished);
}
