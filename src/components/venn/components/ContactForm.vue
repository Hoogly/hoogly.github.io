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
  <div class="bg-white rounded-3xl px-10 py-12 flex flex-col">
    <div class="text-4xl text-center">
      Almost there! Help us get your <span class="gradient-text">results</span> to the right place.
    </div>
    <div class="text-xs">
      Don't worry, your information will be kept private and confidential
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <div class="text-sm font-normal mb-2">
          Name
        </div>
        <div class="rounded-2xl shadow"
             :class="hasSubmitted && !nameValue ? 'outline outline-red-500' : 'outline outline-stone-100'">
          <input name="name" type="text" placeholder="Jane Doe" v-model="nameValue"
            class="w-full px-3 py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="mb-4">
        <div class="text-sm font-normal mb-2">
          Company Email
        </div>
        <div class="rounded-2xl shadow"
             :class="hasSubmitted && !emailValue ? 'outline outline-red-500' : 'outline outline-stone-100'">
          <input name="email" type="text" placeholder="janedoe@hoogly.com" v-model="emailValue"
            class="w-full px-3 py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="mb-8">
        <div class="text-sm font-normal mb-2">
          Company Name
        </div>
        <div class="rounded-2xl shadow"
             :class="hasSubmitted && !companyValue ? 'outline outline-red-500' : 'outline outline-stone-100'">
          <input name="company" type="text" placeholder="Hoogly" v-model="companyValue"
            class="w-full px-3 py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <button type="submit" class="bg-orange rounded-full py-3 px-6 text-white text-center">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>