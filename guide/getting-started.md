# 快速开始

## 安装

```bash
npm install kavina
```

## 第一个设计器

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

`example` 包含一组基础 widget（text、array、group 等），方便快速体验。

## 切换到渲染模式

```vue
<script setup>
import { Display } from 'kavina/display'
</script>

<template>
  <Display v-model:views="views" :widgets="widgets" />
</template>
```

## 暗色模式与主题

```vue
<Design
  v-model:views="views"
  v-model:dark="isDark"
  v-model:theme="themeColor"
  :widgets="widgets"
/>
```

`dark` 为布尔值，`theme` 为 hex 颜色字符串。Design 和 Display 属性完全一致。
