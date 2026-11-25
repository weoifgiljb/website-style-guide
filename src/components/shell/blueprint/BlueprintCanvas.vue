<script setup>
import { computed } from 'vue'
import { ITEMS_BY_ID } from '../../../data/index.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'
import { useResponsiveStage } from '../../../composables/useResponsiveStage.js'
import BlueprintFloorPreview from '../BlueprintFloorPreview.vue'
import BlueprintDeviceFrame from './BlueprintDeviceFrame.vue'
import BlueprintDevtoolsBar from './BlueprintDevtoolsBar.vue'
import StandaloneMotionsPreview from './StandaloneMotionsPreview.vue'

defineProps({
  replayKey: { type: Number, default: 0 },
  scrollRatio: { type: Number, default: 0 }
})

const emit = defineEmits(['replay', 'scroll', 'hover-motion', 'leave-motion'])

const {
  floorOrder,
  floorMotionMap,
  floorMotionsMap,
  selectedItems,
  previewViewport,
  getFloorMotions,
  setPreviewViewport
} = useCatalogStore()

const {
  presetId,
  simWidth,
  simHeight,
  shellMode,
  zoomMode,
  stageRef,
  transformLayerRef,
  naturalFrameHeight,
  isDragging,
  tier,
  effectiveScale,
  scaledBoxStyle,
  transformLayerStyle,
  applyPresetById,
  handleUpdateDimensions,
  handleSnapWidth,
  handleRotateScreen,
  handleResetHeight,
  handleUpdateZoom,
  startResize
} = useResponsiveStage({ previewViewport, setPreviewViewport })

const boundMotionIds = computed(() => {
  const ids = new Set()
  floorOrder.value.forEach((layoutId) => {
    const list = Array.isArray(floorMotionsMap[layoutId])
      ? floorMotionsMap[layoutId]
      : floorMotionMap[layoutId]
        ? [floorMotionMap[layoutId]]
        : []
    list.forEach((mId) => {
      if (mId) ids.add(mId)
    })
  })
  return ids
})

const unboundSelectedMotions = computed(() =>
  (selectedItems.value || []).filter(
    (item) => item.kind === 'motion' && !boundMotionIds.value.has(item.id)
  )
)

function resolvedFloorMotions(layoutId) {
  const list = Array.isArray(floorMotionsMap[layoutId])
    ? floorMotionsMap[layoutId]
    : getFloorMotions(layoutId)
  return list.map((mId) => ITEMS_BY_ID[mId]).filter(Boolean)
}

function onCanvasScroll(event) {
  const el = event.currentTarget
  if (!el) return
  const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight)
  emit('scroll', Math.min(1, Math.max(0, el.scrollTop / maxScroll)))
}
</script>

