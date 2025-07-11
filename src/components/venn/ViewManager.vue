<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { currentView } from './store'
import ChatApp from './ChatApp.vue'
import PersonalResultsView from './views/PersonalResultsView.vue'
import HRDashboardView from './views/HRDashboardView.vue'

const $currentView = useStore(currentView)
</script>

<template>
    <div class="view-manager">
        <ChatApp v-if="$currentView === 'chat'" variant="full" />
        <PersonalResultsView v-else-if="$currentView === 'personal-results'" />
        <HRDashboardView v-else-if="$currentView === 'hr-dashboard'" />
    </div>
</template>

<style scoped>
.view-manager {
    width: 100%;
    height: 100%;
}
</style>