import { useFetch } from '@vueuse/core'

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
  const { data, error } = await useFetch(`${baseUrl}/app/menus/`).get().json()

  if (error.value) {
    console.error('Fetch menus failed:', error.value)
    return
  }

  console.log('Fetch menus successful:', data.value)
  return data.value
}
