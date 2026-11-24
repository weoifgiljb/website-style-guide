<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const isDarkPreview = ref(false)
const popKey = ref(0)

watch(
  () => props.replayTick,
  () => {
    popKey.value += 1
  }
)

function replayPopIn() {
  popKey.value += 1
}

function toggleSurface() {
  isDarkPreview.value = !isDarkPreview.value
  popKey.value += 1
}

const gradientSizes = [
  { key: 'sm', label: 'sm · 48px', icon: '⚡' },
  { key: 'md', label: 'md · 64px', icon: '💬' },
  { key: 'lg', label: 'lg · 80px', icon: '🌐' }
]
</script>

<template>
  <div
    class="normal-n18"
    :class="{
      'is-dark': isDarkPreview,
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
  >
    <!-- Top Interactive Controls -->
    <div class="n18-toolbar">
      <span class="n18-label">三层同心弹入徽标 + 蓝青渐变图标容器</span>
      <div class="n18-actions">
        <button
          type="button"
          class="n18-ctrl-btn"
          @click.stop="toggleSurface"
        >
          {{ isDarkPreview ? '☀️ 浅底预览' : '🌙 深底预览' }}
        </button>
        <button
          type="button"
          class="n18-ctrl-btn is-replay"
          @click.stop="replayPopIn"
        >
          ↻ 重播弹入
        </button>
      </div>
    </div>

    <div class="n18-grid">
      <!-- Left Side: IconBadge.js (Light & onDark instances) -->
      <div class="n-card-item n18-panel">
        <div class="panel-head">
          <code>IconBadge.js</code>
          <span>64 → 48 → Icon 错峰缩放</span>
        </div>

        <div :key="popKey" class="badge-pair">
          <!-- Light IconBadge -->
          <div class="badge-slot is-light-slot">
            <div class="icon-badge is-light">
              <span class="layer-outer"></span>
              <div class="layer-mid-wrap">
                <span class="layer-mid"></span>
                <span class="layer-icon" aria-hidden="true">✦</span>
              </div>
            </div>
            <em class="slot-caption">默认浅底</em>
          </div>

          <!-- onDark IconBadge -->
          <div class="badge-slot is-dark-slot">
            <div class="icon-badge is-on-dark">
              <span class="layer-outer"></span>
              <div class="layer-mid-wrap">
                <span class="layer-mid"></span>
                <span class="layer-icon" aria-hidden="true">⚡</span>
              </div>
            </div>
            <em class="slot-caption">onDark</em>
          </div>
        </div>
      </div>

      <!-- Right Side: GradientIcon.js (sm / md / lg) -->
      <div class="n-card-item n18-panel">
        <div class="panel-head">
          <code>GradientIcon.js</code>
          <span>#333BFA → #60a5fa</span>
        </div>

        <div :key="`g-${popKey}`" class="grad-row">
          <div
            v-for="item in gradientSizes"
            :key="item.key"
            class="grad-item"
          >
            <div class="grad-box" :class="`size-${item.key}`">
              <!-- Crisp white SVG / glyph icon -->
              <svg
                v-if="item.key === 'sm'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="grad-svg"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <svg
                v-else-if="item.key === 'md'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="grad-svg"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="grad-svg"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 0 0 18M12 3a14.5 14.5 0 0 1 0 18" />
              </svg>
            </div>
            <em class="slot-caption">{{ item.key }}</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.normal-n18 {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  transition: background 0.24s ease, border-color 0.24s ease;
  box-sizing: border-box;
}

.normal-n18.is-dark {
  background: #0b1224;
  border-color: #1e293b;
}

.n18-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.n18-label {
  font-size: 9.5px;
  font-weight: 600;
  color: #475569;
}

.normal-n18.is-dark .n18-label {
  color: #94a3b8;
}

.n18-actions {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.n18-ctrl-btn {
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  font-size: 9px;
  font-weight: 600;
  padding: 2.5px 8px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.n18-ctrl-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.n18-ctrl-btn.is-replay {
  color: #2563eb;
  border-color: #bfdbfe;
  background: #eff6ff;
}

.normal-n18.is-dark .n18-ctrl-btn {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
}

.normal-n18.is-dark .n18-ctrl-btn.is-replay {
  border-color: rgba(96, 165, 250, 0.45);
  background: rgba(37, 99, 235, 0.25);
  color: #93c5fd;
}

.n18-grid {
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: 9px;
}

.n18-panel {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  transition: background 0.24s ease, border-color 0.24s ease;
  box-sizing: border-box;
}

.normal-n18.is-dark .n18-panel {
  background: #131d35;
  border-color: rgba(255, 255, 255, 0.08);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-size: 8.5px;
  color: #64748b;
}

.normal-n18.is-dark .panel-head {
  color: #94a3b8;
}

.panel-head code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 700;
  font-size: 8.5px;
  color: #1d4ed8;
  background: #dbeafe;
  padding: 1px 5px;
  border-radius: 4px;
}

.normal-n18.is-dark .panel-head code {
  color: #93c5fd;
  background: rgba(37, 99, 235, 0.26);
}

/* Left: IconBadge concentric staggered pop-in */
.badge-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
  align-items: center;
}

