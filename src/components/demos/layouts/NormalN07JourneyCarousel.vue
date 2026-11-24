<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const slides = [
  {
    id: 'stage-01',
    icon: '🎯',
    number: '01',
    kicker: '获客引流',
    title: '广告询盘秒级承接',
    description: '点击社交广告直跳官方会话，自动回传来源渠道并沉淀潜客资产。',
    bullets: ['Click-to-WhatsApp', '自动打标'],
    stat: '3.5x',
    statPrimary: '广告首响转化提速',
    statSecondary: '告别落地页流失',
    previewTag: 'CTWA 归因链路',
    previewRows: [
      { label: 'Meta Ad #A12', badge: '已命中自动欢迎语' },
      { label: '客户标签', badge: '#高意向 #西班牙语' }
    ]
  },
  {
    id: 'stage-02',
    icon: '🤖',
    number: '02',
    kicker: '智能接待',
    title: 'AI Agent 7×24 分流',
    description: '融合企业知识库全天候秒回常见咨询，复杂诉求无感路由人工坐席。',
    bullets: ['意图精准识别', '人机协同接管'],
    stat: '82%',
    statPrimary: '常见咨询自动闭环',
    statSecondary: '大幅释放客服人力',
    previewTag: 'AI 分流工作台',
    previewRows: [
      { label: '物流/尺码问答', badge: 'AI 0.8s 已自动回复' },
      { label: '大额批发询价', badge: '已转 VIP 专属客服' }
    ]
  },
  {
    id: 'stage-03',
    icon: '🚀',
    number: '03',
    kicker: '私域复购',
    title: '标签分层精准群发',
    description: '基于历史互动与下单周期自动化唤醒沉默老客，清晰追踪营销 ROI。',
    bullets: ['人群精细分包', '转化归因看板'],
    stat: '+46%',
    statPrimary: '私域复购营收增长',
    statSecondary: '全链路触达可衡量',
    previewTag: '分层触达计划',
    previewRows: [
      { label: '30天未复购会员', badge: '触达率 96.4%' },
      { label: '黑五专属折扣码', badge: 'ROI 1 : 8.6' }
    ]
  }
]

const currentIndex = ref(0)
const slideDir = ref(1)
const animKey = ref(0)

const currentSlide = computed(() => slides[currentIndex.value])

function move(direction) {
  slideDir.value = direction
  currentIndex.value = (currentIndex.value + direction + slides.length) % slides.length
  animKey.value += 1
}

watch(
  () => props.replayTick,
  () => {
    animKey.value += 1
  }
)
</script>

