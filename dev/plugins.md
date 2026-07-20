# 插件开发

插件用于扩展设计器的功能面板。每个插件是一个 Vue 组件，可以嵌入左右侧面板或独立窗口。

## 插件定义

```ts
interface PluginItem {
  title: string | ((lang: string) => string)
  icon: Component
  primary?: boolean
  second?: boolean
  component: Component
  window?: { width?: number; height?: number }
}
```

| 字段 | 说明 |
| --- | --- |
| `title` | 标题。支持字符串或根据语言动态返回的函数 |
| `icon` | 图标组件。使用 `@tabler/icons-vue` 等图标库 |
| `primary` | `true` 时显示在左侧主面板 |
| `second` | `true` 时显示在右侧副面板 |
| `component` | 插件主体组件 |
| `window` | 设置后以独立窗口形式打开，可指定宽高 |

## 基础示例

```ts
import { defineAsyncComponent } from 'vue'

const myPlugin = {
  title: '我的面板',
  icon: MyIconComponent,
  primary: true,
  component: defineAsyncComponent(() => import('./MyPanel.vue')),
}
```

传入 Design：

```vue
<script setup>
import { Design } from 'kavina/design'

// 默认插件 + 自定义插件
const plugins = [...defaultPlugins, myPlugin]
</script>

<template>
  <Design :plugins="plugins" ... />
</template>
```

如果要替换默认插件，直接传入自定义数组，不包含 `createDefaultPlugins()` 即可。

## 展示位置

### 侧边面板

`primary: true` 的插件显示在画布左侧面板，`second: true` 的显示在右侧。

```ts
{ title: '设置', icon: IconSettings, second: true, component: SettingPanel }
```

### 独立窗口

所有插件均可由用户选择以独立窗口形式打开。`window` 字段仅用于自定义窗口的默认宽高：

```ts
{
  title: '聊天',
  icon: IconMessage,
  window: { width: 400, height: 600 },
  component: ChatPanel,
}
```

未指定 `window` 时使用系统默认尺寸。设置的宽高将作为窗口初始尺寸。

## 插件组件内部

插件组件运行在设计器上下文中，可以通过 `useContext()` 访问完整的 context API：

```vue
<script setup>
import { useContext } from 'kavina'

const { views, active, store, query, filter } = useContext()
</script>
```

常见用途：

- 部件大纲：遍历 `views` 展示节点树，点击切换 `active`
- 部件库：读取部件注册表，提供拖拽添加功能
- 文档面板：根据 `active` 节点的 widget 类型显示对应文档

## 内置插件

Design 默认注册了七个内置插件。需要保留部分默认插件时，从 `createDefaultPlugins` 筛选后合并：

```ts
const defaults = createDefaultPlugins()
const kept = defaults.filter((p) => ['outline', 'settings'].includes(p.title))
const plugins = [...kept, myPlugin]
```
