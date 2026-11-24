<script setup>
defineProps({
  anim: { type: String, default: '' },
  activeSlot: { type: Number, default: 0 },
  counterVal: { type: Number, default: 0 }
})
</script>

<template>
          <!-- 6. loop-pulse: Seamless marquee -->
          <div v-if="anim === 'loop-pulse'" class="scene scene-marquee">
            <div class="mq-row">
              <div class="mq-track">
                <span>WhatsApp</span>
                <span>TikTok</span>
                <span>LINE</span>
                <span>WhatsApp</span>
                <span>TikTok</span>
                <span>LINE</span>
              </div>
            </div>
            <div class="pulse-badge"><i class="pulse-dot"></i>持续柔和循环</div>
          </div>
          <!-- 9. path-pulse: Flowing light along line -->
          <div v-else-if="anim === 'path-pulse'" class="scene scene-path">
            <span class="pf-node">多渠道</span>
            <span class="pf-wire"><i class="pf-spark"></i></span>
            <span class="pf-node hub">AI 中枢</span>
          </div>

          <!-- 10. spotlight-glow: Border shimmer -->
          <div v-else-if="anim === 'spotlight-glow'" class="scene scene-shimmer">
            <div class="shimmer-card">
              <span>✨ 品牌高光扫过</span>
              <i class="shimmer-beam"></i>
            </div>
          </div>
          <!-- 16. float-pulse: M-14 online pulse + gentle float -->
          <div v-else-if="anim === 'float-pulse'" class="scene scene-floatpulse">
            <span class="fp-online"><i class="pulse-dot"></i>7×24 在线呼吸</span>
            <span class="fp-bubble">💬 新咨询微浮 +1</span>
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

/* Marquee */
.scene-marquee {
  flex-direction: column;
  gap: 7px;
}

.mq-row {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 4px 0;
}

.mq-track {
  display: flex;
  width: max-content;
  gap: 10px;
  animation: miniMarquee 3.2s linear infinite;
}

.mq-track span {
  font-size: 10px;
  font-weight: 600;
  color: #475569;
}

.pulse-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  color: #047857;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  animation: dotPing 1.2s ease-out infinite;
}

/* Path pulse */
.scene-path {
  gap: 6px;
}

.pf-node {
  font-size: 10px;
  font-weight: 700;
  padding: 5px 8px;
  border-radius: 7px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
}

.pf-node.hub {
  border-color: #2563eb;
  color: #2563eb;
  animation: hubGlow 1.4s ease-in-out infinite;
}

.pf-wire {
  flex: 1;
  height: 3px;
  background: #e2e8f0;
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

.pf-spark {
  position: absolute;
  top: 0;
  left: -30%;
  width: 35%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, #2563eb, #10b981);
  animation: sparkRun 1.4s linear infinite;
}

/* Shimmer */
.shimmer-card {
  position: relative;
  overflow: hidden;
  width: 164px;
  padding: 12px 10px;
  border-radius: 9px;
  background: #ffffff;
  border: 1.5px solid #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #1e293b;
}

.shimmer-beam {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 25%, rgba(37, 99, 235, 0.22) 50%, transparent 75%);
  animation: shimmerSweep 1.5s ease-in-out infinite;
}

.scene-floatpulse {
  flex-direction: column;
  gap: 7px;
}

.fp-online {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 2px 8px;
  border-radius: 999px;
}

.fp-bubble {
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
  background: #ffffff;
  border: 1px solid #93c5fd;
  padding: 3px 10px;
  border-radius: 999px;
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.12);
  animation: miniFloatY 1.6s ease-in-out infinite;
}

@keyframes miniMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes dotPing {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); }
  80%, 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

@keyframes staggerPop {
  0%, 12% { opacity: 0; transform: translateY(8px); }
  35%, 85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

@keyframes sparkRun {
  from { left: -35%; }
  to { left: 105%; }
}

@keyframes hubGlow {
  0%, 55% { box-shadow: none; }
  75% { box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.22); }
  100% { box-shadow: none; }
}

@keyframes shimmerSweep {
  0% { transform: translateX(-110%); }
  65%, 100% { transform: translateX(110%); }
}

@keyframes miniFloatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
