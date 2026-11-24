<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const logosTop = [
  { name: 'Shopify', mark: 'S', color: '#16a34a', bg: '#dcfce7' },
  { name: 'WhatsApp', mark: 'W', color: '#15803d', bg: '#bbf7d0' },
  { name: 'Meta Ads', mark: 'M', color: '#2563eb', bg: '#dbeafe' },
  { name: 'TikTok Shop', mark: 'T', color: '#0f172a', bg: '#e2e8f0' },
  { name: 'Shoplazza', mark: 'Z', color: '#e11d48', bg: '#ffe4e6' }
]

const logosBottom = [
  { name: 'Instagram', mark: 'I', color: '#db2777', bg: '#fce7f3' },
  { name: 'Telegram', mark: 'G', color: '#0284c7', bg: '#e0f2fe' },
  { name: 'LINE Official', mark: 'L', color: '#059669', bg: '#d1fae5' },
  { name: 'WooCommerce', mark: 'C', color: '#7c3aed', bg: '#ede9fe' },
  { name: 'Messenger', mark: 'B', color: '#1d4ed8', bg: '#dbeafe' }
]

const topTrack = [...logosTop, ...logosTop]
const bottomTrack = [...logosBottom, ...logosBottom]
</script>

<template>
  <div
    class="normal-n03"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
  >
    <h2 class="lc-title">合作客户与生态伙伴</h2>
    <p class="lc-sub">深度打通全球主流社媒与独立站生态，助力业务无缝连接</p>

    <div class="lc-rows">
      <div class="lc-row">
        <div class="lc-track is-top">
          <div
            v-for="(logo, idx) in topTrack"
            :key="`t-${logo.name}-${idx}`"
            class="lc-card"
          >
            <span
              class="lc-badge"
              :style="{ color: logo.color, background: logo.bg }"
            >{{ logo.mark }}</span>
            <span class="lc-name">{{ logo.name }}</span>
          </div>
        </div>
      </div>

      <div class="lc-row">
        <div class="lc-track is-bottom">
          <div
            v-for="(logo, idx) in bottomTrack"
            :key="`b-${logo.name}-${idx}`"
            class="lc-card"
          >
            <span
              class="lc-badge"
              :style="{ color: logo.color, background: logo.bg }"
            >{{ logo.mark }}</span>
            <span class="lc-name">{{ logo.name }}</span>
          </div>
        </div>
      </div>

      <div class="lc-mask lc-mask-left" aria-hidden="true"></div>
      <div class="lc-mask lc-mask-right" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped>
.normal-n03 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background: #fbfcfd;
  border: 1px solid #eef2f6;
  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
}

.lc-title {
  margin: 0 0 3px;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #0f172a;
}

.lc-sub {
  margin: 0;
  text-align: center;
  font-size: 10.5px;
  color: #64748b;
  line-height: 1.45;
}

.lc-rows {
  position: relative;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  overflow: hidden;
  padding: 3px 0;
}

.lc-row {
  width: 100%;
  overflow: hidden;
}

.lc-track {
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
}

.lc-track.is-top {
  animation: lcScrollLeft 19s linear infinite;
}

.lc-track.is-bottom {
  animation: lcScrollRight 19s linear infinite;
}

.lc-rows:hover .lc-track {
  animation-play-state: paused;
}

.lc-card {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 13px;
  background: #ffffff;
  border-radius: 11px;
  border: 1px solid rgba(226, 232, 240, 0.7);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
}

.lc-badge {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 10.5px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lc-name {
  font-size: 11.5px;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
}

.lc-mask {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12%;
  z-index: 2;
}

.lc-mask-left {
  left: 0;
  background: linear-gradient(90deg, rgba(251, 252, 253, 0.96) 0%, rgba(251, 252, 253, 0) 100%);
}

.lc-mask-right {
  right: 0;
  background: linear-gradient(270deg, rgba(251, 252, 253, 0.96) 0%, rgba(251, 252, 253, 0) 100%);
}

.normal-n03.is-compact {
  padding: 9px 10px;
}

.normal-n03.is-compact .lc-title {
  font-size: 12.5px;
}

.normal-n03.is-compact .lc-card {
  height: 30px;
  padding: 0 10px;
}

.normal-n03.is-compact .lc-name {
  font-size: 10.5px;
}

.normal-n03.is-mobile {
  padding: 10px;
}

.normal-n03.is-mobile .lc-title {
  font-size: 12.5px;
}

.normal-n03.is-mobile .lc-sub {
  font-size: 10px;
}

.normal-n03.is-mobile .lc-rows {
  margin-top: 8px;
  gap: 6px;
}

.normal-n03.is-mobile .lc-track {
  gap: 7px;
}

.normal-n03.is-mobile .lc-card {
  height: 30px;
  padding: 0 10px;
  border-radius: 9px;
}

.normal-n03.is-mobile .lc-badge {
  width: 17px;
  height: 17px;
  font-size: 9.5px;
}

.normal-n03.is-mobile .lc-name {
  font-size: 10.5px;
}

@keyframes lcScrollLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes lcScrollRight {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
