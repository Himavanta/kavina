import { defineConfig } from "vitepress";

export default defineConfig({
  title: "kavina",
  description: "Vue 3 低代码框架 — 可视化设计器与组件化渲染引擎",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  sitemap: { hostname: "https://kavina.unsun.cc" },
  lastUpdated: true,
  ignoreDeadLinks: true,

  themeConfig: {
    search: { provider: "local" },
    logo: "/favicon.svg",

    nav: [
      { text: "指南", link: "/guide/introduction" },
      { text: "开发", link: "/dev/widget-dev" },
      { text: "拓展", link: "/packages" },
      { text: "在线体验", link: "/demo" },
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
            { text: "拓展包", link: "/dev/package" },
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
            { text: "主题系统", link: "/dev/theme" },
            { text: "表达式引擎", link: "/dev/expression" },
            { text: "插件开发", link: "/dev/plugins" },
            { text: "国际化", link: "/dev/i18n" },
          ],
        },
      ],
      "/api/": [
        { text: "Design", link: "/api/design" },
        { text: "Display", link: "/api/display" },
        { text: "Node 类型", link: "/api/node-types" },
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
