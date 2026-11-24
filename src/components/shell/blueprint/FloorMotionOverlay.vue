<script setup>
defineProps({
  players: { type: Object, required: true },
  viewport: { type: String, default: 'desktop' }
})
</script>

<template>
      <!-- M-11 Parallax Depth Layer -->
      <div v-if="players.hasMotion('M-11')" class="bp-parallax-layer" aria-hidden="true">
        <span class="bp-orb orb-a" :style="players.orbBackStyle"></span>
        <span class="bp-orb orb-b" :style="players.orbFrontStyle">✦ 视差层次</span>
      </div>

      <!-- M-14 Float & Pulse Status -->
      <div
        v-if="players.hasMotion('M-14')"
        class="bp-float-bar"
        :class="{ 'is-mobile': viewport === 'mobile', 'is-boost': players.isDemoActive }"
      >
        <span class="bp-online-pill"><i class="bp-pulse-dot"></i>7×24 在线</span>
        <span class="bp-float-bubble">💬 新咨询 +1</span>
      </div>

      <!-- M-04 Typewriter / Text Rotate Banner -->
      <div v-if="players.hasMotion('M-04')" class="bp-rotate-banner">
        <span>轻松连接</span>
        <span v-if="players.textMode === 'rotate'" class="bp-word-slot">
          <span :key="players.wordIdx" class="bp-word-slide">{{ players.CHANNELS[players.wordIdx] }}</span>
        </span>
        <span v-else class="bp-word-slot is-type">
          {{ players.typedText }}<i class="bp-caret">|</i>
        </span>
        <span>客户</span>
        <em class="bp-mode-tag">{{ players.textMode === 'rotate' ? '上下轮换' : '打字机' }}</em>
      </div>

      <!-- M-09 Sliding Pill Tabs -->
      <div v-if="players.hasMotion('M-09')" class="bp-tabs-bar">
        <span class="bp-tab-glider" :style="{ transform: `translateX(${players.activeTab * 100}%)` }"></span>
        <button
          v-for="(label, idx) in players.TABS"
          :key="label"
          type="button"
          class="bp-tab-btn"
          :class="{ active: players.activeTab === idx }"
          @click="players.selectTab(idx)"
        >
          {{ label }}
        </button>
      </div>

      <!-- M-10 Sticky Step Progress -->
      <div v-if="players.hasMotion('M-10')" class="bp-sticky-bar">
        <button
          v-for="(stepLabel, sIdx) in players.STICKY_STEPS"
          :key="stepLabel"
          type="button"
          class="bp-step-pill"
          :class="{ active: players.stickyStep === sIdx }"
          @click="players.stickyStep = sIdx"
        >
          {{ stepLabel }}
        </button>
      </div>

      <!-- M-15 Auto-Progress Tabs Strip -->
      <div v-if="players.hasMotion('M-15')" class="bp-autotabs-bar">
        <button
          v-for="(tLabel, aIdx) in players.AUTO_TABS"
          :key="tLabel"
          type="button"
          class="bp-autotab-btn"
          :class="{ active: players.autoTabIdx === aIdx }"
          @click="players.pickAutoTab(aIdx)"
        >
          <span>{{ tLabel }}</span>
          <i
            class="bp-autotab-line"
            :style="{ width: players.autoTabIdx === aIdx ? `${players.autoTabProgress}%` : '0%' }"
          ></i>
        </button>
      </div>

      <!-- M-16 Omnichannel Routing Flow Strip -->
      <div v-if="players.hasMotion('M-16')" class="bp-flow-strip">
        <span class="bp-flow-node" :class="{ lit: players.flowPhase === 0 }">WhatsApp / IG / TikTok</span>
        <span class="bp-flow-beam"></span>
        <span class="bp-flow-node hub" :class="{ lit: players.flowPhase === 1 }">AI 统一路由中枢</span>
        <span class="bp-flow-beam"></span>
        <span class="bp-flow-node target" :class="{ lit: players.flowPhase === 2 }">自动翻译 + 分配坐席</span>
      </div>

      <!-- M-17 AI Chat Reply Stream Strip -->
      <div v-if="players.hasMotion('M-17')" class="bp-chat-strip">
        <span v-if="players.chatStep >= 1" class="bp-chat-pill buyer">买：¿Cambiar talla a M?</span>
        <span v-if="players.chatStep === 2" class="bp-chat-pill thinking">AI 检索订单库 ···</span>
        <span v-if="players.chatStep >= 3" class="bp-chat-pill ai">✓ AI 西语秒回：已改 M 码</span>
      </div>
  <slot />
      <!-- M-12 Rolling Count-Up Strip -->
      <div v-if="players.hasMotion('M-12')" class="bp-metrics-strip">
        <span><b>{{ players.metrics.stability }}%</b> 稳定率</span>
        <i class="bp-dot">·</i>
        <span><b>{{ players.metrics.companies }}+</b> 企业</span>
        <i class="bp-dot">·</i>
        <span><b>{{ players.metrics.speed }}x</b> 提速</span>
      </div>

      <!-- M-08 Smooth Grid Accordion -->
      <div v-if="players.hasMotion('M-08')" class="bp-accordion">
        <button
          type="button"
          class="bp-acc-trigger"
          :aria-expanded="players.accordionOpen"
          @click="players.accordionOpen = !players.accordionOpen"
        >
          <span>补充常见疑问：支持多团队按权限分流吗？</span>
          <i class="bp-acc-arrow" :class="{ open: players.accordionOpen }">▾</i>
        </button>
        <div class="bp-acc-grid" :class="{ open: players.accordionOpen }">
          <div class="bp-acc-inner">
            支持按语种、渠道来源与坐席技能组自动路由，主管可按部门查看独立会话报表。
          </div>
        </div>
      </div>

      <!-- M-13 Seamless Channel Marquee -->
      <div v-if="players.hasMotion('M-13')" class="bp-marquee" :class="{ 'is-boost': players.isDemoActive }">
        <div
          v-for="copy in 2"
          :key="copy"
          class="bp-marquee-group"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <span
            v-for="(ch, i) in [...players.MARQUEE_CHANNELS, ...players.MARQUEE_CHANNELS]"
            :key="`${copy}-${i}`"
            class="bp-mq-chip"
          >
            ● {{ ch }}
          </span>
        </div>
      </div>
