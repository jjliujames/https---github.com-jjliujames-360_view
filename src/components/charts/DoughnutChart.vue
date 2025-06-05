<template>
  <div class="chart-container">
    <canvas ref="chartCanvas" v-if="hasData"></canvas>
    <div v-else class="flex items-center justify-center h-full text-gray-500">
      <span>No data available</span>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController)

export default {
  name: 'DoughnutChart',
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasData() {
      return this.data && this.data.datasets && this.data.datasets.length > 0
    }
  },
  mounted() {
    if (this.hasData) {
      this.createChart()
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  },
  watch: {
    data: {
      handler(newData) {
        if (this.chart) {
          this.chart.destroy()
        }
        if (this.hasData) {
          this.$nextTick(() => {
            this.createChart()
          })
        }
      },
      deep: true
    }
  },
  methods: {
    createChart() {
      try {
        const ctx = this.$refs.chartCanvas?.getContext('2d')
        if (!ctx) return
        
        this.chart = new ChartJS(ctx, {
          type: 'doughnut',
          data: this.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              }
            },
            ...this.options
          }
        })
      } catch (error) {
        console.error('Error creating chart:', error)
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 250px;
  width: 100%;
}
</style> 