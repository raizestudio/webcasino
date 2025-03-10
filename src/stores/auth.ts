import { ref } from 'vue'
import { defineStore } from 'pinia'

// Api
import { getIPInfo } from '@/api/ipinfo'
import { createSessionIpInfo } from '@/api/auth'

// Interfaces
import type { ISession } from '@/interfaces/auth/ISession'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<ISession | null>(null)
  
  function setIPInfo() {
    getIPInfo().then((data) => {
      createSessionIpInfo(data.ipAddress).then((data) => {
        session.value = data
      })
    })
  }
  return { session, setIPInfo }
})
