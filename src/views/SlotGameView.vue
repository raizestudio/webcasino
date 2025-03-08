<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Api
import { fetchGame } from '@/api/games'

// Components
import SlotMachine from '@/components/games/SlotMachine.vue'

// Interfaces 
import type { IGame } from '@/interfaces/games/IGame'

// Stores
import { useGamesStore } from '@/stores/games'

const route = useRoute()
const router = useRouter()

const gamesStore = useGamesStore()

const playingGame = ref<IGame | null>(null)

const findGame = (id: number) => {
  return gamesStore.games.find((game) => game.id === id)
}

if (!Number.isInteger(Number(route.params.id))) {
  router.push({ name: 'home' })
}

if (!gamesStore.categories.length) {
  fetchGame(Number(route.params.id)).then((game) => {
    gamesStore.setGames([game])
    playingGame.value = game
  })
} else {
  playingGame.value = findGame(Number(route.params.id)) || null
}




</script>
<template>
  <div class="grow p-6">
    <h1 class="text-4xl font-black">{{ playingGame?.name }}</h1>
    <SlotMachine />
  </div>
</template>