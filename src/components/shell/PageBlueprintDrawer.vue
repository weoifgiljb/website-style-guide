<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  PAGE_PRESETS,
  LAYOUT_ITEMS,
  MOTION_ITEMS,
  ITEMS_BY_ID
} from '../../data/index.js'
import { DEMO_COMPONENTS } from '../demos/index.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'
import BlueprintFloorPreview from './BlueprintFloorPreview.vue'

const {
  floorOrder,
  floorMotionMap,
  selectedItems,
  pageTarget,
  isDrawerOpen,
  previewViewport,
  generatedPrompt,
  removeItem,
  moveFloorUp,
  moveFloorDown,
  setFloorMotion,
  addFloor,
  applyPreset,
  clearSelection,
  closeDrawer,
  setPreviewViewport,
  copyText
} = useCatalogStore()

const previewReplayKey = ref(0)
const canvasScrollRatio = ref(0)

const unselectedLayouts = computed(() =>
  LAYOUT_ITEMS.filter((item) => !floorOrder.value.includes(item.id))
)

const boundMotionIds = computed(() => {
  const ids = new Set()
  floorOrder.value.forEach((layoutId) => {
    const motionId = floorMotionMap[layoutId]
    if (motionId) ids.add(motionId)
  })
  return ids
})

const unboundSelectedMotions = computed(() =>
  (selectedItems.value || []).filter(
    (item) => item.kind === 'motion' && !boundMotionIds.value.has(item.id)
  )
)

const previewUrl = computed(() => {
  const raw = pageTarget.value.trim()
  if (!raw) return 'https://salesmartly.com/features/new-page'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  const pathPart = raw.startsWith('/') ? raw : `/${raw}`
  return `https://salesmartly.com${pathPart}`
})

const isPromptExpanded = ref(true)
let previousBodyOverflow = ''
let isBodyLocked = false

function lockBodyScroll(locked) {
  if (typeof document === 'undefined' || !document.body) return
  if (locked && !isBodyLocked) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    isBodyLocked = true
  } else if (!locked && isBodyLocked) {
    document.body.style.overflow = previousBodyOverflow || ''
    isBodyLocked = false
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isDrawerOpen.value) {
    closeDrawer()
  }
}

function handleAddFloorSelect(event) {
  const layoutId = event.target.value
  if (layoutId) {
    addFloor(layoutId)
    event.target.value = ''
  }
}

function handleApplyPreset(presetId) {
  applyPreset(presetId)
  previewReplayKey.value += 1
}

function clearUnboundMotions() {
  const ids = unboundSelectedMotions.value.map((item) => item.id)
  ids.forEach((id) => removeItem(id))
}

function handleCanvasScroll(event) {
  const el = event.currentTarget
  if (!el) return
  const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight)
  canvasScrollRatio.value = Math.min(1, Math.max(0, el.scrollTop / maxScroll))
}

watch(previewViewport, () => {
  previewReplayKey.value += 1
})

