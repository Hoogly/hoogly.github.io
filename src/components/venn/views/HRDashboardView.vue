<script setup lang="ts">
import Layout from '@venn/views/BaseLayout.vue'
import EmployeeEngagement from '@venn/components/EmployeeEngagement.vue'
import TopIssues from '@venn/components/TopIssues.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useDocument } from 'vuefire';
import { getEmployeeConcernsDoc, getEmployeeEngagementDoc } from '@venn/firebase';
import LoadingScreen from '@venn/components/LoadingScreen.vue';
import { pseudonym, updateCurrentView, userId } from '@venn/store';
import { useStore } from '@nanostores/vue';
import WhatsGoingWell from '@venn/components/WhatsGoingWell.vue';
import ActionPlan from '@venn/components/ActionPlan.vue';
import Footer from '@venn/components/Footer.vue';
import AnimatedDots from '@venn/components/AnimatedDots.vue';
import IncognitoAvatar from '@venn/components/atoms/IncognitoAvatar.vue';

const $pseudonym = useStore(pseudonym)
const $userId = useStore(userId)

const employeeEngagement = useDocument(computed(() => $userId.value ? getEmployeeEngagementDoc($userId.value) : null), {
  ssrKey: 'employee-engagement',
})

const employeeConcerns = useDocument(computed(() => $userId.value ? getEmployeeConcernsDoc($userId.value) : null), {
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

// Show loading for at least 2 seconds to prevent flash
onMounted(() => {
  setTimeout(() => {
    if (isDataReady.value) {
      loading.value = false
      document.body.style.overflow = 'auto'
    }
  }, 2000)
})


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
  <Layout :sticky-footer="false">
    <div class="team-results-root">
    <!-- Loading screen with same indicator as chat flow -->
    <div v-if="loading" class="fixed inset-0 bg-creme z-50 flex flex-col items-center justify-center">
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
    <div class="flex flex-row justify-between gap-4 flex-shrink-0">
      <div class="flex flex-col">
        <div class="self-stretch justify-center text-dark text-lg font-normal leading-tight" style="font-size: 2rem;">
          <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your </span><span
            class="font-semibold">simulated team</span><span> results:</span>
        </div>
        <div class="text-dark text-sm opacity-70" style="font-size: 1.2rem;">
          This is a simulated view based on your chat and demo data.
        </div>
      </div>
      <button class="rounded-full px-3 py-1 outline m-1" @click="handleOnBackToIndividualViewClick" style="padding: 0.4em 1.1em; font-size: 1rem;">Back to Individual View</button>
    </div>
    <div class="flex flex-col sm:flex-row gap-3 mt-4 pb-8 flex-shrink-0">
      <EmployeeEngagement :engagement="employeeEngagement" class="dashboard-section animate-in" :bars-animate="barsAnimate" />
      <div class="flex flex-col gap-3 dashboard-section dashboard-section-wide">
        <TopIssues :concerns="employeeConcerns?.concerns" class="animate-in" :bars-animate="barsAnimate" />
        <ActionPlan class="dashboard-section animate-in" />
        <div class="cta-section animate-in" style="background: #fff; border-radius: 20px; margin-top: 0; padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; box-shadow: 0 0 0 2px #ececec;">
          <span style="font-size: 1.6rem; font-weight: 500; color: #23221F;">
            Try it for <span class="gradient-text" style="font-weight: 600;">FREE</span> with your team today.
          </span>
          <a href="https://calendly.com/hoogly/30min" target="_blank" rel="noopener noreferrer" style="background: #FF8661; color: #23221F; font-size: 1.3rem; font-weight: 500; border-radius: 999px; padding: 0.6em 1.4em; text-decoration: none; box-shadow: 0 2px 8px rgba(44,41,80,0.08); border: 2px solid #23221F; transition: background 0.2s, color 0.2s; white-space: nowrap;">Start Free</a>
        </div>
      </div>
    </div>
    </div>
  </Layout>
</template>

<style scoped>
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
.dashboard-section, .dashboard-section-wide {
  overflow-x: hidden;
}

/* Loading screen styles */
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
.team-results-root {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>