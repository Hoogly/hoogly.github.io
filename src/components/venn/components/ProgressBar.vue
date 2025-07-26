<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  progress: number | undefined
  color: string
}>()

const animatedProgress = ref(0)
const isVisible = ref(false)

onMounted(() => {
  // Trigger animation after a small delay
  setTimeout(() => {
    isVisible.value = true
    animatedProgress.value = props.progress || 0
  }, 700)
})

watch(() => props.progress, (newVal) => {
  setTimeout(() => {
    animatedProgress.value = newVal || 0
  }, 400)
})
</script>

<template>
  <div class="h-5 bg-black/10 rounded-3xl inline-flex justify-start items-center overflow-hidden">
    <div class="h-5 rounded-tl-xl rounded-bl-xl transition-all duration-700 ease-out"
      :class="color.startsWith('#') ? '' : `bg-${color}`"
      :style="color.startsWith('#') ? { 
        width: isVisible ? `${animatedProgress}%` : '0%', 
        background: color,
        opacity: isVisible ? 1 : 0
      } : { 
        width: isVisible ? `${animatedProgress}%` : '0%',
        opacity: isVisible ? 1 : 0
      }">
      <div v-if="progress" class="h-5 flex items-center justify-end text-black/70 text-xs font-normal px-1">
        {{ progress }}%
      </div>
    </div>
  </div>
</template>