import { ref } from 'vue'
import { defineStore } from 'pinia'

// Api
import { checkApi, fetchMenus } from '@/api/core'

// Interfaces
import type { IMenu } from '@/interfaces/menu/IMenu'
import type { IApi } from '@/interfaces/core/IApi'

export const useCoreStore = defineStore('core', () => {
  const apiInfo = ref<IApi | null>(null)
  const isSidebarOpen = ref(false)
  const isGlobalLoading = ref(true)
  const isLoading = ref(false)
  const menus = ref<IMenu[]>([])

  function fetchApiInfo() {
    checkApi().then((data) => {
      apiInfo.value = data
    })
  }
  function toggleSidebar(open: boolean) {
    isSidebarOpen.value = open
  }

  function setGlobalLoading(value: boolean) {
    isGlobalLoading.value = value
  }
  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function setMenus() {
    fetchMenus().then((data) => {
      menus.value = data
    })
  }

  return {
    apiInfo,
    isSidebarOpen,
    isGlobalLoading,
    menus,
    fetchApiInfo,
    setGlobalLoading,
    isLoading,
    toggleSidebar,
    setLoading,
    setMenus,
  }
})
