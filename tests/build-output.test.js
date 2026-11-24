import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  parse,
  compileScript,
  compileTemplate,
  compileStyle
} from 'vue/compiler-sfc'
import { build } from 'vite'
import { MOTION_ITEMS } from '../src/data/motions.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const SHELL_DIR = path.join(ROOT_DIR, 'src', 'components', 'shell')

const SHELL_COMPONENTS = [
  'HeroHeader.vue',
  'FilterToolbar.vue',
  'CatalogCard.vue',
  'ComboFloatingBar.vue',
  'PageBlueprintDrawer.vue',
  'BlueprintFloorPreview.vue',
  'ToastNotice.vue'
]

test('GitHub Pages workflow (.github/workflows/deploy.yml) and README.md configure peaceiris/actions-gh-pages@v4 deployment', () => {
  const workflowPath = path.join(ROOT_DIR, '.github', 'workflows', 'deploy.yml')
  const readmePath = path.join(ROOT_DIR, 'README.md')

  assert.ok(fs.existsSync(workflowPath), `Missing GitHub Actions workflow: ${workflowPath}`)
  assert.ok(fs.existsSync(readmePath), `Missing README.md: ${readmePath}`)

  const workflow = fs.readFileSync(workflowPath, 'utf8')
  assert.match(workflow, /branches:\s*\[?\s*['"]?main['"]?\s*\]?/, 'deploy.yml must trigger on main branch')
  assert.match(workflow, /workflow_dispatch/, 'deploy.yml must support workflow_dispatch')
  assert.match(workflow, /contents:\s*write/, 'deploy.yml must set contents: write permission')
  assert.match(workflow, /npm\s+ci/, 'deploy.yml must run npm ci')
  assert.match(workflow, /npm\s+test/, 'deploy.yml must run npm test')
  assert.match(workflow, /npm\s+run\s+build/, 'deploy.yml must run npm run build')
  assert.match(workflow, /peaceiris\/actions-gh-pages@v4/, 'deploy.yml must use peaceiris/actions-gh-pages@v4')
  assert.match(workflow, /publish_dir:\s*['"]?\.\/dist['"]?/, 'deploy.yml must publish ./dist')
  assert.match(workflow, /enable_jekyll:\s*false/, 'deploy.yml must disable Jekyll (.nojekyll)')

  const readme = fs.readFileSync(readmePath, 'utf8')
  assert.match(readme, /npm run dev/, 'README.md must document local dev command')
  assert.match(readme, /npm test/, 'README.md must document test command')
  assert.match(readme, /gh-pages/, 'README.md must document automatic gh-pages branch deployment')
  assert.match(
    readme,
    /https:\/\/weoifgiljb\.github\.io\/website-style-guide\//,
    'README.md must document online preview URL'
  )
})

test('all 7 shell components, src/App.vue, and src/main.js exist and compile cleanly with vue/compiler-sfc', () => {
  assert.equal(SHELL_COMPONENTS.length, 7)

  const mainJsPath = path.join(ROOT_DIR, 'src', 'main.js')
  assert.ok(fs.existsSync(mainJsPath), `Missing entry file: ${mainJsPath}`)
  const mainSource = fs.readFileSync(mainJsPath, 'utf8')
  assert.match(mainSource, /tokens\.css/, 'src/main.js must import tokens.css')
  assert.match(mainSource, /#app/, 'src/main.js must mount to #app')

  const vueFiles = [
    ...SHELL_COMPONENTS.map((file) => ({
      name: file,
      fullPath: path.join(SHELL_DIR, file),
      requireScoped: true
    })),
    {
      name: 'App.vue',
      fullPath: path.join(ROOT_DIR, 'src', 'App.vue'),
      requireScoped: true
    }
  ]

  for (const { name, fullPath, requireScoped } of vueFiles) {
    assert.ok(fs.existsSync(fullPath), `Missing Vue SFC: ${fullPath}`)
    const source = fs.readFileSync(fullPath, 'utf8')
    const { descriptor, errors } = parse(source, { filename: name })

    assert.equal(
      errors.length,
      0,
      `${name} failed SFC parse: ${errors.map((e) => e.message).join('; ')}`
    )
    assert.ok(descriptor.template, `${name} is missing <template>`)
    assert.ok(descriptor.scriptSetup, `${name} is missing <script setup>`)

    if (requireScoped) {
      assert.ok(
        descriptor.styles.length > 0 && descriptor.styles.every((s) => s.scoped),
        `${name} must use <style scoped>`
      )
    }

    const compiledScript = compileScript(descriptor, { id: name.replace('.vue', '') })
    const compiledTemplate = compileTemplate({
      id: name.replace('.vue', ''),
      filename: name,
      source: descriptor.template.content,
      scoped: descriptor.styles.some((s) => s.scoped),
      compilerOptions: {
        bindingMetadata: compiledScript.bindings
      }
    })
    assert.equal(
      compiledTemplate.errors.length,
      0,
      `${name} template compile errors: ${compiledTemplate.errors.join('; ')}`
    )

    for (const [idx, styleBlock] of descriptor.styles.entries()) {
      const styleResult = compileStyle({
        id: `data-v-shell-${name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${idx}`,
        filename: name,
        source: styleBlock.content,
        scoped: Boolean(styleBlock.scoped)
      })
      assert.equal(
        styleResult.errors.length,
        0,
        `${name} style compile errors: ${styleResult.errors.map((e) => e.message).join('; ')}`
      )
    }
  }
})

test('shell components enforce decluttered 2-col layout, dual-viewport switching, phone shell, and live M-01..M-14 floor preview', () => {
  const appSource = fs.readFileSync(path.join(ROOT_DIR, 'src', 'App.vue'), 'utf8')
  assert.match(
    appSource,
    /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,
    'App.vue must use spacious 2-column catalog grid'
  )

  const hero = fs.readFileSync(path.join(SHELL_DIR, 'HeroHeader.vue'), 'utf8')
  assert.match(hero, /官网常用样式 & 动效速查/, 'HeroHeader must render concise H1')
  assert.doesNotMatch(hero, /badge-pill/, 'HeroHeader must not render cluttered .badge-pill')
  assert.doesNotMatch(hero, /preset-strip/, 'HeroHeader must not render .preset-strip (moved to drawer)')
  assert.match(hero, /0\.28s/, 'HeroHeader must include 0.28s speed option')
  assert.match(hero, /0\.5s/, 'HeroHeader must include 0.5s speed option')
  assert.match(hero, /1\.05s/, 'HeroHeader must include 1.05s speed option')
  assert.match(hero, /cardViewport/, 'HeroHeader must bind cardViewport')
  assert.match(hero, /setCardViewport\(['"]desktop['"]\)/, 'HeroHeader must allow switching to Web desktop viewport')
  assert.match(hero, /setCardViewport\(['"]mobile['"]\)/, 'HeroHeader must allow switching to mobile viewport')

  const toolbar = fs.readFileSync(path.join(SHELL_DIR, 'FilterToolbar.vue'), 'utf8')
  assert.match(toolbar, /position:\s*sticky/, 'FilterToolbar must be sticky')
  assert.match(toolbar, /搜编号或组件名，如 N-05 \/ OpportunitySection \/ 跑马灯/, 'FilterToolbar must include exact search placeholder')
  assert.match(toolbar, /🧩 整页拼装预览/, 'FilterToolbar must include blueprint trigger button')

  const card = fs.readFileSync(path.join(SHELL_DIR, 'CatalogCard.vue'), 'utf8')
  assert.doesNotMatch(card, /mobile-tip/, 'CatalogCard must NOT contain .mobile-tip text')
  assert.match(card, /normalPath/, 'CatalogCard must display item.normalPath mapping')
  assert.match(
    card,
    /stage-badge/,
    'CatalogCard must render .stage-badge for normal style/primitive cards'
  )
  assert.match(
    card,
    /:viewport=["']effectiveViewport["']/,
    'CatalogCard must pass :viewport="effectiveViewport" to demo component'
  )
  assert.match(
    card,
    /is-mobile-frame/,
    'CatalogCard must render .is-mobile-frame phone shell when mobile'
  )
  assert.match(
    card,
    /setLocalViewport\(['"]mobile['"]\)/,
    'CatalogCard must support per-card mobile switch'
  )
  assert.match(card, /DEMO_COMPONENTS/, 'CatalogCard must dynamically render DEMO_COMPONENTS[item.demoKey]')

  const combo = fs.readFileSync(path.join(SHELL_DIR, 'ComboFloatingBar.vue'), 'utf8')
  assert.match(combo, /selectedMotionCount\s*>\s*3/, 'ComboFloatingBar must warn when selectedMotionCount > 3')
  assert.match(combo, /:inert=["']selectedIds\.length\s*===\s*0["']/, 'ComboFloatingBar must bind :inert when hidden')
  assert.match(combo, /visibility:\s*hidden/, 'ComboFloatingBar must hide visibility when collapsed')
  assert.match(combo, /visibility:\s*visible/, 'ComboFloatingBar must restore visibility when shown')
  assert.match(combo, /一键复制给 Codex 话术/, 'ComboFloatingBar must render primary copy button')

  const drawer = fs.readFileSync(path.join(SHELL_DIR, 'PageBlueprintDrawer.vue'), 'utf8')
  assert.match(drawer, /🧩 整页骨架拼装预览 & 楼层话术生成器/, 'PageBlueprintDrawer must render exact title')
  assert.match(drawer, /PAGE_PRESETS/, 'PageBlueprintDrawer must render quick presets')
  assert.match(drawer, /BlueprintFloorPreview/, 'PageBlueprintDrawer must render floors via BlueprintFloorPreview')
  assert.match(drawer, /unboundSelectedMotions/, 'PageBlueprintDrawer must render standalone unboundSelectedMotions preview')
  assert.match(drawer, /width:\s*402px/, 'PageBlueprintDrawer phone frame must be 402px (390px inner + 12px bezel)')
  assert.match(drawer, /:for=["']'floor-motion-'\s*\+\s*layoutId["']/, 'PageBlueprintDrawer must bind label :for on floor motion select')
  assert.match(drawer, /:id=["']'floor-motion-'\s*\+\s*layoutId["']/, 'PageBlueprintDrawer must bind :id on floor motion select')
  assert.match(drawer, /Escape/, 'PageBlueprintDrawer must support Escape key to close')
  assert.match(drawer, /onUnmounted/, 'PageBlueprintDrawer must clean up listeners & body scroll lock onUnmounted')

  const floorPreview = fs.readFileSync(path.join(SHELL_DIR, 'BlueprintFloorPreview.vue'), 'utf8')
  assert.match(floorPreview, /LAYOUT_DEMO_MAP/, 'BlueprintFloorPreview must render live floor layouts with LAYOUT_DEMO_MAP')
  assert.match(floorPreview, /\bonUnmounted\s*\(/, 'BlueprintFloorPreview must register onUnmounted cleanup')
  for (const m of MOTION_ITEMS) {
    assert.match(
      floorPreview,
      new RegExp(`['"]${m.id}['"]`),
      `BlueprintFloorPreview.vue must handle motion ${m.id}`
    )
  }
})

test('production build output dist/index.html exists, mounts #app, and uses relative ./assets/ paths for GitHub Pages', async () => {
  await build({
    root: ROOT_DIR,
    logLevel: 'silent'
  })

  const distIndexPath = path.join(ROOT_DIR, 'dist', 'index.html')
  assert.ok(
    fs.existsSync(distIndexPath),
    `Missing production build artifact: ${distIndexPath}`
  )

  const html = fs.readFileSync(distIndexPath, 'utf8')
  assert.match(html, /<div\s+id=["']app["']\s*><\/div>/, 'dist/index.html must contain <div id="app"></div>')

  // Must reference relative ./assets/ scripts and stylesheets
  const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map((m) => m[1])
  const cssMatches = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']stylesheet["']/g)].map(
    (m) => m[1] || m[2]
  )

  assert.ok(scriptMatches.length > 0, 'dist/index.html must reference at least one built JS bundle')
  assert.ok(cssMatches.length > 0, 'dist/index.html must reference at least one built CSS stylesheet')

  for (const src of scriptMatches) {
    assert.ok(
      src.startsWith('./assets/'),
      `Expected relative ./assets/ script path for GitHub Pages compatibility, got: ${src}`
    )
    assert.ok(!src.startsWith('/assets/'), `Script path must not be root-absolute: ${src}`)
    const assetDiskPath = path.join(ROOT_DIR, 'dist', src.replace(/^\.\//, ''))
    assert.ok(fs.existsSync(assetDiskPath), `Referenced JS bundle missing on disk: ${assetDiskPath}`)
    assert.ok(fs.statSync(assetDiskPath).size > 0, `Referenced JS bundle is empty: ${assetDiskPath}`)
  }

  for (const href of cssMatches) {
    assert.ok(
      href.startsWith('./assets/'),
      `Expected relative ./assets/ stylesheet path for GitHub Pages compatibility, got: ${href}`
    )
    assert.ok(!href.startsWith('/assets/'), `Stylesheet path must not be root-absolute: ${href}`)
    const assetDiskPath = path.join(ROOT_DIR, 'dist', href.replace(/^\.\//, ''))
    assert.ok(fs.existsSync(assetDiskPath), `Referenced CSS asset missing on disk: ${assetDiskPath}`)
    assert.ok(fs.statSync(assetDiskPath).size > 0, `Referenced CSS asset is empty: ${assetDiskPath}`)
  }
})
