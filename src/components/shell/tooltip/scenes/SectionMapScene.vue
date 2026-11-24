<script setup>
import { computed } from 'vue'
import SectionZoomCard from './SectionZoomCard.vue'

const props = defineProps({
  anim: { type: String, default: '' },
  activeSlot: { type: Number, default: 0 },
  counterVal: { type: Number, default: 0 }
})

const SECTION_META = {
  'sec-hero': { floorIndex: 0, posLabel: '第1屏' },
  'sec-feature': { floorIndex: 1, posLabel: '第2屏' },
  'sec-bento': { floorIndex: 2, posLabel: '中间段' },
  'sec-flow': { floorIndex: 3, posLabel: '中段图' },
  'sec-tabs': { floorIndex: 4, posLabel: '靠下方' },
  'sec-other': { floorIndex: -1, posLabel: '任意处' }
}

const activeFloorIdx = computed(() => {
  const meta = SECTION_META[props.anim]
  if (!meta) return 0
  if (meta.floorIndex === -1) return props.activeSlot === 0 ? 1 : 3
  return meta.floorIndex
})
</script>

<template>
          <div class="scene scene-section-map">
            <!-- 左侧：整张网页从上到下迷你定位图（在哪儿） -->
            <div class="mini-page-map" aria-hidden="true">
              <div class="mpm-browser-dots">
                <i></i><i></i><i></i>
                <span>整张网页</span>
              </div>
              <div class="mpm-floors">
                <div
                  v-for="idx in [0, 1, 2, 3, 4]"
                  :key="idx"
                  class="mpm-floor"
                  :class="{ hit: activeFloorIdx === idx }"
                >
                  <em v-if="activeFloorIdx === idx">在这</em>
                </div>
              </div>
            </div>

            <!-- 右侧：这块区域放大长什么样（是什么） -->
            <div class="sec-zoom-card">
            <SectionZoomCard :anim="anim" />
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

/* ================= Section Map + Structure Wireframe ================= */
.scene-section-map {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 7px;
  align-items: stretch;
}

.mini-page-map {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mpm-browser-dots {
  display: flex;
  align-items: center;
  gap: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid #e2e8f0;
}

.mpm-browser-dots i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #94a3b8;
}

.mpm-browser-dots span {
  margin-left: auto;
  font-size: 7.5px;
  font-weight: 700;
  color: #64748b;
}

.mpm-floors {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5px;
  justify-content: space-between;
}

.mpm-floor {
  flex: 1;
  border-radius: 3px;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.mpm-floor.hit {
  background: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
  animation: floorPulse 1.2s ease-in-out infinite;
}

.mpm-floor em {
  font-style: normal;
  font-size: 8px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

.sec-zoom-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  padding: 6px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}


@keyframes floorPulse {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.03); }
}
</style>
