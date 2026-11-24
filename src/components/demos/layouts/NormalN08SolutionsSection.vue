<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const tab = ref('roles')

const roleCards = [
  {
    id: 'agent',
    icon: '🎧',
    coverBg: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    label: '客服坐席',
    title: '高效聚合回复',
    bullets: ['AI 话术', '实时翻译']
  },
  {
    id: 'supervisor',
    icon: '📋',
    coverBg: 'linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)',
    label: '客服主管',
    title: '智能分流质检',
    bullets: ['自动路由', 'SLA 预警']
  },
  {
    id: 'marketer',
    icon: '📣',
    coverBg: 'linear-gradient(135deg, #bae6fd 0%, #f0f9ff 100%)',
    label: '投手运营',
    title: '广告归因转化',
    bullets: ['渠道追踪', '分层群发']
  },
  {
    id: 'manager',
    icon: '📊',
    coverBg: 'linear-gradient(135deg, #c7d2fe 0%, #f5f3ff 100%)',
    label: '管理者',
    title: '全局经营洞察',
    bullets: ['ROI 看板', '人效报表']
  }
]

const industryCards = [
  {
    id: 'ecommerce',
    icon: '🛍️',
    label: '跨境电商',
    title: '独立站与社媒导购',
    desc: '弃单自动挽回与物流状态推送',
    metricVal: '3.2x↑',
    metricLabel: '转化率'
  },
  {
    id: 'gaming',
    icon: '🎮',
    label: '游戏出海',
    title: '全球玩家社区接待',
    desc: '多语种 VIP 工单秒级响应跟进',
    metricVal: '65%↓',
    metricLabel: '漏单率'
  },
  {
    id: 'edtech',
    icon: '🎓',
    label: '在线教育',
    title: '课程顾问私域伴学',
    desc: '试听提醒与续费节点自动化触达',
    metricVal: '48%↑',
    metricLabel: '完课率'
  }
]
</script>

<template>
  <section
    class="normal-n08"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
  >
    <div class="sol-intro">
      <span class="sol-eyebrow">场景化方案</span>
      <h2 class="sol-heading">按业务角色与行业定制方案</h2>
    </div>

    <div class="sol-tablist" role="tablist" aria-label="按业务角色与行业定制方案">
      <button
        type="button"
        role="tab"
        class="sol-tab-btn"
        :class="{ active: tab === 'roles' }"
        :aria-selected="tab === 'roles'"
        @click.stop="tab = 'roles'"
      >
        按角色 (4列)
      </button>
      <button
        type="button"
        role="tab"
        class="sol-tab-btn"
        :class="{ active: tab === 'industries' }"
        :aria-selected="tab === 'industries'"
        @click.stop="tab = 'industries'"
      >
        按行业 (3列)
      </button>
    </div>

    <div v-if="tab === 'roles'" key="roles" class="sol-grid is-roles">
      <article
        v-for="item in roleCards"
        :key="item.id"
        class="n-card-item sol-card"
      >
        <div class="sol-cover">
          <div class="sol-cover-inner" :style="{ background: item.coverBg }">
            <span class="sol-cover-icon">{{ item.icon }}</span>
          </div>
        </div>
        <div class="sol-body">
          <span class="sol-pill">{{ item.label }}</span>
          <h3 class="sol-card-title">{{ item.title }}</h3>
          <ul class="sol-bullets">
            <li v-for="b in item.bullets" :key="b" class="sol-bullet-tag">{{ b }}</li>
          </ul>
        </div>
      </article>
    </div>

    <div v-else key="industries" class="sol-industry-wrap">
      <div class="sol-grid is-industries">
        <article
          v-for="item in industryCards"
          :key="item.id"
          class="n-card-item sol-card is-industry"
        >
          <div class="sol-cover is-industry-cover">
            <div class="sol-cover-inner">
              <span class="sol-cover-icon">{{ item.icon }}</span>
            </div>
          </div>
          <div class="sol-body">
            <span class="sol-pill">{{ item.label }}</span>
            <h3 class="sol-card-title">{{ item.title }}</h3>
            <p class="sol-card-desc">{{ item.desc }}</p>
            <div class="sol-metric-bar">
              <strong class="sol-metric-val">{{ item.metricVal }}</strong>
              <span class="sol-metric-lbl">{{ item.metricLabel }}</span>
            </div>
          </div>
        </article>
      </div>

      <div class="sol-footer">
        <button type="button" class="sol-explore-link" @click.stop>
          <span>探索全部行业方案</span>
          <span class="sol-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n08 {
  width: 100%;
  box-sizing: border-box;
  background: #f5f6f8;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 11px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.sol-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
}

