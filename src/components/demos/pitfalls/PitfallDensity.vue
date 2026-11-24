<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 }
})

const mode = ref('good')

function toggleMode() {
  mode.value = mode.value === 'good' ? 'bad' : 'good'
}

watch(
  () => props.replayTick,
  () => {
    toggleMode()
  }
)
</script>

<template>
  <div class="pitfall-density">
    <span class="stage-badge">
      {{ mode === 'good' ? '✅ 当前：单焦点克制' : '❌ 当前：全屏乱飞反例' }}
    </span>
    <button type="button" class="stage-action" @click.stop="toggleMode">
      {{ mode === 'good' ? '看反例效果' : '切回推荐效果' }}
    </button>

    <div class="hero-card" :class="mode === 'bad' ? 'is-bad' : 'is-good'">
      <span class="corner-tag tag-left">⚡ 毫秒接入</span>
      <span class="corner-tag tag-right">🔥 转化 +38%</span>

      <div class="hero-title">多渠道智能客服工作台</div>
      <div class="hero-sub">统一接待全球私域询盘，焦点清晰直达行动点</div>

      <button type="button" class="hero-cta" @click.stop="toggleMode">
        <span>立即免费试用</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pitfall-density {
  width: 100%;
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-card {
  position: relative;
  width: 100%;
  max-width: 286px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 14px 13px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.hero-card.is-bad {
  border-color: #fca5a5;
  background: #fffafa;
}

.corner-tag {
  position: absolute;
  top: 7px;
  font-size: 9.5px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.tag-left {
  left: 8px;
}

.tag-right {
  right: 8px;
}

.hero-title {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 800;
  color: var(--text);
}

.hero-sub {
  font-size: 10.5px;
  color: var(--text-muted);
  margin: 3px 0 9px;
}

.hero-cta {
  position: relative;
  overflow: hidden;
  border: none;
  background: var(--primary);
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 8px;
  cursor: pointer;
}

/* Good mode: ONLY primary CTA has a gentle subtle shimmer */
.is-good .hero-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 70%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 255, 255, 0.36) 50%,
    transparent 100%
  );
  animation: gentleShimmer 3s ease-in-out infinite;
}

/* Bad mode: everything flashes, bounces, and shakes simultaneously */
.is-bad .hero-title {
  color: #dc2626;
  animation: titlePulseFlash 0.55s ease-in-out infinite alternate;
}

.is-bad .tag-left {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fca5a5;
  animation: badgeBounceDown 0.42s ease-in-out infinite alternate;
}

.is-bad .tag-right {
  background: #fffbeb;
  color: #d97706;
  border-color: #fcd34d;
  animation: badgeBounceUp 0.38s ease-in-out infinite alternate;
}

.is-bad .hero-cta {
  background: #dc2626;
  animation: ctaRapidShake 0.32s linear infinite;
}

@keyframes gentleShimmer {
  0%,
  35% {
    left: -120%;
  }
  75%,
  100% {
    left: 150%;
  }
}

@keyframes titlePulseFlash {
  from {
    opacity: 0.45;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1.06);
  }
}

@keyframes badgeBounceDown {
  from {
    transform: translate(0, 0) rotate(-4deg);
  }
  to {
    transform: translate(5px, 7px) rotate(6deg);
  }
}

@keyframes badgeBounceUp {
  from {
    transform: translate(0, 6px) rotate(5deg);
  }
  to {
    transform: translate(-5px, -3px) rotate(-6deg);
  }
}

@keyframes ctaRapidShake {
  0%,
  100% {
    transform: translateX(0) scale(1);
  }
  25% {
    transform: translateX(-4px) scale(1.04);
  }
  75% {
    transform: translateX(4px) scale(1.04);
  }
}
</style>
