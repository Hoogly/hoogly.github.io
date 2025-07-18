<script setup lang="ts">
import type { EmployeeEngagement } from '@venn/types';
import { getParticipationRate } from '@venn/types/EmployeeEngagement';
import { computed } from 'vue';
import GaugeMeter from './GaugeMeter.vue'
import ProgressBarRounded from './ProgressBarRounded.vue'
import { IconPersonChecked, IconUsers } from './icons'

const props = defineProps<{
  engagement: EmployeeEngagement
}>()

const insightsByDomain = computed(() => {
  return props.engagement.insights.reduce((acc, insight) => {
    acc[insight.domain.toLowerCase()] = insight.engagementScore * 100
    return acc
  }, {} as Record<string, number>)
})
</script>

<template>
  <div class="bg-white rounded-xl px-6 py-8">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark text-lg font-normal leading-loose">
        Employee Engagement
      </div>
      <div class="text-center justify-center text-body-dark-1 text-sm font-normal">
        Snapshot of company-wide engagement and key areas for improvement.
      </div>
      <div class="flex justify-center my-4">
        <GaugeMeter :percentage="engagement.averageEngagementScore" />
      </div>
      <div class="text-center justify-center text-dark text-6xl font-normal mb-6">{{
        engagement.averageEngagementScore.toFixed(0) }}</div>

      <div class="bg-white rounded-lg outline outline-body-light-2 p-6">
        <div class="flex flex-row justify-evenly">
          <div class="flex flex-col">
            <div class="text-center justify-center text-sm font-normal">
              Participation Rate
            </div>
            <div class="flex flex-row items-center gap-1">
              <IconPersonChecked />
              <div class="text-center justify-center text-dark text-4xl font-normal">
                {{ getParticipationRate(engagement).toFixed(0) }}%
              </div>
            </div>
          </div>
          <div class="w-px bg-body-light-2 mx-4"></div>
          <div class="flex flex-col">
            <div class="text-center justify-center text-sm font-normal">
              Total Participants
            </div>
            <div class="flex flex-row items-center gap-1">
              <IconUsers />
              <div class="text-center justify-center text-dark text-4xl font-normal">
                {{ engagement.totalEmployees }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-dark/10 mx-7 my-7" />
      <div class="text-center justify-center text-dark text-lg font-normal leading-loose">
        Breakdown by Domain
      </div>
      <div class="text-center justify-center text-body-dark-1 text-sm font-normal">
        Engagement reflects four relationships for each employee: company, manager, peers, and self.
      </div>
      <div class="flex flex-col gap-2">
        <div class="justify-center text-base font-normal">
          Company
        </div>
        <ProgressBarRounded :progress="insightsByDomain.company" color="green" />
        <div class="justify-center text-base font-normal">
          Manager
        </div>
        <ProgressBarRounded :progress="insightsByDomain.manager" color="amber" />
        <div class="justify-center text-base font-normal">
          Peers
        </div>
        <ProgressBarRounded :progress="insightsByDomain.peers" color="red" />
        <div class="justify-center text-base font-normal">
          Self
        </div>
        <ProgressBarRounded :progress="insightsByDomain.self" color="amber-2" />
      </div>
    </div>
  </div>
</template>