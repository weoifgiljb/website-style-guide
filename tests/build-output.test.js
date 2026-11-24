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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const SHELL_DIR = path.join(ROOT_DIR, 'src', 'components', 'shell')

const SHELL_COMPONENTS = [
  'HeroHeader.vue',
  'FilterToolbar.vue',
  'CatalogCard.vue',
  'ComboFloatingBar.vue',
  'PageBlueprintDrawer.vue',
  'ToastNotice.vue'
]

test('GitHub Pages workflow (.github/workflows/deploy.yml) and README.md exist and configure artifact upload & deployment', () => {
  const workflowPath = path.join(ROOT_DIR, '.github', 'workflows', 'deploy.yml')
  const readmePath = path.join(ROOT_DIR, 'README.md')

  assert.ok(fs.existsSync(workflowPath), `Missing GitHub Actions workflow: ${workflowPath}`)
  assert.ok(fs.existsSync(readmePath), `Missing README.md: ${readmePath}`)

  const workflow = fs.readFileSync(workflowPath, 'utf8')
  assert.match(workflow, /branches:\s*\[?\s*['"]?main['"]?\s*\]?/, 'deploy.yml must trigger on main branch')
  assert.match(workflow, /workflow_dispatch/, 'deploy.yml must support workflow_dispatch')
  assert.match(workflow, /pages:\s*write/, 'deploy.yml must set pages: write permission')
  assert.match(workflow, /id-token:\s*write/, 'deploy.yml must set id-token: write permission')
  assert.match(workflow, /npm\s+ci/, 'deploy.yml must run npm ci')
  assert.match(workflow, /npm\s+test/, 'deploy.yml must run npm test')
  assert.match(workflow, /npm\s+run\s+build/, 'deploy.yml must run npm run build')
  assert.match(workflow, /actions\/configure-pages@v\d+/, 'deploy.yml must configure GitHub Pages')
  assert.match(workflow, /actions\/upload-pages-artifact@v\d+/, 'deploy.yml must use actions/upload-pages-artifact')
  assert.match(workflow, /path:\s*['"]?\.\/dist['"]?/, 'deploy.yml must upload ./dist')
  assert.match(workflow, /actions\/deploy-pages@v\d+/, 'deploy.yml must use actions/deploy-pages')

  const readme = fs.readFileSync(readmePath, 'utf8')
  assert.match(readme, /npm run dev/, 'README.md must document local dev command')
  assert.match(readme, /npm test/, 'README.md must document test command')
  assert.match(readme, /GitHub Actions/, 'README.md must document GitHub Pages Source: GitHub Actions')
})

test('all 6 shell components, src/App.vue, and src/main.js exist and compile cleanly with vue/compiler-sfc', () => {
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

test('shell components enforce key UI contracts (stage-badge deduplication, preset drawer open, viewport switch, Esc close)', () => {
  const hero = fs.readFileSync(path.join(SHELL_DIR, 'HeroHeader.vue'), 'utf8')
  assert.match(hero, /官网常用样式 & 动画效果速查（不用背，看着挑）/, 'HeroHeader must render exact H1')
  assert.match(hero, /0\.28s/, 'HeroHeader must include 0.28s speed option')
  assert.match(hero, /0\.5s/, 'HeroHeader must include 0.5s speed option')
  assert.match(hero, /1\.05s/, 'HeroHeader must include 1.05s speed option')
  assert.match(hero, /applyPreset/, 'HeroHeader must invoke applyPreset')
  assert.match(hero, /openDrawer/, 'HeroHeader preset click must also openDrawer')

  const toolbar = fs.readFileSync(path.join(SHELL_DIR, 'FilterToolbar.vue'), 'utf8')
  assert.match(toolbar, /position:\s*sticky/, 'FilterToolbar must be sticky')
  assert.match(toolbar, /搜编号、版式、动效或场景/, 'FilterToolbar must include exact search placeholder')
  assert.match(toolbar, /🧩 整页拼装预览/, 'FilterToolbar must include blueprint trigger button')

  const card = fs.readFileSync(path.join(SHELL_DIR, 'CatalogCard.vue'), 'utf8')
  assert.match(
    card,
    /item\.kind\s*===\s*['"]style['"][\s\S]*stage-badge/,
    'CatalogCard must conditionally render .stage-badge only when item.kind === "style"'
  )
  assert.match(card, /DEMO_COMPONENTS/, 'CatalogCard must dynamically render DEMO_COMPONENTS[item.demoKey]')

  const combo = fs.readFileSync(path.join(SHELL_DIR, 'ComboFloatingBar.vue'), 'utf8')
  assert.match(combo, /selectedMotionCount\s*>\s*3/, 'ComboFloatingBar must warn when selectedMotionCount > 3')
  assert.match(combo, /一键复制给 Codex 话术/, 'ComboFloatingBar must render primary copy button')

  const drawer = fs.readFileSync(path.join(SHELL_DIR, 'PageBlueprintDrawer.vue'), 'utf8')
  assert.match(drawer, /🧩 整页骨架拼装预览 & 楼层话术生成器/, 'PageBlueprintDrawer must render exact title')
  assert.match(drawer, /LAYOUT_DEMO_MAP/, 'PageBlueprintDrawer must render live floors with LAYOUT_DEMO_MAP')
  assert.match(drawer, /Escape/, 'PageBlueprintDrawer must support Escape key to close')
  assert.match(drawer, /onUnmounted/, 'PageBlueprintDrawer must clean up listeners & body scroll lock onUnmounted')
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
