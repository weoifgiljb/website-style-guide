<script setup>
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
  <div class="combo-bar" :class="{ show: selectedIds.length > 0 }">
    <div class="combo-left">
      <div class="combo-title">
        <span>
          已选 {{ selectedIds.length }} 项（{{ floorOrder.length }} 个版式楼层 · {{ selectedMotionCount }} 个动效）
        </span>
        <span v-if="selectedMotionCount > 3" class="combo-warn">
          （建议单页重点动效控制在 1～3 个以内，更显克制）
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
            ×
          </button>
        </span>
      </div>
    </div>

    <div class="combo-actions">
      <button type="button" class="btn-ghost" @click="clearSelection()">
        清空
      </button>
      <button type="button" class="btn-blueprint" @click="openDrawer()">
        🧩 预览整页骨架
      </button>
      <button
        type="button"
        class="btn-primary"
        @click="copyText(generatedPrompt, '已复制 ' + selectedIds.length + ' 项组合需求话术')"
      >
        一键复制给 Codex 话术
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
  pointer-events: none;
  z-index: 40;
  width: min(920px, calc(100% - 28px));
  background: #0f172a;
  color: #ffffff;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.36);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  transition: transform 0.3s var(--ease), opacity 0.25s ease;
}

.combo-bar.show {
  transform: translate(-50%, 0);
  opacity: 1;
  pointer-events: auto;
}

.combo-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 320px;
  min-width: 220px;
}

.combo-title {
  font-size: 13px;
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.combo-warn {
  font-size: 11.5px;
  color: #fcd34d;
  font-weight: 500;
}

.combo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 58px;
  overflow-y: auto;
}

.combo-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  background: rgba(255, 255, 255, 0.14);
  padding: 2px 8px;
  border-radius: 999px;
  color: #f8fafc;
}

.tag-remove {
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  padding: 0 2px;
}

.tag-remove:hover {
  color: #ffffff;
}

.combo-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.btn-blueprint {
  border: 1px solid rgba(96, 165, 250, 0.55);
  background: rgba(37, 99, 235, 0.22);
  color: #bfdbfe;
  padding: 7px 13px;
  border-radius: 9px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.btn-blueprint:hover {
  background: rgba(37, 99, 235, 0.38);
  border-color: #93c5fd;
  color: #ffffff;
}
</style>
