# Tools

核心工具函数与类型定义。导入路径 `kavina/tools`。

## 类型

### NodeSchema

`schema()` 返回的初始节点数据。widget 开发者提供，`key` / `model` 可选。

```ts
interface NodeSchema {
  widget: string; // widget 名称，必填
  key?: string; // 节点标识符，可选
  model?: string; // 数据模型键名，可选
  slots?: Slot[]; // 嵌套槽位
  style?: string; // 内联 CSS 样式
  valueExpr?: string; // 默认值表达式
  restore?: boolean; // 恢复模式标记
  [key: string]: unknown; // 扩展字段
}
```

### Node

完整节点对象。`register()` 注入框架字段后得到，`key` / `model` 始终有值。

```ts
interface Node extends NodeSchema {
  [KEY]: symbol; // 框架内部唯一标识
  key: string; // 节点标识符，始终有值
  model: string; // 数据模型键名，始终有值
  [REF]?: unknown; // 组件实例引用
}
```

### Slot

节点槽位，用于嵌套子节点。

```ts
interface Slot {
  name: string; // 槽位名称，对应 <template #name>
  title?: string; // 可选标题
  children: Node[]; // 子节点列表
}
```

### WidgetDefinition

部件定义对象。

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

### WidgetModule

`transform()` 处理后的部件模块，动态导入已解析为同步组件。

```ts
interface WidgetModule {
  name: string;
  schema: (options: { lang: Ref<string> }) => NodeSchema;
  design?: Component;
  render?: Component;
  print?: Component;
  setting?: Component;
  thumb?: Component;
  doc?: Component;
}
```

### PluginDef

插件定义类型，`definePlugin` 返回。

```ts
interface PluginDef {
  title: string | ((lang: string) => string);
  icon: Component;
  component: Component;
  window?: { width?: number; height?: number };
}
```

### PluginItem

组合位置的完整插件类型。`primary` / `second` 控制插件显示区域。

```ts
interface PluginItem extends PluginDef {
  primary?: boolean; // 显示在主要区域
  second?: boolean; // 显示在次要区域
}
```

## 常量

### KEY

```ts
const KEY: unique symbol;
```

框架内部唯一标识的 Symbol 键，存储在 `Node[KEY]`。

### REF

```ts
const REF: unique symbol;
```

组件实例引用的 Symbol 键，存储在 `Node[REF]`。

## defineWidget

部件定义函数。接收 `WidgetDefinition`，返回 widget 加载器。

```ts
function defineWidget<T extends NodeSchema = NodeSchema>(
  definition: WidgetDefinition<T>,
): WidgetLoader<T>;
```

返回的 `WidgetLoader` 可直接传入 Design / Display 的 `widgets` 属性。

```ts
import { defineWidget } from "kavina/tools";

const myWidget = defineWidget({
  name: "hello",
  schema({ lang }) {
    return { widget: this.name, text: "Hello" };
  },
  design: () => import("./design.vue"),
  setting: () => import("./setting.vue"),
});
```

## definePlugin

插件定义函数。参数即返回值，提供类型推导。

```ts
function definePlugin(plugin: PluginDef): PluginDef;
```

```ts
import { definePlugin } from "kavina/tools";

const myPlugin = definePlugin({
  title: "我的面板",
  icon: MyIcon,
  component: MyPanel,
});
```

使用时需设置位置：

```ts
const plugins = [
  { ...myPlugin, primary: true },
  { ...otherPlugin, second: true },
];
```

## defineI18n

国际化工具。接收返回词典的函数，返回上下文绑定的翻译回调。

```ts
function defineI18n(
  func: () => [Record<string, number>, Record<string, string[]>],
): (this: string | Ref<string>, key: string, lang?: string | Ref<string>) => string;
```

- 第一个返回元素 `Record<string, number>` 映射语言标识符到索引
- 第二个返回元素 `Record<string, string[]>` 映射 key 到各语言文本数组

回调的 `this` 用于绑定当前语言。调用方式：

```ts
const t = defineI18n(() => [
  { zh: 0, en: 1 },
  { hello: ["你好", "Hello"], world: ["世界", "World"] },
]);

// 组件中通过 ctx.lang 绑定
const l = t.bind(lang);
l("hello"); // '你好' 或 'Hello'
```

## exchange

根据当前语言解析字符串或函数。

```ts
function exchange(text: string | ((lang: string) => string), lang: string): string;
```

```ts
exchange("Hello", "zh"); // 'Hello'
exchange((l) => (l === "zh" ? "你好" : "Hello"), "zh"); // '你好'
```
