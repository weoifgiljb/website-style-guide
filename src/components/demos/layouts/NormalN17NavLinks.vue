<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const textLinks = [
  {
    key: 'right',
    label: '探索全部行业方案',
    arrowChar: '→',
    meta: 'arrow="right"'
  },
  {
    key: 'upRight',
    label: '查看开发者文档',
    arrowChar: '↗',
    meta: 'arrow="upRight"'
  },
  {
    key: 'chevron',
    label: '了解功能详情',
    arrowChar: '›',
    meta: 'arrow="chevron"'
  }
]
</script>

<template>
  <div
    class="normal-n17"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <!-- Row 1: DetailPageBackLink.js -->
    <div class="n17-block">
      <div class="n17-block-head">
        <code>DetailPageBackLink.js</code>
        <span>站内详情页返回入口（浅底默认 + 深底胶囊）</span>
      </div>

      <div class="n17-back-grid">
        <div class="back-pad is-light">
          <a
            href="#cases"
            class="back-link-light"
            @click.stop.prevent
          >
            <i class="back-chevron" aria-hidden="true">‹</i>
            <span>返回客户案例</span>
          </a>
        </div>

        <div class="back-pad is-dark">
          <a
            href="#integrations"
            class="back-link-dark-pill"
            @click.stop.prevent
          >
            <i class="back-arrow" aria-hidden="true">←</i>
            <span>返回集成列表</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Row 2: TextLink.js + Alink.js -->
    <div class="n17-block">
      <div class="n17-block-head">
        <code>TextLink.js / Alink.js</code>
        <span>三种语义箭头与悬停位移动效</span>
      </div>

      <div class="n17-links-row">
        <a
          v-for="item in textLinks"
          :key="item.key"
          href="#link"
          class="n-card-item text-link-chip"
          :class="`arrow-${item.key}`"
          @click.stop.prevent
        >
          <span class="tl-main">
            <span>{{ item.label }}</span>
            <i class="tl-icon" aria-hidden="true">{{ item.arrowChar }}</i>
          </span>
          <em class="tl-meta">{{ item.meta }}</em>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.normal-n17 {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

.n17-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.n17-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 9px;
  color: #64748b;
}

.n17-block-head code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 8.5px;
  font-weight: 700;
  color: #1d4ed8;
  background: #eff6ff;
  padding: 1px 6px;
  border-radius: 5px;
}

.n17-back-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.back-pad {
  border-radius: 11px;
  padding: 9px 11px;
  display: flex;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
}

.back-pad.is-light {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.back-pad.is-dark {
  background: linear-gradient(120deg, #0f172a 0%, #1e3a8a 100%);
  border: 1px solid #1e293b;
}

.back-link-light {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10.5px;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: color 0.18s ease;
}

.back-chevron {
  font-style: normal;
  font-size: 14px;
  line-height: 1;
  transition: transform 0.18s ease;
}

.back-link-light:hover {
  color: #333bfa;
  text-decoration: underline;
}

.back-link-light:hover .back-chevron {
  transform: translateX(-2px);
}

.back-link-dark-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.18s ease, border-color 0.18s ease;
}

.back-arrow {
  font-style: normal;
  font-size: 10.5px;
  line-height: 1;
  transition: transform 0.18s ease;
}

.back-link-dark-pill:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.55);
}

.back-link-dark-pill:hover .back-arrow {
  transform: translateX(-2px);
}

.n17-links-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.text-link-chip {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 9px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
  min-width: 0;
  transition: border-color 0.2s ease, background 0.2s ease;
  box-sizing: border-box;
}

.text-link-chip:hover {
  background: #eff6ff;
  border-color: #93c5fd;
}

.tl-main {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
  line-height: 1.3;
}

.tl-icon {
  font-style: normal;
  font-size: 11.5px;
  line-height: 1;
  display: inline-block;
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.text-link-chip.arrow-right:hover .tl-icon {
  transform: translateX(3px);
}

.text-link-chip.arrow-upRight:hover .tl-icon {
  transform: translate(2.5px, -2.5px);
}

.text-link-chip.arrow-chevron:hover .tl-icon {
  transform: translateX(2.5px);
}

.tl-meta {
  font-style: normal;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 8px;
  color: #64748b;
}

/* Compact */
.normal-n17.is-compact {
  padding: 8px 9px;
  gap: 7px;
}

.normal-n17.is-compact .back-pad {
  padding: 7px 9px;
}

.normal-n17.is-compact .text-link-chip {
  padding: 6px 7px;
}

.normal-n17.is-compact .tl-main {
  font-size: 9px;
}

/* Mobile (316px shell) */
.normal-n17.is-mobile {
  padding: 9px 9px;
  gap: 8px;
}

.normal-n17.is-mobile .n17-block-head {
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.normal-n17.is-mobile .n17-back-grid {
  grid-template-columns: 1fr;
  gap: 6px;
}

.normal-n17.is-mobile .back-pad {
  padding: 7px 10px;
}

.normal-n17.is-mobile .n17-links-row {
  grid-template-columns: 1fr;
  gap: 5px;
}

.normal-n17.is-mobile .text-link-chip {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 7px 9px;
}
</style>
