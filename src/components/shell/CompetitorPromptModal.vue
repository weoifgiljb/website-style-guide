<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  COMPETITOR_SECTION_OPTIONS,
  COMPETITOR_TRIGGER_OPTIONS,
  COMPETITOR_VISUAL_OPTIONS
} from '../../utils/promptBuilder.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'
import MotionTooltip from './MotionTooltip.vue'

const {
  isCompetitorModalOpen,
  competitorDraft,
  competitorInspectPrompt,
  closeCompetitorModal,
  attachCompetitorToBlueprint,
  copyText
} = useCatalogStore()

const showRawPrompt = ref(false)

const tooltipState = reactive({
  visible: false,
  title: '',
  tip: '',
  anim: 'scroll-enter',
  anchorRect: null
})

const QUICK_EXAMPLES = [
  {
    label: 'Fin.ai 对话流',
    sourceMode: 'url',
    competitorUrl: 'https://fin.ai',
    anchorText: 'Resolve complex queries',
    sectionArea: 'hero',
    triggers: ['scroll-enter'],
    visualFocus: ['stagger-stream'],
    extraNote: '只要气泡弹出节奏，改成官网浅蓝风格'
  },
  {
    label: 'Respond.io 流光',
    sourceMode: 'url',
    competitorUrl: 'https://respond.io',
    anchorText: 'Capture conversations from every channel',
    sectionArea: 'flow-diagram',
    triggers: ['loop-pulse'],
    visualFocus: ['path-pulse'],
    extraNote: '参考多渠道流向中间收件箱的流光'
  },
  {
    label: '小众站滚动切图',
    sourceMode: 'url',
    competitorUrl: 'https://attio.com',
    anchorText: 'A CRM that adapts to your business',
    sectionArea: 'feature-demo',
    triggers: ['scroll-scrub', 'auto-progress'],
    visualFocus: ['pin-swap'],
    extraNote: '看它滚动时怎么做到不跳动'
  }
]

function showMotionTip(opt, event) {
  if (!opt.anim || !event?.currentTarget) return
  const r = event.currentTarget.getBoundingClientRect()
  tooltipState.title = opt.shortLabel
  tooltipState.tip = opt.tip
  tooltipState.anim = opt.anim
  tooltipState.anchorRect = {
    top: r.top,
    bottom: r.bottom,
    left: r.left,
    width: r.width
  }
  tooltipState.visible = true
}

function hideMotionTip() {
  tooltipState.visible = false
}

