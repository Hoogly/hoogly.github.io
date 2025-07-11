<script setup lang="ts">
type Props = {
  width?: number
  height?: number
}
withDefaults(defineProps<Props>(), {
  width: 38,
  height: 38
})
</script>
<template>
  <div class="flex-none rounded-full overflow-hidden outline outline-dark m-1"
    :style="{ width: width + 'px', height: height + 'px' }">
    <img src="/images/incognito-avatar.png" alt="user" class="object-contain" />
  </div>
</template>