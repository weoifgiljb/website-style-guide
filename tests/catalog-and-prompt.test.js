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
import {
  COMPETITOR_SECTION_OPTIONS,
  COMPETITOR_TRIGGER_OPTIONS,
  COMPETITOR_VISUAL_OPTIONS,
  buildCodexPrompt,
  buildCompetitorInspectPrompt,
  buildPresetPrompt,
  filterCatalogItems
} from '../src/utils/promptBuilder.js'
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

test('catalog registers exactly 37 items across 6 content categories with dual-layer parameterized prompts', () => {
  assert.equal(LAYOUT_ITEMS.length, 14)
  assert.equal(MOTION_ITEMS.length, 17)
  assert.equal(PITFALL_ITEMS.length, 6)
  assert.equal(ALL_ITEMS.length, 37)

  const counts = ALL_ITEMS.reduce((acc, item) => {
    acc[item.cat] = (acc[item.cat] || 0) + 1
    return acc
  }, {})
  assert.deepEqual(counts, {
    style: 14,
    enter: 5,
    hover: 5,
    scroll: 3,
    loop: 4,
    pitfall: 6
  })

  for (const item of ALL_ITEMS) {
    for (const field of REQUIRED_FIELDS) {
      assert.equal(typeof item[field], 'string', `${item.id} missing string field ${field}`)
      assert.ok(item[field].trim().length > 0, `${item.id} has empty field ${field}`)
    }
    assert.equal(ITEMS_BY_ID[item.id], item)
  }

  // Verify every motion item has concise shortPrompt for humans and detailed engineering prompt for AI
  for (const motion of MOTION_ITEMS) {
    assert.ok(
      motion.prompt.length > motion.shortPrompt.length,
      `${motion.id} prompt should carry fuller engineering parameters than shortPrompt`
    )
    assert.match(
      motion.prompt,
      /\d+(\.\d+)?(ms|s|px|%)/,
      `${motion.id} prompt must specify concrete numeric parameters (ms/s/px/%)`
    )
  }

  assert.deepEqual(
    CATEGORIES.map((c) => c.id),
    ['all', 'style', 'enter', 'hover', 'scroll', 'loop', 'pitfall']
  )
  assert.equal(PAGE_PRESETS.length, 4)

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
    ['M-15', 'MotionAutoProgressTabs'],
    ['M-16', 'MotionChannelFlow'],
    ['M-17', 'MotionChatStream'],
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

test('every preset references valid layout, motion, and extra IDs and builds full preset prompt', () => {
  assert.deepEqual(
    PAGE_PRESETS.map((p) => p.id),
    ['standard-feature', 'saas-ai-flagship', 'comparison-landing', 'flagship-showcase']
  )
  for (const preset of PAGE_PRESETS) {
    assert.ok(preset.floors.length >= 5)
    assert.ok(typeof preset.tag === 'string' && preset.tag.length > 0)
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

    const presetPrompt = buildPresetPrompt({
      preset,
      pageTarget: '/features/omni-channel',
      itemsById: ITEMS_BY_ID
    })
    assert.match(presetPrompt, /\/features\/omni-channel/)
    assert.match(presetPrompt, /第 1 屏/)
  }
})

test('filterCatalogItems filters by category and case-insensitive keyword across metadata including competitor keywords', () => {
  const s08 = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'all',
    searchQuery: 'bento'
  })
  assert.equal(s08.length, 1)
  assert.equal(s08[0].code, 'S-08')

  const intercomMatches = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'all',
    searchQuery: 'intercom'
  })
  assert.ok(intercomMatches.some((item) => item.id === 'M-15'))
  assert.ok(intercomMatches.some((item) => item.id === 'M-17'))

  const respondMatches = filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: 'loop',
    searchQuery: 'respond'
  })
  assert.equal(respondMatches.length, 1)
  assert.equal(respondMatches[0].id, 'M-16')

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

