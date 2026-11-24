<script setup>
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

const { attachedCompetitorRef, openCompetitorModal, clearCompetitorRef } = useCatalogStore()
</script>

<template>
  <div class="field-block competitor-ref-block">
    <div class="field-header">
      <span class="field-label">外部网站动效参考（可选）</span>
      <button
        type="button"
        class="toggle-prompt-btn"
        @click="openCompetitorModal()"
      >
        {{ attachedCompetitorRef ? '编辑线索' : '+ 附加外部参考' }}
      </button>
    </div>

    <div v-if="attachedCompetitorRef" class="attached-ref-card">
      <div class="attached-ref-main">
        <span class="attached-ref-tag">
          {{ attachedCompetitorRef.sourceMode === 'screenshots' ? '📸 多帧截图' : '🌐 外部网页' }}
        </span>
        <span class="attached-ref-text">
          {{ attachedCompetitorRef.competitorUrl || attachedCompetitorRef.anchorText || '已配置视觉差值拆解要求' }}
        </span>
      </div>
      <button
        type="button"
        class="icon-btn danger"
        title="移除外部网站参考"
        @click="clearCompetitorRef()"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
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

.toggle-prompt-btn {
  border: none;
  background: transparent;
  color: var(--primary);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 4px;
}

.toggle-prompt-btn:hover {
  text-decoration: underline;
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

.icon-btn.danger:hover {
  border-color: #fca5a5;
  color: var(--danger);
  background: var(--danger-soft);
}

.attached-ref-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 9px;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
}

.attached-ref-main {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.attached-ref-tag {
  font-size: 10.5px;
  font-weight: 700;
  color: #4338ca;
  background: #ffffff;
  padding: 1px 6px;
  border-radius: 999px;
  flex-shrink: 0;
}

.attached-ref-text {
  font-size: 11.5px;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
