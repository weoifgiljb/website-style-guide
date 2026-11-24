import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ALL_ITEMS,
  ITEMS_BY_ID,
  CATEGORIES,
  PAGE_PRESETS,
  LAYOUT_ITEMS,
  MOTION_ITEMS,
  PITFALL_ITEMS
} from '../src/data/index.js'
import { buildCodexPrompt, filterCatalogItems } from '../src/utils/promptBuilder.js'
import { useCatalogStore } from '../src/composables/useCatalogStore.js'

const REQUIRED_FIELDS = [
  'id',
  'code',
  'cat',
  'kind',
  'demoKey',
  'name',
  'en',
  'badge',
  'keywords',
  'scene',
  'mobileTip',
  'prompt',
  'shortPrompt'
]

test('catalog registers exactly 34 items across 6 content categories with complete fields', () => {
  assert.equal(LAYOUT_ITEMS.length, 14)
  assert.equal(MOTION_ITEMS.length, 14)
  assert.equal(PITFALL_ITEMS.length, 6)
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

  for (const item of ALL_ITEMS) {
    for (const field of REQUIRED_FIELDS) {
      assert.equal(typeof item[field], 'string', `${item.id} missing string field ${field}`)
      assert.ok(item[field].trim().length > 0, `${item.id} has empty field ${field}`)
    }
    assert.equal(ITEMS_BY_ID[item.id], item)
  }

  assert.deepEqual(
    CATEGORIES.map((c) => c.id),
    ['all', 'style', 'enter', 'hover', 'scroll', 'loop', 'pitfall']
  )
  assert.equal(PAGE_PRESETS.length, 3)

  const expectedDemoKeys = [
    ['S-01', 'LayoutS01HeroSplit'],
    ['S-02', 'LayoutS02ThreeCards'],
    ['S-03', 'LayoutS03AltRows'],
    ['S-04', 'LayoutS04ChannelGrid'],
    ['S-05', 'LayoutS05StatsBanner'],
    ['S-06', 'LayoutS06BottomCta'],
    ['S-07', 'LayoutS07CenteredHero'],
    ['S-08', 'LayoutS08BentoGrid'],
    ['S-09', 'LayoutS09Comparison'],
    ['S-10', 'LayoutS10StepFlow'],
    ['S-11', 'LayoutS11Testimonials'],
    ['S-12', 'LayoutS12PricingCards'],
    ['S-13', 'LayoutS13SceneTabs'],
    ['S-14', 'LayoutS14FaqSection'],
    ['M-01', 'MotionFadeUp'],
    ['M-02', 'MotionStagger'],
    ['M-03', 'MotionZoomIn'],
    ['M-04', 'MotionTextRotate'],
    ['M-05', 'MotionHoverLift'],
    ['M-06', 'MotionBorderGlow'],
    ['M-07', 'MotionImageZoom'],
    ['M-08', 'MotionAccordion'],
    ['M-09', 'MotionTabSlide'],
    ['M-10', 'MotionStickyScroll'],
    ['M-11', 'MotionParallax'],
    ['M-12', 'MotionCountUp'],
    ['M-13', 'MotionMarquee'],
    ['M-14', 'MotionFloatPulse'],
    ['P-01', 'PitfallAmplitude'],
    ['P-02', 'PitfallDensity'],
    ['P-03', 'PitfallSnapTransition'],
    ['P-04', 'PitfallMobileStack'],
    ['P-05', 'PitfallMobileSticky'],
    ['P-06', 'PitfallMobileFloating']
  ]
  assert.deepEqual(
    ALL_ITEMS.map((item) => [item.id, item.demoKey]),
    expectedDemoKeys
  )
})

test('every preset references valid layout, motion, and extra IDs', () => {
  assert.deepEqual(
    PAGE_PRESETS.map((p) => p.id),
    ['standard-feature', 'comparison-landing', 'flagship-showcase']
  )
  for (const preset of PAGE_PRESETS) {
    assert.ok(preset.floors.length >= 5)
    for (const floor of preset.floors) {
      assert.ok(ITEMS_BY_ID[floor.layoutId], `missing layout ${floor.layoutId}`)
      assert.equal(ITEMS_BY_ID[floor.layoutId].kind, 'style')
      if (floor.motionId) {
        assert.ok(ITEMS_BY_ID[floor.motionId], `missing motion ${floor.motionId}`)
        assert.equal(ITEMS_BY_ID[floor.motionId].kind, 'motion')
      }
    }
    for (const extraId of preset.extraIds || []) {
      assert.ok(ITEMS_BY_ID[extraId], `missing extraId ${extraId}`)
    }
  }
})

