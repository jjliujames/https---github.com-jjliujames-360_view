<template>
    <span class="px-2 py-1 text-xs font-medium rounded-full" :class="badgeClass">
        {{ displayText }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    riskScore: { type: [Number, String], default: null },
    riskLevel: { type: String, default: null },
    size: { type: String, default: 'sm' }, // sm, md, lg
    showScore: { type: Boolean, default: true }
})

const displayText = computed(() => {
    if (props.riskScore && props.showScore) {
        return props.riskScore
    }
    if (props.riskLevel) {
        return props.riskLevel
    }
    if (props.riskScore) {
        return getRiskLevel(props.riskScore)
    }
    return 'N/A'
})

const badgeClass = computed(() => {
    const level = props.riskLevel || getRiskLevel(props.riskScore)
    const sizeClass = getSizeClass()

    switch (level?.toLowerCase()) {
        case 'high':
            return `${sizeClass} bg-red-100 text-red-800`
        case 'medium':
            return `${sizeClass} bg-yellow-100 text-yellow-800`
        case 'low':
            return `${sizeClass} bg-green-100 text-green-800`
        default:
            return `${sizeClass} bg-gray-100 text-gray-800`
    }
})

function getRiskLevel(score) {
    if (!score) return 'Unknown'
    const numScore = typeof score === 'string' ? parseFloat(score) : score
    if (numScore >= 7) return 'High'
    if (numScore >= 4) return 'Medium'
    return 'Low'
}

function getSizeClass() {
    switch (props.size) {
        case 'lg':
            return 'px-3 py-2 text-sm'
        case 'md':
            return 'px-2.5 py-1.5 text-xs'
        case 'sm':
        default:
            return 'px-2 py-1 text-xs'
    }
}
</script>