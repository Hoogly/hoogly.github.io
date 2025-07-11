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
  <div class="px-3 py-5 h-full flex flex-col container mx-auto max-w-5xl" :class="{ 'h-screen': stickyFooter }">
    <div class="pb-4 pt-6 flex-shrink-0 flex flex-row items-center justify-between sticky bg-creme top-0 z-10">
      <IconLogo />
      <slot name="header-actions"></slot>
    </div>
    <slot />
  </div>
</template>