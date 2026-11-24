<script setup>
defineProps({
  anim: { type: String, default: '' }
})
</script>

<template>
              <!-- 1. 首屏 Hero -->
              <div v-if="anim === 'sec-hero'" class="sz-hero">
                <div class="sz-hero-left">
                  <span class="sz-kicker">大标题区</span>
                  <i class="sz-h1"></i>
                  <i class="sz-h2"></i>
                  <span class="sz-cta">主按钮</span>
                </div>
                <div class="sz-hero-right">主视觉图</div>
              </div>

              <!-- 2. 功能演示区 -->
              <div v-else-if="anim === 'sec-feature'" class="sz-feature">
                <div class="sz-feat-points">
                  <span class="on">✓ 卖点 1</span>
                  <span>✓ 卖点 2</span>
                </div>
                <div class="sz-feat-screen">🖥 产品界面图</div>
              </div>

              <!-- 3. 多栏卡片区 -->
              <div v-else-if="anim === 'sec-bento'" class="sz-bento">
                <div class="sz-bento-cell hi">📦 亮点卡 1</div>
                <div class="sz-bento-cell">⚡ 亮点卡 2</div>
                <div class="sz-bento-cell">🛡 亮点卡 3</div>
                <div class="sz-bento-cell hi">📊 亮点卡 4</div>
              </div>

              <!-- 4. 连线架构图 -->
              <div v-else-if="anim === 'sec-flow'" class="sz-flow">
                <div class="sz-flow-col">
                  <span>WA</span>
                  <span>IG</span>
                </div>
                <div class="sz-flow-arrow">──▶</div>
                <div class="sz-flow-hub">中心系统</div>
              </div>

              <!-- 5. Tab / 问答区 -->
              <div v-else-if="anim === 'sec-tabs'" class="sz-tabs">
                <div class="sz-tab-pills">
                  <span class="on">标签 1</span>
                  <span>标签 2</span>
                </div>
                <div class="sz-faq-bar">Q: 常见问题展开 ▾</div>
              </div>

              <!-- 6. 其他位置 -->
              <div v-else class="sz-other">
                <span class="sz-other-icon">🔍 任意模块</span>
                <span class="sz-other-sub">填上方原文词自动定位</span>
              </div>
</template>

<style scoped>
/* 1. Hero wireframe */
.sz-hero {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 56px;
  gap: 6px;
  align-items: center;
}

.sz-hero-left {
  display: flex;
  flex-direction: column;
  gap: 3.5px;
}

.sz-kicker {
  font-size: 8.5px;
  font-weight: 700;
  color: #2563eb;
}

.sz-h1 {
  display: block;
  width: 92%;
  height: 5px;
  border-radius: 3px;
  background: #0f172a;
}

.sz-h2 {
  display: block;
  width: 68%;
  height: 4px;
  border-radius: 3px;
  background: #94a3b8;
}

.sz-cta {
  align-self: flex-start;
  font-size: 8px;
  font-weight: 700;
  color: #ffffff;
  background: #2563eb;
  padding: 1.5px 6px;
  border-radius: 4px;
  margin-top: 1px;
}

.sz-hero-right {
  height: 52px;
  border-radius: 6px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  display: grid;
  place-items: center;
  font-size: 9px;
  font-weight: 700;
  color: #1d4ed8;
}

/* 2. Feature demo wireframe */
.sz-feature {
  width: 100%;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 6px;
  align-items: center;
}

.sz-feat-points {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sz-feat-points span {
  font-size: 8.5px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 3px 4px;
  border-radius: 4px;
}

.sz-feat-points span.on {
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.sz-feat-screen {
  height: 52px;
  border-radius: 6px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  display: grid;
  place-items: center;
  font-size: 9.5px;
  font-weight: 700;
  color: #1e40af;
}

/* 3. Bento multi-card grid */
.sz-bento {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.sz-bento-cell {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  padding: 5px 4px;
  font-size: 8.5px;
  font-weight: 700;
  color: #334155;
  text-align: center;
}

.sz-bento-cell.hi {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
}

/* 4. Flow diagram wireframe */
.sz-flow {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.sz-flow-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sz-flow-col span {
  font-size: 8.5px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
}

.sz-flow-arrow {
  font-size: 10px;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: -1px;
}

.sz-flow-hub {
  font-size: 9px;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1.5px solid #2563eb;
  border-radius: 6px;
  padding: 9px 6px;
}

/* 5. Tabs / FAQ wireframe */
.sz-tabs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sz-tab-pills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: #f1f5f9;
  padding: 2px;
  border-radius: 5px;
}

.sz-tab-pills span {
  font-size: 8.5px;
  font-weight: 700;
  text-align: center;
  padding: 2px 0;
  border-radius: 4px;
  color: #64748b;
}

.sz-tab-pills span.on {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.sz-faq-bar {
  font-size: 9px;
  font-weight: 600;
  color: #1e293b;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 5px;
  padding: 5px 6px;
  text-align: center;
}

/* 6. Other custom area */
.sz-other {
  width: 100%;
  height: 54px;
  border: 1.5px dashed #93c5fd;
  background: #f8faff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.sz-other-icon {
  font-size: 10px;
  font-weight: 700;
  color: #2563eb;
}

.sz-other-sub {
  font-size: 8.5px;
  color: #64748b;
}
</style>
