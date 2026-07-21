# 插件开发

插件用于扩展设计器的功能面板。使用 `definePlugin` 定义插件，在组合时决定展示位置。

## definePlugin

```ts
import { definePlugin } from "kavina/tools";

export default definePlugin({
  title: "我的面板",
  icon: MyIconComponent,
  component: defineAsyncComponent(() => import("./MyPanel.vue")),
});
```

`definePlugin` 返回 `PluginDef` 类型：

```ts
interface PluginDef {
  title: string | ((lang: string) => string);
  icon: Component;
  component: Component;
  window?: { width?: number; height?: number };
}
```

| 字段        | 说明                                        |
| ----------- | ------------------------------------------- |
| `title`     | 标题。支持字符串或根据语言动态返回的函数    |
| `icon`      | 图标组件。使用 `@tabler/icons-vue` 等图标库 |
| `component` | 插件主体组件                                |
| `window`    | 独立窗口默认尺寸，不指定时使用系统默认值    |

## 组合位置

`primary` 和 `second` 不属于插件定义，在组合为 `PluginItem[]` 时指定：

```ts
import myPlugin from "./my-plugin";

const plugins: PluginItem[] = [
  { ...myPlugin, primary: true }, // 左侧主面板
  { ...myPlugin, second: true }, // 右侧副面板
  { ...myPlugin }, // 仅独立窗口
];
```

```ts
interface PluginItem extends PluginDef {
  primary?: boolean; // 显示在左侧主面板
  second?: boolean; // 显示在右侧副面板
}
```

传入 Design：

```vue
<script setup>
import { Design } from "kavina/design";
import myPlugin from "./my-plugin";

const plugins = [...defaultPlugins, { ...myPlugin, primary: true }];
</script>

<template>
  <Design :plugins="plugins" ... />
</template>
```

## 展示位置

### 侧边面板

`primary: true` 的插件显示在画布左侧面板，`second: true` 的显示在右侧。

### 独立窗口

所有插件均可由用户选择以独立窗口形式打开。`window` 字段仅用于自定义窗口的默认宽高。未指定时使用系统默认尺寸。

## 插件组件内部

插件组件运行在设计器上下文中，可以通过 `useContext()` 访问完整的 context API：

```vue
<script setup>
import { useContext } from "kavina/hooks";

const { views, active, store, query, filter } = useContext();
</script>
```

常见用途：

- 部件大纲：遍历 `views` 展示节点树，点击切换 `active`
- 部件库：读取部件注册表，提供拖拽添加功能
- 文档面板：根据 `active` 节点的 widget 类型显示对应文档

## 内置插件

Design 默认注册了七个内置插件。需要保留部分默认插件时，从 `createDefaultPlugins` 筛选后合并：

```ts
const defaults = createDefaultPlugins();
const kept = defaults.filter((p) => ["outline", "settings"].includes(p.title));
const plugins = [...kept, { ...myPlugin, second: true }];
```
