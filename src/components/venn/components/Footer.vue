<script setup lang="ts">
import { navigate } from 'astro:transitions/client';

const handleOnGetStartedForFreeClick = () => {
  navigate('/get-started')
}
</script>
<template>
  <div class="bg-white rounded-xl px-6 py-8 flex flex-row">
    <div class="text-3xl">
      Try it for <span class="gradient-text">FREE</span> with your team today.
    </div>
    <button class="rounded-full bg-orange px-4 outline py-1" @click="handleOnGetStartedForFreeClick">Get Started for Free</button>
  </div>
</template>