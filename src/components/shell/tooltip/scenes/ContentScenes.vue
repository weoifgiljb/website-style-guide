<script setup>
defineProps({
  anim: { type: String, default: '' },
  activeSlot: { type: Number, default: 0 },
  counterVal: { type: Number, default: 0 }
})
</script>

<template>
          <!-- 7. pin-swap: Left pinned, right swaps -->
          <div v-if="anim === 'pin-swap'" class="scene scene-pinswap">
            <div class="ps-left">
              <span class="ps-tag">左侧不动</span>
              <span class="mc-line"></span>
              <span class="mc-line short"></span>
            </div>
            <div :key="activeSlot" class="ps-right">
              {{ activeSlot === 0 ? '🖼 配图 01' : '✨ 配图 02' }}
            </div>
          </div>

          <!-- 8. stagger-stream: Sequential bubbles -->
          <div v-else-if="anim === 'stagger-stream'" class="scene scene-stream">
            <span class="st-bubble b1">① 买家提问滑入</span>
            <span class="st-bubble b2">② AI 识别意图...</span>
            <span class="st-bubble b3">③ 自动秒回气泡</span>
          </div>
          <!-- 12. card-stagger: M-02 3 cards staggering up -->
          <div v-else-if="anim === 'card-stagger'" class="scene scene-cardstagger">
            <div class="cs-card c1"><i></i><span>卡 1</span></div>
            <div class="cs-card c2"><i></i><span>卡 2</span></div>
            <div class="cs-card c3"><i></i><span>卡 3</span></div>
          </div>

          <!-- 13. zoom-pop: M-03 gentle zoom pop in -->
          <div v-else-if="anim === 'zoom-pop'" class="scene scene-zoompop">
            <div class="zp-badge">🎉 0.88 → 1.0 轻缩放弹入</div>
          </div>

          <!-- 14. text-rotate: M-04 typewriter / word flip -->
          <div v-else-if="anim === 'text-rotate'" class="scene scene-textrot">
            <div class="tr-line">
              <span>连接</span>
              <b :key="activeSlot" class="tr-word">{{ activeSlot === 0 ? 'WhatsApp' : 'TikTok' }}</b>
              <span>买家</span>
            </div>
          </div>

          <!-- 15. img-zoom: M-07 image scale inside rounded clip -->
          <div v-else-if="anim === 'img-zoom'" class="scene scene-imgzoom">
            <div class="iz-frame">
              <div class="iz-inner">🖼 框内柔和放大不撑破</div>
            </div>
          </div>

          <!-- 17. number-bar: Rolling counter -->
          <div v-else class="scene scene-number">
            <div class="num-big">+{{ counterVal }}%</div>
            <div class="num-bar-track">
              <div class="num-bar-fill" :style="{ width: `${counterVal}%` }"></div>
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

.mc-pill {
  width: 34px;
  height: 6px;
  border-radius: 999px;
  background: #2563eb;
}

.mc-line {
  width: 85%;
  height: 5px;
  border-radius: 999px;
  background: #cbd5e1;
}

.mc-line.short {
  width: 55%;
}

/* Pin-swap */
.scene-pinswap {
  gap: 7px;
}

.ps-left {
  width: 78px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ps-tag {
  font-size: 9.5px;
  font-weight: 700;
  color: #2563eb;
}

.ps-right {
  flex: 1;
  height: 54px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 7px;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #1d4ed8;
  animation: quickSwap 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* Stream */
.scene-stream {
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
}

.st-bubble {
  font-size: 9.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  align-self: flex-start;
  animation: staggerPop 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.st-bubble.b2 {
  align-self: flex-end;
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #2563eb;
  animation-delay: 0.24s;
}

.st-bubble.b3 {
  align-self: flex-end;
  background: #ecfdf5;
  border-color: #a7f3d0;
  color: #047857;
  animation-delay: 0.48s;
}

/* Extra M-02 / M-03 / M-04 / M-07 / M-14 scenes */
.scene-cardstagger {
  gap: 5px;
}

.cs-card {
  flex: 1;
  background: #ffffff;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  padding: 7px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 9.5px;
  font-weight: 700;
  color: #1e40af;
  animation: staggerPop 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.cs-card i {
  width: 18px;
  height: 5px;
  border-radius: 999px;
  background: #2563eb;
}

.cs-card.c2 { animation-delay: 0.14s; }
.cs-card.c3 { animation-delay: 0.28s; }

.zp-badge {
  background: #eff6ff;
  border: 1.5px solid #2563eb;
  color: #1d4ed8;
  font-size: 10.5px;
  font-weight: 700;
  padding: 9px 12px;
  border-radius: 999px;
  animation: miniZoomPop 1.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.tr-line {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #1e293b;
}

.tr-word {
  display: inline-block;
  min-width: 68px;
  text-align: center;
  padding: 3px 8px;
  border-radius: 6px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  color: #2563eb;
  animation: quickSwap 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.iz-frame {
  width: 172px;
  height: 54px;
  border-radius: 8px;
  border: 1.5px solid #64748b;
  overflow: hidden;
  background: #ffffff;
}

.iz-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
  color: #1d4ed8;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  animation: miniImgZoom 1.8s ease-in-out infinite alternate;
}

/* Number bar */
.scene-number {
  flex-direction: column;
  gap: 7px;
}

.num-big {
  font-size: 20px;
  font-weight: 800;
  color: #2563eb;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.num-bar-track {
  width: 148px;
  height: 6px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.num-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #10b981);
  border-radius: 999px;
  transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes quickSwap {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes staggerPop {
  0%, 12% { opacity: 0; transform: translateY(8px); }
  35%, 85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

@keyframes miniZoomPop {
  0%, 15% { opacity: 0; transform: scale(0.84); }
  45%, 85% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.96); }
}

@keyframes miniImgZoom {
  from { transform: scale(1); }
  to { transform: scale(1.09); }
}
</style>
