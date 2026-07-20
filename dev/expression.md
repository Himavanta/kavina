# 表达式引擎

kavina 通过 `valueExpr` 字段支持 JavaScript 表达式，用于动态默认值和事件处理。

## 工作原理

`execute` 将字符串编译为函数，绑定的 `this` 上下文包含 context 和 indexed。格式为标准的 JavaScript 函数体：

```ts
// valueExpr: "return model.title || '默认标题'"
```

编译后的函数接收 `this` 上下文，通过 `context` 访问框架状态，通过 `indexed` 获取渲染层数据。

## valueExpr

在 schema 中设置 `valueExpr` 为节点提供动态默认值：

```ts
schema() {
  return {
    widget: this.name,
    valueExpr: "return context.model.title || '未命名'",
  }
}
```

表达式通过 `new Function()` 编译，运行在浏览器沙箱中。编译失败时返回 `null` 而非抛出异常。

## 在部件中使用

调用 `useExecute` 获取绑定好上下文的执行器：

```ts
import { useExecute } from 'kavina'

const execute = useExecute()

// 执行节点上的 valueExpr
const fn = execute(props.node.valueExpr || '')
const value = fn?.()
```

执行器返回一个函数，调用后得到表达式结果。

## 链式调用

表达式支持链式返回——如果表达式返回一个函数，框架会继续调用直到获得非函数值：

```ts
// valueExpr: "return () => () => '最终值'"
// 链条：→ fn → fn → '最终值'
```

这使得表达式可以逐步解包，支持高阶函数作为默认值方案。
