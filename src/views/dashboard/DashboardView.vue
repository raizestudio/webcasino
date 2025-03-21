<script setup lang="ts">
import { ref } from 'vue'

// Components
import DashboardUsersComponent from '@/components/dashboard/DashboardUsersComponent.vue'
import DashboardFinancialComponent from '@/components/dashboard/DashboardFinancialComponent.vue'

// Stores
import { useFinancialStore } from '@/stores/financial'

const financialStore = useFinancialStore()

financialStore.setExchanges()
financialStore.setCurrencies()

const selectedDashboard = ref('users')

// {
//     orient: 'vertical',
//     left: 'left',
//     data: ['Fiat', 'Crypto'],
//   }
</script>

<template>
  <div class="flex flex-col gap-10 px-10 py-4 grow overflow-x-auto">
    <h1 class="text-4xl font-bold">Dashboard</h1>
    <div class="grid grid-flow-col gap-4">
      <div class="cursor-pointer" @click="selectedDashboard = 'users'">
        <div class="card bg-base-200 p-10">Users</div>
      </div>
      <div class="cursor-pointer" @click="selectedDashboard = 'financial'">
        <div class="card bg-base-200 p-10">Exchanges</div>
      </div>
    </div>
    <DashboardUsersComponent v-if="selectedDashboard === 'users'" />
    <DashboardFinancialComponent v-else-if="selectedDashboard === 'financial'" />
  </div>
</template>
