<script setup lang="ts">
import './assets/main.css'
import { navigate } from "astro:transitions/client"
import { pseudonym, updateCurrentView, updatePseudonym, updateUserId, userId } from '@venn/store'
import { computed, ref, nextTick, watch, onMounted, defineExpose } from 'vue'
import { useCollection, useDocument } from 'vuefire'
import { getAiUnderstandingDoc, getMessagesQuery, getMessagesRef, getSurveyUserDataDoc, getTypingUsersQuery, pseudonymsRef } from '@venn/firebase'
import MessageInput from '@venn/components/MessageInput.vue'
import { IconLock, IconBase, IconStar, IconPeople, IconPerson, IconBuilding } from '@venn/components/icons'
import YourMessage from '@venn/components/YourMessage.vue'
import TheirMessage from '@venn/components/TheirMessage.vue'
import AnimatedDots from '@venn/components/AnimatedDots.vue'
import Button from '@venn/components/atoms/Button.vue'
import type { Message } from './types'
import { addDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { useStore } from '@nanostores/vue'
import ContactForm from './components/ContactForm.vue'
import VennAvatar from './components/atoms/VennAvatar.vue'


const props = withDefaults(defineProps<{
  variant?: 'mini' | 'full'
}>(), {
  variant: 'full'
})

const $userId = useStore(userId)
const inputDisabled = ref(false)
const $pseudonym = useStore(pseudonym)
const showContactForm = ref(false)
const redirectToResults = ref(false)

// Ref for the scroll container
const scrollContainer = ref<HTMLElement>()

// Refs to track previous clarity values for comparison
const previousClarities = ref({
  manager: undefined as number | undefined,
  peers: undefined as number | undefined,
  self: undefined as number | undefined,
  company: undefined as number | undefined
})

// Refs to control flashing effects
const flashingStates = ref({
  manager: false,
  peers: false,
  self: false,
  company: false
})

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

const normalizeMacroDomain = (macroDomain: string) => {
  return macroDomain.toLowerCase().replace('relationship with ', '')
}

const managerClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => normalizeMacroDomain(status.macroDomain) === 'manager')?.clarityLevel)
const peersClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => normalizeMacroDomain(status.macroDomain) === 'peers')?.clarityLevel)
const selfClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => normalizeMacroDomain(status.macroDomain) === 'self')?.clarityLevel)
const companyClarity = computed(() => aiUnderstanding.value?.understandingStatus.find(status => normalizeMacroDomain(status.macroDomain) === 'company')?.clarityLevel)

const greetingMessage = computed(() => {
  const now = new Date()
  const hour = now.getHours()

  let greetingText = ''
  if (hour >= 0 && hour < 12) {
    greetingText = `Hey ${$pseudonym.value}, how's your morning been so far?`
  } else if (hour >= 12 && hour < 17) {
    greetingText = `Hey ${$pseudonym.value}, how's your day going?`
  } else {
    greetingText = `Hey ${$pseudonym.value}, how's your day been?`
  }

  return {
    messageId: crypto.randomUUID(),
    authorId: 'i_am_venn',
    text: greetingText,
    type: 'system' as const,
    createdAt: Timestamp.now()
  }
})

const isTyping = computed(() => {
  return typingUsers.value?.some(user => user.userId !== $userId.value && user.isTyping)
})

