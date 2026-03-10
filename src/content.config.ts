import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseFields = {
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
};

const datedFields = {
  ...baseFields,
  pubDate: z.coerce.date(),
};

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    ...datedFields,
    author: z.string(),
    image: z.string().optional(),
    category: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    ...datedFields,
    role: z.string().optional(),
    status: z.enum(["idea", "in-progress", "shipped"]).default("shipped"),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    impact: z.string().optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/essays" }),
  schema: z.object({
    ...datedFields,
    author: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    minutesRead: z.number().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    ...datedFields,
    author: z.string().optional(),
    kind: z.enum(["idea", "observation", "snippet"]).default("idea"),
  }),
});

const quotes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/quotes" }),
  schema: z.object({
    ...baseFields,
    quote: z.string(),
    source: z.string().optional(),
    /** URL to the original source for citation (e.g. article, video, tweet). */
    sourceUrl: z.string().url().optional(),
    /** Display id for the quote (e.g. Q0001). If omitted, derived from filename (q001-* → Q0001). */
    quoteId: z.string().optional(),
  }),
});

const poetry = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/poetry" }),
  schema: z.object({
    ...datedFields,
    author: z.string().optional(),
    form: z.string().optional(),
  }),
});

const photography = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/photography",
  }),
  schema: z.object({
    ...datedFields,
    image: z.string().optional(),
    location: z.string().optional(),
    camera: z.string().optional(),
  }),
});

const design = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/design" }),
  schema: z.object({
    ...datedFields,
    image: z.string().optional(),
    medium: z.string().optional(),
  }),
});

export const collections = {
  blog,
  projects,
  essays,
  notes,
  quotes,
  poetry,
  photography,
  design,
};
