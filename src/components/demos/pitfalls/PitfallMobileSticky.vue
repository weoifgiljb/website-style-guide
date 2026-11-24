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
  <div class="pitfall-mobile-sticky">
    <span class="stage-badge">
      {{ mode === 'good' ? '📱 390px：✅ 纵向分段' : '📱 390px：❌ 强行左右分栏' }}
    </span>
    <button type="button" class="stage-action" @click.stop="toggleMode">
      {{ mode === 'good' ? '看挤压反例' : '看正确降级' }}
    </button>

    <div class="phone-frame" :class="mode === 'bad' ? 'is-bad' : 'is-good'">
      <div class="phone-notch"></div>

      <div v-if="mode === 'good'" class="vertical-flow">
        <div class="step-copy">
          <span class="step-pill">步骤 01</span>
          <div class="step-heading">步骤 01 标题说明</div>
          <div class="step-desc">解除左右吸附，先看说明再看全宽配图，顺滑自然。</div>
        </div>
        <div class="diagram-card">
          <span>📊 全宽高清流程示意图</span>
        </div>
      </div>

      <div v-else class="cramped-split">
        <div class="squished-left">
          <span class="bad-tag">Sticky 锁死</span>
          <div class="narrow-strip">步骤01标题说明被挤成细窄竖条极难阅读</div>
        </div>
        <div class="squished-right">
          <div class="tiny-diagram">
            <span>缩成邮票</span>
            <span>看不清图</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitfall-mobile-sticky {
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

.vertical-flow {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.step-copy {
  background: var(--surface-soft);
  border-radius: 7px;
  padding: 5px 7px;
}

.step-pill {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 1px 5px;
  border-radius: 999px;
  margin-bottom: 2px;
}

.step-heading {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text);
}

.step-desc {
  font-size: 9px;
  color: var(--text-muted);
  line-height: 1.3;
}

.diagram-card {
  width: 100%;
  border-radius: 7px;
  padding: 9px 6px;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
}

.cramped-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  align-items: stretch;
}

.squished-left {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 4px;
}

.bad-tag {
  display: inline-block;
  font-size: 8.5px;
  font-weight: 700;
  color: #b91c1c;
  margin-bottom: 3px;
}

.narrow-strip {
  width: 24px;
  font-size: 9.5px;
  line-height: 1.15;
  color: #7f1d1d;
  word-break: break-all;
}

.squished-right {
  background: #f1f5f9;
  border: 1px dashed #fca5a5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.tiny-diagram {
  width: 100%;
  border-radius: 4px;
  padding: 6px 2px;
  background: #94a3b8;
  color: #ffffff;
  font-size: 8.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.2;
}
</style>
