<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Api
import { logoutUser } from '@/api/auth'

// Components
import LoginComponent from '@/components/login/LoginComponent.vue'
import WalletNavbarComponent from '@/components/wallet/WalletNavbarComponent.vue'

// Icons
import ProfileIcon from '@/components/icons/ProfileIcon.vue'

// Stores
import { useUsersStore } from '@/stores/users'

const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const apiProtocol = import.meta.env.VITE_API_PROTOCOL

const router = useRouter()
const usersStore = useUsersStore()

const appName = import.meta.env.VITE_APP_NAME

const handleLogout = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    usersStore.logout()
    router.push('/')
    return
  }
  logoutUser(token).then(() => {
    usersStore.logout()
    localStorage.removeItem('token')
    router.push('/')
  })
}

</script>

<template>
  <header class="px-6 shadow navbar">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <div class="navbar-start">
      <RouterLink to="/" class=""
        ><span class="text-3xl font-black font-kneewave">{{ appName }}</span></RouterLink
      >
    </div>
    <div class="navbar-end">
      <router-link to="/games" class="btn btn-ghost">Games</router-link>
      <button v-if="!usersStore.isAuth" class="btn btn-ghost" onclick="login_modal.showModal()">
        <ProfileIcon />
        <!-- <span>Connecter</span> -->
      </button>
      <div v-else class="flex items-center gap-6">
        <WalletNavbarComponent />
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="flex items-center cursor-pointer">
            <div tabindex="0" role="button" class="avatar translate-x-4">
              <div class="w-10 h-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  :src="`${apiProtocol}://${apiHost}:${apiPort}${usersStore.user.avatar}`"
                />
              </div>
            </div>
            <div class="px-6 h-8 flex items-center rounded">
              <span class="select-none">{{ usersStore.user.username }}</span>
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li @click="handleLogout"><a>Logout</a></li>
          </ul>
        </div>
      </div>
      <!-- <nav class="flex gap-4"> -->
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <!-- <RouterLink to="/about">About</RouterLink> -->
      <!-- </nav> -->
    </div>
    <dialog id="login_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <LoginComponent />
        <!-- <div class="modal-action"> -->

        <!-- </div> -->
      </div>
      <form method="dialog" class="modal-backdrop">
        <!-- if there is a button in form, it will close the modal -->
        <button>close</button>
      </form>
    </dialog>
  </header>
</template>