.sol-eyebrow {
  display: inline-flex;
  border: 1px solid #bfd7ff;
  background: #f7faff;
  color: #2463f5;
  border-radius: 999px;
  padding: 1px 8px;
  font-size: 9.5px;
  font-weight: 600;
}

.sol-heading {
  margin: 0;
  font-size: 13.5px;
  font-weight: 800;
  color: #0d142b;
  line-height: 1.3;
}

.sol-tablist {
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: #e5e7eb;
  padding: 3px;
  border-radius: 999px;
  max-width: 100%;
}

.sol-tab-btn {
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 10.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.sol-tab-btn:hover {
  color: #1d2a54;
}

.sol-tab-btn.active {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.sol-grid {
  display: grid;
  gap: 7px;
  width: 100%;
  animation: solFade 0.2s ease-out both;
}

.sol-grid.is-roles {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.sol-grid.is-industries {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.sol-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.sol-card:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.sol-card.is-industry:hover {
  background: #edf5ff;
}

.sol-cover {
  position: relative;
  aspect-ratio: 5 / 3;
  overflow: hidden;
  border-radius: 10px;
  margin: 4px 4px 0;
}

.sol-cover.is-industry-cover {
  background: #e9ecff;
}

.sol-cover-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.sol-card:hover .sol-cover-inner {
  transform: scale(1.03);
}

.sol-cover-icon {
  font-size: 17px;
  line-height: 1;
}

.sol-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 6px 7px 7px;
  min-width: 0;
}

.sol-pill {
  align-self: flex-start;
  display: inline-flex;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 6px;
  margin-bottom: 4px;
}

.sol-card-title {
  margin: 0 0 5px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.3;
  color: #111827;
}

.sol-card-desc {
  margin: 0 0 6px;
  font-size: 9.5px;
  line-height: 1.38;
  color: #6b7280;
}

.sol-bullets {
  margin: auto 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.sol-bullet-tag {
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 8.5px;
  font-weight: 600;
  padding: 1px 5px;
  white-space: nowrap;
}

.sol-metric-bar {
  margin-top: auto;
  padding-top: 5px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.sol-metric-val {
  font-size: 11.5px;
  font-weight: 800;
  color: #1456eb;
  line-height: 1.1;
}

.sol-metric-lbl {
  font-size: 9px;
  color: #71809e;
}

.sol-industry-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sol-footer {
  display: flex;
  justify-content: center;
}

.sol-explore-link {
  border: none;
  background: transparent;
  padding: 2px 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
  color: #1456eb;
  cursor: pointer;
  transition: color 0.18s ease;
}

.sol-explore-link:hover {
  color: #0d43c9;
}

.sol-arrow {
  transition: transform 0.18s ease;
}

.sol-explore-link:hover .sol-arrow {
  transform: translateX(2px);
}

.normal-n08.is-compact {
  padding: 9px;
  gap: 7px;
}

.normal-n08.is-compact .sol-heading {
  font-size: 12.5px;
}

.normal-n08.is-mobile {
  padding: 10px;
  gap: 8px;
}

.normal-n08.is-mobile .sol-heading {
  font-size: 12.5px;
}

.normal-n08.is-mobile .sol-tab-btn {
  font-size: 10px;
  padding: 4px 10px;
}

.normal-n08.is-mobile .sol-grid.is-roles,
.normal-n08.is-mobile .sol-grid.is-industries {
  grid-template-columns: 1fr;
  gap: 7px;
}

.normal-n08.is-mobile .sol-cover {
  aspect-ratio: 16 / 5;
}

.normal-n08.is-mobile .sol-body {
  padding: 7px 9px 8px;
}

.normal-n08.is-mobile .sol-card-title {
  font-size: 11.5px;
}

@keyframes solFade {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}
</style>
