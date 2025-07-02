<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Breadcrumb -->
        <div class="bg-white border-b border-gray-200 px-6 py-3">
            <nav class="text-sm text-gray-600">
                <span @click="$router.push('/executive')" class="cursor-pointer hover:text-blue-600">Executive
                    Dashboard</span>
                <span class="mx-2">></span>
                <span @click="goBackToRM" class="cursor-pointer hover:text-blue-600">{{ relationship?.rmId }}</span>
                <span class="mx-2">></span>
                <span class="text-gray-900 font-medium">{{ relationship?.name }}</span>
            </nav>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-6">
            <!-- Header Section with Action-Oriented Alerts -->
            <div class="mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-4 mb-2">
                                <h1 class="text-3xl font-bold text-gray-900">{{ relationship?.name }}</h1>
                                <span class="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                                    {{ relationship?.tier || 'Platinum' }} Tier
                                </span>
                            </div>
                            <p class="text-gray-600 mb-3">{{ relationship?.industry }} • {{ relationshipClients.length
                            }} Client Entities • {{ jurisdictionCount }} Jurisdictions</p>

                            <!-- Enhanced Relationship Metadata -->
                            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                                <div class="text-sm">
                                    <span class="text-gray-500">RM:</span>
                                    <span class="font-medium text-gray-900 ml-1">{{ relationshipManager?.name }}</span>
                                </div>
                                <div class="text-sm">
                                    <span class="text-gray-500">Last Review:</span>
                                    <span class="font-medium text-gray-900 ml-1">{{ lastReviewDate }}</span>
                                </div>
                                <div class="text-sm">
                                    <span class="text-gray-500">Risk Level:</span>
                                    <span :class="getRiskLevelClass(portfolioRiskLevel)" class="font-medium ml-1">{{
                                        portfolioRiskLevel }}</span>
                                </div>
                                <div class="text-sm">
                                    <span class="text-gray-500">Relationship Years:</span>
                                    <span class="font-medium text-gray-900 ml-1">{{ averageRelationshipYears }}</span>
                                </div>
                            </div>


                        </div>

                        <div class="text-right ml-6">
                            <div class="text-3xl font-bold text-green-600">{{ formatCurrency(totalPortfolioValue) }}
                            </div>
                            <div class="text-sm text-gray-500">Total Portfolio Value</div>
                            <div class="text-xs text-green-500 font-medium">{{ portfolioPercentile }}{{
                                getOrdinalSuffix(portfolioPercentile) }} percentile</div>
                        </div>
                    </div>

                    <!-- Alert Indicator Button -->
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center space-x-3">
                            <!-- Alert Indicator -->
                            <button v-if="totalAlertCount > 0" @click="showAlertModal = true"
                                class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                :class="alertIndicatorClass">
                                <span class="text-lg">{{ alertIndicatorIcon }}</span>
                                <span>{{ totalAlertCount }} Alert{{ totalAlertCount > 1 ? 's' : '' }}</span>
                                <div v-if="hasCriticalAlerts" class="w-2 h-2 bg-red-500 rounded-full animate-pulse">
                                </div>
                            </button>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="generateRelationshipReport"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                Generate Report
                            </button>
                            <button @click="scheduleReview"
                                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                Schedule Review
                            </button>
                        </div>
                    </div>


                </div>
            </div>

            <!-- Enhanced Portfolio Summary with Integrated Trends -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-4 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900">🏢 Relationship Portfolio Summary</h3>
                    <p class="text-sm text-gray-500 mt-1">Current metrics with trend analysis - click any metric to view
                        detailed trends</p>
                </div>
                <div class="p-4">
                    <!-- Enhanced KPI Cards with Trend Indicators -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
                        <div @click="switchMetric('revenue')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'revenue' ? 'border-emerald-500 bg-emerald-50' : 'border-transparent hover:border-emerald-200 hover:bg-emerald-50']">
                            <div class="text-2xl font-bold text-emerald-600">{{ formatCurrency(totalRevenue) }}</div>
                            <div class="text-sm text-gray-600">Total Revenue</div>
                            <div class="text-xs text-emerald-500 font-medium">{{ revenuePercentile }}{{
                                getOrdinalSuffix(revenuePercentile) }} percentile</div>
                            <div class="text-xs text-emerald-500 font-medium mt-1">📈 +18.7% (6M)</div>
                        </div>
                        <div @click="switchMetric('accounts')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'accounts' ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-blue-200 hover:bg-blue-50']">
                            <div class="text-2xl font-bold text-blue-600">{{ totalAccounts }}</div>
                            <div class="text-sm text-gray-600">Total Accounts</div>
                            <div class="text-xs text-blue-500 font-medium">{{ accountsPercentile }}{{
                                getOrdinalSuffix(accountsPercentile) }} percentile</div>
                            <div class="text-xs text-blue-500 font-medium mt-1">📈 +8.2% (6M)</div>
                        </div>
                        <div @click="switchMetric('deposits')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'deposits' ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-green-200 hover:bg-green-50']">
                            <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalDeposits) }}</div>
                            <div class="text-sm text-gray-600">Total Deposits</div>
                            <div class="text-xs text-green-500 font-medium">{{ depositsPercentile }}{{
                                getOrdinalSuffix(depositsPercentile) }} percentile</div>
                            <div class="text-xs text-green-500 font-medium mt-1">📈 +12.3% (6M)</div>
                        </div>
                        <div @click="switchMetric('loans')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'loans' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200 hover:bg-orange-50']">
                            <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(totalLoans) }}</div>
                            <div class="text-sm text-gray-600">Total Loans</div>
                            <div class="text-xs text-orange-500 font-medium">{{ loansPercentile }}{{
                                getOrdinalSuffix(loansPercentile) }} percentile</div>
                            <div class="text-xs text-orange-500 font-medium mt-1">📈 +5.7% (6M)</div>
                        </div>
                        <div @click="switchMetric('utility')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'utility' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-purple-200 hover:bg-purple-50']">
                            <div class="text-2xl font-bold text-purple-600">{{ loanUtilityRate }}%</div>
                            <div class="text-sm text-gray-600">Loan Utility %</div>
                            <div class="text-xs text-purple-500 font-medium">{{ loanUtilityPercentile }}{{
                                getOrdinalSuffix(loanUtilityPercentile) }} percentile</div>
                            <div class="text-xs text-purple-500 font-medium mt-1">📈 +3.1% (6M)</div>
                        </div>
                        <div @click="switchMetric('opportunity')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'opportunity' ? 'border-indigo-500 bg-indigo-50' : 'border-transparent hover:border-indigo-200 hover:bg-indigo-50']">
                            <div class="text-2xl font-bold text-indigo-600">{{ totalOpportunities }}</div>
                            <div class="text-sm text-gray-600">Total Opportunities</div>
                            <div class="text-xs text-indigo-500 font-medium">Top {{ opportunityPercentile }}% potential
                            </div>
                            <div class="text-xs text-indigo-500 font-medium mt-1">📈 +15.6% (6M)</div>
                        </div>
                        <div @click="switchMetric('risk')"
                            :class="['text-center cursor-pointer p-3 rounded-lg border-2 transition-all',
                                selectedMetric === 'risk' ? 'border-red-500 bg-red-50' : 'border-transparent hover:border-red-200 hover:bg-red-50']">
                            <div class="text-2xl font-bold text-red-600">{{ totalRiskFlags }}</div>
                            <div class="text-sm text-gray-600">Risk Flags</div>
                            <div class="text-xs text-red-500 font-medium">{{ riskFlagsPercentile }}{{
                                getOrdinalSuffix(riskFlagsPercentile) }} percentile</div>
                            <div class="text-xs text-red-500 font-medium mt-1">📉 -8.4% (6M)</div>
                        </div>
                    </div>

                    <!-- Integrated Trend Analysis -->
                    <div class="border-t border-gray-200 pt-6">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h4 class="text-base font-medium text-gray-900">📈 Trend Analysis: {{
                                    getMetricDisplayName(selectedMetric) }}</h4>
                                <p class="text-sm text-gray-500">{{ getMetricInsight(selectedMetric) }}</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <select v-model="selectedTrendClient"
                                    class="text-xs border border-gray-300 rounded px-2 py-1">
                                    <option value="all">All Clients</option>
                                    <option v-for="client in relationshipClients" :key="client.id" :value="client.id">
                                        {{ client.name }}
                                    </option>
                                </select>
                                <div class="flex space-x-1">
                                    <button @click="trendPeriod = 'monthly'"
                                        :class="['px-2 py-1 text-xs rounded', trendPeriod === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                        3M
                                    </button>
                                    <button @click="trendPeriod = 'quarterly'"
                                        :class="['px-2 py-1 text-xs rounded', trendPeriod === 'quarterly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                        6M
                                    </button>
                                    <button @click="trendPeriod = 'yearly'"
                                        :class="['px-2 py-1 text-xs rounded', trendPeriod === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                        1Y
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Chart Container -->
                        <div class="relative overflow-hidden">
                            <div class="w-full h-64">
                                <VueApexCharts :key="`chart-${selectedMetric}-${chartKey}`" type="bar"
                                    :options="chartOptions" :series="chartSeries" height="250" width="100%" />
                            </div>
                        </div>

                        <!-- Quick Insights -->
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div v-for="insight in getChartInsights()" :key="insight.id"
                                class="p-3 rounded-lg border border-gray-200 bg-gray-50">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="text-sm">{{ insight.icon }}</span>
                                    <span class="text-sm font-medium text-gray-900">{{ insight.title }}</span>
                                </div>
                                <div class="text-xs text-gray-600">{{ insight.text }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 🔗 Entity Relationship Map -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-800">🔗 Entity Relationship Map</h2>
                    <p class="text-sm text-gray-600 mt-1">Visual organization chart showing all client entities and
                        their connections</p>
                </div>
                <div class="p-4">
                    <!-- Cross-Entity Intelligence -->
                    <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-sm font-medium text-blue-800">Cross-Entity Intelligence</h4>
                        </div>
                        <div class="flex items-center space-x-4 text-sm">
                            <div class="flex items-center space-x-1">
                                <span class="text-blue-600 font-medium">👥</span>
                                <span class="text-blue-800">{{ totalBeneficialOwners }} Beneficial Owners</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <span class="text-blue-600 font-medium">✍️</span>
                                <span class="text-blue-800">{{ totalAuthorizedSigners }} Authorized Signers</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <span class="text-blue-600 font-medium">🎯</span>
                                <span class="text-blue-800">{{ totalConductors }} Conductors</span>
                            </div>
                        </div>
                    </div>

                    <!-- D3 Organizational Chart -->
                    <OrgChart :orgData="johnsonHoldingsOrgData" @nodeClick="navigateToClient" />

                    <!-- Chart Info Panel -->
                    <div class="mt-4 bg-white border rounded-lg p-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">4</div>
                                <div class="text-gray-600">Total Entities</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">3</div>
                                <div class="text-gray-600">Operating Companies</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">Low</div>
                                <div class="text-gray-600">Risk Rating</div>
                            </div>
                        </div>
                        <div class="mt-3 text-center text-xs text-gray-500">
                            Click on subsidiary companies to view detailed client analysis
                        </div>
                    </div>

                    <!-- Entity List -->
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div class="flex items-center mb-2">
                                <div class="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                                <span class="font-medium text-blue-800">Johnson Holdings Group</span>
                            </div>
                            <div class="text-xs text-blue-600 space-y-1">
                                <div>Total Assets: $3.2B</div>
                                <div>Entities: 3 companies</div>
                                <div>Risk: Low</div>
                            </div>
                        </div>

                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                            @click="navigateToClient('johnson_mfg')">
                            <div class="flex items-center mb-2">
                                <div class="w-3 h-3 bg-green-600 rounded mr-2"></div>
                                <span class="font-medium text-green-800">Johnson Manufacturing LLC</span>
                            </div>
                            <div class="text-xs text-green-600 space-y-1">
                                <div>Revenue: $850M</div>
                                <div>Facilities: 5 plants</div>
                                <div>Risk: Low</div>
                            </div>
                        </div>

                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                            @click="navigateToClient('jhg_sub_a')">
                            <div class="flex items-center mb-2">
                                <div class="w-3 h-3 bg-green-600 rounded mr-2"></div>
                                <span class="font-medium text-green-800">JHG - Subsidiary A</span>
                            </div>
                            <div class="text-xs text-green-600 space-y-1">
                                <div>Revenue: $420M</div>
                                <div>Focus: Services</div>
                                <div>Risk: Low</div>
                            </div>
                        </div>

                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                            @click="navigateToClient('jhg_sub_b')">
                            <div class="flex items-center mb-2">
                                <div class="w-3 h-3 bg-green-600 rounded mr-2"></div>
                                <span class="font-medium text-green-800">JHG - Subsidiary B</span>
                            </div>
                            <div class="text-xs text-green-600 space-y-1">
                                <div>Revenue: $315M</div>
                                <div>Focus: Distribution</div>
                                <div>Risk: Low</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Expandable Priority Details -->
            <div class="mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-4 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-medium text-gray-900">Priority Action Details</h3>
                        </div>
                    </div>
                    <div class="p-4 space-y-4">
                        <!-- Critical Alerts Details -->
                        <div>
                            <h4 class="font-medium text-red-800 mb-3 flex items-center">
                                <span class="text-lg mr-2">🚨</span>
                                Critical Alerts - Immediate Action Required
                            </h4>
                            <div class="space-y-2">
                                <div v-for="alert in priorityCriticalAlerts" :key="alert.id"
                                    @click="drillDownToClient(alert.client)"
                                    class="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                                    <div>
                                        <p class="font-medium text-red-900">{{ alert.client.name }}</p>
                                        <p class="text-sm text-red-700">{{ alert.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-sm font-medium text-red-600">{{ alert.value }}</div>
                                        <div class="text-xs text-red-500">{{ alert.timeframe }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Risk Reviews Details -->
                        <div>
                            <h4 class="font-medium text-orange-800 mb-3 flex items-center">
                                <span class="text-lg mr-2">📊</span>
                                Risk Reviews - Scheduled Assessments
                            </h4>
                            <div class="space-y-2">
                                <div v-for="review in priorityRiskReviews" :key="review.id"
                                    @click="drillDownToClient(review.client)"
                                    class="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
                                    <div>
                                        <p class="font-medium text-orange-900">{{ review.client.name }}</p>
                                        <p class="text-sm text-orange-700">{{ review.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-sm font-medium text-orange-600">{{ review.value }}</div>
                                        <div class="text-xs text-orange-500">{{ review.timeframe }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Compliance Actions Details -->
                        <div>
                            <h4 class="font-medium text-blue-800 mb-3 flex items-center">
                                <span class="text-lg mr-2">📋</span>
                                Compliance Actions - Regulatory Requirements
                            </h4>
                            <div class="space-y-2">
                                <div v-for="action in priorityComplianceActions" :key="action.id"
                                    @click="drillDownToClient(action.client)"
                                    class="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                                    <div>
                                        <p class="font-medium text-blue-900">{{ action.client.name }}</p>
                                        <p class="text-sm text-blue-700">{{ action.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-sm font-medium text-blue-600">{{ action.value }}</div>
                                        <div class="text-xs text-blue-500">{{ action.timeframe }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Client Portfolio Overview with Enhanced Navigation -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900">📊 Client Portfolio Overview</h3>
                            <p class="text-sm text-gray-500 mt-1">Click any client to view detailed analysis</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="clientViewType = 'cards'"
                                :class="['px-3 py-1 text-xs rounded', clientViewType === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                Cards
                            </button>
                            <button @click="clientViewType = 'table'"
                                :class="['px-3 py-1 text-xs rounded', clientViewType === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                Table
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Table View -->
                <div v-if="clientViewType === 'table'" class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Portfolio Value</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deposits</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loans</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Risk Flags</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Opportunities</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="client in relationshipClients" :key="client.id"
                                @click="drillDownToClient(client)"
                                class="hover:bg-gray-50 cursor-pointer transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <div class="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                                                :class="getRiskHeatMapColor(client.riskScore)">
                                                {{ client.name.split(' ')[0][0] }}{{ client.name.split(' ')[1]?.[0] ||
                                                    '' }}
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                                            <div class="text-sm text-gray-500">{{ client.industry ||
                                                relationship?.industry }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{
                                        formatCurrency(client.portfolioValue) }}</div>
                                    <div class="text-sm text-gray-500">{{ getClientPercentile(client) }}{{
                                        getOrdinalSuffix(getClientPercentile(client)) }} percentile</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatCurrency(getClientDeposits(client)) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatCurrency(getClientLoans(client)) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <span class="text-sm font-medium text-gray-900">
                                            {{ (client.riskFlags || []).length || Math.floor(Math.random() * 3) + 1 }}
                                        </span>
                                        <span class="ml-2 text-xs text-gray-500">flags</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-indigo-600">{{
                                            getClientOpportunityCount(client) }}</div>
                                        <div class="ml-2 text-sm text-gray-500">{{
                                            formatCurrency(getClientOpportunityValue(client)) }}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click.stop="drillDownToClient(client)"
                                        class="text-blue-600 hover:text-blue-800 font-medium">
                                        View Details →
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Enhanced Card View -->
                <div v-if="clientViewType === 'cards'" class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="client in relationshipClients" :key="client.id" @click="drillDownToClient(client)"
                            class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border-l-4 hover:scale-105"
                            :class="getRiskBorderClass(client.riskScore)">
                            <!-- Client Header -->
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-2">
                                    <div class="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-xs"
                                        :class="getRiskHeatMapColor(client.riskScore)">
                                        {{ client.name.split(' ')[0][0] }}{{ client.name.split(' ')[1]?.[0] || '' }}
                                    </div>
                                    <h4 class="text-sm font-medium text-gray-900">{{ client.name }}</h4>
                                </div>
                                <div class="flex items-center">
                                    <span class="text-sm font-medium text-gray-900">
                                        {{ (client.riskFlags || []).length || Math.floor(Math.random() * 3) + 1 }}
                                    </span>
                                    <span class="ml-1 text-xs text-gray-500">flags</span>
                                </div>
                            </div>

                            <!-- Key Metrics -->
                            <div class="space-y-2 text-sm mb-4">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Portfolio:</span>
                                    <span class="font-medium">{{ formatCurrency(client.portfolioValue) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Deposits:</span>
                                    <span class="font-medium text-green-600">{{
                                        formatCurrency(getClientDeposits(client)) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Loans:</span>
                                    <span class="font-medium text-orange-600">{{ formatCurrency(getClientLoans(client))
                                    }}</span>
                                </div>
                            </div>

                            <!-- Quick Actions -->
                            <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                                <div class="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>{{ getClientOpportunityCount(client) }} opportunities</span>
                                    <span>{{ (client.riskFlags || []).length || Math.floor(Math.random() * 3) + 1 }}
                                        flags</span>
                                </div>
                                <div class="text-xs font-medium text-blue-600">
                                    View Details →
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

    <!-- Alert Modal -->
    <div v-if="showAlertModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="showAlertModal = false">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <!-- Modal Header -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                            ⚠️ Relationship Alerts - {{ relationship?.name }}
                        </h2>
                        <p class="text-sm text-gray-600 mt-1">
                            {{ totalAlertCount }} active alert{{ totalAlertCount > 1 ? 's' : '' }} across {{
                                relationshipClients.length }} client{{ relationshipClients.length > 1 ? 's' : '' }}
                        </p>
                    </div>
                    <button @click="showAlertModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Alert Tabs -->
                <div class="mt-4 border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8" aria-label="Alert Tabs">
                        <button @click="activeAlertTab = 'delinquency'" :class="[
                            activeAlertTab === 'delinquency'
                                ? 'border-red-500 text-red-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2'
                        ]">
                            <span>🚨</span>
                            <span>Loan Delinquency</span>
                            <span v-if="relationshipLoanDelinquencyAlerts.length > 0"
                                class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                {{ relationshipLoanDelinquencyAlerts.length }}
                            </span>
                        </button>
                        <button @click="activeAlertTab = 'overdraft'" :class="[
                            activeAlertTab === 'overdraft'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2'
                        ]">
                            <span>💰</span>
                            <span>Overdraft</span>
                            <span v-if="relationshipOverdraftAlerts.length > 0"
                                class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                {{ relationshipOverdraftAlerts.length }}
                            </span>
                        </button>
                        <button @click="activeAlertTab = 'summary'" :class="[
                            activeAlertTab === 'summary'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2'
                        ]">
                            <span>📊</span>
                            <span>Alert Summary</span>
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Modal Body -->
            <div class="p-6 max-h-96 overflow-y-auto">
                <!-- Loan Delinquency Tab -->
                <div v-show="activeAlertTab === 'delinquency'">
                    <div v-if="relationshipLoanDelinquencyAlerts.length === 0" class="text-center py-8 text-gray-500">
                        <span class="text-4xl">✅</span>
                        <p class="mt-2">No loan delinquency alerts across the relationship</p>
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="alert in relationshipLoanDelinquencyAlerts" :key="alert.id"
                            class="border border-red-200 rounded-lg p-4 bg-red-50">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2 mb-3">
                                        <h4 class="font-semibold text-red-900">{{ alert.loanType }}</h4>
                                        <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                            {{ alert.daysPastDue }} days past due
                                        </span>
                                        <span
                                            class="bg-red-200 text-red-900 text-xs px-2 py-1 rounded-full font-medium">
                                            {{ alert.severity }}
                                        </span>
                                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            {{ alert.clientName }}
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                                        <div>
                                            <span class="text-gray-600">Account:</span>
                                            <div class="font-medium">{{ alert.accountNumber }}</div>
                                        </div>
                                        <div>
                                            <span class="text-gray-600">Amount Due:</span>
                                            <div class="font-medium text-red-600">{{ formatCurrency(alert.amountDue) }}
                                            </div>
                                        </div>
                                        <div>
                                            <span class="text-gray-600">Last Payment:</span>
                                            <div class="font-medium">{{ alert.lastPaymentDate }}</div>
                                        </div>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-gray-600">Total Outstanding:</span>
                                        <span class="font-medium text-red-700 ml-1">{{
                                            formatCurrency(alert.totalOutstanding) }}</span>
                                        <span class="text-gray-600 ml-3">Original Amount:</span>
                                        <span class="font-medium ml-1">{{ formatCurrency(alert.originalAmount) }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-col space-y-2 ml-4">
                                    <button @click="handleDelinquencyAlert(alert)"
                                        class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                                        Review Now
                                    </button>
                                    <button @click="scheduleCall(alert)"
                                        class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700">
                                        Schedule Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Overdraft Tab -->
                <div v-show="activeAlertTab === 'overdraft'">
                    <div v-if="relationshipOverdraftAlerts.length === 0" class="text-center py-8 text-gray-500">
                        <span class="text-4xl">✅</span>
                        <p class="mt-2">No overdraft alerts across the relationship</p>
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="alert in relationshipOverdraftAlerts" :key="alert.id"
                            class="border border-orange-200 rounded-lg p-4 bg-orange-50">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2 mb-3">
                                        <h4 class="font-semibold text-orange-900">{{ alert.accountType }}</h4>
                                        <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                            {{ alert.severity }} Priority
                                        </span>
                                        <span
                                            class="bg-orange-200 text-orange-900 text-xs px-2 py-1 rounded-full font-medium">
                                            {{ alert.daysOverdrawn }} days overdrawn
                                        </span>
                                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            {{ alert.clientName }}
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                                        <div>
                                            <span class="text-gray-600">Account:</span>
                                            <div class="font-medium">{{ alert.accountNumber }}</div>
                                        </div>
                                        <div>
                                            <span class="text-gray-600">Current Balance:</span>
                                            <div class="font-medium text-orange-600">{{
                                                formatCurrency(alert.currentBalance) }}</div>
                                        </div>
                                        <div>
                                            <span class="text-gray-600">Overdraft Amount:</span>
                                            <div class="font-medium text-red-600">{{
                                                formatCurrency(Math.abs(alert.currentBalance)) }}</div>
                                        </div>
                                    </div>
                                    <div class="text-sm">
                                        <span class="text-gray-600">Overdraft Limit:</span>
                                        <span class="font-medium ml-1">{{ formatCurrency(alert.overdraftLimit) }}</span>
                                        <span class="text-gray-600 ml-3">Fee Accrued:</span>
                                        <span class="font-medium text-red-600 ml-1">{{ formatCurrency(alert.feeAccrued)
                                        }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-col space-y-2 ml-4">
                                    <button @click="handleOverdraftAlert(alert)"
                                        class="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
                                        Review Account
                                    </button>
                                    <button @click="contactClient(alert)"
                                        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                                        Contact Client
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Alert Summary Tab -->
                <div v-show="activeAlertTab === 'summary'">
                    <div class="space-y-6">
                        <!-- Summary Statistics -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-red-50 rounded-lg p-4 border border-red-200">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-red-600">{{
                                        relationshipLoanDelinquencyAlerts.length }}</div>
                                    <div class="text-sm text-gray-600">Delinquent Loans</div>
                                    <div class="text-xs text-red-600 mt-1">
                                        {{ formatCurrency(totalDelinquencyAmount) }} at risk
                                    </div>
                                </div>
                            </div>
                            <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-orange-600">{{
                                        relationshipOverdraftAlerts.length }}</div>
                                    <div class="text-sm text-gray-600">Overdraft Accounts</div>
                                    <div class="text-xs text-orange-600 mt-1">
                                        {{ formatCurrency(totalOverdraftAmount) }} exposure
                                    </div>
                                </div>
                            </div>
                            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-blue-600">{{ alertedClientsCount }}</div>
                                    <div class="text-sm text-gray-600">Clients Affected</div>
                                    <div class="text-xs text-blue-600 mt-1">
                                        {{ Math.round((alertedClientsCount / relationshipClients.length) * 100) }}% of
                                        relationship
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Client Breakdown -->
                        <div>
                            <h4 class="text-base font-medium text-gray-900 mb-3">Alert Breakdown by Client</h4>
                            <div class="space-y-3">
                                <div v-for="client in clientsWithAlerts" :key="client.id"
                                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900">{{ client.name }}</div>
                                        <div class="text-sm text-gray-600">
                                            <span v-if="client.delinquencyCount > 0" class="text-red-600">
                                                {{ client.delinquencyCount }} delinquent loan{{ client.delinquencyCount
                                                    > 1 ? 's' : '' }}
                                            </span>
                                            <span v-if="client.delinquencyCount > 0 && client.overdraftCount > 0"> •
                                            </span>
                                            <span v-if="client.overdraftCount > 0" class="text-orange-600">
                                                {{ client.overdraftCount }} overdraft{{ client.overdraftCount > 1 ? 's'
                                                    : '' }}
                                            </span>
                                        </div>
                                    </div>
                                    <button @click="drillDownToClient(client)"
                                        class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-600">
                        Last updated: {{ new Date().toLocaleString() }}
                    </div>
                    <div class="flex space-x-3">
                        <button @click="exportAlertReport"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                            Export Report
                        </button>
                        <button @click="showAlertModal = false"
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm font-medium">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { relationshipManagers, relationships, clients, formatCurrency, getRiskColor, getClientsByRelationshipId } from '../data/mockData.js'
import VueApexCharts from 'vue3-apexcharts'
import OrgChart from './charts/OrgChart.vue'

export default {
    name: 'RelationshipView',
    components: {
        VueApexCharts,
        OrgChart
    },
    props: ['relationshipId'],
    setup() {
        const clientViewType = ref('table')
        const riskChartPeriod = ref('monthly')
        const trendPeriod = ref('monthly')
        const selectedMetric = ref('revenue')
        const selectedTrendClient = ref('all')
        const chartKey = ref(0)
        const chartOptions = ref({})
        const chartSeries = ref([])
        const showAlertModal = ref(false)
        const activeAlertTab = ref('delinquency')

        return {
            clientViewType,
            riskChartPeriod,
            trendPeriod,
            selectedMetric,
            selectedTrendClient,
            chartKey,
            chartOptions,
            chartSeries,
            showAlertModal,
            activeAlertTab
        }
    },
    computed: {
        relationship() {
            // Find the relationship across all RMs
            for (const rmId in relationships) {
                const rmRelationships = relationships[rmId] || []
                const found = rmRelationships.find(rel => rel.id === this.relationshipId)
                if (found) return found
            }
            return null
        },
        relationshipManager() {
            if (!this.relationship) return null
            return relationshipManagers.find(rm => rm.id === this.relationship.rmId)
        },
        relationshipClients() {
            return getClientsByRelationshipId(this.relationshipId) || []
        },

        // Portfolio Metrics
        totalPortfolioValue() {
            return this.relationshipClients.reduce((sum, client) => sum + (client.portfolioValue || 0), 0)
        },
        totalDeposits() {
            return this.relationshipClients.reduce((sum, client) => {
                return sum + (client.productSummary?.deposit?.balance || client.portfolioValue * 0.6 || 0)
            }, 0)
        },
        totalLoans() {
            return this.relationshipClients.reduce((sum, client) => {
                return sum + (client.productSummary?.lending?.balance || client.portfolioValue * 0.25 || 0)
            }, 0)
        },
        totalRevenue() {
            return this.relationshipClients.reduce((sum, client) => {
                // Calculate revenue based on portfolio value and product mix
                const portfolioValue = client.portfolioValue || 0
                const depositRevenue = (client.productSummary?.deposit?.balance || portfolioValue * 0.6) * 0.015 // 1.5% NIM on deposits
                const lendingRevenue = (client.productSummary?.lending?.balance || portfolioValue * 0.25) * 0.045 // 4.5% yield on loans
                const feeRevenue = portfolioValue * 0.008 // 0.8% fee income
                return sum + depositRevenue + lendingRevenue + feeRevenue
            }, 0)
        },
        totalAccounts() {
            return this.relationshipClients.reduce((sum, client) => {
                if (client.productSummary) {
                    return sum + Object.values(client.productSummary).reduce((acc, product) => acc + (product.accounts || 0), 0)
                }
                // Generate mock account count based on portfolio size
                const portfolioValue = client.portfolioValue || 0
                if (portfolioValue >= 100000000) return sum + Math.floor(Math.random() * 8) + 6
                if (portfolioValue >= 50000000) return sum + Math.floor(Math.random() * 6) + 4
                if (portfolioValue >= 10000000) return sum + Math.floor(Math.random() * 4) + 3
                return sum + Math.floor(Math.random() * 3) + 2
            }, 0)
        },
        loanUtilityRate() {
            // Calculate average loan utility rate across all clients
            const totalUtility = this.relationshipClients.reduce((sum, client) => {
                // Generate utility rate based on client portfolio size and risk profile
                const baseRate = Math.floor(Math.random() * 40) + 45 // 45-85%
                return sum + baseRate
            }, 0)
            return Math.floor(totalUtility / this.relationshipClients.length)
        },

        // Risk Metrics
        totalRiskFlags() {
            return this.relationshipClients.reduce((sum, client) => sum + (client.riskFlags?.length || Math.floor(Math.random() * 5) + 2), 0)
        },
        portfolioRiskLevel() {
            const avgRiskScore = this.relationshipClients.reduce((sum, client) => sum + (client.riskScore || Math.floor(Math.random() * 4) + 3), 0) / this.relationshipClients.length
            if (avgRiskScore >= 8) return 'High'
            if (avgRiskScore >= 6) return 'Medium'
            return 'Low'
        },
        highRiskClientCount() {
            return this.relationshipClients.filter(client => (client.riskScore || Math.floor(Math.random() * 4) + 3) >= 7).length
        },
        riskTrendYoY() {
            return Math.floor(Math.random() * 30) - 15 // -15% to +15%
        },
        riskTrendMoM() {
            return Math.floor(Math.random() * 20) - 10 // -10% to +10%
        },

        // Risk Transaction Metrics
        totalRiskTransactionAmount() {
            return Math.floor(this.totalPortfolioValue * (0.05 + Math.random() * 0.1)) // 5-15% of portfolio
        },
        totalRiskTransactionCount() {
            return Math.floor(this.relationshipClients.length * (8 + Math.random() * 12)) // 8-20 per client
        },
        totalUTRFiled() {
            return Math.floor(this.relationshipClients.length * (1 + Math.random() * 3)) // 1-4 per client
        },

        // Opportunity Metrics
        totalOpportunityValue() {
            return Math.floor(this.totalPortfolioValue * (0.1 + Math.random() * 0.15)) // 10-25% of portfolio
        },
        totalOpportunities() {
            return Math.floor(this.relationshipClients.length * (2 + Math.random() * 4)) // 2-6 per client
        },
        opportunityPercentile() {
            return Math.floor(85 + Math.random() * 14) // 85-99%
        },
        averageProductPenetration() {
            return Math.floor(45 + Math.random() * 30) // 45-75%
        },
        penetrationGap() {
            return 85 - this.averageProductPenetration
        },

        // Enhanced Header Metrics
        jurisdictionCount() {
            const jurisdictions = new Set()
            this.relationshipClients.forEach(client => {
                if (client.location) {
                    const state = client.location.split(', ')[1] || client.location
                    jurisdictions.add(state)
                }
            })
            return jurisdictions.size || 3 // Default to 3 for Johnson Holdings
        },

        averageRelationshipYears() {
            const totalYears = this.relationshipClients.reduce((sum, client) =>
                sum + (client.relationshipYears || 5), 0)
            return Math.round(totalYears / this.relationshipClients.length) || 6
        },

        totalBeneficialOwners() {
            // Count all beneficial owners across all entities in the relationship
            let totalCount = 0
            this.relationshipClients.forEach(client => {
                if (client.beneficialOwners && Array.isArray(client.beneficialOwners)) {
                    totalCount += client.beneficialOwners.length
                }
            })
            return totalCount
        },

        totalAuthorizedSigners() {
            // Count all authorized signers across all entities in the relationship
            let totalCount = 0
            this.relationshipClients.forEach(client => {
                if (client.authorizedSigners && Array.isArray(client.authorizedSigners)) {
                    totalCount += client.authorizedSigners.length
                }
            })
            return totalCount
        },

        totalConductors() {
            // Count all conductors across all entities in the relationship
            let totalCount = 0
            this.relationshipClients.forEach(client => {
                if (client.conductors && Array.isArray(client.conductors)) {
                    totalCount += client.conductors.length
                }
            })
            return totalCount
        },

        entityComplexityScore() {
            // Calculate complexity score based on entity structure and relationships
            let complexityScore = 0

            // Base complexity from number of entities
            complexityScore += this.relationshipClients.length * 10

            // Add complexity from beneficial ownership structure
            complexityScore += this.totalBeneficialOwners * 5

            // Add complexity from authorized signers
            complexityScore += this.totalAuthorizedSigners * 3

            // Add complexity from conductors
            complexityScore += this.totalConductors * 4

            // Add complexity from cross-entity relationships
            if (this.relationshipClients.length > 1) {
                complexityScore += 15 // Multi-entity relationship bonus
            }

            // Add complexity from jurisdictions
            complexityScore += this.jurisdictionCount * 8

            // Cap the score at 100 for readability
            return Math.min(100, complexityScore)
        },



        // D3 Org Chart Data
        johnsonHoldingsOrgData() {
            return {
                name: 'Johnson Holdings Group',
                assets: '$3.2B Total Assets',
                children: [
                    {
                        id: 'johnson_mfg',
                        name: 'Johnson Manufacturing LLC',
                        revenue: '$850M Revenue',
                        clickable: true,
                        tooltip: '<strong>Johnson Manufacturing LLC</strong><br/>Revenue: $850M<br/>Facilities: 5 plants<br/>Risk: Low<br/><em>Click to view details</em>'
                    },
                    {
                        id: 'jhg_sub_a',
                        name: 'JHG - Subsidiary A',
                        revenue: '$420M Revenue',
                        clickable: true,
                        tooltip: '<strong>JHG - Subsidiary A</strong><br/>Revenue: $420M<br/>Focus: Services<br/>Risk: Low<br/><em>Click to view details</em>'
                    },
                    {
                        id: 'jhg_sub_b',
                        name: 'JHG - Subsidiary B',
                        revenue: '$315M Revenue',
                        clickable: true,
                        tooltip: '<strong>JHG - Subsidiary B</strong><br/>Revenue: $315M<br/>Focus: Distribution<br/>Risk: Low<br/><em>Click to view details</em>'
                    }
                ]
            }
        },

        // Alert and Priority Data
        lastReviewDate() {
            const date = new Date()
            date.setDate(date.getDate() - Math.floor(Math.random() * 30 + 1)) // 1-30 days ago
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },

        // Simplified Priority Dashboard Counts
        criticalAlertCount() {
            return this.relationshipLoanDelinquencyAlerts.length + this.relationshipOverdraftAlerts.length
        },
        riskReviewCount() {
            return this.highRiskFlagClients + this.concentrationRiskClients
        },
        complianceActionCount() {
            return this.overdueReviews + this.beneficialOwnerUpdates
        },

        // Supporting metrics for priority cards
        highRiskFlagClients() {
            return this.relationshipClients.filter(client =>
                (client.riskFlags || []).length >= 3 || Math.floor(Math.random() * 3) + 1 >= 3
            ).length
        },
        concentrationRiskClients() {
            return this.relationshipClients.filter(client => client.portfolioValue > 50000000).length
        },
        overdueReviews() {
            return this.relationshipClients.filter(client => {
                const daysSinceReview = Math.floor(Math.random() * 45) + 15
                return client.portfolioValue > 25000000 && daysSinceReview > 30
            }).length
        },
        beneficialOwnerUpdates() {
            return Math.floor(this.relationshipClients.length * 0.3) // 30% need updates
        },

        // Detailed priority action arrays
        priorityCriticalAlerts() {
            const alerts = []

            // Add delinquency alerts
            this.relationshipLoanDelinquencyAlerts.forEach(alert => {
                alerts.push({
                    id: `delinq-${alert.clientId}`,
                    client: this.relationshipClients.find(c => c.id === alert.clientId) || { name: alert.clientName },
                    description: `${alert.daysOverdue} days past due`,
                    value: this.formatCurrency(alert.currentBalance),
                    timeframe: 'Immediate'
                })
            })

            // Add overdraft alerts
            this.relationshipOverdraftAlerts.forEach(alert => {
                alerts.push({
                    id: `overdraft-${alert.clientId}`,
                    client: this.relationshipClients.find(c => c.id === alert.clientId) || { name: alert.clientName },
                    description: `Account overdraft`,
                    value: this.formatCurrency(Math.abs(alert.currentBalance)),
                    timeframe: 'Today'
                })
            })

            return alerts
        },
        priorityRiskReviews() {
            const reviews = []

            this.relationshipClients.forEach(client => {
                const riskFlagsCount = (client.riskFlags || []).length || Math.floor(Math.random() * 3) + 1

                if (riskFlagsCount >= 3) {
                    reviews.push({
                        id: `risk-${client.id}`,
                        client,
                        description: 'Multiple risk flags review',
                        value: `${riskFlagsCount} flags`,
                        timeframe: 'This week'
                    })
                }

                if (client.portfolioValue > 50000000) {
                    reviews.push({
                        id: `concentration-${client.id}`,
                        client,
                        description: 'Credit concentration review',
                        value: this.formatCurrency(client.portfolioValue),
                        timeframe: 'This month'
                    })
                }
            })

            return reviews.slice(0, 4)
        },
        priorityGrowthOpportunities() {
            const opportunities = []

            this.relationshipClients.forEach(client => {
                const opportunityValue = this.getClientOpportunityValue(client)

                if (opportunityValue > 100000) {
                    opportunities.push({
                        id: `growth-${client.id}`,
                        client,
                        description: 'Cross-sell expansion',
                        value: opportunityValue,
                        probability: Math.floor(60 + Math.random() * 35)
                    })
                }
            })

            return opportunities.sort((a, b) => b.value - a.value).slice(0, 4)
        },
        priorityComplianceActions() {
            const actions = []

            this.relationshipClients.forEach(client => {
                if (client.portfolioValue > 25000000) {
                    const daysSinceReview = Math.floor(Math.random() * 45) + 15
                    if (daysSinceReview > 30) {
                        actions.push({
                            id: `compliance-${client.id}`,
                            client,
                            description: 'Annual review overdue',
                            value: `${daysSinceReview} days`,
                            timeframe: 'This week'
                        })
                    }
                }

                // BOI updates for entities with complex ownership
                if (Math.random() > 0.7) {
                    actions.push({
                        id: `boi-${client.id}`,
                        client,
                        description: 'BOI filing update required',
                        value: 'Due 30 days',
                        timeframe: 'This month'
                    })
                }
            })

            return actions.slice(0, 3)
        },

        priorityActions() {
            // Legacy computed property - kept for compatibility
            const actions = []

            // Generate risk-focused priority actions only
            this.relationshipClients.forEach(client => {
                const riskFlagsCount = (client.riskFlags || []).length || Math.floor(Math.random() * 3) + 1

                // High risk flags review
                if (riskFlagsCount >= 3) {
                    actions.push({
                        id: `risk-flags-${client.id}`,
                        client,
                        icon: '🚨',
                        description: 'Multiple risk flags require review',
                        value: `${riskFlagsCount} Risk Flags`,
                        valueClass: 'text-red-600',
                        timeframe: 'Urgent'
                    })
                }

                // Credit concentration risk
                if (client.portfolioValue > 50000000) {
                    actions.push({
                        id: `concentration-${client.id}`,
                        client,
                        icon: '📊',
                        description: 'Credit concentration review required',
                        value: this.formatCurrency(client.portfolioValue),
                        valueClass: 'text-orange-600',
                        timeframe: 'This week'
                    })
                }

                // Compliance review for large clients
                if (client.portfolioValue > 25000000) {
                    const daysSinceReview = Math.floor(Math.random() * 45) + 15 // 15-60 days
                    if (daysSinceReview > 30) {
                        actions.push({
                            id: `compliance-${client.id}`,
                            client,
                            icon: '📋',
                            description: 'Compliance review overdue',
                            value: `${daysSinceReview} days overdue`,
                            valueClass: 'text-yellow-600',
                            timeframe: 'This week'
                        })
                    }
                }

                // Cash flow monitoring for clients with multiple risk flags
                if (riskFlagsCount >= 2) {
                    actions.push({
                        id: `cashflow-${client.id}`,
                        client,
                        icon: '💸',
                        description: 'Cash flow monitoring required',
                        value: 'Monthly review',
                        valueClass: 'text-orange-600',
                        timeframe: 'This month'
                    })
                }
            })

            // Sort by priority: red (urgent), orange (high), yellow (medium)
            return actions.sort((a, b) => {
                const priorityOrder = { 'text-red-600': 0, 'text-orange-600': 1, 'text-yellow-600': 2 }
                return priorityOrder[a.valueClass] - priorityOrder[b.valueClass]
            }).slice(0, 8) // Top 8 priority risk actions
        },
        topOpportunities() {
            const opportunities = []

            this.relationshipClients.forEach(client => {
                const opportunityValue = this.getClientOpportunityValue(client)
                const opportunityCount = this.getClientOpportunityCount(client)

                if (opportunityValue > 100000) {
                    opportunities.push({
                        id: `opp-${client.id}`,
                        client,
                        icon: '💳',
                        description: `${opportunityCount} cross-sell opportunities`,
                        value: opportunityValue,
                        probability: Math.floor(60 + Math.random() * 35) // 60-95%
                    })
                }
            })

            return opportunities.sort((a, b) => b.value - a.value).slice(0, 6) // Top 6 opportunities
        },

        // Percentiles
        portfolioPercentile() {
            return Math.floor(Math.random() * 40) + 60 // 60-99th percentile
        },
        clientsPercentile() {
            return Math.floor(Math.random() * 30) + 70 // 70-99th percentile
        },
        depositsPercentile() {
            return Math.floor(Math.random() * 35) + 65 // 65-99th percentile
        },
        loansPercentile() {
            return Math.floor(Math.random() * 40) + 60 // 60-99th percentile
        },
        revenuePercentile() {
            return Math.floor(Math.random() * 30) + 70 // 70-99th percentile
        },
        accountsPercentile() {
            return Math.floor(Math.random() * 30) + 70 // 70-99th percentile
        },
        riskFlagsPercentile() {
            return Math.floor(Math.random() * 25) + 75 // 75-99th percentile
        },
        riskAmountPercentile() {
            return Math.floor(Math.random() * 20) + 80 // 80-99th percentile
        },
        riskCountPercentile() {
            return Math.floor(Math.random() * 25) + 75 // 75-99th percentile
        },
        utrPercentile() {
            return Math.floor(Math.random() * 15) + 85 // 85-99th percentile
        },
        loanUtilityPercentile() {
            return Math.floor(Math.random() * 30) + 70 // 70-99th percentile
        },

        // Chart Data
        riskTransactionTypes() {
            return [
                'Cannabis-Related Trx',
                'Cashier Check Purchase',
                'Casino Trx',
                'Crypto Trx',
                'High Cash Deposit',
                'High Cash Withdrawals',
                'HRJ Trx ATM withdrawal',
                'HRJ Trx Debit Purchase',
                'HRJ Trx Wire In',
                'HRJ Trx Wire Out',
                'Luxury Goods Trx',
                'Third Party Check Deposit'
            ]
        },

        chartMonths() {
            if (this.riskChartPeriod === 'quarterly') {
                return ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024']
            }
            const months = []
            const currentDate = new Date()
            for (let i = 11; i >= 0; i--) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
                months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
            }
            return months
        },

        maxChartValue() {
            // Calculate max value for chart scaling - include all transaction types
            let max = 0
            for (let monthIndex = 0; monthIndex < this.chartMonths.length; monthIndex++) {
                let monthTotal = 0
                for (let typeIndex = 0; typeIndex < this.riskTransactionTypes.length; typeIndex++) {
                    monthTotal += this.getRiskTransactionAmount(monthIndex, typeIndex)
                }
                max = Math.max(max, monthTotal)
            }
            return Math.ceil(max / 1000000) * 1000000 // Round up to nearest million
        },

        maxPortfolioValue() {
            // Calculate max portfolio value for trend chart
            const currentValue = this.totalPortfolioValue
            const maxGrowth = 1.3 // 30% above current
            return Math.ceil((currentValue * maxGrowth) / 1000000) * 1000000
        },
        portfolioTrendData() {
            const points = []
            const chartWidth = 300
            const chartHeight = 180

            if (this.maxPortfolioValue === 0) return []

            for (let i = 0; i < 12; i++) {
                const x = (i / 11) * chartWidth
                const value = this.getPortfolioValueForMonth(i)
                const y = chartHeight - ((value / this.maxPortfolioValue) * chartHeight)
                points.push({ x, y, value })
            }
            return points
        },
        portfolioTrendPoints() {
            if (!this.portfolioTrendData.length) return ' '
            return this.portfolioTrendData.map(p => `${p.x},${p.y}`).join(' ')
        },
        portfolioTrendPointsArray() {
            return this.portfolioTrendData
        },
        trendMonths() {
            const months = []
            const currentDate = new Date()
            for (let i = 11; i >= 0; i--) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
                months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
            }
            return months
        },
        portfolioGrowthYoY() {
            // Calculate YoY portfolio growth percentage
            return Math.floor(Math.random() * 25) + 5 // 5-30% growth
        },
        portfolioGrowthAmount() {
            // Calculate absolute growth amount
            return Math.floor(this.totalPortfolioValue * (this.portfolioGrowthYoY / 100))
        },
        portfolioGrowthMoM() {
            // Calculate MoM portfolio growth percentage
            return Math.floor(Math.random() * 8) - 2 // -2% to +6% monthly
        },
        portfolioGrowthAmountMoM() {
            // Calculate absolute monthly growth amount
            return Math.floor(this.totalPortfolioValue * (this.portfolioGrowthMoM / 100))
        },
        riskFlagGrowthYoY() {
            // Calculate YoY risk flag growth percentage
            return Math.floor(Math.random() * 40) - 10 // -10% to +30% change
        },
        riskFlagGrowthCount() {
            // Calculate absolute risk flag growth count
            return Math.floor(this.totalRiskFlags * (Math.abs(this.riskFlagGrowthYoY) / 100))
        },
        riskFlagGrowthMoM() {
            // Calculate MoM risk flag growth percentage
            return Math.floor(Math.random() * 20) - 5 // -5% to +15% monthly
        },
        riskFlagGrowthCountMoM() {
            // Calculate absolute monthly risk flag growth count
            return Math.floor(Math.random() * 5) + 1 // 1-5 new flags per month
        },
        riskToGrowthRatio() {
            // Calculate risk-to-growth ratio
            const riskGrowth = Math.abs(this.riskFlagGrowthYoY)
            const portfolioGrowth = this.portfolioGrowthYoY
            if (portfolioGrowth === 0) return 'N/A'
            return (riskGrowth / portfolioGrowth).toFixed(2)
        },
        maxRiskFlags() {
            // Calculate max risk flags for chart scaling
            return Math.max(20, this.totalRiskFlags + 10)
        },

        // Relationship-Level Alert System
        relationshipLoanDelinquencyAlerts() {
            const alerts = []

            // Generate delinquency alerts for specific clients in the relationship
            this.relationshipClients.forEach(client => {
                // Johnson Manufacturing LLC has specific delinquency
                if (client.name === 'Johnson Manufacturing LLC') {
                    alerts.push({
                        id: `del_${client.id}_001`,
                        clientId: client.id,
                        clientName: client.name,
                        loanType: 'Commercial Term Loan',
                        accountNumber: 'TL-2024-0892',
                        daysPastDue: 62,
                        amountDue: 125000,
                        totalOutstanding: 2156000,
                        originalAmount: 2800000,
                        lastPaymentDate: 'Oct 14, 2024',
                        severity: 'Critical'
                    })
                }

                // Generate additional delinquency alerts for other high-value clients
                const portfolioValue = client.portfolioValue || 0
                const clientRiskScore = client.riskScore || this.getGeneratedRiskScore(client)

                if (portfolioValue > 25000000 && clientRiskScore >= 6 && Math.random() > 0.7) {
                    alerts.push({
                        id: `del_${client.id}_002`,
                        clientId: client.id,
                        clientName: client.name,
                        loanType: 'SBA 504 Loan',
                        accountNumber: `SBA-${Math.floor(Math.random() * 9000) + 1000}`,
                        daysPastDue: Math.floor(Math.random() * 45) + 30, // 30-75 days
                        amountDue: Math.floor(Math.random() * 75000) + 25000, // $25K-$100K
                        totalOutstanding: Math.floor(portfolioValue * 0.15), // 15% of portfolio
                        originalAmount: Math.floor(portfolioValue * 0.2), // 20% of portfolio
                        lastPaymentDate: this.getRandomPastDate(30, 75),
                        severity: Math.random() > 0.5 ? 'High' : 'Critical'
                    })
                }
            })

            return alerts
        },

        relationshipOverdraftAlerts() {
            const alerts = []

            this.relationshipClients.forEach(client => {
                const portfolioValue = client.portfolioValue || 0
                const clientRiskScore = client.riskScore || this.getGeneratedRiskScore(client)

                // Johnson Manufacturing LLC has specific overdraft
                if (client.name === 'Johnson Manufacturing LLC') {
                    alerts.push({
                        id: `od_${client.id}_001`,
                        clientId: client.id,
                        clientName: client.name,
                        accountType: 'Business Checking',
                        accountNumber: 'CHK-847291',
                        currentBalance: -15250,
                        overdraftLimit: 50000,
                        feeAccrued: 275,
                        severity: 'High',
                        daysOverdrawn: 3
                    })
                }

                // Generate overdraft alerts for medium to high-value clients
                if (portfolioValue > 10000000 && Math.random() > 0.8) {
                    const overdraftAmount = Math.floor(Math.random() * 25000) + 5000 // $5K-$30K
                    alerts.push({
                        id: `od_${client.id}_002`,
                        clientId: client.id,
                        clientName: client.name,
                        accountType: 'Business Operating Account',
                        accountNumber: `CHK-${Math.floor(Math.random() * 900000) + 100000}`,
                        currentBalance: -overdraftAmount,
                        overdraftLimit: Math.floor(portfolioValue * 0.001), // 0.1% of portfolio as limit
                        feeAccrued: Math.floor(overdraftAmount * 0.02), // 2% fee
                        severity: overdraftAmount > 15000 ? 'High' : 'Medium',
                        daysOverdrawn: Math.floor(Math.random() * 10) + 1 // 1-10 days
                    })
                }
            })

            return alerts
        },

        // Alert Summary Computed Properties
        totalAlertCount() {
            return this.relationshipLoanDelinquencyAlerts.length + this.relationshipOverdraftAlerts.length
        },

        hasCriticalAlerts() {
            return this.relationshipLoanDelinquencyAlerts.some(alert => alert.severity === 'Critical') ||
                this.relationshipOverdraftAlerts.some(alert => alert.severity === 'High')
        },

        alertIndicatorClass() {
            if (this.hasCriticalAlerts) {
                return 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-300'
            } else if (this.relationshipOverdraftAlerts.length > 0) {
                return 'bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-300'
            } else {
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300'
            }
        },

        alertIndicatorIcon() {
            if (this.hasCriticalAlerts) return '🚨'
            if (this.relationshipOverdraftAlerts.length > 0) return '⚠️'
            return '⚠️'
        },

        totalDelinquencyAmount() {
            return this.relationshipLoanDelinquencyAlerts.reduce((sum, alert) => sum + alert.totalOutstanding, 0)
        },

        totalOverdraftAmount() {
            return this.relationshipOverdraftAlerts.reduce((sum, alert) => sum + Math.abs(alert.currentBalance), 0)
        },

        alertedClientsCount() {
            const clientIds = new Set()
            this.relationshipLoanDelinquencyAlerts.forEach(alert => clientIds.add(alert.clientId))
            this.relationshipOverdraftAlerts.forEach(alert => clientIds.add(alert.clientId))
            return clientIds.size
        },

        clientsWithAlerts() {
            const alertMap = new Map()

            // Initialize all clients with 0 alerts
            this.relationshipClients.forEach(client => {
                alertMap.set(client.id, {
                    ...client,
                    delinquencyCount: 0,
                    overdraftCount: 0
                })
            })

            // Count delinquency alerts by client
            this.relationshipLoanDelinquencyAlerts.forEach(alert => {
                const client = alertMap.get(alert.clientId)
                if (client) {
                    client.delinquencyCount++
                }
            })

            // Count overdraft alerts by client
            this.relationshipOverdraftAlerts.forEach(alert => {
                const client = alertMap.get(alert.clientId)
                if (client) {
                    client.overdraftCount++
                }
            })

            // Return only clients with alerts
            return Array.from(alertMap.values()).filter(client =>
                client.delinquencyCount > 0 || client.overdraftCount > 0
            )
        }
    },
    methods: {
        formatCurrency,
        getRiskColor,

        getOrdinalSuffix(num) {
            const j = num % 10
            const k = num % 100
            if (j === 1 && k !== 11) return 'st'
            if (j === 2 && k !== 12) return 'nd'
            if (j === 3 && k !== 13) return 'rd'
            return 'th'
        },

        getRiskScoreClass(score) {
            if (!score) return 'bg-gray-100 text-gray-800'
            if (score >= 8) return 'bg-red-100 text-red-800'
            if (score >= 6) return 'bg-orange-100 text-orange-800'
            if (score >= 4) return 'bg-yellow-100 text-yellow-800'
            return 'bg-green-100 text-green-800'
        },

        getRiskLevelClass(level) {
            switch (level) {
                case 'High': return 'text-red-600 font-medium'
                case 'Medium': return 'text-orange-600 font-medium'
                case 'Low': return 'text-green-600 font-medium'
                default: return 'text-gray-600'
            }
        },



        getRiskHeatMapColor(score) {
            if (!score) score = Math.floor(Math.random() * 4) + 3
            if (score >= 8) return 'bg-red-500'
            if (score >= 6) return 'bg-orange-500'
            if (score >= 4) return 'bg-yellow-500'
            return 'bg-green-500'
        },

        getRiskBorderClass(score) {
            if (!score) score = Math.floor(Math.random() * 4) + 3
            if (score >= 8) return 'border-red-500'
            if (score >= 6) return 'border-orange-500'
            if (score >= 4) return 'border-yellow-500'
            return 'border-green-500'
        },

        getRiskFlagClass(severity) {
            switch (severity) {
                case 'Critical': return 'bg-red-100 text-red-800'
                case 'Review': return 'bg-orange-100 text-orange-800'
                case 'Watch': return 'bg-yellow-100 text-yellow-800'
                default: return 'bg-gray-100 text-gray-800'
            }
        },

        getClientDeposits(client) {
            return client.productSummary?.deposit?.balance || client.portfolioValue * 0.6 || 0
        },

        getClientLoans(client) {
            return client.productSummary?.lending?.balance || client.portfolioValue * 0.25 || 0
        },

        getClientOpportunityCount(client) {
            return Math.floor(2 + Math.random() * 4) // 2-6 opportunities per client
        },

        getClientOpportunityValue(client) {
            // Calculate opportunity value based on client portfolio size and penetration gaps
            const baseValue = client.portfolioValue * 0.15 // 15% of portfolio as opportunity baseline
            const penetrationMultiplier = (100 - this.averageProductPenetration) / 100 // Higher if lower penetration
            return Math.floor(baseValue * penetrationMultiplier * (1 + Math.random() * 0.5)) // Add some randomness
        },

        getGeneratedRiskScore(client) {
            // Generate consistent risk score based on client characteristics
            let score = 3 + Math.floor(Math.random() * 4) // Base 3-7
            if (client.portfolioValue > 100000000) score = Math.min(score + 1, 9) // Large clients may have higher risk
            if (client.portfolioValue < 10000000) score = Math.max(score - 1, 1) // Smaller clients may have lower risk
            return score
        },

        getClientPercentile(client) {
            // Generate percentile based on portfolio value
            if (client.portfolioValue >= 100000000) return Math.floor(90 + Math.random() * 9) // 90-98th
            if (client.portfolioValue >= 50000000) return Math.floor(80 + Math.random() * 15) // 80-94th
            if (client.portfolioValue >= 25000000) return Math.floor(70 + Math.random() * 20) // 70-89th
            if (client.portfolioValue >= 10000000) return Math.floor(60 + Math.random() * 25) // 60-84th
            return Math.floor(40 + Math.random() * 30) // 40-69th
        },



        drillDownToClient(client) {
            // Use the full hierarchical route path with all required parameters
            this.$router.push({
                name: 'ClientDetail',
                params: {
                    ...this.$route.params,
                    clientId: client.id
                }
            })
        },

        navigateToClient(clientId) {
            // Navigate to ClientDetailView for the specified entity
            // Map entity IDs to actual client IDs from the relationship
            const clientMappings = {
                'johnson_mfg': 'client_001',      // Johnson Manufacturing LLC
                'jhg_sub_a': 'client_002',        // JHG - Subsidiary A  
                'jhg_sub_b': 'client_003'         // JHG - Subsidiary B
            }

            const actualClientId = clientMappings[clientId] || clientId

            this.$router.push({
                name: 'ClientDetail',
                params: {
                    ...this.$route.params,
                    clientId: actualClientId
                }
            })
        },

        goBackToRM() {
            // Find the RM ID from the relationship
            const rmId = this.relationship?.rmId
            if (rmId) {
                this.$router.push(`/relationship-manager/${rmId}`)
            }
        },

        // Chart Methods
        getRiskTypeColor(index) {
            const colors = [
                'bg-teal-800',      // Dark teal
                'bg-teal-400',      // Light teal
                'bg-gray-100',      // Light gray
                'bg-red-200',       // Light pink
                'bg-orange-300',    // Light orange
                'bg-green-400',     // Medium green
                'bg-green-600',     // Darker green
                'bg-green-700',     // Dark green
                'bg-green-300',     // Light green
                'bg-green-200',     // Very light green
                'bg-green-100',     // Pale green
                'bg-gray-50'        // Very light gray
            ]
            return colors[index % colors.length]
        },

        formatChartValue(value) {
            if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`
            } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(0)}K`
            }
            return `$${value.toFixed(0)}`
        },

        getRiskFlagsForMonth(index) {
            // Calculate risk flags for a specific month
            const baseFlags = Math.floor(this.totalRiskFlags / 3) // Base monthly flags
            const seasonalVariation = Math.sin((index / 12) * 2 * Math.PI) * 2 // Seasonal pattern
            const randomVariation = (Math.random() - 0.5) * 4 // Random variation
            return Math.max(1, Math.floor(baseFlags + seasonalVariation + randomVariation))
        },

        getRiskFlagBarHeight(index) {
            // Calculate bar height for risk flags chart
            if (this.maxRiskFlags === 0) return 2
            const flagCount = this.getRiskFlagsForMonth(index)
            const maxHeight = 180 // Chart height in pixels
            return Math.max(2, (flagCount / this.maxRiskFlags) * maxHeight)
        },

        getRiskTransactionAmount(monthIndex, typeIndex) {
            // Generate realistic risk transaction amounts based on portfolio size and type
            const baseAmount = this.totalPortfolioValue * 0.001 // 0.1% of portfolio per type per month
            const typeMultipliers = [0.8, 1.2, 0.6, 1.5, 2.0, 1.1, 0.9, 0.7, 1.3, 1.0, 0.5, 0.8]
            const seasonalVariation = 0.8 + (Math.sin((monthIndex / 12) * 2 * Math.PI) * 0.3) // Seasonal variation
            const randomVariation = 0.7 + (Math.random() * 0.6) // Random variation

            return Math.floor(baseAmount * typeMultipliers[typeIndex] * seasonalVariation * randomVariation)
        },

        getBarHeight(monthIndex, typeIndex) {
            if (this.maxChartValue === 0) return 1
            const amount = this.getRiskTransactionAmount(monthIndex, typeIndex)
            const maxHeight = 200 // Total chart height in pixels
            return Math.max(1, (amount / this.maxChartValue) * maxHeight) // Minimum 1px height for visibility
        },

        getPortfolioValueForMonth(index) {
            // Calculate portfolio value for a specific month in the trend
            const baseValue = this.totalPortfolioValue * (0.7 + (index / 11) * 0.3) // Growth trend
            const variation = (Math.random() - 0.5) * 0.1 * baseValue // ±10% variation
            return baseValue + variation
        },

        // ApexCharts Methods
        switchMetric(metric) {
            console.log('🔄 Switching to metric:', metric, 'current:', this.selectedMetric)

            // Update metric (even if it's the same - forces refresh)
            this.selectedMetric = metric

            // Increment key to force component re-render
            this.chartKey += 1

            // Update chart data and options
            this.updateChart()
        },

        updateChart() {
            console.log('🎯 Updating chart for metric:', this.selectedMetric)

            // Generate chart data and options
            const data = this.getChartData()
            const options = this.getApexChartOptions()

            // Update reactive variables
            this.chartSeries = data.series
            this.chartOptions = options

            console.log('✅ Chart updated successfully for metric:', this.selectedMetric)
        },

        getChartData() {
            const labels = this.chartMonths

            // For stacked bar charts, create multiple series for better visualization
            if (this.selectedMetric === 'deposits' || this.selectedMetric === 'loans') {
                return this.getStackedFinancialData(labels)
            } else if (this.selectedMetric === 'accounts') {
                return this.getStackedAccountData(labels)
            } else if (this.selectedMetric === 'opportunity') {
                return this.getStackedOpportunityData(labels)
            } else if (this.selectedMetric === 'risk') {
                return this.getStackedRiskData(labels)
            }

            // Default single series for other metrics
            const data = []
            for (let i = 0; i < labels.length; i++) {
                try {
                    const value = this.getMetricValue(this.selectedMetric, i)
                    data.push(isNaN(value) ? 0 : Number(value))
                } catch (error) {
                    console.error('Error getting metric value for index', i, error)
                    data.push(0)
                }
            }

            return {
                series: [{
                    name: this.getMetricLabel(this.selectedMetric) || 'Unknown Metric',
                    data: data || []
                }],
                categories: labels || []
            }
        },

        getStackedFinancialData(labels) {
            const series = []
            const clientCount = this.relationshipClients.length

            // Create series for each client
            this.relationshipClients.forEach((client, clientIndex) => {
                const data = []
                for (let i = 0; i < labels.length; i++) {
                    let value = 0
                    if (this.selectedMetric === 'revenue') {
                        // Calculate client revenue based on portfolio
                        const portfolioValue = client.portfolioValue || 0
                        const depositRevenue = this.getClientDeposits(client) * 0.015 // 1.5% NIM
                        const lendingRevenue = this.getClientLoans(client) * 0.045 // 4.5% yield
                        const feeRevenue = portfolioValue * 0.008 // 0.8% fee income
                        value = (depositRevenue + lendingRevenue + feeRevenue) * (0.75 + (i / 11) * 0.25) * (0.9 + Math.random() * 0.2)
                    } else if (this.selectedMetric === 'deposits') {
                        value = this.getClientDeposits(client) * (0.8 + (i / 11) * 0.2) * (0.9 + Math.random() * 0.2)
                    } else if (this.selectedMetric === 'loans') {
                        value = this.getClientLoans(client) * (0.85 + (i / 11) * 0.15) * (0.9 + Math.random() * 0.2)
                    }
                    data.push(Math.floor(value))
                }

                series.push({
                    name: client.name,
                    data: data
                })
            })

            return { series, categories: labels }
        },

        getStackedAccountData(labels) {
            const accountTypes = ['Checking', 'Savings', 'Credit', 'Investment']
            const series = []

            accountTypes.forEach(type => {
                const data = []
                for (let i = 0; i < labels.length; i++) {
                    // Generate account counts with growth trend
                    const baseCount = Math.floor(this.totalAccounts / 4) * (0.9 + (i / 11) * 0.1)
                    const variation = Math.floor(Math.random() * 3) - 1
                    data.push(Math.max(1, baseCount + variation))
                }

                series.push({
                    name: `${type} Accounts`,
                    data: data
                })
            })

            return { series, categories: labels }
        },

        getStackedOpportunityData(labels) {
            const oppTypes = ['Credit Products', 'Treasury Services', 'Investment Products', 'FX Services']
            const series = []

            oppTypes.forEach(type => {
                const data = []
                for (let i = 0; i < labels.length; i++) {
                    const baseValue = (this.totalOpportunityValue / 4) * (0.8 + Math.random() * 0.4)
                    data.push(Math.floor(baseValue))
                }

                series.push({
                    name: type,
                    data: data
                })
            })

            return { series, categories: labels }
        },

        getStackedRiskData(labels) {
            const riskTypes = ['High Risk', 'Medium Risk', 'Low Risk', 'Compliance']
            const series = []

            riskTypes.forEach((type, index) => {
                const data = []
                for (let i = 0; i < labels.length; i++) {
                    let baseCount = 0
                    switch (index) {
                        case 0: baseCount = Math.floor(this.totalRiskFlags * 0.3); break // High
                        case 1: baseCount = Math.floor(this.totalRiskFlags * 0.4); break // Medium  
                        case 2: baseCount = Math.floor(this.totalRiskFlags * 0.2); break // Low
                        case 3: baseCount = Math.floor(this.totalRiskFlags * 0.1); break // Compliance
                    }
                    const variation = Math.floor(Math.random() * 3) - 1
                    data.push(Math.max(0, baseCount + variation))
                }

                series.push({
                    name: type,
                    data: data
                })
            })

            return { series, categories: labels }
        },

        getApexChartOptions() {
            const isStacked = this.isStackedMetric(this.selectedMetric)

            return {
                chart: {
                    type: 'bar',
                    height: 250,
                    stacked: isStacked,
                    toolbar: {
                        show: false
                    },
                    background: 'transparent',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    parentHeightOffset: 0,
                    redrawOnParentResize: true,
                    zoom: {
                        enabled: false
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: isStacked ? 2 : 4,
                        columnWidth: '70%',
                        dataLabels: {
                            position: 'top'
                        },
                        borderRadiusApplication: 'end'
                    }
                },
                colors: this.getMetricColors(this.selectedMetric),
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: this.chartMonths,
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        style: {
                            colors: '#6B7280',
                            fontSize: '11px',
                            fontWeight: 500
                        },
                        maxHeight: 60,
                        rotate: -45
                    }
                },
                yaxis: {
                    labels: {
                        formatter: (value) => this.formatYAxisLabel(value),
                        style: {
                            colors: '#6B7280',
                            fontSize: '11px',
                            fontWeight: 500
                        },
                        maxWidth: 80
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                grid: {
                    show: true,
                    borderColor: '#F3F4F6',
                    strokeDashArray: 3,
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                legend: {
                    show: isStacked,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 500,
                    labels: {
                        colors: '#6B7280'
                    },
                    markers: {
                        width: 8,
                        height: 8,
                        radius: 2
                    },
                    itemMargin: {
                        horizontal: 8,
                        vertical: 4
                    }
                },
                tooltip: {
                    y: {
                        formatter: (value) => this.formatTooltipValue(value)
                    },
                    theme: 'light',
                    style: {
                        fontSize: '12px'
                    }
                },
                stroke: {
                    show: false
                },
                fill: {
                    opacity: 0.85
                },
                responsive: [{
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 200
                        },
                        plotOptions: {
                            bar: {
                                columnWidth: '80%'
                            }
                        },
                        xaxis: {
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        }
                    }
                }]
            }
        },

        isStackedMetric(metric) {
            return ['revenue', 'deposits', 'loans', 'accounts', 'opportunity', 'risk'].includes(metric)
        },

        getMetricColors(metric) {
            const colorSchemes = {
                revenue: ['#059669', '#10B981', '#34D399', '#6EE7B7'],
                deposits: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
                loans: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
                accounts: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
                opportunity: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'],
                risk: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
                utility: ['#6366F1']
            }
            return colorSchemes[metric] || ['#6B7280']
        },

        formatTooltipValue(value) {
            if (this.selectedMetric === 'penetration' || this.selectedMetric === 'utility') {
                return `${value.toFixed(1)}%`
            } else if (['revenue', 'deposits', 'loans', 'portfolio', 'opportunity'].includes(this.selectedMetric)) {
                return this.formatCurrency(value)
            }
            return Math.floor(value).toString()
        },

        getMetricLabel(metric) {
            const labels = {
                revenue: 'Total Revenue',
                accounts: 'Total Accounts',
                deposits: 'Total Deposits',
                loans: 'Total Loans',
                utility: 'Loan Utility Rate',
                opportunity: 'Opportunity Value',
                risk: 'Risk Flags',
                portfolio: 'Portfolio Value',
                penetration: 'Product Penetration'
            }
            return labels[metric] || metric
        },

        getMetricColor(metric) {
            const colors = {
                portfolio: '#10B981',
                penetration: '#3B82F6',
                risk: '#EF4444',
                opportunity: '#8B5CF6'
            }
            return colors[metric] || '#6B7280'
        },

        formatYAxisLabel(value) {
            if (this.selectedMetric === 'penetration' || this.selectedMetric === 'utility') {
                return `${value}%`
            } else if (['revenue', 'deposits', 'loans', 'portfolio', 'opportunity'].includes(this.selectedMetric)) {
                if (value >= 1000000) {
                    return `$${(value / 1000000).toFixed(1)}M`
                } else if (value >= 1000) {
                    return `$${(value / 1000).toFixed(0)}K`
                }
                return `$${value}`
            }
            return Math.floor(value)
        },

        getMetricValue(metric, index) {
            switch (metric) {
                case 'revenue':
                    return this.totalRevenue * (0.75 + (index / 11) * 0.25) * (0.9 + Math.random() * 0.2)
                case 'deposits':
                    return this.totalDeposits * (0.8 + (index / 11) * 0.2) * (0.9 + Math.random() * 0.2)
                case 'loans':
                    return this.totalLoans * (0.85 + (index / 11) * 0.15) * (0.9 + Math.random() * 0.2)
                case 'accounts':
                    return Math.floor(this.totalAccounts * (0.9 + (index / 11) * 0.1))
                case 'utility':
                    const baseUtility = this.loanUtilityRate + (Math.random() - 0.5) * 10
                    return Math.max(20, Math.min(95, baseUtility))
                case 'opportunity':
                    const baseOpp = this.totalOpportunityValue / 12
                    return baseOpp * (0.8 + Math.random() * 0.4)
                case 'risk':
                    return this.getRiskFlagsForMonth(index)
                case 'portfolio':
                    if (this.selectedTrendClient === 'all') {
                        return this.getPortfolioValueForMonth(index)
                    } else {
                        const client = this.relationshipClients.find(c => c.id === this.selectedTrendClient)
                        if (client) {
                            const baseValue = client.portfolioValue * (0.8 + (index / 11) * 0.2)
                            return baseValue + (Math.random() - 0.5) * 0.1 * baseValue
                        }
                    }
                    return 0
                case 'penetration':
                    const baseValue = Math.floor(this.averageProductPenetration + (Math.random() - 0.5) * 30)
                    return Math.max(30, Math.min(85, baseValue))
                default:
                    return 0
            }
        },

        getChartInsights() {
            const insights = []

            switch (this.selectedMetric) {
                case 'revenue':
                    insights.push(
                        {
                            id: 'total',
                            icon: '💰',
                            title: 'Total Revenue',
                            text: `${this.formatCurrency(this.totalRevenue)} annual revenue generated`
                        },
                        {
                            id: 'growth',
                            icon: '📈',
                            title: 'Revenue Growth',
                            text: `${this.revenuePercentile}th percentile performance, trending upward`
                        },
                        {
                            id: 'composition',
                            icon: '🎯',
                            title: 'Revenue Mix',
                            text: 'Balanced across deposits, lending, and fee income streams'
                        }
                    )
                    break
                case 'portfolio':
                    insights.push(
                        {
                            id: 'growth',
                            icon: '📈',
                            title: 'Growth Trend',
                            text: `Portfolio growing at ${this.portfolioGrowthYoY}% YoY rate`
                        },
                        {
                            id: 'performance',
                            icon: '🎯',
                            title: 'Performance',
                            text: `${this.portfolioPercentile}th percentile among peer relationships`
                        },
                        {
                            id: 'opportunity',
                            icon: '💡',
                            title: 'Next Steps',
                            text: `Focus on ${this.relationshipClients.length} high-value clients for expansion`
                        }
                    )
                    break
                case 'penetration':
                    insights.push(
                        {
                            id: 'current',
                            icon: '📊',
                            title: 'Current State',
                            text: `${this.averageProductPenetration}% average penetration across portfolio`
                        },
                        {
                            id: 'gap',
                            icon: '🔍',
                            title: 'Opportunity Gap',
                            text: `${this.penetrationGap}% improvement potential identified`
                        },
                        {
                            id: 'focus',
                            icon: '🎯',
                            title: 'Priority Products',
                            text: 'Treasury and lending show highest cross-sell potential'
                        }
                    )
                    break
                case 'risk':
                    insights.push(
                        {
                            id: 'level',
                            icon: '⚠️',
                            title: 'Risk Level',
                            text: `${this.portfolioRiskLevel} overall risk with ${this.totalRiskFlags} active flags`
                        },
                        {
                            id: 'trend',
                            icon: this.riskFlagGrowthYoY > 0 ? '📈' : '📉',
                            title: 'Risk Trend',
                            text: `Risk flags ${this.riskFlagGrowthYoY > 0 ? 'increased' : 'decreased'} ${Math.abs(this.riskFlagGrowthYoY)}% YoY`
                        },
                        {
                            id: 'action',
                            icon: '🔧',
                            title: 'Required Action',
                            text: `${this.highRiskClientCount} clients need immediate attention`
                        }
                    )
                    break
                case 'opportunity':
                    insights.push(
                        {
                            id: 'value',
                            icon: '💰',
                            title: 'Total Value',
                            text: `${this.formatCurrency(this.totalOpportunityValue)} in identified opportunities`
                        },
                        {
                            id: 'count',
                            icon: '📝',
                            title: 'Active Opportunities',
                            text: `${this.totalOpportunities} opportunities across relationship`
                        },
                        {
                            id: 'potential',
                            icon: '🚀',
                            title: 'High Potential',
                            text: `Top ${this.opportunityPercentile}% relationship for revenue growth`
                        }
                    )
                    break
            }

            return insights
        },

        getMetricDisplayName(metric) {
            const names = {
                revenue: 'Total Revenue',
                accounts: 'Total Accounts',
                deposits: 'Total Deposits',
                loans: 'Total Loans',
                utility: 'Loan Utility Rate',
                opportunity: 'Opportunities',
                risk: 'Risk Flags'
            }
            return names[metric] || metric
        },

        getMetricInsight(metric) {
            const insights = {
                revenue: 'Revenue trends show relationship profitability and fee income generation',
                accounts: 'Account growth indicates relationship expansion and engagement',
                deposits: 'Deposit trends reflect client liquidity and trust in the relationship',
                loans: 'Lending utilization shows credit facility adoption and business growth',
                utility: 'Utility rate indicates efficiency of credit facility usage',
                opportunity: 'Opportunity pipeline shows potential for revenue growth',
                risk: 'Risk flag trends help identify emerging compliance or operational concerns'
            }
            return insights[metric] || 'Select a metric to view detailed trend analysis'
        },

        // Alert-related methods
        getRandomPastDate(minDays, maxDays) {
            const now = new Date()
            const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays
            const pastDate = new Date(now.getTime() - (randomDays * 24 * 60 * 60 * 1000))
            return pastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },

        handleDelinquencyAlert(alert) {
            console.log('Handling delinquency alert:', alert)
            // In a real app, this would navigate to the specific loan details or open a review workflow
            this.$router.push({
                name: 'ClientDetail',
                params: {
                    ...this.$route.params,
                    clientId: alert.clientId
                }
            })
        },

        handleOverdraftAlert(alert) {
            console.log('Handling overdraft alert:', alert)
            // In a real app, this would navigate to the specific account details
            this.$router.push({
                name: 'ClientDetail',
                params: {
                    ...this.$route.params,
                    clientId: alert.clientId
                }
            })
        },

        scheduleCall(alert) {
            console.log('Scheduling call for:', alert)
            // In a real app, this would open a calendar scheduling interface
            alert('Call scheduled for ' + alert.clientName)
        },

        contactClient(alert) {
            console.log('Contacting client:', alert)
            // In a real app, this would open contact management interface
            alert('Contacting ' + alert.clientName)
        },

        generateRelationshipReport() {
            console.log('Generating relationship report for:', this.relationship?.name)
            // In a real app, this would generate a comprehensive relationship report
            alert('Generating relationship report...')
        },

        scheduleReview() {
            console.log('Scheduling review for:', this.relationship?.name)
            // In a real app, this would open calendar to schedule relationship review
            alert('Scheduling relationship review...')
        },

        exportAlertReport() {
            console.log('Exporting alert report for relationship:', this.relationship?.name)
            const alertData = {
                relationship: this.relationship?.name,
                totalAlerts: this.totalAlertCount,
                delinquencyAlerts: this.relationshipLoanDelinquencyAlerts,
                overdraftAlerts: this.relationshipOverdraftAlerts,
                summary: {
                    totalDelinquencyAmount: this.totalDelinquencyAmount,
                    totalOverdraftAmount: this.totalOverdraftAmount,
                    clientsAffected: this.alertedClientsCount
                }
            }

            // In a real app, this would generate and download a report
            const blob = new Blob([JSON.stringify(alertData, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${this.relationship?.name}_alert_report.json`
            a.click()
            URL.revokeObjectURL(url)
        }
    },

    mounted() {
        console.log('Component mounted, initializing chart...')
        // Initialize chart data
        this.updateChart()
    },

    watch: {
        selectedMetric(newMetric, oldMetric) {
            console.log('Watch: selectedMetric changed from', oldMetric, 'to', newMetric)
            // switchMetric handles the update
        },
        selectedTrendClient() {
            console.log('Watch: selectedTrendClient changed to', this.selectedTrendClient)
            this.updateChart()
        },
        trendPeriod() {
            console.log('Watch: trendPeriod changed to', this.trendPeriod)
            this.updateChart()
        }
    }
}
</script>