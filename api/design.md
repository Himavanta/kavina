# Design

可视化设计器组件。提供拖拽画布、属性面板、部件大纲等完整编辑能力。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `widgets` | `WidgetLoader[]` | `[]` | 部件定义函数数组，支持任意嵌套 |
| `plugins` | `PluginItem[]` | 内置插件 | 设计器面板插件 |

## v-model

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `views` | `Node[]` | `[]` | 当前画布的节点数组 |
| `dark` | `boolean` | `false` | 暗色模式 |
| `theme` | `string` | — | 主题色 hex |
| `lang` | `string` | `'zh'` | 语言 |

## 用法

```vue
<script setup>
import { Design } from 'kavina/design'
import { ref } from 'vue'

const views = ref([])
const widgets = [/* ... */]
</script>

<template>
  <Design
    v-model:views="views"
    v-model:dark="isDark"
    v-model:theme="themeColor"
    v-model:lang="locale"
    :widgets="widgets"
    :plugins="plugins"
  />
</template>
```
