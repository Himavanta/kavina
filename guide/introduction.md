# 框架概述

kavina 是 Vue 3 低代码框架，提供可视化设计器与组件化渲染引擎。

## 核心概念

kavina 围绕 **节点树** 构建。每个节点是一个 widget 实例，包含类型、数据、样式和子节点槽位。

```
Node
├── widget: "text"          ← 组件类型
├── key: "title"            ← 唯一标识
├── model: "title"          ← 数据绑定
├── valueExpr: "return ''"  ← 默认值表达式
├── style: "font-size: 14px"
└── slots:
    └── { name: "default", children: [...] }
```

## 两部分组成

**设计器（Design）** — 可视化编辑画布。拖拽节点、调整属性、配置样式。产出 JSON 节点树。

**渲染器（Display）** — 独立运行。接收节点树和 widget 注册表，渲染成最终页面。不依赖设计器。

## 三种渲染模式

| 模式 | 用途 | 组件选择 |
|---|---|---|
| design | 设计器内编辑态 | widget.design |
| display | 正常展示渲染 | widget.render ?? widget.design |
| print | 打印模式 | widget.print ?? widget.render ?? widget.design |

没有实现 render 或 print 的 widget 自动回退到 design。

## 你不需要

kavina 不提供后端、数据库、用户系统。它只是一个前端框架——你可以和任何后端技术搭配使用。
