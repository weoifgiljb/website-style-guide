<script setup>
import { SlidersHorizontal } from 'lucide-vue-next'
import { BREAKPOINT_STOPS } from '../../../data/devtoolsPresets.js'

defineProps({
  presetId: { type: String, default: 'desktop-1280' },
  simWidth: { type: Number, default: 1280 },
  floorCount: { type: Number, default: 0 },
  unboundCount: { type: Number, default: 0 }
})

const emit = defineEmits(['select-preset', 'snap-width'])
</script>

<template>
  <div class="breakpoint-ruler" role="group" aria-label="常用响应式断点标尺">
    <div class="ruler-stops">
      <button
        type="button"
        class="bp-stop mode-free"
        :class="{ active: presetId === 'responsive' }"
        @click="emit('select-preset', 'responsive')"
      >
        <SlidersHorizontal :size="11" :stroke-width="2" aria-hidden="true" />
        <span>自由拖拽</span>
      </button>
      <button
        v-for="bp in BREAKPOINT_STOPS"
        :key="bp.width"
        type="button"
        class="bp-stop"
        :class="{ active: simWidth === bp.width }"
        @click="emit('snap-width', bp.width)"
      >
        <b>{{ bp.label }}</b>
        <span>{{ bp.tag }}</span>
      </button>
    </div>

    <span class="ruler-meta">
      共 {{ floorCount }} 屏<template v-if="unboundCount > 0"> · {{ unboundCount }} 项独立动效</template> · 拖两侧手柄可无级缩放
    </span>
  </div>
</template>

<style scoped>
.breakpoint-ruler {
  padding: 4px 16px;
  background: #f8fafc;
  border-top: 1px solid #eef2f6;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ruler-stops {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.bp-stop {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 7px;
  border-radius: 5px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  font-size: 11px;
  cursor: pointer;
  font-variant-numeric: tabular-nums;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.bp-stop b {
  font-weight: 600;
  color: var(--text-secondary);
}

.bp-stop:hover {
  background: #eef2f6;
  color: var(--text);
}

.bp-stop.active {
  background: var(--primary-soft);
  border-color: #bfdbfe;
  color: var(--primary);
}

.bp-stop.active b {
  color: var(--primary);
}

.mode-free {
  border-color: var(--border);
  background: var(--surface);
  font-weight: 500;
}

.ruler-meta {
  font-size: 11px;
  color: var(--text-muted);
}
</style>
