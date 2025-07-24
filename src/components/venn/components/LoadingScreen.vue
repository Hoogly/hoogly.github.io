<script setup lang="ts">
import IncognitoAvatar from './atoms/IncognitoAvatar.vue';
import { pseudonym } from '@venn/store';
import { useStore } from '@nanostores/vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const $pseudonym = useStore(pseudonym)

const messages = [
  'Scanning your inputs',
  'Mapping your data',
  'Filtering noise. Isolating insights.',
  'Adding simulated data',
  'Refining interpretations',
  'Checking for contradictions',
  'Composing the final outcome',
  'Polishing the final results'
];
const currentMessageIndex = ref(0);
const showMessage = ref(true);
let intervalId: number | undefined;
let fadeTimeout: number | undefined;

function nextMessage() {
  showMessage.value = false;
  fadeTimeout = window.setTimeout(() => {
    if (currentMessageIndex.value < messages.length - 1) {
      currentMessageIndex.value++;
      showMessage.value = true;
    } else {
      // Stay on the last message
      showMessage.value = true;
      if (intervalId) clearInterval(intervalId);
    }
  }, 1000); // match fade duration (1s)
}

onMounted(() => {
  intervalId = window.setInterval(() => {
    if (currentMessageIndex.value < messages.length - 1) {
      nextMessage();
    } else {
      // Stop cycling when last message is reached
      if (intervalId) clearInterval(intervalId);
    }
  }, 7000); // 7 seconds
});
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
  if (fadeTimeout) clearTimeout(fadeTimeout);
});
</script>

<template>
  <div class="fixed inset-0 bg-creme z-50 flex flex-col items-center justify-center">
    <div class="widget flex flex-col items-center justify-end relative px-3 pb-3 gap-2 mb-12">
      <img src="/images/folder.svg" alt="loading" class="absolute inset-0 w-full h-full object-cover" />
      <div class="flex flex-row relative z-10 gap-2 items-center">
        <IncognitoAvatar />
        <div class="flex flex-col">
          <div class="justify-start text-xs font-medium">{{ $pseudonym }}</div>
          <div class="justify-start text-xs text-body-light-2 font-normal edited-timestamp">Edited 1m ago</div>
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
    <transition name="fade">
      <div v-if="showMessage" key="message-{{currentMessageIndex}}" class="text-center justify-center text-xl sm:text-5xl font-medium leading-snug gradient-text-animated staged-loading-message">
        {{ messages[currentMessageIndex] }}
    </div>
    </transition>
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
  animation: skeleton-loading 4s ease-in-out infinite;
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
  animation: gradient-shift 8s ease-in-out infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: -100% 50%;
  }
}

.edited-timestamp {
  color: #CCCAC6 !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.staged-loading-message {
  min-height: 2.5em;
}
</style>