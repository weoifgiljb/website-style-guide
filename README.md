# SaleSmartly 官网常用样式 & 动画效果速查指南

面向运营、产品与设计同学的可视化互动速查站：内置 **14 种常用页面版式（S-01 ~ S-14）**、**14 种交互动效（M-01 ~ M-14）** 与 **6 项手机端降级/避坑准则（P-01 ~ P-06）**，支持实时拼装整页楼层骨架（桌面端 1280px / 手机端 390px 双视口预览），并一键生成发给 Codex 的结构化需求话术。

## 本地开发与构建

环境要求：Node.js >= 20

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务器
npm run dev

# 3. 运行自动化测试套件
npm test

# 4. 构建静态产物（输出至 ./dist，采用相对路径适配任意子路径部署）
npm run build

# 5. 本地预览生产构建产物
npm run preview
```

## 目录结构说明

- `src/data/`：版式（`layouts.js`）、动效（`motions.js`）、避坑准则（`pitfalls.js`）与预设模板（`categories.js`）元数据
- `src/components/demos/`：34 个独立可交互微缩演示组件（`layouts/`、`motions/`、`pitfalls/`）
- `src/components/shell/`：页面顶部、吸顶筛选栏、目录卡片、底部组合悬浮栏、整页骨架拼装抽屉、楼层动效预览（`BlueprintFloorPreview.vue`）与轻提示组件
- `src/composables/useCatalogStore.js`：目录筛选、双端视图切换、组合勾选、楼层排序与动效绑定状态管理
- `src/utils/promptBuilder.js`：搜索过滤与 Codex 结构化楼层需求话术生成器
- `tests/`：数据完整性、话术生成、组件注册与构建产物自动化测试
- `docs/conventions/sfc-budget.md`：Vue 单文件行数上限（400 行）与复用约定。壳层大组件按界面区块拆分，样式跟组件走

## 单文件怎么拆

壳层组件（抽屉、悬停提示、竞品弹窗、楼层预览）按界面区块拆到 `src/components/shell/` 下的功能子目录。演示卡保持一卡一文件。阈值、目录和「只搬家、不改行为」的约定见 [docs/conventions/sfc-budget.md](docs/conventions/sfc-budget.md)。

## 如何新增一张版式或动效卡片

1. **新建微缩演示组件**：
   - 新增版式：在 `src/components/demos/layouts/` 下创建 `LayoutSxxXxx.vue`（接收 `viewport` 与 `compact` props，并提供 `.is-mobile` 响应式样式），然后在 `src/components/demos/layouts/index.js` 的 `LAYOUT_DEMO_MAP` 中注册。
   - 新增动效：在 `src/components/demos/motions/` 下创建 `MotionXxx.vue`（接收 `replayTick` 与 `viewport` props，内置 `.stage-badge` 标签、`var(--dur)` 节奏变量与 `.is-mobile` 响应式样式），然后在 `src/components/demos/motions/index.js` 的 `MOTION_DEMO_MAP` 中注册。
2. **补充元数据条目**：
   - 在 `src/data/layouts.js` 或 `src/data/motions.js` 中追加对应条目，确保 `demoKey` 与刚注册的组件键名一致，填写 `id`、`code`、`cat`、`kind`、`name`、`en`、`scene`、`mobileTip`、`prompt`、`shortPrompt`。
3. **验证通过**：
   - 运行 `npm run build` 与 `npm test`，确认组件编译与注册表校验全部通过。

## GitHub Pages 自动部署（`gh-pages` 零配置激活）

线上预览地址：<https://weoifgiljb.github.io/website-style-guide/>

本项目已在 `vite.config.js` 配置 `base: './'` 相对路径，并通过 `.github/workflows/deploy.yml` 使用 `peaceiris/actions-gh-pages@v4` 自动发布到 `gh-pages` 分支：

1. **推送代码到 `main` 分支**：每次推送到 `main`（或在 **Actions** 标签页手动点击 `Run workflow`）会自动执行 `npm ci`、`npm test` 与 `npm run build`。
2. **自动生成 `.nojekyll` 并推送到 `gh-pages` 分支**：工作流会将 `./dist` 构建产物直接发布至 `gh-pages` 分支（`enable_jekyll: false`），公开仓库首次推送后即可自动激活 GitHub Pages，无需手动初始化 Pages Source。
3. **访问线上站点**：部署完成后即可直接访问 `https://weoifgiljb.github.io/website-style-guide/`。
