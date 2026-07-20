# 快速开始

kavina 是 Vue 3 组件库，将其添加到已有的 Vite + Vue 3 项目中即可使用。

## 前置条件

- Vue 3.3+
- 已有 Vite 项目（或其他支持 Vue SFC 的构建工具）

## 安装

```bash
npm install kavina
```

## 准备部件

使用 kavina 前需要注册部件。`example` 是一个内置的部件集合，包含 text、array、group 等基础部件，适合初次体验：

```ts
import { example } from 'kavina/packages/example'

const widgets = [example]
```

每个 `example` 是一个部件包，会注册多个部件类型。后续可替换为自己开发的部件包。

## 接入设计器

```vue
<script setup>
import { Design } from 'kavina/design'
import { example } from 'kavina/packages/example'
import { ref } from 'vue'

const views = ref([])
const widgets = [example]
</script>

<template>
  <Design v-model:views="views" :widgets="widgets" />
</template>
```

Design 提供完整的可视化编辑能力——拖拽、嵌套、属性配置、实时预览。所有操作结果写入 `views`，需要持久化时保存这个数组即可。

Design 的 v-model 属性除了核心的 `views`，还支持 `dark`（暗色模式）、`theme`（主题色 hex）、`lang`（语言）。

## 接入渲染器

```vue
<script setup>
import { Display } from 'kavina/display'
import { example } from 'kavina/packages/example'
import { ref } from 'vue'

const views = ref([])
const model = ref({})
const widgets = [example]
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

Display 独立于设计器运行。它只需要 `views` 节点数组和 `widgets` 部件注册表即可渲染完整页面。

`model` 是数据源。部件可以通过节点上的 `model` 字段绑定到 `model` 对象的某个键，实现数据驱动渲染。`mode` 可选 `"display"` 或 `"print"`，默认为 `"display"`。

## 两者配合

一个典型用法是将设计器嵌入后台管理页，渲染器嵌入前台展示页：

```vue
<!-- 后台：编辑页 -->
<Design v-model:views="views" :widgets="widgets" />
<button @click="save">保存</button>
```

```vue
<!-- 前台：展示页 -->
<Display v-model:views="views" :widgets="widgets" mode="display" />
```

`views` 数组在两个组件间共享。保存时序列化为 JSON 存储，展示时反序列化传入即可。

## 暗色模式与主题

Design 和 Display 均支持通过 v-model 切换视觉样式：

```vue
<Design
  v-model:views="views"
  v-model:dark="isDark"
  v-model:theme="themeColor"
  :widgets="widgets"
/>
```

`dark` 为布尔值，`theme` 为 hex 颜色字符串（如 `"#4F46E5"`）。两种属性在 Design 和 Display 上完全一致。

## 核心 API

安装了 kavina 后，以下 API 可以直接使用：

| 导入路径 | 说明 |
| --- | --- |
| `kavina/design` | Design 设计器组件 |
| `kavina/display` | Display 渲染器组件 |
| `kavina/packages/*` | 内置部件包（example、vant、elementplus） |
| `kavina/hooks` | 上下文、部件注册、表达式执行等 hooks |
| `kavina/tools` | defineWidget、definePlugin、defineI18n 等工具 |

```ts
import { Design } from 'kavina/design'
import { Display } from 'kavina/display'
import { useContext, useWidgets } from 'kavina/hooks'
import { defineWidget, definePlugin, defineI18n } from 'kavina/tools'
```

## 下一步

- [部件开发](/dev/widget-dev) —— 编写自定义部件
- [节点数据](/dev/node) —— 理解 Node 结构
- [Design API](/api/design) —— 设计器属性参考
- [Display API](/api/display) —— 渲染器属性参考
