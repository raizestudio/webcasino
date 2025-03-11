<script setup lang="ts">
// Icons
import IconFlask from '@/components/icons/IconFlask.vue'

const appName = import.meta.env.VITE_APP_NAME
const env = import.meta.env.DEV ? 'dev' : 'prod'
</script>

<template>
  <router-link to="/" class="flex items-center gap-2">
    <div v-if="env === 'dev'" class="bg-warning rounded p-0.5"><IconFlask class="fill-base-100 w-6 h-6" /></div>
    <span class="text-3xl font-black font-kneewave select-none">{{ appName }}</span></router-link
  >
</template>
