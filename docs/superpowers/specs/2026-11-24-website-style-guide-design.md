# SaleSmartly 官网常用样式 & 动画效果速查（Vue 3 组件化版）设计规格

- **日期**：2026-11-24
- **项目目录**：`C:\Users\standardsoftware\Desktop\练习摸鱼用\website-style-guide`
- **基线来源**：`C:\Users\standardsoftware\Desktop\练习摸鱼用\常用动画效果速查.html`（原文件保留不动）
- **部署目标**：GitHub Pages（`base: './'` 相对路径静态构建 + GitHub Actions 自动发布流水线）

---

## 1. 背景与目标

原单文件 `常用动画效果速查.html`（约 2,700 行）收录了 6 种常用版式（`S-01 ~ S-06`）与 14 种交互动效，方便非技术/运营同学可视化挑选样式并一键生成发给 Codex 的需求话术。随着需要补充更多官网高频版式、整页拼装预览以及手机端降级/动效避坑对比，单 HTML 文件难以继续维护。

本次重构与扩充目标：
1. **组件化拆分**：使用 Vue 3 + Vite + 原生 CSS 变量，采用「纯数据注册表 + 一卡一独立小组件」架构，零重型 UI 库依赖。
2. **扩充官网常用版式**：在保留 `S-01 ~ S-06` 基础上，新增 `S-07 ~ S-14` 共 8 种官网高频版式（总计 14 种版式），并完整迁移全部 14 种动效演示。
3. **新增「整页骨架拼装预览」**：支持一键套用常用页面预设模板、调整已选版式上下楼层顺序、为每个版式楼层绑定对应动效、切换桌面（`1280px`）/ 手机（`390px`）视口预览整页连贯骨架，并导出精确到楼层的 Codex 提需话术。
4. **新增「手机端简化 & 动效避坑对比专区」**：新增 6 张可视化正反例与双端降级对比卡片，直观演示 ToB 官网「克制、利落、防遮挡」的设计边界及可复制约束话术。
5. **开箱即用的 GitHub Pages 部署**：配置相对资源路径与 `.github/workflows/deploy.yml` 自动部署脚本，推送至任意仓库名的 GitHub 仓库即可上线访问。

---

## 2. 技术栈与目录结构

- **框架与构建**：Vue `^3.5` + Vite `^6`（`@vitejs/plugin-vue`），纯静态 SPA 导出到 `dist/`。
- **样式体系**：原生 CSS Custom Properties（`--dur`、`--ease`、色彩、圆角、阴影）+ 组件 `<style scoped>`。

