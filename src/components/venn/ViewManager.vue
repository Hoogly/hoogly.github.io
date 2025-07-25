<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { ref, watch } from 'vue'
import { currentView } from './store'
import ChatApp from './ChatApp.vue'
import PersonalResultsView from './views/PersonalResultsView.vue'
import HRDashboardView from './views/HRDashboardView.vue'
import IconLogo from './components/icons/IconLogo.vue'

const $currentView = useStore(currentView)
const chatAppRef = ref<InstanceType<typeof ChatApp> | null>(null)

// Watch for changes in currentView and scroll to top (excluding chat view)
watch($currentView, (newView, oldView) => {
  // Only scroll if we're not in chat view
  if (newView !== 'chat') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

function handleEndChat() {
  if (chatAppRef.value && typeof chatAppRef.value.endChat === 'function') {
    chatAppRef.value.endChat()
  }
}
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] min-h-dvh" :class="$currentView === 'chat' ? 'max-h-dvh' : 'sm:max-h-dvh'">
    <div class="flex-shrink-0 sm:pl-8 pt-8 pb-8 flex flex-row items-center gap-4 header-bar relative">
      <a href="/" class="logo-left-align">
        <IconLogo />
      </a>
      <div v-if="$currentView === 'chat'" class="absolute inset-0 flex flex-row items-center justify-center pointer-events-none">
        <div class="flex flex-row justify-end max-w-2xl mx-auto w-full">
          <button class="end-chat-btn pointer-events-auto" @click="handleEndChat"
            style="background: #F7F3F0; color: #23221F; border: 2px solid #23221F; border-radius: 999px; padding: 0.5em 1.5em; font-weight: 400; font-size: 1rem; box-shadow: 0 2px 8px rgba(44,41,80,0.08); cursor: pointer; transition: background 0.2s;">
            End Chat
          </button>
        </div>
      </div>
    </div>
    <div class="h-full pb-4" :class="$currentView === 'chat' ? 'overflow-hidden' : 'sm:overflow-hidden'">
      <ChatApp ref="chatAppRef" v-if="$currentView === 'chat'" variant="full" />
      <PersonalResultsView v-else-if="$currentView === 'personal-results'" />
      <HRDashboardView v-else-if="$currentView === 'hr-dashboard'" />
    </div>
  </div>
</template>
<style scoped>
@media (min-width: 768px) {
  .header-bar {
    padding-right: 2.5rem;
  }
}
</style>