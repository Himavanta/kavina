# 槽位嵌套

槽位（slot）是节点嵌套子节点的方式。通过槽位，节点可以形成任意深度的树结构。

## 槽位结构

每个节点通过 `slots` 字段声明它能容纳的子节点：

```ts
// 节点上的槽位
slots: [
  {
    name: 'default',         // 槽位名称
    title: '内容区域',        // 可选标题
    children: [Node, ...],   // 子节点列表
  },
]
```

一个节点可以有多个槽位（如 `header`、`footer`、`default`），每个槽位独立管理自己的子节点列表。

## Schema 声明

在部件的 schema 中声明槽位：

```ts
schema() {
  return {
    widget: this.name,
    slots: [
      { name: 'default', children: [] },
      { name: 'footer', children: [] },
    ],
  }
}
```

每个槽位必须提供 `name`，`children` 初始化时为空数组。

## 在组件中使用

部件组件通过 Vue 的具名插槽暴露嵌套入口：

```vue
<!-- layout/design.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot name="default" />
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
```

在 schema 中声明了 `header`、`default`、`footer` 三个槽位，组件中对应三个 `<slot>`。框架自动将每个槽位的 `children` 渲染为一个递归的 Drawer（设计器）或 Render（渲染器）。

## 递归渲染

框架处理槽位的方式是递归：

```text
节点 A
└─ slot: default
    └─ children: [节点 B, 节点 C]
                    │         │
                    │         └─ slot: default
                    │              └─ children: [节点 D]
                    │
                    └─ slot: header
                         └─ children: [节点 E]
```

每个槽位的 `children` 数组会被传入一个新的 Drawer / Render 实例。这个实例内部的节点又可以有自己的槽位，形成无限深层嵌套。

## 跨层拖拽

设计器模式下，VueDraggable 通过 `group.name` 实现跨 Drawer 的拖拽。同一 scope 下的所有 Drawer 共享拖拽区域，节点的移动不受层级限制。

拖入新 Drawer 的节点会自动注册到上下文 store 中，保持数据一致性。

## 部件开发注意事项

编写支持嵌套的部件时：

- schema 中声明 `slots` 字段，初始化空 children
- 组件模板中使用 `<slot>` 对应每个槽位
- 槽位的样式由部件自行控制——框架只负责渲染子节点

不支持嵌套的部件不声明 `slots` 即可。框架不会为无槽位节点渲染多余的容器。

## 动态槽位

槽位数量不限于 schema 中声明的初始值。以 tabs 部件为例，它可以在运行时动态增删选项卡：

```ts
// schema 初始化两个选项卡
schema() {
  const [make] = keysCans((v) => `Tab-${v}`)
  return {
    widget: 'tabs',
    active: make('tab1'),
    slots: [
      { name: make('tab1'), title: make('tab1'), children: [] },
      { name: make('tab2'), title: make('tab2'), children: [] },
    ],
  }
}
```

设置面板可以在运行时 push 新的槽位对象，组件模板中使用 `v-for` 遍历槽位渲染即可。

### keysCans

动态槽位中，槽位的 `name` 需要保持稳定。`keysCans` 是为此设计的键名生成工具：

```ts
const [make] = keysCans((v) => `Tab-${v}`)

make('tab1')  // 首次调用，生成并缓存 'iTab-a1b2c3'
make('tab2')  // 生成并缓存 'iTab-d4e5f6'
make('tab1')  // 再次调用，命中缓存，返回 'iTab-a1b2c3'
```

它维护一个内部 `Map`，通过 get-or-create 模式工作：同一个 key 无论调用多少次，始终返回同一个值。这保证了动态增删槽位时，已存在的槽位名称不会漂移。
