<script setup lang="ts">
import { useDocument } from 'vuefire';
import { getActionPlanDoc } from '../firebase'
import type { ActionPlan } from '../types'
import { computed } from 'vue';

const actionPlan = useDocument<ActionPlan>(computed(() => getActionPlanDoc()), {
  ssrKey: 'action-plan'
})
</script>
<template>
  <div class="bg-white rounded-xl px-6 py-8" style="box-shadow: 0 0 0 2px #ececec;">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2" style="font-size: 1.5rem; font-weight: 400; position: relative;">
        Action Plan
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text" style="display: none; position: absolute; left: 50%; transform: translateX(-50%); top: 120%; background: #23221F; color: #fff; padding: 0.5em 1em; border-radius: 8px; font-size: 1rem; white-space: pre-line; z-index: 10; min-width: 220px; text-align: left;">Insights from your Venn chat, paired with sample data.</span>
        </span>
      </div>
      <div v-for="(detail, index) in actionPlan?.details" :key="`detail-${index}`" style="font-size: 1rem;" class="mb-3">
        {{ detail }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.info-icon:focus .tooltip-text,
.info-icon:hover .tooltip-text {
  display: block !important;
}
.tooltip-text {
  background: #60195A !important;
  line-height: 1.5;
}
</style>