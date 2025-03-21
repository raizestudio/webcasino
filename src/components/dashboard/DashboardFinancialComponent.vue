<script setup lang="ts">
import { computed } from 'vue'

// Stores
import { useFinancialStore } from '@/stores/financial'

// Components
import ChartComponent from '@/components/charts/ChartComponent.vue'
import TableComponent from '@/components/tables/TableComponent.vue'

const financialStore = useFinancialStore()

const currenciesHeaders = [
  'Code',
  'Name',
  'Minor unit',
  'Symbol',
  'Can deposit',
  'Can withdraw',
  'Is free',
  'Is crypto',
]
const currenciesOptionsConfig = {
  code: 'text',
  name: 'text',
  minor_unit: 'number',
  symbol: 'text',
  can_deposit: 'boolean',
  can_withdraw: 'boolean',
  is_free: 'boolean',
  is_crypto: 'boolean',
}

const countCrypto = computed(() => {
  return financialStore.currencies.reduce((count, currency) => {
    return currency.is_crypto ? count + 1 : count
  }, 0)
})

const countFiat = computed(() => {
  return financialStore.currencies.reduce((count, currency) => {
    return !currency.is_crypto ? count + 1 : count
  }, 0)
})

const currenciesChartData = computed(() => [
  {
    value: countFiat.value,
    name: 'Fiat',
  },
  {
    value: countCrypto.value,
    name: 'Crypto',
  },
])
</script>

<template>
  <div class="grid grid-cols-2 gap-4 h-96">
      <div class="card bg-base-200 shadow">
        <TableComponent
          class="table-xs max-h-96"
          :options="financialStore.currencies"
          :headers="currenciesHeaders"
          :optionsConfig="currenciesOptionsConfig"
        />
      </div>
      <div class="card bg-base-200 shadow">
        <ChartComponent
          v-if="financialStore.currencies.length > 0"
          :data="currenciesChartData"
          series-name="Types of currencies"
        />
      </div>
    </div>
</template>