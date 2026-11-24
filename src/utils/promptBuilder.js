const BASELINE_RULE =
  '配色、字体与间距保持 SaleSmartly 官网现有规范，常规交互动效时长控制在 0.25～0.45 秒、整体克制流畅；手机端（390px）自动转为单列简化布局，避免悬浮元素遮挡和大幅晃动。先确认方案再改代码。'

export const COMPETITOR_SECTION_OPTIONS = [
  {
    id: 'hero',
    shortLabel: '首屏',
    anim: 'sec-hero',
    whereTag: '网页最顶部 · 第 1 屏',
    tip: '刚打开网页不用往下滚，第一眼看到的大标题 + 按钮 + 主图区',
    label: '首屏主视觉（Hero）'
  },
  {
    id: 'feature-demo',
    shortLabel: '功能演示区',
    anim: 'sec-feature',
    whereTag: '首屏往下 · 第 2～3 屏',
    tip: '一边写功能卖点、一边放大张产品界面图的左右图文区',
    label: '中段核心功能演示区'
  },
  {
    id: 'bento-cards',
    shortLabel: '多栏卡片区',
    anim: 'sec-bento',
    whereTag: '网页中段 · 卡片格子区',
    tip: '三四张小卡片并排或拼成方格，每张卡讲一个功能亮点',
    label: 'Bento 卡片 / 多栏卖点区'
  },
  {
    id: 'flow-diagram',
    shortLabel: '连线架构图',
    anim: 'sec-flow',
    whereTag: '网页中段 · 关系图解区',
    tip: '画着多个渠道小图标，用线条或箭头连向中间系统的示意图',
    label: '连线流转 / 架构图解区'
  },
  {
    id: 'tabs-accordion',
    shortLabel: 'Tab / 问答区',
    anim: 'sec-tabs',
    whereTag: '网页中后段 / 靠底部',
    tip: '点一排标签切换内容，或网页下方点问题展开答案的 FAQ 区',
    label: 'Tab 轮播 / 折叠问答区'
  },
  {
    id: 'other',
    shortLabel: '其他位置',
    anim: 'sec-other',
    whereTag: '网页任意位置',
    tip: '拿不准叫啥选它就行！只要填上方一句原文词，AI 会自动找准',
    label: '其他自定义模块'
  }
]

export const COMPETITOR_TRIGGER_OPTIONS = [
  {
    id: 'scroll-enter',
    shortLabel: '滚到浮现',
    anim: 'scroll-enter',
    tip: '滚到这一屏时，元素自动淡入上浮一次',
    label: '滚到这里自动播放一次'
  },
  {
    id: 'scroll-scrub',
    shortLabel: '边滚边动',
    anim: 'scroll-scrub',
    tip: '画面随滚轮上下进度实时联动推进',
    label: '边往下滚，画面边跟着固定/切换'
  },
  {
    id: 'hover-react',
    shortLabel: '悬停反馈',
    anim: 'hover-react',
    tip: '鼠标移上去时卡片上浮、发光或跟随',
    label: '鼠标移上去跟随/微浮/高亮'
  },
  {
    id: 'auto-progress',
    shortLabel: '读条轮播',
    anim: 'auto-progress',
    tip: '进度条读满自动切下一项，也可手点',
    label: '带进度条自动轮播（也可手点）'
  },
  {
    id: 'click-switch',
    shortLabel: '点击切换',
    anim: 'click-switch',
    tip: '点击 Tab 或按钮后滑块与内容平滑过渡',
    label: '点击按钮或标签后平滑切换'
  },
  {
    id: 'loop-pulse',
    shortLabel: '持续流动',
    anim: 'loop-pulse',
    tip: '无需操作，匀速跑马灯或柔和呼吸循环',
    label: '一直在克制循环流动/脉冲'
  }
]

