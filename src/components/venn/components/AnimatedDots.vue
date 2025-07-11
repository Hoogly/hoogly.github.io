<template>
  <div class="flex items-center gap-1 w-fit">
    <div class="bg-gray-500 rounded-full dot" v-for="index in 3" :key="index"
      :style="{ animationDelay: `${index * 0.2}s` }"></div>
  </div>
</template>

<style scoped>
.dot {
  width: 8px;
  height: 8px;
  animation: bounce 1.4s ease-in-out infinite both;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
