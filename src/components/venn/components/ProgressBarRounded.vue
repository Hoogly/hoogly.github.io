<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  progress?: number
  color: string
  height?: string
  showPercentage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  color: 'bg-black/10',
  height: '16px',
  showPercentage: true
})

const animatedProgress = ref(0)
const isVisible = ref(false)

onMounted(() => {
  // Trigger animation after a small delay
  setTimeout(() => {
    isVisible.value = true
    animatedProgress.value = props.progress
  }, 700)
})

watch(() => props.progress, (newVal) => {
  setTimeout(() => {
    animatedProgress.value = newVal
  }, 400)
})
</script>

<template>
  <div class="bg-black/10 rounded-3xl inline-flex justify-start items-center overflow-hidden">
    <div class="rounded-xl transition-all duration-700 ease-out" :class="`bg-${color}`" :style="{
      width: isVisible ? `${animatedProgress}%` : '0%',
      opacity: isVisible ? 1 : 0,
      height: height
    }">
      <div v-if="showPercentage && progress > 0"
        class="flex items-center justify-end text-white text-xs font-normal px-2" :style="{
          height: height
        }">
        {{ progress.toFixed(0) }}%
      </div>
    </div>
  </div>
</template>