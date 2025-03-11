<script setup lang="ts">
// Components
import ProfileComponent from '@/components/navbar/NavbarProfileComponent.vue'
import LoginComponent from '@/components/login/LoginComponent.vue'
import WalletNavbarComponent from '@/components/wallet/WalletNavbarComponent.vue'
import NavbarTitleComponent from '@/components/navbar/NavbarTitleComponent.vue'

// Icons
import IconList from '@/components/icons/IconList.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import IconChat from '@/components/icons/IconChat.vue'

// Stores
import { useCoreStore } from '@/stores/core'
import { useUsersStore } from '@/stores/users'
import { useChatStore } from '@/stores/chat'

const coreStore = useCoreStore()
const usersStore = useUsersStore()
const chatStore = useChatStore()


</script>

<template>
  <header class="px-6 shadow navbar">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <div class="navbar-start gap-4">
      <button
        class="btn btn-ghost"
        @click="() => coreStore.toggleSidebar(!coreStore.isSidebarOpen)"
      >
        <IconList width="26" />
      </button>
      <NavbarTitleComponent />
    </div>
    <div class="navbar-end gap-4">
      <!-- <router-link to="/games" class="btn btn-ghost">Games</router-link> -->
      <button v-if="!usersStore.isAuth" class="btn btn-ghost" onclick="login_modal.showModal()">
        <IconProfile width="24" />
        <!-- <span>Connecter</span> -->
      </button>
      <!-- <div v-if="usersStore.isAuth" class="flex items-center gap-6"> -->
      <WalletNavbarComponent v-if="usersStore.isAuth" />
      <ProfileComponent v-if="usersStore.isAuth" />
      <!-- </div> -->
      <button class="btn btn-ghost" @click="() => chatStore.toggleChat(!chatStore.isChatOpen)">
        <IconChat width="24" />
      </button>
    </div>
    <LoginComponent />
  </header>
</template>
