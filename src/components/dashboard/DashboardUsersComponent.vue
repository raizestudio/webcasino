<script setup lang="ts">

// Stores
import { useFinancialStore } from '@/stores/financial'

// Components
// import ChartComponent from '@/components/charts/ChartComponent.vue'
import TableComponent from '@/components/tables/TableComponent.vue'

const financialStore = useFinancialStore()

const exchangesHeaders = ['Id', 'Name']

</script>

<template>
      <div class="grid grid-cols-2 gap-4 h-96">
      <div class="card bg-base-200 shadow">
        <TableComponent
          class="table-xs"
          :options="financialStore.exchanges"
          :headers="exchangesHeaders"
        />
      </div>
      <div class="card bg-base-200 shadow">
        <!-- <ChartComponent /> -->
      </div>
    </div>
</template>