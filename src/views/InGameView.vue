<script setup lang="ts">
import { useRoute } from 'vue-router'

// Components
import CoinFlip from '@/components/games/CoinFlip.vue'
</script>

<template>
  <div class="grow">
    <h1>InGameView</h1>
    <CoinFlip />
  </div>
</template>
