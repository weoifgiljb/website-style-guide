<script setup>
import { ref } from 'vue'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { ITEMS_BY_ID } from '../../data/index.js'
import { buildPresetPrompt, MOTION_TOOLTIP_ANIM_MAP } from '../../utils/promptBuilder.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'
import { useAnchoredTooltip } from '../../composables/useAnchoredTooltip.js'
import MotionTooltip from './MotionTooltip.vue'
import PresetCardGrid from './preset/PresetCardGrid.vue'

const {
  pageTarget,
  applyPreset,
  openDrawer,
  copyText
} = useCatalogStore()

const isCollapsed = ref(true)
const { tooltipState, showTooltip, hideTooltip } = useAnchoredTooltip()

const LAYOUT_ID_TO_SEC = {
  'S-01': 'sec-hero',
  'S-02': 'sec-bento',
  'S-03': 'sec-feature',
  'S-04': 'sec-flow',
  'S-05': 'sec-bento',
  'S-06': 'sec-hero',
  'S-07': 'sec-hero',
  'S-08': 'sec-bento',
  'S-09': 'sec-bento',
  'S-10': 'sec-flow',
  'S-11': 'sec-bento',
  'S-12': 'sec-bento',
  'S-13': 'sec-tabs',
  'S-14': 'sec-tabs'
}

function shortLayoutName(layoutId) {
  const item = ITEMS_BY_ID[layoutId]
  return item ? item.name.replace(/（.*?）/g, '') : layoutId
}

function showPresetFloorTip(fl, floorIndex, totalFloors, event) {
  const layoutItem = ITEMS_BY_ID[fl.layoutId]
  const motionItem = fl.motionId ? ITEMS_BY_ID[fl.motionId] : null

  if (motionItem) {
    showTooltip({
      title: `${motionItem.code} ${motionItem.name}`,
      badge: `第 ${floorIndex + 1}/${totalFloors} 屏 · ${shortLayoutName(fl.layoutId)}`,
      tip: motionItem.shortPrompt,
      anim: MOTION_TOOLTIP_ANIM_MAP[fl.motionId] || 'scroll-enter',
      currentTarget: event?.currentTarget
    })
    return
  }
  if (!layoutItem) return
  showTooltip({
    title: `${layoutItem.code} ${shortLayoutName(fl.layoutId)}`,
    badge: `第 ${floorIndex + 1}/${totalFloors} 屏位置`,
    tip: layoutItem.scene || layoutItem.prompt,
    anim: LAYOUT_ID_TO_SEC[fl.layoutId] || 'sec-feature',
    currentTarget: event?.currentTarget
  })
}

function handlePreviewPreset(presetId) {
  hideTooltip()
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
  <section
    class="preset-strip"
    :class="{ 'is-collapsed': isCollapsed }"
    aria-label="整页预设版式与动效套餐"
  >
    <div class="strip-header">
      <button
        type="button"
        class="strip-trigger"
        :aria-expanded="!isCollapsed"
        @click="isCollapsed = !isCollapsed"
      >
        <span class="strip-lead">
          <Sparkles :size="14" :stroke-width="1.8" class="strip-icon" aria-hidden="true" />
          <span class="strip-title">现成版式编排</span>
          <span class="strip-sep" aria-hidden="true">·</span>
          <span class="strip-sub">
            {{ isCollapsed ? '内置常规功能页、AI 旗舰页等 4 套多屏方案，可一键载入预览' : '悬停楼层标签可预览位置与动效，点击直接载入整页画布' }}
          </span>
        </span>

        <span class="collapse-label">
          <span>{{ isCollapsed ? '展开 4 套方案' : '收起' }}</span>
          <ChevronDown v-if="isCollapsed" :size="14" :stroke-width="1.8" aria-hidden="true" />
          <ChevronUp v-else :size="14" :stroke-width="1.8" aria-hidden="true" />
        </span>
      </button>
    </div>

    <PresetCardGrid
      v-show="!isCollapsed"
      @preview-preset="handlePreviewPreset"
      @copy-preset="handleCopyPreset"
      @hover-floor="showPresetFloorTip"
      @leave-floor="hideTooltip"
    />

    <MotionTooltip
      :visible="tooltipState.visible"
      :title="tooltipState.title"
      :badge="tooltipState.badge"
      :tip="tooltipState.tip"
      :anim="tooltipState.anim"
      :anchor-rect="tooltipState.anchorRect"
    />
  </section>
</template>

<style scoped>
.preset-strip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px 16px;
  margin-bottom: 36px;
  transition: border-color 0.2s ease, padding 0.18s ease;
}

.preset-strip.is-collapsed {
  padding: 0;
  margin-bottom: 32px;
}

.preset-strip.is-collapsed:hover {
  border-color: var(--border-strong);
}

.strip-trigger {
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  border-radius: 11px;
}

.preset-strip:not(.is-collapsed) .strip-trigger {
  padding: 2px 0 0;
}

.strip-lead {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.strip-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.strip-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
}

.strip-sep {
  color: var(--border-strong);
}

.strip-sub {
  font-size: 12.5px;
  color: var(--text-muted);
}

.collapse-label {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 4px 9px;
  border-radius: 6px;
  background: var(--surface-soft);
  transition: color 0.16s ease, background 0.16s ease;
}

.strip-trigger:hover .collapse-label {
  color: var(--primary);
  background: var(--primary-soft);
}

@media (max-width: 640px) {
  .strip-sep {
    display: none;
  }
}
</style>
