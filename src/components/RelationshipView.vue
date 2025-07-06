<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-white shadow-sm border-b border-gray-200">
            <div class="px-8 py-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button @click="$router.go(-1)" class="text-gray-500 hover:text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">{{ relationshipData?.name ||
                                'Relationship Profile' }}</h1>
                            <p class="text-gray-600 mt-1">{{ breadcrumb }}</p>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex items-center space-x-2">
                        <!-- Risk Alert Indicator -->
                        <button v-if="totalRiskFlags > 0" @click="showRiskModal = true"
                            class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                            :class="riskIndicatorClass">
                            <span class="text-lg">{{ riskIndicatorIcon }}</span>
                            <span>{{ totalRiskFlags }} Risk Flag{{ totalRiskFlags > 1 ? 's' : '' }}</span>
                            <div v-if="hasCriticalRisks" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </button>

                        <button @click="relationshipAction('add-client')"
                            class="px-4 py-2 bg-td-green text-white rounded-lg hover:bg-green-600 transition-colors">
                            Add Client
                        </button>
                        <button @click="relationshipAction('generate-report')"
                            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            Generate Group Report
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <!-- Left Column - Relationship Profile, Key Contacts, Risk Summary -->
                <div class="lg:col-span-1 space-y-4">

                    <!-- Relationship Profile -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-4">
                            <div class="mb-4">
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-900">{{ relationshipData?.name || 'N/A'
                                        }}</h2>
                                    <p class="text-xs text-gray-500 mt-1">Relationship ID: {{ relationshipData?.id ||
                                        'N/A' }}</p>
                                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                                        :class="getTierBadgeClass(relationshipTier)">
                                        {{ relationshipTier }}
                                    </span>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <div>
                                    <p class="text-xs font-medium text-gray-500">Primary Industry</p>
                                    <p class="text-sm text-gray-900">{{ relationshipData?.primaryIndustry || 'N/A' }}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-500">HQ Location</p>
                                    <p class="text-sm text-gray-900">{{ relationshipData?.hqLocation || 'N/A' }}</p>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-500">Client Entities</p>
                                    <p class="text-sm text-gray-900">{{ totalClients || 0 }}</p>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-500">Primary RM</p>
                                    <p class="text-sm text-gray-900">{{ relationshipManager?.name || 'N/A' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Key Contacts & Parties -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-4">
                            <h3 class="text-sm font-medium text-gray-900 mb-3">👥 Key Contacts & Parties</h3>
                            <div class="space-y-3">
                                <div v-if="relationshipData?.ultimateParent">
                                    <h4 class="text-xs font-medium text-gray-500 mb-2">Ultimate Parent Entity</h4>
                                    <div class="p-2 bg-blue-50 rounded-lg">
                                        <div class="text-sm font-medium text-blue-900">{{
                                            relationshipData.ultimateParent.name }}</div>
                                        <div class="text-xs text-blue-600">{{ relationshipData.ultimateParent.ownership
                                            }}% ownership</div>
                                    </div>
                                </div>

                                <div v-if="keyContacts?.length">
                                    <h4 class="text-xs font-medium text-gray-500 mb-2">Key Signers & Beneficiaries</h4>
                                    <div class="space-y-2">
                                        <div v-for="contact in keyContacts" :key="contact.id"
                                            class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">{{ contact.name }}</div>
                                                <div class="text-xs text-gray-500">{{ contact.role }}</div>
                                            </div>
                                            <div class="text-xs text-gray-400">{{ contact.coverage }}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Risk Summary -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-4">
                            <h3 class="text-sm font-medium text-gray-900 mb-3">⚠️ Risk Summary</h3>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Aggregate Risk Level</span>
                                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                                        :class="getRiskLevelClass(aggregateRiskLevel)">
                                        {{ aggregateRiskLevel }}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Complexity Index</span>
                                    <span class="text-sm font-medium" :class="getComplexityColor(complexityIndex)">
                                        {{ complexityIndex }}/10
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Coverage %</span>
                                    <span class="text-sm font-medium" :class="getCoverageColor(coveragePercentage)">
                                        {{ coveragePercentage }}%
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Last EDD</span>
                                    <span class="text-sm text-gray-900">{{ lastEddDate || 'N/A' }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">Next Review</span>
                                    <span class="text-sm text-gray-900">{{ nextReviewDate || 'N/A' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-4">
                            <h3 class="text-sm font-medium text-gray-900 mb-3">⚡ Quick Actions</h3>
                            <div class="space-y-2">
                                <button @click="relationshipAction('add-client')"
                                    class="w-full px-3 py-2 text-sm text-td-green border border-td-green rounded-lg hover:bg-green-50 transition-colors">
                                    Add Client Entity
                                </button>
                                <button @click="relationshipAction('remove-client')"
                                    class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Remove Client
                                </button>
                                <button @click="relationshipAction('generate-report')"
                                    class="w-full px-3 py-2 text-sm text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                                    Generate Group Report
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right Column - Aggregated Analytics -->
                <div class="lg:col-span-3 space-y-6">

                    <!-- Section Title -->
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-900">📊 Relationship Portfolio Analysis</h2>
                        <p class="text-sm text-gray-500 mt-2">Aggregated view across {{ totalClients }} client entities
                            with drill-down capability</p>
                    </div>

                    <!-- Executive Summary KPIs -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-4">
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                <div class="text-center">
                                    <div class="text-xl font-bold text-blue-600">{{ totalClients }}</div>
                                    <div class="text-xs text-gray-600">Total Clients</div>
                                    <div class="text-xs text-blue-500 font-medium">{{ clientsPercentile }}{{
                                        getOrdinalSuffix(clientsPercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-green-600">{{ formatCurrency(aggregateDeposits)
                                        }}</div>
                                    <div class="text-xs text-gray-600">Aggregate Deposits</div>
                                    <div class="text-xs text-green-500 font-medium">{{ depositsPercentile }}{{
                                        getOrdinalSuffix(depositsPercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-orange-600">{{ formatCurrency(aggregateLoans) }}
                                    </div>
                                    <div class="text-xs text-gray-600">Aggregate Loans</div>
                                    <div class="text-xs text-orange-500 font-medium">{{ loansPercentile }}{{
                                        getOrdinalSuffix(loansPercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-purple-600">{{ loanUtilization }}%</div>
                                    <div class="text-xs text-gray-600">Loan Utilization</div>
                                    <div class="text-xs text-purple-500 font-medium">{{ utilizationPercentile }}{{
                                        getOrdinalSuffix(utilizationPercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-cyan-600">{{ formatCurrency(annualRevenue) }}
                                    </div>
                                    <div class="text-xs text-gray-600">Annual Revenue</div>
                                    <div class="text-xs text-cyan-500 font-medium">{{ revenuePercentile }}{{
                                        getOrdinalSuffix(revenuePercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-indigo-600">{{ crossSellIndex }}</div>
                                    <div class="text-xs text-gray-600">Cross-Sell Index</div>
                                    <div class="text-xs text-indigo-500 font-medium">Target: ≥ 3.0</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab Navigation -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="border-b border-gray-200">
                            <nav class="flex space-x-8 px-6" aria-label="Tabs">
                                <button @click="activeTab = 'clients'"
                                    :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'clients' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                    Clients & Portfolio
                                </button>
                                <button @click="activeTab = 'risk'"
                                    :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'risk' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                    Risk Analysis
                                </button>
                                <button @click="activeTab = 'opportunities'"
                                    :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'opportunities' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                    Opportunities
                                </button>
                                <button @click="activeTab = 'loans'"
                                    :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'loans' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                    Loan Applications
                                </button>
                            </nav>
                        </div>

                        <!-- Tab Content -->
                        <div class="p-6">
                            <!-- Clients & Portfolio Tab -->
                            <div v-if="activeTab === 'clients'">
                                <div class="space-y-6">
                                    <!-- Client Table -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">🏢 Client Entity Portfolio
                                        </h3>
                                        <div class="overflow-x-auto">
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Client Name</th>
                                                        <th
                                                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Deposits</th>
                                                        <th
                                                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Loans</th>
                                                        <th
                                                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Revenue</th>
                                                        <th
                                                            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Coverage %</th>
                                                        <th
                                                            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            RCI</th>
                                                        <th
                                                            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Risk Flags</th>
                                                        <th
                                                            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    <tr v-for="client in relationshipClients" :key="client.id"
                                                        class="hover:bg-gray-50 cursor-pointer"
                                                        @click="drillDownToClient(client)">
                                                        <td class="px-6 py-4 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="flex-shrink-0 h-8 w-8">
                                                                    <div
                                                                        class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                                                        <span class="text-xs font-medium text-white">{{
                                                                            client.name.charAt(0) }}</span>
                                                                    </div>
                                                                </div>
                                                                <div class="ml-4">
                                                                    <div class="text-sm font-medium text-gray-900">{{
                                                                        client.name }}</div>
                                                                    <div class="text-xs text-gray-500">{{
                                                                        client.industry }}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                            {{ formatCurrency(client.deposits) }}
                                                        </td>
                                                        <td
                                                            class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                            {{ formatCurrency(client.loans) }}
                                                        </td>
                                                        <td
                                                            class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                                            {{ formatCurrency(client.revenue) }}
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                            <span class="font-medium"
                                                                :class="getCoverageColor(client.coverage)">
                                                                {{ client.coverage }}%
                                                            </span>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                            <span class="font-medium"
                                                                :class="getComplexityColor(client.rci)">
                                                                {{ client.rci }}
                                                            </span>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-center">
                                                            <span v-if="client.riskFlags > 0"
                                                                class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                                {{ client.riskFlags }}
                                                            </span>
                                                            <span v-else class="text-gray-400">-</span>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                            <button @click.stop="drillDownToClient(client)"
                                                                class="text-td-green hover:text-green-600 font-medium">
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <!-- Product Penetration Heat Map -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">🔥 Product Penetration Heat
                                            Map</h3>
                                        <div class="bg-gray-50 rounded-lg p-4">
                                            <div class="grid grid-cols-8 gap-2 text-xs">
                                                <div class="font-medium text-gray-600">Client</div>
                                                <div class="font-medium text-gray-600 text-center">Deposits</div>
                                                <div class="font-medium text-gray-600 text-center">Loans</div>
                                                <div class="font-medium text-gray-600 text-center">Treasury</div>
                                                <div class="font-medium text-gray-600 text-center">FX</div>
                                                <div class="font-medium text-gray-600 text-center">Trade</div>
                                                <div class="font-medium text-gray-600 text-center">Investment</div>
                                                <div class="font-medium text-gray-600 text-center">Insurance</div>

                                                <template v-for="client in relationshipClients" :key="client.id">
                                                    <div class="font-medium text-gray-900">{{ client.name }}</div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.deposits ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.loans ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.treasury ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.fx ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.trade ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.investment ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="w-4 h-4 rounded-full mx-auto"
                                                            :class="client.products.insurance ? 'bg-green-500' : 'bg-gray-300'">
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Balance Distribution Chart -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">💰 Balance Distribution</h3>
                                        <div class="h-64">
                                            <BarChart v-if="balanceDistributionData" :data="balanceDistributionData" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Risk Analysis Tab -->
                            <div v-if="activeTab === 'risk'">
                                <div class="space-y-6">
                                    <!-- Risk Score Trend -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">📈 Aggregated Risk Score
                                            Trend</h3>
                                        <div class="h-64">
                                            <LineChart v-if="riskTrendData" :data="riskTrendData" />
                                        </div>
                                    </div>

                                    <!-- Risk Flag Composition -->
                                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">🚩 Risk Flag Composition
                                            </h3>
                                            <div class="h-64">
                                                <DoughnutChart v-if="riskFlagCompositionData"
                                                    :data="riskFlagCompositionData" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">⚠️ High-RCI Watchlist
                                            </h3>
                                            <div class="space-y-3">
                                                <div v-for="client in highRciClients" :key="client.id"
                                                    class="bg-red-50 border border-red-200 rounded-lg p-3">
                                                    <div class="flex items-center justify-between">
                                                        <div>
                                                            <div class="font-medium text-red-900">{{ client.name }}
                                                            </div>
                                                            <div class="text-sm text-red-700">RCI: {{ client.rci }}/10
                                                            </div>
                                                        </div>
                                                        <div class="text-right">
                                                            <div class="text-sm font-medium text-red-800">{{
                                                                client.mitigationStatus }}</div>
                                                            <div class="text-xs text-red-600">{{ client.lastReview }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Opportunities Tab -->
                            <div v-if="activeTab === 'opportunities'">
                                <div class="space-y-6">
                                    <!-- Cross-Sell Gap Matrix -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">🎯 Cross-Sell Gap Analysis
                                        </h3>
                                        <div class="bg-gray-50 rounded-lg p-4">
                                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div v-for="gap in crossSellGaps" :key="gap.product"
                                                    class="bg-white rounded-lg p-4 border border-gray-200">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <h4 class="font-medium text-gray-900">{{ gap.product }}</h4>
                                                        <span class="text-sm font-medium text-red-600">{{
                                                            gap.missingCount }} missing</span>
                                                    </div>
                                                    <div class="text-sm text-gray-600 mb-2">{{ gap.potentialRevenue }}
                                                    </div>
                                                    <div class="text-xs text-gray-500">{{ gap.clients.join(', ') }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- AI Recommendations -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">🤖 AI Recommendations</h3>
                                        <div class="space-y-4">
                                            <div v-for="recommendation in aiRecommendations" :key="recommendation.id"
                                                class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex-1">
                                                        <div class="flex items-center space-x-2 mb-2">
                                                            <h4 class="font-semibold text-blue-900">{{
                                                                recommendation.client }}</h4>
                                                            <span
                                                                class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                                                {{ recommendation.confidence }}% confidence
                                                            </span>
                                                        </div>
                                                        <p class="text-sm text-blue-700 mb-2">{{
                                                            recommendation.recommendation }}</p>
                                                        <div class="flex items-center space-x-4 text-xs text-gray-600">
                                                            <span>💰 {{ formatCurrency(recommendation.potential) }}
                                                                potential</span>
                                                            <span>🎯 {{ recommendation.priority }} priority</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        class="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                        Act Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Loan Applications Tab -->
                            <div v-if="activeTab === 'loans'">
                                <div class="space-y-6">
                                    <!-- Loan Status Board -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">📋 Loan Application Status
                                        </h3>
                                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <h4 class="font-medium text-yellow-900 mb-2">Pending</h4>
                                                <div class="space-y-2">
                                                    <div v-for="loan in pendingLoans" :key="loan.id"
                                                        class="bg-white rounded p-2 text-sm">
                                                        <div class="font-medium text-gray-900">{{ loan.client }}</div>
                                                        <div class="text-gray-600">{{ formatCurrency(loan.amount) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <h4 class="font-medium text-blue-900 mb-2">Underwriting</h4>
                                                <div class="space-y-2">
                                                    <div v-for="loan in underwritingLoans" :key="loan.id"
                                                        class="bg-white rounded p-2 text-sm">
                                                        <div class="font-medium text-gray-900">{{ loan.client }}</div>
                                                        <div class="text-gray-600">{{ formatCurrency(loan.amount) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <h4 class="font-medium text-green-900 mb-2">Approved</h4>
                                                <div class="space-y-2">
                                                    <div v-for="loan in approvedLoans" :key="loan.id"
                                                        class="bg-white rounded p-2 text-sm">
                                                        <div class="font-medium text-gray-900">{{ loan.client }}</div>
                                                        <div class="text-gray-600">{{ formatCurrency(loan.amount) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                                <h4 class="font-medium text-purple-900 mb-2">Funded</h4>
                                                <div class="space-y-2">
                                                    <div v-for="loan in fundedLoans" :key="loan.id"
                                                        class="bg-white rounded p-2 text-sm">
                                                        <div class="font-medium text-gray-900">{{ loan.client }}</div>
                                                        <div class="text-gray-600">{{ formatCurrency(loan.amount) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrency, clients, relationships, relationshipManagers } from '../data/mockData.js'
import LineChart from './charts/LineChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'
import BarChart from './charts/BarChart.vue'

const props = defineProps({
    metroId: String,
    marketId: String,
    regionId: String,
    rmId: String,
    relationshipId: String
})

const router = useRouter()

// Reactive state
const activeTab = ref('clients')
const showRiskModal = ref(false)

// Johnson Holdings Group relationship data
const relationshipData = ref({
    id: 'rel-001',
    name: 'Johnson Holdings Group',
    primaryIndustry: 'Manufacturing',
    hqLocation: 'Chicago, IL',
    ultimateParent: {
        name: 'Johnson Holdings Group',
        ownership: 100
    }
})

const relationshipManager = ref({
    name: 'Sarah Johnson',
    id: 'rm-001'
})

// Computed properties
const breadcrumb = computed(() => {
    return `Metro › Market › Region › RM › ${relationshipData.value?.name}`
})

const relationshipTier = computed(() => {
    const relationshipInfo = relationships['rm-001']?.find(rel => rel.id === 'rel-001')
    return relationshipInfo?.tier || 'Platinum'
})

const totalClients = computed(() => relationshipClients.value.length)
const aggregateDeposits = computed(() => relationshipClients.value.reduce((sum, client) => sum + client.deposits, 0))
const aggregateLoans = computed(() => relationshipClients.value.reduce((sum, client) => sum + client.loans, 0))
const loanUtilization = computed(() => {
    const totalCommitments = aggregateLoans.value * 1.3 // Assuming 30% headroom
    return totalCommitments > 0 ? ((aggregateLoans.value / totalCommitments) * 100).toFixed(1) : 0
})
const annualRevenue = computed(() => relationshipClients.value.reduce((sum, client) => sum + client.revenue, 0))
const crossSellIndex = computed(() => {
    const totalProducts = relationshipClients.value.reduce((sum, client) => {
        return sum + Object.values(client.products).filter(Boolean).length
    }, 0)
    return (totalProducts / (relationshipClients.value.length * 7)).toFixed(1) // 7 possible products
})

const totalRiskFlags = computed(() => relationshipClients.value.reduce((sum, client) => sum + client.riskFlags, 0))
const aggregateRiskLevel = computed(() => {
    const avgRisk = relationshipClients.value.reduce((sum, client) => sum + client.rci, 0) / relationshipClients.value.length
    if (avgRisk >= 7) return 'High'
    if (avgRisk >= 4) return 'Medium'
    return 'Low'
})
const complexityIndex = computed(() => {
    const avgComplexity = relationshipClients.value.reduce((sum, client) => sum + client.rci, 0) / relationshipClients.value.length
    return avgComplexity.toFixed(1)
})
const coveragePercentage = computed(() => {
    const avgCoverage = relationshipClients.value.reduce((sum, client) => sum + client.coverage, 0) / relationshipClients.value.length
    return Math.round(avgCoverage)
})
const lastEddDate = computed(() => '2024-11-15')
const nextReviewDate = computed(() => '2025-02-15')

// Percentiles (mock data)
const clientsPercentile = computed(() => 85)
const depositsPercentile = computed(() => 92)
const loansPercentile = computed(() => 88)
const utilizationPercentile = computed(() => 76)
const revenuePercentile = computed(() => 89)

const relationshipClients = computed(() => {
    // Get Johnson Holdings Group clients (rel-001)
    const johnsonClients = Object.values(clients).filter(client => client.relationshipId === 'rel-001')

    return johnsonClients.map(client => ({
        id: client.id,
        name: client.name,
        industry: client.industry,
        deposits: client.productSummary?.deposit?.balance || client.portfolioValue * 0.6,
        loans: client.productSummary?.lending?.balance || client.portfolioValue * 0.3,
        revenue: client.annualRevenue,
        coverage: client.productPenetration,
        rci: client.riskScore,
        riskFlags: client.riskFlags?.length || 0,
        products: {
            deposits: client.productSummary?.deposit?.accounts > 0,
            loans: client.productSummary?.lending?.accounts > 0,
            treasury: client.productSummary?.treasury?.accounts > 0,
            fx: Math.random() > 0.5, // Mock FX data
            trade: Math.random() > 0.7, // Mock trade data
            investment: client.productSummary?.wealth?.accounts > 0,
            insurance: Math.random() > 0.6 // Mock insurance data
        }
    }))
})

const keyContacts = computed(() => {
    // Get contacts from Johnson Manufacturing LLC (main client)
    const mainClient = clients['client-001']
    if (!mainClient?.beneficialOwners) return []

    return mainClient.beneficialOwners.map((owner, index) => ({
        id: index + 1,
        name: owner.name,
        role: owner.role,
        coverage: owner.ownership ? parseInt(owner.ownership.replace('%', '')) : 0
    }))
})

const highRciClients = computed(() =>
    relationshipClients.value.filter(client => client.rci > 7).map(client => ({
        ...client,
        mitigationStatus: 'In Progress',
        lastReview: '2 weeks ago'
    }))
)

const crossSellGaps = computed(() => {
    const gaps = []
    const products = ['treasury', 'fx', 'trade', 'investment', 'insurance']

    products.forEach(product => {
        const clientsWithoutProduct = relationshipClients.value.filter(client => !client.products[product])
        if (clientsWithoutProduct.length > 0) {
            gaps.push({
                product: product.charAt(0).toUpperCase() + product.slice(1) + ' Services',
                missingCount: clientsWithoutProduct.length,
                potentialRevenue: `$${(clientsWithoutProduct.length * 150000).toLocaleString()} annually`,
                clients: clientsWithoutProduct.map(c => c.name)
            })
        }
    })

    return gaps.slice(0, 3) // Show top 3 gaps
})

const aiRecommendations = computed(() => [
    {
        id: 1,
        client: 'Johnson Manufacturing LLC',
        recommendation: 'Expand lending facilities to support increased production capacity and working capital needs',
        confidence: 94,
        potential: 450000,
        priority: 'High'
    },
    {
        id: 2,
        client: 'Johnson Holdings Group - Subsidiary A',
        recommendation: 'Treasury Management solutions to optimize cash flow across multiple manufacturing locations',
        confidence: 89,
        potential: 320000,
        priority: 'Medium'
    },
    {
        id: 3,
        client: 'Johnson Holdings Group - Subsidiary B',
        recommendation: 'Supply chain financing to support rapid expansion and Detroit operations',
        confidence: 86,
        potential: 280000,
        priority: 'Medium'
    }
])

const pendingLoans = computed(() => [
    { id: 1, client: 'Johnson Manufacturing LLC', amount: 15000000 },
    { id: 2, client: 'Johnson Holdings Group - Subsidiary A', amount: 8000000 }
])

const underwritingLoans = computed(() => [
    { id: 3, client: 'Johnson Holdings Group - Subsidiary B', amount: 12000000 }
])

const approvedLoans = computed(() => [
    { id: 4, client: 'Johnson Manufacturing LLC', amount: 5000000 }
])

const fundedLoans = computed(() => [
    { id: 5, client: 'Johnson Holdings Group - Subsidiary A', amount: 3000000 }
])

const hasCriticalRisks = computed(() => totalRiskFlags.value > 5)
const riskIndicatorClass = computed(() => {
    if (totalRiskFlags.value > 5) return 'bg-red-100 text-red-800 border border-red-200'
    if (totalRiskFlags.value > 2) return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    return 'bg-green-100 text-green-800 border border-green-200'
})
const riskIndicatorIcon = computed(() => {
    if (totalRiskFlags.value > 5) return '🚨'
    if (totalRiskFlags.value > 2) return '⚠️'
    return '✅'
})

// Chart data
const balanceDistributionData = computed(() => ({
    labels: ['Deposits', 'Loans', 'Investments', 'Cash Management'],
    datasets: [{
        label: 'Portfolio Balance',
        data: [425000000, 185000000, 85000000, 45000000],
        backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6']
    }]
}))

const riskTrendData = computed(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Weighted Risk Score',
        data: [6.2, 6.8, 7.1, 6.9, 7.2, 6.8],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
    }]
}))

const riskFlagCompositionData = computed(() => ({
    labels: ['Crypto Activity', 'High Cash', 'Cross-Border', 'MSB Activity'],
    datasets: [{
        data: [8, 12, 6, 4],
        backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6']
    }]
}))

// Methods
const getTierBadgeClass = (tier) => {
    switch (tier?.toLowerCase()) {
        case 'tier 1': return 'bg-purple-100 text-purple-800'
        case 'tier 2': return 'bg-blue-100 text-blue-800'
        case 'tier 3': return 'bg-green-100 text-green-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getRiskLevelClass = (level) => {
    switch (level?.toLowerCase()) {
        case 'high': return 'bg-red-100 text-red-800'
        case 'medium': return 'bg-yellow-100 text-yellow-800'
        case 'low': return 'bg-green-100 text-green-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getComplexityColor = (index) => {
    if (index >= 7) return 'text-red-600'
    if (index >= 5) return 'text-yellow-600'
    return 'text-green-600'
}

const getCoverageColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
}

const getOrdinalSuffix = (num) => {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return 'st'
    if (j === 2 && k !== 12) return 'nd'
    if (j === 3 && k !== 13) return 'rd'
    return 'th'
}

const drillDownToClient = (client) => {
    router.push({
        name: 'ClientDetail',
        params: {
            metroId: props.metroId,
            marketId: props.marketId,
            regionId: props.regionId,
            rmId: props.rmId,
            clientId: client.id
        }
    })
}

const relationshipAction = (action) => {
    console.log('Relationship action:', action)
    // Handle various relationship actions
}

onMounted(() => {
    console.log('RelationshipView mounted for relationship:', props.relationshipId)
})
</script>

<style scoped>
.card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
</style>