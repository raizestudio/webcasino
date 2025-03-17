import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'

// Interfaces
import type { IPaginationResponse } from '@/interfaces/api/IPaginationResponse'
import type { IMenu } from '@/interfaces/menu/IMenu'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}`

export const checkApi = async () => {
  const { data, error } = await useFetch(`${baseUrl}/`).get().json()

  if (error.value) {
    console.error('API check failed:', error.value)
    return
  }

  console.log('API check successful:', data.value)
  return data.value
}

export const fetchMenus = async () => {
  const {
    data,
    error,
  }: { data: Ref<IPaginationResponse<IMenu> | null>; error: Ref<unknown | null> } = await useFetch<
    IPaginationResponse<IMenu>
  >(`${baseUrl}/app/menus/`)
    .get()
    .json()

  if (error.value) {
    console.error('Fetch menus failed:', error.value)
    return
  }

  console.log('Fetch menus successful:', data.value)
  return data.value
}
