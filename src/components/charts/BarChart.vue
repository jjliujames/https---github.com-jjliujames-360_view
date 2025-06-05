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
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
)

export default {
    name: 'BarChart',
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
            return this.data && this.data.labels && this.data.labels.length > 0
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
                    type: 'bar',
                    data: this.data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: '#f3f4f6'
                                }
                            },
                            x: {
                                grid: {
                                    color: '#f3f4f6'
                                }
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
    height: 100%;
    width: 100%;
}
</style>