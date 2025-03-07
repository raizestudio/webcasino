import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Interfaces
import type { ICurrency } from '@/interfaces/financial/ICurrency'

export const useFinancialStore = defineStore('financial', () => {
  const currencies = ref([] as ICurrency[])
  
  function setCurrencies(currenciesList: ICurrency[]) {
    currencies.value = currenciesList
  }
  return { currencies, setCurrencies }
})
