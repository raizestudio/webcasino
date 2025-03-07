<script setup lang="ts">
import { ref } from 'vue'

// Stores
import { useUsersStore } from '@/stores/users'
import { useCoreStore } from '@/stores/core'

// Api
import { authenticateUser } from '@/api/auth'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'

const userStore = useUsersStore()
const coreStore = useCoreStore()

const email = ref('')
const password = ref('')

const handleLogin = async (e: Event) => {
  e.preventDefault()
  coreStore.setLoading(true)
  let user: IUser | null = null
  user = await authenticateUser(email.value, password.value)
  console.log(`Authenticated user:`)
  console.log(user)
  if (user) {
    userStore.login(user)
  }
  coreStore.setLoading(false)
  if (userStore.isAuth) {
    const loginModal = document.getElementById('login_modal')
    if (loginModal) {
      loginModal.close();
    }
  }
}
</script>

<template>
  <h3 class="text-lg font-bold">Authentication</h3>
  <p class="py-4">Please enter id</p>
  <form class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-2 px-6">
      <div class="flex flex-col w-full">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="text"
          class="input input-bordered w-full"
          placeholder="Email"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          class="input input-bordered w-full"
          placeholder="Password"
        />
      </div>
    </div>
    <button class="btn" @click="(e) => handleLogin(e)" v-bind:disabled="coreStore.isLoading">
      <span v-if="!coreStore.isLoading">Login</span><span v-else class="loading loading-spinner loading-sm"></span>
    </button>
  </form>
</template>
