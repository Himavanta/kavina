# kavina

[![npm version](https://img.shields.io/npm/v/kavina)](https://www.npmjs.com/package/kavina)

基于 Vue 3 的低代码框架 —— 可视化设计器与组件化渲染器。

A Vue 3 low-code framework — visual designer and component renderer.

## 文档 / Docs

[kavina.unsun.cc](https://kavina.unsun.cc)

## 安装 / Install

```bash
npm install kavina
```

## 使用 / Usage

```vue
<script setup>
import { Design } from 'kavina/design'
import { example } from 'kavina/packages/example'
import { ref } from 'vue'

const views = ref([])
const widgets = [example]
</script>

<template>
  <Design v-model:views="views" :widgets="widgets" />
</template>
```

`Display` 用于渲染模式，API 相同：

`Display` for render mode, same API:

```vue
<script setup>
import { Display } from 'kavina/display'
</script>

<template>
  <Display v-model:views="views" :widgets="widgets" />
</template>
```