.badge-slot {
  border-radius: 10px;
  padding: 7px 4px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.badge-slot.is-light-slot {
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.badge-slot.is-dark-slot {
  background: #0f172a;
  border: 1px solid #1e293b;
}

.icon-badge {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-outer {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  animation: badgePopIn 0.36s cubic-bezier(0.34, 1.45, 0.64, 1) 0.2s both;
}

.layer-mid-wrap {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-mid {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  animation: badgePopIn 0.34s cubic-bezier(0.34, 1.45, 0.64, 1) 0.1s both;
}

.layer-icon {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  animation: badgePopIn 0.3s cubic-bezier(0.34, 1.45, 0.64, 1) 0s both;
}

.icon-badge.is-light .layer-outer {
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.13) 0%, rgba(37, 99, 235, 0.05) 100%);
}

.icon-badge.is-light .layer-mid {
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.16) 0%, rgba(37, 99, 235, 0.07) 100%);
}

.icon-badge.is-light .layer-icon {
  color: #2563eb;
}

.icon-badge.is-on-dark .layer-outer {
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.18) 0%, rgba(96, 165, 250, 0.06) 100%);
}

.icon-badge.is-on-dark .layer-mid {
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.22) 0%, rgba(96, 165, 250, 0.08) 100%);
}

.icon-badge.is-on-dark .layer-icon {
  color: #60a5fa;
}

/* Right: GradientIcon sm / md / lg */
.grad-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 8px;
  padding: 6px 2px 3px;
}

.grad-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.grad-box {
  background: linear-gradient(90deg, #333bfa, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 18px -6px rgba(51, 59, 250, 0.35);
  transition: transform 0.22s ease;
  animation: badgePopIn 0.34s cubic-bezier(0.34, 1.35, 0.64, 1) both;
}

.grad-box:hover {
  transform: translateY(-2px) scale(1.04);
}

.grad-box.size-sm {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  animation-delay: 0.04s;
}

.grad-box.size-sm .grad-svg {
  width: 16px;
  height: 16px;
}

.grad-box.size-md {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  animation-delay: 0.12s;
}

.grad-box.size-md .grad-svg {
  width: 21px;
  height: 21px;
}

.grad-box.size-lg {
  width: 54px;
  height: 54px;
  border-radius: 20px;
  animation-delay: 0.2s;
}

.grad-box.size-lg .grad-svg {
  width: 25px;
  height: 25px;
}

.slot-caption {
  font-style: normal;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 8.5px;
  color: #64748b;
}

.badge-slot.is-dark-slot .slot-caption,
.normal-n18.is-dark .slot-caption {
  color: #94a3b8;
}

@keyframes badgePopIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Compact */
.normal-n18.is-compact {
  padding: 8px 9px;
  gap: 7px;
}

.normal-n18.is-compact .icon-badge {
  width: 44px;
  height: 44px;
}

.normal-n18.is-compact .layer-mid-wrap {
  width: 32px;
  height: 32px;
}

.normal-n18.is-compact .grad-box.size-sm { width: 30px; height: 30px; }
.normal-n18.is-compact .grad-box.size-md { width: 38px; height: 38px; }
.normal-n18.is-compact .grad-box.size-lg { width: 46px; height: 46px; }

/* Mobile (316px shell — stacks cleanly into 2 compact rows) */
.normal-n18.is-mobile {
  padding: 9px 9px;
  gap: 8px;
}

.normal-n18.is-mobile .n18-toolbar {
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.normal-n18.is-mobile .n18-grid {
  grid-template-columns: 1fr;
  gap: 8px;
}

.normal-n18.is-mobile .n18-panel {
  padding: 8px 9px;
}

.normal-n18.is-mobile .icon-badge {
  width: 46px;
  height: 46px;
}

.normal-n18.is-mobile .layer-mid-wrap {
  width: 34px;
  height: 34px;
}

.normal-n18.is-mobile .grad-box.size-sm { width: 32px; height: 32px; }
.normal-n18.is-mobile .grad-box.size-md { width: 40px; height: 40px; }
.normal-n18.is-mobile .grad-box.size-lg { width: 48px; height: 48px; border-radius: 17px; }
</style>
