import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "kavina",
  description: "kavina description",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  sitemap: { hostname: "https://kavina.unsun.cc" },
  lastUpdated: true,

  themeConfig: {
    search: { provider: "local" },
    logo: "/favicon.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Himavanta/kavina" }],

    footer: {
      message: "",
      copyright: "",
    },

    outline: {
      level: "deep",
      label: "本页导航",
    },
    docFooter: {
      prev: "上一节",
      next: "下一节",
    },
  },
});
