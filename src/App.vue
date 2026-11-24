<script setup>
import { computed } from 'vue'
import { CATEGORIES } from './data/index.js'
import { useCatalogStore } from './composables/useCatalogStore.js'
import HeroHeader from './components/shell/HeroHeader.vue'
import FilterToolbar from './components/shell/FilterToolbar.vue'
import CatalogCard from './components/shell/CatalogCard.vue'
import ComboFloatingBar from './components/shell/ComboFloatingBar.vue'
import PageBlueprintDrawer from './components/shell/PageBlueprintDrawer.vue'
import ToastNotice from './components/shell/ToastNotice.vue'

const {
  replayTick,
  searchQuery,
  filteredItems,
  isSelected,
  setCategory,
  toggleSelect,
  copyText
} = useCatalogStore()

const visibleSections = computed(() =>
  CATEGORIES.slice(1)
    .map((cat) => ({
      ...cat,
      items: filteredItems.value.filter((item) => item.cat === cat.id)
    }))
    .filter((section) => section.items.length > 0)
)

function handleCopyCard(item) {
  const prefix = item.code ? `${item.code} ` : ''
  copyText(item.prompt, `已复制「${prefix}${item.name}」需求话术`)
}

function resetFilters() {
  searchQuery.value = ''
  setCategory('all')
}
</script>

<template>
  <div class="app-shell">
    <HeroHeader />
    <FilterToolbar />

    <main class="main container">
      <template v-if="visibleSections.length > 0">
        <section
          v-for="section in visibleSections"
          :key="section.id"
          class="category-section"
        >
          <div class="cat-header">
            <h2 class="cat-title">
              <span class="cat-num" :style="section.numStyle || ''">{{ section.sectionNum }}</span>
              <span>{{ section.sectionTitle }}</span>
            </h2>
            <span class="cat-desc">{{ section.sectionDesc }}</span>
          </div>

          <div class="grid">
            <CatalogCard
              v-for="item in section.items"
              :key="item.id"
              :item="item"
              :selected="isSelected(item.id)"
              :replay-tick="replayTick"
              @toggle="toggleSelect"
              @copy="handleCopyCard"
            />
          </div>
        </section>
      </template>

      <div v-else class="empty-state">
        <p>没有找到匹配的版式或动效，换个关键词试试（比如：S-08、Bento、首屏、FAQ、手机端、跑马灯）</p>
        <button type="button" class="reset-btn" @click="resetFilters">
          重置筛选条件
        </button>
      </div>

      <div class="tip-banner">
        <span class="tip-icon" aria-hidden="true">💡</span>
        <div>
          <strong>选节奏小口诀：</strong>ToB 官网动效讲究「克制、利落」——大部分交互时长控制在
          <strong>0.2～0.5 秒</strong> 最舒服；一个页面挑 <strong>1～2 个重点区块</strong>
          做吸睛动效就够了，全页乱飞反而显花哨，手机端记得让 Codex 自动简化降级。
        </div>
      </div>
    </main>

    <ComboFloatingBar />
    <PageBlueprintDrawer />
    <ToastNotice />
  </div>
</template>

<style scoped>
.main {
  padding: 28px 24px 44px;
}

.category-section {
  margin-bottom: 42px;
}

.cat-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.cat-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.cat-desc {
  font-size: 13px;
  color: var(--text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 56px 20px;
  background: var(--surface);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-lg);
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.reset-btn {
  border: 1px solid #bfdbfe;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 13px;
  font-weight: 600;
  padding: 7px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.tip-banner {
  background: var(--warn-soft);
  border: 1px solid #fde68a;
  border-radius: var(--radius-md);
  padding: 14px 18px;
  font-size: 13.5px;
  color: #92400e;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 8px;
}

.tip-banner strong {
  color: #78350f;
}

.tip-icon {
  font-size: 16px;
  line-height: 1.4;
}

@media (max-width: 640px) {
  .main {
    padding: 20px 16px 36px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
