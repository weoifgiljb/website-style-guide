<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { MOTION_TOOLTIP_ANIM_MAP } from '../../utils/promptBuilder.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'
import { useAnchoredTooltip } from '../../composables/useAnchoredTooltip.js'
import MotionTooltip from './MotionTooltip.vue'
import BlueprintTopBar from './blueprint/BlueprintTopBar.vue'
import FloorOrchestrator from './blueprint/FloorOrchestrator.vue'
import BlueprintCanvas from './blueprint/BlueprintCanvas.vue'

const {
  isDrawerOpen,
  previewViewport,
  applyPreset,
  closeDrawer
} = useCatalogStore()

const { tooltipState, showTooltip, hideTooltip } = useAnchoredTooltip()

const previewReplayKey = ref(0)
const canvasScrollRatio = ref(0)
const openPickerLayoutId = ref('')

function showMotionItemTip(motion, event, placement = 'auto') {
  if (!motion) return
  showTooltip({
    title: `${motion.code} ${motion.name}`,
    badge: motion.en || '',
    tip: motion.shortPrompt || motion.scene,
    anim: MOTION_TOOLTIP_ANIM_MAP[motion.id] || 'scroll-enter',
    placement,
    currentTarget: event?.currentTarget
  })
}

function hideMotionItemTip() {
  hideTooltip()
}

function toggleMotionPicker(layoutId) {
  hideMotionItemTip()
  openPickerLayoutId.value = openPickerLayoutId.value === layoutId ? '' : layoutId
}

function handleApplyPreset(presetId) {
  applyPreset(presetId)
  previewReplayKey.value += 1
}

function handleCanvasScroll(ratio) {
  hideMotionItemTip()
  canvasScrollRatio.value = ratio
}

let previousBodyOverflow = ''
let isBodyLocked = false

function lockBodyScroll(locked) {
  if (typeof document === 'undefined' || !document.body) return
  if (locked && !isBodyLocked) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    isBodyLocked = true
  } else if (!locked && isBodyLocked) {
    document.body.style.overflow = previousBodyOverflow || ''
    isBodyLocked = false
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isDrawerOpen.value) {
    closeDrawer()
  }
}

watch(previewViewport, () => {
  previewReplayKey.value += 1
})

watch(
  isDrawerOpen,
  (open) => {
    lockBodyScroll(open)
    hideMotionItemTip()
    if (open) {
      canvasScrollRatio.value = 0
      previewReplayKey.value += 1
    } else {
      openPickerLayoutId.value = ''
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  lockBodyScroll(false)
})
</script>

<template>
  <div
    v-if="isDrawerOpen"
    class="drawer-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="整页骨架拼装预览与楼层话术生成器"
    @click.self="closeDrawer()"
  >
    <div class="drawer-panel">
      <BlueprintTopBar @apply-preset="handleApplyPreset" @close="closeDrawer()" />

      <div class="drawer-body">
        <FloorOrchestrator
          :open-picker-layout-id="openPickerLayoutId"
          @toggle-picker="toggleMotionPicker"
          @hover-motion="showMotionItemTip"
          @leave-motion="hideMotionItemTip"
          @scroll="hideMotionItemTip"
          @apply-preset="handleApplyPreset"
        />
        <BlueprintCanvas
          :replay-key="previewReplayKey"
          :scroll-ratio="canvasScrollRatio"
          @replay="previewReplayKey++"
          @scroll="handleCanvasScroll"
          @hover-motion="showMotionItemTip"
          @leave-motion="hideMotionItemTip"
        />
      </div>
    </div>

    <MotionTooltip
      :visible="tooltipState.visible"
      :title="tooltipState.title"
      :badge="tooltipState.badge"
      :tip="tooltipState.tip"
      :anim="tooltipState.anim"
      :placement="tooltipState.placement"
      :anchor-rect="tooltipState.anchorRect"
    />
  </div>
</template>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
}

.drawer-panel {
  width: min(1240px, 96vw);
  height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  box-shadow: -16px 0 40px rgba(15, 23, 42, 0.22);
  overflow: hidden;
}

.drawer-body {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

@media (max-width: 900px) {
  .drawer-body {
    flex-direction: column;
    overflow-y: auto;
  }

  .orchestrator-col {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border);
    overflow-y: visible;
  }

  .canvas-col {
    overflow: visible;
  }
}
</style>
