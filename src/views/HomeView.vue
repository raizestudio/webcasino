<script setup lang="ts">
// Api
import { fetchGames, fetchCategories } from '@/api/games'

// Stores
import { useGamesStore } from '@/stores/games'

const gamesStore = useGamesStore()

fetchCategories().then((categories) => {
  console.log(categories)
  gamesStore.setCategories(categories)
})

fetchGames().then((games) => {
  console.log(games)
  gamesStore.setGames(games)
})

const env = import.meta.env.DEV
</script>

<template>
  <div class="flex flex-col px-10 py-4 grow">
    <div class="flex flex-col gap-4">
      <h1 class="text-4xl font-bold">Games {{ env }}</h1>
      <div class="relative flex gap-4 overflow-x-hidden max-w-[calc(100vw-600px)]">
        <div class="gap-4 carousel rounded-box">
          <div v-for="game in gamesStore.games" :key="game.id" class="carousel-item">
            <div class="w-64 h-80 shadow-sm card bg-base-200">
              <figure>
                <img :src="`${game.preview_image}`" :alt="game.name" class="bg-cover" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">{{ game.name }}</h2>
                <div class="justify-end card-actions">
                  <!-- <button class="btn btn-primary">Jouer</button> -->
                  <RouterLink
                    :to="{ name: 'game_slot', params: { id: game.id } }"
                    class="btn btn-primary"
                    >Jouer</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
