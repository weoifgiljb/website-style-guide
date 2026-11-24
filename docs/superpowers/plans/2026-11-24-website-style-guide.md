# SaleSmartly 官网常用样式 & 动画效果速查（Vue 3 组件化版） Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `C:\Users\standardsoftware\Desktop\练习摸鱼用\website-style-guide` 构建零重型依赖的 Vue 3 + Vite 组件化样式与动效速查站（含 14 种版式、14 种动效、6 种避坑与手机端简化对比、整页骨架拼装预览及 GitHub Actions 自动部署 GitHub Pages 配置）。

**Architecture:** 采用「纯数据注册表（`src/data/`）+ 无 DOM 耦合的话术/编排纯函数（`src/utils/promptBuilder.js`）+ 响应式状态管理（`src/composables/useCatalogStore.js`）+ 一卡一独立 `.vue` 小组件（`src/components/demos/`）」分层设计。所有版式组件统一支持 `viewport` 属性（`desktop` / `mobile`），同时服务于速查卡片舞台与「整页骨架拼装预览」画布。

**Tech Stack:** Vue `^3.5`、Vite `^6`、`@vitejs/plugin-vue` `^5`、原生 CSS 变量、Node.js 内置 `node:test`（零额外测试依赖）、GitHub Actions Pages 部署工作流。

## Global Constraints

- 工作目录严格限定为 `C:\Users\standardsoftware\Desktop\练习摸鱼用\website-style-guide`，禁止修改 `c:\Users\standardsoftware\Desktop\www\www` 仓库文件或删除 `C:\Users\standardsoftware\Desktop\练习摸鱼用\常用动画效果速查.html`。
- `vite.config.js` 必须设置 `base: './'`，确保构建产物使用相对路径，适配任意 GitHub Pages 仓库名与本地静态预览。
- 全部 34 张速查卡必须完整覆盖：`style`（`S-01 ~ S-14` 共 14 项）、`enter`（4 项）、`hover`（5 项）、`scroll`（3 项）、`loop`（2 项）、`pitfall`（`P-01 ~ P-06` 共 6 项），以及 3 套整页预设模板。
- 包含定时器、`requestAnimationFrame` 或 `IntersectionObserver` 的组件必须在 `onUnmounted` 中清理副作用。
- PowerShell 环境下多条命令使用 `; if ($LASTEXITCODE -eq 0) { ... }` 串联，不使用 `&&`。

---

### Task 1: 项目脚手架、数据注册表、话术生成纯函数与状态层

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `.gitignore`
- Create: `src/styles/tokens.css`
- Create: `src/data/categories.js`
- Create: `src/data/layouts.js`
- Create: `src/data/motions.js`
- Create: `src/data/pitfalls.js`
- Create: `src/data/index.js`
- Create: `src/utils/promptBuilder.js`
- Create: `src/composables/useCatalogStore.js`
- Test: `tests/catalog-and-prompt.test.js`

**Interfaces:**
- Produces:
  - `CATEGORIES`: `Array<{ id, label, badge? }>`（`all`, `style`, `enter`, `hover`, `scroll`, `loop`, `pitfall`）
  - `PAGE_PRESETS`: `Array<{ id, name, desc, floors: Array<{ layoutId, motionId }>, extraIds?: string[] }>`
  - `ALL_ITEMS`: 合并后的 34 条目数组，每项含 `{ id, code?, cat, kind, demoKey, name, en, keywords, scene, mobileTip?, prompt }`
  - `buildCodexPrompt({ pageTarget, floorOrder, floorMotionMap, selectedIds, itemsById }) => string`
  - `filterCatalogItems({ items, activeCategory, searchQuery }) => Array`
  - `useCatalogStore()`: 单例响应式 Store，暴露搜索、速度、已选组合、楼层上移/下移/动效绑定、预设套用、复制与 Toast 状态

- [ ] **Step 1: 创建基础工程配置（`package.json`、`vite.config.js`、`index.html`、`.gitignore`）与失败测试 `tests/catalog-and-prompt.test.js`**

Create `package.json`:
```json
{
  "name": "website-style-guide",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "node --test tests/*.test.js"
  },
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "vite": "^6.2.0"
  }
}
```

