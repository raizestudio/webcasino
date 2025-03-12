<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Api
import { fetchUser } from '@/api/users/users'

// Interfaces
import type { IUser } from '@/interfaces/users/IUser'

// Stores
import { useUsersStore } from '@/stores/users'

const route = useRoute()
const usersStore = useUsersStore()

const user = ref<IUser | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

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

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  console.log(target.files)
  // if (target.files && target.files[0]) {
  //   const file = target.files[0]
  //   const token = localStorage.getItem('token')

  //   if (token) {
  //     try {
  //       const response = await uploadAvatar(token, file)
  //       user.value!.avatar = response.avatar // Update the UI with the new avatar
  //     } catch (error) {
  //       console.error('Error uploading avatar:', error)
  //     }
  //   }
  // }
}
</script>

<template>
  <div class="flex px-10 py-4 grow">
    <div class="flex gap-10 grow">
      <div class="flex flex-col items-center gap-4">
        <div class="w-44 h-44 shadow-lg" @click="triggerFileInput">
          <img
            class="avatar rounded"
            :src="`${user?.avatar}`"
            :alt="`${user?.username}'s avatar`"
          />
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileChange"
            accept="image/*"
          />
        </div>
        <h1 class="text-2xl font-black">{{ user?.username }} profile</h1>
        <div class="flex flex-col items-center">
          <span>VIP Level: {{ usersStore.playerProfile.level }}</span>
          <span>Joined: {{ usersStore.createdAt }}</span>
        </div>
      </div>
      <div class="grow">
        <div class="flex justify-center items-center bg-base-200 min-h-48 rounded">
          <span class="text-xl font-semibold">No games played</span>
        </div>
      </div>
    </div>
  </div>
</template>
