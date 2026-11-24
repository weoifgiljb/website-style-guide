<script setup>
defineProps({
  replayTick: { type: Number, default: 0 }
})
</script>

<template>
  <div class="motion-float-pulse">
    <span class="stage-badge">克制缓慢循环</span>
    <div class="demo-float-scene">
      <div class="online-pill">
        <span class="pulse-wrap">
          <span class="pulse-ring"></span>
          <span class="pulse-core"></span>
        </span>
        <span>7×24 在线</span>
      </div>
      <div class="float-bubble">💬 新客户咨询 +1</div>
    </div>
  </div>
</template>

<style scoped>
.motion-float-pulse {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-float-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  flex-wrap: wrap;
}

.online-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid #a7f3d0;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #065f46;
  box-shadow: var(--shadow-sm);
}

.pulse-wrap {
  position: relative;
  width: 10px;
  height: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pulse-core {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  position: relative;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.45);
  animation: pulseRing 2s ease-out infinite;
}

.float-bubble {
  background: var(--surface);
  border: 1px solid #bfdbfe;
  border-radius: 12px 12px 12px 4px;
  padding: 9px 12px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--primary);
  box-shadow: 0 8px 18px -6px rgba(37, 99, 235, 0.2);
  animation: gentleFloat 3.2s ease-in-out infinite;
}

@keyframes pulseRing {
  0% {
    transform: scale(0.6);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}

@keyframes gentleFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
