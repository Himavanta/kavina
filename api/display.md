# Display

组件化渲染器。接收节点数组和部件注册表，独立渲染页面。不依赖设计器。

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `widgets` | `WidgetLoader[]` | `[]` | 部件定义函数数组 |
| `mode` | `'display' \| 'print'` | `'display'` | 渲染模式 |
| `restore` | `boolean` | `false` | 启用恢复模式，标记节点优先使用 schema 原始值 |

## v-model

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `views` | `Node[]` | `[]` | 节点数组 |
| `model` | `Record<string, unknown>` | `{}` | 数据源对象 |
| `dark` | `boolean` | `false` | 暗色模式 |
| `theme` | `string` | — | 主题色 hex |
| `lang` | `string` | `'zh'` | 语言 |

## 暴露方法

`print()` —— 在控制台输出当前 views 数据和已注册节点列表。

## 用法

```vue
<script setup>
import { Display } from 'kavina/display'
import { ref } from 'vue'

const views = ref([])
const model = ref({})
const widgets = [/* ... */]
</script>

<template>
  <Display
    v-model:views="views"
    v-model:model="model"
    :widgets="widgets"
    mode="display"
  />
</template>
```
