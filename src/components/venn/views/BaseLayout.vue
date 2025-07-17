<script setup lang="ts">
import IconLogo from '@venn/components/icons/IconLogo.vue';

const props = defineProps({
  stickyFooter: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="px-3 py-5 h-full flex flex-col container mx-auto max-w-6xl" :class="{ 'h-screen': stickyFooter }">
    <slot />
  </div>
</template>