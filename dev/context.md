# 上下文

上下文（context）是注入到所有部件组件中的共享状态和方法。通过 `useContext()` 获取。

## 架构

context 分为两层：

- **CommonState** —— 所有模式均可用的公共状态。Design 和 Display 都会注入。
- **DesignState** —— 仅 Design 模式可用的设计器状态。Display 模式下提供安全的空操作默认值。

`useContext()` 始终返回完整的 `AppContext`，无需判空。无论组件运行在设计器还是渲染器中，调用方可以安全访问所有字段。

```ts
import { useContext } from 'kavina'

const context = useContext()
```

## CommonState

所有模式下可用：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `scope` | `string` | CSS 作用域 class 和 VueDraggable group name |
| `dark` | `Ref<boolean>` | 暗色模式 |
| `mode` | `'design' \| 'display' \| 'print'` | 当前渲染模式 |
| `lang` | `Ref<string>` | 当前语言，如 `'zh'` |
| `model` | `Ref<Record<string, unknown>>` | 数据源对象 |
| `views` | `Ref<Node[]>` | 当前层级的节点数组 |

### store 与节点管理

`store` 是一个 `Map<symbol, Node>`，维护当前 scope 下所有已注册的节点。开发者通常不需要直接操作 store，而是使用以下方法：

| 方法 | 说明 |
| --- | --- |
| `register(node)` | 注册节点到 store，自动分配 `[KEY]` |
| `deregister(node)` | 从 store 中移除节点 |
| `query(key)` | 按 `key` 字符串查找节点 |
| `filter(fn)` | 按条件筛选节点，返回 `Node[]` |

```ts
const node = context.query('header-title')
const formNodes = context.filter((n) => n.widget === 'input')
```

## DesignState

仅 Design 模式下可用。Display 模式调用时返回无害默认值：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `active` | `Ref<Node \| null>` | 当前选中的节点 |
| `loadSchema(schema)` | `(nodes: Node[]) => void` | 导入节点数组，替换当前 views |
| `clear()` | `() => void` | 清空所有节点并销毁 store |
| `destroy()` | `() => void` | 销毁设计器实例 |
| `plugins` | `PluginItem[]` | 当前注册的插件列表 |

## 在部件中使用

### 读取当前节点数据

部件组件通过 props 接收 `node`，配合 context 获取全局状态：

```vue
<script setup lang="ts">
import { useContext } from 'kavina'
import type { Node } from 'kavina'

const props = defineProps<{ node: Node }>()
const { dark, mode, lang } = useContext()
</script>
```

### 获取其他节点

通过 `query` 和 `filter` 查找其他已注册节点：

```ts
const { query, filter } = useContext()

// 查找特定 key 的节点
const target = query('sidebar')

// 筛选所有 form 部件
const forms = filter((n) => n.widget === 'form')
```

### 访问数据源

读取或修改 Display 的 `model` 绑定值：

```ts
const { model } = useContext()

// 读取
console.log(model.value[props.node.model])

// 修改
model.value[props.node.model] = 'new value'
```

## 注意事项

- `useContext()` 必须在 Design 或 Display 组件内部调用，否则抛出错误。
- `store` 是原始 Map，不在 Vue 的响应式系统中。如果需要响应式地监听节点注册/注销，应通过 `views` 数组。
- Display 模式下的 `active` 始终为 `null`，`loadSchema`、`clear` 为空操作。
