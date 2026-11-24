<script setup>
const props = defineProps({
  replayTick: { type: Number, default: 0 },
  viewport: { type: String, default: 'desktop' }
})

const channels = [
  { name: 'WhatsApp', color: '#22c55e' },
  { name: 'Messenger', color: '#2563eb' },
  { name: 'Instagram', color: '#ec4899' },
  { name: 'Telegram', color: '#0ea5e9' },
  { name: 'LINE', color: '#10b981' },
  { name: 'TikTok', color: '#111827' }
]

const marqueeItems = [...channels, ...channels]
</script>

<template>
  <div class="motion-marquee" :class="{ 'is-mobile': props.viewport === 'mobile' }">
    <span class="stage-badge">鼠标移上去自动暂停</span>
    <div class="demo-marquee-wrap">
      <div class="marquee-track">
        <span
          v-for="(item, idx) in marqueeItems"
          :key="`${item.name}-${idx}`"
          class="logo-chip"
        >
          <span class="logo-dot" :style="{ background: item.color }"></span>
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-marquee {
  width: 100%;
  min-width: 0;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-marquee-wrap {
  width: 100%;
  max-width: 440px;
  min-width: 0;
  overflow: hidden;
  padding: 12px 0 6px;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee-track {
  display: flex;
  gap: 10px;
  width: max-content;
  animation: marqueeRun 14s linear infinite;
}

.demo-marquee-wrap:hover .marquee-track {
  animation-play-state: paused;
}

.logo-chip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 15px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.motion-marquee.is-mobile .demo-marquee-wrap {
  max-width: 100%;
  padding: 10px 0 4px;
}

.motion-marquee.is-mobile .marquee-track {
  gap: 8px;
}

.motion-marquee.is-mobile .logo-chip {
  padding: 5px 11px;
  font-size: 11px;
  gap: 5px;
}

.motion-marquee.is-mobile .logo-dot {
  width: 7px;
  height: 7px;
}

@keyframes marqueeRun {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 5px));
  }
}

.motion-marquee.is-mobile .marquee-track {
  animation-name: marqueeRunMobile;
}

@keyframes marqueeRunMobile {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 4px));
  }
}
</style>
