<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const animKey = ref(0)

const metrics = [
  { count: '10,000+', label: '服务出海企业' },
  { count: '99.9%', label: '官方通道稳定率' },
  { count: '3.2x', label: '首响转化提速' }
]

watch(
  () => props.replayTick,
  () => {
    animKey.value += 1
  }
)
</script>

<template>
  <div
    class="normal-n04"
    :class="{
      'is-mobile': viewport === 'mobile',
      'is-compact': compact
    }"
  >
    <div :key="animKey" class="mc-outer">
      <div class="mc-inner">
        <div
          v-for="item in metrics"
          :key="item.label"
          class="n-card-item mc-item"
        >
          <p class="mc-count">{{ item.count }}</p>
          <p class="mc-label">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.normal-n04 {
  width: 100%;
  box-sizing: border-box;
}

.mc-outer {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 26px;
  background: rgba(15, 23, 42, 0.14);
  border: 1px solid rgba(15, 23, 42, 0.06);
  animation: mcScaleIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.mc-inner {
  width: 100%;
  box-sizing: border-box;
  border-radius: 22px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 16px 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.mc-item {
  flex: 1;
  min-width: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 4px;
  border-radius: 12px;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.mc-count {
  margin: 0;
  text-align: center;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
}

.mc-label {
  margin: 0;
  text-align: center;
  font-size: 10.5px;
  line-height: 1.35;
  color: #94a3b8;
}

.normal-n04.is-compact .mc-outer {
  padding: 4px;
  border-radius: 20px;
}

.normal-n04.is-compact .mc-inner {
  padding: 11px 10px;
  border-radius: 17px;
  gap: 6px;
}

.normal-n04.is-compact .mc-count {
  font-size: 16px;
}

.normal-n04.is-compact .mc-label {
  font-size: 9.5px;
}

.normal-n04.is-mobile .mc-outer {
  padding: 4px;
  border-radius: 21px;
}

.normal-n04.is-mobile .mc-inner {
  flex-direction: column;
  gap: 10px;
  border-radius: 18px;
  padding: 13px 12px;
}

.normal-n04.is-mobile .mc-item {
  width: 100%;
  gap: 2px;
  padding: 3px 6px;
}

.normal-n04.is-mobile .mc-count {
  font-size: 17px;
}

.normal-n04.is-mobile .mc-label {
  font-size: 10px;
}

@keyframes mcScaleIn {
  from {
    opacity: 0.5;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
