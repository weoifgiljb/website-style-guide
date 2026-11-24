<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCatalogStore } from '../../composables/useCatalogStore.js'
import { useAnchoredTooltip } from '../../composables/useAnchoredTooltip.js'
import MotionTooltip from './MotionTooltip.vue'
import CompetitorSourceForm from './competitor/CompetitorSourceForm.vue'
import CompetitorOptionPicker from './competitor/CompetitorOptionPicker.vue'

const {
  isCompetitorModalOpen,
  competitorDraft,
  competitorInspectPrompt,
  closeCompetitorModal,
  attachCompetitorToBlueprint,
  copyText
} = useCatalogStore()

const { tooltipState, showTooltip, hideTooltip } = useAnchoredTooltip()
const showRawPrompt = ref(false)

function showMotionTip(opt, event) {
  if (!opt?.anim) return
  showTooltip({
    title: opt.shortLabel,
    badge: opt.whereTag || '',
    tip: opt.tip,
    anim: opt.anim,
    currentTarget: event?.currentTarget
  })
}

function applyExample(ex) {
  competitorDraft.sourceMode = ex.sourceMode
  competitorDraft.competitorUrl = ex.competitorUrl
  competitorDraft.anchorText = ex.anchorText
  competitorDraft.sectionArea = ex.sectionArea
  competitorDraft.triggers = [...ex.triggers]
  competitorDraft.visualFocus = [...ex.visualFocus]
  competitorDraft.extraNote = ex.extraNote
}

function handleClose() {
  hideTooltip()
  closeCompetitorModal()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isCompetitorModalOpen.value) {
    handleClose()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div
    v-if="isCompetitorModalOpen"
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="参考外部网站动效"
    @click.self="handleClose()"
  >
    <div class="modal-panel" @scroll.passive="hideTooltip">
      <div class="modal-topbar">
        <div class="topbar-main">
          <div class="modal-title">🔍 抄外部网站动效</div>
          <span class="modal-sub">填链接 + 鼠标悬停标签看动画选感觉，复制发给 Agent 自动拆解</span>
        </div>

        <button
          type="button"
          class="modal-close"
          aria-label="关闭弹窗"
          @click="handleClose()"
        >
          ✕
        </button>
      </div>

      <div class="modal-body" @scroll.passive="hideTooltip">
        <CompetitorSourceForm @apply-example="applyExample" />
        <CompetitorOptionPicker
          @hover-option="showMotionTip"
          @leave-option="hideTooltip"
        />
        <div class="raw-prompt-box">
          <button
            type="button"
            class="raw-toggle-btn"
            @click="showRawPrompt = !showRawPrompt"
          >
            <span>🤖 发给 Agent 后：它会先开浏览器看网页 → 用大白话跟你确认效果 → 你点头后再写代码</span>
            <em>{{ showRawPrompt ? '收起话术 ▲' : '查看话术 ▼' }}</em>
          </button>

          <textarea
            v-if="showRawPrompt"
            class="inspect-textarea"
            readonly
            aria-label="生成的 Agent 浏览器拆解话术"
            :value="competitorInspectPrompt"
          />
        </div>
      </div>

      <div class="modal-footer">
        <button
          type="button"
          class="attach-blueprint-btn"
          @click="attachCompetitorToBlueprint()"
        >
          ➕ 并入整页拼装
        </button>
        <button
          type="button"
          class="btn-primary copy-inspect-btn"
          @click="copyText(competitorInspectPrompt, '已复制拆解话术，直接粘贴给 Codex / Cursor 即可')"
        >
          📋 一键复制给 Agent
        </button>
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
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 95;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-panel {
  width: 100%;
  max-width: 780px;
  max-height: 92vh;
  background: var(--surface);
  border-radius: 18px;
  border: 1px solid var(--border);
  box-shadow: 0 24px 56px -12px rgba(15, 23, 42, 0.28);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-topbar {
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.topbar-main {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
}

.modal-title {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--text);
}

.modal-sub {
  font-size: 12px;
  color: var(--text-muted);
}

.modal-close {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
}

.modal-close:hover {
  background: var(--surface-soft);
  color: var(--text);
}

.modal-body {
  padding: 12px 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.raw-prompt-box {
  border: 1px dashed var(--border-strong);
  border-radius: 10px;
  background: #f8fafc;
  overflow: hidden;
}

.raw-toggle-btn {
  width: 100%;
  border: none;
  background: transparent;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 11.5px;
  color: var(--text-secondary);
  cursor: pointer;
  text-align: left;
}

.raw-toggle-btn em {
  font-style: normal;
  font-weight: 600;
  color: var(--primary);
  white-space: nowrap;
}

.inspect-textarea {
  width: 100%;
  height: 150px;
  resize: vertical;
  border: none;
  border-top: 1px solid var(--border);
  padding: 10px 12px;
  background: var(--surface);
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.modal-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.copy-inspect-btn {
  padding: 9px 20px;
  font-size: 13px;
}

.attach-blueprint-btn {
  border: 1px solid #bfdbfe;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 9px;
  padding: 9px 15px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.attach-blueprint-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

@media (max-width: 640px) {
  .modal-footer {
    flex-direction: column-reverse;
  }
}
</style>
