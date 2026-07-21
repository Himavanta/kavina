# 定义参考

`WidgetDefinition` 是 `defineWidget` 返回的对象类型，也是部件开发的完整字段参考。

## 字段一览

```ts
interface WidgetDefinition<T extends NodeSchema = NodeSchema> {
  name: string;
  schema: (options: { lang: Ref<string> }) => T;
  design?: () => Promise<Component>;
  render?: () => Promise<Component>;
  print?: () => Promise<Component>;
  setting?: () => Promise<Component>;
  thumb?: () => Promise<Component>;
  doc?: () => Promise<Component>;
}
```

## name

部件类型标识。字符串，全局唯一。schema 中的 `widget` 字段通过 `this.name` 绑定到该值。

```ts
name: "button";
```

## schema

返回部件的默认配置。接收 `lang` 参数，可结合 i18n 为不同语言生成不同的默认值。

```ts
schema({ lang }) {
  return {
    widget: this.name,
    text: lang === 'zh' ? '按钮' : 'Button',
  }
}
```

返回对象必须包含 `widget: string`。其余字段由开发者自定义，最终会序列化到 JSON 节点中。

## design

设计器编辑态组件。画布中显示的可交互部件视图。

此组件通过 context 获取当前节点数据、选中状态等信息。需处理选中、拖拽等交互行为。

## render

运行时展示组件。`Display` 在 `mode="display"` 时优先使用此组件。未提供时回退到 `design`。

## print

打印模式组件。`Display` 在 `mode="print"` 时使用。未提供时依次回退到 `render` → `design`。

## setting

属性配置面板。选中部件时在右侧面板显示。提供表单控件供用户编辑部件属性。

## thumb

缩略图组件。在部件库面板中显示为预览卡片。未提供时使用通用占位样式。

## doc

文档视图组件。用户可在此阅读部件的使用说明、属性描述、代码示例。未提供时不显示文档入口。

## 组件解析规则

框架根据当前模式自动选择组件，规则如下：

| 模式        | 解析顺序                      |
| ----------- | ----------------------------- |
| `"design"`  | `design`                      |
| `"display"` | `render` → `design`           |
| `"print"`   | `print` → `render` → `design` |

## defineWidget

`defineWidget` 是一个类型辅助函数，保持定义的完整性和类型推断：

```ts
function defineWidget<T extends NodeSchema = NodeSchema>(
  loader: () => WidgetDefinition<T>,
): () => WidgetDefinition<T>;
```

实际运行时直接返回传入的函数，不做任何转换。它的作用是在 TypeScript 中通过泛型 `T` 约束 schema 的返回类型。

## 下一步

- [部件开发](/dev/widget-dev) —— 从零开始写一个部件
- [上下文](/dev/context) —— 组件中可用的 context API
