<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const paused = ref(false)

const row1 = [
  { name: 'SHEIN', color: '#111827', accent: '#f43f5e' },
  { name: 'ANKER', color: '#0284c7', accent: '#38bdf8' },
  { name: 'MINISO', color: '#dc2626', accent: '#ef4444' },
  { name: 'POP MART', color: '#b91c1c', accent: '#facc15' },
  { name: 'Ugreen', color: '#059669', accent: '#10b981' },
  { name: 'Baseus', color: '#d97706', accent: '#fbbf24' }
]

const row2 = [
  { name: 'PatPat', color: '#e11d48', accent: '#fb7185' },
  { name: 'Cider', color: '#ea580c', accent: '#fb923c' },
  { name: 'EcoFlow', color: '#0369a1', accent: '#0ea5e9' },
  { name: 'Dreame', color: '#92400e', accent: '#f59e0b' },
  { name: 'Insta360', color: '#a16207', accent: '#eab308' },
  { name: 'Zeelool', color: '#6d28d9', accent: '#a78bfa' }
]

const forwardTrack = [...row1, ...row1]
const reverseTrack = [...row2, ...row2]
</script>

<template>
  <section
    class="normal-n02"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact,
      'is-paused': paused
    }"
  >
    <div class="bw-intro">
      <h2 class="bw-title">深受全球 10,000+ 出海品牌信赖</h2>
    </div>

    <div class="bw-stage" aria-label="合作品牌展示墙">
      <div class="bw-row">
        <div class="bw-track is-forward">
          <div
            v-for="(brand, idx) in forwardTrack"
            :key="`f-${brand.name}-${idx}`"
            class="bw-chip"
          >
            <span class="bw-mark" :style="{ background: brand.accent }"></span>
            <span class="bw-word" :style="{ color: brand.color }">{{ brand.name }}</span>
          </div>
        </div>
      </div>

      <div class="bw-row">
        <div class="bw-track is-reverse">
          <div
            v-for="(brand, idx) in reverseTrack"
            :key="`r-${brand.name}-${idx}`"
            class="bw-chip"
          >
            <span class="bw-mark" :style="{ background: brand.accent }"></span>
            <span class="bw-word" :style="{ color: brand.color }">{{ brand.name }}</span>
          </div>
        </div>
      </div>

      <div class="bw-fade bw-fade-left" aria-hidden="true"></div>
      <div class="bw-fade bw-fade-right" aria-hidden="true"></div>
    </div>

    <div class="bw-footer">
      <span class="bw-hint">悬停品牌恢复原色</span>
      <button
        type="button"
        class="bw-play-btn"
        :aria-label="paused ? '继续滚动品牌墙' : '暂停滚动品牌墙'"
        @click.stop="paused = !paused"
      >
        {{ paused ? '▶' : '⏸' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.normal-n02 {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.bw-intro {
  text-align: center;
  margin-bottom: 10px;
}

.bw-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 800;
  color: #0d142b;
  letter-spacing: -0.01em;
}

.bw-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
}

.bw-row {
  width: 100%;
  overflow: hidden;
}

.bw-track {
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
}

.bw-track.is-forward {
  animation: bwMarqueeForward 18s linear infinite;
}

.bw-track.is-reverse {
  animation: bwMarqueeReverse 18s linear infinite;
}

.bw-stage:hover .bw-track,
.normal-n02.is-paused .bw-track {
  animation-play-state: paused;
}

.bw-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 13px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #eef2f7;
  filter: grayscale(1);
  opacity: 0.7;
  transition: filter 0.2s ease, opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  user-select: none;
  flex-shrink: 0;
}

.bw-chip:hover {
  filter: grayscale(0);
  opacity: 1;
  background: #ffffff;
  border-color: #cbd5e1;
}

.bw-mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.bw-word {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.bw-fade {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 38px;
  z-index: 2;
}

.bw-fade-left {
  left: 0;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.bw-fade-right {
  right: 0;
  background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.bw-footer {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.bw-hint {
  font-size: 10px;
  color: #94a3b8;
}

.bw-play-btn {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid #dce2f2;
  background: #ffffff;
  color: #64748b;
  font-size: 10.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
  flex-shrink: 0;
}

.bw-play-btn:hover {
  color: #1d4ed8;
  border-color: #93c5fd;
  background: #f8faff;
}

.normal-n02.is-compact {
  padding: 9px 10px;
}

.normal-n02.is-compact .bw-title {
  font-size: 12px;
}

.normal-n02.is-compact .bw-chip {
  height: 27px;
  padding: 0 10px;
}

.normal-n02.is-compact .bw-word {
  font-size: 10.5px;
}

.normal-n02.is-mobile {
  padding: 10px;
}

.normal-n02.is-mobile .bw-intro {
  margin-bottom: 8px;
}

.normal-n02.is-mobile .bw-title {
  font-size: 12px;
}

.normal-n02.is-mobile .bw-stage {
  gap: 6px;
}

.normal-n02.is-mobile .bw-track {
  gap: 7px;
}

.normal-n02.is-mobile .bw-chip {
  height: 27px;
  padding: 0 10px;
}

.normal-n02.is-mobile .bw-word {
  font-size: 10.5px;
}

.normal-n02.is-mobile .bw-fade {
  width: 24px;
}

.normal-n02.is-mobile .bw-play-btn {
  width: 24px;
  height: 24px;
  font-size: 10px;
}

@keyframes bwMarqueeForward {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes bwMarqueeReverse {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