<template>
  <section class="canvas-col">
    <BlueprintDevtoolsBar
      :preset-id="presetId"
      :sim-width="simWidth"
      :sim-height="simHeight"
      :zoom-mode="zoomMode"
      :effective-scale="effectiveScale"
      :floor-count="floorOrder.length"
      :unbound-count="unboundSelectedMotions.length"
      @select-preset="applyPresetById"
      @update-dimensions="handleUpdateDimensions"
      @rotate-screen="handleRotateScreen"
      @reset-height="handleResetHeight"
      @update-zoom="handleUpdateZoom"
      @snap-width="handleSnapWidth"
      @replay="emit('replay')"
    />

    <div ref="stageRef" class="canvas-stage" :class="{ 'is-dragging': isDragging }" @scroll="onCanvasScroll">
      <div class="devtools-viewport-shell">
        <div v-if="isDragging" class="drag-hud">
          {{ simWidth }} × {{ simHeight || Math.round(naturalFrameHeight) }} px · {{ tier.badge }}
        </div>

        <button
          type="button"
          class="resize-gutter is-left"
          aria-label="向左拖拽调节视口宽度"
          title="拖拽调节视口宽度"
          @pointerdown="startResize('x', 'left', $event)"
        >
          <span class="grip-bars" aria-hidden="true"></span>
        </button>

        <div class="devtools-scale-box" :style="scaledBoxStyle">
          <div ref="transformLayerRef" class="devtools-transform-layer" :style="transformLayerStyle">
            <BlueprintDeviceFrame
              :shell-mode="shellMode"
              :sim-width="simWidth"
              :sim-height="simHeight"
              :is-dragging="isDragging"
              @body-scroll="(ratio) => emit('scroll', ratio)"
            >
              <div
                v-if="floorOrder.length === 0 && unboundSelectedMotions.length === 0"
                class="canvas-empty"
              >
                请在左侧选择预设模板或添加版式楼层，这里会实时拼出整页骨架。
              </div>

              <template v-for="(layoutId, idx) in floorOrder" :key="layoutId">
                <BlueprintFloorPreview
                  v-if="ITEMS_BY_ID[layoutId]"
                  :floor-index="idx"
                  :layout-item="ITEMS_BY_ID[layoutId]"
                  :motion-items="resolvedFloorMotions(layoutId)"
                  :motion-item="resolvedFloorMotions(layoutId)[0] || null"
                  :viewport="tier.viewport"
                  :compact="tier.compact"
                  :replay-key="replayKey"
                  :scroll-ratio="scrollRatio"
                  @hover-motion="(motion, event) => emit('hover-motion', motion, event)"
                  @leave-motion="emit('leave-motion')"
                />
              </template>

              <StandaloneMotionsPreview :replay-key="replayKey" />
            </BlueprintDeviceFrame>
          </div>
        </div>

        <button
          type="button"
          class="resize-gutter is-right"
          aria-label="向右拖拽调节视口宽度"
          title="拖拽调节视口宽度"
          @pointerdown="startResize('x', 'right', $event)"
        >
          <span class="grip-bars" aria-hidden="true"></span>
        </button>

        <button
          type="button"
          class="resize-gutter is-bottom"
          aria-label="向下拖拽调节视口高度（双击恢复整页自适应）"
          title="拖拽调节高度 · 双击恢复整页自适应"
          @pointerdown="startResize('y', 'bottom', $event)"
          @dblclick="handleResetHeight"
        >
          <span class="grip-bars horizontal" aria-hidden="true"></span>
        </button>

        <button
          type="button"
          class="resize-corner"
          aria-label="同时拖拽调节视口宽高"
          title="同时调节宽高"
          @pointerdown="startResize('xy', 'right', $event)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.canvas-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #eef2f6;
}

.canvas-stage {
  flex: 1;
  overflow: auto;
  padding: 20px 34px 36px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: radial-gradient(rgba(148, 163, 184, 0.28) 1px, transparent 1px);
  background-size: 16px 16px;
}

.canvas-stage.is-dragging {
  user-select: none;
}

.devtools-viewport-shell {
  position: relative;
  display: inline-flex;
  align-items: stretch;
}

.devtools-scale-box {
  position: relative;
  overflow: hidden;
}

.devtools-transform-layer {
  transform-origin: top left;
}

.drag-hud {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 12;
  background: rgba(15, 23, 42, 0.92);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.22);
}

.resize-gutter {
  position: absolute;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
  transition: background 0.15s ease;
}

.resize-gutter.is-left {
  top: 0;
  bottom: 0;
  left: -15px;
  width: 14px;
  cursor: ew-resize;
  border-radius: 6px 0 0 6px;
}

.resize-gutter.is-right {
  top: 0;
  bottom: 0;
  right: -15px;
  width: 14px;
  cursor: ew-resize;
  border-radius: 0 6px 6px 0;
}

.resize-gutter.is-bottom {
  left: 0;
  right: 0;
  bottom: -15px;
  height: 14px;
  cursor: ns-resize;
  border-radius: 0 0 6px 6px;
}

.resize-gutter:hover,
.canvas-stage.is-dragging .resize-gutter {
  background: rgba(37, 99, 235, 0.08);
}

.grip-bars {
  width: 4px;
  height: 28px;
  border-left: 1.5px solid #94a3b8;
  border-right: 1.5px solid #94a3b8;
  transition: border-color 0.15s ease;
}

.grip-bars.horizontal {
  width: 28px;
  height: 4px;
  border-left: none;
  border-right: none;
  border-top: 1.5px solid #94a3b8;
  border-bottom: 1.5px solid #94a3b8;
}

.resize-gutter:hover .grip-bars,
.canvas-stage.is-dragging .grip-bars {
  border-color: var(--primary);
}

.resize-corner {
  position: absolute;
  right: -15px;
  bottom: -15px;
  width: 15px;
  height: 15px;
  border: none;
  background: transparent;
  cursor: nwse-resize;
  z-index: 7;
}

.resize-corner::after {
  content: '';
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 7px;
  height: 7px;
  border-right: 2px solid #94a3b8;
  border-bottom: 2px solid #94a3b8;
  border-radius: 0 0 2px 0;
}

.resize-corner:hover::after {
  border-color: var(--primary);
}

.canvas-empty {
  text-align: center;
  padding: 48px 16px;
  color: var(--text-muted);
  font-size: 13px;
}
</style>
