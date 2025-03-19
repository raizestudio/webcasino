import { useFetch } from '@vueuse/core'
import type { Ref } from 'vue'

// Interfaces
import type { IPaginationResponse } from '@/interfaces/api/IPaginationResponse'
import type { IExchange } from '@/interfaces/financial/IExchange'
import type { ICurrency } from '@/interfaces/financial/ICurrency'
import type { IPool } from '@/interfaces/financial/IPool'

const apiProtocol = import.meta.env.VITE_API_PROTOCOL
const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const baseUrl = `${apiProtocol}://${apiHost}:${apiPort}`

export const fetchCurrencies = async (token?: string) => {
  const {
    data,
    error,
  }: { data: Ref<IPaginationResponse<ICurrency> | null>; error: Ref<unknown | null> } =
    await useFetch<IPaginationResponse<ICurrency>>(`${baseUrl}/financial/currencies/`, {
      method: 'GET',
      headers: token ? { Authorization: `Token ${token}` } : {},
    })
      .post()
      .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got currencies :', data.value)
  if (data.value) {
    return data.value
  }
}

export const fetchWallets = async (token?: string) => {
  const { data, error } = await useFetch('http://127.0.0.1:8000/financial/wallets/', {
    method: 'GET',
    headers: token ? { Authorization: `Token ${token}` } : {},
  })
    .post()
    .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got wallets :', data.value)
  if (data.value) {
    return data.value
  }
}

export const fetchExchanges = async (token?: string) => {
  const {
    data,
    error,
  }: { data: Ref<IPaginationResponse<IExchange> | null>; error: Ref<unknown | null> } =
    await useFetch<IPaginationResponse<IExchange>>('http://127.0.0.1:8000/financial/exchanges/', {
      method: 'GET',
      headers: token ? { Authorization: `Token ${token}` } : {},
    })
      .get()
      .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got exchanges :', data.value)
  if (data.value) {
    return data.value
  }
}

export const fetchPools = async (token?: string) => {
  const {
    data,
    error,
  }: { data: Ref<IPaginationResponse<IPool> | null>; error: Ref<unknown | null> } = await useFetch<
    IPaginationResponse<IPool>
  >(`${baseUrl}/financial/pools/`, {
    method: 'GET',
    headers: token ? { Authorization: `Token ${token}` } : {},
  })
    .post()
    .json()

  if (error.value) {
    console.error('Login failed:', error.value)
    return
  }

  console.log('Got pools :', data.value)
  if (data.value) {
    return data.value.results
  }
}
