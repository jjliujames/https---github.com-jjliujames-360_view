<template>
    <div class="lg:col-span-1 space-y-4">
        <!-- Client Profile -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-4">
                <div class="mb-4">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">{{ clientData?.name || 'N/A' }}</h2>
                        <p class="text-xs text-gray-500 mt-1">TIN: 12-3456789</p>
                        <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getTierBadgeClass(clientTier)">
                            {{ clientTier }}
                        </span>
                    </div>
                </div>

                <div class="space-y-3">
                    <div>
                        <p class="text-xs font-medium text-gray-500">Industry</p>
                        <p class="text-sm text-gray-900">{{ clientData?.industry || 'N/A' }}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500">Location</p>
                        <p class="text-sm text-gray-900">{{ clientData?.location || 'N/A' }}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500">RM No</p>
                        <p class="text-sm text-gray-900">{{ relationshipManager?.id || 'N/A' }}</p>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-gray-500">Relationship Manager</p>
                        <p class="text-sm text-gray-900">{{ relationshipManager?.name || 'N/A' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Related party -->
        <div v-if="clientData?.beneficialOwners || clientData?.authorizedSigners || clientData?.conductors || clientData?.relatedEntities"
            class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-3 border-b border-gray-200">
                <h3 class="text-base font-medium text-gray-900">Related party</h3>
                <p class="text-xs text-gray-500 mt-1">Beneficial ownership, authorized signers, and business conductors
                </p>
            </div>
            <div class="p-4">
                <!-- Beneficial Owners -->
                <div v-if="clientData?.beneficialOwners" class="mb-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">💎 Beneficial Owners</h4>
                    <div class="space-y-2">
                        <div v-for="owner in clientData.beneficialOwners" :key="owner.name"
                            class="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                            <div>
                                <div class="text-sm font-medium text-blue-900">{{ owner.name }}</div>
                                <div class="text-xs text-blue-500">ID: {{ generateNineDigitId(owner.id || owner.name,
                                    'BO') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Authorized Signers -->
                <div v-if="clientData?.authorizedSigners" class="mb-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">✍️ Authorized Signers</h4>
                    <div class="space-y-2">
                        <div v-for="signer in clientData.authorizedSigners" :key="signer.name"
                            class="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                            <div>
                                <div class="text-sm font-medium text-green-900">{{ signer.name }}</div>
                                <div class="text-xs text-green-500">ID: {{ generateNineDigitId(signer.id || signer.name,
                                    'SIG') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Business Conductors -->
                <div v-if="clientData?.conductors" class="mb-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">🎯 Business Conductors</h4>
                    <div class="space-y-2">
                        <div v-for="conductor in clientData.conductors" :key="conductor.name"
                            class="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                            <div>
                                <div class="text-sm font-medium text-purple-900">{{ conductor.name }}</div>
                                <div class="text-xs text-purple-500">ID: {{ generateNineDigitId(conductor.id ||
                                    conductor.name, 'CON') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Related Entities -->
                <div v-if="clientData?.relatedEntities">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">🏢 Related Entities</h4>
                    <div class="space-y-2">
                        <div v-for="entity in clientData.relatedEntities" :key="entity.name"
                            class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                                <div class="text-sm font-medium text-gray-900">{{ entity.name }}</div>
                                <div class="text-xs text-gray-500">ID: {{ generateNineDigitId(entity.id || entity.name,
                                    'ENT') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    clientData: { type: Object, required: true },
    relationshipManager: { type: Object, default: null },
    clientTier: { type: String, required: true }
})

function getTierBadgeClass(tier) {
    switch (tier) {
        case 'Commercial':
            return 'bg-blue-100 text-blue-800'
        case 'Small Business':
            return 'bg-green-100 text-green-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

function generateNineDigitId(input, prefix) {
    if (!input) return `${prefix}000000000`

    let hash = 0
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }

    const positiveHash = Math.abs(hash)
    const nineDigitNumber = (positiveHash % 900000000) + 100000000
    return `${prefix}${nineDigitNumber}`
}
</script>