Create `vite.config.js`:
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()]
})
```

Create `index.html`:
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SaleSmartly 官网常用样式 & 动画效果速查｜可视化互动指南</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Create `.gitignore`:
```text
node_modules/
dist/
.DS_Store
*.local
```

Create `tests/catalog-and-prompt.test.js`:
```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { ALL_ITEMS, ITEMS_BY_ID, CATEGORIES, PAGE_PRESETS } from '../src/data/index.js'
import { buildCodexPrompt, filterCatalogItems } from '../src/utils/promptBuilder.js'

test('catalog registers exactly 34 items across 6 content categories', () => {
  assert.equal(ALL_ITEMS.length, 34)
  const counts = ALL_ITEMS.reduce((acc, item) => {
    acc[item.cat] = (acc[item.cat] || 0) + 1
    return acc
  }, {})
  assert.deepEqual(counts, {
    style: 14,
    enter: 4,
    hover: 5,
    scroll: 3,
    loop: 2,
    pitfall: 6
  })
  assert.equal(CATEGORIES.length, 7)
  assert.equal(PAGE_PRESETS.length, 3)
})

test('every preset references valid layout and motion IDs', () => {
  for (const preset of PAGE_PRESETS) {
    assert.ok(preset.floors.length >= 4)
    for (const floor of preset.floors) {
      assert.ok(ITEMS_BY_ID[floor.layoutId], `missing layout ${floor.layoutId}`)
      if (floor.motionId) {
        assert.ok(ITEMS_BY_ID[floor.motionId], `missing motion ${floor.motionId}`)
      }
    }
  }
})

test('filterCatalogItems filters by category and case-insensitive keyword', () => {
  const s08 = filterCatalogItems({ items: ALL_ITEMS, activeCategory: 'all', searchQuery: 'bento' })
  assert.equal(s08.length, 1)
  assert.equal(s08[0].code, 'S-08')

  const pitfalls = filterCatalogItems({ items: ALL_ITEMS, activeCategory: 'pitfall', searchQuery: '' })
  assert.equal(pitfalls.length, 6)
})

