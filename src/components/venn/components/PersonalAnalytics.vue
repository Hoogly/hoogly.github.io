<script setup lang="ts">
import type { GraphScore } from '@venn/types'
import { computed } from 'vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps<{
  scores: GraphScore
}>()

const averageScore = computed(() => {
  if (!props.scores?.scores) return 0
  return props.scores.scores.reduce((acc, score) => acc + score.score, 0) / props.scores.scores.length
})

const getCategoryColor = (category: string) => {
  const categoryLower = category.toLowerCase()
  if (categoryLower.includes('manager')) return 'blue'
  if (categoryLower.includes('peers')) return 'yellow'
  if (categoryLower.includes('self')) return 'purple'
  if (categoryLower.includes('company')) return 'orange'
  return 'orange' // default fallback
}
</script>

<template>
  <div class="bg-white rounded-xl px-6 py-8">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark text-base font-medium">
        Personal Analytics
      </div>
      <div class="text-center justify-center text-dark/70 text-xs font-normal">
        Data-driven insights for personal growth
      </div>
      <hr class="border-dark/10 mx-15 my-5" />
      <div class="text-center justify-center text-dark/70 text-xs font-normal">
        Your Overall Score
      </div>
      <div class="text-center justify-center text-dark text-5xl/18 font-normal">
        {{ Math.ceil(averageScore * 100) }}%
      </div>
      <div class="text-center justify-center text-dark text-xs font-normal">
        Your motivation and growth mindset are slightly low, likely impacted by peer and manager relationships.
      </div>
      <div class="flex flex-col gap-1 mt-6" v-for="score in scores?.scores" :key="score.categoryId">
        <div class="justify-center text-dark text-xs font-normal">
          {{ score.category }}
        </div>
        <ProgressBar :color="getCategoryColor(score.category)" :progress="score.score * 100" />
      </div>
    </div>
  </div>
</template>