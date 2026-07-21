# 节点数据

节点（Node）是 kavina 的数据核心。每个节点代表页面上的一个部件实例，包含了部件的类型、配置、数据和嵌套关系。

## 两种形态

节点在整个生命周期中有两种形态：

**NodeSchema** —— schema 阶段的产出。由部件开发者通过 `schema()` 返回，只包含 `widget` 和自定义字段。所有字段可选（除 `widget`）。

**Node** —— 运行时形态。`register()` 为节点注入框架字段后得到。`[KEY]`、`key`、`model` 变为必填。

```text
schema() 产出 NodeSchema
    │
    ▼
keyEach / register
    │
    ▼
运行时 Node（[KEY] + key + model 已保证）
```

## Node 字段

### widget

部件类型标识。对应 `WidgetDefinition.name`，由 `schema()` 中 `this.name` 自动绑定。

### key

节点标识符。字符串，在一个 views 数组内唯一。用于 `query()` 查找和数组 diff。`schema()` 可预置，未提供时由框架自动生成。

### model

数据键名。绑定到 Display 的 `model` 对象上。例如 `model: "title"` 表示该节点的值取自 `model.title`。同样支持 schema 预置或自动生成。

### style

内联 CSS 样式字符串。直接写入节点的 `style` 属性，由部件的组件按需应用。

支持原生 CSS 嵌套语法（`&` 引用当前元素）：

```css
color: red;
&:hover {
  color: blue;
}
& > .child {
  font-size: 14px;
}
```

这使得低代码配置中可以用一个字符串描述完整的样式规则，包括伪类和子元素。

### valueExpr

默认值表达式。JavaScript 字符串，框架通过 `execute()` 编译执行。用于表达式驱动的动态默认值。

### restore

恢复模式标记。`true` 时，Display 优先使用 schema 定义的原始值，而非运行时外部传入的修改值。

配合 Display 的 `restore` 属性使用：

```vue
<Display :restore="true" v-model:views="views" v-model:model="model" :widgets="widgets" />
```

启用后，标记了 `restore: true` 的节点会忽略 `model` 中的值，始终显示 schema 预设的原始数据。典型场景是表单系统——需要区分"schema 默认值"和"用户实际输入"时使用。

### 扩展字段

通过 `[key: string]: unknown` 支持任意自定义字段。部件开发者可以在 schema 中自由添加业务属性，所有字段都会被序列化到 JSON 节点中。

```ts
// 部件 schema 可以定义任意字段
schema() {
  return {
    widget: this.name,
    color: '#333',         // 自定义
    maxLength: 100,        // 自定义
    validationRules: [],   // 自定义
  }
}
```

## 框架字段

两个字段由框架管理，开发者不直接操作：

- `[KEY]` —— 内部唯一标识。`Symbol` 类型，`JSON.stringify` 自动跳过，不影响序列化。用于 v-for 的 `:key` 和 store 内部查找。
- `[REF]` —— 组件实例引用。由 `:ref` 回调自动设置。挂载时指向组件实例，卸载时置为 null。

开发者不应在 schema 中设置这两个字段，也不应依赖它们进行业务逻辑。

## Slot

节点通过 `slots` 字段支持嵌套。每个 slot 是一个命名子节点容器：

```ts
interface Slot {
  name: string; // 槽位名称，对应 <template #name>
  title?: string; // 可选标题
  children: Node[]; // 子节点列表
}
```

slot 结构使节点可以递归组合，形成任意深度的树。关于槽位的详细用法，见 [槽位嵌套](/dev/slots)。

## JSON 兼容性

节点可以安全地通过 `JSON.stringify` 序列化为 JSON。`Symbol` 类型的 `[KEY]` 和 `[REF]` 会被自动忽略，仅保留字符串和普通值字段。反序列化后重新注册即可恢复运行时字段。
