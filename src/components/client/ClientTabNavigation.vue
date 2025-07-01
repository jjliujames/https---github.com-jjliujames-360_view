<template>
    <div class="mb-6">
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <button @click="$emit('tab-change', 'portfolio')" :class="[
                    activeTab === 'portfolio'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]">
                    💼 Portfolio & Opportunities
                </button>
                <button @click="$emit('tab-change', 'risk')" :class="[
                    activeTab === 'risk'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]">
                    🚨 Risk Analysis
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    activeTab: { type: String, required: true }
})

const emit = defineEmits(['tab-change'])
</script>