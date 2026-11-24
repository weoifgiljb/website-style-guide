<script setup>
import { ref, onUnmounted } from 'vue'

defineProps({
  replayTick: { type: Number, default: 0 }
})

const isDemo = ref(false)
let demoTimer = null

function clearDemoTimer() {
  if (demoTimer !== null) {
    clearTimeout(demoTimer)
    demoTimer = null
  }
}

function triggerDemo() {
  clearDemoTimer()
  isDemo.value = true
  demoTimer = setTimeout(() => {
    isDemo.value = false
    demoTimer = null
  }, 950)
}

onUnmounted(() => {
  clearDemoTimer()
})
</script>

<template>
  <div class="motion-image-zoom">
    <span class="stage-badge">鼠标移到图卡上</span>
    <button type="button" class="stage-action" @click.stop="triggerDemo">模拟一次</button>
    <div class="demo-img-card" :class="{ 'is-demo': isDemo }" @click.stop>
      <div class="demo-img-box">
        <div class="demo-img-art">
          <div class="mock-ui-win">
            <div class="mock-bar b1"></div>
            <div class="mock-bar b2"></div>
            <div class="mock-bar b3"></div>
          </div>
        </div>
      </div>
      <div class="demo-img-caption">
        <span>跨境独立站提效案例</span>
        <span class="caption-link">查看 →</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.motion-image-zoom {
  width: 100%;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-img-card {
  width: 220px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

.demo-img-box {
  height: 90px;
  overflow: hidden;
  background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 50%, #e0f2fe 100%);
  position: relative;
}

.demo-img-art {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform calc(var(--dur, 0.28s) * 1.2) var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.demo-img-card:hover .demo-img-art,
.demo-img-card.is-demo .demo-img-art {
  transform: scale(1.08);
}

.mock-ui-win {
  width: 136px;
  height: 62px;
  background: #ffffff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.14);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.mock-bar {
  height: 7px;
  border-radius: 4px;
  background: #e2e8f0;
}

.mock-bar.b1 {
  width: 55%;
  background: #3b82f6;
}

.mock-bar.b2 {
  width: 85%;
}

.mock-bar.b3 {
  width: 70%;
  background: #bfdbfe;
}

.demo-img-caption {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.caption-link {
  color: var(--primary);
  font-size: 11px;
}
</style>
