import { useFetch } from '@vueuse/core'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}`

export const fetchUser = async (token: string, userId: string) => {
  const { data, error } = await useFetch(`${baseUrl}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .get()
    .json()

  if (error.value) {
    console.error('Fetch user failed:', error.value)
    return
  }

  console.log('Fetch user successful:', data.value)
  return data.value
}