</template>

<style scoped>

/* M-04 Rotate / Typewriter */
.bp-rotate-banner {
  display: flex; align-items: center; flex-wrap: wrap; gap: 5px;
  padding: 5px 10px; border-radius: 7px; background: var(--primary-soft);
  border: 1px solid #bfdbfe; font-size: 11.5px; font-weight: 600; color: var(--text);
}
.bp-word-slot {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 78px; padding: 0 6px; border-radius: 5px;
  background: #ffffff; color: var(--primary); font-weight: 700; overflow: hidden;
}
.bp-word-slide { animation: bpWordIn 0.26s var(--ease) both; }
.bp-caret { margin-left: 1px; font-style: normal; animation: bpBlink 0.8s infinite; }
.bp-mode-tag { margin-left: auto; font-style: normal; font-size: 10px; color: var(--text-muted); }

/* M-09 Sliding Tabs */
.bp-tabs-bar {
  position: relative; display: grid; grid-template-columns: repeat(3, 1fr);
  background: #e2e8f0; padding: 3px; border-radius: 8px;
}
.bp-tab-glider {
  position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / 3);
  background: #ffffff; border-radius: 6px; box-shadow: var(--shadow-sm);
  transition: transform var(--dur, 0.28s) var(--ease);
}
.bp-tab-btn {
  position: relative; z-index: 1; border: none; background: transparent;
  font-size: 10.5px; font-weight: 600; color: var(--text-secondary); padding: 4px 4px; cursor: pointer;
}
.bp-tab-btn.active { color: var(--primary); }

/* M-10 Sticky Step Bar & Synchronized Card Highlight */
.bp-sticky-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.bp-step-pill {
  border: 1px solid var(--border); background: var(--surface-soft); color: var(--text-secondary);
  font-size: 10.5px; font-weight: 600; padding: 4px 6px; border-radius: 6px; cursor: pointer;
  transition: all var(--dur, 0.28s) var(--ease);
}
.bp-step-pill.active { background: var(--primary); border-color: var(--primary); color: #ffffff; }

/* M-11 Parallax */
.bp-parallax-layer { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.bp-orb { position: absolute; transition: transform 0.08s linear; }
.orb-a {
  width: 68px; height: 68px; left: -12px; bottom: -12px; border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.18), transparent 70%);
}
.orb-b {
  right: 8px; top: 4px; font-size: 10px; font-weight: 700; color: var(--primary);
  background: rgba(239, 246, 255, 0.92); border: 1px solid #bfdbfe;
  padding: 1px 7px; border-radius: 999px; box-shadow: var(--shadow-sm);
}

/* M-12 Count Up */
.bp-metrics-strip {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px;
  padding: 6px 10px; border-radius: 7px; background: #0f172a; color: #cbd5e1;
  font-size: 11px; font-variant-numeric: tabular-nums;
}
.bp-metrics-strip b { color: #38bdf8; font-size: 12.5px; }
.bp-dot { font-style: normal; opacity: 0.45; }

/* M-08 Accordion */
.bp-accordion { border: 1px solid var(--border); border-radius: 8px; background: var(--surface-soft); overflow: hidden; }
.bp-acc-trigger {
  width: 100%; border: none; background: transparent; padding: 7px 10px;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  font-size: 11px; font-weight: 600; color: var(--text); cursor: pointer; text-align: left;
}
.bp-acc-arrow { font-style: normal; transition: transform var(--dur, 0.28s) var(--ease); }
.bp-acc-arrow.open { transform: rotate(180deg); color: var(--primary); }
.bp-acc-grid { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur, 0.28s) var(--ease); }
.bp-acc-grid.open { grid-template-rows: 1fr; }
.bp-acc-inner { overflow: hidden; font-size: 11px; color: var(--text-secondary); padding: 0 10px; }
.bp-acc-grid.open .bp-acc-inner { padding: 0 10px 8px; }

