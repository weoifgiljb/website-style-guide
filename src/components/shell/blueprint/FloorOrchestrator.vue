<script setup>
import { computed } from 'vue'
import { LAYOUT_ITEMS, ITEMS_BY_ID } from '../../../data/index.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'
import FloorMotionPicker from './FloorMotionPicker.vue'
import BlueprintPromptBlock from './BlueprintPromptBlock.vue'
import CompetitorRefBlock from './CompetitorRefBlock.vue'

defineProps({
  openPickerLayoutId: { type: String, default: '' }
})

const emit = defineEmits(['toggle-picker', 'hover-motion', 'leave-motion', 'scroll', 'apply-preset'])

const {
  pageTarget,
  floorOrder,
  selectedItems,
  clearSelection,
  addFloor,
  moveFloorUp,
  moveFloorDown,
  removeItem
} = useCatalogStore()

const unselectedLayouts = computed(() =>
  LAYOUT_ITEMS.filter((item) => !floorOrder.value.includes(item.id))
)

function handleAddFloorSelect(event) {
  const layoutId = event.target.value
  if (layoutId) {
    addFloor(layoutId)
    event.target.value = ''
  }
}
</script>

<template>
  <aside class="orchestrator-col" @scroll.passive="emit('scroll')">
          <div class="field-block">
            <label class="field-label" for="pageTargetInput">① 目标页面路径 / 名称</label>
            <input
              id="pageTargetInput"
              v-model="pageTarget"
              type="text"
              class="target-input"
              placeholder="填写目标页面名称或路径，如：/features/ai-agents"
            />
          </div>

          <div class="field-block floors-block">
            <div class="field-header">
              <span class="field-label">② 页面楼层顺序与本屏动效（{{ floorOrder.length }} 屏）</span>
              <button
                v-if="selectedItems.length > 0 || floorOrder.length > 0"
                type="button"
                class="clear-drawer-btn"
                @click="clearSelection()"
              >
                清空重选
              </button>
            </div>

            <div v-if="floorOrder.length === 0" class="empty-floors">
              <p>当前还没有选定版式楼层，可一键套用标准模板或逐屏添加：</p>
              <div class="empty-floor-btns">
                <button
                  type="button"
                  class="mini-action-btn"
                  @click="addFloor('S-01')"
                >
                  + 添加 S-01 首屏
                </button>
                <button
                  type="button"
                  class="mini-action-btn primary"
                  @click="emit('apply-preset', 'standard-feature')"
                >
                  套用标准 5 屏模板
                </button>
              </div>
            </div>

            <div v-else class="floor-list">
              <div
                v-for="(layoutId, idx) in floorOrder"
                :key="layoutId"
                class="floor-card"
              >
                <div class="floor-card-top">
                  <div class="floor-card-title">
                    <span class="floor-badge">第 {{ idx + 1 }} 屏</span>
                    <span class="floor-name">
                      {{ ITEMS_BY_ID[layoutId]?.code }} {{ ITEMS_BY_ID[layoutId]?.name }}
                    </span>
                  </div>

                  <div class="floor-controls">
                    <button
                      type="button"
                      class="icon-btn"
                      title="上移一屏"
                      :disabled="idx === 0"
                      @click="moveFloorUp(layoutId)"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      class="icon-btn"
                      title="下移一屏"
                      :disabled="idx === floorOrder.length - 1"
                      @click="moveFloorDown(layoutId)"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      class="icon-btn danger"
                      title="移除该楼层"
                      @click="removeItem(layoutId)"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <FloorMotionPicker
                  :layout-id="layoutId"
                  :open="openPickerLayoutId === layoutId"
                  @toggle="emit('toggle-picker', layoutId)"
                  @hover-motion="(motion, event, placement) => emit('hover-motion', motion, event, placement)"
                  @leave-motion="emit('leave-motion')"
                />
              </div>
            </div>

            <div class="add-floor-wrap">
              <select
                class="add-floor-select"
                aria-label="继续添加页面版式楼层"
                :disabled="unselectedLayouts.length === 0"
                @change="handleAddFloorSelect"
              >
                <option value="">
                  {{ unselectedLayouts.length > 0 ? '+ 继续添加版式楼层（S-01 ~ S-14）...' : '已添加全部 14 种版式楼层' }}
                </option>
                <option
                  v-for="layout in unselectedLayouts"
                  :key="layout.id"
                  :value="layout.id"
                >
                  {{ layout.code }} {{ layout.name }} — {{ layout.scene }}
                </option>
              </select>
            </div>
          </div>

          <CompetitorRefBlock />
    <BlueprintPromptBlock />
  </aside>
</template>

<style scoped>
.orchestrator-col {
  width: 385px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.field-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text);
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

.target-input,
.motion-select,
.add-floor-select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 12.5px;
  color: var(--text);
  outline: none;
}

.target-input:focus,
.motion-select:focus,
.add-floor-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
}

.empty-floors {
  background: var(--surface-soft);
  border: 1px dashed var(--border-strong);
  border-radius: 10px;
  padding: 14px;
  font-size: 12.5px;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-floor-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mini-action-btn {
  border: 1px solid var(--border-strong);
  background: #ffffff;
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 7px;
  cursor: pointer;
}

.mini-action-btn.primary {
  border-color: var(--primary);
  background: var(--primary);
  color: #ffffff;
}

.floor-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.floor-card {
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.floor-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.floor-card-title {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.floor-badge {
  flex-shrink: 0;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--primary);
  background: #dbeafe;
  padding: 1px 6px;
  border-radius: 5px;
}

.floor-name {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.floor-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

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

.add-floor-select {
  background: var(--primary-soft);
  border-color: #bfdbfe;
  color: var(--primary);
  font-weight: 600;
}

</style>
