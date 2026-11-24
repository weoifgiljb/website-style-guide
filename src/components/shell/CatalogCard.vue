<script setup>
import { ref, computed, watch } from 'vue'
import { DEMO_COMPONENTS } from '../demos/index.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

defineProps({
  item: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const emit = defineEmits(['toggle', 'copy'])

const { cardViewport, cardViewportVersion } = useCatalogStore()

const localViewport = ref(null)
watch(cardViewportVersion, () => {
  localViewport.value = null
})

const effectiveViewport = computed(() => localViewport.value || cardViewport.value)

function setLocalViewport(vp) {
  localViewport.value = vp
}
</script>

<template>
  <article class="card" :class="{ selected }">
    <div class="card-head">
      <div class="card-title-wrap">
        <span
          v-if="item.code"
          class="card-code"
          :class="'kind-' + item.kind"
        >{{ item.code }}</span>
        <span class="card-name-text">{{ item.name }}</span>
        <span class="card-en">{{ item.en }}</span>
      </div>

      <div class="card-head-actions">
        <div
          v-if="item.kind !== 'pitfall'"
          class="vp-mini-switch"
          role="group"
          aria-label="单卡视图端切换"
        >
          <button
            type="button"
            class="vp-mini-btn"
            :class="{ active: effectiveViewport === 'desktop' }"
            @click="setLocalViewport('desktop')"
          >
            Web
          </button>
          <button
            type="button"
            class="vp-mini-btn"
            :class="{ active: effectiveViewport === 'mobile' }"
            @click="setLocalViewport('mobile')"
          >
            手机
          </button>
        </div>

        <button
          type="button"
          class="pick-btn"
          @click="emit('toggle', item.id)"
        >
          {{ selected ? '✓ 已选中' : '+ 加入组合' }}
        </button>
      </div>
    </div>

    <div
      class="stage"
      :class="{
        'style-stage': item.kind === 'style',
        'primitive-stage': item.kind === 'primitive',
        'pitfall-stage': item.kind === 'pitfall'
      }"
    >
      <span
        v-if="(item.kind === 'style' || item.kind === 'primitive') && item.badge"
        class="stage-badge"
      >
        {{ item.badge }}
      </span>
      <div
        class="stage-inner"
        :class="{ 'is-mobile-frame': effectiveViewport === 'mobile' && item.kind !== 'pitfall' }"
      >
        <div
          v-if="effectiveViewport === 'mobile' && item.kind !== 'pitfall'"
          class="mini-phone-bar"
        ></div>
        <component
          :is="DEMO_COMPONENTS[item.demoKey]"
          :replay-tick="replayTick"
          :viewport="effectiveViewport"
        />
      </div>
    </div>

    <div class="card-body">
      <div v-if="item.normalPath" class="meta-row">
        <span class="meta-label is-code">normal</span>
        <code class="normal-path">{{ item.normalPath }}</code>
      </div>

      <div class="meta-row">
        <span class="meta-label">场景</span>
        <span class="meta-val">{{ item.scene }}</span>
      </div>

      <div class="prompt-box">
        <span class="prompt-text">「{{ item.shortPrompt || item.prompt }}」</span>
        <button
          type="button"
          class="copy-btn"
          @click="emit('copy', item)"
        >
          复制
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}

.card.selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.16), var(--shadow-md);
}

.card-head {
  padding: 15px 18px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card-title-wrap {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}

.card-code {
  display: inline-block;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 5px;
  flex-shrink: 0;
}

.card-code.kind-style {
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
}

.card-code.kind-primitive {
  color: #1d4ed8;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
}

.card-code.kind-motion {
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
}

.card-code.kind-pitfall {
  color: #dc2626;
  background: var(--danger-soft);
  border: 1px solid #fecaca;
}

.card-name-text {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.35;
}

.card-en {
  font-size: 12px;
  color: var(--text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  line-height: 1.3;
}

.card-head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.vp-mini-switch {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  padding: 2px;
  border-radius: 8px;
}

.vp-mini-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 7px;
  border-radius: 6px;
  cursor: pointer;
  line-height: 1.2;
  transition: all 0.16s ease;
}

.vp-mini-btn:hover {
  color: var(--text);
}

.vp-mini-btn.active {
  background: var(--surface);
  color: var(--primary);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.pick-btn {
  flex-shrink: 0;
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
  transition: all 0.2s ease;
}

.pick-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.card.selected .pick-btn {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.stage {
  position: relative;
  margin: 0 18px;
  min-height: 256px;
  padding: 44px 22px 20px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage.style-stage {
  background: linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%);
}

.stage.primitive-stage {
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
}

.stage.pitfall-stage {
  background: linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%);
}

/* Keep static and transform-free so child .stage-badge / .stage-action stay anchored to .stage */
.stage-inner {
  position: static;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stage-inner.is-mobile-frame {
  width: 100%;
  max-width: 316px;
  background: rgba(255, 255, 255, 0.75);
  border: 3px solid #334155;
  border-radius: 20px;
  padding: 8px 10px 12px;
  box-shadow: 0 10px 24px -8px rgba(15, 23, 42, 0.16);
}

.mini-phone-bar {
  width: 44px;
  height: 4px;
  border-radius: 999px;
  background: #cbd5e1;
  margin: 0 auto 8px;
  flex-shrink: 0;
}

.card-body {
  padding: 12px 18px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.meta-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--text-secondary);
}

.meta-label {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--surface-soft);
  padding: 1px 6px;
  border-radius: 4px;
}

.meta-label.is-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #dbeafe;
}

.normal-path {
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  color: #1e40af;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1px 6px;
  border-radius: 5px;
  word-break: break-all;
}

.meta-val {
  min-width: 0;
}

.prompt-box {
  margin-top: auto;
  background: var(--surface-soft);
  border: 1px dashed var(--border-strong);
  border-radius: 10px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.prompt-text {
  font-size: 12.5px;
  color: var(--text);
  line-height: 1.45;
  min-width: 0;
}

.copy-btn {
  flex-shrink: 0;
  background: var(--surface);
  color: var(--primary);
  border: 1px solid #bfdbfe;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.copy-btn:hover {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
}
</style>
