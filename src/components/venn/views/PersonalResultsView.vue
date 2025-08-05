<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { getSurveyActionPlansQuery, getSurveyScoreDoc } from '@venn/firebase';
import { useCollection, useDocument } from 'vuefire';
import PersonalAnalytics from '@venn/components/PersonalAnalytics.vue';
import ActionPlans from '@venn/components/ActionPlans.vue';
import Layout from '@venn/views/BaseLayout.vue'
import LoadingScreen from '@venn/components/LoadingScreen.vue'
import { pseudonym, updateCurrentView, userId } from '@venn/store';
import { useStore } from '@nanostores/vue';
import { trackSeeHRViewClick } from '@venn/utils/analytics';

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
    nextTick(() => {
      document.querySelectorAll('.animate-in').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
      });
    })
  }
}, { immediate: true })

const handleOnSeeHRViewClick = () => {
  // Track the HR view click event
  trackSeeHRViewClick($pseudonym.value)
  
  updateCurrentView('hr-dashboard')
}
</script>

<template>
  <Layout>
     <LoadingScreen v-if="!isDataReady" /> 
    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col">
        <div class="self-stretch justify-center text-dark text-2xl font-normal leading-tight">
          <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your individual results:</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row gap-3 mt-2 items-stretch">
      <div class="flex-1 flex flex-col h-full animate-in">
        <PersonalAnalytics v-if="scores" :scores="scores" class="h-full" />
      </div>
      <div class="flex-3 flex flex-col h-full animate-in">
        <ActionPlans v-if="actionPlans.length > 0" :actionPlans="actionPlans.slice(0, 2)" class="h-full" />
      </div>
    </div>
    <div class="cta-section animate-in rounded-xl shadow-sm bg-white px-6 py-8 mt-3 flex flex-row justify-between items-center mb-8">
      <span class="text-2xl">
        Flip the lens: View the <span class="gradient-text" style="font-weight: 600;">HR perspective</span>
      </span>
      <button class="rounded-full" @click="handleOnSeeHRViewClick" style="background: #FF8661; color: #23221F; font-size: 1.3rem; font-weight: 500; border-radius: 999px; padding: 0.6em 1.4em; text-decoration: none; box-shadow: 0 2px 8px rgba(44,41,80,0.08); border: 2px solid #23221F; transition: background 0.2s, color 0.2s; white-space: nowrap;">View as HR</button>
    </div>
  </Layout>
</template>

<style scoped>
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

</style>