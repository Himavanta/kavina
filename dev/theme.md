# 主题系统

kavina 基于 CSS 变量实现主题。通过 `theme` 和 `dark` 属性控制整体视觉。

## 使用

```vue
<Design v-model:dark="isDark" v-model:theme="themeColor" :widgets="widgets" />
```

`dark` 切换亮暗，`theme` 为 hex 颜色。Design 和 Display 用法一致。

## CSS 变量

框架根据 `theme` 生成 0-1000 色阶：`--kav-0` 到 `--kav-1000`，以及 `--kav-border-color`。暗色模式下色阶自动反转。

部件样式中直接使用即可跟随主题：

```css
.MyWidget {
  color: var(--kav-900);
  background: var(--kav-50);
  border: 1px solid var(--kav-border-color);
}
```

不需要在脚本中处理主题逻辑。
