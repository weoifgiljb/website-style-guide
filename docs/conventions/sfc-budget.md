# Vue 单文件行数与复用规范

适用于 `website-style-guide` 的新代码，以及本次拆分后改过的壳层文件。演示卡（`src/components/demos/`）维持一卡一文件，不因复用合并。

## 行数

- 单个 `.vue` 上限 **400 行**（`<script>` + `<template>` + `<style>` 合计）。超过就按界面区块拆子组件。
- 不要把 `<style>` 抽到外部 CSS 文件来凑行数。样式跟拥有这块 DOM 的组件走，继续 `<style scoped>`。
- 全局样式只放设计变量，文件是 `src/styles/tokens.css`。
- `<script setup>` 里的计时器、滚动锁、定位超过约 **180 行**时，抽到 `src/composables/`。组件只留 props、事件和调用。

## 什么时候抽共用

- 同一段交互出现在 **2 个及以上**文件，才抽 composable。只用一次的逻辑留在原组件。抽屉的 `lockBodyScroll` 只有一处使用，留在抽屉壳里。
- 纯展示用的选项目录放 `src/data/`。拼字符串的函数留在 `src/utils/`。
- `demos/layouts`、`demos/motions`、`demos/pitfalls` 维持一卡一文件。不要把迷你骨架并成一个大开关组件。
- Tooltip 里的微缩场景不要去套完整 Demo。两边尺寸和节奏不同。

## 目录

子组件与父功能放在同一目录：

- `src/components/shell/blueprint/`：整页抽屉的顶栏、楼层编排、动效多选、话术块、画布
- `src/components/shell/tooltip/scenes/`：悬停提示里的微缩场景
- `src/components/shell/competitor/`：竞品动效弹窗的表单和选项组

对外入口文件名保持不变：`PageBlueprintDrawer.vue`、`MotionTooltip.vue`、`CompetitorPromptModal.vue`、`BlueprintFloorPreview.vue` 仍在 `src/components/shell/`，内部再引用子目录。`App.vue` 的 import 路径不改。

## 拆分时保持不变

拆分是移动代码，不改交互、话术和视觉。

- 类名、文案、时长、`anim` 取值保持原样。
- `MotionTooltip` 的 props 保持：`visible`、`title`、`badge`、`tip`、`anim`、`placement`、`anchorRect`。
- `BlueprintFloorPreview` 的 props 保持：`floorIndex`、`layoutItem`、`motionItem`、`motionItems`、`viewport`、`replayKey`、`scrollRatio`。

## 观察名单

下面两个文件各管一件事，这次不拆。下次改它们时，如果会超过 400 行，先拆再改。

- `src/components/shell/PresetShowcaseStrip.vue`
- `src/composables/useCatalogStore.js`

## 验收

- 改过的 `.vue` 与新建的 `.vue` 都低于 400 行。
- `npm test` 通过。
- 整页抽屉、悬停提示、竞品弹窗的可见行为与拆分前一致。
