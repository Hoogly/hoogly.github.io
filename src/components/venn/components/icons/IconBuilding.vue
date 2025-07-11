<script setup lang="ts">
interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'black'
})
</script>

<template>
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.65869 22.5H23.6587" :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M20.4387 22.5101V18.05" :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
      stroke-linejoin="round" />
    <path
      d="M20.4588 11.39C19.2388 11.39 18.2588 12.37 18.2588 13.59V15.86C18.2588 17.08 19.2388 18.06 20.4588 18.06C21.6788 18.06 22.6588 17.08 22.6588 15.86V13.59C22.6588 12.37 21.6788 11.39 20.4588 11.39Z"
      :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M2.75879 22.5V6.53003C2.75879 4.52003 3.75884 3.51001 5.74884 3.51001H11.9788C13.9688 3.51001 14.9588 4.52003 14.9588 6.53003V22.5"
      :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.45874 8.75H11.4088" :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M6.45874 12.5H11.4088" :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M8.90869 22.5V18.75" :stroke="color" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>