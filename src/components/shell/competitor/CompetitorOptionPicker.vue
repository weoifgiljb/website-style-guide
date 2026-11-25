<script setup>
import { Sparkles, Crosshair, Play } from 'lucide-vue-next'
import {
  COMPETITOR_SECTION_OPTIONS,
  COMPETITOR_TRIGGER_OPTIONS,
  COMPETITOR_VISUAL_OPTIONS
} from '../../../utils/promptBuilder.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

const emit = defineEmits(['hover-option', 'leave-option'])
const { competitorDraft } = useCatalogStore()

function toggleMultiItem(list, id) {
  const idx = list.indexOf(id)
  if (idx !== -1) {
    list.splice(idx, 1)
  } else {
    list.push(id)
  }
}
</script>

<template>
        <div class="step-card">
          <div class="step-head">
            <span class="step-title">② 选你看到的动效感觉</span>
            <span class="hover-hint">
              <Sparkles :size="12" :stroke-width="1.9" aria-hidden="true" />
              <span>鼠标移到下方任意标签，可看位置图 & 实时动效演示</span>
            </span>
          </div>

          <div class="option-row">
            <span class="row-label">在哪个位置</span>
            <div class="pill-wrap">
              <button
                v-for="sec in COMPETITOR_SECTION_OPTIONS"
                :key="sec.id"
                type="button"
                class="choice-pill has-anim"
                :class="{ active: competitorDraft.sectionArea === sec.id }"
                @mouseenter="emit('hover-option', sec, $event)"
                @mouseleave="emit('leave-option')"
                @focus="emit('hover-option', sec, $event)"
                @blur="emit('leave-option')"
                @click="competitorDraft.sectionArea = sec.id"
              >
                <Crosshair :size="11" :stroke-width="2" class="loc-dot" aria-hidden="true" />
                <span>{{ sec.shortLabel }}</span>
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
                @mouseenter="emit('hover-option', tr, $event)"
                @mouseleave="emit('leave-option')"
                @focus="emit('hover-option', tr, $event)"
                @blur="emit('leave-option')"
                @click="toggleMultiItem(competitorDraft.triggers, tr.id)"
              >
                <Play :size="10" :stroke-width="2" class="play-dot" aria-hidden="true" />
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
                @mouseenter="emit('hover-option', vis, $event)"
                @mouseleave="emit('leave-option')"
                @focus="emit('hover-option', vis, $event)"
                @blur="emit('leave-option')"
                @click="toggleMultiItem(competitorDraft.visualFocus, vis.id)"
              >
                <Play :size="10" :stroke-width="2" class="play-dot" aria-hidden="true" />
                <span>{{ vis.shortLabel }}</span>
              </button>
            </div>
          </div>
        </div>
</template>

<style scoped>
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  padding: 2px 9px;
  border-radius: 999px;
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

.play-dot,
.loc-dot {
  font-style: normal;
  font-size: 9px;
  opacity: 0.58;
}

.choice-pill:hover .play-dot,
.choice-pill.active .play-dot,
.choice-pill:hover .loc-dot,
.choice-pill.active .loc-dot {
  opacity: 1;
  color: var(--primary);
}

@media (max-width: 640px) {
  .option-row {
    grid-template-columns: 1fr;
    gap: 5px;
  }
}
</style>
