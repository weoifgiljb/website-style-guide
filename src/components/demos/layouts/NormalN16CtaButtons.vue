<script setup>
import { ref, onUnmounted } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const tabs = [
  { key: 'ctaGroup', label: 'CtaGroup 浅底' },
  { key: 'landingHero', label: 'LandingHero 深底' },
  { key: 'buttonVariants', label: 'Button 变体' }
]

const mode = ref('ctaGroup')
const lastClicked = ref('')
let feedbackTimer = null

function selectMode(nextKey) {
  mode.value = nextKey
  lastClicked.value = ''
}

function handleBtnClick(name) {
  lastClicked.value = name
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => {
    lastClicked.value = ''
  }, 1000)
}

onUnmounted(() => {
  if (feedbackTimer) clearTimeout(feedbackTimer)
})
</script>

<template>
  <div
    class="normal-n16"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <!-- Variant Switcher -->
    <div class="n16-switcher" role="tablist" aria-label="CTA 按钮组件切换">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        role="tab"
        :aria-selected="mode === tab.key"
        class="n16-tab-btn"
        :class="{ active: mode === tab.key }"
        @click.stop="selectMode(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Mode 1: CtaGroup.js (Light surface) -->
    <div v-if="mode === 'ctaGroup'" class="n16-pad is-light">
      <div class="n16-caption">
        <code>CtaGroup.js</code>
        <span>圆角 12px · 主按钮上浮阴影 + 灰描边次按钮</span>
      </div>
      <div class="n16-btn-row">
        <button
          type="button"
          class="cta-group-primary"
          @click.stop="handleBtnClick('免费试用')"
        >
          <span>免费试用</span>
          <i aria-hidden="true">›</i>
        </button>
        <button
          type="button"
          class="cta-group-outline"
          @click.stop="handleBtnClick('预约演示')"
        >
          预约演示
        </button>
      </div>
    </div>

    <!-- Mode 2: LandingHeroCtaGroup (Dark #0f172a pad) -->
    <div v-else-if="mode === 'landingHero'" class="n16-pad is-dark">
      <div class="n16-caption on-dark">
        <code>LandingHeroCta.js</code>
        <span>深底胶囊左白描边 + 右品牌实心</span>
      </div>
      <div class="n16-btn-row">
        <button
          type="button"
          class="landing-outline-dark"
          @click.stop="handleBtnClick('免费试用')"
        >
          免费试用
        </button>
        <button
          type="button"
          class="landing-solid-brand"
          @click.stop="handleBtnClick('预约演示')"
        >
          预约演示
        </button>
      </div>
    </div>

    <!-- Mode 3: Button.js Variants -->
    <div v-else class="n16-pad is-light">
      <div class="n16-caption">
        <code>Button.js</code>
        <span>brand 实心胶囊 / outline 描边 / ghost + readMore</span>
      </div>
      <div class="n16-btn-row is-three">
        <button
          type="button"
          class="btn-var-brand"
          @click.stop="handleBtnClick('立即体验')"
        >
          立即体验
        </button>
        <button
          type="button"
          class="btn-var-outline"
          @click.stop="handleBtnClick('查看方案')"
        >
          查看方案
        </button>
        <button
          type="button"
          class="btn-var-ghost"
          @click.stop="handleBtnClick('了解更多')"
        >
          <span>了解更多</span>
          <i aria-hidden="true">›</i>
        </button>
      </div>
    </div>

    <div v-if="lastClicked" class="n16-toast">
      已触发「{{ lastClicked }}」交互响应
    </div>
  </div>
</template>

<style scoped>
.normal-n16 {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  box-sizing: border-box;
}

.n16-switcher {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  background: #f1f5f9;
  padding: 3px;
  border-radius: 10px;
}

.n16-tab-btn {
  border: none;
  background: transparent;
  color: #475569;
  font-size: 9.5px;
  font-weight: 600;
  padding: 5px 4px;
  border-radius: 7px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.18s ease;
}

.n16-tab-btn:hover {
  color: #0f172a;
}

.n16-tab-btn.active {
  background: #ffffff;
  color: #2563eb;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.n16-pad {
  border-radius: 12px;
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  transition: background 0.22s ease;
  box-sizing: border-box;
}

.n16-pad.is-light {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.n16-pad.is-dark {
  background: #0f172a;
  border: 1px solid #1e293b;
}

.n16-caption {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 9px;
  color: #64748b;
}

.n16-caption code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 700;
  color: #1e40af;
  background: #dbeafe;
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 8.5px;
}

.n16-caption.on-dark {
  color: #94a3b8;
}

.n16-caption.on-dark code {
  color: #93c5fd;
  background: rgba(37, 99, 235, 0.24);
}

.n16-btn-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Mode 1: CtaGroup.js */
.cta-group-primary {
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  background: #1d4ed8;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  box-sizing: border-box;
}

.cta-group-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(29, 78, 216, 0.28);
}

