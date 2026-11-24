import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ALL_ITEMS,
  ITEMS_BY_ID,
  CATEGORIES,
  PAGE_PRESETS,
  LAYOUT_ITEMS,
  SECTION_LAYOUT_ITEMS,
  PRIMITIVE_ITEMS,
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
  'normalPath',
  'keywords',
  'scene',
  'mobileTip',
  'prompt',
  'shortPrompt'
]

test('catalog registers 38 items aligned 1-to-1 with www main branch src/components/normal/', () => {
  assert.equal(SECTION_LAYOUT_ITEMS.length, 15)
  assert.equal(PRIMITIVE_ITEMS.length, 3)
  assert.equal(LAYOUT_ITEMS.length, 18)
  assert.equal(MOTION_ITEMS.length, 14)
  assert.equal(PITFALL_ITEMS.length, 6)
  assert.equal(ALL_ITEMS.length, 38)

  const counts = ALL_ITEMS.reduce((acc, item) => {
    acc[item.cat] = (acc[item.cat] || 0) + 1
    return acc
  }, {})
  assert.deepEqual(counts, {
    style: 15,
    primitive: 3,
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
    assert.match(
      item.normalPath,
      /^src\/components\/normal\/[A-Za-z0-9_-]+\.js/,
      `${item.id} normalPath must point to src/components/normal/*.js`
    )
    assert.equal(ITEMS_BY_ID[item.id], item)
  }

  // Every N-01..N-18 prompt must explicitly mention its real normal component
  for (const item of LAYOUT_ITEMS) {
    assert.match(
      item.prompt,
      /src\/components\/normal\/[A-Za-z0-9_-]+\.js/,
      `${item.id} prompt must reference exact src/components/normal/*.js path`
    )
  }

  assert.deepEqual(
    CATEGORIES.map((c) => c.id),
    ['all', 'style', 'primitive', 'enter', 'hover', 'scroll', 'loop', 'pitfall']
  )
  assert.equal(PAGE_PRESETS.length, 3)

  const expectedDemoKeys = [
    ['N-01', 'NormalN01SectionIntro'],
    ['N-02', 'NormalN02BrandWall'],
    ['N-03', 'NormalN03LogoCloud'],
    ['N-04', 'NormalN04MetricsCard'],
    ['N-05', 'NormalN05OpportunitySection'],
    ['N-06', 'NormalN06FeatureHighlight'],
    ['N-07', 'NormalN07JourneyCarousel'],
    ['N-08', 'NormalN08SolutionsSection'],
    ['N-09', 'NormalN09PartnerSection'],
    ['N-10', 'NormalN10ArticleSection'],
    ['N-11', 'NormalN11TestimonialSection'],
    ['N-12', 'NormalN12Table'],
    ['N-13', 'NormalN13FaqSection'],
    ['N-14', 'NormalN14FinalCtaSection'],
    ['N-15', 'NormalN15CtaSection'],
    ['N-16', 'NormalN16CtaButtons'],
    ['N-17', 'NormalN17NavLinks'],
    ['N-18', 'NormalN18IconBadges'],
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

test('every preset references valid normal section layouts, motions, and extra IDs', () => {
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

test('filterCatalogItems filters by category, normalPath component name, and keywords', () => {
  const opp = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'all',
    searchQuery: 'OpportunitySection'
  })
  assert.ok(opp.some((item) => item.id === 'N-05'))

  const primitives = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'primitive',
    searchQuery: ''
  })
  assert.equal(primitives.length, 3)

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

test('buildCodexPrompt outputs ordered normal floors with file paths, primitives, motions, and pitfall rules', () => {
  const output = buildCodexPrompt({
    pageTarget: '/features/ai-agents',
    floorOrder: ['N-06', 'N-05'],
    floorMotionMap: { 'N-06': 'M-04', 'N-05': '' },
    selectedIds: ['N-06', 'N-05', 'N-16', 'M-04', 'M-05', 'P-06'],
    itemsById: ITEMS_BY_ID
  })
  assert.match(output, /我想用官网 Harness 为 \/features\/ai-agents 配置以下版式与动效：/)
  assert.match(output, /第 1 屏【N-06 左右图文高亮讲解横幅｜复用 src\/components\/normal\/FeatureHighlightBanner\.js】/)
  assert.match(output, /本屏搭配动效「打字机 \/ 逐词切换/)
  assert.match(output, /第 2 屏【N-05 三栏机会 \/ 核心价值卡片区｜复用 src\/components\/normal\/OpportunitySection\.js】/)
  assert.match(output, /【配套复用的 normal 基础子组件】[\s\S]*src\/components\/normal\/CtaGroup\.js/)
  assert.match(output, /【补充交互动效】[\s\S]*悬停微浮 \+ 投影/)
  assert.doesNotMatch(output.split('【补充交互动效】')[1], /打字机 \/ 逐词切换/)
  assert.match(output, /【响应式与动效克制要求】/)

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

test('useCatalogStore manages normal floors, primitives, motion bindings, presets, and viewport in Node', () => {
  const store = useCatalogStore()
  store.clearSelection()
  store.setCategory('all')
  store.searchQuery.value = ''
  store.pageTarget.value = ''

  assert.equal(store.filteredItems.value.length, 38)

  // Toggle layouts and check floorOrder sync (primitives do not enter floorOrder)
  store.addFloor('N-06')
  store.toggleSelect('N-05')
  store.toggleSelect('N-16')
  assert.deepEqual(store.floorOrder.value, ['N-06', 'N-05'])
  assert.equal(store.selectedPrimitiveCount.value, 1)

  // Reorder floors
  store.moveFloorUp('N-05')
  assert.deepEqual(store.floorOrder.value, ['N-05', 'N-06'])
  store.moveFloorDown('N-05')
  assert.deepEqual(store.floorOrder.value, ['N-06', 'N-05'])

  // Bind motion auto-adds motion to selectedIds
  store.setFloorMotion('N-06', 'M-03')
  assert.equal(store.floorMotionMap['N-06'], 'M-03')
  assert.ok(store.selectedIds.value.includes('M-03'))
  assert.equal(store.selectedMotionCount.value, 1)

  // Removing bound motion clears floorMotionMap binding
  store.toggleSelect('M-03')
  assert.equal(store.selectedIds.value.includes('M-03'), false)
  assert.equal(store.floorMotionMap['N-06'] || '', '')

  // Apply preset replaces state cleanly with real normal floors
  store.applyPreset('standard-feature')
  assert.deepEqual(store.floorOrder.value, ['N-04', 'N-06', 'N-05', 'N-09', 'N-10', 'N-13', 'N-11'])
  assert.equal(store.floorMotionMap['N-04'], 'M-12')
  assert.ok(store.selectedIds.value.includes('N-16'))
  assert.match(store.generatedPrompt.value, /src\/components\/normal\/MetricsCard\.js/)

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

  store.setCardViewport('mobile')
  assert.equal(store.cardViewport.value, 'mobile')
  store.setCardViewport('desktop')
  assert.equal(store.cardViewport.value, 'desktop')

  store.clearSelection()
  assert.equal(store.selectedIds.value.length, 0)
  assert.equal(store.floorOrder.value.length, 0)
})

test('removing preset or dropdown-bound floors cleans up auto-attached motions while preserving manually picked motions', () => {
  const store = useCatalogStore()
  store.clearSelection()

  store.applyPreset('standard-feature')
  assert.equal(store.floorOrder.value.length, 7)

  store.removeItem('N-04')
  assert.equal(store.selectedIds.value.includes('M-12'), false)

  for (const id of [...store.floorOrder.value]) {
    store.removeItem(id)
  }
  assert.deepEqual(store.floorOrder.value, [])
  assert.deepEqual(store.selectedIds.value, [])

  store.toggleSelect('M-05')
  store.addFloor('N-06')
  store.setFloorMotion('N-06', 'M-02')
  assert.equal(store.selectedIds.value.includes('M-02'), true)

  store.setFloorMotion('N-06', 'M-05')
  assert.equal(store.selectedIds.value.includes('M-02'), false)
  assert.equal(store.selectedIds.value.includes('M-05'), true)

  store.removeItem('N-06')
  assert.deepEqual(store.selectedIds.value, ['M-05'])

  store.clearSelection()
})
