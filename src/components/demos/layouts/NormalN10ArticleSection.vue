<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const articles = [
  {
    id: 'wa-anti-ban',
    tag: '防封指南',
    gradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 48%, #86efac 100%)',
    accent: '#15803d',
    icon: '🛡️',
    title: 'WhatsApp 官方号防封实操',
    summary: '拆解 Meta 官方 BSP 绿标认证、消息模板审核避坑与高频群发风控阈值配置。'
  },
  {
    id: 'ctm-attribution',
    tag: '增长归因',
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
    accent: '#1d4ed8',
    icon: '📊',
    title: 'Click-to-Message 投流归因',
    summary: '打通广告点击到私域成交回传链路，反哺像素模型优化受众并提升 ROAS。'
  },
  {
    id: 'ai-intent-routing',
    tag: 'AI 自动化',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)',
    accent: '#6d28d9',
    icon: '🤖',
    title: 'AI 客服意图路由配置',
    summary: '基于多语种语义识别自动分流售前询盘与售后工单，7×24 小时零漏单承接。'
  }
]
</script>

<template>
  <section
    class="normal-n10"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <h2 class="n10-heading">精选实战指南与行业洞察</h2>

    <div class="n10-grid">
      <article
        v-for="item in articles"
        :key="item.id"
        class="n-card-item art-card"
      >
        <div class="art-cover" :style="{ background: item.gradient }">
          <span class="art-tag" :style="{ color: item.accent }">{{ item.tag }}</span>
          <span class="art-illust" aria-hidden="true">{{ item.icon }}</span>
          <span class="art-cover-bars" aria-hidden="true">
            <i></i>
            <i class="short"></i>
          </span>
        </div>

        <div class="art-body">
          <div class="art-copy">
            <h3 class="art-title">{{ item.title }}</h3>
            <p class="art-desc">{{ item.summary }}</p>
          </div>

          <a
            href="#article"
            class="art-link"
            @click.stop.prevent
          >
            <span>阅读全文</span>
            <i aria-hidden="true">›</i>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.normal-n10 {
  width: 100%;
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  box-sizing: border-box;
}

.n10-heading {
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 13.5px;
  font-weight: 800;
  line-height: 1.3;
  color: #121931;
}

.n10-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.art-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.04);
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.06);
  padding: 8px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: transform 0.24s ease, box-shadow 0.24s ease;
  box-sizing: border-box;
}

.art-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(15, 23, 42, 0.1);
}

.art-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 352 / 200;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
}

.art-tag {
  align-self: flex-start;
  font-size: 8.5px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.88);
  padding: 1.5px 6px;
  border-radius: 999px;
  line-height: 1.3;
}

.art-illust {
  position: absolute;
  right: 8px;
  bottom: 6px;
  font-size: 19px;
  line-height: 1;
  filter: drop-shadow(0 3px 6px rgba(15, 23, 42, 0.12));
  transition: transform 0.25s ease;
}

.art-card:hover .art-illust {
  transform: scale(1.08);
}

.art-cover-bars {
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-width: 58%;
}

.art-cover-bars i {
  display: block;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
}

.art-cover-bars i.short {
  width: 68%;
}

.art-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 7px;
}

.art-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.art-title {
  margin: 0;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.35;
  color: #121931;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  transition: color 0.2s ease;
}

.art-desc {
  margin: 0;
  font-size: 9px;
  line-height: 1.42;
  color: #475569;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.art-card:hover .art-title,
.art-card:hover .art-desc {
  -webkit-line-clamp: unset;
  display: block;
}

.art-link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  font-size: 9.5px;
  font-weight: 600;
  color: #333bfa;
  text-decoration: none;
  line-height: 1.3;
}

.art-link i {
  font-style: normal;
  font-size: 11px;
  transition: transform 0.18s ease;
}

.art-card:hover .art-link {
  text-decoration: underline;
}

.art-card:hover .art-link i {
  transform: translateX(2px);
}

/* Compact */
.normal-n10.is-compact {
  padding: 10px 9px;
  gap: 8px;
}

.normal-n10.is-compact .n10-heading {
  font-size: 12px;
}

.normal-n10.is-compact .n10-grid {
  gap: 6px;
}

.normal-n10.is-compact .art-card {
  padding: 6px;
  border-radius: 14px;
}

.normal-n10.is-compact .art-cover {
  margin-bottom: 6px;
  border-radius: 9px;
}

.normal-n10.is-compact .art-title {
  font-size: 9.5px;
}

.normal-n10.is-compact .art-desc {
  font-size: 8.5px;
}

/* Mobile (316px shell) */
.normal-n10.is-mobile {
  padding: 11px 10px;
  gap: 9px;
}

.normal-n10.is-mobile .n10-heading {
  font-size: 12.5px;
}

.normal-n10.is-mobile .n10-grid {
  grid-template-columns: 1fr;
  gap: 8px;
}

.normal-n10.is-mobile .art-card {
  padding: 8px;
  border-radius: 15px;
}

.normal-n10.is-mobile .art-cover {
  aspect-ratio: 16 / 7;
  margin-bottom: 6px;
}

.normal-n10.is-mobile .art-title {
  font-size: 10.5px;
  -webkit-line-clamp: 1;
}

.normal-n10.is-mobile .art-desc {
  font-size: 9px;
  -webkit-line-clamp: 2;
}
</style>
