import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { loadEnv } from "vite";
import remarkBreaks from "remark-breaks";
import remarkReadingTime from "remark-reading-time";
import { remarkStorageImages } from "./src/plugins/remark-storage-images.ts";

const env = loadEnv(process.env.MODE ?? "development", process.cwd(), "");
const storageBaseUrl = env.PUBLIC_STORAGE_BASE_URL ?? "";

export default defineConfig({
  site: "https://sivampillai.com/",
  integrations: [sitemap(), icon()],
  markdown: {
    remarkPlugins: [
      [remarkStorageImages, storageBaseUrl],
      remarkBreaks,
      remarkReadingTime,
      () => {
        return function (_tree, file) {
          file.data.astro.frontmatter.minutesRead =
            file.data.readingTime.minutes;
        };
      },
    ],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
