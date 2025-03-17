<script setup lang="ts">
defineProps<{
  text: unknown
}>()
</script>

<template>
  <div class="text-right">{{ text ? text : '-' }}</div>
</template>
