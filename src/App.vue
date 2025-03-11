<script setup lang="ts">
import { watch } from 'vue'

// Components
import BaseLayout from '@/layouts/BaseLayout.vue'

// Stores
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

if (themeStore.theme === 'dark' || themeStore.theme === 'light') {
  document.documentElement.setAttribute('data-theme', themeStore.theme)
}

watch(() => themeStore.theme, (theme) => {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme')
    return
  }
  document.documentElement.setAttribute('data-theme', theme)
})
</script>

<template>
  <BaseLayout />
</template>
