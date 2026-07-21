import { defineConfig } from "vitepress";

export default defineConfig({
  title: "kavina",
  description: "Vue 3 低代码框架 — 可视化设计器与组件化渲染引擎",
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#FA743E" }],
    ["meta", { name: "keywords", content: "低代码,可视化设计器,Vue 3,组件渲染引擎,前端框架" }],
    [
      "meta",
      {
        name: "description",
        content:
          "kavina 是一个 Vue 3 低代码框架，提供可视化设计器与组件化渲染引擎，帮助开发者快速构建可配置的页面与应用。",
      },
    ],
    ["meta", { property: "og:title", content: "kavina — Vue 3 低代码框架" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "可视化设计器与组件化渲染引擎，基于 Vue 3 + Composition API，支持拖拽式界面构建与 JSON 驱动渲染。",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://kavina.unsun.cc" }],
    ["meta", { property: "og:image", content: "https://kavina.unsun.cc/favicon.svg" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
  ],
  sitemap: { hostname: "https://kavina.unsun.cc" },
  ignoreDeadLinks: true,

  themeConfig: {
    search: { provider: "local" },
    logo: "/favicon.svg",

    nav: [
      { text: "指南", link: "/guide/introduction" },
      { text: "开发", link: "/dev/widget-dev" },
      { text: "拓展", link: "/packages" },
      { text: "演示", link: "https://kavina-demo.unsun.cc" },
      { text: "API", link: "/api/design" },
    ],

    sidebar: {
      "/guide/": [
        { text: "框架概述", link: "/guide/introduction" },
        { text: "快速开始", link: "/guide/getting-started" },
      ],
      "/dev/": [
        {
          text: "部件",
          items: [
            { text: "部件开发", link: "/dev/widget-dev" },
            { text: "定义参考", link: "/dev/widget-definition" },
          ],
        },
        {
          text: "核心",
          items: [
            { text: "节点数据", link: "/dev/node" },
            { text: "槽位嵌套", link: "/dev/slots" },
            { text: "上下文", link: "/dev/context" },
            { text: "渲染模式", link: "/dev/render-mode" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "插件开发", link: "/dev/plugins" },
            { text: "国际化", link: "/dev/i18n" },
            { text: "主题系统", link: "/dev/theme" },
            { text: "表达式引擎", link: "/dev/expression" },
          ],
        },
        { text: "拓展包", link: "/dev/package" },
      ],
      "/api/": [
        { text: "Design", link: "/api/design" },
        { text: "Display", link: "/api/display" },
        { text: "Tools", link: "/api/tools" },
        { text: "Hooks", link: "/api/hooks" },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Himavanta/kavina" }],

    footer: {
      copyright: "Copyright © 2026 kavina",
    },

    outline: { level: "deep", label: "本页导航" },
    docFooter: { prev: "上一节", next: "下一节" },
  },
});
