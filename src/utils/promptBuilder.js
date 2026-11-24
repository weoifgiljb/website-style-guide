const BASELINE_RULE =
  '配色、字体与间距保持 SaleSmartly 官网现有规范，常规交互动效时长控制在 0.25～0.45 秒、整体克制流畅；手机端（390px）自动转为单列简化布局，避免悬浮元素遮挡和大幅晃动。先确认方案再改代码。'

function stripTrailingPeriod(text = '') {
  return String(text).trim().replace(/[。.]$/, '')
}

export function filterCatalogItems({ items = [], activeCategory = 'all', searchQuery = '' } = {}) {
  const cat = activeCategory || 'all'
  const query = String(searchQuery || '').trim().toLowerCase()

  return items.filter((item) => {
    const catMatch = cat === 'all' || item.cat === cat
    if (!catMatch) return false
    if (!query) return true

    const haystack = [
      item.code,
      item.name,
      item.en,
      item.normalPath,
      item.keywords,
      item.scene,
      item.mobileTip
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
}

export function buildCodexPrompt({
  pageTarget = '',
  floorOrder = [],
  floorMotionMap = {},
  selectedIds = [],
  itemsById = {}
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
    lines.push('【一、整页楼层版式与动效编排（复用 www main 分支 normal 组件）】')
    activeFloors.forEach((layoutId, idx) => {
      const layout = itemsById[layoutId]
      const motionId = floorMotionMap ? floorMotionMap[layoutId] : ''
      const motion =
        motionId && itemsById[motionId] && itemsById[motionId].kind === 'motion'
          ? itemsById[motionId]
          : null

      const pathSuffix = layout.normalPath ? `｜复用 ${layout.normalPath}` : ''
      let floorLine = `第 ${idx + 1} 屏【${layout.code} ${layout.name}${pathSuffix}】：${stripTrailingPeriod(layout.prompt)}。`
      if (motion) {
        boundMotionIds.add(motion.id)
        floorLine += `（本屏搭配动效「${motion.name}（${motion.en}）」：${stripTrailingPeriod(motion.prompt)}。）`
      }
      lines.push(floorLine)
    })
  }

  const selectedPrimitives = selectedIds
    .map((id) => itemsById[id])
    .filter((item) => item && item.kind === 'primitive')

  if (selectedPrimitives.length > 0) {
    lines.push('')
    lines.push('【配套复用的 normal 基础子组件】')
    selectedPrimitives.forEach((p) => {
      const pPath = p.normalPath ? `｜${p.normalPath}` : ''
      lines.push(`- [${p.code} ${p.name}${pPath}]：${stripTrailingPeriod(p.prompt)}。`)
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
