<script setup>
import { ref, computed, watch } from 'vue'
import { Monitor, Smartphone, Plus, Check, Copy } from 'lucide-vue-next'
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
      <div class="card-meta-main">
        <div class="card-title-row">
          <span
            v-if="item.code"
            class="card-code"
            :class="'kind-' + item.kind"
          >{{ item.code }}</span>
          <h3 class="card-name-text">{{ item.name }}</h3>
        </div>
        <p class="card-sub">
          <span v-if="item.en" class="card-en">{{ item.en }}</span>
          <span v-if="item.en && item.scene" class="sub-dot" aria-hidden="true">·</span>
          <span v-if="item.scene" class="card-scene">{{ item.scene }}</span>
        </p>
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
            :aria-pressed="effectiveViewport === 'desktop'"
            aria-label="桌面端预览"
            title="桌面端预览"
            @click="setLocalViewport('desktop')"
          >
            <Monitor :size="13" :stroke-width="1.8" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="vp-mini-btn"
            :class="{ active: effectiveViewport === 'mobile' }"
            :aria-pressed="effectiveViewport === 'mobile'"
            aria-label="手机端预览"
            title="手机端预览"
            @click="setLocalViewport('mobile')"
          >
            <Smartphone :size="13" :stroke-width="1.8" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          class="pick-btn"
          :aria-pressed="selected"
          @click="emit('toggle', item.id)"
        >
          <Check v-if="selected" :size="13" :stroke-width="2.1" aria-hidden="true" />
          <Plus v-else :size="13" :stroke-width="1.9" aria-hidden="true" />
          <span>{{ selected ? '已选' : '加入组合' }}</span>
        </button>
      </div>
    </div>

    <div
      class="stage"
      :class="{
        'style-stage': item.kind === 'style',
        'pitfall-stage': item.kind === 'pitfall'
      }"
    >
      <span v-if="item.kind === 'style' && item.badge" class="stage-badge">
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
      <div class="prompt-box" :title="item.shortPrompt || item.prompt">
        <span class="prompt-text">{{ item.shortPrompt || item.prompt }}</span>
        <button
          type="button"
          class="copy-btn"
          :aria-label="'复制 ' + item.name + ' 话术'"
          @click="emit('copy', item)"
        >
          <Copy :size="13" :stroke-width="1.8" aria-hidden="true" />
          <span>复制</span>
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
  box-shadow: 0 0 0 1px var(--primary);
}

.card-head {
  padding: 15px 16px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-meta-main {
  min-width: 0;
  flex: 1;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.card-code {
  display: inline-flex;
  align-items: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 5px;
  flex-shrink: 0;
  background: var(--surface-soft);
  color: var(--text-secondary);
}

.card-code.kind-motion {
  color: var(--primary);
  background: var(--primary-soft);
}

.card-code.kind-pitfall {
  color: #b91c1c;
  background: var(--danger-soft);
}

.card-name-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.card-sub {
  margin-top: 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-muted);
}

.card-en {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
}

.sub-dot {
  color: var(--border-strong);
}

.card-head-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.vp-mini-switch {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  background: var(--surface-soft);
  border: 1px solid rgba(15, 23, 42, 0.05);
  padding: 2px;
  border-radius: 7px;
}

.vp-mini-btn {
  width: 26px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
}

.vp-mini-btn:hover {
  color: var(--text);
}

.vp-mini-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.pick-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 0 10px;
  border-radius: 7px;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.pick-btn:hover {
  border-color: var(--border-strong);
  color: var(--text);
  background: var(--surface-subtle, #f8fafc);
}

.card.selected .pick-btn {
  background: var(--primary-soft);
  border-color: #93c5fd;
  color: var(--primary);
  font-weight: 600;
}

/* Keep static and transform-free on stage-inner so child .stage-badge / .stage-action stay anchored to .stage */
.stage {
  position: relative;
  margin: 0;
  min-height: 256px;
  padding: 42px 22px 20px;
  background-color: #f8fafc;
  background-image: radial-gradient(rgba(148, 163, 184, 0.22) 1px, transparent 1px);
  background-size: 16px 16px;
  border-top: 1px solid #eef2f6;
  border-bottom: 1px solid #eef2f6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid #334155;
  border-radius: 18px;
  padding: 8px 10px 12px;
  box-shadow: 0 10px 24px -8px rgba(15, 23, 42, 0.14);
}

.mini-phone-bar {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #cbd5e1;
  margin: 0 auto 8px;
  flex-shrink: 0;
}

.card-body {
  padding: 10px 16px;
  margin-top: auto;
}

.prompt-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.prompt-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.45;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 500;
  padding: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.copy-btn:hover {
  border-color: #bfdbfe;
  color: var(--primary);
  background: var(--primary-soft);
}
</style>