watch(
  isDrawerOpen,
  (open) => {
    lockBodyScroll(open)
    if (open) {
      canvasScrollRatio.value = 0
      previewReplayKey.value += 1
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  lockBodyScroll(false)
})
</script>

<template>
  <div
    v-if="isDrawerOpen"
    class="drawer-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="整页骨架拼装预览与楼层话术生成器"
    @click.self="closeDrawer()"
  >
    <div class="drawer-panel">
      <!-- Top Bar -->
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
              @click="handleApplyPreset(preset.id)"
            >
              {{ preset.name }}
            </button>
          </div>

          <button
            type="button"
            class="drawer-close"
            aria-label="关闭抽屉"
            @click="closeDrawer()"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Two-Column Body -->
      <div class="drawer-body">
        <!-- Left Orchestrator Column -->
        <aside class="orchestrator-col">
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
                  @click="handleApplyPreset('standard-feature')"
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

                <div class="floor-motion-row">
                  <label
                    class="motion-select-label"
                    :for="'floor-motion-' + layoutId"
                  >搭配本屏动效（可选）</label>
                  <select
                    :id="'floor-motion-' + layoutId"
                    class="motion-select"
                    :value="floorMotionMap[layoutId] || ''"
                    @change="setFloorMotion(layoutId, $event.target.value)"
                  >
                    <option value="">不单独指定动效</option>
                    <option
                      v-for="m in MOTION_ITEMS"
                      :key="m.id"
                      :value="m.id"
                    >
                      {{ m.code }} {{ m.name }}
                    </option>
                  </select>
                </div>
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

          <div class="field-block prompt-preview-block">
            <div class="prompt-header-row">
              <label class="field-label" for="generatedPromptArea">③ 实时生成的 Codex 需求话术</label>
              <button
                type="button"
                class="toggle-prompt-btn"
                @click="isPromptExpanded = !isPromptExpanded"
              >
                {{ isPromptExpanded ? '收起预览 ▲' : '展开预览 ▼' }}
              </button>
            </div>
            <textarea
              v-show="isPromptExpanded"
              id="generatedPromptArea"
              class="prompt-textarea"
              readonly
              :value="generatedPrompt"
            />
            <button
              type="button"
              class="btn-primary copy-full-btn"
              @click="copyText(generatedPrompt, '已复制完整楼层话术')"
            >
              📋 一键复制完整楼层话术
            </button>
          </div>
        </aside>

        <!-- Right Live Blueprint Canvas -->
        <section class="canvas-col">
          <div class="canvas-toolbar">
            <div class="viewport-tabs">
              <button
                type="button"
                class="vp-btn"
                :class="{ active: previewViewport === 'desktop' }"
                @click="setPreviewViewport('desktop')"
              >
                💻 桌面端 1280px
              </button>
              <button
                type="button"
                class="vp-btn"
                :class="{ active: previewViewport === 'mobile' }"
                @click="setPreviewViewport('mobile')"
              >
                📱 手机端 390px
              </button>
            </div>

            <div class="canvas-toolbar-right">
              <button
                type="button"
                class="replay-all-btn"
                @click="previewReplayKey++"
              >
                ↻ 重播整页动效
              </button>
              <span class="canvas-summary">
                共 {{ floorOrder.length }} 屏<template v-if="unboundSelectedMotions.length > 0"> · {{ unboundSelectedMotions.length }} 项独立动效</template> · 实时响应式骨架
              </span>
            </div>
          </div>

          <div class="canvas-stage" @scroll="handleCanvasScroll">
            <div
              class="device-frame"
              :class="previewViewport === 'mobile' ? 'is-phone' : 'is-browser'"
            >
              <!-- Browser header or Phone dynamic notch -->
              <div v-if="previewViewport === 'desktop'" class="browser-chrome">
                <div class="traffic-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-address">{{ previewUrl }}</div>
              </div>
              <div v-else class="phone-bezel-top">
                <div class="phone-notch"></div>
              </div>

              <!-- Mock Navbar -->
              <div class="mock-navbar" :class="{ 'is-mobile': previewViewport === 'mobile' }">
                <span class="mock-brand">SaleSmartly · Logo</span>
                <div v-if="previewViewport === 'desktop'" class="mock-nav-links">
                  <span>功能</span>
                  <span>方案</span>
                  <span>定价</span>
                  <span class="mock-nav-cta">免费试用</span>
                </div>
                <div v-else class="mock-nav-mobile-right">
                  <span class="mock-nav-cta">免费试用</span>
                  <span class="mock-burger">☰</span>
                </div>
              </div>

              <!-- Stacked Floors & Standalone Motions -->
              <div class="mock-page-body">
                <div
                  v-if="floorOrder.length === 0 && unboundSelectedMotions.length === 0"
                  class="canvas-empty"
                >
                  请在左侧选择预设模板或添加版式楼层，这里会实时拼出整页骨架。
                </div>

                <template v-for="(layoutId, idx) in floorOrder" :key="layoutId">
                  <BlueprintFloorPreview
                    v-if="ITEMS_BY_ID[layoutId]"
                    :floor-index="idx"
                    :layout-item="ITEMS_BY_ID[layoutId]"
                    :motion-item="
                      floorMotionMap[layoutId] && ITEMS_BY_ID[floorMotionMap[layoutId]]
                        ? ITEMS_BY_ID[floorMotionMap[layoutId]]
                        : null
                    "
                    :viewport="previewViewport"
                    :replay-key="previewReplayKey"
                    :scroll-ratio="canvasScrollRatio"
                  />
                </template>

                <div
                  v-if="unboundSelectedMotions.length > 0"
                  class="standalone-motions-section"
                >
                  <div class="standalone-motions-head">
                    <span>✨ 已选独立动效实时预览（可在左侧绑定到具体楼层）</span>
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
                          ✕
                        </button>
                      </div>
                      <div class="stage">
                        <component
                          :is="DEMO_COMPONENTS[m.demoKey]"
                          v-if="DEMO_COMPONENTS[m.demoKey]"
                          :viewport="previewViewport"
                          :replay-tick="previewReplayKey"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mock Footer -->
              <div class="mock-footer" :class="{ 'is-mobile': previewViewport === 'mobile' }">
                <span>© SaleSmartly 全渠道客户沟通平台</span>
                <span>产品 · 解决方案 · 帮助中心 · 隐私政策</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
}

