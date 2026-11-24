import { ref, reactive, computed } from 'vue'
import { ALL_ITEMS, ITEMS_BY_ID, PAGE_PRESETS } from '../data/index.js'
import {
  filterCatalogItems,
  buildCodexPrompt,
  buildCompetitorInspectPrompt
} from '../utils/promptBuilder.js'

const speed = ref('0.28s')
const replayTick = ref(0)
const activeCategory = ref('all')
const searchQuery = ref('')
const selectedIds = ref([])
const manualSelectedIds = new Set()
const floorOrder = ref([])
const floorMotionMap = reactive({})
const floorMotionsMap = reactive({})
const pageTarget = ref('')
const isDrawerOpen = ref(false)
const isCompetitorModalOpen = ref(false)
const previewViewport = ref('desktop')
const cardViewport = ref('desktop')
const cardViewportVersion = ref(0)
const toastMessage = ref('')
const toastVisible = ref(false)

const competitorDraft = reactive({
  sourceMode: 'url',
  competitorUrl: '',
  anchorText: '',
  targetPage: '',
  sectionArea: 'feature-demo',
  triggers: ['scroll-enter'],
  visualFocus: ['pin-swap'],
  extraNote: ''
})

const attachedCompetitorRef = ref(null)

let toastTimer = null

const filteredItems = computed(() =>
  filterCatalogItems({
    items: ALL_ITEMS,
    activeCategory: activeCategory.value,
    searchQuery: searchQuery.value
  })
)

const selectedItems = computed(() =>
  selectedIds.value.map((id) => ITEMS_BY_ID[id]).filter(Boolean)
)

const selectedMotionCount = computed(
  () => selectedItems.value.filter((item) => item.kind === 'motion').length
)

const competitorInspectPrompt = computed(() =>
  buildCompetitorInspectPrompt({
    sourceMode: competitorDraft.sourceMode,
    competitorUrl: competitorDraft.competitorUrl,
    anchorText: competitorDraft.anchorText,
    targetPage: competitorDraft.targetPage || pageTarget.value,
    sectionArea: competitorDraft.sectionArea,
    triggers: competitorDraft.triggers,
    visualFocus: competitorDraft.visualFocus,
    extraNote: competitorDraft.extraNote
  })
)

const generatedPrompt = computed(() =>
  buildCodexPrompt({
    pageTarget: pageTarget.value,
    floorOrder: floorOrder.value,
    floorMotionMap: floorMotionsMap,
    selectedIds: selectedIds.value,
    itemsById: ITEMS_BY_ID,
    competitorRef: attachedCompetitorRef.value
  })
)

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  if (toastTimer) {
    clearTimeout(toastTimer)
  }
  toastTimer = setTimeout(() => {
    toastVisible.value = false
  }, 2100)
  if (toastTimer && typeof toastTimer.unref === 'function') {
    toastTimer.unref()
  }
}

function setSpeed(val) {
  speed.value = val
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.style.setProperty('--dur', val)
  }
  replayTick.value += 1
  showToast(`已切换全局动效时长为 ${val}`)
}

function setCategory(catId) {
  activeCategory.value = catId || 'all'
}

function isSelected(itemId) {
  return selectedIds.value.includes(itemId)
}

function getFloorMotions(layoutId) {
  const list = floorMotionsMap[layoutId]
  if (Array.isArray(list)) return list
  const single = floorMotionMap[layoutId]
  return single ? [single] : []
}

function syncFloorMotionScalar(layoutId) {
  const list = Array.isArray(floorMotionsMap[layoutId]) ? floorMotionsMap[layoutId] : []
  floorMotionMap[layoutId] = list[0] || ''
}

function isMotionBoundAnywhere(motionId) {
  if (!motionId) return false
  return floorOrder.value.some((layoutId) => getFloorMotions(layoutId).includes(motionId))
}

function pruneAutoAttachedItems(candidateMotionId = '') {
  const toRemove = new Set()

  if (
    candidateMotionId &&
    !manualSelectedIds.has(candidateMotionId) &&
    !isMotionBoundAnywhere(candidateMotionId)
  ) {
    toRemove.add(candidateMotionId)
  }

  // When all layout floors are removed, clean up any non-manual items (such as preset-only pitfalls/motions)
  if (floorOrder.value.length === 0) {
    selectedIds.value.forEach((id) => {
      if (!manualSelectedIds.has(id)) {
        toRemove.add(id)
      }
    })
  }

  if (toRemove.size > 0) {
    selectedIds.value = selectedIds.value.filter((id) => !toRemove.has(id))
  }
}