const surveyUserData = useDocument(
  computed(() => $userId.value ? getSurveyUserDataDoc($userId.value) : null), {
  ssrKey: 'survey-user-data',
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
watch(messages, (_) => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

watch(typingUsers, (newTypingUsers) => {
  if (newTypingUsers?.some(user => user.userId !== $userId.value && user.isTyping)) {
    inputDisabled.value = true
    nextTick(() => {
      scrollToBottom()
    })
  } else {
    inputDisabled.value = false
  }
}, { deep: true })

watch($userId, () => {
  console.log('userId changed', $userId.value)
})

watch(surveyUserData, () => {
  if (surveyUserData.value?.status === 'completed' && redirectToResults.value) {
    updateCurrentView('personal-results')
  }
}, { deep: true })

// Watch for clarity level changes and trigger flashing effects
watch(aiUnderstanding, (newUnderstanding) => {
  if (!newUnderstanding?.understandingStatus) return

  const currentClarities = {
    manager: newUnderstanding.understandingStatus.find(
      status => normalizeMacroDomain(status.macroDomain) === 'manager'
    )?.clarityLevel,
    peers: newUnderstanding.understandingStatus.find(
      status => normalizeMacroDomain(status.macroDomain) === 'peers'
    )?.clarityLevel,
    self: newUnderstanding.understandingStatus.find(
      status => normalizeMacroDomain(status.macroDomain) === 'self'
    )?.clarityLevel,
    company: newUnderstanding.understandingStatus.find(
      status => normalizeMacroDomain(status.macroDomain) === 'company'
    )?.clarityLevel
  }

  // Check each domain for increases and trigger flashing
  Object.entries(currentClarities).forEach(([domain, currentClarity]) => {
    const previousClarity = previousClarities.value[domain as keyof typeof previousClarities.value]

    // Trigger flashing if:
    // 1. Clarity increased from previous value, OR
    // 2. This is the first time we're seeing clarity > 0 (no previous value defined)
    if (currentClarity !== undefined && currentClarity > 0 && (
      (previousClarity !== undefined && currentClarity > previousClarity) ||
      (previousClarity === undefined)
    )) {

      // Trigger flashing effect
      flashingStates.value[domain as keyof typeof flashingStates.value] = true

      // Stop flashing after 5 seconds
      setTimeout(() => {
        flashingStates.value[domain as keyof typeof flashingStates.value] = false
      }, 5000)
    }
  })

  // Update previous values for next comparison
  previousClarities.value = currentClarities
}, { deep: true })

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
  inputDisabled.value = true
  showContactForm.value = true;
}

const handleContactFormSubmit = async (data: { name: string, email: string, company: string }) => {
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture('get_started_form_submitted', {
      name: data.name,
      email: data.email,
      company: data.company,
      referrer: 'chat',
      buttonLabel: 'Submit',
      pageSource: 'chat'
    });
  }
  // Send thank you message as user 
  try {
    const newMessage = {
      authorId: $userId.value!,
      text: 'Thank you so much, I am ready to see my results.',
      type: 'user',
      createdAt: Timestamp.now()
    }
    await addDoc(getMessagesRef($userId.value), newMessage)
  } catch (error) {
    console.error('Error sending thank you message:', error)
  } finally {
    inputDisabled.value = false
  }
  showContactForm.value = false
  updateCurrentView('personal-results')
}

const handleOnMessageSubmit = async (message: string) => {
  console.log('message submitted')
  inputDisabled.value = true
  try {
    const isFirstMessage = messages.value.length === 0
    const newMessage: Omit<Message, 'messageId'> = {
      authorId: $userId.value!,
      text: message,
      type: 'user',
      createdAt: Timestamp.now(),
      ...(isFirstMessage && {
        metadata: {
          localtime: new Date().toLocaleString(),
          name: $pseudonym.value,
          vennMessage: greetingMessage.value.text,
        }
      })
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
  console.log('mounted:$userId', $userId.value, props.variant)
  if ($userId.value.length === 0 || props.variant === 'mini') {
    const params = new URLSearchParams(window?.location?.search || '')
    if (!params.has('user-id')) {
      updateUserId(crypto.randomUUID())
    } else {
      updateUserId(params.get('user-id')!)
      redirectToResults.value = true
    }
  }
  if ($pseudonym.value.length === 0) {
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
  }

  nextTick(() => {
    scrollToBottom()
  })
})

defineExpose({
  endChat: handleOnShowResultsClick
})
</script>

<template>
  <div class="h-full p-3 flex flex-col rounded-2xl max-w-2xl mx-auto"
    :class="{ 'bg-white': variant === 'full', 'bg-white/40 md:min-w-2xl lg:min-w-4xl': variant === 'mini' }">
    <!-- Modal backdrop with blur effect -->
    <div v-if="variant === 'full' && showContactForm"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <!-- Modal content -->
      <div class="relative max-w-xl" @click.stop>
        <!-- Contact form container -->
        <div id="contact-form-container">
          <ContactForm :onSubmit="handleContactFormSubmit" />
        </div>
      </div>
    </div>

    <!-- Main content wrapper with grid layout -->
    <div class="grid grid-rows-[auto_1fr_auto] h-full">
      <div id="insights-container" v-if="variant === 'full'" class="py-2 px-1 flex flex-row justify-between gap-4">
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(managerClarity)}`">
          <span class="font-normal text-base text-black pr-2">Manager</span>
          <div class="domain-icons outline bg-blue rounded-full flex items-center justify-center"
            :class="{ 'flashing-effect': flashingStates.manager }">
            <IconStar color="var(--color-dark)" />
          </div>
        </div>
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(peersClarity)}`">
          <span class="font-normal text-base text-black pr-2">Peers</span>
          <div class="domain-icons outline bg-yellow rounded-full flex items-center justify-center"
            :class="{ 'flashing-effect': flashingStates.peers }">
            <IconPeople color="var(--color-dark)" />
          </div>
        </div>
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(selfClarity)}`">
          <span class="font-normal text-base text-black pr-2">Self</span>
          <div class="domain-icons outline bg-orange rounded-full flex items-center justify-center"
            :class="{ 'flashing-effect': flashingStates.self }">
            <IconPerson color="var(--color-dark)" />
          </div>
        </div>
        <div class="rounded-full sm:bg-white p-2 flex flex-col sm:flex-row-reverse items-center gap-2"
          :class="`opacity-${normalizeClarityToProgress(companyClarity)}`">
          <span class="font-normal text-base text-black pr-2">Company</span>
          <div class="domain-icons outline bg-venn-purple rounded-full flex items-center justify-center"
            :class="{ 'flashing-effect': flashingStates.company }">
            <IconBuilding color="var(--color-dark)" />
          </div>
        </div>
      </div>


      <div ref="scrollContainer" class="overflow-y-auto pb-4 min-h-0">
        <div v-if="variant === 'full'" class="flex flex-row items-center justify-center gap-2 my-5 px-4">
          <IconBase width="34" height="34">
            <IconLock />
          </IconBase>
          <div class="text-dark text-sm">You are answering as <span class="font-semibold">{{ $pseudonym }}</span>.
            No information can be traced back
            to your identity.</div>
        </div>
        <div class="flex mb-4">
          <TheirMessage :message="greetingMessage" />
        </div>
        <div v-for="message in messages" :key="message.messageId" class="flex mb-4"
          :class="{ 'justify-end': message.authorId === $userId, 'justify-start': message.authorId !== $userId }">
          <YourMessage v-if="message.authorId === $userId" :message="message" />
          <TheirMessage v-else :message="message" />
        </div>
        <div v-if="isTyping" class="flex flex-row items-center gap-2">
          <VennAvatar />
          <AnimatedDots />
        </div>
      </div>

      <div id="input-container" class="pt-4">
        <Button v-if="surveyUserData?.status === 'completed'" label="Show results" @click="handleOnShowResultsClick" />
        <MessageInput v-else-if="$userId" :room-id="$userId" :submit="handleOnMessageSubmit" :disabled="inputDisabled"
          :show-extras="variant === 'mini'" :placeholder="variant === 'mini' ? '' : 'Chat with Venn'" />
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

/* Hide scrollbars while maintaining scroll functionality */
.overflow-y-auto {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

/* Flashing effect animation */
.flashing-effect {
  animation: flash 5s ease-in-out;
}

@keyframes flash {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  25% {
    transform: scale(1.1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }

  75% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

@media (max-width: 639px) {
  #insights-container>div {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 0.25rem !important;
  }

  #insights-container span {
    display: block;
    margin-bottom: 0.25rem;
    text-align: center !important;
    width: 100%;
  }

  .domain-icons {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>