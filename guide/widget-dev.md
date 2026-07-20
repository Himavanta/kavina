# 组件开发

每个 widget 是一组约定文件，放在 `packages/` 目录下。

## 目录结构

```
packages/packages/my-widget/
├── index.ts          # 注册入口
├── design.vue        # 设计器编辑组件
├── render.vue        # 渲染展示组件（可选）
├── print.vue         # 打印组件（可选）
├── setting.vue       # 设置面板组件（可选）
└── doc.vue           # 内置文档组件（可选）
```

## 注册入口

```ts
import { defineWidget } from "#tools/widget/index.ts";
import type { WidgetDefinition } from "#tools/widget/index.ts";

export default defineWidget(() => {
  return {
    name: "my-widget",
    schema: ({ lang }) => ({
      widget: "my-widget",
      key: "my-widget",
      model: "my-widget",
    }),
    design: () => import("./design.vue"),
    render: () => import("./render.vue"),
    // 省略其他可选属性
  } satisfies WidgetDefinition;
});
```

`schema({ lang })` 返回新节点的初始数据。`key` 和 `model` 可选，未提供时框架自动生成唯一值。

## Design 组件

设计器中的编辑态。接收 `node` 和 `widget` 两个 props：

```vue
<script setup>
defineProps(["node", "widget"]);
</script>

<template>
  <div>{{ node.widget }} here</div>
</template>
```

## 使用 Context

```vue
<script setup>
import { useContext } from "#hooks/index.ts";

const { mode, dark, lang } = useContext();
</script>
```

`mode` 为 `'design'` | `'display'` | `'print'`。所有字段始终可用。

## 注册

widget 写好之后，在入口文件中 import 并传入 Design 或 Display 的 `widgets` 属性即可。
