<script setup>
import { DEMO_COMPONENTS } from '../demos/index.js'

defineProps({
  item: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  replayTick: { type: Number, default: 0 }
})

const emit = defineEmits(['toggle', 'copy'])
</script>

<template>
  <article class="card" :class="{ selected }">
    <div class="card-head">
      <div class="card-title-wrap">
        <div class="card-name">
          <span
            v-if="item.code"
            class="card-code"
            :class="'kind-' + item.kind"
          >{{ item.code }}</span>
          <span>{{ item.name }}</span>
        </div>
        <span class="card-en">{{ item.en }}</span>
      </div>

      <button
        type="button"
        class="pick-btn"
        @click="emit('toggle', item.id)"
      >
        {{ selected ? '✓ 已选中' : '+ 加入组合' }}
      </button>
    </div>

    <div
      class="stage"
      :class="{
        'style-stage': item.kind === 'style',
        'pitfall-stage': item.kind === 'pitfall'
      }"
    >
      <span v-if="item.kind === 'style' && item.badge" class="stage-badge">
        {{ item.badge }}
      </span>
      <component
        :is="DEMO_COMPONENTS[item.demoKey]"
        :replay-tick="replayTick"
        viewport="desktop"
      />
    </div>

    <div class="card-body">
      <div class="meta-row">
        <strong>适合用在哪：</strong>{{ item.scene }}
      </div>

      <div
        v-if="item.kind === 'style' && item.mobileTip"
        class="mobile-tip"
      >
        📱 手机端：{{ item.mobileTip }}
      </div>

      <div class="prompt-box">
        <div class="prompt-text">
          <span class="prompt-label">提需求可以这样说</span>
          「{{ item.shortPrompt || item.prompt }}」
        </div>
        <button
          type="button"
          class="copy-btn"
          @click="emit('copy', item)"
        >
          复制
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}

.card.selected {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.16), var(--shadow-md);
}

.card-head {
  padding: 16px 18px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.card-title-wrap {
  min-width: 0;
}

.card-name {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.35;
}

.card-code {
  display: inline-block;
  margin-right: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 5px;
  vertical-align: middle;
}

.card-code.kind-style {
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
}

.card-code.kind-motion {
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
}

.card-code.kind-pitfall {
  color: #dc2626;
  background: var(--danger-soft);
  border: 1px solid #fecaca;
}

.card-en {
  display: inline-block;
  margin-top: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 1px 7px;
  border-radius: 5px;
}

.pick-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pick-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.card.selected .pick-btn {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.stage {
  position: relative;
  margin: 0 18px;
  min-height: 184px;
  padding: 36px 14px 14px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage.style-stage {
  background: linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%);
}

.stage.pitfall-stage {
  background: linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%);
}

.card-body {
  padding: 14px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1;
}

.meta-row {
  font-size: 13px;
  color: var(--text-secondary);
}

.meta-row strong {
  color: var(--text);
  font-weight: 600;
}

.mobile-tip {
  font-size: 12px;
  color: var(--text-muted);
  background: #f8fafc;
  border-left: 2px solid #93c5fd;
  padding: 4px 8px;
  border-radius: 0 6px 6px 0;
  line-height: 1.45;
}

.prompt-box {
  margin-top: auto;
  background: var(--surface-soft);
  border: 1px dashed var(--border-strong);
  border-radius: 10px;
  padding: 9px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.prompt-text {
  font-size: 12.5px;
  color: var(--text);
  line-height: 1.45;
}

.prompt-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 2px;
}

.copy-btn {
  flex-shrink: 0;
  background: var(--surface);
  color: var(--primary);
  border: 1px solid #bfdbfe;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.copy-btn:hover {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
}
</style>
