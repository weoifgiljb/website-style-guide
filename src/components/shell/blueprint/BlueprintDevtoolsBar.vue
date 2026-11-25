<script setup>
import { ref, watch, computed } from 'vue'
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  RotateCcw,
  Maximize2
} from 'lucide-vue-next'
import {
  DEVTOOLS_PRESETS,
  ZOOM_OPTIONS,
  MIN_SIM_WIDTH,
  MAX_SIM_WIDTH,
  MIN_SIM_HEIGHT,
  MAX_SIM_HEIGHT,
  clampWidth,
  clampHeight,
  resolveResponsiveTier
} from '../../../data/devtoolsPresets.js'
import BlueprintBreakpointRuler from './BlueprintBreakpointRuler.vue'

const props = defineProps({
  presetId: { type: String, default: 'desktop-1280' },
  simWidth: { type: Number, default: 1280 },
  simHeight: { type: Number, default: null },
  zoomMode: { type: String, default: 'fit' },
  effectiveScale: { type: Number, default: 1 },
  floorCount: { type: Number, default: 0 },
  unboundCount: { type: Number, default: 0 }
})

const emit = defineEmits([
  'select-preset',
  'update-dimensions',
  'rotate-screen',
  'reset-height',
  'update-zoom',
  'snap-width',
  'replay'
])

const widthDraft = ref(String(props.simWidth))
const heightDraft = ref(props.simHeight ? String(props.simHeight) : '')

watch(
  () => props.simWidth,
  (val) => {
    widthDraft.value = String(val)
  }
)

watch(
  () => props.simHeight,
  (val) => {
    heightDraft.value = val ? String(val) : ''
  }
)

const tier = computed(() => resolveResponsiveTier(props.simWidth))
const scalePercent = computed(() => `${Math.round(props.effectiveScale * 100)}%`)

function commitWidth() {
  const nextW = clampWidth(widthDraft.value)
  widthDraft.value = String(nextW)
  if (nextW !== props.simWidth) {
    emit('update-dimensions', { width: nextW, height: props.simHeight })
  }
}

function commitHeight() {
  const raw = String(heightDraft.value).trim()
  const nextH = raw === '' ? null : clampHeight(raw)
  heightDraft.value = nextH ? String(nextH) : ''
  if (nextH !== props.simHeight) {
    emit('update-dimensions', { width: props.simWidth, height: nextH })
  }
}

function stepWidth(delta) {
  const nextW = clampWidth(props.simWidth + delta)
  emit('update-dimensions', { width: nextW, height: props.simHeight })
}
</script>

<template>
  <div class="devtools-chrome">
    <div class="devtools-bar">
      <div class="devtools-left">
        <label class="dim-select-wrap">
          <span class="dim-prefix">维度:</span>
          <select
            class="devtools-select"
            aria-label="切换响应式预设设备"
            :value="presetId"
            @change="emit('select-preset', $event.target.value)"
          >
            <option
              v-for="preset in DEVTOOLS_PRESETS"
              :key="preset.id"
              :value="preset.id"
            >
              {{ preset.label }}
            </option>
          </select>
        </label>

        <div class="wh-group" role="group" aria-label="视口宽高像素尺寸">
          <input
            v-model="widthDraft"
            type="number"
            class="dim-input"
            :min="MIN_SIM_WIDTH"
            :max="MAX_SIM_WIDTH"
            aria-label="视口宽度 px"
            @blur="commitWidth"
            @keydown.enter.prevent="commitWidth"
            @keydown.up.prevent="stepWidth(10)"
            @keydown.down.prevent="stepWidth(-10)"
          />
          <span class="wh-mul" aria-hidden="true">×</span>
          <input
            v-model="heightDraft"
            type="number"
            class="dim-input height-input"
            :min="MIN_SIM_HEIGHT"
            :max="MAX_SIM_HEIGHT"
            placeholder="自适应"
            aria-label="视口高度 px（留空为整页自适应）"
            @blur="commitHeight"
            @keydown.enter.prevent="commitHeight"
          />
          <span class="wh-unit">px</span>
        </div>

        <button
          type="button"
          class="dt-icon-btn"
          title="横竖屏宽高互换"
          aria-label="横竖屏宽高互换"
          @click="emit('rotate-screen')"
        >
          <RotateCw :size="13" :stroke-width="1.9" aria-hidden="true" />
        </button>

        <button
          v-if="simHeight !== null"
          type="button"
          class="dt-text-btn"
          title="恢复整页长滚高度"
          @click="emit('reset-height')"
        >
          <Maximize2 :size="12" :stroke-width="1.9" aria-hidden="true" />
          <span>整页高</span>
        </button>

        <select
          class="devtools-select zoom-select"
          aria-label="画布缩放比例"
          :value="zoomMode"
          @change="emit('update-zoom', $event.target.value)"
        >
          <option
            v-for="opt in ZOOM_OPTIONS"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.value === 'fit' ? `适应窗口 (${scalePercent})` : opt.label }}
          </option>
        </select>
      </div>

      <div class="devtools-right">
        <span class="tier-pill" :class="'is-' + tier.id">
          <Smartphone v-if="tier.id === 'mobile'" :size="12" :stroke-width="2" aria-hidden="true" />
          <Tablet v-else-if="tier.id === 'tablet'" :size="12" :stroke-width="2" aria-hidden="true" />
          <Monitor v-else :size="12" :stroke-width="2" aria-hidden="true" />
          <span>{{ tier.badge }}</span>
        </span>

        <button
          type="button"
          class="replay-all-btn"
          @click="emit('replay')"
        >
          <RotateCcw :size="13" :stroke-width="1.9" aria-hidden="true" />
          <span>重播动效</span>
        </button>
      </div>
    </div>

    <BlueprintBreakpointRuler
      :preset-id="presetId"
      :sim-width="simWidth"
      :floor-count="floorCount"
      :unbound-count="unboundCount"
      @select-preset="(id) => emit('select-preset', id)"
      @snap-width="(w) => emit('snap-width', w)"
    />
  </div>
</template>

<style scoped>
.devtools-chrome {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.devtools-bar {
  padding: 7px 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.devtools-left,
.devtools-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.dim-select-wrap {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 4px 0 7px;
  height: 28px;
}

.dim-select-wrap .devtools-select {
  max-width: 148px;
}

.dim-prefix {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
}

.devtools-select {
  height: 26px;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  padding: 0 4px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.zoom-select {
  height: 28px;
  border: 1px solid var(--border);
  background: var(--surface-soft);
  padding: 0 8px;
  font-weight: 500;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.wh-group {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 6px;
  height: 28px;
}

.dim-input {
  width: 48px;
  height: 22px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: center;
  padding: 0 2px;
  appearance: textfield;
}

.dim-input::-webkit-outer-spin-button,
.dim-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.height-input {
  width: 52px;
}

.dim-input:hover,
.dim-input:focus {
  background: var(--surface);
  border-color: var(--primary);
  outline: none;
}

.wh-mul,
.wh-unit {
  font-size: 11px;
  color: var(--text-muted);
  user-select: none;
}

.dt-icon-btn,
.dt-text-btn {
  height: 28px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 7px;
  font-size: 11.5px;
  font-weight: 500;
  transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease;
}

.dt-icon-btn:hover,
.dt-text-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}

.tier-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: var(--surface-soft);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.tier-pill.is-tablet {
  color: #b45309;
  background: var(--warn-soft);
  border-color: #fde68a;
}

.tier-pill.is-mobile {
  color: var(--primary);
  background: var(--primary-soft);
  border-color: #bfdbfe;
}

.replay-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  padding: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.replay-all-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}
</style>
