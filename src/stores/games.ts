import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Interfaces 
import type { IGame, IGameCategory } from '@/interfaces/games/IGame'

export const useGamesStore = defineStore('games', () => {
  const games = ref<IGame[]>([])
  const categories = ref<IGameCategory[]>([])

  function setCategories(value: IGameCategory[]) {
    categories.value = value
  }

  function setGames(value: IGame[]) {
    games.value = value
  }
  // function setLoading(value: boolean) {
  //   isLoading.value = value
  // }

  return { games, categories, setCategories, setGames }
})
