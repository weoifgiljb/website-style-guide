<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const align = ref('center')
const dark = ref(false)
const animKey = ref(0)

function toggleAlign() {
  align.value = align.value === 'center' ? 'left' : 'center'
}

function toggleDark() {
  dark.value = !dark.value
}

watch(
  () => props.replayTick,
  () => {
    animKey.value += 1
  }
)
</script>

<template>
  <div
    class="normal-n01"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact,
      'is-dark': dark,
      'is-left': align === 'left'
    }"
  >
    <div class="n-ctrl">
      <button
        type="button"
        class="n-ctrl-btn"
        :class="{ active: align === 'left' }"
        @click.stop="toggleAlign"
      >
        {{ align === 'center' ? '⇄ 居中' : '⇄ 左对齐' }}
      </button>
      <button
        type="button"
        class="n-ctrl-btn"
        :class="{ active: dark }"
        @click.stop="toggleDark"
      >
        {{ dark ? '☾ 深色' : '☀ 浅色' }}
      </button>
    </div>

    <div :key="animKey" class="intro-body">
      <p class="eyebrow-pill">全渠道协同底座</p>
      <h2 class="intro-title">一站式连接全球客户沟通触点</h2>
      <p class="intro-desc">
        统一聚合社媒、独立站与即时通讯消息，让每次接待都有迹可循。
      </p>
    </div>
  </div>
</template>

<style scoped>
.normal-n01 {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.22s ease, border-color 0.22s ease, color 0.22s ease;
  overflow: hidden;
}

.normal-n01.is-dark {
  background: linear-gradient(180deg, #0d142b 0%, #070b18 100%);
  border-color: #1e293b;
}

.n-ctrl {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  flex-wrap: wrap;
}

.n-ctrl-btn {
  border: 1px solid #dce2f2;
  background: #f8fafc;
  color: #526b94;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 1.2;
  padding: 3px 8px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.n-ctrl-btn:hover {
  border-color: #2463f5;
  color: #2463f5;
}

.n-ctrl-btn.active {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
}

.normal-n01.is-dark .n-ctrl-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: #334155;
  color: #cbd5e1;
}

.normal-n01.is-dark .n-ctrl-btn:hover,
.normal-n01.is-dark .n-ctrl-btn.active {
  background: rgba(91, 154, 255, 0.14);
  border-color: #38517d;
  color: #5b9aff;
}

.intro-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
  animation: introReveal 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.normal-n01.is-left .intro-body {
  align-items: flex-start;
  text-align: left;
  margin: 0;
}

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #bfd7ff;
  background: #f7faff;
  color: #2463f5;
  border-radius: 999px;
  padding: 3px 11px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 10px;
  transition: all 0.2s ease;
}

.normal-n01.is-dark .eyebrow-pill {
  border-color: #38517d;
  background: rgba(255, 255, 255, 0.04);
  color: #5b9aff;
}

.intro-title {
  width: 100%;
  font-size: 16.5px;
  font-weight: 800;
  line-height: 1.32;
  letter-spacing: -0.015em;
  color: #0d142b;
  margin: 0;
  transition: color 0.2s ease;
}

.normal-n01.is-dark .intro-title {
  color: #ffffff;
}

.intro-desc {
  width: 100%;
  margin-top: 8px;
  font-size: 11.5px;
  line-height: 1.55;
  color: #526b94;
  transition: color 0.2s ease;
}

.normal-n01.is-dark .intro-desc {
  color: #cbd5e1;
}

.normal-n01.is-compact {
  padding: 10px 12px 13px;
  gap: 6px;
}

.normal-n01.is-compact .eyebrow-pill {
  font-size: 10px;
  padding: 2px 9px;
  margin-bottom: 7px;
}

.normal-n01.is-compact .intro-title {
  font-size: 14.5px;
}

.normal-n01.is-compact .intro-desc {
  font-size: 10.5px;
  margin-top: 5px;
}

.normal-n01.is-mobile {
  padding: 10px 11px 13px;
  gap: 6px;
}

.normal-n01.is-mobile .n-ctrl {
  gap: 4px;
}

.normal-n01.is-mobile .n-ctrl-btn {
  font-size: 10px;
  padding: 2px 7px;
}

.normal-n01.is-mobile .eyebrow-pill {
  font-size: 10px;
  padding: 2px 9px;
  margin-bottom: 7px;
}

.normal-n01.is-mobile .intro-title {
  font-size: 14px;
  line-height: 1.35;
}

.normal-n01.is-mobile .intro-desc {
  font-size: 10.5px;
  line-height: 1.48;
  margin-top: 6px;
}

@keyframes introReveal {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