/* M-13 Marquee */
.bp-marquee {
  display: flex; overflow: hidden; min-width: 0; padding: 5px 0; border-radius: 7px;
  background: var(--surface-soft); border: 1px solid var(--border);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.bp-marquee-group {
  display: flex; flex: 0 0 auto; align-items: center; gap: 14px;
  min-width: 100%; padding-right: 14px;
  animation: bpMarquee 28s linear infinite;
}
.bp-marquee:hover .bp-marquee-group { animation-play-state: paused; }
.bp-marquee.is-boost { border-color: var(--primary); background: var(--primary-soft); }
.bp-mq-chip { font-size: 10.5px; font-weight: 600; color: var(--text-secondary); white-space: nowrap; }

/* M-14 Float & Pulse */
.bp-float-bar {
  position: absolute; top: 4px; right: 6px; z-index: 3;
  display: inline-flex; align-items: center; gap: 6px; pointer-events: none;
}
.bp-float-bar.is-mobile { position: static; align-self: flex-start; margin-bottom: 2px; }
.bp-online-pill {
  display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700;
  color: #047857; background: var(--accent-soft); border: 1px solid #a7f3d0;
  padding: 1px 7px; border-radius: 999px;
}
.bp-pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: bpPulse 1.8s ease-out infinite; }
.bp-float-bubble {
  font-size: 10px; font-weight: 700; color: var(--primary); background: #ffffff;
  border: 1px solid #bfdbfe; padding: 1px 8px; border-radius: 999px;
  box-shadow: var(--shadow-sm); animation: bpFloat 2.8s ease-in-out infinite;
}
.bp-float-bar.is-mobile .bp-float-bubble { animation: none; }
.bp-float-bar.is-boost .bp-float-bubble { border-color: var(--primary); box-shadow: var(--shadow-hover); }

/* M-15 Auto-Progress Tabs */
.bp-autotabs-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.bp-autotab-btn {
  position: relative; overflow: hidden; border: 1px solid var(--border);
  background: var(--surface-soft); color: var(--text-secondary);
  font-size: 10.5px; font-weight: 600; padding: 4px 6px 6px; border-radius: 6px; cursor: pointer;
}
.bp-autotab-btn.active { background: #ffffff; border-color: #93c5fd; color: var(--primary); }
.bp-autotab-line {
  position: absolute; left: 0; bottom: 0; height: 2px; background: var(--primary);
  transition: width 0.14s linear;
}

/* M-16 Channel Flow Strip */
.bp-flow-strip {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px;
  padding: 5px 9px; border-radius: 7px; background: var(--surface-soft); border: 1px solid var(--border);
}
.bp-flow-node {
  font-size: 10px; font-weight: 600; color: var(--text-secondary);
  background: #ffffff; border: 1px solid var(--border); padding: 2px 7px; border-radius: 999px;
  transition: all var(--dur, 0.28s) var(--ease);
}
.bp-flow-node.lit { border-color: var(--primary); color: var(--primary); box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15); }
.bp-flow-node.target.lit { border-color: var(--accent); color: #047857; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.16); }
.bp-flow-beam {
  flex: 1 1 24px; height: 2px; border-radius: 999px;
  background: linear-gradient(90deg, #cbd5e1 0%, var(--primary) 50%, #cbd5e1 100%);
  background-size: 200% 100%; animation: bpBeam 1.6s linear infinite;
}

/* M-17 Chat Reply Stream */
.bp-chat-strip {
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  padding: 5px 9px; border-radius: 7px; background: var(--surface-soft); border: 1px solid var(--border);
  min-height: 30px;
}
.bp-chat-pill {
  font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
  animation: bpWordIn var(--dur, 0.28s) var(--ease) both;
}
.bp-chat-pill.buyer { background: #ffffff; border: 1px solid var(--border); color: var(--text-secondary); }
.bp-chat-pill.thinking { background: var(--primary-soft); border: 1px solid #bfdbfe; color: var(--primary); }
.bp-chat-pill.ai { background: var(--accent-soft); border: 1px solid #a7f3d0; color: #047857; }

@keyframes bpBeam { from { background-position: 200% 0; } to { background-position: 0% 0; } }

@keyframes bpWordIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bpBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes bpMarquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes bpPulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); } 75%, 100% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } }
@keyframes bpFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
</style>
