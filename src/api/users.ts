import { useFetch } from '@vueuse/core'

export const fetchUser = async (token: string) => {
  const { data, error } = await useFetch('http://127/0.0.1:8000/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
    .get()
    .json()

  if (error.value) {
    console.error("Fetch user failed:", error.value)
    return
  }

  console.log("Fetch user successful:", data.value)
  return data.value
}