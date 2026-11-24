<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const partners = [
  {
    label: 'Meta Business Partner',
    emblem: '∞',
    badge: 'OFFICIAL',
    color: '#0866ff',
    bg: '#eff6ff'
  },
  {
    label: 'TikTok Marketing',
    emblem: '♪',
    badge: 'PARTNER',
    color: '#0f172a',
    bg: '#f1f5f9'
  },
  {
    label: 'Shopify Plus',
    emblem: 'S+',
    badge: 'CERTIFIED',
    color: '#15803d',
    bg: '#ecfdf5'
  },
  {
    label: 'Shoplazza',
    emblem: 'Z',
    badge: 'ECOSYSTEM',
    color: '#e11d48',
    bg: '#fff1f2'
  }
]
</script>

<template>
  <section
    class="normal-n09"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
  >
    <h2 class="pt-heading">官方生态与平台合作伙伴</h2>

    <div class="pt-grid">
      <div
        v-for="partner in partners"
        :key="partner.label"
        class="n-card-item partner-card"
      >
        <div class="pt-frame">
          <span
            class="pt-emblem"
            :style="{ color: partner.color, background: partner.bg }"
          >{{ partner.emblem }}</span>
          <span class="pt-tier">{{ partner.badge }}</span>
        </div>
        <p class="pt-label">{{ partner.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n09 {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
}

.pt-heading {
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

.pt-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  justify-items: center;
}

.partner-card {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s ease;
}

.partner-card:hover {
  opacity: 0.8;
}

.pt-frame {
  width: 100%;
  height: 62px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #eef2f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px;
  box-sizing: border-box;
}

.pt-emblem {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pt-tier {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.pt-label {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.3;
  font-weight: 500;
  letter-spacing: -0.25px;
  color: rgba(0, 14, 24, 0.9);
  text-align: center;
  width: 100%;
}

.normal-n09.is-compact {
  padding: 10px;
  gap: 9px;
}

.normal-n09.is-compact .pt-heading {
  font-size: 12.5px;
}

.normal-n09.is-compact .pt-frame {
  height: 50px;
}

.normal-n09.is-compact .pt-label {
  font-size: 10px;
}

.normal-n09.is-mobile {
  padding: 11px 10px;
  gap: 10px;
}

.normal-n09.is-mobile .pt-heading {
  font-size: 12.5px;
}

.normal-n09.is-mobile .pt-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.normal-n09.is-mobile .pt-frame {
  height: 54px;
}

.normal-n09.is-mobile .pt-label {
  font-size: 10.5px;
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
