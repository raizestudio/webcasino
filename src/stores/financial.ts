import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchExchanges, fetchCurrencies, fetchPools } from '@/api/financial'

// Interfaces
import type { ICurrency } from '@/interfaces/financial/ICurrency'
import type { IExchange } from '@/interfaces/financial/IExchange'
import type { IPool } from '@/interfaces/financial/IPool'

export const useFinancialStore = defineStore('financial', () => {
  const currencies = ref([] as ICurrency[])
  const exchanges = ref([] as IExchange[])
  const pools = ref([] as IPool[])

  async function setCurrencies(token?: string) {
    currencies.value = await fetchCurrencies(token).then((data) => data?.results || [])
  }

  async function setExchanges(token?: string) {
    exchanges.value = await fetchExchanges(token).then((data) => data?.results || [])
  }

  async function setPools(token?: string) {
    pools.value = await fetchPools(token).then((data) => data || [])
  }
  return { currencies, exchanges, pools, setCurrencies, setExchanges, setPools }
})
