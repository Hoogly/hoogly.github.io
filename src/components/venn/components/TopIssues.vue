<script setup lang="ts">
import type { Concern } from '@venn/types/Concern';
import IconUsers from './icons/IconUsers.vue';
import ProgressBarRounded from './ProgressBarRounded.vue';
import { defineProps } from 'vue';

const props = defineProps<{
  concerns?: Concern[],
  barsAnimate?: boolean
}>()

const getMacroDomainColor = (macroDomain: string): string => {
  const sanitizedMacroDomain = macroDomain.toLowerCase().replace('relationship with ', '').trim()

  switch (sanitizedMacroDomain) {
    case 'company':
      return 'orange'
    case 'manager':
      return 'blue'
    case 'peer':
    case 'peers':
      return 'yellow'
    case 'self':
      return 'venn-purple'
    default:
      return 'transparent'
  }
}
</script>
<template>
  <div class="bg-white rounded-xl px-4 py-4 shadow-sm">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark font-normal leading-loose flex items-center justify-center gap-2" style="font-size: 1.5rem; font-weight: 400; position: relative;">
        Top Reported Issues
        <span class="info-icon" tabindex="0" style="cursor: pointer; display: inline-block; position: relative;">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><circle cx="10" cy="10" r="9" stroke="#888" stroke-width="2" fill="#fff"/><text x="10" y="15" text-anchor="middle" font-size="12" fill="#888" font-family="Arial, sans-serif">i</text></svg>
          <span class="tooltip-text" style="display: none; position: absolute; left: 50%; top: 140%; transform: translateX(-50%); background: #60195A; color: #fff; padding: 0.75em 1em; border-radius: 8px; font-size: 0.9rem; white-space: pre-line; z-index: 10; min-width: 240px; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            Top employee concerns ranked by how frequently they were raised.
            <div style="position: absolute; top: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 6px solid #60195A;"></div>
          </span>
        </span>
      </div>
    </div>
    <div class="flex flex-row justify-between sm:justify-evenly px-1 mb-3">
      <div class="flex flex-row items-center gap-1 sm:gap-2">
        <div class="dots bg-orange" />
        <div class="text-center justify-center font-normal" style="color: #706F6D;">
          Company
        </div>
      </div>
      <div class="flex flex-row items-center gap-1 sm:gap-2">
        <div class="dots bg-blue" />
        <div class="text-center justify-center font-normal" style="color: #706F6D;">
          Manager
        </div>
      </div>
      <div class="flex flex-row items-center gap-1 sm:gap-2">
        <div class="dots bg-yellow" />
        <div class="text-center justify-center font-normal" style="color: #706F6D;">
          Peer
        </div>
      </div>
      <div class="flex flex-row items-center gap-1">
        <div class="dots bg-venn-purple" />
        <div class="text-center justify-center font-normal" style="color: #706F6D;">
          Self
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2" :class="{ 'mb-3': index !== (concerns || []).length - 1 }" v-for="(concern, index) in (concerns || [])" :key="concern.label">
      <div class="flex flex-row justify-between">
        <div class="justify-center text-dark font-normal leading-normal" style="font-size: 1rem;">
          {{ concern.label }}
        </div>
        <div class="flex flex-row items-center gap-1">
          <IconUsers :width="12" :height="12" color="black" />
          <div class="text-center justify-center text-dark text-base font-normal leading-none" style="font-size: 1rem;">
            {{ concern.totalEmployeesMentioned }}
          </div>
        </div>
      </div>
      <ProgressBarRounded :progress="barsAnimate ? (concern.percentageEmployeesMentioned > 1 ? concern.percentageEmployeesMentioned : concern.percentageEmployeesMentioned * 100) : 0"
        :color="getMacroDomainColor(concern.macroDomain)" height="8px" :showPercentage="false" />
    </div>
  </div>
</template>

<style scoped>
.dots {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.info-icon:focus .tooltip-text,
.info-icon:hover .tooltip-text {
  display: block !important;
}
.tooltip-text {
  background: #60195A !important;
  line-height: 1.5;
}
</style>