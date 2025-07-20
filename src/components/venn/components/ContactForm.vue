<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  onSubmit: (data: { name: string, email: string, company: string }) => void
}>()

const hasSubmitted = ref(false)
const nameValue = ref('')
const emailValue = ref('')
const companyValue = ref('')

const handleSubmit = (event: Event) => {
  event.preventDefault()
  
  // Check if all fields are filled
  if (!nameValue.value.trim() || !emailValue.value.trim() || !companyValue.value.trim()) {
    hasSubmitted.value = true
    return
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
    <div class="text-3xl sm:text-5xl text-center">
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
             :class="hasSubmitted && !nameValue ? 'outline outline-red-500' : 'outline outline-stone-100'">
          <input name="name" type="text" placeholder="Jane Doe" v-model="nameValue"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="mb-6 sm:mb-8">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Company Email
        </div>
        <div class="rounded-2xl shadow"
             :class="hasSubmitted && !emailValue ? 'outline outline-red-500' : 'outline outline-stone-100'">
          <input name="email" type="text" placeholder="janedoe@hoogly.com" v-model="emailValue"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="mb-6 sm:mb-8">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Company Name
        </div>
        <div class="rounded-2xl shadow"
             :class="hasSubmitted && !companyValue ? 'outline outline-red-500' : 'outline outline-stone-100'">
          <input name="company" type="text" placeholder="Hoogly" v-model="companyValue"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center mt-6 sm:mt-8">
        <button type="submit" class="bg-orange rounded-full py-2 sm:py-3 px-6 text-white text-center">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>