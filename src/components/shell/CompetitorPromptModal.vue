<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  COMPETITOR_SECTION_OPTIONS,
  COMPETITOR_TRIGGER_OPTIONS,
  COMPETITOR_VISUAL_OPTIONS
} from '../../utils/promptBuilder.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const {
  isCompetitorModalOpen,
  competitorDraft,
  competitorInspectPrompt,
  closeCompetitorModal,
  attachCompetitorToBlueprint,
  copyText
} = useCatalogStore()

const QUICK_EXAMPLES = [
  {
    label: '示例：Fin.ai 首屏对话流',
    sourceMode: 'url',
    competitorUrl: 'https://fin.ai',
    anchorText: 'Resolve complex queries',
    sectionArea: 'hero',
    triggers: ['scroll-enter'],
    visualFocus: ['stagger-stream'],
    extraNote: '只要它的气泡思考和弹出节奏，改成咱们白底浅蓝风格'
  },
  {
    label: '示例：Respond.io 渠道汇聚',
    sourceMode: 'url',
    competitorUrl: 'https://respond.io',
    anchorText: 'Capture conversations from every channel',
    sectionArea: 'flow-diagram',
    triggers: ['loop-pulse'],
    visualFocus: ['path-pulse'],
    extraNote: '参考左侧多渠道流向中间收件箱的连线流光'
  },
  {
    label: '示例：小众站滚动固定切图',
    sourceMode: 'url',
    competitorUrl: 'https://attio.com',
    anchorText: 'A CRM that adapts to your business',
    sectionArea: 'feature-demo',
    triggers: ['scroll-scrub', 'auto-progress'],
    visualFocus: ['pin-swap'],
    extraNote: '看它是怎么做到滚动时不生硬跳动的'
  }
]

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

