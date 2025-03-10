<script setup lang="ts">
import { ref, computed } from 'vue'

// Api
import { fetchCurrencies, fetchWallets } from '@/api/financial'

// Stores
import { useUsersStore } from '@/stores/users'
import { useFinancialStore } from '@/stores/financial'

const usersStore = useUsersStore()
const financialStore = useFinancialStore()

const token = localStorage.getItem('token')

fetchCurrencies().then((fetchedCurrencies) => {
  financialStore.setCurrencies(fetchedCurrencies)
})

fetchWallets(token).then((fetchedWallets) => {
  usersStore.setWallets(fetchedWallets)
})

const getWalletBalanceFromCurrencyName = (currencyId: string) => {
  const wallet = usersStore.wallets.find((wallet) => wallet.currency_id === currencyId)
  return wallet ? wallet.balance : 0
}

const getMostValuableCurrency = computed(() => {
  const mostValuableCurrency = usersStore.wallets.reduce(
    (acc, wallet) => {
      if (wallet.balance > acc.balance) {
        return wallet
      }
      return acc
    },
    { balance: 0 },
  )

  const currency = financialStore.currencies.find(
    (currency) => currency.code === mostValuableCurrency.currency,
  )
  return {
    currency: currency,
    balance: mostValuableCurrency.balance,
  }
})
</script>

<template>
  <div class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="relative flex items-center cursor-pointer bg-base-200 hover:opacity-80 pl-12 pr-6 py-2.5 rounded-full select-none gap-2"
    >
      <div
        class="absolute flex justify-center items-center bg-primary rounded-full w-9 h-9 left-1 shadow-lg"
      >
        <span>{{ getMostValuableCurrency.currency?.code }}</span>
      </div>
      <div class="flex gap-0.5">
        <span>{{ getMostValuableCurrency.balance }}</span>
        <span>{{ getMostValuableCurrency.currency?.symbol }}</span>
      </div>
    </div>
    <div
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <div
        v-for="currency in financialStore.currencies"
        :key="currency.code"
        class="flex justify-between items-center"
      >
        <span>{{ currency.name }}</span>
        <span class="badge"
          >{{ getWalletBalanceFromCurrencyName(currency.code) }}{{ currency.symbol }}</span
        >
      </div>
    </div>
  </div>
</template>
