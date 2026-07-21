# 拓展包

拓展包是 kavina 的最高级分发单位。它是一个抽象概念，不限制内容——可以包含部件、插件、自定义方法、SDK，或以上任意组合。

## 定位

拓展包不规定导出格式，也不要求必须包含什么。

- 可以只提供一两个部件
- 可以只提供一个插件
- 可以同时包含部件、插件、i18n、主题、自定义工具
- 可以只封装一套私有 SDK

它是拓展包开发者自由定义的空间。kavina 只约定各项内容的消费方式，不约定生产方式。

## 部件

拓展包可以包含部件。添加到 Design 或 Display 的 `widgets` 属性即可使用：

```ts
import myPackage from "my-package";

const widgets = [myPackage.widgets];
```

`widgets` 属性接收一个数组，内部通过 `flat(Infinity)` 拉平所有层级。无论拓展包内部如何组织部件，最终只需将部件定义函数传入即可。

## 插件

拓展包可以包含插件。使用 `definePlugin` 定义，添加位置后传入 Design：

```ts
import { definePlugin } from "kavina/tools";

const myPlugin = definePlugin({
  title: "我的面板",
  icon: MyIcon,
  component: MyPanel,
});

export default {
  plugins: [{ ...myPlugin, primary: true }],
};
```

使用者拆开填入 `plugins` 属性：

```ts
import myPackage from "my-package";

const plugins = [...builtinPlugins, ...myPackage.plugins];
```

## 其他资源

拓展包没有范围限制。i18n 语言包、主题变量、自定义钩子、辅助工具——任何需要随包分发的内容，都可以作为拓展包的一部分导出。

## 独立使用

部件和插件也可以脱离拓展包单独使用。拓展包不是必需的——直接提供一个部件定义函数或一个插件对象，同样可以正常工作。

```ts
import { defineWidget } from "kavina/tools";

const myWidget = defineWidget(() => ({
  name: "hello",
  design: () => import("./design.vue"),
  setting: () => import("./setting.vue"),
  schema() {
    return { widget: this.name, text: "Hello" };
  },
}));

// <Design :widgets="[myWidget]" ... />
```

## 下一步

- [部件开发](/dev/widget-dev) —— 单个部件的开发方式
- [插件开发](/dev/plugins) —— 插件详解
- [国际化](/dev/i18n) —— i18n 工具
