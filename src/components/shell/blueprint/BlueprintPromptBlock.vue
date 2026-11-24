<script setup>
import { ref } from 'vue'
import { useCatalogStore } from '../../../composables/useCatalogStore.js'

const { generatedPrompt, copyText } = useCatalogStore()
const isPromptExpanded = ref(true)
</script>

<template>
          <div class="field-block prompt-preview-block">
            <div class="prompt-header-row">
              <label class="field-label" for="generatedPromptArea">③ 实时生成的 Codex 需求话术</label>
              <button
                type="button"
                class="toggle-prompt-btn"
                @click="isPromptExpanded = !isPromptExpanded"
              >
                {{ isPromptExpanded ? '收起预览 ▲' : '展开预览 ▼' }}
              </button>
            </div>
            <textarea
              v-show="isPromptExpanded"
              id="generatedPromptArea"
              class="prompt-textarea"
              readonly
              :value="generatedPrompt"
            />
            <button
              type="button"
              class="btn-primary copy-full-btn"
              @click="copyText(generatedPrompt, '已复制完整楼层话术')"
            >
              📋 一键复制完整楼层话术
            </button>
          </div>
</template>

<style scoped>
.field-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.field-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text);
}

.prompt-preview-block {
  margin-top: auto;
}

.prompt-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.toggle-prompt-btn {
  border: none;
  background: transparent;
  color: var(--primary);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 4px;
}

.toggle-prompt-btn:hover {
  text-decoration: underline;
}

.prompt-textarea {
  width: 100%;
  min-height: 148px;
  resize: vertical;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: #f8fafc;
  color: var(--text);
  font-size: 12px;
  line-height: 1.5;
}

.copy-full-btn {
  width: 100%;
  padding: 10px 14px;
  font-size: 13px;
}
</style>
