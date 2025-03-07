import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'
import type { IWallet } from '@/interfaces/financial/IWallet'


export const useUsersStore = defineStore('users', () => {
  const isAuth = ref(false)
  const user = ref({} as IUser)
  const wallets = ref([] as IWallet[])

  async function login(userAuth: IUser) {
    console.log("Logging in...")
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

  return { isAuth, user, login, logout, setWallets, wallets }
})