function toggleMultiItem(list, id) {
  const idx = list.indexOf(id)
  if (idx !== -1) {
    list.splice(idx, 1)
  } else {
    list.push(id)
  }
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
  hideMotionTip()
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
    <div class="modal-panel" @scroll.passive="hideMotionTip">
      <!-- Header -->
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

      <!-- Body -->
      <div class="modal-body" @scroll.passive="hideMotionTip">
        <!-- Quick Fill Bar -->
        <div class="example-row">
          <span class="example-label">试试填入：</span>
          <button
            v-for="ex in QUICK_EXAMPLES"
            :key="ex.label"
            type="button"
            class="example-chip"
            @click="applyExample(ex)"
          >
            {{ ex.label }}
          </button>
        </div>

        <!-- Step 1: Source -->
        <div class="step-card">
          <div class="step-head">
            <span class="step-title">① 参考来源</span>
            <div class="mode-pills" role="group" aria-label="素材方式">
              <button
                type="button"
                class="mode-pill"
                :class="{ active: competitorDraft.sourceMode === 'url' }"
                @click="competitorDraft.sourceMode = 'url'"
              >
                🌐 填网页链接
              </button>
              <button
                type="button"
                class="mode-pill"
                :class="{ active: competitorDraft.sourceMode === 'screenshots' }"
                @click="competitorDraft.sourceMode = 'screenshots'"
              >
                🖼 发录屏截图
              </button>
            </div>
          </div>

          <div v-if="competitorDraft.sourceMode === 'url'" class="two-cols">
            <div>
              <label class="mini-label" for="compUrlInput">参考网址</label>
              <input
                id="compUrlInput"
                v-model="competitorDraft.competitorUrl"
                type="url"
                class="text-input"
                placeholder="粘贴网址，如 https://fin.ai"
              />
            </div>

            <div>
              <label class="mini-label" for="compAnchorInput">
                那块的一句原文词
                <em class="tag-green">帮 AI 找准位置</em>
              </label>
              <input
                id="compAnchorInput"
                v-model="competitorDraft.anchorText"
                type="text"
                class="text-input"
                placeholder="复制那块的一句标题词粘贴进来"
              />
            </div>
          </div>

          <div v-else class="shot-banner">
            📸 复制话术发给 Agent 时，顺手贴上 <b>「动之前 + 动完后」2～3 张截图</b>，Agent 会自动对比分析。
          </div>
        </div>

        <!-- Step 2: Motion Feel with Hover Animated Tooltips -->
        <div class="step-card">
          <div class="step-head">
            <span class="step-title">② 选你看到的动效感觉</span>
            <span class="hover-hint">✨ 鼠标移到下方动效标签上可看实时演示</span>
          </div>

          <div class="option-row">
            <span class="row-label">在哪个位置</span>
            <div class="pill-wrap">
              <button
                v-for="sec in COMPETITOR_SECTION_OPTIONS"
                :key="sec.id"
                type="button"
                class="choice-pill"
                :class="{ active: competitorDraft.sectionArea === sec.id }"
                @click="competitorDraft.sectionArea = sec.id"
              >
                {{ sec.shortLabel }}
              </button>
            </div>
          </div>

          <div class="option-row">
            <span class="row-label">怎么触发的</span>
            <div class="pill-wrap">
              <button
                v-for="tr in COMPETITOR_TRIGGER_OPTIONS"
                :key="tr.id"
                type="button"
                class="choice-pill has-anim"
                :class="{ active: competitorDraft.triggers.includes(tr.id) }"
                @mouseenter="showMotionTip(tr, $event)"
                @mouseleave="hideMotionTip()"
                @focus="showMotionTip(tr, $event)"
                @blur="hideMotionTip()"
                @click="toggleMultiItem(competitorDraft.triggers, tr.id)"
              >
                <i class="play-dot">▶</i>
                <span>{{ tr.shortLabel }}</span>
              </button>
            </div>
          </div>

          <div class="option-row">
            <span class="row-label">什么效果</span>
            <div class="pill-wrap">
              <button
                v-for="vis in COMPETITOR_VISUAL_OPTIONS"
                :key="vis.id"
                type="button"
                class="choice-pill has-anim"
                :class="{ active: competitorDraft.visualFocus.includes(vis.id) }"
                @mouseenter="showMotionTip(vis, $event)"
                @mouseleave="hideMotionTip()"
                @focus="showMotionTip(vis, $event)"
                @blur="hideMotionTip()"
                @click="toggleMultiItem(competitorDraft.visualFocus, vis.id)"
              >
                <i class="play-dot">▶</i>
                <span>{{ vis.shortLabel }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Optional Target & Note -->
        <div class="two-cols compact-extra">
          <div>
            <label class="mini-label" for="compTargetInput">用于哪个官网页（选填）</label>
            <input
              id="compTargetInput"
              v-model="competitorDraft.targetPage"
              type="text"
              class="text-input"
              placeholder="如 /features/ai-agents"
            />
          </div>
          <div>
            <label class="mini-label" for="compExtraInput">补充要求（选填）</label>
            <input
              id="compExtraInput"
              v-model="competitorDraft.extraNote"
              type="text"
              class="text-input"
              placeholder="如：改成官网白底蓝字"
            />
          </div>
        </div>

        <!-- Collapsible Raw Prompt (Hidden by default so UI stays super clean!) -->
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

      <!-- Footer -->
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
      :tip="tooltipState.tip"
      :anim="tooltipState.anim"
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

.example-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.example-label {
  font-size: 12px;
  color: var(--text-muted);
}

.example-chip {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4338ca;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.example-chip:hover {
  background: #4338ca;
  color: #ffffff;
}

.step-card {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.step-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}

.hover-hint {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  padding: 2px 9px;
  border-radius: 999px;
}

.mode-pills {
  display: inline-flex;
  background: #e2e8f0;
  padding: 2px;
  border-radius: 8px;
}

.mode-pill {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.mode-pill.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.two-cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.mini-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.tag-green {
  font-style: normal;
  font-size: 10px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  padding: 0 6px;
  border-radius: 999px;
}

.text-input {
  width: 100%;
  margin-top: 4px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 12.5px;
  color: var(--text);
  outline: none;
}

.text-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.shot-banner {
  background: var(--warn-soft);
  border: 1px solid #fde68a;
  color: #92400e;
  border-radius: 9px;
  padding: 8px 11px;
  font-size: 12px;
}

.option-row {
  display: grid;
  grid-template-columns: 74px 1fr;
  align-items: center;
  gap: 8px;
}

.row-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.pill-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.choice-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.choice-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
}

.choice-pill.active {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--primary);
  font-weight: 700;
}

.play-dot {
  font-style: normal;
  font-size: 8.5px;
  opacity: 0.55;
}

.choice-pill:hover .play-dot,
.choice-pill.active .play-dot {
  opacity: 1;
  color: var(--primary);
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
  .two-cols {
    grid-template-columns: 1fr;
  }

  .option-row {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }
}
</style>