```text
website-style-guide/
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Pages 官方 Actions 自动构建与部署配置
├── docs/
│   └── superpowers/
│       ├── specs/                      # 设计规格文档
│       └── plans/                      # 实施计划文档
├── index.html                          # 入口 HTML（中文标题与响应式 meta）
├── package.json                        # 脚本：dev / build / preview
├── vite.config.js                      # 配置 base: './' 兼容任意 GitHub Pages 子路径
├── README.md                           # 本地开发与 GitHub Pages 三步开启指南
└── src/
    ├── main.js                         # 应用挂载入口
    ├── App.vue                         # 顶层页面编排与抽屉/Toast 挂载
    ├── styles/
    │   └── tokens.css                  # 全局设计变量、基础重置与通用微工具样式
    ├── composables/
    │   └── useCatalogStore.js          # 全局状态：节奏速度、分类搜索、组合选择、楼层编排、复制与 Toast
    ├── data/
    │   ├── categories.js               # 顶部分类 Tab 与 3 套整页预设模板定义
    │   ├── layouts.js                  # S-01 ~ S-14 版式元数据与话术模板
    │   ├── motions.js                  # 14 种动效元数据（enter / hover / scroll / loop）
    │   └── pitfalls.js                 # P-01 ~ P-06 避坑与手机端简化元数据
    └── components/
        ├── shell/
        │   ├── HeroHeader.vue          # 顶部标题说明、全局动效节奏切换（0.28s / 0.5s / 1.05s）、预设快捷入口
        │   ├── FilterToolbar.vue       # 吸顶分类筛选 Tab + 关键词实时搜索框
        │   ├── CatalogCard.vue         # 通用卡片外壳（编号/标题、加入组合按钮、演示舞台插槽、话术复制框）
        │   ├── ComboFloatingBar.vue    # 底部悬浮已选栏（标签展示、超量提醒、打开整页预览按钮、快捷复制、清空）
        │   ├── PageBlueprintDrawer.vue # 整页骨架拼装抽屉（左楼层排序+动效绑定，右桌面/手机视口预览与导出）
        │   └── ToastNotice.vue         # 轻量操作反馈提示
        └── demos/
            ├── index.js                # demoKey -> Vue 组件映射注册表
            ├── layouts/                # 14 个独立版式迷你骨架组件（支持 viewport="desktop" | "mobile" prop）
            │   ├── LayoutS01HeroSplit.vue
            │   ├── LayoutS02ThreeCards.vue
            │   ├── LayoutS03AltRows.vue
            │   ├── LayoutS04ChannelGrid.vue
            │   ├── LayoutS05StatsBanner.vue
            │   ├── LayoutS06BottomCta.vue
            │   ├── LayoutS07CenteredHero.vue
            │   ├── LayoutS08BentoGrid.vue
            │   ├── LayoutS09Comparison.vue
            │   ├── LayoutS10StepFlow.vue
            │   ├── LayoutS11Testimonials.vue
            │   ├── LayoutS12PricingCards.vue
            │   ├── LayoutS13SceneTabs.vue
            │   └── LayoutS14FaqSection.vue
            ├── motions/                # 14 个独立动效交互演示组件
            │   ├── MotionFadeUp.vue
            │   ├── MotionStagger.vue
            │   ├── MotionZoomIn.vue
            │   ├── MotionTextRotate.vue
            │   ├── MotionHoverLift.vue
            │   ├── MotionBorderGlow.vue
            │   ├── MotionImageZoom.vue
            │   ├── MotionAccordion.vue
            │   ├── MotionTabSlide.vue
            │   ├── MotionStickyScroll.vue
            │   ├── MotionParallax.vue
            │   ├── MotionCountUp.vue
            │   ├── MotionMarquee.vue
            │   └── MotionFloatPulse.vue
            └── pitfalls/               # 6 个独立避坑与手机端降级对比组件
                ├── PitfallAmplitude.vue
                ├── PitfallDensity.vue
                ├── PitfallSnapTransition.vue
                ├── PitfallMobileStack.vue
                ├── PitfallMobileSticky.vue
                └── PitfallMobileFloating.vue
```

---

## 3. 内容条目明细（共 34 张速查卡 + 3 套整页预设）

### 3.1 官网常用版式库（`style` 分类，14 项：`S-01 ~ S-14`）
所有版式演示组件统一接收 `viewport` 属性（默认 `'desktop'`，在整页拼装器切到手机端时传入 `'mobile'` 自动切换为紧凑单列形态）：
1. **`S-01` 左文右图首屏（Hero Split）**：左胶囊标签+主副标题+双按钮，右产品会话示意。手机端自动转为上文下图单列。
2. **`S-02` 三栏痛点 / 价值卡片（3-Column Value Cards）**：三等分图标+短标题+两行说明。手机端转为纵向三张卡片堆叠。
3. **`S-03` 左右交替图文讲解（Z-Pattern Feature Rows）**：一左一右交错图文排布。手机端统一转为上图下文顺序避免错乱。
4. **`S-04` 渠道 / 场景集成网格（Integration Grid）**：统一尺寸多渠道图标矩阵（WhatsApp / Messenger / IG / TG / LINE / Shopify）。手机端转为双列紧凑网格。
5. **`S-05` 数据成果横幅（Stats Banner）**：深蓝渐变底 + 3 组核心业务指标高亮。手机端支持紧凑纵向或三格自适应排列。
6. **`S-06` 底部收口行动卡片（Bottom CTA Card）**：品牌色圆角卡片 + 收口标题 + 免费体验/预约演示双按钮。手机端按钮全宽纵向堆叠。
7. **`S-07` 居中大图首屏（Centered Hero）**：居中胶囊标签、大标题与主次按钮，下方铺开宽幅产品工作台全景窗。手机端缩窄标题字号并保留核心界面预览框。
8. **`S-08` Bento 便当盒能力网格（Bento Grid）**：左侧 1 张跨两行大主卡（核心工作台展示）+ 右侧 2 张次级能力卡非对称组合。手机端按主次顺序单列排布。
9. **`S-09` 传统方式 vs 产品方案对比区（Comparison）**：左栏灰红弱化展示「传统人工分散痛点」，右栏蓝绿高亮展示「SaleSmartly 一站式收益」。手机端上下分段对比。
10. **`S-10` 步骤流程 / 业务闭环（Step Flow）**：带步骤编号（`01 → 02 → 03`）与连接箭头的横向流程卡。手机端转为左侧竖线连接的时间线步骤。
11. **`S-11` 客户证言与案例卡片（Testimonials）**：客户评价引言、头像/行业身份标识与关键业务提升徽章（如 `首响提速 3.2x`）。手机端单列展示。
12. **`S-12` 套餐定价与周期切换（Pricing Cards）**：内置可点击「月付 / 年付立省 20%」小切换器 + 三档套餐卡片（中间主推档品牌色边框与推荐角标）。手机端单列突出主推档。
13. **`S-13` 多角色 / 多场景 Tab 切换区（Scene Tabs）**：内置可点击「一线客服 / 客服主管 / 跨境老板」角色 Tab，下方联动切换对应痛点收益与示意面板。手机端 Tab 横向可点、面板上下排布。
14. **`S-14` FAQ 常见问题收口区（FAQ Section）**：左栏引导标题与咨询入口 + 右栏可展开收起的常见问答条。手机端标题置顶、问答全宽排列。