.cta-group-primary i {
  font-style: normal;
  font-size: 13px;
  line-height: 1;
}

.cta-group-outline {
  height: 36px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease;
  box-sizing: border-box;
}

.cta-group-outline:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

/* Mode 2: LandingHeroCta.js */
.landing-outline-dark {
  height: 36px;
  padding: 0 17px;
  border-radius: 999px;
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.18s ease, background 0.18s ease;
  box-sizing: border-box;
}

.landing-outline-dark:hover {
  background: rgba(255, 255, 255, 0.08);
  opacity: 0.9;
}

.landing-solid-brand {
  height: 36px;
  padding: 0 17px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s ease, opacity 0.18s ease;
  box-sizing: border-box;
}

.landing-solid-brand:hover {
  background: #1d4ed8;
}

/* Mode 3: Button.js variants */
.btn-var-brand {
  height: 34px;
  padding: 0 15px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.18s ease;
}

.btn-var-brand:hover {
  opacity: 0.86;
}

.btn-var-outline {
  height: 34px;
  padding: 0 15px;
  border-radius: 999px;
  border: 1px solid #0f172a;
  background: transparent;
  color: #0f172a;
  font-size: 10.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s ease;
}

.btn-var-outline:hover {
  background: rgba(15, 23, 42, 0.05);
}

.btn-var-ghost {
  height: 34px;
  padding: 0 10px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #2563eb;
  font-size: 10.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
}

.btn-var-ghost i {
  font-style: normal;
  font-size: 13px;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.btn-var-ghost:hover i {
  transform: translateX(2.5px);
  opacity: 0.7;
}

.n16-toast {
  text-align: center;
  font-size: 9px;
  font-weight: 600;
  color: #2563eb;
}

/* Compact */
.normal-n16.is-compact {
  padding: 8px 9px;
  gap: 7px;
}

.normal-n16.is-compact .n16-pad {
  padding: 10px 9px;
  gap: 8px;
}

.normal-n16.is-compact .cta-group-primary,
.normal-n16.is-compact .cta-group-outline,
.normal-n16.is-compact .landing-outline-dark,
.normal-n16.is-compact .landing-solid-brand {
  height: 31px;
  font-size: 10px;
  padding: 0 13px;
}

/* Mobile (316px shell — matches CtaGroup.js flex-col sm:flex-row) */
.normal-n16.is-mobile {
  padding: 9px 9px;
  gap: 8px;
}

.normal-n16.is-mobile .n16-tab-btn {
  font-size: 8.5px;
  padding: 4px 2px;
}

.normal-n16.is-mobile .n16-pad {
  padding: 10px 9px;
  gap: 9px;
}

.normal-n16.is-mobile .n16-caption {
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.normal-n16.is-mobile .n16-btn-row {
  flex-direction: column;
  width: 100%;
  gap: 7px;
}

.normal-n16.is-mobile .cta-group-primary,
.normal-n16.is-mobile .cta-group-outline,
.normal-n16.is-mobile .landing-outline-dark,
.normal-n16.is-mobile .landing-solid-brand,
.normal-n16.is-mobile .btn-var-brand,
.normal-n16.is-mobile .btn-var-outline,
.normal-n16.is-mobile .btn-var-ghost {
  width: 100%;
  height: 33px;
  font-size: 10px;
}
</style>
