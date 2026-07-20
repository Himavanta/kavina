---
layout: home

hero:
  name: kavina
  tagline: Vue 3 低代码框架 — 可视化设计器与组件化渲染引擎
  image:
    src: /favicon.svg
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 框架概述
      link: /guide/introduction
    - theme: alt
      text: 演示
      link: https://kavina-demo.unsun.cc

features:
  - title: 可视化设计器
    details: 拖拽式界面构建。基于 VueDraggable，支持嵌套槽位与实时属性配置。
  - title: 组件化渲染器
    details: 设计器产出 JSON 节点树，渲染器独立运行。design、render、print 三种模式按需切换。
  - title: 部件开发
    details: 通过 schema 定义数据结构，实现 design / render / print 组件即可注册。框架自动处理数据绑定与生命周期。
  - title: 槽位嵌套
    details: 节点通过 slots 递归组合成任意深度的树结构。拖拽跨 Drawer 移动，保持数据一致。
  - title: 主题定制
    details: 内置亮色 / 暗色模式，支持自定义主题色。CSS 变量控制样式，不与 UI 框架绑定。
  - title: 轻量无侵入
    details: 纯 Vue 3 组件，不限制技术栈。可作为独立模块嵌入已有项目。
---
