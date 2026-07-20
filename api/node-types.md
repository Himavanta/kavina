# Node 类型

## NodeSchema

schema 阶段的节点数据，由 `schema()` 返回。

```ts
interface NodeSchema {
  widget: string
  key?: string
  model?: string
  slots?: Slot[]
  style?: string
  valueExpr?: string
  restore?: boolean
  [key: string]: unknown
}
```

## Node

运行时节点，`register()` 注入框架字段后得到。

```ts
interface Node extends NodeSchema {
  [KEY]: symbol
  key: string
  model: string
  [REF]?: unknown
}
```

## Slot

```ts
interface Slot {
  name: string
  title?: string
  children: Node[]
}
```

## WidgetDefinition

```ts
interface WidgetDefinition<T extends NodeSchema = NodeSchema> {
  name: string
  schema: (options: { lang: Ref<string> }) => T
  design?: () => Promise<Component>
  render?: () => Promise<Component>
  print?: () => Promise<Component>
  setting?: () => Promise<Component>
  thumb?: () => Promise<Component>
  doc?: () => Promise<Component>
}
```

## WidgetModule

`transform()` 处理后的部件模块。

```ts
interface WidgetModule {
  name: string
  schema: (options: { lang: Ref<string> }) => NodeSchema
  design?: Component
  render?: Component
  print?: Component
  setting?: Component
  thumb?: Component
  doc?: Component
}
```

## PluginItem

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
