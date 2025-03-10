<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Api
import { fetchUser } from '@/api/users'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'

// Stores
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const route = useRoute()

const user = ref<IUser | null>(null)

if (route.params.id) {
  console.log(route.params.id)
  const token = localStorage.getItem('token')
  if (!token) {
    user.value = usersStore.user
  } else {
    // route.params.id must be a string
    fetchUser(token, route.params.id as string).then((data) => {
      user.value = data
    })
  }
} else {
  user.value = usersStore.user
}

watch(
  () => route.params.id,
  (id) => {
    if (id) {
      const token = localStorage.getItem('token')
      if (!token) {
        user.value = usersStore.user
      } else {
        fetchUser(token, id as string).then((data) => {
          user.value = data
        })
      }
    } else {
      user.value = usersStore.user
    }
  },
)
</script>

<template>
  <div class="flex px-10 py-4 grow">
    <div class="flex gap-10 grow">
      <div class="flex flex-col items-center gap-4">
        <div class="w-44 h-44 shadow-lg">
          <img
            class="avatar rounded"
            :src="`${user?.avatar}`"
            :alt="`${user?.username}'s avatar`"
          />
        </div>
        <h1 class="text-2xl font-black">{{ user?.username }} profile</h1>
      </div>
      <div class="grow">
        <div class="flex justify-center items-center bg-base-200 min-h-48 rounded">
          <span class="text-xl font-semibold">No games played</span>
        </div>
      </div>
    </div>
  </div>
</template>
