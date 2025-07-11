<script setup lang="ts">
import './assets/main.css'
import { navigate } from "astro:transitions/client"
import { pseudonym, updateCurrentView, updatePseudonym, updateUserId, userId } from '@venn/store'
import { computed, ref, nextTick, watch, onMounted } from 'vue'
import { useCollection, useDocument } from 'vuefire'
import { getAiUnderstandingDoc, getMessagesQuery, getMessagesRef, getSurveyUserDoc, getTypingUsersQuery, pseudonymsRef } from '@venn/firebase'
import MessageInput from '@venn/components/MessageInput.vue'
import { IconLock, IconBase, IconStar, IconPeople, IconPerson, IconBuilding } from '@venn/components/icons'
import YourMessage from '@venn/components/YourMessage.vue'
import TheirMessage from '@venn/components/TheirMessage.vue'
import AnimatedDots from '@venn/components/AnimatedDots.vue'
import { callStartSurveyCommand } from '@venn/service'
import Button from '@venn/components/atoms/Button.vue'
import type { Message } from './types'
import { addDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { useStore } from '@nanostores/vue'


const props = withDefaults(defineProps<{
  variant?: 'mini' | 'full'
}>(), {
  variant: 'full'
})

const $userId = useStore(userId)
const inputDisabled = ref(true)
const $pseudonym = useStore(pseudonym)

// Ref for the scroll container
const scrollContainer = ref<HTMLElement>()

// Real-time listener for messages with ordering
const messages = useCollection(
  computed(() => $userId.value ? getMessagesQuery($userId.value) : null), {
  ssrKey: 'messages',
  wait: true,
}
)

const typingUsers = useCollection(
  computed(() => $userId.value ? getTypingUsersQuery($userId.value) : null), {
  ssrKey: 'typing-users',
}
)

const aiUnderstanding = useDocument(
  computed(() => $userId.value ? getAiUnderstandingDoc($userId.value) : null), {
  ssrKey: 'ai-understanding',
}
)

const managerClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => status.macroDomain.toLowerCase() === 'manager')?.clarityLevel)
const peersClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => status.macroDomain.toLowerCase() === 'peers')?.clarityLevel)
const selfClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => status.macroDomain.toLowerCase() === 'self')?.clarityLevel)
const companyClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => status.macroDomain.toLowerCase() === 'company')?.clarityLevel)

const isMessagesLoading = computed(() => messages.pending.value)

const isTyping = computed(() => {
  return typingUsers.value?.some(user => user.userId !== $userId.value && user.isTyping)
})

const surveyUser = useDocument(
  computed(() => $userId.value ? getSurveyUserDoc($userId.value) : null), {
  ssrKey: 'survey-user',
}
)

