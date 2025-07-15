<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { currentView } from './store'
import ChatApp from './ChatApp.vue'
import PersonalResultsView from './views/PersonalResultsView.vue'
import HRDashboardView from './views/HRDashboardView.vue'
import IconLogo from './components/icons/IconLogo.vue'

const $currentView = useStore(currentView)
</script>

<template>
    <div class="h-screen flex flex-col">
        <div class="flex-shrink-0 pl-8 pt-10 pb-2">
            <IconLogo />
        </div>
        <div class="flex-1 overflow-y-auto">
            <ChatApp v-if="$currentView === 'chat'" variant="full" />
            <PersonalResultsView v-else-if="$currentView === 'personal-results'" />
            <HRDashboardView v-else-if="$currentView === 'hr-dashboard'" />
        </div>
    </div>
</template>