<template>
  <section
    class="normal-n07"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
    aria-label="客户增长旅程轮播"
  >
    <div class="jc-grid">
      <div class="jc-panel-slot">
        <article
          :key="`${currentSlide.id}-${animKey}`"
          class="jc-card"
          :class="slideDir >= 0 ? 'anim-next' : 'anim-prev'"
        >
          <div class="jc-card-inner">
            <div class="jc-left">
              <div class="jc-kicker-row">
                <span class="jc-icon-box">{{ currentSlide.icon }}</span>
                <span class="jc-kicker-text">
                  {{ currentSlide.number }} — {{ currentSlide.kicker }}
                </span>
              </div>

              <h3 class="jc-title">{{ currentSlide.title }}</h3>
              <p class="jc-desc">{{ currentSlide.description }}</p>

              <ul class="jc-bullets">
                <li
                  v-for="bullet in currentSlide.bullets"
                  :key="bullet"
                  class="jc-bullet-pill"
                >
                  <span class="jc-check" aria-hidden="true">✓</span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <div class="jc-stat-row">
                <strong class="jc-stat-num">{{ currentSlide.stat }}</strong>
                <span class="jc-stat-labels">
                  <span class="jc-stat-primary">{{ currentSlide.statPrimary }}</span>
                  <span class="jc-stat-secondary">{{ currentSlide.statSecondary }}</span>
                </span>
              </div>

              <button type="button" class="jc-more-link" @click.stop>
                <span>了解详情</span>
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <div class="jc-right">
              <div class="jc-preview">
                <div class="jc-preview-head">
                  <span class="jc-preview-dot"></span>
                  <span class="jc-preview-tag">{{ currentSlide.previewTag }}</span>
                </div>
                <div class="jc-preview-body">
                  <div
                    v-for="row in currentSlide.previewRows"
                    :key="row.label"
                    class="jc-preview-item"
                  >
                    <span class="jc-pv-label">{{ row.label }}</span>
                    <span class="jc-pv-badge">{{ row.badge }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="jc-controls">
        <button
          type="button"
          class="jc-arrow jc-prev"
          aria-label="上一阶段"
          @click.stop="move(-1)"
        >
          ←
        </button>

        <span class="jc-status">{{ currentIndex + 1 }} / {{ slides.length }}</span>

        <button
          type="button"
          class="jc-arrow jc-next"
          aria-label="下一阶段"
          @click.stop="move(1)"
        >
          →
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n07 {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.jc-grid {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 30px;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.jc-panel-slot {
  grid-area: 1 / 2;
  min-width: 0;
}

.jc-controls {
  display: contents;
}

.jc-prev {
  grid-area: 1 / 1;
}

.jc-next {
  grid-area: 1 / 3;
}

.jc-status {
  grid-area: 2 / 2;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #526078;
  font-variant-numeric: tabular-nums;
}

.jc-arrow {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid #dce2ed;
  background: #ffffff;
  color: #526078;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease;
}

.jc-arrow:hover {
  border-color: #1456eb;
  color: #1456eb;
}

.jc-arrow:active {
  border-color: #101a38;
  background: #101a38;
  color: #ffffff;
}

.jc-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #04050a;
  box-shadow: 0 12px 28px -10px rgba(4, 5, 10, 0.45);
}

.jc-card-inner {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 10px;
  align-items: center;
  padding: 13px 13px;
  border-radius: 17px;
  background: linear-gradient(180deg, #0d111a 0%, #04050a 100%);
  box-sizing: border-box;
}

.jc-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.jc-kicker-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.jc-icon-box {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 1px solid rgba(40, 115, 221, 0.6);
  background: #0b1d3f;
  color: #4c92ff;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.jc-kicker-text {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #4f94ff;
}

.jc-title {
  margin: 7px 0 4px;
  font-size: 13.5px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #f1f5f9;
}

.jc-desc {
  margin: 0 0 8px;
  font-size: 10px;
  line-height: 1.48;
  color: rgba(148, 163, 184, 0.88);
}

.jc-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.jc-bullet-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.24);
  background: rgba(59, 130, 246, 0.12);
  padding: 2px 7px;
  font-size: 9.5px;
  font-weight: 600;
  color: rgba(147, 197, 253, 0.95);
}

.jc-check {
  color: #60a5fa;
  font-weight: 800;
}

.jc-stat-row {
  margin-top: 9px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.jc-stat-num {
  font-size: 22px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #3b83f6;
}

.jc-stat-labels {
  display: flex;
  flex-direction: column;
  font-size: 9.5px;
  line-height: 1.35;
}

.jc-stat-primary {
  font-weight: 700;
  color: #3b83f6;
}

.jc-stat-secondary {
  color: #cbd5e1;
}

.jc-more-link {
  margin-top: 8px;
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.18s ease;
}

.jc-more-link:hover {
  color: #3b82f6;
}

.jc-right {
  min-width: 0;
}

.jc-preview {
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(59, 130, 246, 0.22);
  border-radius: 12px;
  padding: 9px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.jc-preview-head {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.jc-preview-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
}

.jc-preview-tag {
  font-size: 9.5px;
  font-weight: 700;
  color: #bfdbfe;
}

.jc-preview-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jc-preview-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.jc-pv-label {
  font-size: 9px;
  color: #94a3b8;
}

.jc-pv-badge {
  font-size: 9.5px;
  font-weight: 700;
  color: #60a5fa;
}

.anim-next {
  animation: jcSlideNext 0.22s ease-out both;
}

.anim-prev {
  animation: jcSlidePrev 0.22s ease-out both;
}

.normal-n07.is-compact .jc-card-inner {
  padding: 10px;
  gap: 8px;
}

.normal-n07.is-compact .jc-title {
  font-size: 12.5px;
}

.normal-n07.is-compact .jc-stat-num {
  font-size: 19px;
}

.normal-n07.is-mobile .jc-grid {
  grid-template-columns: minmax(0, 1fr);
  gap: 9px;
}

.normal-n07.is-mobile .jc-panel-slot {
  grid-area: 1 / 1;
}

.normal-n07.is-mobile .jc-controls {
  grid-area: 2 / 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 2px;
}

.normal-n07.is-mobile .jc-card-inner {
  grid-template-columns: 1fr;
  padding: 12px;
  gap: 10px;
}

.normal-n07.is-mobile .jc-title {
  font-size: 13px;
  margin-top: 6px;
}

.normal-n07.is-mobile .jc-stat-num {
  font-size: 20px;
}

@keyframes jcSlideNext {
  from {
    opacity: 0.68;
    transform: translateX(14px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes jcSlidePrev {
  from {
    opacity: 0.68;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
