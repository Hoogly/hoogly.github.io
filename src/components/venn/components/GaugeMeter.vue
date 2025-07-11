<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  percentage: number // 0 (leftmost) to 100 (rightmost)
}>()

// Gap between arcs in degrees
const GAP_DEG = 4
const ARC_DEG = (180 - GAP_DEG * 4) / 5 // spread remaining degrees equally

// For drawing arcs only
const arcColors = ['#ED3224', '#F39A1F', '#FDE06A', '#5DB97C', '#338A5B']

// Helper to describe an arc in SVG
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ')
}
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180.0
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  }
}

// Pointer angle: map 0-100% to -90deg to 90deg
const pointerAngle = ref(-90)
function getPointerAngle(percentage: number) {
  return -90 + (percentage / 100) * 180
}

function animatePointer(targetPercentage: number) {
  const targetAngle = getPointerAngle(Math.max(0, Math.min(100, targetPercentage)))
  const duration = 700 // ms
  const start = pointerAngle.value
  const end = targetAngle
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    pointerAngle.value = start + (end - start) * t
    if (t < 1) {
      requestAnimationFrame(step)
    } else {
      pointerAngle.value = end
    }
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  animatePointer(props.percentage)
})

watch(() => props.percentage, (newVal) => {
  animatePointer(newVal)
})
</script>

<template>
  <div>
    <div class="px-4">
      <svg :width="240" :height="120" viewBox="0 0 240 120">
        <g>
          <template v-for="(color, i) in arcColors" :key="i">
            <path
              :d="describeArc(120, 120, 100, -90 + i * (ARC_DEG + GAP_DEG), -90 + i * (ARC_DEG + GAP_DEG) + ARC_DEG)"
              :stroke="color" stroke-width="28" fill="none" stroke-linecap="butt" />
          </template>
        </g>
        <!-- Pointer (SVG from user, centered and scaled, shortened by 5 units) -->
        <g :transform="`rotate(${pointerAngle}, 120, 105)`">
          <g transform="translate(120 105) scale(1.25) translate(-45 -90)">
            <circle cx="45" cy="90" r="12" fill="black" fill-opacity="0.08" />
            <path
              d="M42.8908 23C42.9384 21.9 43.8574 21.015 44.976 21.013V21.013C46.0947 21.011 47.0167 21.89 47.0684 23.008L50.8591 90.0088C51.0101 93.275 48.4059 96.0073 45.1362 96.0131V96.0131C41.8664 96.0189 39.2525 93.296 39.3919 90.0292L42.8908 23Z"
              fill="#23221F" />
            <circle cx="45" cy="90" r="2.5" fill="white" />
          </g>
        </g>
      </svg>
    </div>
    <div class="flex flex-row justify-between">
      <div class="text-body-dark-1/30 text-xs font-normal">Not Engaged</div>
      <div class="text-body-dark-1/30 text-xs font-normal">Fully Engaged</div>
    </div>
  </div>
</template>

<style scoped>
svg {
  display: block;
  margin: 0 auto;
}
</style>