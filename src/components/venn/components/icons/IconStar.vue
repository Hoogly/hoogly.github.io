<script setup lang="ts">
interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'black'
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15.89 5.21L17.2999 8.02999C17.4899 8.41999 17.9999 8.78999 18.4299 8.86999L20.98 9.28999C22.61 9.55999 22.99 10.74 21.82 11.92L19.8299 13.91C19.4999 14.24 19.31 14.89 19.42 15.36L19.9899 17.82C20.4399 19.76 19.4 20.52 17.69 19.5L15.2999 18.08C14.8699 17.82 14.15 17.82 13.72 18.08L11.3299 19.5C9.61994 20.51 8.57995 19.76 9.02995 17.82L9.59996 15.36C9.70996 14.9 9.51995 14.25 9.18995 13.91L7.19996 11.92C6.02996 10.75 6.40996 9.56999 8.03996 9.28999L10.5899 8.86999C11.0199 8.79999 11.53 8.41999 11.72 8.02999L13.13 5.21C13.88 3.68 15.12 3.68 15.89 5.21Z"
      :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.5 5H2.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.5 19H2.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3.5 12H2.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>