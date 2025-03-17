import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'

// Interfaces
import type { IPaginationResponse } from '@/interfaces/api/IPaginationResponse'
import type { IExchange } from '@/interfaces/financial/IExchange'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}`

export const fetchCategories = async () => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/games/categories/', {
    method: 'GET',
  })
    .post()
    .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got categories :', data.value)
  if (data.value) {
    return data.value
  }
}

export const fetchGames = async () => {
  const {
    data,
    error,
  }: { data: Ref<IPaginationResponse<IExchange> | null>; error: Ref<unknown | null> } =
    await useFetch<IPaginationResponse<IExchange>>(`${baseUrl}/games/`, {
      method: 'GET',
    })
      .post()
      .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got games :', data.value)
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
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got game :', data.value)
  if (data.value) {
    return data.value
  }
}