.drawer-panel {
  width: min(1240px, 96vw);
  height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  box-shadow: -16px 0 40px rgba(15, 23, 42, 0.22);
  overflow: hidden;
}

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

.drawer-body {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

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

.floor-motion-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.motion-select-label {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
}

.motion-select {
  padding: 5px 8px;
  font-size: 11.5px;
}

.add-floor-select {
  background: var(--primary-soft);
  border-color: #bfdbfe;
  color: var(--primary);
  font-weight: 600;
}

.prompt-preview-block {
  margin-top: auto;
}

.prompt-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
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

.prompt-textarea {
  width: 100%;
  min-height: 148px;
  resize: vertical;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: #f8fafc;
  color: var(--text);
  font-size: 12px;
  line-height: 1.5;
}

.copy-full-btn {
  width: 100%;
  padding: 10px 14px;
  font-size: 13px;
}

.canvas-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.canvas-toolbar {
  padding: 10px 20px;
  background: #f1f5f9;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.viewport-tabs {
  display: inline-flex;
  background: #e2e8f0;
  padding: 3px;
  border-radius: 9px;
  gap: 4px;
}

.vp-btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 7px;
  cursor: pointer;
}

.vp-btn.active {
  background: #ffffff;
  color: var(--text);
  box-shadow: var(--shadow-sm);
}

.canvas-toolbar-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.replay-all-btn {
  border: 1px solid #bfdbfe;
  background: #ffffff;
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.replay-all-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.canvas-summary {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.canvas-stage {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.device-frame {
  background: #ffffff;
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: width 0.25s var(--ease);
}

.device-frame.is-browser {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
}

.device-frame.is-phone {
  width: 402px;
  max-width: 100%;
  border: 6px solid #1e293b;
  border-radius: 30px;
}

.browser-chrome {
  background: #f1f5f9;
  border-bottom: 1px solid var(--border);
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.traffic-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #f87171; }
.dot.yellow { background: #fbbf24; }
.dot.green { background: #34d399; }

.browser-address {
  flex: 1;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 11.5px;
  color: var(--text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.phone-bezel-top {
  background: #ffffff;
  padding: 7px 0 4px;
  display: flex;
  justify-content: center;
}

.phone-notch {
  width: 88px;
  height: 14px;
  border-radius: 999px;
  background: #0f172a;
}

.mock-navbar {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.mock-brand {
  font-weight: 700;
  color: var(--text);
}

.mock-nav-links {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-secondary);
}

.mock-nav-mobile-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mock-nav-cta {
  background: var(--primary);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
}

.mock-burger {
  font-size: 14px;
  color: var(--text-secondary);
}

.mock-page-body {
  padding: 14px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.canvas-empty {
  text-align: center;
  padding: 48px 16px;
  color: var(--text-muted);
  font-size: 13px;
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

.mock-footer {
  padding: 12px 16px;
  background: #0f172a;
  color: #94a3b8;
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.mock-footer.is-mobile {
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .drawer-body {
    flex-direction: column;
    overflow-y: auto;
  }

  .orchestrator-col {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border);
    overflow-y: visible;
  }

  .canvas-col {
    overflow: visible;
  }
}
</style>
