<template>
    <div class="sparkline-container">
        <canvas ref="sparklineCanvas" v-if="hasData"></canvas>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController
)

export default {
    name: 'Sparkline',
    props: {
        data: {
            type: Array,
            required: true
        },
        color: {
            type: String,
            default: '#10B981'
        },
        fillColor: {
            type: String,
            default: 'rgba(16, 185, 129, 0.1)'
        }
    },
    computed: {
        hasData() {
            return this.data && this.data.length > 0
        }
    },
    mounted() {
        if (this.hasData) {
            this.createSparkline()
        }
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy()
        }
    },
    watch: {
        data: {
            handler() {
                if (this.chart) {
                    this.chart.destroy()
                }
                if (this.hasData) {
                    this.$nextTick(() => {
                        this.createSparkline()
                    })
                }
            },
            deep: true
        }
    },
    methods: {
        createSparkline() {
            try {
                const ctx = this.$refs.sparklineCanvas?.getContext('2d')
                if (!ctx) return

                this.chart = new ChartJS(ctx, {
                    type: 'line',
                    data: {
                        labels: this.data.map((_, index) => index),
                        datasets: [{
                            data: this.data,
                            borderColor: this.color,
                            backgroundColor: this.fillColor,
                            borderWidth: 2,
                            fill: true,
                            pointRadius: 0,
                            pointHoverRadius: 0,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false
                            }
                        },
                        elements: {
                            point: {
                                radius: 0
                            }
                        },
                        interaction: {
                            intersect: false
                        }
                    }
                })
            } catch (error) {
                console.error('Error creating sparkline:', error)
            }
        }
    }
}
</script>

<style scoped>
.sparkline-container {
    width: 60px;
    height: 20px;
}
</style>