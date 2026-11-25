<script setup>
import { Globe, Image, Camera } from 'lucide-vue-next'
import { QUICK_EXAMPLES } from '../../../data/competitorExamples.js'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

const emit = defineEmits(['apply-example'])

const { competitorDraft } = useCatalogStore()
</script>

<template>
        <div class="example-row">
          <span class="example-label">试试填入：</span>
          <button
            v-for="ex in QUICK_EXAMPLES"
            :key="ex.label"
            type="button"
            class="example-chip"
            @click="emit('apply-example', ex)"
          >
            {{ ex.label }}
          </button>
        </div>

        <!-- Step 1: Source -->
        <div class="step-card">
          <div class="step-head">
            <span class="step-title">① 参考来源</span>
            <div class="mode-pills" role="group" aria-label="素材方式">
              <button
                type="button"
                class="mode-pill"
                :class="{ active: competitorDraft.sourceMode === 'url' }"
                @click="competitorDraft.sourceMode = 'url'"
              >
                <Globe :size="13" :stroke-width="1.8" aria-hidden="true" />
                <span>填网页链接</span>
              </button>
              <button
                type="button"
                class="mode-pill"
                :class="{ active: competitorDraft.sourceMode === 'screenshots' }"
                @click="competitorDraft.sourceMode = 'screenshots'"
              >
                <Image :size="13" :stroke-width="1.8" aria-hidden="true" />
                <span>发录屏截图</span>
              </button>
            </div>
          </div>

          <div v-if="competitorDraft.sourceMode === 'url'" class="two-cols">
            <div>
              <label class="mini-label" for="compUrlInput">参考网址</label>
              <input
                id="compUrlInput"
                v-model="competitorDraft.competitorUrl"
                type="url"
                class="text-input"
                placeholder="粘贴网址，如 https://fin.ai"
              />
            </div>

            <div>
              <label class="mini-label" for="compAnchorInput">
                那块的一句原文词
                <em class="tag-green">帮 AI 找准位置</em>
              </label>
              <input
                id="compAnchorInput"
                v-model="competitorDraft.anchorText"
                type="text"
                class="text-input"
                placeholder="复制那块的一句标题词粘贴进来"
              />
            </div>
          </div>

          <div v-else class="shot-banner">
            <Camera :size="14" :stroke-width="1.8" class="shot-icon" aria-hidden="true" />
            <span>复制话术发给 Agent 时，顺手贴上 <b>「动之前 + 动完后」2～3 张截图</b>，Agent 会自动对比分析。</span>
          </div>
        </div>
        <div class="two-cols compact-extra">
          <div>
            <label class="mini-label" for="compTargetInput">用于哪个官网页（选填）</label>
            <input
              id="compTargetInput"
              v-model="competitorDraft.targetPage"
              type="text"
              class="text-input"
              placeholder="如 /features/ai-agents"
            />
          </div>
          <div>
            <label class="mini-label" for="compExtraInput">补充要求（选填）</label>
            <input
              id="compExtraInput"
              v-model="competitorDraft.extraNote"
              type="text"
              class="text-input"
              placeholder="如：改成官网白底蓝字"
            />
          </div>
        </div>
</template>

<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.example-label {
  font-size: 12px;
  color: var(--text-muted);
}

.example-chip {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4338ca;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.example-chip:hover {
  background: #4338ca;
  color: #ffffff;
}

.step-card {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.step-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}

.mode-pills {
  display: inline-flex;
  background: #e2e8f0;
  padding: 2px;
  border-radius: 8px;
}

.mode-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.mode-pill.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.two-cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.mini-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.tag-green {
  font-style: normal;
  font-size: 10px;
  font-weight: 700;
  color: #047857;
  background: var(--accent-soft);
  border: 1px solid #a7f3d0;
  padding: 0 6px;
  border-radius: 999px;
}

.text-input {
  width: 100%;
  margin-top: 4px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 12.5px;
  color: var(--text);
  outline: none;
}

.text-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.shot-banner {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--warn-soft);
  border: 1px solid #fde68a;
  color: #92400e;
  border-radius: 9px;
  padding: 8px 11px;
  font-size: 12px;
}

.shot-icon {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .two-cols {
    grid-template-columns: 1fr;
  }
}
</style>
