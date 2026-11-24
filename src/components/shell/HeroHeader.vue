<script setup>
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
          看着挑版式与动效，一键切换 Web / 手机端看真实组件效果，勾选后可拼装整页并复制话术。
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
            💻 Web 端
          </button>
          <button
            type="button"
            class="seg-btn"
            :class="{ active: cardViewport === 'mobile' }"
            :aria-pressed="cardViewport === 'mobile'"
            @click="setCardViewport('mobile')"
          >
            📱 手机端
          </button>
        </div>

        <div class="segmented-group" role="group" aria-label="全局动效节奏切换">
          <button
            v-for="opt in speedOptions"
            :key="opt.value"
            type="button"
            class="seg-btn"
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
  background: linear-gradient(180deg, #ffffff 0%, #f6f8fc 100%);
  border-bottom: 1px solid var(--border);
  padding: 22px 24px 18px;
}

.hero-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.hero-copy {
  flex: 1 1 420px;
  min-width: 0;
}

.hero h1 {
  font-size: clamp(21px, 2.5vw, 27px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 4px;
  line-height: 1.3;
}

.hero-desc {
  color: var(--text-secondary);
  font-size: 13.5px;
  line-height: 1.5;
}

.hero-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.segmented-group {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  padding: 3px;
  border-radius: 10px;
}

.seg-btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12.5px;
  font-weight: 500;
  padding: 5px 11px;
  border-radius: 7px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.18s ease;
}

.seg-btn:hover {
  color: var(--text);
}

.seg-btn.active {
  background: var(--surface);
  color: var(--primary);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
}

@media (max-width: 640px) {
  .hero {
    padding: 18px 16px 14px;
  }
}
</style>
