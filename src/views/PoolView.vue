<script setup lang="ts">
import { ref } from 'vue'

// Stores
import { useFinancialStore } from '@/stores/financial'

const financialStore = useFinancialStore()

financialStore.setPools()

const activePool = ref('')
</script>

<template>
  <div class="flex flex-col px-10 py-4 grow">
    <div v-for="(pool, index) in financialStore.pools" :key="index">
      {{ pool }}
    </div>
    <div class="grid grid-cols-3">
      <div>
        <button v-for="(pool, index) in financialStore.pools" :key="index">
          {{ pool.currency }}
        </button>
      </div>
      <div class="card bg-base-200 col-span-2">
        {{ financialStore.pools[0] }}
      </div>
    </div>
  </div>
</template>