function handleKeydown(e) {
  if (e.key === 'Escape' && isCompetitorModalOpen.value) {
    closeCompetitorModal()
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
    aria-label="参考外部网站动效生成 Agent 拆解话术"
    @click.self="closeCompetitorModal()"
  >
    <div class="modal-panel">
      <div class="modal-topbar">
        <div>
          <div class="modal-title">🔍 参考外部网站动效 → 生成 Agent 拆解话术</div>
          <p class="modal-sub">
            不用懂动效术语，哪怕是冷门小网站：填一句区块原文词，让 Agent 开内置浏览器连拍采样并先给你输出《中文动效确认单》。
          </p>
        </div>

        <button
          type="button"
          class="modal-close"
          aria-label="关闭弹窗"
          @click="closeCompetitorModal()"
        >
          ✕
        </button>
      </div>

      <div class="modal-body">
        <!-- Left Clue Form -->
        <div class="form-col">
          <div class="example-row">
            <span class="example-label">一键体验示例：</span>
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

          <div class="field-group">
            <span class="field-title">① 你手头有什么参考素材？</span>
            <div class="mode-switch" role="group" aria-label="参考素材来源">
              <button
                type="button"
                class="mode-btn"
                :class="{ active: competitorDraft.sourceMode === 'url' }"
                @click="competitorDraft.sourceMode = 'url'"
              >
                🌐 有参考网页链接（任意小网站均可）
              </button>
              <button
                type="button"
                class="mode-btn"
                :class="{ active: competitorDraft.sourceMode === 'screenshots' }"
                @click="competitorDraft.sourceMode = 'screenshots'"
              >
                🖼 只有录屏 / 前后对比截图
              </button>
            </div>
          </div>

          <div v-if="competitorDraft.sourceMode === 'url'" class="field-group two-inputs">
            <div>
              <label class="field-title" for="compUrlInput">② 参考网页链接（URL）</label>
              <input
                id="compUrlInput"
                v-model="competitorDraft.competitorUrl"
                type="url"
                class="text-input"
                placeholder="如 https://fin.ai 或任意小网站页面地址"
              />
            </div>

            <div>
              <label class="field-title" for="compAnchorInput">
                区块内一句原文词
                <span class="recommend-pill">防找错神器</span>
              </label>
              <input
                id="compAnchorInput"
                v-model="competitorDraft.anchorText"
                type="text"
                class="text-input"
                placeholder="直接从那个动效区块复制一句标题词粘贴到这里"
              />
            </div>
          </div>

          <div v-else class="screenshot-tip-box">
            📸 <b>多帧截图法（适合需登录、加载慢或刷社媒看到的动效）：</b>
            复制右侧话术发给 Codex / Cursor 时，同时在对话框粘贴 <b>「动之前 + 动到一半 + 动完后」2～3 张截图</b>，Agent 会逐帧对比位移与透明度变化。
          </div>

          <div class="field-group">
            <span class="field-title">③ 大概在页面的哪个模块？</span>
            <div class="pill-grid">
              <button
                v-for="sec in COMPETITOR_SECTION_OPTIONS"
                :key="sec.id"
                type="button"
                class="choice-pill"
                :class="{ active: competitorDraft.sectionArea === sec.id }"
                @click="competitorDraft.sectionArea = sec.id"
              >
                {{ sec.label }}
              </button>
            </div>
          </div>

          <div class="field-group">
            <span class="field-title">④ 它是怎么触发的？（可多选）</span>
            <div class="pill-grid">
              <button
                v-for="tr in COMPETITOR_TRIGGER_OPTIONS"
                :key="tr.id"
                type="button"
                class="choice-pill"
                :class="{ active: competitorDraft.triggers.includes(tr.id) }"
                @click="toggleMultiItem(competitorDraft.triggers, tr.id)"
              >
                {{ tr.label }}
              </button>
            </div>
          </div>

          <div class="field-group">
            <span class="field-title">⑤ 最吸引你的画面变化？（可多选）</span>
            <div class="pill-grid">
              <button
                v-for="vis in COMPETITOR_VISUAL_OPTIONS"
                :key="vis.id"
                type="button"
                class="choice-pill"
                :class="{ active: competitorDraft.visualFocus.includes(vis.id) }"
                @click="toggleMultiItem(competitorDraft.visualFocus, vis.id)"
              >
                {{ vis.label }}
              </button>
            </div>
          </div>

          <div class="field-group two-inputs">
            <div>
              <label class="field-title" for="compTargetInput">用于咱们官网哪个页面（可选）</label>
              <input
                id="compTargetInput"
                v-model="competitorDraft.targetPage"
                type="text"
                class="text-input"
                placeholder="如 /features/ai-agents"
              />
            </div>
            <div>
              <label class="field-title" for="compExtraInput">补充一句大白话（可选）</label>
              <input
                id="compExtraInput"
                v-model="competitorDraft.extraNote"
                type="text"
                class="text-input"
                placeholder="如：只要它的切换手感，配色换成官网蓝"
              />
            </div>
          </div>
        </div>

        <!-- Right Live Prompt Preview -->
        <div class="preview-col">
          <div class="workflow-steps">
            <span class="wf-step">1. 锚点锁死 DOM + 三帧采样</span>
            <span class="wf-arrow">→</span>
            <span class="wf-step">2. 输出 5 项中文规格单</span>
            <span class="wf-arrow">→</span>
            <span class="wf-step">3. 确认后落地官网</span>
          </div>

          <textarea
            class="inspect-textarea"
            readonly
            aria-label="生成的 Agent 浏览器拆解话术"
            :value="competitorInspectPrompt"
          />

          <div class="preview-actions">
            <button
              type="button"
              class="btn-primary copy-inspect-btn"
              @click="copyText(competitorInspectPrompt, '已复制外部网站拆解话术，可直接发给 Codex / Cursor')"
            >
              📋 一键复制「Agent 拆解话术」
            </button>
            <button
              type="button"
              class="attach-blueprint-btn"
              @click="attachCompetitorToBlueprint()"
            >
              ➕ 并入整页拼装预览
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 95;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}

.modal-panel {
  width: 100%;
  max-width: 1080px;
  max-height: 90vh;
  background: var(--surface);
  border-radius: 18px;
  border: 1px solid var(--border);
  box-shadow: 0 24px 56px -12px rgba(15, 23, 42, 0.28);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-topbar {
  padding: 16px 22px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
}

.modal-sub {
  font-size: 12.5px;
  color: var(--text-secondary);
  margin-top: 3px;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 15px;
  cursor: pointer;
  flex-shrink: 0;
}

.modal-close:hover {
  background: var(--surface-soft);
  color: var(--text);
}

.modal-body {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  overflow-y: auto;
}

.form-col {
  padding: 16px 20px 20px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 13px;
  overflow-y: auto;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--border);
}

.example-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-muted);
}

.example-chip {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4338ca;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.example-chip:hover {
  background: #4338ca;
  color: #ffffff;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.two-inputs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.field-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text);
}

.recommend-pill {
  font-size: 10px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  padding: 0 6px;
  border-radius: 999px;
}

.mode-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  background: var(--surface-soft);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.mode-btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  padding: 7px 8px;
  border-radius: 7px;
  cursor: pointer;
}

.mode-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.text-input {
  width: 100%;
  margin-top: 4px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 12.5px;
  color: var(--text);
  outline: none;
}

.text-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.screenshot-tip-box {
  background: var(--warn-soft);
  border: 1px solid #fde68a;
  color: #92400e;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.5;
}

.pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.choice-pill {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.choice-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.choice-pill.active {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--primary);
  font-weight: 700;
}

.preview-col {
  padding: 16px 20px 20px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.workflow-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

.wf-step {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 3px 8px;
  border-radius: 6px;
}

.wf-arrow {
  color: var(--text-muted);
}

.inspect-textarea {
  flex: 1;
  min-height: 310px;
  width: 100%;
  resize: none;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 12px;
  line-height: 1.55;
  color: var(--text);
}

.preview-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.copy-inspect-btn {
  flex: 1.3;
  padding: 9px 14px;
}

.attach-blueprint-btn {
  flex: 1;
  border: 1px solid #bfdbfe;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 9px;
  padding: 9px 12px;
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

@media (max-width: 880px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .form-col {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .two-inputs {
    grid-template-columns: 1fr;
  }
}
</style>
