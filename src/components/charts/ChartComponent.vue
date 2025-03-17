<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, watch } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'light')

const props = defineProps<{
  title?: Record<string, string>
  legend?: Record<string, string>
  seriesName: string
  data: Record<string, unknown>[]
}>()

const option = ref({
  title: props.title ? props.title : { text: '' },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: props.legend ? props.legend : { data: [] },
  series: [
    {
      name: props.seriesName,
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})

// watch(
//   () => props.data,
//   () => {
//     option.value.series = props.data
//   },
// )
</script>

<template><v-chart class="chart" :option="option" autoresize /></template>
