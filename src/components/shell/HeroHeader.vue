<script setup>
import { Monitor, Smartphone } from 'lucide-vue-next'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const { speed, setSpeed, cardViewport, setCardViewport } = useCatalogStore()

const speedOptions = [
  { label: '利落 0.28s', value: '0.28s' },
  { label: '舒缓 0.5s', value: '0.5s' },
  { label: '偏慢 1.05s', value: '1.05s' }
]
</script>

<template>
  <header class="hero">
    <div class="container hero-row">
      <div class="hero-copy">
        <h1>官网常用样式 & 动效速查</h1>
        <p class="hero-desc">
          挑选页面版式与交互动效，切换桌面 / 手机视口查看组件反馈，勾选后即可拼装整页并复制规格话术。
        </p>
      </div>

      <div class="hero-controls">
        <div class="segmented-group" role="group" aria-label="组件预览端切换">
          <button
            type="button"
            class="seg-btn"
            :class="{ active: cardViewport === 'desktop' }"
            :aria-pressed="cardViewport === 'desktop'"
            @click="setCardViewport('desktop')"
          >
            <Monitor :size="14" :stroke-width="1.75" aria-hidden="true" />
            <span>Web 端</span>
          </button>
          <button
            type="button"
            class="seg-btn"
            :class="{ active: cardViewport === 'mobile' }"
            :aria-pressed="cardViewport === 'mobile'"
            @click="setCardViewport('mobile')"
          >
            <Smartphone :size="14" :stroke-width="1.75" aria-hidden="true" />
            <span>手机端</span>
          </button>
        </div>

        <div class="segmented-group" role="group" aria-label="全局动效节奏切换">
          <button
            v-for="opt in speedOptions"
            :key="opt.value"
            type="button"
            class="seg-btn speed-btn"
            :class="{ active: speed === opt.value }"
            :aria-pressed="speed === opt.value"
            @click="setSpeed(opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  background: var(--surface);
  padding: 28px 24px 16px;
}

.hero-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.hero-copy {
  flex: 1 1 420px;
  min-width: 0;
}

.hero h1 {
  font-size: clamp(22px, 2.4vw, 26px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text);
  margin-bottom: 5px;
  line-height: 1.28;
}

.hero-desc {
  color: var(--text-muted);
  font-size: 13.5px;
  line-height: 1.5;
}

.hero-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.segmented-group {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--surface-soft);
  border: 1px solid rgba(15, 23, 42, 0.06);
  padding: 2px;
  border-radius: 8px;
}

.seg-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 500;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}

.speed-btn {
  font-variant-numeric: tabular-nums;
}

.seg-btn:hover {
  color: var(--text);
}

.seg-btn.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

@media (max-width: 640px) {
  .hero {
    padding: 20px 16px 12px;
  }
}
</style>
