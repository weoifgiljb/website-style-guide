<script setup>
import { PAGE_PRESETS } from '../../data/index.js'
import { useCatalogStore } from '../../composables/useCatalogStore.js'

const { speed, setSpeed, applyPreset, openDrawer } = useCatalogStore()

const speedOptions = [
  { label: '利落 0.28s', value: '0.28s' },
  { label: '舒缓 0.5s', value: '0.5s' },
  { label: '偏慢 1.05s', value: '1.05s' }
]

function handleApplyPreset(presetId) {
  applyPreset(presetId)
  openDrawer()
}
</script>

<template>
  <header class="hero">
    <div class="container">
      <div class="hero-top">
        <div class="hero-copy">
          <div class="badge-pill">
            <span class="badge-dot"></span>
            SaleSmartly 官网页面指南 · 样式库 & 动效库可视化速查（组件化扩充版）
          </div>
          <h1>官网常用样式 & 动画效果速查（不用背，看着挑）</h1>
          <p class="hero-desc">
            先挑 <strong>14 种常用页面版式（S-01 ~ S-14）</strong> 或点下方 <strong>一键预设</strong>，再体验
            <strong>14 种常见动效</strong> 与 <strong>6 项手机端/避坑准则</strong>，打开「整页骨架预览」调好顺序后一键生成发给 Codex 的完整需求话术。
          </p>
        </div>

        <div class="speed-box">
          <div class="speed-title">
            感受动效节奏对比
            <span>建议 0.2～0.5s</span>
          </div>
          <div class="speed-btns">
            <button
              v-for="opt in speedOptions"
              :key="opt.value"
              type="button"
              class="speed-btn"
              :class="{ active: speed === opt.value }"
              @click="setSpeed(opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="preset-strip">
        <span class="preset-label">⚡ 一键套用整页模板：</span>
        <div class="preset-pills">
          <button
            v-for="preset in PAGE_PRESETS"
            :key="preset.id"
            type="button"
            class="preset-pill"
            :title="preset.desc"
            @click="handleApplyPreset(preset.id)"
          >
            <span class="preset-name">{{ preset.name }}</span>
            <span class="preset-count">{{ preset.floors.length }} 屏骨架</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  background: linear-gradient(180deg, #ffffff 0%, #f6f8fc 100%);
  border-bottom: 1px solid var(--border);
  padding: 34px 24px 24px;
}

.hero-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.hero-copy {
  flex: 1 1 520px;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary);
  flex-shrink: 0;
}

.hero h1 {
  font-size: clamp(23px, 3vw, 31px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 8px;
  line-height: 1.3;
}

.hero-desc {
  color: var(--text-secondary);
  font-size: 14.5px;
  max-width: 720px;
}

.hero-desc strong {
  color: var(--text);
  font-weight: 600;
}

.speed-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  box-shadow: var(--shadow-sm);
  min-width: 286px;
}

.speed-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.speed-title span {
  color: var(--text-muted);
  font-weight: 400;
}

.speed-btns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.speed-btn {
  border: 1px solid var(--border);
  background: var(--surface-soft);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 6px 8px;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.speed-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.speed-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.preset-strip {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.preset-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.preset-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preset-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #bfdbfe;
  background: #ffffff;
  color: var(--text);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.preset-pill:hover {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary);
  transform: translateY(-1px);
}

.preset-count {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-soft);
  padding: 1px 7px;
  border-radius: 999px;
}

.preset-pill:hover .preset-count {
  background: #dbeafe;
}

@media (max-width: 640px) {
  .hero {
    padding: 24px 16px 18px;
  }

  .speed-box {
    width: 100%;
    min-width: 0;
  }
}
</style>
