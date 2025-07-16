<script setup lang="ts">
import IncognitoAvatar from './atoms/IncognitoAvatar.vue';
import { pseudonym } from '@venn/store';
import { useStore } from '@nanostores/vue';
const $pseudonym = useStore(pseudonym)

</script>

<template>
  <div class="fixed inset-0 bg-creme z-50 flex flex-col items-center justify-center">
    <div class="widget flex flex-col items-center justify-end relative px-3 pb-3 gap-2 mb-12">
      <img src="/images/folder.svg" alt="loading" class="absolute inset-0 w-full h-full object-cover" />
      <div class="flex flex-row relative z-10 gap-2 items-center">
        <IncognitoAvatar />
        <div class="flex flex-col">
          <div class="justify-start text-xs font-medium">{{ $pseudonym }}</div>
          <div class="justify-start text-xs text-body-light-2 font-normal">Edited 1m ago</div>
        </div>
      </div>
      <div class="w-full flex flex-col z-10 rounded-md shadow-sm gap-2 p-3">
        <div class="skeleton-bar skeleton-bar-1"></div>
        <div class="skeleton-bar skeleton-bar-2"></div>
        <div class="skeleton-bar skeleton-bar-3"></div>
      </div>
    </div>
    <div class="text-center justify-center text-dark text-lg sm:text-4xl">
      One moment please...
    </div>
    <div class="text-center justify-center text-xl sm:text-5xl font-medium leading-snug gradient-text-animated">
      Processing your results
    </div>
  </div>
</template>

<style scoped>
.widget {
  width: 197px;
  height: 173px;
}

.skeleton-bar {
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 0.5rem;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.skeleton-bar-1 {
  animation-delay: 0s;
}

.skeleton-bar-2 {
  animation-delay: 0.2s;
}

.skeleton-bar-3 {
  animation-delay: 0.4s;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.gradient-text-animated {
  background: linear-gradient(90deg, #ca6e7f 0%, #ae6790 40%, #4a54eb 75%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: -100% 50%;
  }
}
</style>