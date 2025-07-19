<script setup lang="ts">
const props = defineProps<{
  onSubmit: (data: { name: string, email: string, company: string }) => void
}>()

const handleSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string
  }
  props.onSubmit(data)
}
</script>

<template>
  <div class="bg-white rounded-3xl px-6 sm:px-10 py-6 sm:py-12 flex flex-col">
    <div class="text-2xl sm:text-4xl text-center">
      Almost there! Help us get your <span class="gradient-text">results</span> to the right place.
    </div>
    <div class="text-sm sm:text-base text-center mt-2 mb-4 sm:mb-6">
      Don't worry, your information will be kept private and confidential
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3 sm:mb-4">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Name
        </div>
        <div class="rounded-2xl shadow outline outline-stone-100">
          <input name="name" type="text" placeholder="Jane Doe"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="mb-3 sm:mb-4">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Company Email
        </div>
        <div class="rounded-2xl shadow outline outline-stone-100">
          <input name="email" type="text" placeholder="janedoe@hoogly.com"
            class="w-full px-3 py-2 sm:py-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-dark/30" />
        </div>
      </div>
      <div class="mb-6 sm:mb-8">
        <div class="text-sm font-normal mb-1 sm:mb-2">
          Company Name
        </div>
        <div class="rounded-2xl shadow outline outline-stone-100">
          <input name="company" type="text" placeholder="Hoogly"
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