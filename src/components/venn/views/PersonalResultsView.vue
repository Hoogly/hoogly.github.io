<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { getSurveyActionPlansQuery, getSurveyScoreDoc } from '@venn/firebase';
import { useCollection, useDocument } from 'vuefire';
import PersonalAnalytics from '@venn/components/PersonalAnalytics.vue';
import ActionPlans from '@venn/components/ActionPlans.vue';
import Layout from '@venn/views/BaseLayout.vue'
import LoadingScreen from '@venn/components/LoadingScreen.vue'
import { pseudonym, updateCurrentView, userId } from '@venn/store';
import { useStore } from '@nanostores/vue';

const loading = ref(true)

const $pseudonym = useStore(pseudonym)
const $userId = useStore(userId)

const scores = useDocument(
  computed(() => getSurveyScoreDoc($userId.value)), {
  ssrKey: 'survey-scores',
}
)

const actionPlans = useCollection(
  computed(() => getSurveyActionPlansQuery($userId.value)), {
  ssrKey: 'survey-action-plans',
}
)

// Check if both data sources are loaded and not empty
const isDataReady = computed(() => {
  return scores.value && actionPlans.value && actionPlans.value.length > 0
})

// Watch for data readiness and hide loading screen
watch(isDataReady, (ready) => {
  if (ready) {
    loading.value = false
    document.body.style.overflow = 'auto'
  }
}, { immediate: true })

const handleOnSeeHRViewClick = () => {
  updateCurrentView('hr-dashboard')
}

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
    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col">
        <div class="self-stretch justify-center text-dark text-2xl font-normal leading-tight">
          <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your individual results:</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row gap-3 mt-2 pb-2">
      <div class="flex-1 personal-analytics-section"><PersonalAnalytics v-if="scores" :scores="scores" /></div>
      <div class="flex-1 action-plans-section"><ActionPlans v-if="actionPlans.length > 0" :actionPlans="actionPlans" /></div>
    </div>
    <div class="cta-section animate-in" style="background: #fff; border-radius: 20px; margin-top: 0.5rem; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; box-shadow: 0 0 0 2px #ececec;">
      <span class="text-2xl">
        Flip the lens: View the <span class="gradient-text" style="font-weight: 600;">HR perspective</span>
      </span>
      <button class="rounded-full" @click="handleOnSeeHRViewClick" style="background: #FF8661; color: #23221F; font-size: 1.3rem; font-weight: 500; border-radius: 999px; padding: 0.6em 1.4em; text-decoration: none; box-shadow: 0 2px 8px rgba(44,41,80,0.08); border: 2px solid #23221F; transition: background 0.2s, color 0.2s; white-space: nowrap;">View as HR</button>
    </div>
  </Layout>
</template>

<style scoped>
.pulse-cta {
  animation: pulse-cta 1.5s infinite;
}
@keyframes pulse-cta {
  0% { box-shadow: 0 0 0 0 rgba(255,134,97,0.7); }
  70% { box-shadow: 0 0 0 12px rgba(255,134,97,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,134,97,0); }
}
.personal-analytics-section,
.action-plans-section {
  box-shadow: 0 0 0 2px #ececec;
  border-radius: 20px;
  min-height: 480px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
</style>