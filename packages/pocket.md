# pocket

PocketBase 数据源拓展包。为 kavina 提供页面持久化与云端管理能力。

## 功能

- **页面管理** —— 创建、编辑、删除页面，列表实时刷新
- **数据持久化** —— 通过 PocketBase 存储页面配置，支持多端共享
- **Quoted 部件** —— 引用其他页面的 schema，实现页面嵌套与模块复用
- **Compose 编辑** —— 内置设计器入口，直接编辑 PocketBase 中的页面
- **Viewer 展示** —— 页面只读展示模式

## 使用

```ts
import { createPocketRoutes, pocketWidgets } from "kavina/packages/pocket"

const meta = { widgets: [Object.values(example), pocketWidgets] }
const routes = createPocketRoutes({ meta })
```

`createPocketRoutes` 生成 `/pocket/:id/:sheet?` 路由，对应页面的编辑与展示。

## 部件

| 部件       | 说明                     |
| ---------- | ------------------------ |
| `quoted`   | 引用其他页面，实现模块化 |

## 前置

需要 PocketBase 实例，并在 `kavian_pages` 集合中存储页面数据。

```ts
import { pb } from "kavina/packages/pocket/pocketbase"

pb.baseUrl = "https://your-pocketbase.example.com"
```
