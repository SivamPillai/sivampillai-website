/// <reference types="astro/client" />

declare module "*.webp" {
  import type { ImageMetadata } from "astro";
  const value: ImageMetadata;
  export default value;
}

declare module "*.png" {
  import type { ImageMetadata } from "astro";
  const value: ImageMetadata;
  export default value;
}

declare module "*.jpg" {
  import type { ImageMetadata } from "astro";
  const value: ImageMetadata;
  export default value;
}

declare module "*.jpeg" {
  import type { ImageMetadata } from "astro";
  const value: ImageMetadata;
  export default value;
}

declare module "*.gif" {
  import type { ImageMetadata } from "astro";
  const value: ImageMetadata;
  export default value;
}

declare module "*.svg" {
  import type { ImageMetadata } from "astro";
  const value: ImageMetadata;
  export default value;
}
