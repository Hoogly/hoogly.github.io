<script setup lang="ts">
import type { EmployeeEngagement } from '@venn/types';
import { getParticipationRate } from '@venn/types/EmployeeEngagement';
import { computed } from 'vue';
import GaugeMeter from './GaugeMeter.vue'
import ProgressBarRounded from './ProgressBarRounded.vue'
import { IconPersonChecked, IconUsers } from './icons'

const props = defineProps<{
  engagement?: EmployeeEngagement,
  barsAnimate?: boolean
}>()

const insightsByDomain = computed(() => {
  if (!props.engagement) return {}
  return props.engagement.insights.reduce((acc, insight) => {
    acc[insight.domain.toLowerCase()] = insight.engagementScore * 100
    return acc
  }, {} as Record<string, number>)
})
</script>

<template>
  <div class="bg-white rounded-xl px-4 sm:px-6 py-4 sm:py-8 min-h-[800px] sm:min-h-auto" style="box-shadow: 0 0 0 2px #ececec;">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2" style="font-size: 1.5rem; font-weight: 400; position: relative; margin-top: 0.5rem; sm:margin-top: 0.25rem;">
        Employee Engagement
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text" style="display: none; position: absolute; right: -12px; top: calc(140% + 3px); background: #60195A; color: #fff; padding: 0.75em 1em; border-radius: 8px; font-size: 0.9rem; white-space: pre-line; z-index: 10; min-width: 240px; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            Snapshot of company-wide engagement and key areas for improvement.
            <div style="position: absolute; top: -6px; right: 16px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid #60195A;"></div>
          </span>
        </span>
      </div>
      <div class="flex justify-center my-4">
        <GaugeMeter :percentage="(engagement?.averageEngagementScore || 0) * 100" />
      </div>
      <div class="text-center justify-center text-dark font-normal mb-6" style="font-size: 3rem;">
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
            <div class="text-center justify-center text-dark text-4xl" style="font-weight: 400;">
              {{ engagement?.totalEmployees || '0' }}
            </div>
          </div>
        </div>
      </div>
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2" style="font-size: 1.5rem; font-weight: 400; position: relative; margin-top: 2rem;">
        Breakdown by Domain
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text" style="display: none; position: absolute; right: -12px; top: calc(140% + 3px); background: #60195A; color: #fff; padding: 0.75em 1em; border-radius: 8px; font-size: 0.9rem; white-space: pre-line; z-index: 10; min-width: 240px; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            Engagement reflects four relationships for each employee: company, manager, peers, and self.
            <div style="position: absolute; top: -6px; right: 16px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid #60195A;"></div>
          </span>
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="justify-center font-normal" style="font-size: 1rem;">
          Company
        </div>
        <ProgressBarRounded :progress="barsAnimate ? insightsByDomain.company : 0" color="green" />
        <div class="justify-center font-normal" style="font-size: 1rem;">
          Manager
        </div>
        <ProgressBarRounded :progress="barsAnimate ? insightsByDomain.manager : 0" color="amber" />
        <div class="justify-center font-normal" style="font-size: 1rem;">
          Peers
        </div>
        <ProgressBarRounded :progress="barsAnimate ? insightsByDomain.peers : 0" color="red" />
        <div class="justify-center font-normal" style="font-size: 1rem;">
          Self
        </div>
        <ProgressBarRounded :progress="barsAnimate ? insightsByDomain.self : 0" color="amber-2" />
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
  background: #60195A !important;
  line-height: 1.5;
}
</style>