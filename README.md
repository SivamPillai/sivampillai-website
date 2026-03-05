# Sivam Pillai — Personal Site

Personal website and thinking lab: **AI systems • Manufacturing • Ideas • Musings**. Built with [Astro 5](https://astro.build/) and [Tailwind CSS 4](https://tailwindcss.com/). Original template from [Astro Starter Pro](https://github.com/devgelo-labs/astro-starter-pro).

## What’s on the site

- **Home** — Intro, tagline, and a _Featured_ section (one essay, one project, one creative, one quote).
- **Projects** — Case studies and project write-ups (industrial AI, monitoring, etc.).
- **Writing** — Hub with four sections:
  - **Essays** — Longer-form pieces.
  - **Blog** — Posts and shorter updates.
  - **Quotes** — Curated quotes with tags.
  - **Notes** — Rough, in-progress notes and observations.
- **Creatives** — Hub with three sections:
  - **Photography** — Gallery with lightbox.
  - **Poetry** — List of poems (title + one-line description).
  - **Design** — Grid of design work (image, title, description).
- **Now** — What I’m focused on right now (work, learning, reading, creative), updated periodically.
- **About** — Short bio and values.
- **Resources** — Books, tools, and links.
- **Search** — Site-wide search (Pagefind) with optional filter by section.
- **Contact** — Footer “Contact” opens a modal form; submissions go to **contact@sivampillai.com** via [Formspree](https://formspree.io).

Content is connected by **tags** (Thinking Lab): essays, projects, notes, quotes, and blog posts show “Related” content at the bottom based on shared tags.

---

## Tech stack

- **Astro 5** — Static site and content collections.
- **Tailwind CSS 4** — Styling.
- **TypeScript** — Typing.
- **Pagefind** — Static search (index built at `npm run build`).
- **Formspree** — Contact form delivery to email.
- **Vercel** — Analytics and Speed Insights (optional).

---

## Project structure

```text
/
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── assets/             # Processed images (e.g. og-image)
│   ├── components/        # UI: Navbar, Footer, ContactModal, RelatedContent, etc.
│   ├── config/
│   │   └── site.ts         # Site name, URL, nav, social links, contact email, Formspree ID
│   ├── content/            # Content collections (Markdown/MDX)
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── essays/
│   │   ├── notes/
│   │   ├── quotes/
│   │   ├── poetry/
│   │   ├── photography/
│   │   └── design/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/              # Routes (index, writing, creatives, blog, essays, etc.)
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   └── content.config.ts   # Collection schemas and loaders
├── astro.config.mjs
└── package.json
```

---

## Configuration

**`src/config/site.ts`** holds:

- **Site**: `name`, `description`, `url`, `author`. (Optional per-page `ogImage` for social previews; e.g. blog posts can set their own image.)
- **Contact form**: Uses `PUBLIC_CONTACT_EMAIL` and `PUBLIC_FORMSPREE_FORM_ID` from env (see [Environment variables](#environment-variables-secrets)).
- **Social**: `socialLinks` (LinkedIn, X, GitHub, Medium).
- **Nav**: `navLinks` (Home, Projects, Writing, Creatives, About, Now). Writing and Creatives use dropdowns in the navbar.

Update `url` and social links to match your own details.

### Environment variables (secrets)

Contact form and email are read from the environment so they are not committed:

- **`PUBLIC_CONTACT_EMAIL`** — Email shown in the contact modal and used as the Formspree notification address (e.g. `contact@sivampillai.com`).
- **`PUBLIC_FORMSPREE_FORM_ID`** — Your [Formspree](https://formspree.io) form ID (the segment after `/f/` in the form action URL).

**Setup:** Copy `.env.example` to `.env`, fill in the values, and keep `.env` out of version control (it is in `.gitignore`). For CI or production, set these variables in your host’s environment or secrets.

```bash
cp .env.example .env
# Edit .env with your real values
```

---

## Content collections

All content is in **`src/content/`** with schemas in **`src/content.config.ts`**:

| Collection  | Path           | Main fields (besides title, description, tags)         |
| ----------- | -------------- | ------------------------------------------------------ |
| blog        | `blog/`        | pubDate, author, image, category                       |
| projects    | `projects/`    | pubDate, role, status, link, repo, impact              |
| essays      | `essays/`      | pubDate, minutesRead                                   |
| notes       | `notes/`       | pubDate, author, kind (idea \| observation \| snippet) |
| quotes      | `quotes/`      | quote, source                                          |
| poetry      | `poetry/`      | pubDate, form                                          |
| photography | `photography/` | pubDate, image, location, camera                       |
| design      | `design/`      | pubDate, image, medium                                 |

Use **tags** in frontmatter so the Thinking Lab can show related essays, projects, notes, and quotes.

---

## Commands

| Command             | Action                                                          |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Start dev server at `http://localhost:4321`                     |
| `npm run build`     | Build site to `dist/` and run Pagefind to generate search index |
| `npm run preview`   | Serve `dist/` locally (search works here)                       |
| `npm run check`     | Astro diagnostics                                               |
| `npm run typecheck` | TypeScript check                                                |
| `npm run lint`      | ESLint                                                          |
| `npm run format`    | Prettier                                                        |
| `npm run fix`       | Format + lint fix                                               |

**Note:** Search (Pagefind) only works after `npm run build`; the index is created from `dist/`.

---

## Deploy to Firebase Hosting

The site is set up to deploy to [Firebase Hosting](https://firebase.google.com/docs/hosting). The build output (`dist/`) is used as the hosting public directory.

### One-time setup

1. **Install Firebase CLI** (if needed):

   ```bash
   npm install -g firebase-tools
   ```

   Or use `npx firebase-tools` for one-off commands.

2. **Log in to Firebase**:

   ```bash
   firebase login
   ```

3. **Create a Firebase project** (if you don’t have one):
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click “Add project”, name it (e.g. `sivampillai-website`), and follow the steps.

4. **Link this app to your Firebase project**:

   ```bash
   firebase init hosting
   ```

   - Choose “Use an existing project” and select your project (or create one first).
   - When asked for the public directory, enter **`dist`** (it’s already in `firebase.json`; confirm or leave as is).
   - “Single-page app?” → **No** (Astro outputs multiple HTML pages).
   - If prompted to overwrite `firebase.json`, choose **N** to keep the existing config.

   This creates or updates `.firebaserc` with your project ID. You can commit `.firebaserc` so others (or CI) deploy to the same project.

### Deploy

From the project root:

```bash
npm run deploy
```

This runs `npm run build` (Astro + Pagefind) and then `firebase deploy`. Your site will be available at:

- `https://<your-project-id>.web.app`
- `https://<your-project-id>.firebaseapp.com`

To use a custom domain (e.g. `sivampillai.com`), add it in Firebase Console → Hosting → “Add custom domain” and follow the DNS steps.

---

## Licenses

The source code for this website is licensed under the MIT License.

All written content, including essays, notes, quotes, poetry, photography,
and other creative material, is licensed under the Creative Commons
Attribution 4.0 International (CC BY 4.0) license unless otherwise noted.

If you reuse or adapt any content, please provide appropriate attribution.

- **Code**: See [LICENSE](./LICENSE).
- **Content**: See [LICENSE-CONTENT](./LICENSE-CONTENT) (if present).
