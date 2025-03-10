<script setup lang="ts">
// Interfaces
// import type { IToast } from '@/interfaces/toast/IToast'

// Stores
import { useToastStore } from '@/stores/toast'
const toastStore = useToastStore()

// const devToasts: IToast[] = [{ id: '1', message: 'Hello, World!' }]

// devToasts.forEach((toast: IToast) => {
//   toastStore.addToast(toast)
// })
</script>

<template>
  <div class="toast toast-top z-50 top-20 right-10 w-80">
    <div class="stack stack-top">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="alert bg-base-200 flex flex-col justify-start items-start p-4"
      >
        <div v-if="toast.title" class="flex justify-between items-center w-full">
          <span>{{ toast.title }}</span>
          <!-- <button @click="toastStore.removeToast(toast.id)" class="btn btn-ghost btn-circle">
            X
          </button> -->
        </div>
        <div>
          <span>{{ toast.message }}.</span>
        </div>
      </div>
    </div>
  </div>
</template>
