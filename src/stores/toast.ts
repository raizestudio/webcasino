import { ref } from 'vue'
import { defineStore } from 'pinia'

// Interfaces
import type { IToast } from '@/interfaces/toast/IToast'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<IToast[]>([])

  const addToast = (toast: IToast) => {
    toasts.value.push(toast)
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id)
    }, toast.duration || 5000)
  }

  return { toasts, addToast }
})