// Function to scroll to bottom
const scrollToBottom = () => {
  console.log('scrolling to bottom')
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

// Watch for changes in messages and scroll to bottom
watch(() => messages.value.length, (value) => {
  nextTick(() => {
    inputDisabled.value = value === 0
    scrollToBottom()
  })
})

// so once it appears, scroll to bottom
watch(isTyping, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

const normalizeClarityToProgress = (clarity: number | undefined) => {
  if (!clarity || clarity <= 0.2) {
    return 20
  } else if (clarity <= 0.4) {
    return 40
  } else if (clarity <= 0.6) {
    return 60
  } else if (clarity <= 0.8) {
    return 80
  } else {
    return 100
  }
}

const handleOnShowResultsClick = () => {
  updateCurrentView('personal-results')
}

const handleOnMessageSubmit = async (message: string) => {
  console.log('message submitted')
  inputDisabled.value = true
  try {
    const newMessage: Omit<Message, 'messageId'> = {
      authorId: $userId.value!,
      text: message,
      type: 'user',
      createdAt: Timestamp.now()
    }

    await addDoc(getMessagesRef($userId.value), newMessage)
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    inputDisabled.value = false
  }
  if (props.variant === 'mini') {
    navigate('/chat')
  }
}

onMounted(() => {
  // fresh id on every load
  console.log('mounted:$userId', $userId.value)
  if ($userId.value.length === 0) {
    updateUserId(crypto.randomUUID())
  }
  const pseudonyms = useCollection(pseudonymsRef)

  // Wait for pseudonyms to load, then randomly select one
  const unwatchPseudonyms = watch(pseudonyms, (pseudonymsList) => {
    if (pseudonymsList && pseudonymsList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pseudonymsList.length)
      const selectedPseudonym = pseudonymsList[randomIndex]
      updatePseudonym(selectedPseudonym.pseudonym)
      console.log('Assigned pseudonym:', selectedPseudonym.pseudonym)
    }
    unwatchPseudonyms() // Stop watching once we've assigned a pseudonym
  })

  // Watch for when data is loaded
  const unwatchMessages = watch(isMessagesLoading, (loading) => {
    if (!loading && messages.value?.length === 0 && $userId.value && $pseudonym.value) {
      callStartSurveyCommand($userId.value, $pseudonym.value)
      unwatchMessages() // Stop watching once we've called the command
    }
  })

  nextTick(() => {
    scrollToBottom()
  })
})
</script>

<template>
  <div class="p-3 flex flex-col mx-auto max-w-5xl min-w-3xs sm:min-w-2xl bg-white/40 rounded-2xl"
    :class="{ 'h-screen': variant === 'full' }">
    <div class="flex flex-col overflow-hidden h-full w-full">
      <div id="insights-container" v-if="variant === 'full'"
        class="py-2 flex flex-row justify-between gap-4 opacity-20 opacity-40 opacity-60 opacity-80 opacity-100">
        <div class="rounded-full sm:bg-white sm:outline p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(managerClarity)}`">
          <span class="font-normal text-base text-black pr-2">Manager</span>
          <div class="domain-icons outline bg-blue rounded-full flex items-center justify-center">
            <IconStar color="var(--color-dark)" />
          </div>
        </div>
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(peersClarity)}`">
          <span class="font-normal text-base text-black pr-2">Peers</span>
          <div class="domain-icons outline bg-yellow rounded-full flex items-center justify-center">
            <IconPeople color="var(--color-dark)" />
          </div>
        </div>
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(selfClarity)}`">
          <span class="font-normal text-base text-black pr-2">Self</span>
          <div class="domain-icons outline bg-orange rounded-full flex items-center justify-center">
            <IconPerson color="var(--color-dark)" />
          </div>
        </div>
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(companyClarity)}`">
          <span class="font-normal text-base text-black pr-2">Company</span>
          <div class="domain-icons outline bg-purple rounded-full flex items-center justify-center">
            <IconBuilding color="var(--color-dark)" />
          </div>
        </div>
      </div>
      <div v-if="variant === 'full'" class="flex flex-row items-center justify-center gap-2 my-5 px-12">
        <IconBase width="34" height="34">
          <IconLock />
        </IconBase>
        <div class="text-dark text-sm">You are answering as <span class="font-semibold">{{ $pseudonym }}</span>.
          No information can be traced back
          to your identity.</div>
      </div>

      <div ref="scrollContainer" class="flex-1 overflow-y-auto min-h-0 pb-14">
        <div v-for="message in messages" :key="message.messageId" class="flex mb-4"
          :class="{ 'justify-end': message.authorId === $userId, 'justify-start': message.authorId !== $userId }">
          <YourMessage v-if="message.authorId === $userId" :message="message" />
          <TheirMessage v-else :message="message" />
        </div>
        <div class="flex flex-row items-center gap-2 mb-4">
          <div class="dummy-spacer"></div>
          <AnimatedDots v-if="isTyping" />
        </div>
      </div>

      <div class="sticky bottom-0 pt-5">
        <Button v-if="surveyUser?.status === 'completed'" label="Show results" @click="handleOnShowResultsClick" />
        <MessageInput v-else-if="$userId" :room-id="$userId" :submit="handleOnMessageSubmit" :disabled="inputDisabled"
          :show-extras="variant === 'mini'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.domain-icons {
  width: 44px;
  height: 44px;
}

/* dummy spacer to match venn avatar size */
.dummy-spacer {
  width: 38px;
}
</style>