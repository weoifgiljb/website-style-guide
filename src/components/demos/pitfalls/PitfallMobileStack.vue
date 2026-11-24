<script setup>
import { ref } from 'vue'

defineProps({
  replayTick: { type: Number, default: 0 }
})

const mode = ref('good')

function toggleMode() {
  mode.value = mode.value === 'good' ? 'bad' : 'good'
}
</script>

<template>
  <div class="pitfall-mobile-stack">
    <span class="stage-badge">
      {{ mode === 'good' ? '📱 390px：✅ 单列堆叠' : '📱 390px：❌ 强塞三栏' }}
    </span>
    <button type="button" class="stage-action" @click.stop="toggleMode">
      {{ mode === 'good' ? '看挤扁反例' : '看正确降级' }}
    </button>

    <div class="phone-frame" :class="mode === 'bad' ? 'is-bad' : 'is-good'">
      <div class="phone-notch"></div>

      <div v-if="mode === 'good'" class="good-stack">
        <div class="stack-card">
          <div class="stack-title">全渠道私域聚合</div>
          <div class="stack-desc">多平台消息一站回复</div>
        </div>
        <div class="stack-card">
          <div class="stack-title">AI 实时智能翻译</div>
          <div class="stack-desc">跨语种秒回全球买家</div>
        </div>
        <button type="button" class="full-cta" @click.stop="toggleMode">免费试用</button>
      </div>

      <div v-else class="bad-columns">
        <div class="cramped-col">
          <div class="cramped-title">全渠道聚合</div>
          <button type="button" class="cramped-btn" @click.stop="toggleMode">立即免费试用</button>
        </div>
        <div class="cramped-col">
          <div class="cramped-title">智能翻译官</div>
          <button type="button" class="cramped-btn" @click.stop="toggleMode">立即免费试用</button>
        </div>
        <div class="cramped-col">
          <div class="cramped-title">自动化跟进</div>
          <button type="button" class="cramped-btn" @click.stop="toggleMode">立即免费试用</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitfall-mobile-stack {
  width: 100%;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-frame {
  width: 190px;
  background: #ffffff;
  border: 2.5px solid #334155;
  border-radius: 18px;
  padding: 6px 8px 8px;
  box-shadow: var(--shadow-sm);
}

.phone-frame.is-bad {
  border-color: #ef4444;
  background: #fffafa;
}

.phone-notch {
  width: 44px;
  height: 4px;
  border-radius: 999px;
  background: #cbd5e1;
  margin: 0 auto 6px;
}

.good-stack {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stack-card {
  width: 100%;
  background: var(--surface-soft);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 5px 7px;
}

.stack-title {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.25;
}

.stack-desc {
  font-size: 9.5px;
  color: var(--text-muted);
  line-height: 1.25;
}

.full-cta {
  width: 100%;
  border: none;
  border-radius: 6px;
  background: var(--primary);
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  padding: 5px 0;
  cursor: pointer;
}

.bad-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3px;
}

.cramped-col {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 4px 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.cramped-title {
  width: 12px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.15;
  color: #991b1b;
  word-break: break-all;
}

.cramped-btn {
  width: 120%;
  border: none;
  border-radius: 4px;
  background: #dc2626;
  color: #ffffff;
  font-size: 9px;
  padding: 2px 3px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
</style>