export const COMPETITOR_VISUAL_OPTIONS = [
  {
    id: 'pin-swap',
    shortLabel: '左定右切',
    anim: 'pin-swap',
    tip: '一侧文字固定不动，另一侧配图平滑切换',
    label: '一侧固定，另一侧配图/卡片切换'
  },
  {
    id: 'stagger-stream',
    shortLabel: '依次弹出',
    anim: 'stagger-stream',
    tip: '多个气泡或卡片按时间差错峰冒出来',
    label: '气泡/卡片按时间轴依次流式弹出'
  },
  {
    id: 'path-pulse',
    shortLabel: '连线流光',
    anim: 'path-pulse',
    tip: '光束顺着连线流动，依次点亮目标节点',
    label: '线条流光汇聚并依次点亮节点'
  },
  {
    id: 'spotlight-glow',
    shortLabel: '边框扫光',
    anim: 'spotlight-glow',
    tip: '按钮或卡片边框掠过一束柔和品牌高光',
    label: '局部边框发光 / 聚光灯扫光'
  },
  {
    id: 'smooth-expand',
    shortLabel: '丝滑展开',
    anim: 'smooth-expand',
    tip: '折叠区柔顺推开高度，不生硬闪现跳动',
    label: '高度平滑展开收起不闪跳'
  },
  {
    id: 'number-bar',
    shortLabel: '数字递增',
    anim: 'number-bar',
    tip: '核心数据从 0 快速滚动递增到目标值',
    label: '数字递增或进度条读秒推进'
  }
]

export const MOTION_TOOLTIP_ANIM_MAP = {
  'M-01': 'scroll-enter',
  'M-02': 'card-stagger',
  'M-03': 'zoom-pop',
  'M-04': 'text-rotate',
  'M-05': 'hover-react',
  'M-06': 'spotlight-glow',
  'M-07': 'img-zoom',
  'M-08': 'smooth-expand',
  'M-09': 'click-switch',
  'M-10': 'pin-swap',
  'M-11': 'scroll-scrub',
  'M-12': 'number-bar',
  'M-13': 'loop-pulse',
  'M-14': 'float-pulse',
  'M-15': 'auto-progress',
  'M-16': 'path-pulse',
  'M-17': 'stagger-stream'
}

function normalizeFloorMotionIds(rawValue) {
  if (Array.isArray(rawValue)) {
    return rawValue.filter(Boolean)
  }
  if (typeof rawValue === 'string' && rawValue.trim()) {
    return [rawValue.trim()]
  }
  return []
}
function stripTrailingPeriod(text = '') {
  return String(text).trim().replace(/[。.]$/, '')
}

function resolveOptionLabels(ids = [], options = []) {
  const map = new Map(options.map((opt) => [opt.id, opt.label]))
  return (Array.isArray(ids) ? ids : [])
    .map((id) => map.get(id) || id)
    .filter(Boolean)
}

