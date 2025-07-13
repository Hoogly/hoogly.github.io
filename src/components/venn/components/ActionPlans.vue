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
  <div class="bg-white rounded-xl px-6 py-8">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark text-lg font-medium">
        Insights & Actions
      </div>
      <div class="text-center justify-center text-dark/70 text-sm font-normal">
        Understand yourself. Take action with purpose.
      </div>
      <hr class="border-dark/10 mx-15 my-5" />
      <div v-for="actionPlan in sortedActionPlans" :key="actionPlan.id" class="flex flex-col items-start mb-6">
        <div
          class="mb-4 px-2 py-1 bg-white rounded-full outline outline-dark inline justify-start items-center gap-1 overflow-hidden">
          <div class="text-center justify-center text-dark text-sm font-semibold">
            Priority {{ actionPlan.priority }}</div>
        </div>
        <div class="mb-1 text-center text-dark text-sm/6 font-normal">
          {{ actionPlan.title }}
        </div>
        <div class="text-dark text-sm font-normal">
          {{ actionPlan.summary }}
        </div>
      </div>
    </div>
  </div>
</template>