function toggleSelect(itemId) {
  const item = ITEMS_BY_ID[itemId]
  if (!item) return

  const existingIdx = selectedIds.value.indexOf(itemId)
  if (existingIdx !== -1) {
    manualSelectedIds.delete(itemId)
    selectedIds.value = selectedIds.value.filter((id) => id !== itemId)
    if (item.kind === 'style') {
      const prevMotions = [...getFloorMotions(itemId)]
      floorOrder.value = floorOrder.value.filter((id) => id !== itemId)
      delete floorMotionMap[itemId]
      delete floorMotionsMap[itemId]
      if (prevMotions.length > 0) {
        prevMotions.forEach((mId) => pruneAutoAttachedItems(mId))
      } else {
        pruneAutoAttachedItems('')
      }
    } else if (item.kind === 'motion') {
      Object.keys(floorMotionsMap).forEach((layoutId) => {
        if (Array.isArray(floorMotionsMap[layoutId]) && floorMotionsMap[layoutId].includes(itemId)) {
          floorMotionsMap[layoutId] = floorMotionsMap[layoutId].filter((id) => id !== itemId)
          syncFloorMotionScalar(layoutId)
        }
      })
      Object.keys(floorMotionMap).forEach((layoutId) => {
        if (floorMotionMap[layoutId] === itemId) {
          floorMotionMap[layoutId] = ''
        }
      })
    }
  } else {
    manualSelectedIds.add(itemId)
    selectedIds.value = [...selectedIds.value, itemId]
    if (item.kind === 'style' && !floorOrder.value.includes(itemId)) {
      floorOrder.value = [...floorOrder.value, itemId]
    }
  }
}

function removeItem(itemId) {
  if (selectedIds.value.includes(itemId)) {
    toggleSelect(itemId)
  }
}

function addFloor(layoutId) {
  const item = ITEMS_BY_ID[layoutId]
  if (!item || item.kind !== 'style') return

  manualSelectedIds.add(layoutId)
  if (!selectedIds.value.includes(layoutId)) {
    selectedIds.value = [...selectedIds.value, layoutId]
  }
  if (!floorOrder.value.includes(layoutId)) {
    floorOrder.value = [...floorOrder.value, layoutId]
  }
}

function moveFloorUp(layoutId) {
  const idx = floorOrder.value.indexOf(layoutId)
  if (idx <= 0) return
  const next = [...floorOrder.value]
  ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
  floorOrder.value = next
}

function moveFloorDown(layoutId) {
  const idx = floorOrder.value.indexOf(layoutId)
  if (idx === -1 || idx >= floorOrder.value.length - 1) return
  const next = [...floorOrder.value]
  ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
  floorOrder.value = next
}

function setFloorMotion(layoutId, motionId) {
  const prevMotions = [...getFloorMotions(layoutId)]
  const normalized =
    motionId && ITEMS_BY_ID[motionId] && ITEMS_BY_ID[motionId].kind === 'motion'
      ? motionId
      : ''
  floorMotionsMap[layoutId] = normalized ? [normalized] : []
  floorMotionMap[layoutId] = normalized
  if (normalized && !selectedIds.value.includes(normalized)) {
    selectedIds.value = [...selectedIds.value, normalized]
  }
  prevMotions.forEach((prevId) => {
    if (prevId !== normalized) {
      pruneAutoAttachedItems(prevId)
    }
  })
}

function toggleFloorMotion(layoutId, motionId) {
  if (!layoutId || !motionId) return
  const mItem = ITEMS_BY_ID[motionId]
  if (!mItem || mItem.kind !== 'motion') return

  const current = [...getFloorMotions(layoutId)]
  if (current.includes(motionId)) {
    floorMotionsMap[layoutId] = current.filter((id) => id !== motionId)
    syncFloorMotionScalar(layoutId)
    pruneAutoAttachedItems(motionId)
  } else {
    floorMotionsMap[layoutId] = [...current, motionId]
    syncFloorMotionScalar(layoutId)
    if (!selectedIds.value.includes(motionId)) {
      selectedIds.value = [...selectedIds.value, motionId]
    }
  }
}

function clearFloorMotions(layoutId) {
  const prevMotions = [...getFloorMotions(layoutId)]
  floorMotionsMap[layoutId] = []
  floorMotionMap[layoutId] = ''
  prevMotions.forEach((prevId) => pruneAutoAttachedItems(prevId))
}

