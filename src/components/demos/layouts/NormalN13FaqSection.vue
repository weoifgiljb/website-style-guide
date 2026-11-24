<script setup>
import { ref } from 'vue'

defineProps({
  viewport: { type: String, default: 'desktop' },
  compact: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const openIdx = ref(0)

const faqs = [
  {
    id: 'wa-safety',
    question: '接入官方 WhatsApp API 会封号吗？',
    answer: '采用 Meta 官方授权 BSP 通道，合规消息模板群发稳定防封，支持多号协同。'
  },
  {
    id: 'migration',
    question: '历史客户标签与聊天记录能否平滑迁移？',
    answer: '支持 CSV 批量导入联系人画像、标签体系与快捷话术库，切换零断层。'
  },
  {
    id: 'billing',
    question: '团队弹性增减坐席如何计费？',
    answer: '支持按需随时增购坐席与渠道数，升级差价按剩余周期自动折算并即时生效。'
  }
]
</script>

<template>
  <section
    class="normal-n13"
    :class="{ 'is-mobile': viewport === 'mobile', 'is-compact': compact }"
  >
    <div class="n13-left">
      <h2 class="n13-title">常见问题解答</h2>
      <p class="n13-desc">集中解答渠道接入、计费与迁移顾虑</p>
    </div>

    <div class="n13-right">
      <div
        v-for="(item, idx) in faqs"
        :key="item.id"
        class="n-card-item faq-item"
        :class="{ 'is-open': openIdx === idx }"
      >
        <button
          type="button"
          class="faq-trigger"
          :aria-expanded="openIdx === idx"
          @click.stop="openIdx = openIdx === idx ? -1 : idx"
        >
          <span class="faq-question">{{ item.question }}</span>
          <span class="faq-plus" :class="{ 'is-open': openIdx === idx }" aria-hidden="true">
            +
          </span>
        </button>

        <div v-if="openIdx === idx" class="faq-panel">
          <p class="faq-answer">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.normal-n13 {
  width: 100%;
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 13px 13px;
  display: grid;
  grid-template-columns: 0.85fr 1.35fr;
  gap: 12px;
  align-items: start;
  box-sizing: border-box;
}

.n13-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 2px;
  min-width: 0;
}

.n13-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 800;
  line-height: 1.3;
  color: #0f172a;
}

.n13-desc {
  margin: 0;
  font-size: 9.5px;
  line-height: 1.48;
  color: #475569;
}

.n13-right {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.faq-item {
  width: 100%;
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 14px;
  padding: 8px 11px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  transition: background 0.22s ease, border-color 0.22s ease, padding 0.22s ease;
  box-sizing: border-box;
}

.faq-item.is-open {
  background: #f1f5f9;
  border-color: #e2e8f0;
  padding: 10px 11px;
}

.faq-trigger {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  text-align: left;
}

.faq-question {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.38;
  color: #0f172a;
  min-width: 0;
}

.faq-plus {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  flex-shrink: 0;
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}

.faq-plus.is-open {
  transform: rotate(45deg);
}

.faq-panel {
  border-left: 2px solid #2563eb;
  padding-left: 10px;
}

.faq-answer {
  margin: 0;
  font-size: 9.5px;
  line-height: 1.48;
  color: #475569;
}

/* Compact */
.normal-n13.is-compact {
  padding: 10px;
  gap: 8px;
}

.normal-n13.is-compact .n13-title {
  font-size: 12px;
}

.normal-n13.is-compact .n13-desc {
  font-size: 8.5px;
}

.normal-n13.is-compact .faq-item {
  padding: 6px 9px;
  border-radius: 11px;
}

.normal-n13.is-compact .faq-item.is-open {
  padding: 8px 9px;
}

.normal-n13.is-compact .faq-question {
  font-size: 9px;
}

.normal-n13.is-compact .faq-answer {
  font-size: 8.5px;
}

/* Mobile (316px shell) */
.normal-n13.is-mobile {
  grid-template-columns: 1fr;
  padding: 11px 10px;
  gap: 8px;
}

.normal-n13.is-mobile .n13-left {
  text-align: center;
  align-items: center;
  gap: 3px;
  padding: 0;
}

.normal-n13.is-mobile .n13-title {
  font-size: 12.5px;
}

.normal-n13.is-mobile .n13-desc {
  font-size: 9px;
}

.normal-n13.is-mobile .faq-item {
  padding: 7px 9px;
  border-radius: 12px;
}

.normal-n13.is-mobile .faq-item.is-open {
  padding: 9px 9px;
}

.normal-n13.is-mobile .faq-question {
  font-size: 9.5px;
}

.normal-n13.is-mobile .faq-answer {
  font-size: 8.8px;
}
</style>
