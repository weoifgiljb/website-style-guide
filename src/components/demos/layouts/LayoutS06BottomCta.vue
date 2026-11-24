<script setup>
defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <div class="layout-s06" :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }">
    <div class="mcta-h">准备好让广告流量高效转化为成交了吗？</div>
    <div class="mcta-p">3 分钟快速接入多渠道，立即体验智能协同工作台</div>
    <div class="mcta-btns">
      <span class="mcta-b1">开始免费体验</span>
      <span class="mcta-b2">预约演示</span>
    </div>
  </div>
</template>

<style scoped>
.layout-s06 {
  width: 100%;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 55%, #3b82f6 100%);
  border-radius: 12px;
  padding: 18px 18px;
  color: #ffffff;
  text-align: center;
  box-shadow: 0 10px 20px -8px rgba(37, 99, 235, 0.42);
  box-sizing: border-box;
}

.mcta-h {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 5px;
}

.mcta-p {
  font-size: 11.5px;
  color: #dbeafe;
  margin-bottom: 12px;
  line-height: 1.45;
}

.mcta-btns {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.mcta-b1 {
  background: #ffffff;
  color: var(--primary);
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 999px;
  box-sizing: border-box;
}

.mcta-b2 {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.36);
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 600;
  padding: 6px 13px;
  border-radius: 999px;
  box-sizing: border-box;
}

.layout-s06.is-compact {
  padding: 13px 12px;
}

.layout-s06.is-compact .mcta-h {
  font-size: 12.5px;
}

.layout-s06.is-compact .mcta-p {
  font-size: 10.5px;
  margin-bottom: 10px;
}

.layout-s06.is-mobile {
  padding: 14px 12px;
}

.layout-s06.is-mobile .mcta-h {
  font-size: 12.5px;
}

.layout-s06.is-mobile .mcta-p {
  font-size: 10.5px;
  margin-bottom: 10px;
}

.layout-s06.is-mobile .mcta-btns {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
}

.layout-s06.is-mobile .mcta-b1,
.layout-s06.is-mobile .mcta-b2 {
  width: 100%;
  font-size: 11px;
  padding: 6px 12px;
}
</style>