function applyPreset(presetId) {
  const preset = PAGE_PRESETS.find((p) => p.id === presetId)
  if (!preset) return

  manualSelectedIds.clear()
  Object.keys(floorMotionMap).forEach((key) => {
    delete floorMotionMap[key]
  })
  Object.keys(floorMotionsMap).forEach((key) => {
    delete floorMotionsMap[key]
  })

  const nextFloors = []
  const nextSelected = []

  preset.floors.forEach(({ layoutId, motionId, motionIds }) => {
    if (layoutId && ITEMS_BY_ID[layoutId]) {
      if (!nextFloors.includes(layoutId)) {
        nextFloors.push(layoutId)
      }
      if (!nextSelected.includes(layoutId)) {
        nextSelected.push(layoutId)
      }
      const rawList = Array.isArray(motionIds)
        ? motionIds
        : motionId
          ? [motionId]
          : []
      const validList = rawList.filter(
        (mId) => mId && ITEMS_BY_ID[mId] && ITEMS_BY_ID[mId].kind === 'motion'
      )
      floorMotionsMap[layoutId] = validList
      floorMotionMap[layoutId] = validList[0] || ''
      validList.forEach((mId) => {
        if (!nextSelected.includes(mId)) {
          nextSelected.push(mId)
        }
      })
    }
  })

  ;(preset.extraIds || []).forEach((extraId) => {
    if (ITEMS_BY_ID[extraId] && !nextSelected.includes(extraId)) {
      nextSelected.push(extraId)
    }
  })

  floorOrder.value = nextFloors
  selectedIds.value = nextSelected
  showToast(`已套用预设「${preset.name}」`)
}

function clearSelection() {
  manualSelectedIds.clear()
  selectedIds.value = []
  floorOrder.value = []
  attachedCompetitorRef.value = null
  Object.keys(floorMotionMap).forEach((key) => {
    delete floorMotionMap[key]
  })
  Object.keys(floorMotionsMap).forEach((key) => {
    delete floorMotionsMap[key]
  })
}

function openDrawer() {
  isDrawerOpen.value = true
}

function closeDrawer() {
  isDrawerOpen.value = false
}

function openCompetitorModal() {
  isCompetitorModalOpen.value = true
}

function closeCompetitorModal() {
  isCompetitorModalOpen.value = false
}

function attachCompetitorToBlueprint() {
  if (competitorDraft.targetPage.trim() && !pageTarget.value.trim()) {
    pageTarget.value = competitorDraft.targetPage.trim()
  }
  attachedCompetitorRef.value = {
    sourceMode: competitorDraft.sourceMode,
    competitorUrl: competitorDraft.competitorUrl.trim(),
    anchorText: competitorDraft.anchorText.trim(),
    sectionArea: competitorDraft.sectionArea,
    triggers: [...competitorDraft.triggers],
    visualFocus: [...competitorDraft.visualFocus],
    extraNote: competitorDraft.extraNote.trim()
  }
  isCompetitorModalOpen.value = false
  isDrawerOpen.value = true
  showToast('已将外部网站拆解要求并入整页话术')
}

function clearCompetitorRef() {
  attachedCompetitorRef.value = null
  showToast('已移除外部网站参考要求')
}

function setPreviewViewport(vp) {
  previewViewport.value = vp === 'mobile' ? 'mobile' : 'desktop'
}

function setCardViewport(vp) {
  const next = vp === 'mobile' ? 'mobile' : 'desktop'
  cardViewport.value = next
  cardViewportVersion.value += 1
  replayTick.value += 1
  showToast(next === 'mobile' ? '已切换为手机端组件视图' : '已切换为 Web 桌面端视图')
}

async function copyText(text, successMsg) {
  const msg = successMsg || '已复制到剪贴板'
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      showToast(msg)
      return true
    }
  } catch {
    // Fallback to textarea copy below
  }

  if (typeof document !== 'undefined' && document.body) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    ta.style.pointerEvents = 'none'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } finally {
      document.body.removeChild(ta)
    }
  }
  showToast(msg)
  return true
}

export function useCatalogStore() {
  return {
    speed,
    replayTick,
    activeCategory,
    searchQuery,
    selectedIds,
    floorOrder,
    floorMotionMap,
    floorMotionsMap,
    pageTarget,
    isDrawerOpen,
    isCompetitorModalOpen,
    competitorDraft,
    attachedCompetitorRef,
    competitorInspectPrompt,
    previewViewport,
    cardViewport,
    cardViewportVersion,
    toastMessage,
    toastVisible,
    filteredItems,
    selectedItems,
    selectedMotionCount,
    generatedPrompt,
    isSelected,
    setSpeed,
    setCategory,
    toggleSelect,
    removeItem,
    moveFloorUp,
    moveFloorDown,
    getFloorMotions,
    setFloorMotion,
    toggleFloorMotion,
    clearFloorMotions,
    addFloor,
    applyPreset,
    clearSelection,
    openDrawer,
    closeDrawer,
    openCompetitorModal,
    closeCompetitorModal,
    attachCompetitorToBlueprint,
    clearCompetitorRef,
    setPreviewViewport,
    setCardViewport,
    showToast,
    copyText
  }
}
