# Hooks

## useContext

获取设计器或渲染器上下文。必须在 Design 或 Display 组件内部调用。

```ts
function useContext(): AppContext
```

返回 `AppContext`，包含 CommonState 和 DesignState 的所有字段。Display 模式下 design 字段为安全默认值。

## useWidgets

获取已注册的部件模块列表。

```ts
function useWidgets(): Widgets | null

interface Widgets {
  array: WidgetModule[]
  enums: Record<string, WidgetModule>
}
```

## useExecute

获取绑定上下文的表达式执行器。

```ts
function useExecute(widgetContext?: Record<string, unknown>): typeof execute
```

返回的 `execute` 函数可通过 `this` 访问 context、indexed 和自定义 widgetContext。

## useTheme

注入主题 CSS 变量。

```ts
function useTheme(params: {
  scope: string
  theme?: string | Ref<string>
  dark?: boolean | Ref<boolean>
}): void
```

## useRestoreMode

获取恢复模式状态。

```ts
function useRestoreMode(): RestoreState

interface RestoreState {
  enableRestoreMode: boolean
  originalDataSet: WeakSet<object>
}
```
