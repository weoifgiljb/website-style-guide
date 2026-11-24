<script setup>
import { ref } from 'vue'

defineProps({
  replayTick: { type: Number, default: 0 }
})

const activeIdx = ref(0)

const tabs = [
  {
    label: '多号聚合',
    icon: '聚',
    text: '一个工作台统一收发 WhatsApp / IG / Messenger 消息。'
  },
  {
    label: '自动分配',
    icon: '分',
    text: '按语言、国家或客服在线状态自动分配新进对话。'
  },
  {
    label: '数据复盘',
    icon: '数',
    text: '实时统计首响时长、客服接待量与广告线索转化率。'
  }
]

function selectTab(idx) {
  activeIdx.value = idx
}
</script>

<template>
  <div class="motion-tab-slide">
    <span class="stage-badge">点击切换 Tab</span>
    <div class="demo-tabs-wrap">
      <div class="demo-tab-bar">
        <div
          class="demo-tab-slider"
          :style="{ transform: `translateX(${activeIdx * 100}%)` }"
        ></div>
        <button
          v-for="(tab, idx) in tabs"
          :key="tab.label"
          type="button"
          class="demo-tab-btn"
          :class="{ active: activeIdx === idx }"
          @click.stop="selectTab(idx)"
        >
          {{ tab.label }}
        </button>
      </div>
      <Transition name="tab-fade" mode="out-in">
        <div :key="activeIdx" class="demo-tab-content">
          <div class="tab-dot-icon">{{ tabs[activeIdx].icon }}</div>
          <div>{{ tabs[activeIdx].text }}</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.motion-tab-slide {
  width: 100%;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-tabs-wrap {
  width: 100%;
  max-width: 290px;
}

.demo-tab-bar {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #e2e8f0;
  padding: 3px;
  border-radius: 9px;
  margin-bottom: 10px;
}

.demo-tab-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc((100% - 6px) / 3);
  height: calc(100% - 6px);
  background: var(--surface);
  border-radius: 7px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
  transition: transform var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.demo-tab-btn {
  position: relative;
  z-index: 2;
  border: none;
  background: transparent;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 5px 4px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.demo-tab-btn.active {
  color: var(--primary);
}

.demo-tab-content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 12px;
  color: var(--text-secondary);
  min-height: 62px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tab-dot-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--primary-soft);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition:
    opacity calc(var(--dur, 0.28s) * 0.65) ease,
    transform calc(var(--dur, 0.28s) * 0.65) var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.tab-fade-enter-from,
.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
