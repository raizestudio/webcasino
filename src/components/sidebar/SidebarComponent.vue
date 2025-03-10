<script setup lang="ts">
// Components
import SupportComponent from '@/components/support/SupportComponent.vue'
import TicketBugComponent from '@/components/support/TicketBugComponent.vue'

// Icons
import IconSupport from '@/components/icons/IconSupport.vue'
import IconBug from '@/components/icons/IconBug.vue'

// Stores
import { useCoreStore } from '@/stores/core'
import { useAuthStore } from '@/stores/auth'

const coreStore = useCoreStore()
const authStore = useAuthStore()

coreStore.fetchApiInfo()
coreStore.setMenus()
</script>

<template>
  <div
    class="flex flex-col gap-4 px-2 py-4 shadow-[4px_0px_6px_-2px_rgba(0,0,0,0.1)] w-86 bg-base-200"
  >
    <div>
      <h2 class="text-xl font-bold">Menu</h2>
    </div>
    <div class="flex flex-col gap-2 grow">
      <router-link
        v-for="menu in coreStore.menus"
        :key="menu.id"
        :to="menu.path"
        class="btn btn-primary"
        >{{ menu.name }}</router-link
      >
    </div>
    <div class="flex flex-col gap-2">
      <button class="btn btn-xs bg-base-100">Documentation</button>
      <button class="btn btn-xs bg-base-100">FAQ</button>
      <button class="btn btn-xs bg-base-100">Whitepaper</button>
    </div>
    <div>
      <div class="flex">
        <div class="flex flex-col justify-end grow">
          <span class="text-xs">API version: {{ coreStore.apiInfo?.api_version || '-' }}</span
          ><span class="text-xs">{{ authStore.session?.id }}</span>
        </div>
        <div class="flex gap-2">
          <button
            class="btn btn-sm fill-base-content hover:fill-error"
            onclick="ticket_bug_modal.showModal()"
          >
            <IconBug width="20" class="transition-all duration-1000 ease-in-out" />
          </button>
          <button
            class="btn btn-sm fill-base-content hover:fill-info"
            onclick="support_modal.showModal()"
          >
            <IconSupport width="20" class="transition-all duration-1000 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
    <TicketBugComponent />
    <SupportComponent />
  </div>
</template>
