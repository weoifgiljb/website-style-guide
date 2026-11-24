<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const dark = ref(true)

const testimonials = [
  {
    id: 'lin',
    avatar: 'L',
    avatarBg: 'linear-gradient(135deg, #2563eb, #38bdf8)',
    quote: '“接入后多账号夜间漏单率直接归零，广告回传归因非常准。”',
    author: 'Lin · 跨境独立站运营总监'
  },
  {
    id: 'chen',
    avatar: '陈',
    avatarBg: 'linear-gradient(135deg, #4f46e5, #818cf8)',
    quote: '“多语种 AI 客服自动承接高频询盘，旺季大促人效翻了三倍。”',
    author: '陈经理 · 出海品牌客服负责人'
  },
  {
    id: 'sophia',
    avatar: 'S',
    avatarBg: 'linear-gradient(135deg, #0d9488, #34d399)',
    quote: '“WhatsApp 官方 API 群发触达稳定，私域复购转化提升了 36%。”',
    author: 'Sophia · DTC 增长负责人'
  }
]

const loopItems = [...testimonials, ...testimonials]
</script>

<template>
  <section
    class="normal-n11"
    :class="{
      'is-dark': dark,
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
  >
    <div class="n11-header">
      <div class="n11-title-block">
        <h2 class="n11-heading">
          <span class="n11-highlight" style="color: #2563eb">10,000+ 团队</span>
          <span class="n11-normal"> 的真实口碑评价</span>
        </h2>
        <p class="n11-sub">悬停卡片可暂停滚动，支持深浅背景双模式复用</p>
      </div>

      <button
        type="button"
        class="n11-mode-btn"
        @click.stop="dark = !dark"
      >
        {{ dark ? '🌙 深色模式' : '☀️ 浅色模式' }}
      </button>
    </div>

    <div class="n11-track-viewport">
      <div class="n11-track">
        <article
          v-for="(item, idx) in loopItems"
          :key="`${item.id}-${idx}`"
          class="n-card-item testi-card"
        >
          <div class="testi-stars" aria-label="5 stars">★★★★★</div>
          <p class="testi-quote">{{ item.quote }}</p>
          <div class="testi-author">
            <span class="testi-avatar" :style="{ background: item.avatarBg }">
              {{ item.avatar }}
            </span>
            <span class="testi-role">{{ item.author }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n11 {
  width: 100%;
  border-radius: 16px;
  padding: 13px 12px 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  gap: 11px;
  overflow: hidden;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  box-sizing: border-box;
}

.normal-n11.is-dark {
  background: #0b1224;
  border-color: #1e293b;
  color: #f8fafc;
}

.n11-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.n11-title-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.n11-heading {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.3;
}

.n11-normal {
  color: inherit;
}

.n11-sub {
  margin: 0;
  font-size: 9.5px;
  color: #64748b;
  line-height: 1.35;
}

.normal-n11.is-dark .n11-sub {
  color: #94a3b8;
}

.n11-mode-btn {
  flex-shrink: 0;
  border-radius: 999px;
  padding: 3px 9px;
  font-size: 9.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  transition: all 0.18s ease;
}

.n11-mode-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.normal-n11.is-dark .n11-mode-btn {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
}

.normal-n11.is-dark .n11-mode-btn:hover {
  border-color: #60a5fa;
  color: #ffffff;
}

.n11-track-viewport {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.n11-track {
  display: flex;
  gap: 10px;
  width: max-content;
  animation: testiScroll 20s linear infinite;
}

.n11-track-viewport:hover .n11-track {
  animation-play-state: paused;
}

.testi-card {
  width: 214px;
  border-radius: 20px;
  padding: 12px 13px;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 8px 20px -8px rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
  transition: transform 0.2s ease, background 0.25s ease, border-color 0.25s ease;
  box-sizing: border-box;
}

.normal-n11.is-dark .testi-card {
  background: #141e36;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.55);
}

.testi-stars {
  color: #fbbf24;
  font-size: 11px;
  letter-spacing: 1.5px;
  line-height: 1;
}

.testi-quote {
  margin: 0;
  font-size: 10px;
  line-height: 1.48;
  color: #1e293b;
  font-weight: 500;
}

.normal-n11.is-dark .testi-quote {
  color: #e2e8f0;
}

.testi-author {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.testi-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.28);
}

.testi-role {
  font-size: 9px;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.normal-n11.is-dark .testi-role {
  color: #94a3b8;
}

@keyframes testiScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 5px));
  }
}

/* Compact */
.normal-n11.is-compact {
  padding: 10px;
  gap: 8px;
}

.normal-n11.is-compact .n11-heading {
  font-size: 11.5px;
}

.normal-n11.is-compact .testi-card {
  width: 184px;
  padding: 9px 10px;
  border-radius: 16px;
  gap: 6px;
}

.normal-n11.is-compact .testi-quote {
  font-size: 9px;
}

/* Mobile (316px shell) */
.normal-n11.is-mobile {
  padding: 10px 9px 11px;
  gap: 8px;
}

.normal-n11.is-mobile .n11-header {
  flex-wrap: wrap;
  gap: 6px;
}

.normal-n11.is-mobile .n11-heading {
  font-size: 11.5px;
}

.normal-n11.is-mobile .n11-sub {
  font-size: 8.5px;
}

.normal-n11.is-mobile .n11-mode-btn {
  padding: 2px 7px;
  font-size: 8.5px;
}

.normal-n11.is-mobile .n11-track {
  gap: 8px;
  animation-name: testiScrollMobile;
}

.normal-n11.is-mobile .testi-card {
  width: 186px;
  padding: 9px 10px;
  border-radius: 16px;
  gap: 6px;
}

.normal-n11.is-mobile .testi-quote {
  font-size: 9px;
  line-height: 1.42;
}

.normal-n11.is-mobile .testi-avatar {
  width: 20px;
  height: 20px;
  font-size: 9px;
}

.normal-n11.is-mobile .testi-role {
  font-size: 8.5px;
}

@keyframes testiScrollMobile {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 4px));
  }
}
</style>
