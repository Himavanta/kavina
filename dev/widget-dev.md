# 部件开发

部件是 kavina 的最小可扩展单元。一个部件需要定义它在设计器和渲染器中的外观，以及可配置的属性。

## 定义部件

使用 `defineWidget` 定义部件。最小部件只需要 `name`、`design`、`setting` 和 `schema`：

```ts
import { defineWidget } from 'kavina/tools'

export default defineWidget(() => ({
  name: 'button',

  // 设计器中的编辑态组件
  design: () => import('./design.vue'),

  // 属性配置面板
  setting: () => import('./setting.vue'),

  // 默认数据
  schema() {
    return {
      widget: this.name,
      text: '按钮',
      type: 'primary',
    }
  },
}))
```

注册到 Design 和 Display：

```ts
import button from './button/index.ts'

const widgets = [button]

// <Design :widgets="widgets" ... />
// <Display :widgets="widgets" ... />
```

## 部件组件

### design

画布中的可视化组件。在设计器内渲染，支持拖拽、选中、嵌套等交互。每个部件必须提供。

### setting

属性配置面板。选中部件后右侧显示，提供输入控件供用户修改属性。必须提供。

### render

运行时展示组件。`Display` 优先使用 `render`，未提供时回退到 `design`。

对于展示与编辑效果一致的简单部件，可以不写 `render`。两者差异较大（如编辑态需要交互手柄、展示态只需静态渲染）时才分开实现。

### print

打印模式组件。`Display` 在 `mode="print"` 时使用。未提供时依次回退到 `render` → `design`。

### thumb

部件库面板中的预览缩略图。未提供时使用通用样式。

### doc

内置文档。提供后，用户可在设计器中直接查看该部件的使用说明。

## Schema

`schema()` 返回部件的默认配置，必须包含 `widget` 字段：

```ts
schema() {
  return {
    widget: this.name,   // 框架自动绑定 name
    text: '按钮',         // 自定义属性
    type: 'primary',      // 自定义属性
    disabled: false,      // 自定义属性
  }
}
```

`schema()` 被调用时 `this` 指向定义对象自身，因此 `this.name` 指向部件名。除 `widget` 外，返回对象的其余字段完全由开发者自定义。

## TypeScript

可以通过泛型为 schema 指定类型，获得类型提示：

```ts
import { defineWidget } from 'kavina/tools'
import type { NodeSchema } from 'kavina/tools'

interface ButtonNode extends NodeSchema {
  text: string
  type: 'primary' | 'default'
  disabled: boolean
}

export default defineWidget<ButtonNode>(() => ({
  name: 'button',
  design: () => import('./design.vue'),
  setting: () => import('./setting.vue'),
  schema() {
    return {
      widget: this.name,
      text: '按钮',
      type: 'primary',
      disabled: false,
    }
  },
}))
```

`NodeSchema` 是基础节点类型，只要求 `widget: string`。在 `defineWidget<T>` 的泛型中，`T` 需继承 `NodeSchema`。

## 下一步

- [定义参考](/dev/widget-definition) —— 所有字段的详细说明与类型签名
- [上下文](/dev/context) —— 组件中可用的 context API
- [槽位嵌套](/dev/slots) —— 支持嵌套子节点的部件写法