test('buildCompetitorInspectPrompt supports unknown indie website URL + anchorText sampling and screenshot fallback', () => {
  const urlModePrompt = buildCompetitorInspectPrompt({
    sourceMode: 'url',
    competitorUrl: 'https://some-indie-studio.io/product',
    anchorText: 'Instant global payouts',
    targetPage: '/features/ai-agents',
    sectionArea: 'feature-demo',
    triggers: ['scroll-scrub'],
    visualFocus: ['pin-swap'],
    extraNote: '只要它的阻尼滚动手感，改成官网浅色'
  })

  assert.match(urlModePrompt, /https:\/\/some-indie-studio\.io\/product/)
  assert.match(urlModePrompt, /区块原文定位词（零误差锚点）：「Instant global payouts」/)
  assert.match(urlModePrompt, /getAnimations\(\{ subtree: true \}\)/)
  assert.match(urlModePrompt, /连续采集 3 帧截图/)
  assert.match(urlModePrompt, /WebGL \/ Three\.js \/ Lottie/)
  assert.match(urlModePrompt, /《中文动效规格确认单》/)
  assert.match(urlModePrompt, /390px 手机端/)

  const screenshotPrompt = buildCompetitorInspectPrompt({
    sourceMode: 'screenshots',
    targetPage: '/pricing',
    sectionArea: 'hero',
    triggers: ['hover-react'],
    visualFocus: ['spotlight-glow']
  })
  assert.match(screenshotPrompt, /多帧视觉差值拆解/)
  assert.match(screenshotPrompt, /2～3 张连续关键帧截图/)

  for (const sec of COMPETITOR_SECTION_OPTIONS) {
    assert.ok(sec.shortLabel && sec.anim && sec.whereTag && sec.tip, `section ${sec.id} missing hover tooltip fields`)
  }
  for (const opt of [...COMPETITOR_TRIGGER_OPTIONS, ...COMPETITOR_VISUAL_OPTIONS]) {
    assert.ok(opt.shortLabel && opt.anim && opt.tip, `option ${opt.id} missing hover tooltip fields`)
  }
})