test('buildCodexPrompt outputs ordered floors with bound motions, unbound motions, and pitfall rules', () => {
  const output = buildCodexPrompt({
    pageTarget: '/features/ai-agents',
    floorOrder: ['S-01', 'S-02'],
    floorMotionMap: { 'S-01': 'M-04', 'S-02': '' },
    selectedIds: ['S-01', 'S-02', 'M-04', 'M-05', 'P-06'],
    itemsById: ITEMS_BY_ID
  })
  assert.match(output, /\/features\/ai-agents/)
  assert.match(output, /第 1 屏【S-01 左文右图首屏（Hero）】/)
  assert.match(output, /本屏搭配动效「打字机 \/ 逐词切换/)
  assert.match(output, /第 2 屏【S-02 三栏痛点 \/ 价值卡片】/)
  assert.match(output, /【补充交互动效】[\s\S]*悬停微浮 \+ 投影/)
  assert.match(output, /【响应式与动效克制要求】/)
})
```

- [ ] **Step 2: 运行单元测试确认当前因模块未实现而失败**

Run: `node --test tests/catalog-and-prompt.test.js`
Expected: FAIL (`ERR_MODULE_NOT_FOUND` for `../src/data/index.js`)

- [ ] **Step 3: 实现 `src/styles/tokens.css`、`src/data/*.js`、`src/utils/promptBuilder.js` 与 `src/composables/useCatalogStore.js`，并安装依赖**

完成以下文件编写：
- `src/styles/tokens.css`：定义 `--bg`、`--surface`、`--primary`、`--accent`、`--warn`、`--danger: #ef4444`、`--danger-soft: #fef2f2`、`--dur: 0.28s`、`--ease: cubic-bezier(0.22, 1, 0.36, 1)`、通用按钮与舞台微元素样式。
- `src/data/layouts.js`：定义 `S-01 ~ S-14` 共 14 条版式数据（每项含 `id`、`code`、`cat: 'style'`、`kind: 'style'`、`demoKey`、`name`、`en`、`badge`、`keywords`、`scene`、`mobileTip`、`prompt`、`shortPrompt`）。
- `src/data/motions.js`：定义 `M-01 ~ M-14` 共 14 条动效数据（分属 `enter`、`hover`、`scroll`、`loop`）。
- `src/data/pitfalls.js`：定义 `P-01 ~ P-06` 共 6 条避坑与手机端降级对比数据（`cat: 'pitfall'`、`kind: 'pitfall'`）。
- `src/data/categories.js` 与 `src/data/index.js`：汇总分类 Tab、3 套预设模板（`standard-feature`、`comparison-landing`、`flagship-showcase`）与 `ITEMS_BY_ID`。
- `src/utils/promptBuilder.js`：实现 `filterCatalogItems` 与 `buildCodexPrompt`。
- `src/composables/useCatalogStore.js`：实现全局速度切换、筛选、勾选/取消、楼层顺序上移/下移、楼层动效绑定、预设一键载入、剪贴板复制降级与 Toast 通知。
- 执行 `npm install` 安装 `vue`、`vite`、`@vitejs/plugin-vue`。

- [ ] **Step 4: 运行单元测试验证全部通过**

Run: `npm test`
Expected: PASS（4 个测试全部通过）

- [ ] **Step 5: 提交 Task 1**

```powershell
git add package.json package-lock.json vite.config.js index.html .gitignore src/styles/tokens.css src/data src/utils src/composables tests/catalog-and-prompt.test.js; if ($LASTEXITCODE -eq 0) { git commit -m "feat: 初始化 Vue3 工程配置、34 项数据注册表与话术生成核心逻辑" }
```

---

### Task 2: 实现 14 个官网版式迷你骨架组件（`S-01 ~ S-14`）

**Files:**
- Create: `src/components/demos/layouts/LayoutS01HeroSplit.vue`
- Create: `src/components/demos/layouts/LayoutS02ThreeCards.vue`
- Create: `src/components/demos/layouts/LayoutS03AltRows.vue`
- Create: `src/components/demos/layouts/LayoutS04ChannelGrid.vue`
- Create: `src/components/demos/layouts/LayoutS05StatsBanner.vue`
- Create: `src/components/demos/layouts/LayoutS06BottomCta.vue`
- Create: `src/components/demos/layouts/LayoutS07CenteredHero.vue`
- Create: `src/components/demos/layouts/LayoutS08BentoGrid.vue`
- Create: `src/components/demos/layouts/LayoutS09Comparison.vue`
- Create: `src/components/demos/layouts/LayoutS10StepFlow.vue`
- Create: `src/components/demos/layouts/LayoutS11Testimonials.vue`
- Create: `src/components/demos/layouts/LayoutS12PricingCards.vue`
- Create: `src/components/demos/layouts/LayoutS13SceneTabs.vue`
- Create: `src/components/demos/layouts/LayoutS14FaqSection.vue`
- Create: `src/components/demos/layouts/index.js`
- Test: `tests/demo-registry.test.js`

**Interfaces:**
- Consumes: `LAYOUT_ITEMS` from `src/data/layouts.js`
- Produces: `LAYOUT_DEMO_MAP`（键名与 `LAYOUT_ITEMS` 的 `demoKey` 一一对应），每个组件统一接收 `defineProps({ viewport: { type: String, default: 'desktop' } })`，当 `viewport === 'mobile'` 时添加 `.is-mobile` 类切换为紧凑单列布局。其中 `LayoutS12PricingCards` 支持点击切换「月付 / 年付」，`LayoutS13SceneTabs` 支持点击切换「一线客服 / 客服主管 / 跨境老板」，`LayoutS14FaqSection` 支持点击展开问答。

- [ ] **Step 1: 编写 `tests/demo-registry.test.js` 校验所有版式 `demoKey` 文件齐全**

Create `tests/demo-registry.test.js`（使用 `node:fs` 检查 `LAYOUT_ITEMS` 中每个 `demoKey` 对应的 `.vue` 文件存在且包含 `viewport` prop 定义）。

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test`
Expected: FAIL（版式 `.vue` 文件尚未创建）

- [ ] **Step 3: 实现 `S-01 ~ S-14` 全部 14 个独立 `.vue` 版式组件及 `src/components/demos/layouts/index.js`**

逐一创建 14 个组件，保持每个组件聚焦在 60～110 行以内，完整支持桌面态与 `.is-mobile` 单列态。

- [ ] **Step 4: 运行测试验证通过**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: 提交 Task 2**

```powershell
git add src/components/demos/layouts tests/demo-registry.test.js; if ($LASTEXITCODE -eq 0) { git commit -m "feat: 实现 S-01 至 S-14 共 14 个双视口版式预览小组件" }
```

---

### Task 3: 实现 14 个交互动效演示小组件（`M-01 ~ M-14`）

**Files:**
- Create: `src/components/demos/motions/MotionFadeUp.vue`
- Create: `src/components/demos/motions/MotionStagger.vue`
- Create: `src/components/demos/motions/MotionZoomIn.vue`
- Create: `src/components/demos/motions/MotionTextRotate.vue`
- Create: `src/components/demos/motions/MotionHoverLift.vue`
- Create: `src/components/demos/motions/MotionBorderGlow.vue`
- Create: `src/components/demos/motions/MotionImageZoom.vue`
- Create: `src/components/demos/motions/MotionAccordion.vue`
- Create: `src/components/demos/motions/MotionTabSlide.vue`
- Create: `src/components/demos/motions/MotionStickyScroll.vue`
- Create: `src/components/demos/motions/MotionParallax.vue`
- Create: `src/components/demos/motions/MotionCountUp.vue`
- Create: `src/components/demos/motions/MotionMarquee.vue`
- Create: `src/components/demos/motions/MotionFloatPulse.vue`
- Create: `src/components/demos/motions/index.js`
- Modify: `tests/demo-registry.test.js`

**Interfaces:**
- Consumes: `MOTION_ITEMS` from `src/data/motions.js`, `replayTick` prop（全局切换动效节奏时自动重播进场类动效）
- Produces: `MOTION_DEMO_MAP`（键名与 `MOTION_ITEMS` 的 `demoKey` 一一对应），每个组件自带舞台右上角操作按钮（如 `↻ 重播`、`切到打字机`、`模拟一次`、`▶ 自动演示`）并在 `onUnmounted` 清理定时器/观察器。

- [ ] **Step 1: 在 `tests/demo-registry.test.js` 中补充 14 个动效组件注册与副作用清理静态检查**

检查 `MOTION_ITEMS` 全部 `demoKey` 对应 `.vue` 文件存在。

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test`
Expected: FAIL（动效 `.vue` 文件尚未创建）

- [ ] **Step 3: 逐个实现 14 个动效演示 `.vue` 小组件及 `src/components/demos/motions/index.js`**

完整还原并优化原单文件中的所有交互细节（重播动画、上下轮换/打字机双模式、悬停微浮/扫光/图片缩放的点击模拟、手风琴、滑块 Tab、Sticky 滚动吸附自动演示、视差滑块、CountUp 数字递增、悬停暂停跑马灯、在线状态呼吸悬浮）。

- [ ] **Step 4: 运行测试验证通过**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: 提交 Task 3**

```powershell
git add src/components/demos/motions tests/demo-registry.test.js; if ($LASTEXITCODE -eq 0) { git commit -m "feat: 实现 14 个交互动效演示小组件并完善生命周期清理" }
```

---

### Task 4: 实现 6 个手机端简化 & 动效避坑对比小组件（`P-01 ~ P-06`）与总注册表

**Files:**
- Create: `src/components/demos/pitfalls/PitfallAmplitude.vue`
- Create: `src/components/demos/pitfalls/PitfallDensity.vue`
- Create: `src/components/demos/pitfalls/PitfallSnapTransition.vue`
- Create: `src/components/demos/pitfalls/PitfallMobileStack.vue`
- Create: `src/components/demos/pitfalls/PitfallMobileSticky.vue`
- Create: `src/components/demos/pitfalls/PitfallMobileFloating.vue`
- Create: `src/components/demos/pitfalls/index.js`
- Create: `src/components/demos/index.js`
- Modify: `tests/demo-registry.test.js`

**Interfaces:**
- Consumes: `PITFALL_ITEMS` from `src/data/pitfalls.js`
- Produces: `DEMO_COMPONENTS`（汇总全部 34 个 `demoKey -> Component`）与 `LAYOUT_DEMO_MAP`（供整页拼装器按版式渲染）。

- [ ] **Step 1: 在 `tests/demo-registry.test.js` 中补充 `P-01 ~ P-06` 及全量 34 个 `demoKey` 映射测试**

断言 `ALL_ITEMS` 每一项的 `demoKey` 都在总表中存在对应 `.vue` 文件。

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test`
Expected: FAIL（避坑 `.vue` 文件尚未创建）

- [ ] **Step 3: 实现 6 个可视化避坑/手机端对比小组件及 `src/components/demos/index.js`**

每个组件提供清晰的 `✅ 推荐（克制/降级）` vs `❌ 反例（晃眼/挤压/遮挡）` 同屏对比或一键切换开关，直观展现差异。

- [ ] **Step 4: 运行测试验证通过**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: 提交 Task 4**

```powershell
git add src/components/demos/pitfalls src/components/demos/index.js tests/demo-registry.test.js; if ($LASTEXITCODE -eq 0) { git commit -m "feat: 新增 6 个动效避坑与手机端降级对比组件并汇总演示注册表" }
```

---

### Task 5: 页面外壳、整页骨架拼装抽屉、应用组装、GitHub Pages 部署配置与构建验证

**Files:**
- Create: `src/components/shell/HeroHeader.vue`
- Create: `src/components/shell/FilterToolbar.vue`
- Create: `src/components/shell/CatalogCard.vue`
- Create: `src/components/shell/ComboFloatingBar.vue`
- Create: `src/components/shell/PageBlueprintDrawer.vue`
- Create: `src/components/shell/ToastNotice.vue`
- Create: `src/App.vue`
- Create: `src/main.js`
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Test: `tests/build-output.test.js`

**Interfaces:**
- Consumes: `useCatalogStore`, `CATEGORIES`, `PAGE_PRESETS`, `DEMO_COMPONENTS`, `LAYOUT_DEMO_MAP`
- Produces: 完整可交互的 SPA 应用、`dist/` 相对路径静态产物、GitHub Actions 自动部署流水线 `.github/workflows/deploy.yml`

- [ ] **Step 1: 编写构建产物验证测试 `tests/build-output.test.js`**

测试断言 `dist/index.html` 存在、包含 `./assets/` 相对路径资源引用（不含绝对 `/assets/` 导致 GitHub Pages 子目录 404 的路径），且 `.github/workflows/deploy.yml` 包含 `actions/deploy-pages@v4`。

- [ ] **Step 2: 运行测试确认构建前失败**

Run: `node --test tests/build-output.test.js`
Expected: FAIL（`dist/index.html` 与 `deploy.yml` 尚未生成）

- [ ] **Step 3: 实现全部 Shell 组件（含 `PageBlueprintDrawer.vue`）、`App.vue`、`main.js`、`.github/workflows/deploy.yml` 与 `README.md`**

实现要点：
- `HeroHeader.vue`：展示标题、全局速度 3 档切换、3 套整页预设一键体验条。
- `FilterToolbar.vue`：吸顶分类 Tab（实时显示总数与各类数量）+ 搜索框 + 打开整页骨架预览快捷按钮。
- `CatalogCard.vue`：统一卡片头（编号徽章、中英文标题、`+ 加入组合 / ✓ 已选中`）、动态渲染 `DEMO_COMPONENTS[item.demoKey]`、适用场景、手机端提示（如有）与单卡话术一键复制。
- `ComboFloatingBar.vue`：底部悬浮展示已选标签、动效超 3 个温和提醒、`🧩 预览整页骨架`、`一键复制给 Codex 话术`、`清空`。
- `PageBlueprintDrawer.vue`：左侧可填写目标页面路径/名称、楼层上下移动与删除、每层下拉绑定动效、快捷补加版式；右侧实时切换 `💻 桌面端 1280px` / `📱 手机端 390px` 样机框连贯渲染整页迷你骨架，底部实时预览生成的完整话术并一键复制。
- `.github/workflows/deploy.yml`：配置 push `main` 分支自动执行 `npm ci`、`npm test`、`npm run build` 并发布至 GitHub Pages。

- [ ] **Step 4: 执行 `npm run build` 与全量测试 `npm test`**

Run: `npm run build; if ($LASTEXITCODE -eq 0) { npm test }`
Expected: Vite 构建零错误完成，全部测试套件 PASS。

- [ ] **Step 5: 启动本地预览并用浏览器截图核验 UI 与交互，提交最终代码**

验证首页卡片、避坑专区切换与整页拼装抽屉（桌面/手机视口切换）渲染正常后提交：
```powershell
git add src .github README.md tests/build-output.test.js; if ($LASTEXITCODE -eq 0) { git commit -m "feat: 完成页面外壳、整页骨架拼装预览抽屉与 GitHub Pages 自动部署配置" }
```
