<script setup lang="ts">
// Components
import LoginComponent from '@/components/login/LoginComponent.vue'

// Icons
import ProfileIcon from '@/components/icons/ProfileIcon.vue'

// Stores
import { useUsersStore } from '@/stores/users'

const userStore = useUsersStore()
</script>

<template>
  <header class="px-6 shadow navbar">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <div class="navbar-start">
      <RouterLink to="/" class=""
        ><span class="text-3xl font-black font-kneewave">WebCasino</span></RouterLink
      >
    </div>
    <div class="navbar-end">
      <button v-if="!userStore.isAuth" class="btn btn-ghost" onclick="login_modal.showModal()">
        <ProfileIcon />
        <!-- <span>Connecter</span> -->
      </button>
      <div v-else class="flex items-center gap-6">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="flex items-center cursor-pointer">0.00</div>
          <div
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            qsd
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="flex items-center cursor-pointer">
            <div tabindex="0" role="button" class="avatar translate-x-4">
              <div class="w-10 h-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div class="px-6 h-8 flex items-center rounded">
              <span class="select-none">{{ userStore.user.username }}</span>
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
            <li><a>Logout</a></li>
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
