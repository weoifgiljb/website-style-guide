<script setup>
import { X, Layers, Copy } from 'lucide-vue-next'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const {
  selectedIds,
  floorOrder,
  selectedItems,
  selectedMotionCount,
  generatedPrompt,
  removeItem,
  clearSelection,
  openDrawer,
  copyText
} = useCatalogStore()
</script>

<template>
  <div
    class="combo-bar"
    :class="{ show: selectedIds.length > 0 }"
    :inert="selectedIds.length === 0"
  >
    <div class="combo-left">
      <div class="combo-title">
        <span>
          已选 {{ selectedIds.length }} 项（{{ floorOrder.length }} 个版式楼层 · {{ selectedMotionCount }} 个动效）
        </span>
        <span v-if="selectedMotionCount > 3" class="combo-warn">
          建议单页重点动效控制在 1～3 个以内
        </span>
      </div>

      <div class="combo-tags">
        <span
          v-for="item in selectedItems"
          :key="item.id"
          class="combo-tag"
        >
          <span>{{ item.code }} {{ item.name }}</span>
          <button
            type="button"
            class="tag-remove"
            :aria-label="'移除 ' + item.name"
            @click="removeItem(item.id)"
          >
            <X :size="12" :stroke-width="2" aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>

    <div class="combo-actions">
      <button type="button" class="btn-ghost" @click="clearSelection()">
        清空
      </button>
      <button type="button" class="btn-blueprint" @click="openDrawer()">
        <Layers :size="14" :stroke-width="1.8" aria-hidden="true" />
        <span>预览整页骨架</span>
      </button>
      <button
        type="button"
        class="btn-primary"
        @click="copyText(generatedPrompt, '已复制 ' + selectedIds.length + ' 项组合需求话术')"
      >
        <Copy :size="14" :stroke-width="1.8" aria-hidden="true" />
        <span>一键复制给 Codex 话术</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.combo-bar {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translate(-50%, 140%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 40;
  width: min(920px, calc(100% - 28px));
  background: rgba(15, 23, 42, 0.96);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 20px 40px -8px rgba(15, 23, 42, 0.36);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  transition:
    transform 0.28s var(--ease),
    opacity 0.22s ease,
    visibility 0s linear 0.28s;
}

.combo-bar.show {
  transform: translate(-50%, 0);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition:
    transform 0.28s var(--ease),
    opacity 0.22s ease,
    visibility 0s linear 0s;
}

.combo-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 320px;
  min-width: 220px;
}

.combo-title {
  font-size: 12.5px;
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.combo-warn {
  font-size: 11.5px;
  color: #fcd34d;
  font-weight: 500;
}

.combo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-height: 58px;
  overflow-y: auto;
}

.combo-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2px 6px 2px 8px;
  border-radius: 6px;
  color: #f8fafc;
}

.tag-remove {
  border: none;
  background: transparent;
  color: #94a3b8;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.16s ease, background 0.16s ease;
}

.tag-remove:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
}

.combo-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.btn-blueprint {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease;
}

.btn-blueprint:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.36);
}
</style>
