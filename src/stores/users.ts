import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

import type { IUser } from '@/interfaces/users/IUser'


export const useUsersStore = defineStore('users', () => {
  const isAuth = ref(false)
  const user = ref({} as IUser)

  async function login(userAuth: IUser) {
    console.log("Logging in...")
    isAuth.value = true
    user.value = userAuth
  }

  function logout() {
    isAuth.value = false
  }

  return { isAuth, user, login, logout }
})
