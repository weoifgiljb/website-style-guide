import { ref, reactive, computed } from 'vue'
import { ALL_ITEMS, ITEMS_BY_ID, PAGE_PRESETS } from '../data/index.js'
import { filterCatalogItems, buildCodexPrompt } from '../utils/promptBuilder.js'

const speed = ref('0.28s')
const replayTick = ref(0)
const activeCategory = ref('all')
const searchQuery = ref('')
const selectedIds = ref([])
const floorOrder = ref([])
const floorMotionMap = reactive({})
const pageTarget = ref('')
const isDrawerOpen = ref(false)
const previewViewport = ref('desktop')
const toastMessage = ref('')
const toastVisible = ref(false)

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

const generatedPrompt = computed(() =>
  buildCodexPrompt({
    pageTarget: pageTarget.value,
    floorOrder: floorOrder.value,
    floorMotionMap,
    selectedIds: selectedIds.value,
    itemsById: ITEMS_BY_ID
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

function toggleSelect(itemId) {
  const item = ITEMS_BY_ID[itemId]
  if (!item) return

  const existingIdx = selectedIds.value.indexOf(itemId)
  if (existingIdx !== -1) {
    selectedIds.value = selectedIds.value.filter((id) => id !== itemId)
    if (item.kind === 'style') {
      floorOrder.value = floorOrder.value.filter((id) => id !== itemId)
      delete floorMotionMap[itemId]
    } else if (item.kind === 'motion') {
      Object.keys(floorMotionMap).forEach((layoutId) => {
        if (floorMotionMap[layoutId] === itemId) {
          floorMotionMap[layoutId] = ''
        }
      })
    }
  } else {
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
  const normalized = motionId || ''
  floorMotionMap[layoutId] = normalized
  if (
    normalized &&
    ITEMS_BY_ID[normalized] &&
    ITEMS_BY_ID[normalized].kind === 'motion' &&
    !selectedIds.value.includes(normalized)
  ) {
    selectedIds.value = [...selectedIds.value, normalized]
  }
}

function applyPreset(presetId) {
  const preset = PAGE_PRESETS.find((p) => p.id === presetId)
  if (!preset) return

  Object.keys(floorMotionMap).forEach((key) => {
    delete floorMotionMap[key]
  })

  const nextFloors = []
  const nextSelected = []

  preset.floors.forEach(({ layoutId, motionId }) => {
    if (layoutId && ITEMS_BY_ID[layoutId]) {
      if (!nextFloors.includes(layoutId)) {
        nextFloors.push(layoutId)
      }
      if (!nextSelected.includes(layoutId)) {
        nextSelected.push(layoutId)
      }
      const validMotion =
        motionId && ITEMS_BY_ID[motionId] && ITEMS_BY_ID[motionId].kind === 'motion'
          ? motionId
          : ''
      floorMotionMap[layoutId] = validMotion
      if (validMotion && !nextSelected.includes(validMotion)) {
        nextSelected.push(validMotion)
      }
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
  selectedIds.value = []
  floorOrder.value = []
  Object.keys(floorMotionMap).forEach((key) => {
    delete floorMotionMap[key]
  })
}

function openDrawer() {
  isDrawerOpen.value = true
}

function closeDrawer() {
  isDrawerOpen.value = false
}

function setPreviewViewport(vp) {
  previewViewport.value = vp === 'mobile' ? 'mobile' : 'desktop'
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
    pageTarget,
    isDrawerOpen,
    previewViewport,
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
    setFloorMotion,
    addFloor,
    applyPreset,
    clearSelection,
    openDrawer,
    closeDrawer,
    setPreviewViewport,
    showToast,
    copyText
  }
}