test('filterCatalogItems filters by category and case-insensitive keyword across metadata', () => {
  const s08 = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'all',
    searchQuery: 'bento'
  })
  assert.equal(s08.length, 1)
  assert.equal(s08[0].code, 'S-08')

  const pitfalls = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'pitfall',
    searchQuery: ''
  })
  assert.equal(pitfalls.length, 6)

  const marquee = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'loop',
    searchQuery: 'MARQUEE'
  })
  assert.equal(marquee.length, 1)
  assert.equal(marquee[0].id, 'M-13')

  const byMobileTipMotion = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'all',
    searchQuery: 'tabular-nums'
  })
  assert.equal(byMobileTipMotion.length, 1)
  assert.equal(byMobileTipMotion[0].id, 'M-12')

  const byMobileTipPitfall = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'all',
    searchQuery: 'cubic-bezier'
  })
  assert.ok(byMobileTipPitfall.some((item) => item.id === 'P-01'))
})

test('buildCodexPrompt outputs ordered floors with bound motions, unbound motions, and pitfall rules', () => {
  const output = buildCodexPrompt({
    pageTarget: '/features/ai-agents',
    floorOrder: ['S-01', 'S-02'],
    floorMotionMap: { 'S-01': 'M-04', 'S-02': '' },
    selectedIds: ['S-01', 'S-02', 'M-04', 'M-05', 'P-06'],
    itemsById: ITEMS_BY_ID
  })
  assert.match(output, /我想用官网 Harness 为 \/features\/ai-agents 配置以下版式与动效：/)
  assert.match(output, /【一、整页楼层版式与动效编排（按从上到下顺序）】/)
  assert.match(output, /第 1 屏【S-01 左文右图首屏（Hero）】/)
  assert.match(output, /本屏搭配动效「打字机 \/ 逐词切换/)
  assert.match(output, /第 2 屏【S-02 三栏痛点 \/ 价值卡片】/)
  assert.match(output, /【补充交互动效】[\s\S]*悬停微浮 \+ 投影/)
  assert.doesNotMatch(output.split('【补充交互动效】')[1], /打字机 \/ 逐词切换/)
  assert.match(output, /【响应式与动效克制要求】/)
  assert.match(output, /0\.25～0\.45 秒/)

  const motionsOnly = buildCodexPrompt({
    pageTarget: '',
    floorOrder: [],
    floorMotionMap: {},
    selectedIds: ['M-01'],
    itemsById: ITEMS_BY_ID
  })
  assert.match(motionsOnly, /【页面链接或页面名称】/)
  assert.match(motionsOnly, /【搭配交互动效】/)
  assert.match(motionsOnly, /淡入上浮/)
})

test('useCatalogStore manages selection, floor ordering, motion bindings, presets, and reactive prompt in Node', () => {
  const store = useCatalogStore()
  store.clearSelection()
  store.setCategory('all')
  store.searchQuery.value = ''
  store.pageTarget.value = ''

  assert.equal(store.filteredItems.value.length, 34)

  // Toggle layouts and check floorOrder sync
  store.addFloor('S-01')
  store.toggleSelect('S-02')
  assert.deepEqual(store.floorOrder.value, ['S-01', 'S-02'])

  // Reorder floors
  store.moveFloorUp('S-02')
  assert.deepEqual(store.floorOrder.value, ['S-02', 'S-01'])
  store.moveFloorDown('S-02')
  assert.deepEqual(store.floorOrder.value, ['S-01', 'S-02'])

  // Bind motion auto-adds motion to selectedIds
  store.setFloorMotion('S-01', 'M-03')
  assert.equal(store.floorMotionMap['S-01'], 'M-03')
  assert.ok(store.selectedIds.value.includes('M-03'))
  assert.equal(store.selectedMotionCount.value, 1)

  // Removing bound motion clears floorMotionMap binding
  store.toggleSelect('M-03')
  assert.equal(store.selectedIds.value.includes('M-03'), false)
  assert.equal(store.floorMotionMap['S-01'] || '', '')

  // Apply preset replaces state cleanly
  store.applyPreset('standard-feature')
  assert.deepEqual(store.floorOrder.value, ['S-01', 'S-02', 'S-03', 'S-14', 'S-06'])
  assert.equal(store.floorMotionMap['S-01'], 'M-01')
  assert.ok(store.selectedIds.value.includes('P-04'))
  assert.match(store.generatedPrompt.value, /第 1 屏【S-01 左文右图首屏（Hero）】/)

  // Speed, drawer, viewport actions work safely without DOM
  const prevTick = store.replayTick.value
  store.setSpeed('0.5s')
  assert.equal(store.speed.value, '0.5s')
  assert.equal(store.replayTick.value, prevTick + 1)

  store.openDrawer()
  assert.equal(store.isDrawerOpen.value, true)
  store.setPreviewViewport('mobile')
  assert.equal(store.previewViewport.value, 'mobile')
  store.closeDrawer()
  assert.equal(store.isDrawerOpen.value, false)

  store.clearSelection()
  assert.equal(store.selectedIds.value.length, 0)
  assert.equal(store.floorOrder.value.length, 0)
})
