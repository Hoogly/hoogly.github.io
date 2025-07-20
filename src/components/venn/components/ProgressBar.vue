<script setup lang="ts">
const props = defineProps<{
  progress: number | undefined
  color: string
}>()
</script>

<template>
  <div class="h-5 bg-black/10 rounded-3xl inline-flex justify-start items-center overflow-hidden">
    <div class="h-5 rounded-tl-xl rounded-bl-xl transition-all duration-300"
      :class="color.startsWith('#') ? '' : `bg-${color}`"
      :style="color.startsWith('#') ? { width: `${progress}%`, background: color } : { width: `${progress}%` }">
      <div v-if="progress" class="h-5 flex items-center justify-end text-black/70 text-xs font-normal px-1">
        {{ progress }}%
      </div>
    </div>
  </div>
</template>