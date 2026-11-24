<script setup>
import { ref, reactive } from 'vue'
import { PAGE_PRESETS, ITEMS_BY_ID } from '../../data/index.js'
import { buildPresetPrompt } from '../../utils/promptBuilder.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'
import MotionTooltip from './MotionTooltip.vue'

const {
  pageTarget,
  applyPreset,
  openDrawer,
  openCompetitorModal,
  copyText
} = useCatalogStore()

const isCollapsed = ref(false)

const tooltipState = reactive({
  visible: false,
  title: '',
  tip: '',
  anim: 'scroll-enter',
  anchorRect: null
})

const SHORT_LAYOUT_LABELS = {
  'S-01': '左文右图首屏',
  'S-02': '三栏价值卡',
  'S-03': '左右交替图文',
  'S-04': '渠道矩阵墙',
  'S-05': '深色数据横幅',
  'S-06': '底部转化收口',
  'S-07': '居中大图首屏',
  'S-08': 'Bento 卡片格',
  'S-09': '优劣对比表',
  'S-10': '三步流程图',
  'S-11': '客户证言卡',
  'S-12': '套餐定价卡',
  'S-13': '多角色场景Tab',
  'S-14': 'FAQ 问答区'
}

const SHORT_MOTION_LABELS = {
  'M-01': '淡入上浮',
  'M-02': '错峰入场',
  'M-04': '轮换词',
  'M-05': '悬停微浮',
  'M-06': '边框扫光',
  'M-07': '封面轻缩放',
  'M-08': '平滑手风琴',
  'M-09': '滑块切换',
  'M-12': '数字递增',
  'M-13': '无缝跑马灯',
  'M-15': '自动读条轮播',
  'M-16': '流光汇聚',
  'M-17': 'AI 对话流'
}

const MOTION_ID_TO_ANIM = {
  'M-01': 'scroll-enter',
  'M-02': 'stagger-stream',
  'M-03': 'scroll-enter',
  'M-04': 'click-switch',
  'M-05': 'hover-react',
  'M-06': 'spotlight-glow',
  'M-07': 'hover-react',
  'M-08': 'smooth-expand',
  'M-09': 'click-switch',
  'M-10': 'pin-swap',
  'M-11': 'scroll-scrub',
  'M-12': 'number-bar',
  'M-13': 'loop-pulse',
  'M-14': 'loop-pulse',
  'M-15': 'auto-progress',
  'M-16': 'path-pulse',
  'M-17': 'stagger-stream'
}

function shortLayoutName(layoutId) {
  if (SHORT_LAYOUT_LABELS[layoutId]) return SHORT_LAYOUT_LABELS[layoutId]
  const item = ITEMS_BY_ID[layoutId]
  return item ? item.name.replace(/（.*?）/g, '') : layoutId
}

function shortMotionName(motionId) {
  if (SHORT_MOTION_LABELS[motionId]) return SHORT_MOTION_LABELS[motionId]
  const item = ITEMS_BY_ID[motionId]
  return item ? item.name : ''
}

function showPresetMotionTip(motionId, event) {
  if (!motionId || !event?.currentTarget) return
  const item = ITEMS_BY_ID[motionId]
  if (!item) return
  const r = event.currentTarget.getBoundingClientRect()
  tooltipState.title = `${item.code} ${item.name}`
  tooltipState.tip = item.shortPrompt
  tooltipState.anim = MOTION_ID_TO_ANIM[motionId] || 'scroll-enter'
  tooltipState.anchorRect = {
    top: r.top,
    bottom: r.bottom,
    left: r.left,
    width: r.width
  }
  tooltipState.visible = true
}

function hidePresetMotionTip() {
  tooltipState.visible = false
}

function handlePreviewPreset(presetId) {
  hidePresetMotionTip()
  applyPreset(presetId)
  openDrawer()
}

function handleCopyPreset(preset) {
  const prompt = buildPresetPrompt({
    preset,
    pageTarget: pageTarget.value,
    itemsById: ITEMS_BY_ID
  })
  copyText(prompt, `已复制「${preset.name}」完整参数话术`)
}
</script>

