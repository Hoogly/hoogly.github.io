<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  onSubmit: (data: { name: string, email: string, company: string }) => void
}>()

const hasSubmitted = ref(false)
const nameValue = ref('')
const emailValue = ref('')
const companyValue = ref('')
const emailError = ref('');
const emailTouched = ref(false);
const nameError = ref('');
const nameTouched = ref(false);
const companyError = ref('');
const companyTouched = ref(false);

function validateEmail(email: string) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emailTouched.value = true;
  nameTouched.value = true;
  companyTouched.value = true;
  emailError.value = '';
  nameError.value = '';
  companyError.value = '';
  // Check if all fields are filled
  if (!nameValue.value.trim()) {
    nameError.value = "We’d love to know your name (just first is fine!)";
  }
  if (!emailValue.value.trim()) {
    emailError.value = "Oops! That doesn’t look like a valid email address";
  }
  if (!companyValue.value.trim()) {
    companyError.value = "Let us know where you work—this helps us personalize things.";
  }
  if (!nameValue.value.trim() || !emailValue.value.trim() || !companyValue.value.trim()) {
    hasSubmitted.value = true
    return
  }
  // Email format validation
  if (!validateEmail(emailValue.value.trim())) {
    emailError.value = "Oops! That doesn’t look like a valid email address.";
    return;
  }
  const data = {
    name: nameValue.value.trim(),
    email: emailValue.value.trim(),
    company: companyValue.value.trim()
  }
  props.onSubmit(data)
}
</script>

<template>
  <div class="bg-white rounded-3xl px-6 sm:px-10 py-10 sm:py-20 flex flex-col">
    <div class="try-convo-headline text-3xl sm:text-5xl text-center">
      Try your first <span class="gradient-text">conversation</span>
    </div>
    <div class="text-sm sm:text-base text-center mt-2 mb-4 sm:mb-6">
      Don't worry, your information will be kept private and confidential
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-6 sm:mb-8">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Name
        </div>
        <div class="rounded-2xl shadow"
             :class="((hasSubmitted && !nameValue) || nameError) ? 'input-error-outline' : 'outline outline-stone-100'">
          <input name="name" type="text" placeholder="Jane Doe" v-model="nameValue"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30"
            @blur="nameTouched.value = true; if(!nameValue) nameError.value = 'We’d love to know your name (just first is fine!)'; else nameError.value = ''" />
        </div>
        <div v-if="(nameTouched || hasSubmitted) && nameError" class="text-xs error-message mt-1">{{ nameError }}</div>
      </div>
      <div class="mb-6 sm:mb-8">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Company Email
        </div>
        <div class="rounded-2xl shadow"
             :class="((hasSubmitted && !emailValue) || emailError) ? 'input-error-outline' : 'outline outline-stone-100'">
          <input name="email" type="text" placeholder="janedoe@hoogly.com" v-model="emailValue"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30"
            @blur="emailTouched.value = true; if(!emailValue || !validateEmail(emailValue)) emailError.value = 'Oops! That doesn’t look like a valid email address'; else emailError.value = ''" />
        </div>
        <div v-if="(emailTouched || hasSubmitted) && emailError" class="text-xs error-message mt-1">{{ emailError }}</div>
      </div>
      <div class="mb-6 sm:mb-8">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Company Name
        </div>
        <div class="rounded-2xl shadow"
             :class="((hasSubmitted && !companyValue) || companyError) ? 'input-error-outline' : 'outline outline-stone-100'">
          <input name="company" type="text" placeholder="Hoogly" v-model="companyValue"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30"
            @blur="companyTouched.value = true; if(!companyValue) companyError.value = 'Let us know where you work—this helps us personalize things.'; else companyError.value = ''" />
        </div>
        <div v-if="(companyTouched || hasSubmitted) && companyError" class="text-xs error-message mt-1">{{ companyError }}</div>
      </div>
      <div class="flex flex-row items-center justify-center mt-6 sm:mt-8">
        <button type="submit" class="bg-orange rounded-full py-2 sm:py-3 px-6 text-white text-center">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.try-convo-headline {
  /* Desktop: shrink font and allow more width to fit one line */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  font-size: 2.25rem;
}
@media (max-width: 640px) {
  .try-convo-headline {
    font-size: 1.875rem; /* text-3xl */
    white-space: normal;
    max-width: 100%;
  }
}
.input-error-outline {
  outline: 2px solid #C13232 !important;
  outline-offset: 0px !important;
}
.error-message {
  color: #C13232 !important;
}
</style>