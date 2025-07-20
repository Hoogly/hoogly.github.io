<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { ref } from 'vue'
import { currentView } from './store'
import ChatApp from './ChatApp.vue'
import PersonalResultsView from './views/PersonalResultsView.vue'
import HRDashboardView from './views/HRDashboardView.vue'
import IconLogo from './components/icons/IconLogo.vue'

const $currentView = useStore(currentView)
const chatAppRef = ref(null)

function handleEndChat() {
  if (chatAppRef.value && typeof chatAppRef.value.endChat === 'function') {
    chatAppRef.value.endChat()
  }
}
</script>

<template>
    <div class="h-screen flex flex-col">
        <div class="flex-shrink-0 pl-8 pt-10 pb-2 flex flex-row items-center gap-4 header-bar">
            <a href="/" class="logo-left-align">
                <IconLogo />
            </a>
            <div class="flex-1"></div>
            <button
                v-if="$currentView === 'chat'"
                class="end-chat-btn"
                @click="handleEndChat"
                style="background: #F7F3F0; color: #23221F; border: 2px solid #23221F; border-radius: 999px; padding: 0.5em 1.5em; font-weight: 400; font-size: 1rem; box-shadow: 0 2px 8px rgba(44,41,80,0.08); cursor: pointer; transition: background 0.2s;"
            >
                End Chat
            </button>
        </div>
        <div class="flex-1 overflow-y-auto pb-10">
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
  .end-chat-btn {
    position: relative;
    right: 525px;
  }
  .logo-left-align {
    margin-left: 0 !important;
    padding-left: 0 !important;
    display: flex;
    align-items: center;
    padding-bottom: 1.5rem;
  }
}
</style>