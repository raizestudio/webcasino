<script setup lang="ts">
import { useRouter } from 'vue-router'

// Api
import { logoutUser } from '@/api/auth'

// Stores
import { useUsersStore } from '@/stores/users'

const router = useRouter()
const usersStore = useUsersStore()

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
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="flex items-center cursor-pointer">
      <div tabindex="0" role="button" class="avatar">
        <div class="w-9 h-9 rounded-full">
          <img alt="Tailwind CSS Navbar component" :src="`${usersStore.user.avatar}`" />
        </div>
      </div>
      <div class="px-2 h-8 flex items-center rounded">
        <span class="select-none">{{ usersStore.user.username }}</span>
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <li>
        <router-link to="/users/profile" class="justify-between">
          Profile
          <span class="badge">New</span>
        </router-link>
      </li>
      <li><a>Settings</a></li>
      <li @click="handleLogout"><a>Logout</a></li>
    </ul>
  </div>
</template>
