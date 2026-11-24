<script setup>
import { computed } from 'vue'
import { CATEGORIES } from './data/index.js'
import { useCatalogStore } from './composables/useCatalogStore.js'
import HeroHeader from './components/shell/HeroHeader.vue'
import FilterToolbar from './components/shell/FilterToolbar.vue'
import PresetShowcaseStrip from './components/shell/PresetShowcaseStrip.vue'
import CatalogCard from './components/shell/CatalogCard.vue'
import ComboFloatingBar from './components/shell/ComboFloatingBar.vue'
import PageBlueprintDrawer from './components/shell/PageBlueprintDrawer.vue'
import CompetitorPromptModal from './components/shell/CompetitorPromptModal.vue'
import ToastNotice from './components/shell/ToastNotice.vue'

const {
  replayTick,
  activeCategory,
  searchQuery,
  filteredItems,
  isSelected,
  setCategory,
  toggleSelect,
  copyText
} = useCatalogStore()

const showPresetStrip = computed(
  () =>
    !searchQuery.value.trim() &&
    (activeCategory.value === 'all' || activeCategory.value === 'style')
)

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
  copyText(item.prompt, `已复制「${prefix}${item.name}」参数规格话术`)
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
      <PresetShowcaseStrip v-if="showPresetStrip" />

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
        <p>没有找到匹配的版式或动效，换个关键词试试（比如：S-08、Intercom、读条、流光、跑马灯）</p>
        <button type="button" class="reset-btn" @click="resetFilters">
          重置筛选条件
        </button>
      </div>

      <div class="tip-banner">
        💡 节奏建议：常规交互控制在 0.25～0.45s，单页挑 1～2 个重点动效最显高级；若参考陌生小网站，点顶部「🔍 参考外部动效」生成浏览器动态采样指令。
      </div>
    </main>

    <ComboFloatingBar />
    <PageBlueprintDrawer />
    <CompetitorPromptModal />
    <ToastNotice />
  </div>
</template>

<style scoped>
.main {
  padding: 24px 24px 44px;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
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
  padding: 11px 16px;
  font-size: 13px;
  color: #92400e;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .main {
    padding: 20px 16px 36px;
  }
}
</style>
