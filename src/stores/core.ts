import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', () => {
  const isLoading = ref(false)
  function setLoading(value: boolean) {
    isLoading.value = value
  }

  return { isLoading, setLoading }
})
