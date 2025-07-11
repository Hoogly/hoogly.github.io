<!-- make sure that icons are converted to 24x24 when using this wrapper-->
<script setup lang="ts">
interface Props {
  color?: string
  width?: string
  height?: string
  name?: string
}

withDefaults(defineProps<Props>(), {
  color: 'none',
  width: '24',
  height: '24',
})
</script>
<template>
  <div class="flex flex-shrink-0 items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" :aria-labelledby="name"
      role="presentation">
      <title :id="name" lang="en">{{ name }} icon</title>
      <g :fill="color">
        <slot />
      </g>
    </svg>
  </div>
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
}
</style>
