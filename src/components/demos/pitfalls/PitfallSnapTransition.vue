<script setup>
import { ref } from 'vue'

defineProps({
  replayTick: { type: Number, default: 0 }
})

const isOpen = ref(false)
const goodOpen = ref(false)
const badOpen = ref(false)

function toggleBoth() {
  isOpen.value = !isOpen.value
  goodOpen.value = isOpen.value
  badOpen.value = isOpen.value
}

function toggleGood() {
  goodOpen.value = !goodOpen.value
  isOpen.value = goodOpen.value && badOpen.value
}

function toggleBad() {
  badOpen.value = !badOpen.value
  isOpen.value = goodOpen.value && badOpen.value
}
</script>

<template>
  <div class="pitfall-snap-transition">
    <span class="stage-badge">点击两侧展开对比</span>
    <button type="button" class="stage-action" @click.stop="toggleBoth">
      ⇄ 同步切换两侧
    </button>

    <div class="snap-grid">
      <div class="snap-col">
        <div class="faq-card card-good" :class="{ open: goodOpen }">
          <button type="button" class="faq-head" @click.stop="toggleGood">
            <span class="head-label">✅ 平滑高度过渡</span>
            <span class="arrow">▼</span>
          </button>
          <div class="smooth-panel">
            <div class="smooth-inner">
              <p>0fr → 1fr 丝滑推开，下方阅读视线平稳不丢行。</p>
            </div>
          </div>
        </div>
        <div class="below-pill pill-good">下方模块平稳顺移</div>
      </div>

      <div class="snap-col">
        <div class="faq-card card-bad" :class="{ open: badOpen }">
          <button type="button" class="faq-head" @click.stop="toggleBad">
            <span class="head-label">❌ 生硬闪现跳动</span>
            <span class="arrow abrupt-arrow">▼</span>
          </button>
          <div v-if="badOpen" class="abrupt-panel">
            <p>无过渡瞬间撑开高度，下方内容突兀闪跳刺眼。</p>
          </div>
        </div>
        <div class="below-pill pill-bad">下方模块突兀闪跳</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitfall-snap-transition {
  width: 100%;
  padding-top: 22px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.snap-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  align-items: start;
}

.snap-col {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.faq-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  overflow: hidden;
}

.card-good {
  border-color: #a7f3d0;
}

.card-bad {
  border-color: #fecaca;
}

.faq-head {
  width: 100%;
  border: none;
  background: transparent;
  padding: 7px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.card-good .head-label {
  color: #047857;
}

.card-bad .head-label {
  color: #b91c1c;
}

.arrow {
  font-size: 9.5px;
  color: var(--text-muted);
  transition: transform var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.abrupt-arrow {
  transition: none;
}

.faq-card.open .arrow {
  transform: rotate(180deg);
}

.smooth-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur, 0.28s) var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
}

.card-good.open .smooth-panel {
  grid-template-rows: 1fr;
}

.smooth-inner {
  min-height: 0;
  overflow: hidden;
  padding: 0 8px;
  font-size: 10px;
  line-height: 1.38;
  color: var(--text-secondary);
}

.smooth-inner p {
  padding-bottom: 7px;
}

.abrupt-panel {
  transition: none;
  padding: 0 8px 7px;
  font-size: 10px;
  line-height: 1.38;
  color: var(--text-secondary);
}

.below-pill {
  font-size: 9.5px;
  font-weight: 600;
  text-align: center;
  padding: 3px 6px;
  border-radius: 6px;
}

.pill-good {
  background: var(--accent-soft);
  color: #065f46;
}

.pill-bad {
  background: var(--danger-soft);
  color: #991b1b;
}
</style>
