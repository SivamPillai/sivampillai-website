export const siteConfig = {
  name: "Sivam Pillai",
  description: "AI systems • Manufacturing • Ideas • Musings",
  url: "https://sivampillai.com",
  lang: "en",
  locale: "en_US",
  author: "Sivam Pillai",
  x: "@sivampillai",
  /** From env: contact email shown in contact modal and used for Formspree notifications */
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
  /** From env: Formspree form ID (create at formspree.io, set notifications to contactEmail) */
  formspreeFormId: import.meta.env.PUBLIC_FORMSPREE_FORM_ID ?? "",
  socialLinks: {
    x: "https://x.com/SivamPillai",
    github: "https://github.com/sivampillai",
    linkedin: "https://www.linkedin.com/in/sivampillai",
    instagram: "https://www.instagram.com/sivampillai",
    medium: "https://medium.com/@drspill",
  },
  navLinks: [
    { text: "Home", href: "/" },
    { text: "Projects", href: "/projects" },
    { text: "Writing", href: "/writing" },
    { text: "Creatives", href: "/creatives" },
    { text: "About", href: "/about" },
    { text: "Now", href: "/now" },
  ],
};