### 3.2 四大类交互动效库（完整保留原有 14 项）
- **① 进场出现（`enter`，4 项）**：淡入上浮（Fade In Up）、错峰依次出现（Stagger）、缩放弹入（Scale / Zoom In）、打字机 / 逐词切换（Typewriter / Text Rotate，支持模式切换）。
- **② 悬停与点击（`hover`，5 项）**：悬停微浮 + 投影（Hover Lift）、悬停边框发光 / 扫光（Border Glow / Shimmer）、图片轻缩放（Image Zoom on Hover）、平滑折叠 / 手风琴（Accordion）、标签页滑块切换（Tab Indicator Slide）。
- **③ 滚动联动（`scroll`，3 项）**：吸附固定 + 切换（Sticky Scroll）、视差滚动（Parallax，带模拟滑块与自动演示）、数字滚动递增（Count Up，进入视口自动触发一次 + 手动重播）。
- **④ 循环展示（`loop`，2 项）**：无缝跑马灯（Marquee，悬停暂停）、轻呼吸 / 轻悬浮（Float / Pulse）。

### 3.3 手机端简化 & 动效避坑对比专区（`pitfall` 分类，6 项：`P-01 ~ P-06`）
每张卡片舞台内提供直观的「✅ 克制推荐 vs ❌ 踩坑反例」同框对照或「💻 桌面 vs 📱 390px 手机」切换开关，底部同样提供一键复制的防踩坑约束话术，且支持加入组合：
1. **`P-01` 幅度与时长：微浮克制 vs 弹跳晃眼**：左侧演示 `0.28s / 上浮 4px` 稳重手感，右侧演示 `0.9s / 大幅弹跳缩放` 廉价眩晕感。
2. **`P-02` 同屏焦点密度：单焦点引导 vs 全屏乱飞**：支持一键切换「克制模式（仅主 CTA 轻扫光）」与「混乱模式（标题闪烁+多气泡乱晃+按钮狂抖）」。
3. **`P-03` 展开与切换：平滑过渡 vs 生硬闪现跳动**：对比带柔和高度/透明度过渡的面板切换 vs 无过渡瞬间撑开导致下方内容突兀跳动。
4. **`P-04` 手机端多栏降级：横向挤扁 vs 单列呼吸感堆叠**：对比在 `390px` 下强行保留三栏导致文字挤成一竖列（❌）vs 自动改为单列卡片+全宽按钮（✅）。
5. **`P-05` 手机端滚动降级：强行左右吸附 vs 纵向顺滑阅读**：对比窄屏强行左文右图 Sticky 挤压一半宽度（❌）vs 手机端自动解开吸附改为分段图文顺滑浏览（✅）。
6. **`P-06` 手机端悬浮物清理：气泡遮挡标题 vs 自动收起防遮挡**：对比首屏漂浮装饰气泡盖住核心文案和按钮（❌）vs 手机端隐藏纯装饰悬浮层或转为静态小标签（✅）。

