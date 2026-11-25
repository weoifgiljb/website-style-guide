<script setup>
import { Play, X, ChevronUp, ChevronDown, Check } from 'lucide-vue-next'
import { MOTION_ITEMS, ITEMS_BY_ID } from '../../../data/index.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

defineProps({
  layoutId: { type: String, required: true },
  open: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle', 'hover-motion', 'leave-motion'])

const { floorMotionsMap, getFloorMotions, toggleFloorMotion, clearFloorMotions } = useCatalogStore()

function resolvedFloorMotions(layoutId) {
  const list = Array.isArray(floorMotionsMap[layoutId])
    ? floorMotionsMap[layoutId]
    : getFloorMotions(layoutId)
  return list.map((mId) => ITEMS_BY_ID[mId]).filter(Boolean)
}

function isFloorMotionChecked(layoutId, motionId) {
  const list = Array.isArray(floorMotionsMap[layoutId])
    ? floorMotionsMap[layoutId]
    : getFloorMotions(layoutId)
  return list.includes(motionId)
}
</script>

<template>
                <div class="floor-motion-box">
                  <div class="floor-motion-head">
                    <label
                      class="motion-select-label"
                      :for="'floor-motion-' + layoutId"
                    >搭配本屏动效（可多选 · 悬停看动画）</label>
                    <button
                      v-if="resolvedFloorMotions(layoutId).length > 0"
                      type="button"
                      class="clear-floor-motions-btn"
                      @click="clearFloorMotions(layoutId)"
                    >
                      清空本屏
                    </button>
                  </div>

                  <!-- 已选动效胶囊列表（悬停可实时预览动画，点 × 可移除单项） -->
                  <div
                    v-if="resolvedFloorMotions(layoutId).length > 0"
                    class="selected-motion-chips"
                  >
                    <span
                      v-for="m in resolvedFloorMotions(layoutId)"
                      :key="m.id"
                      class="sel-motion-chip"
                      @mouseenter="emit('hover-motion', m, $event)"
                      @mouseleave="emit('leave-motion')"
                    >
                      <Play :size="9" :stroke-width="2.2" class="chip-play" aria-hidden="true" />
                      <span>{{ m.code }} {{ m.name }}</span>
                      <button
                        type="button"
                        class="chip-del-btn"
                        :aria-label="'移除本屏动效 ' + m.name"
                        @click.stop="toggleFloorMotion(layoutId, m.id)"
                      >
                        <X :size="10" :stroke-width="2.2" aria-hidden="true" />
                      </button>
                    </span>
                  </div>

                  <!-- 多选动效展开按钮 -->
                  <button
                    :id="'floor-motion-' + layoutId"
                    type="button"
                    class="motion-picker-btn"
                    :class="{ 'is-open': open }"
                    :aria-expanded="open"
                    @click="emit('toggle')"
                  >
                    <span>
                      {{
                        open
                          ? '收起可选动效列表（鼠标指着词看动画）'
                          : resolvedFloorMotions(layoutId).length === 0
                            ? '+ 选择本屏动效（可多选 · 悬停看动画）'
                            : `+ 继续叠加更多动效（已选 ${resolvedFloorMotions(layoutId).length} 项）`
                      }}
                    </span>
                    <ChevronUp v-if="open" :size="14" :stroke-width="1.9" class="picker-chevron" aria-hidden="true" />
                    <ChevronDown v-else :size="14" :stroke-width="1.9" class="picker-chevron" aria-hidden="true" />
                  </button>

                  <!-- 展开的多选动效面板（点选不收起支持连选，悬停弹动画 Tooltip） -->
                  <div
                    v-if="open"
                    class="motion-multi-panel"
                    role="group"
                    :aria-label="ITEMS_BY_ID[layoutId]?.name + ' 可叠加动效列表'"
                  >
                    <button
                      v-for="m in MOTION_ITEMS"
                      :key="m.id"
                      type="button"
                      class="motion-opt-item"
                      :class="{ checked: isFloorMotionChecked(layoutId, m.id) }"
                      @mouseenter="emit('hover-motion', m, $event, 'right')"
                      @mouseleave="emit('leave-motion')"
                      @focus="emit('hover-motion', m, $event, 'right')"
                      @blur="emit('leave-motion')"
                      @click="toggleFloorMotion(layoutId, m.id)"
                    >
                      <span class="opt-check">
                        <Check v-if="isFloorMotionChecked(layoutId, m.id)" :size="10" :stroke-width="2.6" aria-hidden="true" />
                      </span>
                      <span class="opt-code">{{ m.code }}</span>
                      <span class="opt-name">{{ m.name }}</span>
                      <Play :size="9" :stroke-width="2" class="opt-play" aria-hidden="true" />
                    </button>
                  </div>
                </div>
</template>

<style scoped>
.floor-motion-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.floor-motion-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.motion-select-label {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
}

.clear-floor-motions-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 10.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 0 2px;
}

.clear-floor-motions-btn:hover {
  color: var(--danger);
}

.selected-motion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.sel-motion-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--primary-soft);
  border: 1px solid #93c5fd;
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 6px 3px 8px;
  border-radius: 999px;
  cursor: help;
  transition: all 0.16s ease;
}

.sel-motion-chip:hover {
  border-color: var(--primary);
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.14);
}

.chip-play {
  font-style: normal;
  font-size: 8px;
  opacity: 0.78;
}

.chip-del-btn {
  border: none;
  background: rgba(37, 99, 235, 0.12);
  color: var(--primary);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 9px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.chip-del-btn:hover {
  background: var(--danger);
  color: #ffffff;
}

.motion-picker-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px dashed var(--border-strong);
  background: #ffffff;
  color: var(--text-secondary);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.motion-picker-btn:hover,
.motion-picker-btn.is-open {
  border-style: solid;
  border-color: var(--primary);
  color: var(--primary);
  background: #f8faff;
}

.picker-chevron {
  font-style: normal;
  font-size: 11px;
}

.motion-multi-panel {
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-height: 216px;
  overflow-y: auto;
  padding: 5px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #bfdbfe;
  box-shadow: var(--shadow-sm);
}

.motion-opt-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-secondary);
  font-size: 11.5px;
  cursor: pointer;
  text-align: left;
  transition: all 0.14s ease;
}

.motion-opt-item:hover {
  background: #f1f5f9;
  color: var(--text);
}

.motion-opt-item.checked {
  background: var(--primary-soft);
  border-color: #bfdbfe;
  color: var(--primary);
  font-weight: 600;
}

.opt-check {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1px solid var(--border-strong);
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  color: #ffffff;
  flex-shrink: 0;
}

.motion-opt-item.checked .opt-check {
  background: var(--primary);
  border-color: var(--primary);
}

.opt-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
}

.opt-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.opt-play {
  font-style: normal;
  font-size: 8.5px;
  opacity: 0.4;
}

.motion-opt-item:hover .opt-play,
.motion-opt-item.checked .opt-play {
  opacity: 1;
  color: var(--primary);
}
</style>
