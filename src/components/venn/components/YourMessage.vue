<script setup lang="ts">
import type { Message } from '@venn/types'
import IncognitoAvatar from './atoms/IncognitoAvatar.vue';

interface Props {
  message: Message
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <div class="bg-venn-purple drop-shadow-lg/5 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-4 max-w-md">
      <div class="text-left">{{ message.text }}</div>
    </div>
    <IncognitoAvatar />
  </div>
</template>