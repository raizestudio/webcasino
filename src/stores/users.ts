import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Api
import { retrievePlayerProfile } from '@/api/users/playerProfile'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'
import type { IPlayerProfile } from '@/interfaces/users/IPlayerProfile'
import type { IWallet } from '@/interfaces/financial/IWallet'

export const useUsersStore = defineStore('users', () => {
  const isAuth = ref(false)
  const user = ref({} as IUser)
  const playerProfile = ref({} as IPlayerProfile)
  const wallets = ref([] as IWallet[])

  const createdAt = computed(() => {
    return new Date(user.value.created_at).toLocaleDateString()
  })

  async function login(userAuth: IUser) {
    console.log('Logging in...')
    isAuth.value = true
    user.value = userAuth
  }

  function logout() {
    isAuth.value = false
    user.value = {} as IUser
  }

  function setWallets(walletsList: IWallet[]) {
    wallets.value = walletsList
  }

  function getPlayerProfile(userId?: string) {
    const token = localStorage.getItem('token')
    if (token) {
      retrievePlayerProfile(token, String(user.value.id || userId)).then((data) => {
        if (data) {
          playerProfile.value = data
        }
      })
    }
  }
  return {
    isAuth,
    user,
    playerProfile,
    wallets,
    createdAt,
    login,
    logout,
    setWallets,
    getPlayerProfile,
  }
})
