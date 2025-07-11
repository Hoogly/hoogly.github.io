<script setup lang="ts">
interface Props {
  label: string
  onClick?: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="bg-orange outline outline-orange rounded-full text-white text-center py-4 cursor-pointer"
    @click="props.onClick">
    {{ label }}
  </div>
</template>