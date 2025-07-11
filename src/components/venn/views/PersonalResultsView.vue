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
    <template #header-actions>
      <button class="rounded-full bg-orange px-4 outline py-1" @click="handleOnSeeHRViewClick">See HR view</button>
    </template>
    <div class="self-stretch justify-center text-dark text-base font-normal leading-tight">
      <span>Hey </span><span class="gradient-text">{{ $pseudonym }}</span><span>, here are your </span><span
        class="font-semibold">simulated individual</span><span> results:</span>
    </div>
    <div class="text-dark text-xs opacity-70">
      This is a simulated view based on your chat and demo data. Real insights come from your full team's contributions.
    </div>
    <div class="flex flex-col sm:flex-row gap-3 mt-4 pb-5">
      <PersonalAnalytics v-if="scores" :scores="scores" />
      <ActionPlans v-if="actionPlans.length > 0" :actionPlans="actionPlans" />
    </div>
  </Layout>
</template>