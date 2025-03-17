<script setup lang="ts">
// Icons
import IconCheck from '@/components/icons/IconCheck.vue'
import IconXCancel from '@/components/icons/IconXCancel.vue'
defineProps<{
  text: unknown
}>()
</script>

<template>
  <div class="text-right">
    <IconCheck v-if="text" class="fill-success w-6 h-6" />
    <IconXCancel v-else class="fill-error w-6 h-6" />
  </div>
</template>
