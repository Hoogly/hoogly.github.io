<script setup lang="ts">
import Layout from '@venn/views/BaseLayout.vue'
import EmployeeEngagement from '@venn/components/EmployeeEngagement.vue'
import TopIssues from '@venn/components/TopIssues.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useDocument } from 'vuefire';
import { getEmployeeConcernsDoc, getEmployeeEngagementDoc } from '@venn/firebase';
import LoadingScreen from '@venn/components/LoadingScreen.vue';
import { pseudonym, updateCurrentView } from '@venn/store';
import { useStore } from '@nanostores/vue';
import WhatsGoingWell from '@venn/components/WhatsGoingWell.vue';
import ActionPlan from '@venn/components/ActionPlan.vue';
import Footer from '@venn/components/Footer.vue';

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

const handleOnBackToIndividualViewClick = () => {
  updateCurrentView('personal-results')
}
</script>

<template>
  <Layout>
    <LoadingScreen v-if="loading" />
    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col">
        <div class="justify-center text-dark text-lg font-normal leading-tight">
          <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your </span><span
            class="font-semibold">simulated team</span><span> results:</span>
        </div>
        <div class="text-dark text-sm opacity-70">
          This is a simulated view based on your chat and demo data. Real insights come from your full team's
          contributions.
        </div>
      </div>
      <button class="rounded-full px-4 outline py-1" @click="handleOnBackToIndividualViewClick">Back to Individual
        View</button>
    </div>
    <div class="flex flex-col sm:flex-row gap-3 mt-4 pb-5">
      <EmployeeEngagement v-if="employeeEngagement" :engagement="employeeEngagement" />
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 sm:flex-row">
          <TopIssues v-if="employeeConcerns" :concerns="employeeConcerns.concerns" />
          <div class="flex flex-col gap-3">
            <WhatsGoingWell />
            <ActionPlan />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </Layout>
</template>