<script setup>
import { ref, onUnmounted } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const clickedAction = ref('')
let resetTimer = null

function triggerAction(label) {
  clickedAction.value = label
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    clickedAction.value = ''
  }, 1200)
}

onUnmounted(() => {
  if (resetTimer) clearTimeout(resetTimer)
})

const notes = ['免信用卡快速开通', '7×24 专属技术支持']
</script>

<template>
  <section
    class="normal-n14"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <div class="n14-card">
      <div class="n14-grid-overlay" aria-hidden="true"></div>
      <div class="n14-glow n14-glow-a" aria-hidden="true"></div>
      <div class="n14-glow n14-glow-b" aria-hidden="true"></div>

      <div class="n14-content">
        <span class="n14-eyebrow">
          <i class="n14-breathe-dot" aria-hidden="true"></i>
          <span>即刻开启高效增长</span>
        </span>

        <h2 class="n14-title">一站式收拢全球私域流量与客户对话</h2>

        <p class="n14-desc">
          3 分钟接入全渠道账号，让每一次广告点击与客户咨询都高效转化为成交。
        </p>

        <div class="n14-cta-group">
          <button
            type="button"
            class="n14-btn-primary"
            @click.stop="triggerAction('trial')"
          >
            <span>{{ clickedAction === 'trial' ? '已进入免费试用 ✓' : '免费试用' }}</span>
            <i v-if="clickedAction !== 'trial'" aria-hidden="true">›</i>
          </button>

          <button
            type="button"
            class="n14-btn-secondary"
            @click.stop="triggerAction('demo')"
          >
            {{ clickedAction === 'demo' ? '顾问已连接 ✓' : '预约演示' }}
          </button>
        </div>

        <ul class="n14-notes">
          <li v-for="note in notes" :key="note" class="n14-note-item">
            <span class="n14-note-dot" aria-hidden="true">●</span>
            <span>{{ note }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n14 {
  width: 100%;
  background: #ffffff;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #eef2f7;
  box-sizing: border-box;
}

.n14-card {
  position: relative;
  width: 100%;
  border-radius: 20px;
  background: linear-gradient(110deg, #111d3c 0%, #1e3c97 52%, #2458db 100%);
  padding: 16px 16px 14px;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}

.n14-grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
  background-size: 28px 28px;
}

.n14-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.n14-glow-a {
  width: 120px;
  height: 120px;
  left: -24px;
  bottom: -36px;
  background: rgba(88, 113, 219, 0.24);
  filter: blur(22px);
}

.n14-glow-b {
  width: 150px;
  height: 150px;
  right: -46px;
  top: -54px;
  background: rgba(255, 255, 255, 0.05);
}

.n14-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.n14-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  padding: 3px 10px;
  font-size: 9.5px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.n14-breathe-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8fc6ff;
  box-shadow: 0 0 0 0 rgba(143, 198, 255, 0.7);
  animation: n14Breathe 2s ease-in-out infinite;
}

@keyframes n14Breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(143, 198, 255, 0.65);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 0 5px rgba(143, 198, 255, 0);
  }
}

.n14-title {
  margin: 0 0 5px;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.32;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.n14-desc {
  margin: 0 0 12px;
  max-width: 370px;
  font-size: 10px;
  line-height: 1.48;
  color: #d9e7ff;
}

.n14-cta-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.n14-btn-primary {
  border: none;
  background: #ffffff;
  color: #1d4ed8;
  border-radius: 10px;
  padding: 7px 16px;
  font-size: 10.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-sizing: border-box;
}

.n14-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(8, 15, 38, 0.26);
}

.n14-btn-primary i {
  font-style: normal;
  font-size: 12px;
  line-height: 1;
}

.n14-btn-secondary {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-radius: 10px;
  padding: 7px 15px;
  font-size: 10.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease;
  box-sizing: border-box;
}

.n14-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.42);
}

.n14-notes {
  list-style: none;
  margin: 11px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 14px;
  font-size: 9.5px;
  color: #9dc8ff;
}

.n14-note-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.n14-note-dot {
  color: #66a8ff;
  font-size: 7px;
  line-height: 1;
}

/* Compact */
.normal-n14.is-compact {
  padding: 6px;
}

.normal-n14.is-compact .n14-card {
  padding: 12px 12px 10px;
  border-radius: 16px;
}

.normal-n14.is-compact .n14-title {
  font-size: 12.5px;
}

.normal-n14.is-compact .n14-desc {
  font-size: 9px;
  margin-bottom: 9px;
}

.normal-n14.is-compact .n14-btn-primary,
.normal-n14.is-compact .n14-btn-secondary {
  padding: 5px 12px;
  font-size: 9.5px;
}

/* Mobile (316px shell) */
.normal-n14.is-mobile {
  padding: 6px;
}

.normal-n14.is-mobile .n14-card {
  padding: 13px 11px 12px;
  border-radius: 16px;
}

.normal-n14.is-mobile .n14-title {
  font-size: 12.5px;
}

.normal-n14.is-mobile .n14-desc {
  font-size: 9.2px;
  margin-bottom: 10px;
}

.normal-n14.is-mobile .n14-cta-group {
  flex-direction: column;
  width: 100%;
  gap: 6px;
}

.normal-n14.is-mobile .n14-btn-primary,
.normal-n14.is-mobile .n14-btn-secondary {
  width: 100%;
  padding: 7px 12px;
  font-size: 10px;
}

.normal-n14.is-mobile .n14-notes {
  margin-top: 9px;
  gap: 4px 10px;
  font-size: 8.8px;
}
</style>
