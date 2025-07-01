<template>
    <div class="text-center">
        <div class="text-xl font-bold" :class="valueColorClass">{{ displayValue }}</div>
        <div class="text-xs text-gray-600">{{ label }}</div>
        <div v-if="percentile" class="text-xs font-medium" :class="percentileColorClass">
            {{ percentile }}{{ getOrdinalSuffix(percentile) }} percentile
        </div>
        <div v-if="subtext" class="text-xs" :class="subtextColorClass">{{ subtext }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    value: { type: [Number, String], required: true },
    label: { type: String, required: true },
    percentile: { type: Number, default: null },
    subtext: { type: String, default: null },
    valueColor: { type: String, default: 'blue' },
    percentileColor: { type: String, default: null },
    subtextColor: { type: String, default: 'gray' },
    formatAsCurrency: { type: Boolean, default: false }
})

const displayValue = computed(() => {
    if (props.formatAsCurrency && typeof props.value === 'number') {
        return formatCurrency(props.value)
    }
    return props.value
})

const valueColorClass = computed(() => {
    const colorMap = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        orange: 'text-orange-600',
        purple: 'text-purple-600',
        cyan: 'text-cyan-600',
        indigo: 'text-indigo-600',
        red: 'text-red-600',
        yellow: 'text-yellow-600'
    }
    return colorMap[props.valueColor] || 'text-blue-600'
})

const percentileColorClass = computed(() => {
    if (props.percentileColor) {
        const colorMap = {
            blue: 'text-blue-500',
            green: 'text-green-500',
            orange: 'text-orange-500',
            purple: 'text-purple-500',
            cyan: 'text-cyan-500',
            indigo: 'text-indigo-500',
            red: 'text-red-500',
            yellow: 'text-yellow-500'
        }
        return colorMap[props.percentileColor] || 'text-gray-500'
    }
    return valueColorClass.value.replace('600', '500')
})

const subtextColorClass = computed(() => {
    const colorMap = {
        gray: 'text-gray-500',
        green: 'text-green-500',
        red: 'text-red-500',
        blue: 'text-blue-500'
    }
    return colorMap[props.subtextColor] || 'text-gray-500'
})

function formatCurrency(amount) {
    if (amount >= 1000000000) {
        return `$${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount?.toLocaleString() || 0}`
}

function getOrdinalSuffix(num) {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return 'st'
    if (j === 2 && k !== 12) return 'nd'
    if (j === 3 && k !== 13) return 'rd'
    return 'th'
}
</script>