### 3.4 三套一键套用整页预设模板
位于顶部区域，点击后自动勾选对应版式与动效并可直接打开「整页骨架拼装预览」：
1. **常规功能页标准 5 屏**：`S-01` 首屏（配淡入上浮）→ `S-02` 三栏价值卡（配错峰依次出现）→ `S-03` 左右交替讲解（配悬停微浮）→ `S-14` FAQ 收口（配平滑折叠）→ `S-06` 底部 CTA（配边框发光/扫光）。
2. **方案对比转化页 6 屏**：`S-07` 居中大图首屏 → `S-09` 前后优劣对比 → `S-10` 三步接入流程 → `S-05` 数据成果横幅（配数字滚动递增）→ `S-11` 客户证言 → `S-06` 底部 CTA。
3. **多场景旗舰专题页 6 屏**：`S-01` 首屏（配打字机切换）→ `S-04` 渠道集成网格（配无缝跑马灯）→ `S-08` Bento 能力网格 → `S-13` 多角色 Tab 切换（配滑块切换）→ `S-12` 套餐定价 → `S-06` 底部 CTA。

---

## 4. 数据流与整页骨架拼装器交互

### 4.1 核心状态结构（`useCatalogStore.js`）
- `speed`: `'0.28s' | '0.5s' | '1.05s'`，变更时同步写入 `document.documentElement.style.setProperty('--dur', speed)` 并递增 `replayTick` 触发当前可见进场演示重播。
- `activeCategory`: `'all' | 'style' | 'enter' | 'hover' | 'scroll' | 'loop' | 'pitfall'`。
- `searchQuery`: 字符串，匹配条目的 `code`、`name`、`en`、`keywords`、`scene`。
- `selectedIds`: 有序数组（保留用户勾选先后顺序）。
- `floorOrder`: 从 `selectedIds` 派生的版式楼层顺序数组（仅包含 `kind === 'style'` 的条目 ID），支持 `moveFloorUp(id)`、`moveFloorDown(id)`、`removeItem(id)`。
- `floorMotionMap`: `Record<layoutId, motionId | ''>`，记录每个版式楼层关联的动效 ID（可选下拉项来自当前已选动效或全部 14 种动效，选中后若该动效未在已选集合中则自动同步加入）。
- `previewViewport`: `'desktop' | 'mobile'`，控制拼装画布宽度（`100%` 桌面框 vs `390px` 居中手机样机框）及各版式组件的 `viewport` prop。

### 4.2 Codex 需求话术生成规则
1. **已选版式且配置了楼层顺序时**：
   - 按 `floorOrder` 从第 1 屏到第 N 屏依次输出：`第 X 屏【S-xx 版式名】：<版式话术>`；若该屏在 `floorMotionMap` 中绑定了动效，紧跟输出 `（本屏搭配动效「<动效名>」：<动效话术>）`。
2. **未绑定到具体楼层的已选动效**：
   - 归入 `【补充交互动效】` 小节列出，保留灵活用法。
3. **已选的避坑/手机端条目（`pitfall`）与默认收尾要求**：
   - 将已选 `P-xx` 的约束话术合并进底部的 `【响应式与动效克制要求】` 段落；即使未单独勾选 `P-xx`，仍默认附带官网规范、时长 `0.25～0.45s` 与 `390px` 手机端简化兜底说明。

---

## 5. 异常边界、自检与部署验证标准

1. **剪贴板兼容**：优先调用 `navigator.clipboard.writeText`，在非 HTTPS 或受限环境下自动回退隐藏 `<textarea>` + `document.execCommand('copy')`，确保本地文件/内网 IP/GitHub Pages 均能正常复制并弹出 Toast。
2. **定时器与观察器清理**：所有含 `setInterval` / `setTimeout` / `requestAnimationFrame` / `IntersectionObserver` 的动效组件（如 `MotionTextRotate`、`MotionParallax`、`MotionStickyScroll`、`MotionCountUp`）必须在 `onUnmounted` 中彻底清理，切换筛选或抽屉开关不产生内存泄漏与报错。
3. **无障碍与减弱动态偏好**：保留键盘可聚焦按钮语义；全局动效遵循用户主动选择的 `--dur` 演示节奏。
4. **GitHub Pages 部署验证标准**：
   - `npm run build` 零报错生成 `dist/`，且 `dist/index.html` 中引用的 JS/CSS 路径以 `./assets/` 开头。
   - `.github/workflows/deploy.yml` 使用 Node 20 执行 `npm ci && npm run build` 并通过 `actions/deploy-pages@v4` 发布 `dist` 目录。
   - 本地通过 `vite preview` 完整验证分类筛选、关键词搜索、34 张卡片交互、预设套用、整页桌面/手机拼装预览及话术复制。
