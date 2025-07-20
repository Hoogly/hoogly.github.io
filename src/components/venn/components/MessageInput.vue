<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { IconArrowUp, IconBase, IconLock } from './icons'
import IncognitoAvatar from './atoms/IncognitoAvatar.vue'
import { pseudonym } from '@venn/store'
import { useStore } from '@nanostores/vue'

const props = withDefaults(defineProps<{
  roomId: string
  disabled?: boolean
  showExtras?: boolean
  placeholder?: string
  submit?: (message: string) => void
}>(), {
  disabled: false,
  showExtras: true,
  placeholder: '',
  submit: () => { }
})

const message = ref('')
const showSendButton = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()

const $pseudonym = useStore(pseudonym)

// Rotating placeholder text with typing animation
const emotions = [
  'Energised',
  'Frustrated', 
  'Grateful',
  'Annoyed',
  'Calm',
  'Overwhelmed'
]
const currentEmotionIndex = ref(0)
const placeholderText = ref(props.placeholder)
let animationId: number | null = null
let isTyping = true
let currentCharIndex = 0
let currentText = ''
let lastUpdateTime = 0
let isWaiting = false

const baseText = 'I am feeling '
const TYPING_SPEED = 80 // milliseconds per character
const WAIT_TIME = 2000 // milliseconds to wait when complete

const typeNextCharacter = (currentTime: number) => {
  if (isWaiting) {
    // Still waiting, continue animation loop
    animationId = requestAnimationFrame(typeNextCharacter)
    return
  }

  if (currentTime - lastUpdateTime < TYPING_SPEED) {
    // Not time to update yet, continue animation loop
    animationId = requestAnimationFrame(typeNextCharacter)
    return
  }

  lastUpdateTime = currentTime

  if (isTyping) {
    // Typing phase
    if (currentCharIndex < currentText.length) {
      placeholderText.value = baseText + currentText.substring(0, currentCharIndex + 1)
      currentCharIndex++
    } else {
      // Finished typing, wait then start deleting
      isWaiting = true
      setTimeout(() => {
        isTyping = false
        currentCharIndex = currentText.length
        isWaiting = false
      }, WAIT_TIME)
    }
  } else {
    // Deleting phase
    if (currentCharIndex > 0) {
      currentCharIndex--
      placeholderText.value = baseText + currentText.substring(0, currentCharIndex)
    } else {
      // Finished deleting, move to next emotion
      isTyping = true
      currentEmotionIndex.value = (currentEmotionIndex.value + 1) % emotions.length
      currentText = emotions[currentEmotionIndex.value]
      currentCharIndex = 0
    }
  }

  // Continue animation loop
  animationId = requestAnimationFrame(typeNextCharacter)
}

const startTypingAnimation = () => {
  currentText = emotions[currentEmotionIndex.value]
  currentCharIndex = 0
  isTyping = true
  isWaiting = false
  placeholderText.value = baseText
  lastUpdateTime = 0
  animationId = requestAnimationFrame(typeNextCharacter)
}

onMounted(() => {
  // replace with animated one if none is provided
  if (placeholderText.value === '') {
    startTypingAnimation()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

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
    <form @submit.prevent="sendMessage" class="flex flex-row items-center" :class="{ 'mb-4': showExtras }">
      <textarea ref="textareaRef" name="message" v-model="message" :placeholder="placeholderText" :disabled="disabled"
        autocomplete="off" rows="1" autofocus
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
textarea {
  caret-width: 3px;
}
textarea::placeholder {
  color: #888;
  opacity: 1;
}
</style>