# 渲染模式

kavina 有三种渲染模式，控制部件解析时使用的组件。

## 三种模式

| 模式 | 用途 | 生效环境 |
| --- | --- | --- |
| `design` | 设计器编辑态 | Design 组件 |
| `display` | 运行时展示 | Display 组件 |
| `print` | 打印输出 | Display 组件，`mode="print"` |

Design 固定使用 design 模式。Display 默认使用 display 模式，可通过 `mode` 属性切换为 print。

```vue
<Display mode="display" ... />
<Display mode="print" ... />
```

## 组件解析规则

框架根据模式从部件的组件列表中自动选择，规则如下：

| 模式 | 解析顺序 |
| --- | --- |
| `design` | `design` |
| `display` | `render` → `design` |
| `print` | `print` → `render` → `design` |

- design 模式直接使用 `design` 组件，无回退。
- display 模式优先 `render`。未提供 `render` 时，使用 `design` 作为展示组件。
- print 模式优先 `print`。未提供时依次回退到 `render` → `design`。

## 部件适配

### 不做区分

多数简单部件只提供 `design` 组件。design 模式以外的场景会自动回退，无需额外工作：

```ts
export default defineWidget(() => ({
  name: 'text',
  design: () => import('./design.vue'),
  setting: () => import('./setting.vue'),
  schema() { return { widget: this.name, content: 'Hello' } },
}))
```

### 区分展示态

当编辑态与展示态差异较大时，提供 `render` 组件：

```ts
export default defineWidget(() => ({
  name: 'chart',
  design: () => import('./design.vue'),   // 带交互手柄和占位数据
  render: () => import('./render.vue'),   // 纯展示，最终数据
  setting: () => import('./setting.vue'),
  schema() { return { widget: this.name } },
}))
```

Display 会优先使用 `render`，Design 仍使用 `design`。

### 区分打印态

需要打印优化时提供 `print` 组件：

```ts
export default defineWidget(() => ({
  name: 'report',
  design: () => import('./design.vue'),
  render: () => import('./render.vue'),
  print: () => import('./print.vue'),     // 简化布局、去除交互元素
  setting: () => import('./setting.vue'),
  schema() { return { widget: this.name } },
}))
```

## 在部件中感知模式

部件组件可通过 context 读取当前模式，用于条件渲染：

```vue
<script setup lang="ts">
import { useContext } from 'kavina/hooks'

const { mode } = useContext()
</script>

<template>
  <div>
    <ResizeHandle v-if="mode === 'design'" />
    <Content />
  </div>
</template>
```

例如拖拽手柄只在 design 模式显示，展示模式下完全隐藏。