<template>
  <section class="preset-strip" aria-label="整页预设版式与动效套餐">
    <div class="strip-header">
      <div class="strip-title-group">
        <span class="strip-badge">⚡ 整页预设套餐</span>
        <h2 class="strip-title">一键套用现成版式 + 动效编排</h2>
        <span class="strip-sub">鼠标指着蓝色动效词可看小动画，点预览直接看整页骨架</span>
      </div>

      <div class="strip-header-actions">
        <button
          type="button"
          class="competitor-inline-btn"
          @click="openCompetitorModal()"
        >
          🔍 抄外部小站动效
        </button>
        <button
          type="button"
          class="collapse-btn"
          @click="isCollapsed = !isCollapsed"
        >
          {{ isCollapsed ? '展开 ▼' : '收起 ▲' }}
        </button>
      </div>
    </div>

    <div v-show="!isCollapsed" class="preset-grid">
      <article
        v-for="preset in PAGE_PRESETS"
        :key="preset.id"
        class="preset-card"
      >
        <div class="preset-card-top">
          <div class="preset-meta">
            <span class="preset-tag">{{ preset.tag || '整页方案' }}</span>
            <span class="preset-count">{{ preset.floors.length }} 屏编排</span>
          </div>
          <h3 class="preset-name">{{ preset.name }}</h3>
        </div>

        <div class="floor-chain" aria-label="包含楼层与动效">
          <span
            v-for="(fl, idx) in preset.floors"
            :key="fl.layoutId + '-' + idx"
            class="chain-pill"
            :class="{ 'has-motion': Boolean(fl.motionId) }"
            @mouseenter="showPresetMotionTip(fl.motionId, $event)"
            @mouseleave="hidePresetMotionTip()"
          >
            <b>{{ fl.layoutId }}</b>
            {{ shortLayoutName(fl.layoutId) }}
            <em v-if="fl.motionId">· {{ shortMotionName(fl.motionId) }}</em>
          </span>
        </div>

        <div class="preset-actions">
          <button
            type="button"
            class="preset-btn primary"
            @click="handlePreviewPreset(preset.id)"
          >
            🧩 预览整页动效
          </button>
          <button
            type="button"
            class="preset-btn ghost"
            @click="handleCopyPreset(preset)"
          >
            📋 复制套餐话术
          </button>
        </div>
      </article>
    </div>

    <MotionTooltip
      :visible="tooltipState.visible"
      :title="tooltipState.title"
      :tip="tooltipState.tip"
      :anim="tooltipState.anim"
      :anchor-rect="tooltipState.anchorRect"
    />
  </section>
</template>

<style scoped>
.preset-strip {
  background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
  border: 1px solid #dbeafe;
  border-radius: var(--radius-lg);
  padding: 16px 18px;
  margin-bottom: 30px;
  box-shadow: 0 4px 18px -6px rgba(37, 99, 235, 0.09);
}

.strip-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.strip-title-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.strip-badge {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  padding: 2px 9px;
  border-radius: 999px;
}

.strip-title {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text);
}

.strip-sub {
  font-size: 12.5px;
  color: var(--text-muted);
}

.strip-header-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.competitor-inline-btn {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4338ca;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.competitor-inline-btn:hover {
  background: #4338ca;
  border-color: #4338ca;
  color: #ffffff;
}

.collapse-btn {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
}

.collapse-btn:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.preset-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.preset-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.preset-card:hover {
  border-color: #93c5fd;
  box-shadow: var(--shadow-sm);
}

.preset-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.preset-tag {
  font-size: 11px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  padding: 1px 8px;
  border-radius: 999px;
}

.preset-count {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.preset-name {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text);
}

.floor-chain {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.chain-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: var(--text-secondary);
  background: var(--surface-soft);
  border: 1px solid var(--border);
  padding: 2px 7px;
  border-radius: 6px;
  transition: border-color 0.16s ease, background 0.16s ease;
}

.chain-pill.has-motion {
  cursor: help;
}

.chain-pill.has-motion:hover {
  border-color: #93c5fd;
  background: var(--primary-soft);
}

.chain-pill b {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: #047857;
  font-size: 10.5px;
}

.chain-pill em {
  font-style: normal;
  color: var(--primary);
  font-weight: 600;
}

.preset-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preset-btn {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.preset-btn.primary {
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #ffffff;
}

.preset-btn.primary:hover {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}

.preset-btn.ghost {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
}

.preset-btn.ghost:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}

@media (max-width: 860px) {
  .preset-grid {
    grid-template-columns: 1fr;
  }
}
</style>
