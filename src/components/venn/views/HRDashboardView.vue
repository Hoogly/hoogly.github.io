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

const barsAnimate = ref(false);
onMounted(() => {
  document.querySelectorAll('.animate-in').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
  setTimeout(() => {
    barsAnimate.value = true;
  }, 900); // delay to allow card animation first
});

const handleOnBackToIndividualViewClick = () => {
  updateCurrentView('personal-results')
}
</script>

<template>
  <Layout>
    <LoadingScreen v-if="loading" />
    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col">
        <div class="self-stretch justify-center text-dark text-lg font-normal leading-tight" style="font-size: 2rem;">
          <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your </span><span
            class="font-semibold">simulated team</span><span> results:</span>
        </div>
        <div class="text-dark text-sm opacity-70" style="font-size: 1.2rem;">
          This is a simulated view based on your chat and demo data.
        </div>
      </div>
      <button class="rounded-full px-3 py-1 outline" @click="handleOnBackToIndividualViewClick" style="padding: 0.4em 1.1em; font-size: 1rem;">Back to Individual View</button>
    </div>
    <div class="flex flex-col sm:flex-row gap-3 mt-4 pb-5">
      <EmployeeEngagement v-if="employeeEngagement" :engagement="employeeEngagement" class="dashboard-section animate-in" :bars-animate="barsAnimate" />
      <div class="flex flex-col gap-3 dashboard-section dashboard-section-wide">
        <TopIssues v-if="employeeConcerns" :concerns="employeeConcerns.concerns" class="animate-in" :bars-animate="barsAnimate" />
        <ActionPlan class="dashboard-section animate-in" />
        <div class="cta-section animate-in" style="background: #fff; border-radius: 20px; margin-top: 0; padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; box-shadow: 0 0 0 2px #ececec;">
          <span style="font-size: 1.6rem; font-weight: 500; color: #23221F;">
            Try it for <span class="gradient-text" style="font-weight: 600;">FREE</span> with your team today.
          </span>
          <a href="https://calendly.com/hoogly/30min" target="_blank" rel="noopener noreferrer" style="background: #FF8661; color: #23221F; font-size: 1.3rem; font-weight: 500; border-radius: 999px; padding: 0.6em 1.4em; text-decoration: none; box-shadow: 0 2px 8px rgba(44,41,80,0.08); border: 2px solid #23221F; transition: background 0.2s, color 0.2s; white-space: nowrap;">Start Free</a>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
body, .dashboard-no-scroll, .container, .dashboard-section, .dashboard-section-wide {
  overflow: hidden !important;
}
.dashboard-section {
  flex: 1 1 0%;
  min-width: 0;
}
.dashboard-section-wide {
  flex: 2 1 0%;
}
.animate-in {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.2s cubic-bezier(0.77,0,0.175,1), transform 1.2s cubic-bezier(0.77,0,0.175,1);
  position: relative;
  will-change: opacity, transform;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Prevent horizontal scroll during animation */
body, .container, .dashboard-section, .dashboard-section-wide {
  overflow-x: hidden;
}
</style>