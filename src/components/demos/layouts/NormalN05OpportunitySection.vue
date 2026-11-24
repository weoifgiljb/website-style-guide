<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const isDark = ref(false)

const cards = [
  {
    icon: '💬',
    title: '全渠道聚合',
    desc: '一站式接入社媒与独立站会话，告别频繁切屏。'
  },
  {
    icon: '🤖',
    title: 'AI 智能接待',
    desc: '7×24 自动识别买家意图并秒回，夜间询盘不漏单。'
  },
  {
    icon: '📈',
    title: '营销再触达',
    desc: '按客户标签分层精准群发，持续激活私域复购。'
  }
]
</script>

<template>
  <section
    class="normal-n05"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact,
      'is-dark': isDark
    }"
  >
    <div class="opp-header">
      <h2 class="opp-heading">抓住每一次私域增长机会</h2>
      <button
        type="button"
        class="opp-theme-btn"
        @click.stop="isDark = !isDark"
      >
        {{ isDark ? '深色' : '浅色' }} ⇄ {{ isDark ? '浅色' : '深色' }}
      </button>
    </div>

    <div class="opp-grid">
      <div
        v-for="card in cards"
        :key="card.title"
        class="n-card-item opp-card"
      >
        <div class="icon-badge">
          <span class="icon-badge-outer"></span>
          <span class="icon-badge-inner">
            <span class="icon-glyph">{{ card.icon }}</span>
          </span>
        </div>

        <div class="opp-copy">
          <h3 class="opp-card-title">{{ card.title }}</h3>
          <p class="opp-card-desc">{{ card.desc }}</p>
        </div>

        <button type="button" class="opp-link" @click.stop>
          <span>了解更多</span>
          <span class="opp-chevron" aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n05 {
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  box-shadow: var(--shadow-sm);
  transition: background 0.22s ease, border-color 0.22s ease;
}

.normal-n05.is-dark {
  background: #0f172a;
  border-color: #1e293b;
}

.opp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.opp-heading {
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.3;
  min-width: 0;
}

.normal-n05.is-dark .opp-heading {
  color: #f8fafc;
}

.opp-theme-btn {
  flex-shrink: 0;
  border: 1px solid #dce2f2;
  background: #ffffff;
  color: #475569;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.opp-theme-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.normal-n05.is-dark .opp-theme-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: #334155;
  color: #cbd5e1;
}

.normal-n05.is-dark .opp-theme-btn:hover {
  border-color: #60a5fa;
  color: #60a5fa;
}

.opp-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.opp-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  padding: 12px 10px;
  border-radius: 22px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(255, 255, 255, 0.86);
  min-width: 0;
  box-sizing: border-box;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.opp-card:hover {
  background: rgba(37, 99, 235, 0.03);
  border-color: rgba(37, 99, 235, 0.24);
}

.normal-n05.is-dark .opp-card {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(148, 163, 184, 0.14);
}

.normal-n05.is-dark .opp-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(96, 165, 250, 0.32);
}

.icon-badge {
  position: relative;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-badge-outer {
  position: absolute;
  inset: 0;
  border-radius: 13px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.11) 0%, rgba(37, 99, 235, 0.04) 100%);
}

.icon-badge-inner {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 9px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.16) 0%, rgba(37, 99, 235, 0.07) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.normal-n05.is-dark .icon-badge-outer {
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 100%);
}

.normal-n05.is-dark .icon-badge-inner {
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.22) 0%, rgba(96, 165, 250, 0.09) 100%);
}

.icon-glyph {
  font-size: 14px;
  line-height: 1;
}

.opp-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  width: 100%;
}

.opp-card-title {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}

.normal-n05.is-dark .opp-card-title {
  color: #f8fafc;
}

.opp-card-desc {
  margin: 0;
  font-size: 10px;
  line-height: 1.45;
  color: #64748b;
}

.normal-n05.is-dark .opp-card-desc {
  color: #94a3b8;
}

.opp-link {
  margin-top: auto;
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10.5px;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
}

.normal-n05.is-dark .opp-link {
  color: #60a5fa;
}

.opp-chevron {
  font-size: 13px;
  line-height: 1;
  transition: transform 0.16s ease;
}

.opp-card:hover .opp-chevron {
  transform: translateX(2px);
}

.normal-n05.is-compact {
  padding: 10px;
  gap: 8px;
}

.normal-n05.is-compact .opp-card {
  padding: 9px 8px;
  border-radius: 16px;
  gap: 6px;
}

.normal-n05.is-compact .icon-badge {
  width: 32px;
  height: 32px;
}

.normal-n05.is-compact .icon-badge-inner {
  width: 24px;
  height: 24px;
}

.normal-n05.is-mobile {
  padding: 11px 10px;
  gap: 9px;
}

.normal-n05.is-mobile .opp-heading {
  font-size: 12.5px;
}

.normal-n05.is-mobile .opp-theme-btn {
  font-size: 9.5px;
  padding: 2px 7px;
}

.normal-n05.is-mobile .opp-grid {
  grid-template-columns: 1fr;
  gap: 7px;
}

.normal-n05.is-mobile .opp-card {
  border-radius: 16px;
  padding: 10px 11px;
  gap: 6px;
}

.normal-n05.is-mobile .icon-badge {
  width: 32px;
  height: 32px;
}

.normal-n05.is-mobile .icon-badge-outer {
  border-radius: 11px;
}

.normal-n05.is-mobile .icon-badge-inner {
  width: 24px;
  height: 24px;
  border-radius: 8px;
}

.normal-n05.is-mobile .icon-glyph {
  font-size: 12.5px;
}

.normal-n05.is-mobile .opp-card-title {
  font-size: 11.5px;
}

.normal-n05.is-mobile .opp-card-desc {
  font-size: 10px;
}
</style>
