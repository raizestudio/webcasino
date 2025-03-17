<script setup lang="ts">
defineProps<{
  text: unknown
}>()
</script>

<template>
  <div>{{ text ? text : '-' }}</div>
</template>
