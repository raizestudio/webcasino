import { useFetch } from '@vueuse/core'

export const fetchCategories = async () => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/games/categories/', {
    method: 'GET',
  })
    .post()
    .json()
  
  if (error.value) {
    console.error("Login failed:", error.value)
    return
  }

  console.log("Got categories :", data.value)
  if (data.value) {
    return data.value
  }
}

export const fetchGames = async () => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/games/', {
    method: 'GET',
  })
    .post()
    .json()

  if (error.value) {
    console.error("Login failed:", error.value)
    return
  }

  console.log("Got games :", data.value)
  if (data.value) {
    return data.value
  }
}

export const fetchGame = async (id: number) => {
  const { data, error } = await useFetch(`http://127.0.0.1:8000/games/${id}/`, {
    method: 'GET',
  })
    .post()
    .json()

  if (error.value) {
    console.error("Login failed:", error.value)
    return
  }

  console.log("Got game :", data.value)
  if (data.value) {
    return data.value
  }
}