<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
import SidebarComponent from '@/components/sidebar/SidebarComponent.vue'
import ChatComponent from '@/components/chat/ChatComponent.vue'
import ToastComponent from '@/components/toast/ToastComponent.vue'
import GlobalLoadingComponent from '@/components/loading/GlobalLoadingComponent.vue'

// Stores
import { useCoreStore } from '@/stores/core'
import { useChatStore } from '@/stores/chat'

const coreStore = useCoreStore()
const chatStore = useChatStore()
</script>

<template>
  <GlobalLoadingComponent v-if="coreStore.isGlobalLoading" />
  <div class="h-screen" v-else>
    <ToastComponent />
    <NavbarComponent />
    <main class="flex grow h-[calc(100vh-64px)]">
      <Transition><SidebarComponent v-if="coreStore.isSidebarOpen" /></Transition>
      <RouterView />
      <Transition><ChatComponent v-if="chatStore.isChatOpen" /></Transition>
    </main>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
