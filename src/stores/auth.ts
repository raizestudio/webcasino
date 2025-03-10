import { ref } from 'vue'
import { defineStore } from 'pinia'

// Api
import { getIPInfo } from '@/api/ipinfo'

// Interfaces
import type { ISession } from '@/interfaces/auth/ISession'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<ISession | null>(null)

  function setIPInfo() {
    getIPInfo().then((data) => {
      session.value = data
    })
  }
  return { session, setIPInfo }
})
