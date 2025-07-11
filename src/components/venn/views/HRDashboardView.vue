<script setup lang="ts">
import Layout from '@venn/views/BaseLayout.vue'
import EmployeeEngagement from '@venn/components/EmployeeEngagement.vue'
import TopIssues from '@venn/components/TopIssues.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useDocument } from 'vuefire';
import { getEmployeeConcernsDoc, getEmployeeEngagementDoc } from '@venn/firebase';
import LoadingScreen from '@venn/components/LoadingScreen.vue';
import { pseudonym } from '@venn/store';
import { useStore } from '@nanostores/vue';

const $pseudonym = useStore(pseudonym)

const employeeEngagement = useDocument(computed(() => getEmployeeEngagementDoc()), {
  ssrKey: 'employee-engagement',
})

const employeeConcerns = useDocument(computed(() => getEmployeeConcernsDoc()), {
  ssrKey: 'employee-concerns',
})

const loading = ref(true)

// Check if both data sources are loaded and not empty
const isDataReady = computed(() => {
  return employeeEngagement.value && employeeConcerns.value
})

// Watch for data readiness and hide loading screen
watch(isDataReady, (ready) => {
  if (ready) {
    loading.value = false
    document.body.style.overflow = 'auto'
  }
}, { immediate: true })


// Prevent scrolling when modal is active
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <Layout>
    <LoadingScreen v-if="loading" />
    <template #header-actions>
      <button class="rounded-full bg-orange px-4 outline py-1">Start for Free</button>
    </template>
    <div class="justify-center text-dark text-base font-normal leading-tight">
      <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your </span><span
        class="font-semibold">simulated team</span><span> results:</span>
    </div>
    <div class="text-dark text-xs opacity-70">
      This is a simulated view based on your chat and demo data. Real insights come from your full team's contributions.
    </div>
    <div class="flex flex-col gap-3">
      <EmployeeEngagement v-if="employeeEngagement" :engagement="employeeEngagement" />
      <TopIssues v-if="employeeConcerns" :concerns="employeeConcerns.concerns" />
    </div>
  </Layout>
</template>