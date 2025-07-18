<script setup lang="ts">
import type { Concern } from '@venn/types/Concern';
import IconUsers from './icons/IconUsers.vue';
import ProgressBarRounded from './ProgressBarRounded.vue';

defineProps<{
  concerns: Concern[]
}>()

const getMacroDomainColor = (macroDomain: string): string => {
  const sanitizedMacroDomain = macroDomain.toLowerCase().replace('relationship with ', '').trim()

  switch (sanitizedMacroDomain) {
    case 'company':
      return 'orange'
    case 'Manager':
      return 'blue'
    case 'peer':
    case 'peers':
      return 'yellow'
    case 'self':
      return 'purple'
    default:
      return 'transparent'
  }
}
</script>
<template>
  <div class="bg-white rounded-xl px-6 py-8">
    <div class="flex flex-col">
      <div class="text-center justify-center text-dark text-xl font-normal leading-loose">
        Top Reported Issues
      </div>
      <div class="text-center justify-center text-body-dark-1 text-xs font-normal">
        Top employee concerns ranked by how frequently they were raised.
      </div>
    </div>
    <hr class="border-dark/10 mx-7 my-5" />
    <div class="flex flex-row justify-evenly px-5">
      <div class="flex flex-row items-center gap-1">
        <div class="dots bg-orange" />
        <div class="text-center justify-center text-dark/50 text-xs">
          Company</div>
      </div>
      <div class="flex flex-row items-center gap-1">
        <div class="dots bg-blue" />
        <div class="text-center justify-center text-dark/50 text-xs">
          Manager</div>
      </div>
      <div class="flex flex-row items-center gap-1">
        <div class="dots bg-yellow" />
        <div class="text-center justify-center text-dark/50 text-xs">
          Peer</div>
      </div>
      <div class="flex flex-row items-center gap-1">
        <div class="dots bg-venn-purple" />
        <div class="text-center justify-center text-dark/50 text-xs">
          Self</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 mb-5" v-for="concern in concerns" :key="concern.label">
      <div class="flex flex-row justify-between">
        <div class="justify-center text-dark text-base font-normal leading-normal">
          {{ concern.label }}
        </div>
        <div class="flex flex-row items-center gap-1">
          <IconUsers :width="12" :height="12" color="black" />
          <div class="text-center justify-center text-dark text-base font-normal leading-none">
            {{ concern.totalEmployeesMentioned }}
          </div>
        </div>
      </div>
      <ProgressBarRounded :progress="concern.percentageEmployeesMentioned * 100"
        :color="getMacroDomainColor(concern.macroDomain)" height="8px" :showPercentage="false" />
      <div class="justify-start text-xs font-normal leading-none">{{ concern.title }}</div>
    </div>
  </div>
</template>

<style scoped>
.dots {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>