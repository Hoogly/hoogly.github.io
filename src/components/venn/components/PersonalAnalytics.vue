<script setup lang="ts">
import type { GraphScore } from '@venn/types'
import { computed, ref, onMounted, nextTick } from 'vue'
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
  if (categoryLower.includes('self')) return '#D0CCFF'
  if (categoryLower.includes('company')) return 'orange'
  return 'orange' // default fallback
}

// Animation logic
const fadeIn = ref(false)
const animatedProgress = ref<number[]>([])

onMounted(async () => {
  fadeIn.value = true
  animatedProgress.value = props.scores?.scores?.map(() => 0) || []
  await nextTick()
  setTimeout(() => {
    props.scores?.scores?.forEach((score, i) => {
      setTimeout(() => {
        animatedProgress.value[i] = Math.ceil(score.score * 100)
      }, i * 180) // stagger bars
    })
  }, 350) // delay after fade-in
})
</script>

<template>
  <div class="bg-white rounded-xl px-6 py-8 shadow-sm personal-fade-in" :class="{ visible: fadeIn }">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2 text-2xl">
        Personal Analytics
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text" style="display: none; position: absolute; left: 50%; top: 140%; transform: translateX(-50%); background: #60195A; color: #fff; padding: 0.75em 1em; border-radius: 8px; font-size: 0.9rem; white-space: pre-line; z-index: 10; min-width: 240px; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            A snapshot of how you're feeling, functioning, and connecting at work based on your feedback across the four domains.
            <div style="position: absolute; top: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid #60195A;"></div>
          </span>
        </span>
      </div>
      <div class="text-center justify-center text-dark/70 font-normal mb-2">
        Your Overall Score
      </div>
      <div class="text-center justify-center text-dark text-5xl font-normal mb-3">
        {{ Math.ceil(averageScore * 100) }}%
      </div>
      <div class="flex flex-col gap-1 mt-4" v-for="(score, i) in scores?.scores" :key="score.categoryId">
        <div class="justify-center text-dark font-normal text-sm">
          {{ score.category }}
        </div>
        <ProgressBar :color="getCategoryColor(score.category)" :progress="animatedProgress[i]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-fade-in {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s cubic-bezier(0.77,0,0.18,1), transform 0.8s cubic-bezier(0.77,0,0.18,1);
}
.personal-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
.info-icon:focus .tooltip-text,
.info-icon:hover .tooltip-text {
  display: block !important;
}
.tooltip-text {
  background: #60195A !important;
  line-height: 1.5;
}
</style>