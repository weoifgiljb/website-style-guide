<script setup>
import { computed } from 'vue'
import { Menu } from 'lucide-vue-next'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

const props = defineProps({
  shellMode: { type: String, default: '' },
  simWidth: { type: Number, default: 1280 },
  simHeight: { type: Number, default: null },
  isDragging: { type: Boolean, default: false }
})

const emit = defineEmits(['body-scroll'])

const { pageTarget, previewViewport } = useCatalogStore()

const resolvedShell = computed(() => {
  if (props.shellMode) return props.shellMode
  return previewViewport.value === 'mobile' ? 'phone' : 'browser'
})

const isMobileNav = computed(() => props.simWidth < 640 || previewViewport.value === 'mobile')

const frameStyle = computed(() => {
  const style = {}
  if (resolvedShell.value === 'phone') {
    if (props.simWidth !== 390) {
      style.width = `${props.simWidth + 12}px`
    }
  } else {
    style.width = `${props.simWidth}px`
  }
  if (props.simHeight) {
    style.height = `${props.simHeight}px`
  }
  return style
})

const previewUrl = computed(() => {
  const raw = pageTarget.value.trim()
  if (!raw) return 'https://salesmartly.com/features/new-page'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  const pathPart = raw.startsWith('/') ? raw : `/${raw}`
  return `https://salesmartly.com${pathPart}`
})

function onBodyScroll(event) {
  if (!props.simHeight) return
  const el = event.currentTarget
  if (!el) return
  const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight)
  emit('body-scroll', Math.min(1, Math.max(0, el.scrollTop / maxScroll)))
}
</script>

<template>
  <div
    class="device-frame"
    :class="[
      `is-${resolvedShell}`,
      {
        'has-fixed-height': Boolean(simHeight),
        'no-transition': isDragging
      }
    ]"
    :style="frameStyle"
  >
    <div v-if="resolvedShell === 'phone'" class="phone-bezel-top">
      <div class="phone-notch"></div>
    </div>
    <div v-else class="browser-chrome" :class="{ 'is-responsive-bar': resolvedShell === 'responsive' }">
      <div v-if="resolvedShell === 'browser'" class="traffic-dots" aria-hidden="true">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <div class="browser-address">{{ previewUrl }}</div>
      <span class="chrome-width-tag">{{ simWidth }}{{ simHeight ? ` × ${simHeight}` : 'px' }}</span>
    </div>

    <div class="mock-navbar" :class="{ 'is-mobile': isMobileNav }">
      <span class="mock-brand">SaleSmartly · Logo</span>
      <div v-if="!isMobileNav" class="mock-nav-links">
        <span>功能</span>
        <span>方案</span>
        <span>定价</span>
        <span class="mock-nav-cta">免费试用</span>
      </div>
      <div v-else class="mock-nav-mobile-right">
        <span class="mock-nav-cta">免费试用</span>
        <Menu :size="15" :stroke-width="2" class="mock-burger" aria-hidden="true" />
      </div>
    </div>

    <div class="mock-page-body" @scroll="onBodyScroll">
      <slot />
    </div>

    <div class="mock-footer" :class="{ 'is-mobile': isMobileNav }">
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
  transition: width 0.22s var(--ease);
}

.device-frame.no-transition {
  transition: none;
}

.device-frame.has-fixed-height {
  display: flex;
  flex-direction: column;
}

.device-frame.is-browser {
  border-radius: 12px;
}

.device-frame.is-responsive {
  border-radius: 6px;
  border-color: #94a3b8;
  box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.14);
}

.device-frame.is-phone {
  width: 402px;
  border: 6px solid #1e293b;
  border-radius: 30px;
}

.browser-chrome {
  flex-shrink: 0;
  background: #f1f5f9;
  border-bottom: 1px solid var(--border);
  padding: 7px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.browser-chrome.is-responsive-bar {
  padding: 5px 10px;
  background: #f8fafc;
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
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2px 9px;
  font-size: 11px;
  color: var(--text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.chrome-width-tag {
  flex-shrink: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.phone-bezel-top {
  flex-shrink: 0;
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
  flex-shrink: 0;
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
  color: var(--text-secondary);
}

.mock-page-body {
  padding: 14px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.device-frame.has-fixed-height .mock-page-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.mock-footer {
  flex-shrink: 0;
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
