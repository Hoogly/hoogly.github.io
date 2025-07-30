<script setup lang="ts">
import type { EmployeeEngagement } from '@venn/types';
import { getParticipationRate } from '@venn/types/EmployeeEngagement';
import { computed } from 'vue';
import GaugeMeter from './GaugeMeter.vue'
import ProgressBarRounded from './ProgressBarRounded.vue'
import { IconPersonChecked, IconUsers } from './icons'

const props = defineProps<{
  engagement?: EmployeeEngagement,
}>()

const insightsByDomain = computed(() => {
  if (!props.engagement) return {}
  return props.engagement.insights.reduce((acc, insight) => {
    acc[insight.domain.toLowerCase()] = insight.engagementScore * 100
    return acc
  }, {} as Record<string, number>)
})

const getColorFromValue = (value: number) => {
  if (value <= 20) return 'chart-red'
  if (value <= 40) return 'chart-orange'
  if (value <= 60) return 'chart-yellow'
  if (value <= 80) return 'chart-green'
  return 'chart-dark-green'
}
</script>

<template>
  <div class="bg-white rounded-xl px-4 py-4 sm:min-h-auto shadow-sm">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2 text-2xl">
        Employee Engagement
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text">
            Snapshot of company-wide engagement and key areas for improvement.
          </span>
        </span>
      </div>
      <div class="flex justify-center my-2">
        <GaugeMeter :percentage="(engagement?.averageEngagementScore || 0) * 100" />
      </div>
      <div class="text-center justify-center text-dark font-normal mb-2 text-5xl">
        {{ ((engagement?.averageEngagementScore || 0) * 100).toFixed(0) }}
      </div>

      <div class="flex flex-row justify-evenly">
        <div class="flex flex-col">
          <div class="text-center justify-center text-sm font-normal">
            Participation Rate
          </div>
          <div class="flex flex-row items-center gap-1 justify-center">
            <IconPersonChecked />
            <div class="text-center justify-center text-dark text-4xl" style="font-weight: 400;">
              {{ engagement ? getParticipationRate(engagement).toFixed(0) : '0' }}%
            </div>
          </div>
        </div>
        <div class="w-px bg-body-light-2 mx-4"></div>
        <div class="flex flex-col">
          <div class="text-center justify-center text-sm font-normal">
            Total Participants
          </div>
          <div class="flex flex-row items-center gap-1 justify-center">
            <IconUsers />
            <div class="text-center justify-center text-dark text-4xl">
              {{ engagement?.totalEmployees || '0' }}
            </div>
          </div>
        </div>
      </div>
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2 text-2xl mt-4">
        Breakdown by Domain
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text">
            Engagement reflects four relationships for each employee: company, manager, peers, and self.
          </span>
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="justify-center font-normal text-sm">
          Company
        </div>
        <ProgressBarRounded :progress="insightsByDomain.company" :color="getColorFromValue(insightsByDomain.company)" />
        <div class="justify-center font-normal text-sm">
          Manager
        </div>
        <ProgressBarRounded :progress="insightsByDomain.manager" :color="getColorFromValue(insightsByDomain.manager)" />
        <div class="justify-center font-normal text-sm">
          Peers
        </div>
        <ProgressBarRounded :progress="insightsByDomain.peers" :color="getColorFromValue(insightsByDomain.peers)" />
        <div class="justify-center font-normal text-sm">
          Self
        </div>
        <ProgressBarRounded :progress="insightsByDomain.self" :color="getColorFromValue(insightsByDomain.self)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-icon:focus .tooltip-text,
.info-icon:hover .tooltip-text {
  display: block !important;
}

.tooltip-text {
  display: none;
  position: absolute;
  right: -12px;
  top: calc(140% + 3px);
  background: #60195A !important;
  color: #fff;
  padding: 0.75em 1em;
  border-radius: 8px;
  font-size: 0.9rem;
  white-space: pre-line;
  z-index: 10;
  min-width: 240px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  line-height: 1.5;
}

.tooltip-text::after {
  content: '';
  position: absolute;
  top: -6px;
  right: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #60195A;
}
</style>