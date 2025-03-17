import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchCategories, fetchGames } from '@/api/games'

// Interfaces
import type { IGame, IGameCategory } from '@/interfaces/games/IGame'

export const useGamesStore = defineStore('games', () => {
  const games = ref<IGame[]>([])
  const categories = ref<IGameCategory[]>([])

  function setCategories(value: IGameCategory[]) {
    categories.value = value
  }

  async function setGames() {
    games.value = await fetchGames().then((data) => data?.results || [])
  }
  // function setLoading(value: boolean) {
  //   isLoading.value = value
  // }

  return { games, categories, setCategories, setGames }
})
