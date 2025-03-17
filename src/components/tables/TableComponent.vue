<script setup lang="ts">
// Components
import TableTextCellComponent from '@/components/tables/TableTextCellComponent.vue'
import TableNumberCellComponent from '@/components/tables/TableNumberCellComponent.vue'
import TableBooleanCellComponent from '@/components/tables/TableBooleanCellComponent.vue'

interface IOption {
  [key: string]: unknown
}

defineProps<{
  options: IOption[]
  headers: string[]
  optionsConfig?: Record<string, unknown>
  headersConfig?: Record<string, unknown>
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-pin-rows table-pin-cols">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, index) in options" :key="index">
          <th v-for="(objKey, index) in Object.keys(option)" :key="index">
            <div v-if="optionsConfig">
              <TableTextCellComponent
                v-if="optionsConfig[objKey] === 'text'"
                :text="option[objKey]"
              />
              <TableNumberCellComponent
                v-else-if="optionsConfig[objKey] === 'number'"
                :text="option[objKey]"
              />
              <TableBooleanCellComponent
                v-else-if="optionsConfig[objKey] === 'boolean'"
                :text="option[objKey]"
              />
            </div>
            <div v-else>
              <TableTextCellComponent :text="option[objKey]" />
            </div>
          </th>
        </tr>
      </tbody>
      <!-- <tfoot>
        <tr>
          <th></th>
          <td>Name</td>
          <td>Job</td>
          <td>company</td>
          <td>location</td>
          <td>Last Login</td>
          <td>Favorite Color</td>
          <th></th>
        </tr>
      </tfoot> -->
    </table>
  </div>
</template>
