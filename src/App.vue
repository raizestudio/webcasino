<script setup lang="ts">
// import { RouterView } from 'vue-router'

// Components
import BaseLayout from '@/layouts/BaseLayout.vue'

// Api
import { authenticateUserFromToken } from "@/api/auth";

// Stores
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

const token = localStorage.getItem('token')
if (!usersStore.isAuth && token) {
  authenticateUserFromToken(token)
    .then((user) => {
      if (!user) {
        return
      }
      usersStore.login(user)
    })
    .catch(() => {
      console.log('Went in catch and remove token')
      localStorage.removeItem('token')
    })
}
</script>

<template>
  <BaseLayout />
</template>