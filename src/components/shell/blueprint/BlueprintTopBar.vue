<script setup>
import { PAGE_PRESETS } from '../../../data/index.js'

const emit = defineEmits(['apply-preset', 'close'])
</script>

<template>
      <div class="drawer-topbar">
        <div class="drawer-title">
          🧩 整页骨架拼装预览 & 楼层话术生成器
        </div>

        <div class="drawer-top-actions">
          <div class="quick-presets">
            <span class="quick-preset-label">快速预设：</span>
            <button
              v-for="preset in PAGE_PRESETS"
              :key="preset.id"
              type="button"
              class="preset-mini-btn"
              @click="emit('apply-preset', preset.id)"
            >
              {{ preset.name }}
            </button>
          </div>

          <button
            type="button"
            class="drawer-close"
            aria-label="关闭抽屉"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>
      </div>
</template>

<style scoped>
.drawer-topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 13px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.drawer-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
}

.drawer-top-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.quick-presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.quick-preset-label {
  font-size: 12px;
  color: var(--text-muted);
}

.preset-mini-btn {
  border: 1px solid var(--border);
  background: var(--surface-soft);
  color: var(--text-secondary);
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.preset-mini-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}

.drawer-close {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.drawer-close:hover {
  background: var(--danger-soft);
  border-color: #fca5a5;
  color: var(--danger);
}
</style>
