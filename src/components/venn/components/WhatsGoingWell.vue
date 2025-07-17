<script setup lang="ts">
import { useDocument } from 'vuefire';
import { getWhatsGoingWellDoc } from '../firebase'
import type { WhatsGoingWell } from '../types'
import { computed } from 'vue';

const whatsGoingWell = useDocument<WhatsGoingWell>(computed(() => getWhatsGoingWellDoc()), {
    ssrKey: 'whats-going-well'
})

</script>   
<template>
    <div class="bg-white rounded-xl px-6 py-8">
        <div class="flex flex-col">
            <div class="text-center justify-center text-dark text-xl font-semibold leading-loose">
                🎉 What's Going Well
            </div>
            <div class="text-center justify-center text-body-dark-1 text-xs font-normal">
                Positive things your employees have said in the last survey
            </div>
            <div class="text-xs font-medium mt-5">
                {{ whatsGoingWell?.title }}
            </div>
            <div class="text-xs">
                {{ whatsGoingWell?.description }}
            </div>
        </div>
    </div>
</template>