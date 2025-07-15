<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { IconArrowUp, IconBase, IconLock } from './icons'
import IncognitoAvatar from './atoms/IncognitoAvatar.vue'
import { pseudonym } from '@venn/store'
import { useStore } from '@nanostores/vue'

const props = withDefaults(defineProps<{
  roomId: string
  disabled?: boolean
  showExtras?: boolean
  submit?: (message: string) => void
}>(), {
  disabled: false,
  showExtras: true,
  submit: () => { }
})

const message = ref('')
const showSendButton = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()

const $pseudonym = useStore(pseudonym)

watch(message, (value) => {
  if (value.trim()) {
    showSendButton.value = true
  } else {
    showSendButton.value = false
  }
  // Auto-resize textarea
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
    }
  })
})

const sendMessage = () => {
  console.log('sendMessage', message.value)
  if (!message.value.trim()) return

  props.submit?.(message.value.trim())
  message.value = ''
  // Reset textarea height
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="rounded-xl bg-white outline outline-body-light-2 px-2 py-2 m-1">
    <form @submit.prevent="sendMessage" class="flex flex-row items-start" :class="{ 'mb-4': showExtras }">
      <textarea ref="textareaRef" name="message" v-model="message" placeholder="Chat with Venn" :disabled="disabled"
        autocomplete="off" rows="2"
        class="resize-none flex-1 focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30 resize-none min-h-[20px] max-h-[120px] overflow-y-auto"
        @keydown="handleKeydown"
        />
      <button v-if="!showExtras" type="submit" class="ml-auto mt-1" :disabled="disabled">
        <div class="rounded-full bg-orange button-container flex items-center justify-center">
          <IconBase>
            <IconArrowUp />
          </IconBase>
        </div>
      </button>
    </form>
    <div v-if="showExtras" class="flex flex-row gap-2">
      <div class="flex flex-row items-center justify-center gap-1 outline outline-body-dark-1 rounded-full px-2 py-1">
        <IncognitoAvatar :width="18" :height="18" />
        <div class="text-xs">{{ $pseudonym }}</div>
      </div>
      <div class="flex flex-row items-center justify-center gap-1 outline outline-body-dark-1 rounded-full px-2 py-1">
        <IconBase>
          <IconLock />
        </IconBase>
        <div class="text-xs">Confidential</div>
      </div>
      <button @click.prevent="sendMessage" class="ml-auto" :disabled="disabled" v-show="showSendButton">
        <div class="rounded-full bg-orange button-container flex items-center justify-center">
          <IconBase>
            <IconArrowUp />
          </IconBase>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  width: 29px;
  height: 29px;
}
</style>