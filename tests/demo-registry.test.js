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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const LAYOUTS_DIR = path.join(ROOT_DIR, 'src', 'components', 'demos', 'layouts')
const INDEX_FILE = path.join(LAYOUTS_DIR, 'index.js')
const MOTIONS_DIR = path.join(ROOT_DIR, 'src', 'components', 'demos', 'motions')
const MOTIONS_INDEX_FILE = path.join(MOTIONS_DIR, 'index.js')

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
      lineCount >= 55 && lineCount <= 125,
      `${item.demoKey}.vue should be concise (55–125 lines), got ${lineCount} lines`
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

test('every MOTION_ITEMS demoKey maps to an existing, valid, scoped Vue SFC with replayTick prop and stage-badge', () => {
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
      /defineProps\(\s*\{[\s\S]*replayTick[\s\S]*default:\s*0[\s\S]*\}\s*\)/,
      `${item.demoKey}.vue must define replayTick (default 0) prop`
    )

    if (entranceKeys.has(item.demoKey)) {
      assert.match(
        descriptor.scriptSetup.content,
        /\bwatch\s*\(/,
        `${item.demoKey}.vue must watch props.replayTick to replay entrance animation`
      )
    }

    if (durResponsiveKeys.has(item.demoKey)) {
      const combinedStyles = descriptor.styles.map((s) => s.content).join('\n')
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
