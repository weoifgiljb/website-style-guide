<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

const { pageTarget, previewViewport } = useCatalogStore()

const previewUrl = computed(() => {
  const raw = pageTarget.value.trim()
  if (!raw) return 'https://salesmartly.com/features/new-page'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  const pathPart = raw.startsWith('/') ? raw : `/${raw}`
  return `https://salesmartly.com${pathPart}`
})
</script>

<template>
  <div
    class="device-frame"
    :class="previewViewport === 'mobile' ? 'is-phone' : 'is-browser'"
  >
    <div v-if="previewViewport === 'desktop'" class="browser-chrome">
      <div class="traffic-dots">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <div class="browser-address">{{ previewUrl }}</div>
    </div>
    <div v-else class="phone-bezel-top">
      <div class="phone-notch"></div>
    </div>

    <div class="mock-navbar" :class="{ 'is-mobile': previewViewport === 'mobile' }">
      <span class="mock-brand">SaleSmartly · Logo</span>
      <div v-if="previewViewport === 'desktop'" class="mock-nav-links">
        <span>功能</span>
        <span>方案</span>
        <span>定价</span>
        <span class="mock-nav-cta">免费试用</span>
      </div>
      <div v-else class="mock-nav-mobile-right">
        <span class="mock-nav-cta">免费试用</span>
        <span class="mock-burger">☰</span>
      </div>
    </div>

    <div class="mock-page-body">
      <slot />
    </div>

    <div class="mock-footer" :class="{ 'is-mobile': previewViewport === 'mobile' }">
      <span>© SaleSmartly 全渠道客户沟通平台</span>
      <span>产品 · 解决方案 · 帮助中心 · 隐私政策</span>
    </div>
  </div>
</template>

<style scoped>
.device-frame {
  background: #ffffff;
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: width 0.25s var(--ease);
}

.device-frame.is-browser {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
}

.device-frame.is-phone {
  width: 402px;
  max-width: 100%;
  border: 6px solid #1e293b;
  border-radius: 30px;
}

.browser-chrome {
  background: #f1f5f9;
  border-bottom: 1px solid var(--border);
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.traffic-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #f87171; }
.dot.yellow { background: #fbbf24; }
.dot.green { background: #34d399; }

.browser-address {
  flex: 1;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 11.5px;
  color: var(--text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.phone-bezel-top {
  background: #ffffff;
  padding: 7px 0 4px;
  display: flex;
  justify-content: center;
}

.phone-notch {
  width: 88px;
  height: 14px;
  border-radius: 999px;
  background: #0f172a;
}

.mock-navbar {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.mock-brand {
  font-weight: 700;
  color: var(--text);
}

.mock-nav-links {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-secondary);
}

.mock-nav-mobile-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mock-nav-cta {
  background: var(--primary);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
}

.mock-burger {
  font-size: 14px;
  color: var(--text-secondary);
}

.mock-page-body {
  padding: 14px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mock-footer {
  padding: 12px 16px;
  background: #0f172a;
  color: #94a3b8;
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.mock-footer.is-mobile {
  flex-direction: column;
  align-items: flex-start;
}
</style>
