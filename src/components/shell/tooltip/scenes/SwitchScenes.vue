<script setup>
defineProps({
  anim: { type: String, default: '' },
  activeSlot: { type: Number, default: 0 },
  counterVal: { type: Number, default: 0 }
})
</script>

<template>
          <!-- 4. auto-progress: Progress bar tabs -->
          <div v-if="anim === 'auto-progress'" class="scene scene-autotab">
            <div class="at-tabs">
              <div class="at-tab" :class="{ on: activeSlot === 0 }">
                <span>卖点 1</span>
                <i v-if="activeSlot === 0" class="at-bar"></i>
              </div>
              <div class="at-tab" :class="{ on: activeSlot === 1 }">
                <span>卖点 2</span>
                <i v-if="activeSlot === 1" class="at-bar"></i>
              </div>
            </div>
            <div :key="activeSlot" class="at-screen">
              {{ activeSlot === 0 ? '📊 图表视图 A' : '💬 会话视图 B' }}
            </div>
          </div>

          <!-- 5. click-switch: Sliding tab indicator -->
          <div v-else-if="anim === 'click-switch'" class="scene scene-switch">
            <div class="sw-pill-bar">
              <i
                class="sw-glider"
                :style="{ transform: `translateX(${activeSlot * 100}%)` }"
              ></i>
              <span :class="{ on: activeSlot === 0 }">方案 A</span>
              <span :class="{ on: activeSlot === 1 }">方案 B</span>
            </div>
            <div :key="activeSlot" class="at-screen">
              {{ activeSlot === 0 ? '内容平滑淡入 A' : '内容平滑淡入 B' }}
            </div>
          </div>
          <!-- 11. smooth-expand: Smooth height accordion -->
          <div v-else-if="anim === 'smooth-expand'" class="scene scene-expand">
            <div class="exp-box" :class="{ open: activeSlot === 1 }">
              <div class="exp-head">
                <span>常见问题平滑展开</span>
                <b :class="{ rot: activeSlot === 1 }">▾</b>
              </div>
              <div class="exp-body">
                <div>高度丝滑推开不闪跳</div>
              </div>
            </div>
          </div>
</template>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Auto-Progress & Switch */
.scene-autotab,
.scene-switch {
  flex-direction: column;
  gap: 6px;
}

.at-tabs {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.at-tab {
  position: relative;
  overflow: hidden;
  background: #e2e8f0;
  border-radius: 5px;
  padding: 3px 6px 5px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  color: #64748b;
}

.at-tab.on {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.at-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  background: #2563eb;
  animation: barFill 1.15s linear infinite;
}

.at-screen {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 6px;
  font-size: 10.5px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  animation: quickSwap 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.sw-pill-bar {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #e2e8f0;
  padding: 2px;
  border-radius: 6px;
}

.sw-glider {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  width: calc(50% - 2px);
  background: #ffffff;
  border-radius: 4px;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.sw-pill-bar span {
  position: relative;
  z-index: 1;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 2px 0;
  color: #64748b;
}

.sw-pill-bar span.on {
  color: #2563eb;
}

/* Smooth expand */
.exp-box {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  padding: 6px 9px;
}

.exp-head {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  font-weight: 700;
}

.exp-head b {
  transition: transform 0.28s ease;
}

.exp-head b.rot {
  transform: rotate(180deg);
  color: #2563eb;
}

.exp-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.exp-box.open .exp-body {
  grid-template-rows: 1fr;
}

.exp-body > div {
  overflow: hidden;
  font-size: 10px;
  color: #2563eb;
  padding-top: 0;
}

.exp-box.open .exp-body > div {
  padding-top: 5px;
}

@keyframes barFill {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes quickSwap {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
