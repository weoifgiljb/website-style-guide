<script setup>
defineProps({
  anim: { type: String, default: '' },
  activeSlot: { type: Number, default: 0 },
  counterVal: { type: Number, default: 0 }
})
</script>

<template>
          <!-- ================= B. 12 种实时微缩动效演示（怎么触发 / 什么效果） ================= -->
          <!-- 1. scroll-enter: Fade In Up -->
          <div v-if="anim === 'scroll-enter'" class="scene scene-enter">
            <div class="mini-scroll-track"><i class="mini-scroll-thumb"></i></div>
            <div class="mini-card anim-loop-fadeup">
              <span class="mc-pill"></span>
              <span class="mc-line"></span>
              <span class="mc-line short"></span>
            </div>
          </div>
          <!-- 2. scroll-scrub: Scroll-linked movement -->
          <div v-else-if="anim === 'scroll-scrub'" class="scene scene-scrub">
            <div class="mini-scroll-track"><i class="mini-scroll-thumb scrub"></i></div>
            <div class="scrub-cols">
              <div class="scrub-pin">📌 固定</div>
              <div class="scrub-movers">
                <span class="scrub-card">画面随滚动推进</span>
              </div>
            </div>
          </div>

          <!-- 3. hover-react: Cursor hover lift & glow -->
          <div v-else-if="anim === 'hover-react'" class="scene scene-hover">
            <div class="hover-target-card">
              <span class="mc-pill"></span>
              <span class="mc-line"></span>
            </div>
            <span class="mini-cursor">↖</span>
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

/* ================= Motion Demos ================= */
.mini-scroll-track {
  width: 4px;
  height: 56px;
  border-radius: 999px;
  background: #e2e8f0;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.mini-scroll-thumb {
  position: absolute;
  left: 0;
  width: 100%;
  height: 18px;
  border-radius: 999px;
  background: #2563eb;
  animation: thumbMove 1.5s ease-in-out infinite;
}

.mini-scroll-thumb.scrub {
  animation: thumbScrub 1.8s ease-in-out infinite alternate;
}

.mini-card,
.hover-target-card {
  flex: 1;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.anim-loop-fadeup {
  animation: loopFadeUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) infinite;
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

/* Scrub */
.scrub-cols {
  flex: 1;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 6px;
  align-items: center;
}

.scrub-pin {
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  padding: 8px 4px;
  text-align: center;
}

.scrub-card {
  display: block;
  font-size: 10px;
  font-weight: 600;
  background: #ffffff;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  padding: 8px 6px;
  text-align: center;
  animation: scrubSlide 1.8s ease-in-out infinite alternate;
}

/* Hover */
.hover-target-card {
  max-width: 148px;
  animation: cardHoverLift 1.6s ease-in-out infinite;
}

.mini-cursor {
  position: absolute;
  right: 26px;
  bottom: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  animation: cursorApproach 1.6s ease-in-out infinite;
}

@keyframes loopFadeUp {
  0%, 15% { opacity: 0; transform: translateY(14px); }
  45%, 85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
}

@keyframes thumbMove {
  0% { top: 4px; }
  50%, 100% { top: 32px; }
}

@keyframes thumbScrub {
  from { top: 4px; }
  to { top: 34px; }
}

@keyframes scrubSlide {
  from { transform: translateY(8px); opacity: 0.65; }
  to { transform: translateY(-8px); opacity: 1; }
}

@keyframes cardHoverLift {
  0%, 25% { transform: translateY(0); box-shadow: none; border-color: #cbd5e1; }
  55%, 85% { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(37, 99, 235, 0.18); border-color: #2563eb; }
  100% { transform: translateY(0); }
}

@keyframes cursorApproach {
  0%, 20% { transform: translate(14px, 12px); }
  50%, 85% { transform: translate(-8px, -8px); }
  100% { transform: translate(14px, 12px); }
}
</style>