export function filterCatalogItems({ items = [], activeCategory = 'all', searchQuery = '' } = {}) {
  const cat = activeCategory || 'all'
  const query = String(searchQuery || '').trim().toLowerCase()

  return items.filter((item) => {
    const catMatch = cat === 'all' || item.cat === cat
    if (!catMatch) return false
    if (!query) return true

    const haystack = [item.code, item.name, item.en, item.keywords, item.scene, item.mobileTip]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
}

export function buildCompetitorInspectPrompt(config = {}) {
  const {
    sourceMode = 'url',
    competitorUrl = '',
    anchorText = '',
    targetPage = '',
    sectionArea = 'feature-demo',
    triggers = [],
    visualFocus = [],
    extraNote = '',
    embedded = false
  } = config

  const cleanUrl = String(competitorUrl || '').trim() || '【请填入参考网页 URL】'
  const cleanAnchor = String(anchorText || '').trim()
  const cleanTarget = String(targetPage || '').trim() || '【目标官网页面路径或名称】'
  const cleanNote = String(extraNote || '').trim()

  const sectionLabel =
    COMPETITOR_SECTION_OPTIONS.find((item) => item.id === sectionArea)?.label ||
    sectionArea ||
    '中段核心功能演示区'

  const triggerLabels = resolveOptionLabels(triggers, COMPETITOR_TRIGGER_OPTIONS)
  const visualLabels = resolveOptionLabels(visualFocus, COMPETITOR_VISUAL_OPTIONS)

  const lines = []

  if (!embedded) {
    lines.push(
      `我想为官网 ${cleanTarget} 借鉴一个外部网站的优秀交互动效，请严格按以下「先现场取证描述 -> 等我确认 -> 再按官网规范写代码」三步执行：`
    )
    lines.push('')
  }

  lines.push('【外部参考线索】')
  if (sourceMode === 'screenshots') {
    lines.push('- 参考来源：我将随本消息附上 2～3 张连续关键帧截图（动之前 / 运动中 / 落位后）或录屏帧')
  } else {
    lines.push(`- 参考网址：${cleanUrl}`)
  }
  lines.push(`- 所在区域：${sectionLabel}`)
  if (cleanAnchor) {
    lines.push(
      `- 区块原文定位词（零误差锚点）：「${cleanAnchor}」（请直接在页面通过该文本节点反查父级 <section> 容器，严禁盲猜楼层）`
    )
  }
  if (triggerLabels.length > 0) {
    lines.push(`- 我看到的触发体感：${triggerLabels.join('、')}`)
  }
  if (visualLabels.length > 0) {
    lines.push(`- 重点关注的画面变化：${visualLabels.join('、')}`)
  }
  if (cleanNote) {
    lines.push(`- 补充说明：${stripTrailingPeriod(cleanNote)}`)
  }

  lines.push('')
  if (sourceMode === 'screenshots') {
    lines.push('【第一步：多帧视觉差值拆解（先不要改任何代码）】')
    lines.push(
      '1. 对比我提供的「初始态 → 过程态 → 结束态」连续截图，逐一识别哪些容器保持固定不动、哪些子元素发生了位移（px/%）、缩放（scale）、透明度（opacity）或高亮边框变化。'
    )
  } else {
    lines.push('【第一步：浏览器动态多帧采样取证（严禁只截一张静态图瞎猜，先不要改代码）】')
    lines.push(
      cleanAnchor
        ? `1. 请调用内置浏览器打开 ${cleanUrl}，通过文本「${cleanAnchor}」精准锁定目标 DOM 区块容器。`
        : `1. 请调用内置浏览器打开 ${cleanUrl}，滚动定位到「${sectionLabel}」对应的目标 DOM 区块容器。`
    )
    lines.push(
      '2. 在页面真实触发对应交互（滚入视口 / 连续滚动推进 / 鼠标 hover / 点击），在「动作前、动作进行中（约 150ms）、动作落位后」连续采集 3 帧截图，并在浏览器上下文执行 container.getAnimations({ subtree: true }) 以及前后帧 getBoundingClientRect() / getComputedStyle 与内联 style 采样，提取真实的 transform（translate3d/scale/rotate）、opacity、clip-path 轨迹（兼容 Framer Motion / GSAP 等 JS 动效）。'
    )
  }

  lines.push(
    '3. 若检测到原站该效果依赖 WebGL / Three.js / Lottie 或预渲染视频，必须如实说明实现介质，并主动给出适合 SaleSmartly 官网 SSG 静态导出的 CSS / SVG 轻量平替方案。'
  )

  lines.push('')
  lines.push('【第二步：先输出 5 项量化《中文动效规格确认单》等我确认】')
  lines.push('请用通俗中文加精确参数按以下 5 点向我汇报，确认无误前不要写业务代码：')
  lines.push('① 触发机制与阈值（如滚入视口 15% 触发一次 / 随滚动进度联动 / hover / 几秒自动轮播）；')
  lines.push('② 静止层 vs 运动层的具体变化值（精确到位移 px、缩放比例、透明度或进度条宽度）；')
  lines.push('③ 持续时长（ms）与缓动曲线（cubic-bezier 阻尼感）；')
  lines.push('④ 交互暂停或手动点击打断重置逻辑；')
  lines.push('⑤ 放到咱们官网 390px 手机端的简化降级方案（防挤压、防悬浮遮挡）。')

  if (!embedded) {
    lines.push('')
    lines.push('【第三步：我回复确认后，按官网规范受控落地】')
    lines.push(
      `- 仅复刻确认后的交互骨架与运动节奏；${BASELINE_RULE}`
    )
  }

  return lines.join('\n')
}

export function buildCodexPrompt({
  pageTarget = '',
  floorOrder = [],
  floorMotionMap = {},
  selectedIds = [],
  itemsById = {},
  competitorRef = null
} = {}) {
  const targetLabel = String(pageTarget || '').trim() || '【页面链接或页面名称】'
  const lines = [`我想用官网 Harness 为 ${targetLabel} 配置以下版式与动效：`]

  const activeFloors = floorOrder.filter((id) => {
    const item = itemsById[id]
    return item && item.kind === 'style'
  })

  const boundMotionIds = new Set()

  if (activeFloors.length > 0) {
    lines.push('')
    lines.push('【一、整页楼层版式与动效编排（按从上到下顺序）】')
    activeFloors.forEach((layoutId, idx) => {
      const layout = itemsById[layoutId]
      const rawFloorMotions = floorMotionMap ? floorMotionMap[layoutId] : ''
      const motions = normalizeFloorMotionIds(rawFloorMotions)
        .map((mId) => itemsById[mId])
        .filter((item) => item && item.kind === 'motion')

      let floorLine = `第 ${idx + 1} 屏【${layout.code} ${layout.name}】：${stripTrailingPeriod(layout.prompt)}。`
      if (motions.length === 1) {
        const motion = motions[0]
        boundMotionIds.add(motion.id)
        floorLine += `（本屏搭配动效「${motion.name}（${motion.en}）」：${stripTrailingPeriod(motion.prompt)}。）`
      } else if (motions.length > 1) {
        const joined = motions
          .map((motion, mIdx) => {
            boundMotionIds.add(motion.id)
            return `${mIdx + 1})「${motion.name}（${motion.en}）」：${stripTrailingPeriod(motion.prompt)}`
          })
          .join('；')
        floorLine += `（本屏组合搭配 ${motions.length} 项动效：${joined}。）`
      }
      lines.push(floorLine)
    })
  }

  const unboundMotions = selectedIds
    .map((id) => itemsById[id])
    .filter((item) => item && item.kind === 'motion' && !boundMotionIds.has(item.id))

  if (unboundMotions.length > 0) {
    lines.push('')
    lines.push(activeFloors.length > 0 ? '【补充交互动效】' : '【搭配交互动效】')
    unboundMotions.forEach((motion, idx) => {
      lines.push(
        `${idx + 1}. 【填写对应区块】使用「${motion.name}（${motion.en}）」：${stripTrailingPeriod(motion.prompt)}。`
      )
    })
  }

  const hasValidCompetitorRef =
    competitorRef &&
    (competitorRef.sourceMode === 'screenshots' ||
      String(competitorRef.competitorUrl || '').trim().length > 0 ||
      String(competitorRef.anchorText || '').trim().length > 0)

  if (hasValidCompetitorRef) {
    lines.push('')
    lines.push('【外部网站交互参考与浏览器动态取证要求】')
    lines.push(
      buildCompetitorInspectPrompt({
        ...competitorRef,
        targetPage: pageTarget,
        embedded: true
      })
    )
  }

  const selectedPitfalls = selectedIds
    .map((id) => itemsById[id])
    .filter((item) => item && item.kind === 'pitfall')

  lines.push('')
  lines.push('【响应式与动效克制要求】')
  selectedPitfalls.forEach((pitfall) => {
    lines.push(`- [${pitfall.code} ${pitfall.name}]：${stripTrailingPeriod(pitfall.prompt)}。`)
  })
  lines.push(`- ${BASELINE_RULE}`)

  return lines.join('\n')
}

export function buildPresetPrompt({ preset, pageTarget = '', itemsById = {} } = {}) {
  if (!preset || !Array.isArray(preset.floors)) return ''
  const floorOrder = []
  const floorMotionMap = {}
  const selectedIds = []

  preset.floors.forEach(({ layoutId, motionId }) => {
    if (layoutId && itemsById[layoutId]) {
      if (!floorOrder.includes(layoutId)) floorOrder.push(layoutId)
      if (!selectedIds.includes(layoutId)) selectedIds.push(layoutId)
      if (motionId && itemsById[motionId]) {
        floorMotionMap[layoutId] = motionId
        if (!selectedIds.includes(motionId)) selectedIds.push(motionId)
      }
    }
  })

  ;(preset.extraIds || []).forEach((id) => {
    if (itemsById[id] && !selectedIds.includes(id)) {
      selectedIds.push(id)
    }
  })

  return buildCodexPrompt({
    pageTarget,
    floorOrder,
    floorMotionMap,
    selectedIds,
    itemsById
  })
}
