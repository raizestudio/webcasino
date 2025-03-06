<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
import ChatComponent from '@/components/chat/ChatComponent.vue'

</script>
<template>
  <NavbarComponent />
  <main class="flex grow">
    <RouterView />
    <ChatComponent />
  </main>
</template>