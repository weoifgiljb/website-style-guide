<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  replayTick: { type: Number, default: 0 }
})

const mode = ref('good')

function toggleMode() {
  mode.value = mode.value === 'good' ? 'bad' : 'good'
}

watch(
  () => props.replayTick,
  () => {
    toggleMode()
  }
)
</script>

<template>
  <div class="pitfall-mobile-floating">
    <span class="stage-badge">
      {{ mode === 'good' ? '📱 390px：✅ 收起防遮挡' : '📱 390px：❌ 悬浮遮挡文案' }}
    </span>
    <button type="button" class="stage-action" @click.stop="toggleMode">
      {{ mode === 'good' ? '看遮挡反例' : '看正确做法' }}
    </button>

    <div class="phone-frame" :class="mode === 'bad' ? 'is-bad' : 'is-good'">
      <div class="phone-notch"></div>

      <div class="phone-hero">
        <span v-if="mode === 'good'" class="inline-pill">💬 7×24 实时响应</span>

        <div class="phone-headline">全渠道客户消息聚合</div>
        <div class="phone-sub">标题与按钮 100% 清晰无遮挡</div>

        <button type="button" class="phone-cta" @click.stop="toggleMode">
          立即免费试用
        </button>

        <template v-if="mode === 'bad'">
          <div class="blocking-bubble bubble-top">🔥 新客 +99</div>
          <div class="blocking-bubble bubble-bottom">💬 自动回复中...</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitfall-mobile-floating {
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
  padding: 6px 8px 9px;
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

.phone-hero {
  position: relative;
  text-align: center;
  padding: 4px 4px 2px;
}

.inline-pill {
  display: inline-block;
  font-size: 9.5px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  padding: 1px 7px;
  border-radius: 999px;
  margin-bottom: 5px;
}

.phone-headline {
  font-size: 12px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
}

.phone-sub {
  font-size: 9.5px;
  color: var(--text-muted);
  margin: 3px 0 8px;
}

.phone-cta {
  width: 100%;
  border: none;
  border-radius: 7px;
  background: var(--primary);
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  padding: 6px 0;
  cursor: pointer;
}

.blocking-bubble {
  position: absolute;
  z-index: 3;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  box-shadow: 0 6px 14px rgba(220, 38, 38, 0.26);
  pointer-events: none;
}

.bubble-top {
  top: 2px;
  right: 4px;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #f87171;
  animation: overlapFloatTop 1.2s ease-in-out infinite alternate;
}

.bubble-bottom {
  bottom: 2px;
  left: 6px;
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fbbf24;
  animation: overlapFloatBottom 1.1s ease-in-out infinite alternate;
}

@keyframes overlapFloatTop {
  from {
    transform: translate(-6px, 2px) rotate(-3deg);
  }
  to {
    transform: translate(-18px, 10px) rotate(3deg);
  }
}

@keyframes overlapFloatBottom {
  from {
    transform: translate(6px, -2px) rotate(2deg);
  }
  to {
    transform: translate(18px, -10px) rotate(-3deg);
  }
}
</style>
