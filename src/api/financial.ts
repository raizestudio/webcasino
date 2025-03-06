import { useFetch } from '@vueuse/core'

export const fetchCurrencies = async () => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/financial/currencies/', {
    method: 'GET',
  })
    .post()
    .json()

  if (error.value) {
    console.error("Login failed:", error.value)
    return
  }

  console.log("Got currencies :", data.value)
  if (data.value) {
    return data.value
  }
}