test('buildCodexPrompt outputs ordered floors, bound/unbound motions, optional external competitor ref, and pitfall rules', () => {
  const output = buildCodexPrompt({
    pageTarget: '/features/ai-agents',
    floorOrder: ['S-01', 'S-02'],
    floorMotionMap: { 'S-01': 'M-04', 'S-02': '' },
    selectedIds: ['S-01', 'S-02', 'M-04', 'M-05', 'P-06'],
    itemsById: ITEMS_BY_ID,
    competitorRef: {
      sourceMode: 'url',
      competitorUrl: 'https://attio.com',
      anchorText: 'Customer intelligence',
      sectionArea: 'bento-cards',
      triggers: ['hover-react'],
      visualFocus: ['spotlight-glow']
    }
  })
  assert.match(output, /我想用官网 Harness 为 \/features\/ai-agents 配置以下版式与动效：/)
  assert.match(output, /【一、整页楼层版式与动效编排（按从上到下顺序）】/)
  assert.match(output, /第 1 屏【S-01 左文右图首屏（Hero）】/)
  assert.match(output, /本屏搭配动效「打字机 \/ 逐词切换/)
  assert.match(output, /第 2 屏【S-02 三栏痛点 \/ 价值卡片】/)
  assert.match(output, /【补充交互动效】[\s\S]*悬停微浮 \+ 投影/)
  assert.doesNotMatch(output.split('【补充交互动效】')[1], /打字机 \/ 逐词切换/)
  assert.match(output, /【外部网站交互参考与浏览器动态取证要求】/)
  assert.match(output, /https:\/\/attio\.com/)
  assert.match(output, /Customer intelligence/)
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

test('useCatalogStore manages selection, presets, competitor modal & attachment, and reactive prompt in Node', () => {
  const store = useCatalogStore()
  store.clearSelection()
  store.setCategory('all')
  store.searchQuery.value = ''
  store.pageTarget.value = ''

  assert.equal(store.filteredItems.value.length, 37)

  store.addFloor('S-01')
  store.toggleSelect('S-02')
  assert.deepEqual(store.floorOrder.value, ['S-01', 'S-02'])

  store.moveFloorUp('S-02')
  assert.deepEqual(store.floorOrder.value, ['S-02', 'S-01'])
  store.moveFloorDown('S-02')
  assert.deepEqual(store.floorOrder.value, ['S-01', 'S-02'])

  store.setFloorMotion('S-01', 'M-17')
  assert.equal(store.floorMotionMap['S-01'], 'M-17')
  assert.ok(store.selectedIds.value.includes('M-17'))
  assert.equal(store.selectedMotionCount.value, 1)

  store.toggleSelect('M-17')
  assert.equal(store.selectedIds.value.includes('M-17'), false)
  assert.equal(store.floorMotionMap['S-01'] || '', '')

  store.applyPreset('saas-ai-flagship')
  assert.deepEqual(store.floorOrder.value, ['S-01', 'S-04', 'S-13', 'S-05', 'S-06'])
  assert.equal(store.floorMotionMap['S-01'], 'M-17')
  assert.equal(store.floorMotionMap['S-04'], 'M-16')
  assert.equal(store.floorMotionMap['S-13'], 'M-15')

  // Multi-select motions on a single floor + prompt formatting
  store.toggleFloorMotion('S-01', 'M-01')
  store.toggleFloorMotion('S-01', 'M-06')
  assert.deepEqual(store.getFloorMotions('S-01'), ['M-17', 'M-01', 'M-06'])
  assert.match(store.generatedPrompt.value, /本屏组合搭配 3 项动效/)
  store.toggleFloorMotion('S-01', 'M-06')
  assert.deepEqual(store.getFloorMotions('S-01'), ['M-17', 'M-01'])
  store.clearFloorMotions('S-01')
  assert.deepEqual(store.getFloorMotions('S-01'), [])

  // Competitor modal & blueprint attachment flow
  store.openCompetitorModal()
  assert.equal(store.isCompetitorModalOpen.value, true)
  store.competitorDraft.competitorUrl = 'https://fin.ai'
  store.competitorDraft.anchorText = 'Resolve complex queries'
  store.competitorDraft.targetPage = '/features/ai-agents'
  assert.match(store.competitorInspectPrompt.value, /https:\/\/fin\.ai/)

  store.attachCompetitorToBlueprint()
  assert.equal(store.isCompetitorModalOpen.value, false)
  assert.equal(store.isDrawerOpen.value, true)
  assert.equal(store.pageTarget.value, '/features/ai-agents')
  assert.match(store.generatedPrompt.value, /【外部网站交互参考与浏览器动态取证要求】/)
  assert.match(store.generatedPrompt.value, /Resolve complex queries/)

  store.clearCompetitorRef()
  assert.equal(store.attachedCompetitorRef.value, null)
  assert.doesNotMatch(store.generatedPrompt.value, /【外部网站交互参考与浏览器动态取证要求】/)

  store.closeDrawer()
  store.clearSelection()
  assert.equal(store.selectedIds.value.length, 0)
  assert.equal(store.floorOrder.value.length, 0)
})

test('removing preset or dropdown-bound floors cleans up auto-attached motions while preserving manually picked motions', () => {
  const store = useCatalogStore()
  store.clearSelection()

  store.applyPreset('standard-feature')
  assert.equal(store.floorOrder.value.length, 5)

  store.removeItem('S-01')
  assert.equal(store.selectedIds.value.includes('M-01'), false)

  for (const id of [...store.floorOrder.value]) {
    store.removeItem(id)
  }
  assert.deepEqual(store.floorOrder.value, [])
  assert.deepEqual(store.selectedIds.value, [])

  store.toggleSelect('M-05')
  store.addFloor('S-01')
  store.setFloorMotion('S-01', 'M-02')
  assert.equal(store.selectedIds.value.includes('M-02'), true)

  store.setFloorMotion('S-01', 'M-05')
  assert.equal(store.selectedIds.value.includes('M-02'), false)
  assert.equal(store.selectedIds.value.includes('M-05'), true)

  store.removeItem('S-01')
  assert.deepEqual(store.selectedIds.value, ['M-05'])

  store.clearSelection()
})
