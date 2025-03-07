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

export const fetchWallets = async (token: string) => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/financial/wallets/', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
    .post()
    .json()

  if (error.value) {
    console.error("Login failed:", error.value)
    return
  }

  console.log("Got wallets :", data.value)
  if (data.value) {
    return data.value
  }
}