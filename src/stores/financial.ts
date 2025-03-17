import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Api
import { fetchExchanges, fetchCurrencies } from '@/api/financial'

// Interfaces
import type { ICurrency } from '@/interfaces/financial/ICurrency'
import type { IExchange } from '@/interfaces/financial/IExchange'

export const useFinancialStore = defineStore('financial', () => {
  const currencies = ref([] as ICurrency[])
  const exchanges = ref([] as IExchange[])

  async function setCurrencies(token?: string) {
    currencies.value = await fetchCurrencies(token).then((data) => data?.results || [])
  }

  async function setExchanges(token?: string) {
    exchanges.value = await fetchExchanges(token).then((data) => data?.results || [])
  }
  return { currencies, exchanges, setCurrencies, setExchanges }
})
