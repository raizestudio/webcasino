<script setup lang="ts">
import { ref } from 'vue'
import { Field, Form } from 'vee-validate'

// Api
import { authenticateUser } from '@/api/auth'

// Icons
import IconGoogle from '@/components/icons/IconGoogle.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconX from '@/components/icons/IconX.vue'
import IconReddit from '@/components/icons/IconReddit.vue'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'

// Stores
import { useUsersStore } from '@/stores/users'
import { useCoreStore } from '@/stores/core'
import { useToastStore } from '@/stores/toast'

const userStore = useUsersStore()
const coreStore = useCoreStore()
const toastStore = useToastStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  // e.preventDefault()
  coreStore.setLoading(true)
  let user: IUser | null = null
  user = await authenticateUser(email.value, password.value)
  console.log(`Authenticated user:`)
  console.log(user)
  if (user) {
    userStore.login(user)
    userStore.getPlayerProfile()
  }
  coreStore.setLoading(false)
  if (userStore.isAuth) {
    const loginModal = document.getElementById('login_modal')
    if (loginModal) {
      ;(loginModal as HTMLDialogElement).close()
    }
    toastStore.addToast({
      id: 'login',
      message: 'You have successfully logged in',
    })
  }
}

const validateEmail = (value: unknown) => {
  if (typeof value !== 'string') {
    return 'Invalid email'
  }

  if (!value) {
    return 'Email is required'
  } else if (!value.includes('@')) {
    return 'Invalid email'
  }

  return true
}

const validatePassword = (value: unknown) => {
  if (typeof value !== 'string') {
    return 'Invalid password'
  }

  if (!value) {
    return 'Password is required'
  }

  return true
}
</script>

<template>
  <dialog id="login_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="flex flex-col gap-4">
        <h3 class="text-xl font-black">Authentication</h3>
        <Form class="flex flex-col gap-8 pt-8" @submit="handleLogin">
          <div class="flex flex-col items-center gap-2 px-6">
            <div class="flex flex-col w-full gap-2">
              <label for="email">Email</label>
              <Field name="email" v-slot="{ field, errorMessage }" :rules="validateEmail">
                <input
                  v-model="email"
                  v-bind="field"
                  :class="`input input-bordered w-full ${errorMessage ? 'input-error' : ''}`"
                  type="text"
                />
                <span>{{ errorMessage }}</span>
              </Field>
            </div>
            <div class="flex flex-col w-full">
              <label for="password">Password</label>
              <Field name="password" v-slot="{ field, errorMessage }" :rules="validatePassword">
                <input
                  v-model="password"
                  v-bind="field"
                  :class="`input input-bordered w-full ${errorMessage && 'input-error'}`"
                  type="password"
                />
                <span class="text-sm">Hint: Enter a secure password you can remember</span>
                <span>{{ errorMessage }}</span>
              </Field>
            </div>
          </div>
          <button
            class="btn"
            v-bind:disabled="coreStore.isLoading || !email || !password"
            type="submit"
          >
            <span v-if="!coreStore.isLoading">Login</span
            ><span v-else class="loading loading-spinner loading-sm"></span>
          </button>
        </Form>
        <div class="divider"></div>
        <div class="flex justify-evenly">
          <div class="btn hover:btn-primary h-auto px-4 py-2">
            <IconGoogle class="w-10 h-10 fill-base-content" />
          </div>
          <div class="btn hover:btn-primary h-auto px-4 py-2">
            <IconFacebook class="w-10 h-10 fill-base-content" />
          </div>
          <div class="btn hover:btn-primary h-auto px-4 py-2">
            <IconX class="w-10 h-10 fill-base-content" />
          </div>
          <div class="btn hover:btn-primary h-auto px-4 py-2">
            <IconReddit class="w-10 h-10 fill-base-content" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-center text-sm">Don't have an account? <a href="#">Sign up</a></p>
          <p class="text-center text-sm">Forgot your password? <a href="#">Reset password</a></p>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
