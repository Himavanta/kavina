// https://vitepress.dev/guide/custom-theme
import { h, computed } from "vue";
import type { Theme } from "vitepress";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import LiveView from "../components/live-view.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { page } = useData();
    const isHome = computed(() => page.value.relativePath === "index.md");
    return h(DefaultTheme.Layout, null, {
      "home-hero-after": () => (isHome.value ? h(LiveView) : null),
    });
  },
  // enhanceApp({ app, router, siteData }) {},
} satisfies Theme;
