<script setup>
import { computed } from 'vue'
import { ITEMS_BY_ID } from '../../../data/index.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'
import BlueprintFloorPreview from '../BlueprintFloorPreview.vue'
import BlueprintDeviceFrame from './BlueprintDeviceFrame.vue'
import StandaloneMotionsPreview from './StandaloneMotionsPreview.vue'

const props = defineProps({
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
  if (!el) {
    emit('scroll', 0)
    return
  }
  const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight)
  emit('scroll', Math.min(1, Math.max(0, el.scrollTop / maxScroll)))
}
</script>

<template>
        <section class="canvas-col">
          <div class="canvas-toolbar">
            <div class="viewport-tabs">
              <button
                type="button"
                class="vp-btn"
                :class="{ active: previewViewport === 'desktop' }"
                @click="setPreviewViewport('desktop')"
              >
                💻 桌面端 1280px
              </button>
              <button
                type="button"
                class="vp-btn"
                :class="{ active: previewViewport === 'mobile' }"
                @click="setPreviewViewport('mobile')"
              >
                📱 手机端 390px
              </button>
            </div>

            <div class="canvas-toolbar-right">
              <button
                type="button"
                class="replay-all-btn"
                @click="emit('replay')"
              >
                ↻ 重播整页动效
              </button>
              <span class="canvas-summary">
                共 {{ floorOrder.length }} 屏<template v-if="unboundSelectedMotions.length > 0"> · {{ unboundSelectedMotions.length }} 项独立动效</template> · 实时响应式骨架
              </span>
            </div>
          </div>

          <div class="canvas-stage" @scroll="onCanvasScroll">
            <BlueprintDeviceFrame>
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
                  :viewport="previewViewport"
                  :replay-key="replayKey"
                  :scroll-ratio="scrollRatio"
                  @hover-motion="(motion, event) => emit('hover-motion', motion, event)"
                  @leave-motion="emit('leave-motion')"
                />
              </template>

              <StandaloneMotionsPreview :replay-key="replayKey" />
            </BlueprintDeviceFrame>
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
}

.canvas-toolbar {
  padding: 10px 20px;
  background: #f1f5f9;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.viewport-tabs {
  display: inline-flex;
  background: #e2e8f0;
  padding: 3px;
  border-radius: 9px;
  gap: 4px;
}

.vp-btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 7px;
  cursor: pointer;
}

.vp-btn.active {
  background: #ffffff;
  color: var(--text);
  box-shadow: var(--shadow-sm);
}

.canvas-toolbar-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.replay-all-btn {
  border: 1px solid #bfdbfe;
  background: #ffffff;
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.replay-all-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.canvas-summary {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.canvas-stage {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}


.canvas-empty {
  text-align: center;
  padding: 48px 16px;
  color: var(--text-muted);
  font-size: 13px;
}
</style>
