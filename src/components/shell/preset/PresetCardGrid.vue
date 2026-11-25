<script setup>
import { Layers, Copy } from 'lucide-vue-next'
import { PAGE_PRESETS, ITEMS_BY_ID } from '../../../data/index.js'

const emit = defineEmits(['preview-preset', 'copy-preset', 'hover-floor', 'leave-floor'])

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
</script>

<template>
  <div class="preset-grid">
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
          class="chain-pill has-motion"
          @mouseenter="emit('hover-floor', fl, idx, preset.floors.length, $event)"
          @mouseleave="emit('leave-floor')"
        >
          <b>{{ fl.layoutId }}</b>
          <span>{{ shortLayoutName(fl.layoutId) }}</span>
          <em v-if="fl.motionId">· {{ shortMotionName(fl.motionId) }}</em>
        </span>
      </div>

      <div class="preset-actions">
        <button
          type="button"
          class="preset-btn primary"
          @click="emit('preview-preset', preset.id)"
        >
          <Layers :size="13" :stroke-width="1.8" aria-hidden="true" />
          <span>预览整页动效</span>
        </button>
        <button
          type="button"
          class="preset-btn ghost"
          @click="emit('copy-preset', preset)"
        >
          <Copy :size="13" :stroke-width="1.8" aria-hidden="true" />
          <span>复制套餐话术</span>
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.preset-grid {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.preset-card {
  background: var(--surface-subtle, #f8fafc);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.preset-card:hover {
  background: var(--surface);
  border-color: var(--border-strong);
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
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1px 7px;
  border-radius: 5px;
}

.preset-count {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.preset-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.floor-chain {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.chain-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 8px;
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
  color: var(--text);
  font-size: 10.5px;
  font-weight: 600;
}

.chain-pill em {
  font-style: normal;
  color: var(--primary);
  font-weight: 500;
}

.preset-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preset-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 32px;
  padding: 0 12px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
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
  border-color: var(--border-strong);
  color: var(--text);
  background: var(--surface-soft);
}

@media (max-width: 860px) {
  .preset-grid {
    grid-template-columns: 1fr;
  }
}
</style>
