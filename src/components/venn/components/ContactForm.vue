<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  onSubmit: (data: { name: string, email: string, company: string }) => void
}>()

onMounted(() => {
  // Add Pipedrive loader script
  const script = document.createElement('script')
  script.src = 'https://webforms.pipedrive.com/f/loader'
  script.async = true
  document.body.appendChild(script)

  // Initialize form after script loads
  script.onload = () => {
    // Force Pipedrive to reinitialize forms
    if (window.pipedriveLeadboosterConfig) {
      window.pipedriveLeadboosterConfig.reinitialize()
    }
  }

  // Listen for Pipedrive form submission
  window.addEventListener('message', (event) => {
    // Verify the message is from Pipedrive
    if (event.data.type === 'webform-submit' && event.data.webformId === '6NfI0dT637Lde4QFsodmF9tccap6XBi0S9eKSrHmVt8M3an43Z26sLfm0g5vzsXutJ') {
      // Extract form data
      const formData = event.data.data;
      const data = {
        name: formData.name || '',
        email: formData.email || '',
        company: formData.organization || '' // Pipedrive uses 'organization' instead of 'company'
      }
      // Short delay to allow Pipedrive's success message to show
      setTimeout(() => {
        props.onSubmit(data)
      }, 2000)
    }
  })
})
</script>

<template>
  <div class="bg-white rounded-3xl px-6 sm:px-10 py-10 sm:py-20 flex flex-col">
    <div class="try-convo-headline text-3xl sm:text-5xl text-center gradient-text">
      Get your Results
    </div>
    <div class="text-sm sm:text-base text-center mt-2 mb-4 sm:mb-6">
      Don't worry, your information will be kept private and confidential
    </div>
    <div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/6NfI0dT637Lde4QFsodmF9tccap6XBi0S9eKSrHmVt8M3an43Z26sLfm0g5vzsXutJ"></div>
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