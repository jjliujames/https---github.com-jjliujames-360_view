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
                        <button v-if="totalRiskFlags > 0" @click="showRiskDetails"
                            class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                            :class="riskIndicatorClass">
                            <span class="text-lg">{{ riskIndicatorIcon }}</span>
                            <span>{{ totalRiskFlags }} Alert{{ totalRiskFlags > 1 ? 's' : '' }}</span>
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
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 pt-3 border-t border-gray-200">
                                    <h4 class="text-xs font-medium text-gray-500 mb-2">Complexity Score</h4>
                                    <div class="flex items-center space-x-2">
                                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                                            <div class="bg-orange-500 h-2 rounded-full transition-all duration-500"
                                                :style="{ width: (complexityIndex / 10 * 100) + '%' }"></div>
                                        </div>
                                        <span class="text-sm font-medium" :class="getComplexityColor(complexityIndex)">
                                            {{ complexityIndex }}/10
                                        </span>
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        Based on entity structure, beneficial ownership, and transaction patterns
                                    </div>
                                </div>
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
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                <div class="text-center">
                                    <div class="text-xl font-bold text-blue-600">{{ totalClients }}</div>
                                    <div class="text-xs text-gray-600">Total Clients</div>

                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-green-600">{{ formatCurrency(aggregateDeposits)
                                        }}</div>
                                    <div class="text-xs text-gray-600">Deposits</div>
                                    <div class="text-xs text-green-500 font-medium">{{ depositsPercentile }}{{
                                        getOrdinalSuffix(depositsPercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-orange-600">{{ formatCurrency(aggregateLoans) }}
                                    </div>
                                    <div class="text-xs text-gray-600">Loan Committed</div>
                                    <div class="text-xs text-orange-500 font-medium">{{ loansPercentile }}{{
                                        getOrdinalSuffix(loansPercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-purple-600">{{ loanUtilization }}%</div>
                                    <div class="text-xs text-gray-600">Loan Utilization</div>

                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-cyan-600">{{ formatCurrency(annualRevenue) }}
                                    </div>
                                    <div class="text-xs text-gray-600">Revenue</div>
                                    <div class="text-xs text-cyan-500 font-medium">{{ revenuePercentile }}{{
                                        getOrdinalSuffix(revenuePercentile) }} percentile</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-indigo-600">{{ crossSellIndex }}</div>
                                    <div class="text-xs text-gray-600">Cross-Sell Index</div>
                                    <div class="text-xs text-indigo-500 font-medium">Target: ≥ 3.0</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-bold text-yellow-600">{{ totalUnreviewed }}</div>
                                    <div class="text-xs text-gray-600">Pending Risk reviewed</div>

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
                                    Risk Review ({{ totalPendingRiskReviews }})
                                </button>
                                <button @click="activeTab = 'opportunities'"
                                    :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'opportunities' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                    Opportunities ({{ totalOpportunities }})
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
                                                            Product Penetration</th>
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

                                    <!-- Product Penetration Heat Map with Client Tabs -->
                                    <div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-4">🔥 Product Portfolio
                                            Breakdown by Client</h3>
                                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                            <!-- Client Tabs -->
                                            <div class="border-b border-gray-200">
                                                <nav class="flex space-x-4 px-6 overflow-x-auto scrollbar-hide"
                                                    aria-label="Client Tabs">
                                                    <button v-for="client in relationshipClients" :key="client.id"
                                                        @click="selectedClientTab = client.id"
                                                        :class="['flex-shrink-0 whitespace-nowrap border-b-2 py-4 px-3 text-sm font-medium', selectedClientTab === client.id ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                                        {{ client.name }}
                                                    </button>
                                                </nav>
                                            </div>

                                            <!-- Client Product Portfolio -->
                                            <div class="p-6">
                                                <div v-for="client in relationshipClients" :key="client.id"
                                                    v-show="selectedClientTab === client.id">

                                                    <!-- Product Portfolio Breakdown -->
                                                    <div class="mb-8">
                                                        <h4 class="text-lg font-medium text-gray-900 mb-4">🏦 Product
                                                            Portfolio Breakdown</h4>
                                                        <div
                                                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                                            <!-- Business Deposit Product -->
                                                            <div
                                                                class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                                <h5
                                                                    class="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                                                                    🟦 Business Deposit Product
                                                                </h5>
                                                                <div class="space-y-2">
                                                                    <div class="flex items-center justify-between">
                                                                        <span
                                                                            class="text-sm text-gray-700">Checking</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Debit
                                                                            Cards</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">CDs</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Savings and
                                                                            Money Market</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Business Lending Product -->
                                                            <div
                                                                class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                                <h5
                                                                    class="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                                                                    🟦 Business Lending Product
                                                                </h5>
                                                                <div class="space-y-2">
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Credit
                                                                            Cards</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Loans and
                                                                            Lines of Credit</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span
                                                                            class="text-sm text-gray-700">Securities-Based
                                                                            Lending</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Real Estate
                                                                            Financing</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Paycheck
                                                                            Protection Program (PPP)</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Commercial Lending Solutions -->
                                                            <div
                                                                class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                                                <h5
                                                                    class="text-sm font-semibold text-orange-900 mb-3 flex items-center">
                                                                    🟦 Commercial Lending Solutions
                                                                </h5>
                                                                <div class="space-y-2">
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Asset Based
                                                                            Lending</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Commercial
                                                                            Lending</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Commercial
                                                                            Real Estate</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Equipment
                                                                            Finance</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Treasury & Cash Management -->
                                                            <div
                                                                class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                                                <h5
                                                                    class="text-sm font-semibold text-yellow-900 mb-3 flex items-center">
                                                                    🟦 Treasury & Cash Management
                                                                </h5>
                                                                <div class="space-y-2">
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Liquidity
                                                                            Management</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span
                                                                            class="text-sm text-gray-700">Payables</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span
                                                                            class="text-sm text-gray-700">Receivables</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Fraud
                                                                            Control</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Information
                                                                            Services</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Treasury
                                                                            Overview & Articles</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Business Services & Support -->
                                                            <div
                                                                class="bg-green-50 rounded-lg p-4 border border-green-200">
                                                                <h5
                                                                    class="text-sm font-semibold text-green-900 mb-3 flex items-center">
                                                                    🟦 Business Services & Support
                                                                </h5>
                                                                <div class="space-y-2">
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Online
                                                                            Banking</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Online
                                                                            Accounting</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span
                                                                            class="text-sm text-gray-700">Payroll</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Business
                                                                            Payment Suite</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Overdraft
                                                                            Services</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Merchant
                                                                            Solutions</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">New to Small
                                                                            Business Checking</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Healthcare
                                                                            Professionals</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Wealth & Investment Services -->
                                                            <div
                                                                class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                                                <h5
                                                                    class="text-sm font-semibold text-purple-900 mb-3 flex items-center">
                                                                    🟦 Wealth & Investment Services
                                                                </h5>
                                                                <div class="space-y-2">
                                                                    <div class="flex items-center justify-between">
                                                                        <span
                                                                            class="text-sm text-gray-700">Investments</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Wealth &
                                                                            Retirement Planning</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center justify-between">
                                                                        <span class="text-sm text-gray-700">Private
                                                                            Client Banking</span>
                                                                        <div
                                                                            class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                                            <svg class="w-3 h-3 text-white"
                                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fill-rule="evenodd"
                                                                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                                    clip-rule="evenodd"></path>
                                                                            </svg>
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

                                    <!-- Product Portfolio Legend -->
                                    <div class="mt-6 bg-gray-50 rounded-lg p-4">
                                        <div class="flex items-center justify-center space-x-8">
                                            <div class="flex items-center space-x-2">
                                                <div
                                                    class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                    <svg class="w-3 h-3 text-white" fill="currentColor"
                                                        viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span class="text-sm text-gray-700">Client Has Product</span>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <div
                                                    class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                    <svg class="w-3 h-3 text-white" fill="currentColor"
                                                        viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span class="text-sm text-gray-700">AI Recommended</span>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <div
                                                    class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                                                    <svg class="w-3 h-3 text-white" fill="currentColor"
                                                        viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span class="text-sm text-gray-700">Not Available/Recommended</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Charts Section -->
                                    <div class="space-y-6">
                                        <!-- Time Period Selector -->
                                        <div class="flex justify-center">
                                            <div class="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                                                <button @click="selectedTimePeriod = 'ytd'"
                                                    :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', selectedTimePeriod === 'ytd' ? 'bg-td-green text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50']">
                                                    YTD
                                                </button>
                                                <button @click="selectedTimePeriod = '6m'"
                                                    :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', selectedTimePeriod === '6m' ? 'bg-td-green text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50']">
                                                    6 Months
                                                </button>
                                                <button @click="selectedTimePeriod = '12m'"
                                                    :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', selectedTimePeriod === '12m' ? 'bg-td-green text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50']">
                                                    12 Months
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">💰 Account & Loan
                                                Portfolio Balance</h3>
                                            <div class="h-80">
                                                <BarChart v-if="accountPortfolioTimeSeriesData"
                                                    :data="accountPortfolioTimeSeriesData" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">📈 Transaction Volume
                                                Trend</h3>
                                            <div class="h-80">
                                                <BarChart v-if="transactionVolumeTimeSeriesData"
                                                    :data="transactionVolumeTimeSeriesData" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">📊 Monthly Revenue Trend
                                            </h3>
                                            <div class="h-80">
                                                <BarChart v-if="revenueTimeSeriesData" :data="revenueTimeSeriesData" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Risk Analysis Tab -->
                            <div v-if="activeTab === 'risk'">
                                <div class="space-y-6">
                                    <!-- Risk Summary Statistics -->
                                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div class="p-4">
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">🚨 Risk Analysis Summary
                                            </h3>
                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-red-600">20</div>
                                                    <div class="text-sm text-gray-600">Risk Review Assigned</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-orange-600">10</div>
                                                    <div class="text-sm text-gray-600">Pending Risk Review </div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-yellow-600">7</div>
                                                    <div class="text-sm text-gray-600">Closed with UTR</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-green-600">3</div>
                                                    <div class="text-sm text-gray-600">Closed w/o UTR</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Risk Portfolio Summary -->
                                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div class="p-6 border-b border-gray-200">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h3 class="text-lg font-medium text-gray-900">⚠️ Risk Portfolio
                                                        Summary</h3>
                                                    <p class="text-sm text-gray-500 mt-1">Client risk breakdown with
                                                        drill-down capability</p>
                                                </div>
                                                <div class="flex bg-gray-100 rounded-lg p-1">
                                                    <button @click="riskPortfolioView = 'card'"
                                                        :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', riskPortfolioView === 'card' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900']">
                                                        Card View
                                                    </button>
                                                    <button @click="riskPortfolioView = 'table'"
                                                        :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', riskPortfolioView === 'table' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900']">
                                                        Table View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-6">
                                            <!-- Risk Card View -->
                                            <div v-if="riskPortfolioView === 'card'"
                                                class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div v-for="client in relationshipClients" :key="client.id"
                                                    class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                                    @click="drillDownToClientRisk(client)">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <h4 class="font-medium text-gray-900">{{ client.name }}</h4>
                                                        <span class="px-2 py-1 text-xs rounded-full font-medium"
                                                            :class="client.riskFlags > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                                                            {{ client.riskFlags > 0 ? client.riskFlags + ' flags' :
                                                                'Clean' }}
                                                        </span>
                                                    </div>
                                                    <div class="space-y-1 text-sm text-gray-600">
                                                        <div class="flex justify-between">
                                                            <span>RCI Score:</span>
                                                            <span class="font-medium"
                                                                :class="getComplexityColor(client.rci)">{{ client.rci
                                                                }}/10</span>
                                                        </div>
                                                        <div class="flex justify-between">
                                                            <span>Coverage:</span>
                                                            <span class="font-medium"
                                                                :class="getCoverageColor(client.coverage)">{{
                                                                    client.coverage }}%</span>
                                                        </div>
                                                        <div class="flex justify-between">
                                                            <span>Last Review:</span>
                                                            <span class="font-medium">{{ getClientLastReview(client.id)
                                                                }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Risk Table View -->
                                            <div v-if="riskPortfolioView === 'table'" class="overflow-x-auto">
                                                <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50">
                                                        <tr>
                                                            <th
                                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Client</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Risk Flags</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                RCI Score</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Last Review</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Next Review</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="bg-white divide-y divide-gray-200">
                                                        <tr v-for="client in relationshipClients" :key="client.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="flex items-center">
                                                                    <div class="flex-shrink-0 h-8 w-8">
                                                                        <div
                                                                            class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                                                            <span
                                                                                class="text-xs font-medium text-gray-700">{{
                                                                                    client.name.charAt(0) }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ml-4">
                                                                        <div class="text-sm font-medium text-gray-900">
                                                                            {{ client.name }}</div>
                                                                        <div class="text-xs text-gray-500">{{
                                                                            client.industry }}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                                <span v-if="client.riskFlags > 0"
                                                                    class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                                    {{ client.riskFlags }}
                                                                </span>
                                                                <span v-else
                                                                    class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">0</span>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                                <span class="font-medium"
                                                                    :class="getComplexityColor(client.rci)">{{
                                                                        client.rci }}/10</span>
                                                            </td>
                                                            <td
                                                                class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                                {{ getClientLastReview(client.id) }}
                                                            </td>
                                                            <td
                                                                class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                                {{ getClientNextReview(client.id) }}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                                <button @click="drillDownToClientRisk(client)"
                                                                    class="text-td-green hover:text-green-600 font-medium">
                                                                    View Risk Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Loan Delinquency & Overdraft Trend -->
                                    <div>
                                        <!-- Time Period Selector -->
                                        <!-- <div class="flex justify-center mb-4">
                                            <div class="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                                                <button @click="selectedTimePeriod = 'ytd'"
                                                    :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', selectedTimePeriod === 'ytd' ? 'bg-td-green text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50']">
                                                    YTD
                                                </button>
                                                <button @click="selectedTimePeriod = '6m'"
                                                    :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', selectedTimePeriod === '6m' ? 'bg-td-green text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50']">
                                                    6 Months
                                                </button>
                                                <button @click="selectedTimePeriod = '12m'"
                                                    :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', selectedTimePeriod === '12m' ? 'bg-td-green text-white' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50']">
                                                    12 Months
                                                </button>
                                    </div>
                                        </div> -->
                                        <!-- <h3 class="text-lg font-medium text-gray-900 mb-4">📈 Risk Trend by Client</h3>
                                        <div class="h-80">
                                            <BarChart v-if="riskTrendByCompanyTimeSeriesData"
                                                :data="riskTrendByCompanyTimeSeriesData" />
                                        </div> -->
                                    </div>
                                </div>
                            </div>

                            <!-- Opportunities Tab -->
                            <div v-if="activeTab === 'opportunities'">
                                <div class="space-y-6">
                                    <!-- Opportunities Summary Statistics -->
                                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div class="p-4">
                                            <h3 class="text-lg font-medium text-gray-900 mb-4">🎯 Opportunities Summary
                                            </h3>
                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-blue-600">{{ totalOpportunities
                                                    }}</div>
                                                    <div class="text-sm text-gray-600">Total Opportunities</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-green-600">{{
                                                        formatCurrency(totalOpportunityValue) }}</div>
                                                    <div class="text-sm text-gray-600">Potential Revenue</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-purple-600">{{
                                                        highPriorityOpportunities }}</div>
                                                    <div class="text-sm text-gray-600">High Priority</div>
                                                </div>
                                                <div class="text-center">
                                                    <div class="text-2xl font-bold text-orange-600">{{
                                                        avgConfidenceScore }}%</div>
                                                    <div class="text-sm text-gray-600">Avg Confidence</div>
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

                                    <!-- Opportunities Portfolio Summary -->
                                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div class="p-6 border-b border-gray-200">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h3 class="text-lg font-medium text-gray-900">🚀 Opportunities
                                                        Portfolio Summary</h3>
                                                    <p class="text-sm text-gray-500 mt-1">Client opportunity breakdown
                                                        with drill-down capability</p>
                                                </div>
                                                <div class="flex bg-gray-100 rounded-lg p-1">
                                                    <button @click="opportunitiesPortfolioView = 'card'"
                                                        :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', opportunitiesPortfolioView === 'card' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900']">
                                                        Card View
                                                    </button>
                                                    <button @click="opportunitiesPortfolioView = 'table'"
                                                        :class="['px-4 py-2 text-sm font-medium rounded-md transition-colors', opportunitiesPortfolioView === 'table' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900']">
                                                        Table View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-6">
                                            <!-- Opportunities Card View -->
                                            <div v-if="opportunitiesPortfolioView === 'card'"
                                                class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div v-for="client in relationshipClients" :key="client.id"
                                                    class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                                    @click="drillDownToClientOpportunities(client)">
                                                    <div class="flex items-center justify-between mb-2">
                                                        <h4 class="font-medium text-gray-900">{{ client.name }}</h4>
                                                        <span
                                                            class="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                                                            {{ getClientOpportunityCount(client) }} opps
                                                        </span>
                                                    </div>
                                                    <div class="space-y-1 text-sm text-gray-600">
                                                        <div class="flex justify-between">
                                                            <span>Product Gaps:</span>
                                                            <span class="font-medium text-orange-600">{{
                                                                getClientProductGaps(client) }}</span>
                                                        </div>
                                                        <div class="flex justify-between">
                                                            <span>Potential Value:</span>
                                                            <span class="font-medium text-green-600">{{
                                                                formatCurrency(getClientOpportunityValue(client))
                                                                }}</span>
                                                        </div>
                                                        <div class="flex justify-between">
                                                            <span>Next Action:</span>
                                                            <span class="font-medium text-blue-600">{{
                                                                getClientNextAction(client) }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Opportunities Table View -->
                                            <div v-if="opportunitiesPortfolioView === 'table'" class="overflow-x-auto">
                                                <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50">
                                                        <tr>
                                                            <th
                                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Client</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Opportunities</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Product Gaps</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Potential Value</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Priority</th>
                                                            <th
                                                                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="bg-white divide-y divide-gray-200">
                                                        <tr v-for="client in relationshipClients" :key="client.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="flex items-center">
                                                                    <div class="flex-shrink-0 h-8 w-8">
                                                                        <div
                                                                            class="h-8 w-8 rounded-full bg-blue-300 flex items-center justify-center">
                                                                            <span
                                                                                class="text-xs font-medium text-blue-800">{{
                                                                                    client.name.charAt(0) }}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ml-4">
                                                                        <div class="text-sm font-medium text-gray-900">
                                                                            {{ client.name }}</div>
                                                                        <div class="text-xs text-gray-500">{{
                                                                            client.industry }}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                                <span
                                                                    class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                                                    {{ getClientOpportunityCount(client) }}
                                                                </span>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                                <span class="font-medium text-orange-600">{{
                                                                    getClientProductGaps(client) }}</span>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                                <span class="font-medium text-green-600">{{
                                                                    formatCurrency(getClientOpportunityValue(client))
                                                                    }}</span>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                                                <span class="px-2 py-1 text-xs font-medium rounded-full"
                                                                    :class="getClientPriorityClass(client)">
                                                                    {{ getClientPriority(client) }}
                                                                </span>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                                <button @click="drillDownToClientOpportunities(client)"
                                                                    class="text-td-green hover:text-green-600 font-medium">
                                                                    View Opportunities
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

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

        <!-- Alerts Modal -->
        <div v-if="showAlertsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 flex items-center">
                                <span class="text-2xl mr-2">⚠️</span>
                                Client Alerts - {{ relationshipData?.name }}
                            </h3>
                            <p class="text-sm text-gray-600 mt-1">{{ totalActiveAlerts }} active alerts requiring
                                attention</p>
                        </div>
                        <button @click="closeAlertsModal" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Alert Tabs -->
                    <div class="border-b border-gray-200 mb-4">
                        <nav class="flex space-x-8" aria-label="Alert Tabs">
                            <button @click="activeAlertTab = 'delinquency'"
                                :class="['flex items-center whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium', activeAlertTab === 'delinquency' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                <span class="text-lg mr-2">📋</span>
                                Loan Delinquency
                                <span
                                    class="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{
                                        loanDelinquencyAlerts.length }}</span>
                            </button>
                            <button @click="activeAlertTab = 'overdraft'"
                                :class="['flex items-center whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium', activeAlertTab === 'overdraft' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                <span class="text-lg mr-2">💰</span>
                                Overdraft
                                <span
                                    class="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{
                                        overdraftAlerts.length }}</span>
                            </button>
                            <button @click="activeAlertTab = 'other'"
                                :class="['flex items-center whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium', activeAlertTab === 'other' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
                                <span class="text-lg mr-2">⚠️</span>
                                Other Alerts
                                <span
                                    class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{
                                        otherAlerts.length }}</span>
                            </button>
                        </nav>
                    </div>

                    <!-- Alert Content -->
                    <div class="max-h-96 overflow-y-auto">
                        <!-- Loan Delinquency Tab -->
                        <div v-if="activeAlertTab === 'delinquency'" class="space-y-4">
                            <div v-for="alert in loanDelinquencyAlerts" :key="alert.id"
                                class="border border-red-200 rounded-lg p-4 bg-red-50">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-medium text-red-900">{{ alert.loanType }}</h4>
                                        <span class="text-sm text-red-600">{{ alert.daysPastDue }} days past due</span>
                                        <span
                                            class="px-2 py-1 text-xs font-medium bg-red-200 text-red-800 rounded-full">{{
                                                alert.severity }}</span>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button @click="reviewAlert(alert)"
                                            class="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                                            Review Now
                                        </button>
                                        <button @click="scheduleCall(alert)"
                                            class="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">
                                            Schedule Call
                                        </button>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span class="font-medium text-gray-700">Account:</span>
                                        <p class="text-gray-600">{{ alert.accountNumber }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Amount Due:</span>
                                        <p class="text-red-600 font-semibold">{{ formatCurrency(alert.amountDue) }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Last Payment:</span>
                                        <p class="text-gray-600">{{ alert.lastPayment }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Client:</span>
                                        <p class="text-gray-600">{{ alert.clientName }}</p>
                                    </div>
                                </div>
                                <div class="mt-3 pt-3 border-t border-red-200">
                                    <div class="flex justify-between text-sm">
                                        <span><strong>Total Outstanding:</strong> <span class="text-red-600">{{
                                            formatCurrency(alert.totalOutstanding) }}</span></span>
                                        <span><strong>Original Amount:</strong> {{ formatCurrency(alert.originalAmount)
                                            }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Overdraft Tab -->
                        <div v-if="activeAlertTab === 'overdraft'" class="space-y-4">
                            <div v-for="alert in overdraftAlerts" :key="alert.id"
                                class="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-medium text-yellow-900">{{ alert.accountType }}</h4>
                                        <span class="text-sm text-yellow-600">{{ alert.daysOverdrawn }} days
                                            overdrawn</span>
                                        <span
                                            class="px-2 py-1 text-xs font-medium bg-yellow-200 text-yellow-800 rounded-full">{{
                                                alert.severity }}</span>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button @click="reviewAlert(alert)"
                                            class="px-3 py-1 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700">
                                            Review Now
                                        </button>
                                        <button @click="scheduleCall(alert)"
                                            class="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">
                                            Schedule Call
                                        </button>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span class="font-medium text-gray-700">Account:</span>
                                        <p class="text-gray-600">{{ alert.accountNumber }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Overdraft Amount:</span>
                                        <p class="text-yellow-600 font-semibold">{{
                                            formatCurrency(alert.overdraftAmount) }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Available Balance:</span>
                                        <p class="text-gray-600">{{ formatCurrency(alert.availableBalance) }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Client:</span>
                                        <p class="text-gray-600">{{ alert.clientName }}</p>
                                    </div>
                                </div>
                                <div class="mt-3 pt-3 border-t border-yellow-200">
                                    <div class="flex justify-between text-sm">
                                        <span><strong>Overdraft Limit:</strong> {{ formatCurrency(alert.overdraftLimit)
                                            }}</span>
                                        <span><strong>Fees Accumulated:</strong> <span class="text-yellow-600">{{
                                            formatCurrency(alert.feesAccumulated) }}</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Other Alerts Tab -->
                        <div v-if="activeAlertTab === 'other'" class="space-y-4">
                            <div v-for="alert in otherAlerts" :key="alert.id"
                                class="border border-blue-200 rounded-lg p-4 bg-blue-50">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-medium text-blue-900">{{ alert.title }}</h4>
                                        <span class="text-sm text-blue-600">{{ alert.category }}</span>
                                        <span
                                            class="px-2 py-1 text-xs font-medium bg-blue-200 text-blue-800 rounded-full">{{
                                                alert.severity }}</span>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button @click="reviewAlert(alert)"
                                            class="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                                            Review Now
                                        </button>
                                        <button @click="scheduleCall(alert)"
                                            class="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">
                                            Contact Client
                                        </button>
                                    </div>
                                </div>
                                <div class="text-sm text-blue-800 mb-3">
                                    <p>{{ alert.description }}</p>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span class="font-medium text-gray-700">Client:</span>
                                        <p class="text-gray-600">{{ alert.clientName }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Due Date:</span>
                                        <p class="text-gray-600">{{ alert.dueDate }}</p>
                                    </div>
                                    <div>
                                        <span class="font-medium text-gray-700">Priority:</span>
                                        <p class="text-gray-600">{{ alert.priority }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                        <div class="flex space-x-3">
                            <button @click="markAllAsReviewed"
                                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Mark All as Reviewed
                            </button>
                            <button @click="exportAlertReport"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Export Report
                            </button>
                        </div>
                        <button @click="closeAlertsModal"
                            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                            Close
                        </button>
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
const showAlertsModal = ref(false)
const activeAlertTab = ref('delinquency')
const selectedClientTab = ref('client-001') // Default to first client
const selectedTimePeriod = ref('12m') // Default to 12 months
const riskPortfolioView = ref('card') // 'card' or 'table'
const opportunitiesPortfolioView = ref('card') // 'card' or 'table'

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
const riskFlagsPercentile = computed(() => 12) // Lower percentile for risk flags (bad metric)
const unreviewedPercentile = computed(() => 8) // Lower percentile for unreviewed (bad metric)

const totalUnreviewed = computed(() => {
    // Calculate unreviewed clients based on last review dates
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

    return relationshipClients.value.filter(client => {
        const lastReview = clients[client.id]?.lastReview
        if (!lastReview) return true
        return new Date(lastReview) < thirtyDaysAgo
    }).length
})

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



// Risk Analysis computed properties
const totalLoanDelinquency = computed(() => relationshipClients.value.reduce((sum, client) => sum + Math.floor(Math.random() * 3), 0))
const totalOverdraftAlerts = computed(() => relationshipClients.value.reduce((sum, client) => sum + Math.floor(Math.random() * 5), 0))
const totalReviewedRisk = computed(() => relationshipClients.value.filter(client => client.riskFlags > 0).length)
const totalClosedWithoutUTR = computed(() => Math.floor(totalRiskFlags.value * 0.6))
const totalPendingRiskReviews = computed(() => {
    // Calculate pending risk reviews based on clients that have risk flags and haven't been reviewed recently
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

    return relationshipClients.value.filter(client => {
        const hasRiskFlags = client.riskFlags > 0
        const lastReview = clients[client.id]?.lastReview
        const needsReview = !lastReview || new Date(lastReview) < thirtyDaysAgo
        return hasRiskFlags && needsReview
    }).length || 10 // Default to 10 if no data
})

// Opportunities computed properties
const totalOpportunities = computed(() => relationshipClients.value.reduce((sum, client) => sum + getClientOpportunityCount(client), 0))
const totalOpportunityValue = computed(() => relationshipClients.value.reduce((sum, client) => sum + getClientOpportunityValue(client), 0))
const highPriorityOpportunities = computed(() => relationshipClients.value.filter(client => getClientPriority(client) === 'High').length)
const avgConfidenceScore = computed(() => {
    const total = aiRecommendations.value.reduce((sum, rec) => sum + rec.confidence, 0)
    return Math.round(total / aiRecommendations.value.length)
})

// Alerts computed properties
const loanDelinquencyAlerts = computed(() => [
    {
        id: 1,
        clientName: 'Johnson Manufacturing LLC',
        loanType: 'Commercial Term Loan',
        daysPastDue: 62,
        severity: 'Critical',
        accountNumber: 'TL-2024-0892',
        amountDue: 125000,
        lastPayment: 'Oct 14, 2024',
        totalOutstanding: 2200000,
        originalAmount: 2800000
    },
    {
        id: 2,
        clientName: 'Johnson Holdings Group - Subsidiary A',
        loanType: 'Equipment Financing',
        daysPastDue: 45,
        severity: 'High',
        accountNumber: 'EF-2024-0445',
        amountDue: 85000,
        lastPayment: 'Oct 28, 2024',
        totalOutstanding: 1800000,
        originalAmount: 2100000
    }
])

const overdraftAlerts = computed(() => [
    {
        id: 1,
        clientName: 'Johnson Holdings Group - Subsidiary B',
        accountType: 'Business Checking',
        daysOverdrawn: 15,
        severity: 'Medium',
        accountNumber: 'BC-2024-1234',
        overdraftAmount: 45000,
        availableBalance: -45000,
        overdraftLimit: 100000,
        feesAccumulated: 1250
    },
    {
        id: 2,
        clientName: 'Johnson Holdings Group - Subsidiary C',
        accountType: 'Operating Account',
        daysOverdrawn: 8,
        severity: 'Low',
        accountNumber: 'OA-2024-5678',
        overdraftAmount: 18000,
        availableBalance: -18000,
        overdraftLimit: 75000,
        feesAccumulated: 450
    }
])

const otherAlerts = computed(() => [
    {
        id: 1,
        clientName: 'Johnson Manufacturing LLC',
        title: 'Conductor Policy Changes',
        category: 'Policy Update',
        severity: 'High',
        description: 'New regulatory requirements for Conductor transactions require client acknowledgment and updated documentation by January 31, 2025.',
        dueDate: 'Jan 31, 2025',
        priority: 'High'
    },
    {
        id: 2,
        clientName: 'Johnson Holdings Group - Subsidiary A',
        title: 'KYC Documentation Renewal',
        category: 'Compliance',
        severity: 'Medium',
        description: 'Annual KYC documentation renewal required for beneficial ownership verification.',
        dueDate: 'Dec 15, 2024',
        priority: 'Medium'
    },
    {
        id: 3,
        clientName: 'Johnson Holdings Group - Subsidiary B',
        title: 'Credit Review Required',
        category: 'Credit',
        severity: 'Medium',
        description: 'Annual credit review required due to changes in financial position and industry outlook.',
        dueDate: 'Jan 15, 2025',
        priority: 'Medium'
    }
])

const totalActiveAlerts = computed(() =>
    loanDelinquencyAlerts.value.length + overdraftAlerts.value.length + otherAlerts.value.length
)

// Time series data generators
const getTimeLabels = computed(() => {
    const now = new Date()
    const labels = []
    let periods = 12

    if (selectedTimePeriod.value === 'ytd') {
        periods = now.getMonth() + 1
    } else if (selectedTimePeriod.value === '6m') {
        periods = 6
    }

    for (let i = periods - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }))
    }
    return labels
})

const accountPortfolioTimeSeriesData = computed(() => ({
    labels: getTimeLabels.value,
    datasets: relationshipClients.value.map((client, index) => ({
        label: client.name,
        data: Array.from({ length: getTimeLabels.value.length }, () =>
            client.deposits * (0.8 + Math.random() * 0.4)
        ),
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5],
        borderColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5],
        borderWidth: 1
    }))
}))

const transactionVolumeTimeSeriesData = computed(() => ({
    labels: getTimeLabels.value,
    datasets: relationshipClients.value.map((client, index) => ({
        label: client.name,
        data: Array.from({ length: getTimeLabels.value.length }, () =>
            Math.floor(Math.random() * 2000000) + 500000
        ),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5],
        borderColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5],
        borderWidth: 1
    }))
}))

const revenueTimeSeriesData = computed(() => ({
    labels: getTimeLabels.value,
    datasets: relationshipClients.value.map((client, index) => ({
        label: client.name,
        data: Array.from({ length: getTimeLabels.value.length }, () =>
            client.revenue * (0.8 + Math.random() * 0.4) / 12
        ),
        backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'][index % 5],
        borderColor: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'][index % 5],
        borderWidth: 1
    }))
}))

const riskTrendByCompanyTimeSeriesData = computed(() => ({
    labels: getTimeLabels.value,
    datasets: relationshipClients.value.map((client, index) => ({
        label: client.name,
        data: Array.from({ length: getTimeLabels.value.length }, () =>
            Math.floor(Math.random() * 5) + client.riskFlags
        ),
        backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'][index % 5],
        borderColor: ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'][index % 5],
        borderWidth: 1
    }))
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

const drillDownToClientRisk = (client) => {
    router.push({
        name: 'ClientDetail',
        params: {
            metroId: props.metroId,
            marketId: props.marketId,
            regionId: props.regionId,
            rmId: props.rmId,
            clientId: client.id
        },
        query: { tab: 'risk' }
    })
}

const drillDownToClientOpportunities = (client) => {
    router.push({
        name: 'ClientDetail',
        params: {
            metroId: props.metroId,
            marketId: props.marketId,
            regionId: props.regionId,
            rmId: props.rmId,
            clientId: client.id
        },
        query: { tab: 'portfolio' }
    })
}

const getClientLastReview = (clientId) => {
    const client = clients[clientId]
    return client?.lastReview || 'N/A'
}

const getClientNextReview = (clientId) => {
    const client = clients[clientId]
    return client?.nextReview || 'N/A'
}

const getClientOpportunityCount = (client) => {
    const productGaps = Object.values(client.products).filter(hasProduct => !hasProduct).length
    return Math.max(2, productGaps + Math.floor(Math.random() * 2))
}

const getClientProductGaps = (client) => {
    return Object.values(client.products).filter(hasProduct => !hasProduct).length
}

const getClientOpportunityValue = (client) => {
    const baseValue = client.deposits * 0.1 + client.loans * 0.05
    return Math.floor(baseValue + (Math.random() * 200000))
}

const getClientNextAction = (client) => {
    const actions = ['Contact', 'Proposal', 'Follow-up', 'Meeting']
    return actions[Math.floor(Math.random() * actions.length)]
}

const getClientPriority = (client) => {
    if (client.deposits > 50000000) return 'High'
    if (client.deposits > 20000000) return 'Medium'
    return 'Low'
}

const getClientPriorityClass = (client) => {
    const priority = getClientPriority(client)
    switch (priority) {
        case 'High': return 'bg-red-100 text-red-800'
        case 'Medium': return 'bg-yellow-100 text-yellow-800'
        case 'Low': return 'bg-green-100 text-green-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const relationshipAction = (action) => {
    console.log('Relationship action:', action)
    // Handle various relationship actions
}

const showRiskDetails = () => {
    // Show alerts modal instead of switching to risk tab
    showAlertsModal.value = true
    activeAlertTab.value = 'delinquency'
}

const closeAlertsModal = () => {
    showAlertsModal.value = false
}

const reviewAlert = (alert) => {
    console.log('Reviewing alert:', alert)
    // Handle alert review logic
}

const scheduleCall = (alert) => {
    console.log('Scheduling call for alert:', alert)
    // Handle call scheduling logic
}

const markAllAsReviewed = () => {
    console.log('Marking all alerts as reviewed')
    // Handle marking all alerts as reviewed
    showAlertsModal.value = false
}

const exportAlertReport = () => {
    console.log('Exporting alert report')
    // Handle export report logic
}

onMounted(() => {
    console.log('RelationshipView mounted for relationship:', props.relationshipId)
})
</script>

<style scoped>
.card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>