<script setup lang="ts">
import type { Message } from '@venn/types'
import VennAvatar from './atoms/VennAvatar.vue';

interface Props {
  message: Message
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <VennAvatar />
    <div
      class="bg-white flex items-center justify-center rounded-tl-sm rounded-bl-2xl rounded-br-2xl rounded-tr-2xl p-4 max-w-md">
      <div class="message-content">{{ message.text }}</div>
    </div>
  </div>
</template>