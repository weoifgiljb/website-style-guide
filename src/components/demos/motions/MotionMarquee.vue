<script setup>
defineProps({
  replayTick: { type: Number, default: 0 }
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
  <div class="motion-marquee">
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
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.demo-marquee-wrap {
  width: 100%;
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
  padding: 6px 14px;
  font-size: 12px;
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

@keyframes marqueeRun {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
