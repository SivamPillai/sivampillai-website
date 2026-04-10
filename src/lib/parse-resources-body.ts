import { toString } from "mdast-util-to-string";
import type { Link, List, ListItem, Paragraph, Root, RootContent } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

export interface ResourceItem {
  title: string;
  description: string;
  /** When set with `href`, the URL is shown as this label below title/description (title stays plain text). */
  linkLabel?: string;
  href?: string;
}

export interface ResourceSection {
  id: string;
  label: string;
  intro: string;
  items: ResourceItem[];
}

export interface ParsedResources {
  sections: ResourceSection[];
}

function slugify(label: string): string {
  const base = label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "section";
}

function uniqueSlug(base: string, counts: Map<string, number>): string {
  const n = (counts.get(base) ?? 0) + 1;
  counts.set(base, n);
  if (n === 1) return base;
  return `${base}-${n}`;
}

/** Last `link` node in document order (CTA is usually the final link in the block). */
function findLastLinkInOrder(p: Paragraph): Link | undefined {
  let last: Link | undefined;
  function walk(nodes: unknown[] | undefined) {
    if (!nodes) return;
    for (const n of nodes) {
      const node = n as { type?: string; children?: unknown[] };
      if (node.type === "link") last = n as Link;
      if (node.children) walk(node.children as unknown[]);
    }
  }
  walk(p.children as unknown[]);
  return last;
}

/** Plain text + soft breaks before `stopAt` (excludes the link subtree). */
function textBeforeLinkNode(p: Paragraph, stopAt: Link): string {
  const parts: string[] = [];
  let done = false;

  function walk(nodes: unknown[] | undefined) {
    if (!nodes || done) return;
    for (const n of nodes) {
      if (done) return;
      if (n === stopAt) {
        done = true;
        return;
      }
      const node = n as { type: string; value?: string; children?: unknown[] };
      if (node.type === "text") {
        parts.push(node.value ?? "");
      } else if (node.type === "break") {
        parts.push("\n");
      } else if (node.children) {
        walk(node.children as unknown[]);
      }
    }
  }

  walk(p.children as unknown[]);
  return parts.join("");
}

/** When title + description share one md paragraph (soft line breaks), split for display. */
function splitTitleBody(text: string): { title: string; description: string } {
  const t = text.trim();
  const blocks = t.split(/\n\n+/);
  if (blocks.length >= 2) {
    return {
      title: blocks[0].trim(),
      description: blocks.slice(1).join("\n\n").trim(),
    };
  }
  const lines = t.split(/\n/);
  if (lines.length >= 2) {
    return {
      title: lines[0].trim(),
      description: lines.slice(1).join("\n").trim(),
    };
  }
  return { title: t, description: "" };
}

function paragraphLinkInfo(p: Paragraph): { href: string; label: string } | undefined {
  const link = findLastLinkInOrder(p);
  if (link) {
    const href = String(link.url ?? "").trim();
    if (!href) return undefined;
    const label = toString(link).trim() || href;
    return { href, label };
  }
  const raw = toString(p).trim();
  const lone = raw.match(/^\s*<?(https?:\/\/[^>\s]+)>?\s*$/i);
  if (lone) return { href: lone[1], label: lone[1] };
  const embedded = raw.match(/\bhttps?:\/\/[^\s]+/);
  if (embedded) {
    const href = embedded[0].replace(/[.,;:)]+$/, "");
    return { href, label: href };
  }
  return undefined;
}

function parseListItem(listItem: ListItem): ResourceItem | null {
  const paras = listItem.children.filter((c): c is Paragraph => c.type === "paragraph");
  if (paras.length === 0) return null;

  let linkIndex = -1;
  let linkInfo: { href: string; label: string } | undefined;
  for (let i = paras.length - 1; i >= 0; i--) {
    const info = paragraphLinkInfo(paras[i]);
    if (info) {
      linkIndex = i;
      linkInfo = info;
      break;
    }
  }

  if (linkIndex === 0) {
    const lastLink = findLastLinkInOrder(paras[0]);
    if (lastLink) {
      const before = textBeforeLinkNode(paras[0], lastLink).trim();
      if (before) {
        const { title, description } = splitTitleBody(before);
        return {
          title,
          description,
          href: linkInfo!.href,
          linkLabel: linkInfo!.label,
        };
      }
    }
    return {
      title: linkInfo!.label,
      description: "",
      href: linkInfo!.href,
    };
  }

  if (linkIndex > 0) {
    return {
      title: toString(paras[0]).trim(),
      description: paras
        .slice(1, linkIndex)
        .map((x) => toString(x).trim())
        .filter(Boolean)
        .join("\n\n"),
      href: linkInfo!.href,
      linkLabel: linkInfo!.label,
    };
  }

  if (paras.length === 1) {
    return splitTitleBody(toString(paras[0]));
  }

  return {
    title: toString(paras[0]).trim(),
    description: paras
      .slice(1)
      .map((x) => toString(x).trim())
      .filter(Boolean)
      .join("\n\n"),
  };
}

function parseSectionNodes(sectionNodes: RootContent[]): {
  intro: string;
  items: ResourceItem[];
} {
  const introParas: Paragraph[] = [];
  let resourceList: List | undefined;

  for (const node of sectionNodes) {
    if (node.type === "list") {
      resourceList = node;
      break;
    }
    if (node.type === "paragraph") introParas.push(node);
  }

  const intro = introParas
    .map((p) => toString(p).trim())
    .filter(Boolean)
    .join("\n\n");

  if (!resourceList || resourceList.children.length === 0) {
    return { intro, items: [] };
  }

  const items: ResourceItem[] = [];
  for (const child of resourceList.children) {
    if (child.type !== "listItem") continue;
    const item = parseListItem(child);
    if (item && (item.title || item.description || item.href)) items.push(item);
  }

  return { intro, items };
}

export function parseResourcesBody(body: string): ParsedResources {
  const tree = unified().use(remarkParse).parse(body) as Root;
  const slugCounts = new Map<string, number>();
  const sections: ResourceSection[] = [];

  let currentLabel: string | null = null;
  let buffer: RootContent[] = [];

  function flush() {
    if (!currentLabel) return;
    const id = uniqueSlug(slugify(currentLabel), slugCounts);
    const { intro, items } = parseSectionNodes(buffer);
    sections.push({ id, label: currentLabel, intro, items });
    buffer = [];
  }

  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 2) {
      flush();
      currentLabel = toString(node).trim() || "Untitled";
    } else if (currentLabel !== null) {
      buffer.push(node);
    }
  }
  flush();

  return { sections };
}
