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
import { LAYOUT_ITEMS } from '../src/data/layouts.js'
import { MOTION_ITEMS } from '../src/data/motions.js'
import { PITFALL_ITEMS } from '../src/data/pitfalls.js'
import { ALL_ITEMS } from '../src/data/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const DEMOS_DIR = path.join(ROOT_DIR, 'src', 'components', 'demos')
const MASTER_INDEX_FILE = path.join(DEMOS_DIR, 'index.js')
const LAYOUTS_DIR = path.join(DEMOS_DIR, 'layouts')
const INDEX_FILE = path.join(LAYOUTS_DIR, 'index.js')
const MOTIONS_DIR = path.join(DEMOS_DIR, 'motions')
const MOTIONS_INDEX_FILE = path.join(MOTIONS_DIR, 'index.js')
const PITFALLS_DIR = path.join(DEMOS_DIR, 'pitfalls')
const PITFALLS_INDEX_FILE = path.join(PITFALLS_DIR, 'index.js')

test('every LAYOUT_ITEMS demoKey maps to an existing, valid, scoped Vue SFC with viewport & compact props and .is-mobile styles', () => {
  assert.equal(LAYOUT_ITEMS.length, 14)

  for (const item of LAYOUT_ITEMS) {
    const sfcPath = path.join(LAYOUTS_DIR, `${item.demoKey}.vue`)
    assert.ok(
      fs.existsSync(sfcPath),
      `Missing layout component file for ${item.id}: ${sfcPath}`
    )

    const source = fs.readFileSync(sfcPath, 'utf8')
    const lineCount = source.trimEnd().split(/\r?\n/).length
    assert.ok(
      lineCount >= 55 && lineCount <= 300,
      `${item.demoKey}.vue should be concise (55–300 lines), got ${lineCount} lines`
    )

    const { descriptor, errors } = parse(source, { filename: `${item.demoKey}.vue` })
    assert.equal(
      errors.length,
      0,
      `${item.demoKey}.vue failed SFC parse: ${errors.map((e) => e.message).join('; ')}`
    )
    assert.ok(descriptor.template, `${item.demoKey}.vue is missing <template>`)
    assert.ok(descriptor.scriptSetup, `${item.demoKey}.vue is missing <script setup>`)
    assert.ok(
      descriptor.styles.length > 0 && descriptor.styles.every((s) => s.scoped),
      `${item.demoKey}.vue must use <style scoped>`
    )

    // Verify script compiles cleanly and defines viewport & compact props
    const compiledScript = compileScript(descriptor, { id: item.demoKey })
    assert.match(
      descriptor.scriptSetup.content,
      /defineProps\(\s*\{[\s\S]*viewport[\s\S]*default:\s*['"]desktop['"][\s\S]*compact[\s\S]*default:\s*false[\s\S]*\}\s*\)/,
      `${item.demoKey}.vue must define viewport (default 'desktop') and compact (default false) props`
    )

    // Verify template compiles cleanly and binds is-mobile / is-compact
    const compiledTemplate = compileTemplate({
      id: item.demoKey,
      filename: `${item.demoKey}.vue`,
      source: descriptor.template.content,
      scoped: true,
      compilerOptions: {
        bindingMetadata: compiledScript.bindings
      }
    })
    assert.equal(
      compiledTemplate.errors.length,
      0,
      `${item.demoKey}.vue template compile errors: ${compiledTemplate.errors.join('; ')}`
    )
    assert.match(
      descriptor.template.content,
      /is-mobile/,
      `${item.demoKey}.vue template must bind .is-mobile class`
    )
    assert.match(
      descriptor.template.content,
      /is-compact/,
      `${item.demoKey}.vue template must bind .is-compact class`
    )

    // Verify scoped CSS compiles cleanly and includes .is-mobile rules
    const combinedStyles = descriptor.styles.map((s) => s.content).join('\n')
    assert.match(
      combinedStyles,
      /\.is-mobile\b/,
      `${item.demoKey}.vue <style scoped> must define .is-mobile responsive styles`
    )
    for (const [idx, styleBlock] of descriptor.styles.entries()) {
      const styleResult = compileStyle({
        id: `data-v-${item.demoKey.toLowerCase()}-${idx}`,
        filename: `${item.demoKey}.vue`,
        source: styleBlock.content,
        scoped: Boolean(styleBlock.scoped)
      })
      assert.equal(
        styleResult.errors.length,
        0,
        `${item.demoKey}.vue style compile errors: ${styleResult.errors.map((e) => e.message).join('; ')}`
      )
    }
  }
})

test('layouts/index.js imports and exports LAYOUT_DEMO_MAP covering all 14 LAYOUT_ITEMS demoKeys', () => {
  assert.ok(fs.existsSync(INDEX_FILE), `Missing barrel file: ${INDEX_FILE}`)
  const indexSource = fs.readFileSync(INDEX_FILE, 'utf8')

  assert.match(
    indexSource,
    /export\s+const\s+LAYOUT_DEMO_MAP\s*=\s*\{/,
    'layouts/index.js must export LAYOUT_DEMO_MAP'
  )

  const mapBodyMatch = indexSource.match(/export\s+const\s+LAYOUT_DEMO_MAP\s*=\s*\{([\s\S]*?)\}/)
  assert.ok(mapBodyMatch, 'Could not parse LAYOUT_DEMO_MAP object body')
  const mapBody = mapBodyMatch[1]

  for (const item of LAYOUT_ITEMS) {
    const importRegex = new RegExp(
      `import\\s+${item.demoKey}\\s+from\\s+['"]\\.\\/${item.demoKey}\\.vue['"]`
    )
    assert.match(
      indexSource,
      importRegex,
      `layouts/index.js must import ${item.demoKey} from './${item.demoKey}.vue'`
    )
    const keyRegex = new RegExp(`\\b${item.demoKey}\\b`)
    assert.match(
      mapBody,
      keyRegex,
      `LAYOUT_DEMO_MAP must include ${item.demoKey}`
    )
  }
})

test('interactive layout components S-12, S-13, and S-14 declare reactive state and interactive controls', () => {
  const s12 = fs.readFileSync(path.join(LAYOUTS_DIR, 'LayoutS12PricingCards.vue'), 'utf8')
  assert.match(s12, /ref\(\s*['"]yearly['"]\s*\)/, 'LayoutS12PricingCards must use ref("yearly") for billing toggle')
  assert.match(s12, /@click/, 'LayoutS12PricingCards must support click toggling')

  const s13 = fs.readFileSync(path.join(LAYOUTS_DIR, 'LayoutS13SceneTabs.vue'), 'utf8')
  assert.match(s13, /ref\(\s*0\s*\)/, 'LayoutS13SceneTabs must use ref(0) for active role tab')
  assert.match(s13, /@click/, 'LayoutS13SceneTabs must support click switching tabs')

  const s14 = fs.readFileSync(path.join(LAYOUTS_DIR, 'LayoutS14FaqSection.vue'), 'utf8')
  assert.match(s14, /ref\(/, 'LayoutS14FaqSection must use ref() for accordion expand/collapse')
  assert.match(s14, /@click/, 'LayoutS14FaqSection must support click toggling FAQ items')
})

test('Vite programmatic in-memory build compiles layouts/index.js and all 14 SFCs without errors', async () => {
  const result = await build({
    root: ROOT_DIR,
    logLevel: 'silent',
    build: {
      write: false,
      lib: {
        entry: INDEX_FILE,
        formats: ['es'],
        fileName: 'layouts-bundle'
      },
      rollupOptions: {
        external: ['vue']
      }
    }
  })

  const outputs = Array.isArray(result) ? result : [result]
  assert.ok(outputs.length > 0 && outputs[0].output.length > 0, 'Expected non-empty Rollup bundle output')
  const jsChunk = outputs[0].output.find((chunk) => chunk.type === 'chunk')
  assert.ok(jsChunk, 'Expected compiled JS chunk for layouts/index.js')
  for (const item of LAYOUT_ITEMS) {
    assert.match(jsChunk.code, new RegExp(`\\b${item.demoKey}\\b`), `Bundle output missing ${item.demoKey}`)
  }
})

test('every MOTION_ITEMS demoKey maps to an existing, valid, scoped Vue SFC with replayTick & viewport props, stage-badge, and .is-mobile styles', () => {
  assert.equal(MOTION_ITEMS.length, 14)

  const entranceKeys = new Set(['MotionFadeUp', 'MotionStagger', 'MotionZoomIn'])
  const durResponsiveKeys = new Set([
    'MotionFadeUp',
    'MotionStagger',
    'MotionZoomIn',
    'MotionTextRotate',
    'MotionHoverLift',
    'MotionBorderGlow',
    'MotionImageZoom',
    'MotionAccordion',
    'MotionTabSlide',
    'MotionStickyScroll',
    'MotionParallax'
  ])

  for (const item of MOTION_ITEMS) {
    const sfcPath = path.join(MOTIONS_DIR, `${item.demoKey}.vue`)
    assert.ok(
      fs.existsSync(sfcPath),
      `Missing motion component file for ${item.id}: ${sfcPath}`
    )

    const source = fs.readFileSync(sfcPath, 'utf8')
    const { descriptor, errors } = parse(source, { filename: `${item.demoKey}.vue` })
    assert.equal(
      errors.length,
      0,
      `${item.demoKey}.vue failed SFC parse: ${errors.map((e) => e.message).join('; ')}`
    )
    assert.ok(descriptor.template, `${item.demoKey}.vue is missing <template>`)
    assert.ok(descriptor.scriptSetup, `${item.demoKey}.vue is missing <script setup>`)
    assert.ok(
      descriptor.styles.length > 0 && descriptor.styles.every((s) => s.scoped),
      `${item.demoKey}.vue must use <style scoped>`
    )

    const compiledScript = compileScript(descriptor, { id: item.demoKey })
    assert.match(
      descriptor.scriptSetup.content,
      /defineProps\(\s*\{[\s\S]*replayTick[\s\S]*default:\s*0[\s\S]*viewport[\s\S]*default:\s*['"]desktop['"][\s\S]*\}\s*\)/,
      `${item.demoKey}.vue must define replayTick (default 0) and viewport (default 'desktop') props`
    )

    if (entranceKeys.has(item.demoKey)) {
      assert.match(
        descriptor.scriptSetup.content,
        /\bwatch\s*\(/,
        `${item.demoKey}.vue must watch props.replayTick to replay entrance animation`
      )
    }

    const combinedStyles = descriptor.styles.map((s) => s.content).join('\n')
    assert.match(
      combinedStyles,
      /\.is-mobile\b/,
      `${item.demoKey}.vue <style scoped> must define .is-mobile responsive styles`
    )

    if (durResponsiveKeys.has(item.demoKey)) {
      assert.match(
        combinedStyles,
        /var\(--dur\b/,
        `${item.demoKey}.vue <style scoped> must reference var(--dur) for global speed responsiveness`
      )
    }

    const compiledTemplate = compileTemplate({
      id: item.demoKey,
      filename: `${item.demoKey}.vue`,
      source: descriptor.template.content,
      scoped: true,
      compilerOptions: {
        bindingMetadata: compiledScript.bindings
      }
    })
    assert.equal(
      compiledTemplate.errors.length,
      0,
      `${item.demoKey}.vue template compile errors: ${compiledTemplate.errors.join('; ')}`
    )
    assert.match(
      descriptor.template.content,
      /stage-badge/,
      `${item.demoKey}.vue template must render .stage-badge`
    )
    assert.match(
      descriptor.template.content,
      /is-mobile/,
      `${item.demoKey}.vue template must bind .is-mobile class`
    )

    for (const [idx, styleBlock] of descriptor.styles.entries()) {
      const styleResult = compileStyle({
        id: `data-v-${item.demoKey.toLowerCase()}-${idx}`,
        filename: `${item.demoKey}.vue`,
        source: styleBlock.content,
        scoped: Boolean(styleBlock.scoped)
      })
      assert.equal(
        styleResult.errors.length,
        0,
        `${item.demoKey}.vue style compile errors: ${styleResult.errors.map((e) => e.message).join('; ')}`
      )
    }
  }
})

test('motions/index.js imports and exports MOTION_DEMO_MAP covering all 14 MOTION_ITEMS demoKeys', () => {
  assert.ok(fs.existsSync(MOTIONS_INDEX_FILE), `Missing barrel file: ${MOTIONS_INDEX_FILE}`)
  const indexSource = fs.readFileSync(MOTIONS_INDEX_FILE, 'utf8')

  assert.match(
    indexSource,
    /export\s+const\s+MOTION_DEMO_MAP\s*=\s*\{/,
    'motions/index.js must export MOTION_DEMO_MAP'
  )

  const mapBodyMatch = indexSource.match(/export\s+const\s+MOTION_DEMO_MAP\s*=\s*\{([\s\S]*?)\}/)
  assert.ok(mapBodyMatch, 'Could not parse MOTION_DEMO_MAP object body')
  const mapBody = mapBodyMatch[1]

  for (const item of MOTION_ITEMS) {
    const importRegex = new RegExp(
      `import\\s+${item.demoKey}\\s+from\\s+['"]\\.\\/${item.demoKey}\\.vue['"]`
    )
    assert.match(
      indexSource,
      importRegex,
      `motions/index.js must import ${item.demoKey} from './${item.demoKey}.vue'`
    )
    const keyRegex = new RegExp(`\\b${item.demoKey}\\b`)
    assert.match(
      mapBody,
      keyRegex,
      `MOTION_DEMO_MAP must include ${item.demoKey}`
    )
  }
})

test('stateful motion components register onUnmounted cleanup and stop click propagation on controls', () => {
  const cleanupRequiredKeys = [
    'MotionTextRotate',
    'MotionHoverLift',
    'MotionBorderGlow',
    'MotionImageZoom',
    'MotionStickyScroll',
    'MotionParallax',
    'MotionCountUp'
  ]

  for (const key of cleanupRequiredKeys) {
    const source = fs.readFileSync(path.join(MOTIONS_DIR, `${key}.vue`), 'utf8')
    assert.match(
      source,
      /\bonUnmounted\s*\(/,
      `${key}.vue must register onUnmounted() lifecycle cleanup`
    )
  }

  const interactiveKeys = [
    'MotionFadeUp',
    'MotionStagger',
    'MotionZoomIn',
    'MotionTextRotate',
    'MotionHoverLift',
    'MotionBorderGlow',
    'MotionImageZoom',
    'MotionAccordion',
    'MotionTabSlide',
    'MotionStickyScroll',
    'MotionParallax',
    'MotionCountUp'
  ]

  for (const key of interactiveKeys) {
    const source = fs.readFileSync(path.join(MOTIONS_DIR, `${key}.vue`), 'utf8')
    assert.match(
      source,
      /@click\.stop\b/,
      `${key}.vue must stop click propagation (@click.stop) on interactive controls`
    )
  }
})

test('Vite programmatic in-memory build compiles motions/index.js and all 14 motion SFCs without errors', async () => {
  const result = await build({
    root: ROOT_DIR,
    logLevel: 'silent',
    build: {
      write: false,
      lib: {
        entry: MOTIONS_INDEX_FILE,
        formats: ['es'],
        fileName: 'motions-bundle'
      },
      rollupOptions: {
        external: ['vue']
      }
    }
  })

  const outputs = Array.isArray(result) ? result : [result]
  assert.ok(outputs.length > 0 && outputs[0].output.length > 0, 'Expected non-empty Rollup bundle output')
  const jsChunk = outputs[0].output.find((chunk) => chunk.type === 'chunk')
  assert.ok(jsChunk, 'Expected compiled JS chunk for motions/index.js')
  for (const item of MOTION_ITEMS) {
    assert.match(jsChunk.code, new RegExp(`\\b${item.demoKey}\\b`), `Bundle output missing ${item.demoKey}`)
  }
})

test('every PITFALL_ITEMS demoKey maps to an existing, valid, scoped Vue SFC with replayTick prop, stage-badge, and stage-action', () => {
  assert.equal(PITFALL_ITEMS.length, 6)

  for (const item of PITFALL_ITEMS) {
    const sfcPath = path.join(PITFALLS_DIR, `${item.demoKey}.vue`)
    assert.ok(
      fs.existsSync(sfcPath),
      `Missing pitfall component file for ${item.id}: ${sfcPath}`
    )

    const source = fs.readFileSync(sfcPath, 'utf8')
    const { descriptor, errors } = parse(source, { filename: `${item.demoKey}.vue` })
    assert.equal(
      errors.length,
      0,
      `${item.demoKey}.vue failed SFC parse: ${errors.map((e) => e.message).join('; ')}`
    )
    assert.ok(descriptor.template, `${item.demoKey}.vue is missing <template>`)
    assert.ok(descriptor.scriptSetup, `${item.demoKey}.vue is missing <script setup>`)
    assert.ok(
      descriptor.styles.length > 0 && descriptor.styles.every((s) => s.scoped),
      `${item.demoKey}.vue must use <style scoped>`
    )

    const compiledScript = compileScript(descriptor, { id: item.demoKey })
    assert.match(
      descriptor.scriptSetup.content,
      /defineProps\(\s*\{[\s\S]*replayTick[\s\S]*default:\s*0[\s\S]*\}\s*\)/,
      `${item.demoKey}.vue must define replayTick (default 0) prop`
    )

    const compiledTemplate = compileTemplate({
      id: item.demoKey,
      filename: `${item.demoKey}.vue`,
      source: descriptor.template.content,
      scoped: true,
      compilerOptions: {
        bindingMetadata: compiledScript.bindings
      }
    })
    assert.equal(
      compiledTemplate.errors.length,
      0,
      `${item.demoKey}.vue template compile errors: ${compiledTemplate.errors.join('; ')}`
    )
    assert.match(
      descriptor.template.content,
      /stage-badge/,
      `${item.demoKey}.vue template must render .stage-badge`
    )
    assert.match(
      descriptor.template.content,
      /stage-action/,
      `${item.demoKey}.vue template must render .stage-action`
    )

    // Verify every <button> declares type="button" and @click.stop
    const buttonTags = descriptor.template.content.match(/<button\b[\s\S]*?>/g) || []
    assert.ok(buttonTags.length > 0, `${item.demoKey}.vue must contain at least one <button>`)
    for (const btnTag of buttonTags) {
      assert.match(
        btnTag,
        /type=["']button["']/,
        `${item.demoKey}.vue button must declare type="button": ${btnTag}`
      )
      assert.match(
        btnTag,
        /@click\.stop\b/,
        `${item.demoKey}.vue button must declare @click.stop: ${btnTag}`
      )
    }

    for (const [idx, styleBlock] of descriptor.styles.entries()) {
      const styleResult = compileStyle({
        id: `data-v-${item.demoKey.toLowerCase()}-${idx}`,
        filename: `${item.demoKey}.vue`,
        source: styleBlock.content,
        scoped: Boolean(styleBlock.scoped)
      })
      assert.equal(
        styleResult.errors.length,
        0,
        `${item.demoKey}.vue style compile errors: ${styleResult.errors.map((e) => e.message).join('; ')}`
      )
    }
  }
})

test('PitfallAmplitude cleans up timers in onUnmounted and all 6 pitfall components render exact comparison copy', () => {
  const p01 = fs.readFileSync(path.join(PITFALLS_DIR, 'PitfallAmplitude.vue'), 'utf8')
  assert.match(p01, /\bonUnmounted\s*\(/, 'PitfallAmplitude.vue must register onUnmounted() timer cleanup')
  assert.match(p01, /\bwatch\s*\(/, 'PitfallAmplitude.vue must watch replayTick for simultaneous trigger demo')
  assert.match(p01, /悬停或点对比体验/, 'PitfallAmplitude.vue must render exact badge text')
  assert.match(p01, /▶ 同时触发对比/, 'PitfallAmplitude.vue must render exact action text')
  assert.match(p01, /1100/, 'PitfallAmplitude.vue must hold demo state for 1100ms')

  const p02 = fs.readFileSync(path.join(PITFALLS_DIR, 'PitfallDensity.vue'), 'utf8')
  assert.doesNotMatch(p02, /\bwatch\s*\(/, 'PitfallDensity.vue must not flip mode on replayTick')
  assert.match(p02, /✅ 当前：单焦点克制/, 'PitfallDensity.vue must render good badge')
  assert.match(p02, /❌ 当前：全屏乱飞反例/, 'PitfallDensity.vue must render bad badge')
  assert.match(p02, /看反例效果/, 'PitfallDensity.vue must render toggle to bad text')
  assert.match(p02, /切回推荐效果/, 'PitfallDensity.vue must render toggle to good text')

  const p03 = fs.readFileSync(path.join(PITFALLS_DIR, 'PitfallSnapTransition.vue'), 'utf8')
  assert.doesNotMatch(p03, /\bwatch\s*\(/, 'PitfallSnapTransition.vue must not flip mode on replayTick')
  assert.match(p03, /点击两侧展开对比/, 'PitfallSnapTransition.vue must render exact badge text')
  assert.match(p03, /⇄ 同步切换两侧/, 'PitfallSnapTransition.vue must render exact action text')
  assert.match(p03, /grid-template-rows/, 'PitfallSnapTransition.vue must use grid-template-rows smooth height transition')
  assert.match(p03, /min-height:\s*0/, 'PitfallSnapTransition.vue .smooth-inner must set min-height: 0')

  const p04 = fs.readFileSync(path.join(PITFALLS_DIR, 'PitfallMobileStack.vue'), 'utf8')
  assert.doesNotMatch(p04, /\bwatch\s*\(/, 'PitfallMobileStack.vue must not flip mode on replayTick')
  assert.match(p04, /📱 390px：✅ 单列堆叠/, 'PitfallMobileStack.vue must render good badge')
  assert.match(p04, /📱 390px：❌ 强塞三栏/, 'PitfallMobileStack.vue must render bad badge')
  assert.match(p04, /看挤扁反例/, 'PitfallMobileStack.vue must render toggle to bad text')
  assert.match(p04, /看正确降级/, 'PitfallMobileStack.vue must render toggle to good text')

  const p05 = fs.readFileSync(path.join(PITFALLS_DIR, 'PitfallMobileSticky.vue'), 'utf8')
  assert.doesNotMatch(p05, /\bwatch\s*\(/, 'PitfallMobileSticky.vue must not flip mode on replayTick')
  assert.match(p05, /📱 390px：✅ 纵向分段/, 'PitfallMobileSticky.vue must render good badge')
  assert.match(p05, /📱 390px：❌ 强行左右分栏/, 'PitfallMobileSticky.vue must render bad badge')
  assert.match(p05, /看挤压反例/, 'PitfallMobileSticky.vue must render toggle to bad text')
  assert.match(p05, /看正确降级/, 'PitfallMobileSticky.vue must render toggle to good text')

  const p06 = fs.readFileSync(path.join(PITFALLS_DIR, 'PitfallMobileFloating.vue'), 'utf8')
  assert.doesNotMatch(p06, /\bwatch\s*\(/, 'PitfallMobileFloating.vue must not flip mode on replayTick')
  assert.match(p06, /📱 390px：✅ 收起防遮挡/, 'PitfallMobileFloating.vue must render good badge')
  assert.match(p06, /📱 390px：❌ 悬浮遮挡文案/, 'PitfallMobileFloating.vue must render bad badge')
  assert.match(p06, /看遮挡反例/, 'PitfallMobileFloating.vue must render toggle to bad text')
  assert.match(p06, /看正确做法/, 'PitfallMobileFloating.vue must render toggle to good text')
  assert.match(p06, /标题与按钮 100% 清晰无遮挡/, 'PitfallMobileFloating.vue must render good subtitle')
  assert.match(p06, /❌ 悬浮气泡压住主标题与行动按钮/, 'PitfallMobileFloating.vue must render bad subtitle')
})

test('pitfalls/index.js imports and exports PITFALL_DEMO_MAP covering all 6 PITFALL_ITEMS demoKeys', () => {
  assert.ok(fs.existsSync(PITFALLS_INDEX_FILE), `Missing barrel file: ${PITFALLS_INDEX_FILE}`)
  const indexSource = fs.readFileSync(PITFALLS_INDEX_FILE, 'utf8')

  assert.match(
    indexSource,
    /export\s+const\s+PITFALL_DEMO_MAP\s*=\s*\{/,
    'pitfalls/index.js must export PITFALL_DEMO_MAP'
  )

  const mapBodyMatch = indexSource.match(/export\s+const\s+PITFALL_DEMO_MAP\s*=\s*\{([\s\S]*?)\}/)
  assert.ok(mapBodyMatch, 'Could not parse PITFALL_DEMO_MAP object body')
  const mapBody = mapBodyMatch[1]

  for (const item of PITFALL_ITEMS) {
    const importRegex = new RegExp(
      `import\\s+${item.demoKey}\\s+from\\s+['"]\\.\\/${item.demoKey}\\.vue['"]`
    )
    assert.match(
      indexSource,
      importRegex,
      `pitfalls/index.js must import ${item.demoKey} from './${item.demoKey}.vue'`
    )
    const keyRegex = new RegExp(`\\b${item.demoKey}\\b`)
    assert.match(
      mapBody,
      keyRegex,
      `PITFALL_DEMO_MAP must include ${item.demoKey}`
    )
  }
})

test('master demos/index.js bundles via Vite and exports DEMO_COMPONENTS, LAYOUT_DEMO_MAP, MOTION_DEMO_MAP, PITFALL_DEMO_MAP covering all 34 ALL_ITEMS keys', async () => {
  assert.equal(ALL_ITEMS.length, 34)
  assert.ok(fs.existsSync(MASTER_INDEX_FILE), `Missing master barrel file: ${MASTER_INDEX_FILE}`)

  const masterSource = fs.readFileSync(MASTER_INDEX_FILE, 'utf8')
  assert.match(masterSource, /LAYOUT_DEMO_MAP/, 'demos/index.js must reference LAYOUT_DEMO_MAP')
  assert.match(masterSource, /MOTION_DEMO_MAP/, 'demos/index.js must reference MOTION_DEMO_MAP')
  assert.match(masterSource, /PITFALL_DEMO_MAP/, 'demos/index.js must reference PITFALL_DEMO_MAP')
  assert.match(masterSource, /DEMO_COMPONENTS/, 'demos/index.js must export DEMO_COMPONENTS')

  const result = await build({
    root: ROOT_DIR,
    logLevel: 'silent',
    build: {
      write: false,
      lib: {
        entry: MASTER_INDEX_FILE,
        formats: ['es'],
        fileName: 'all-demos-bundle'
      },
      rollupOptions: {
        external: ['vue']
      }
    }
  })

  const outputs = Array.isArray(result) ? result : [result]
  assert.ok(outputs.length > 0 && outputs[0].output.length > 0, 'Expected non-empty Rollup bundle output')
  const jsChunk = outputs[0].output.find((chunk) => chunk.type === 'chunk')
  assert.ok(jsChunk, 'Expected compiled JS chunk for demos/index.js')

  // Evaluate the compiled ES module via data URL (or inspect exports + import) to verify exact 34 keys with zero missing/extra
  assert.ok(jsChunk.exports.includes('DEMO_COMPONENTS'), 'Bundle must export DEMO_COMPONENTS')
  assert.ok(jsChunk.exports.includes('LAYOUT_DEMO_MAP'), 'Bundle must export LAYOUT_DEMO_MAP')
  assert.ok(jsChunk.exports.includes('MOTION_DEMO_MAP'), 'Bundle must export MOTION_DEMO_MAP')
  assert.ok(jsChunk.exports.includes('PITFALL_DEMO_MAP'), 'Bundle must export PITFALL_DEMO_MAP')

  // Resolve bare 'vue' import to actual file URL so we can dynamically import the bundled module and inspect keys directly
  const vueEntryUrl = import.meta.resolve('vue')
  const runnableCode = jsChunk.code.replace(/from\s*["']vue["']/g, `from ${JSON.stringify(vueEntryUrl)}`)
  const dataUrl = `data:text/javascript;base64,${Buffer.from(runnableCode, 'utf8').toString('base64')}`
  const mod = await import(dataUrl)

  const expectedLayoutKeys = LAYOUT_ITEMS.map((item) => item.demoKey).sort()
  const expectedMotionKeys = MOTION_ITEMS.map((item) => item.demoKey).sort()
  const expectedPitfallKeys = PITFALL_ITEMS.map((item) => item.demoKey).sort()
  const expectedAllKeys = ALL_ITEMS.map((item) => item.demoKey).sort()

  assert.deepEqual(Object.keys(mod.LAYOUT_DEMO_MAP).sort(), expectedLayoutKeys)
  assert.deepEqual(Object.keys(mod.MOTION_DEMO_MAP).sort(), expectedMotionKeys)
  assert.deepEqual(Object.keys(mod.PITFALL_DEMO_MAP).sort(), expectedPitfallKeys)
  assert.deepEqual(Object.keys(mod.DEMO_COMPONENTS).sort(), expectedAllKeys)
  assert.equal(Object.keys(mod.DEMO_COMPONENTS).length, 34)
})
