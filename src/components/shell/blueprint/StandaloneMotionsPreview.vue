<script setup>
import { computed } from 'vue'
import { Sparkles, X } from 'lucide-vue-next'
import { DEMO_COMPONENTS } from '../../demos/index.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

defineProps({
  replayKey: { type: Number, default: 0 }
})

const { floorOrder, floorMotionMap, floorMotionsMap, selectedItems, previewViewport, removeItem } = useCatalogStore()

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

function clearUnboundMotions() {
  unboundSelectedMotions.value.map((item) => item.id).forEach((id) => removeItem(id))
}
</script>

<template>
                <div
                  v-if="unboundSelectedMotions.length > 0"
                  class="standalone-motions-section"
                >
                  <div class="standalone-motions-head">
                    <span class="standalone-head-label">
                      <Sparkles :size="13" :stroke-width="1.8" aria-hidden="true" />
                      <span>已选独立动效实时预览（可在左侧绑定到具体楼层）</span>
                    </span>
                    <button
                      type="button"
                      class="clear-unbound-btn"
                      @click="clearUnboundMotions()"
                    >
                      清空独立动效
                    </button>
                  </div>
                  <div
                    class="standalone-motions-grid"
                    :class="{ 'is-mobile': previewViewport === 'mobile' }"
                  >
                    <div
                      v-for="m in unboundSelectedMotions"
                      :key="m.id"
                      class="standalone-motion-card"
                    >
                      <div class="standalone-motion-meta">
                        <span class="standalone-motion-code">{{ m.code }}</span>
                        <span class="standalone-motion-name">{{ m.name }}</span>
                        <span class="standalone-motion-en">{{ m.en }}</span>
                        <button
                          type="button"
                          class="icon-btn danger standalone-remove-btn"
                          :title="'移除 ' + m.name"
                          :aria-label="'移除 ' + m.name"
                          @click="removeItem(m.id)"
                        >
                          <X :size="12" :stroke-width="2" aria-hidden="true" />
                        </button>
                      </div>
                      <div class="stage">
                        <component
                          :is="DEMO_COMPONENTS[m.demoKey]"
                          v-if="DEMO_COMPONENTS[m.demoKey]"
                          :viewport="previewViewport"
                          :replay-tick="replayKey"
                        />
                      </div>
                    </div>
                  </div>
                </div>
</template>

<style scoped>
.icon-btn {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.icon-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.icon-btn.danger:hover {
  border-color: #fca5a5;
  color: var(--danger);
  background: var(--danger-soft);
}

.clear-drawer-btn,
.clear-unbound-btn {
  border: 1px solid #fca5a5;
  background: #ffffff;
  color: var(--danger);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.clear-drawer-btn:hover,
.clear-unbound-btn:hover {
  background: var(--danger-soft);
}

.standalone-motions-section {
  background: #ffffff;
  border: 1px dashed #93c5fd;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.standalone-motions-head {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.standalone-head-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.standalone-motions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
}

.standalone-motions-grid.is-mobile {
  grid-template-columns: 1fr;
}

.standalone-motion-card {
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 9px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.standalone-motion-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.standalone-motion-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  padding: 1px 6px;
  border-radius: 5px;
}

.standalone-motion-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
}

.standalone-motion-en {
  font-size: 10.5px;
  color: var(--text-muted);
  margin-left: auto;
}

.standalone-remove-btn {
  width: 22px;
  height: 22px;
  font-size: 11px;
}

.standalone-motion-card .stage {
  position: relative;
  min-height: 178px;
  padding: 36px 12px 12px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid var(--border);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
