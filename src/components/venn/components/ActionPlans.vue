<script setup lang="ts">
import type { SurveyActionPlan } from '@venn/types'
import { computed } from 'vue'

const props = defineProps<{
  actionPlans: SurveyActionPlan[]
}>()

const sortedActionPlans = computed(() => {
  return [...props.actionPlans].sort((a, b) => a.priority - b.priority)
})
</script>

<template>
  <div class="bg-white rounded-xl px-6 py-8 shadow-sm">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2 text-2xl">
        Insights & Actions
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text">
            Clear takeaways and practical steps to help you improve how you feel, connect, and perform at work.
          </span>
        </span>
      </div>
      <div
        v-for="(actionPlan, idx) in sortedActionPlans"
        :key="actionPlan.id"
        class="flex flex-col items-start mt-4"
      >
        <div
          class="mb-2 px-2 py-1 rounded-full outline outline-dark inline justify-start items-center gap-1 overflow-hidden bg-creme">
          <div class="text-center justify-center text-dark font-normal">
            Priority {{ actionPlan.priority }}
          </div>
        </div>
        <div class="mb-1 text-center text-dark font-semibold">
          {{ actionPlan.title }}
        </div>
        <div class="text-dark font-normal text-sm">
          {{ actionPlan.summary }}
        </div>
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
  display: none;
  position: absolute;
  right: -12px;
  top: calc(140% + 3px);
  background: #60195A !important;
  color: #fff;
  padding: 0.75em 1em;
  border-radius: 8px;
  font-size: 0.9rem;
  white-space: pre-line;
  z-index: 10;
  min-width: 240px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  line-height: 1.5;
}

.tooltip-text::after {
  content: '';
  position: absolute;
  top: -6px;
  right: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #60195A;
}
</style>