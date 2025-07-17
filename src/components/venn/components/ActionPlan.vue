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
  <div class="bg-white rounded-xl px-6 py-8">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark text-xl font-semibold leading-loose">
        Action Plan
      </div>
      <div class="text-center justify-center text-body-dark-1 text-xs font-normal mb-5">
        Insights from your Venn chat, paired with sample data.
      </div>
      <div v-for="(detail, index) in actionPlan?.details" :key="`detail-${index}`" class="text-xs mb-3">
        {{ detail }}
      </div>
    </div>
  </div>
</template>