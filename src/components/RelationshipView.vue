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
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">{{ relationship?.name }}</h1>
                            <p class="text-gray-600 mt-1">{{ relationship?.industry }} • {{ relationshipClients.length
                                }} Client Entities</p>
                            <div class="flex items-center space-x-4 mt-3">
                                <span class="text-sm text-gray-500">RM: {{ relationshipManager?.name }}</span>
                                <span class="text-sm text-gray-500">•</span>
                                <span class="text-sm text-gray-500">Last Review: {{ lastReviewDate }}</span>
                                <span class="text-sm text-gray-500">•</span>
                                <span class="text-sm text-gray-500">Risk Level:
                                    <span :class="getRiskLevelClass(portfolioRiskLevel)">{{ portfolioRiskLevel }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold text-green-600">{{ formatCurrency(totalPortfolioValue) }}
                            </div>
                            <div class="text-sm text-gray-500">Total Portfolio Value</div>
                            <div class="text-xs text-green-500 font-medium">{{ portfolioPercentile }}{{
                                getOrdinalSuffix(portfolioPercentile) }} percentile</div>
                        </div>
                    </div>

                    <!-- Quick Action Alerts -->
                    <div v-if="criticalAlerts.length > 0" class="mt-6 space-y-2">
                        <div v-for="alert in criticalAlerts" :key="alert.id"
                            class="flex items-center justify-between p-3 rounded-lg border-l-4"
                            :class="getAlertClass(alert.type)">
                            <div class="flex items-center space-x-3">
                                <span class="text-lg">{{ alert.icon }}</span>
                                <div>
                                    <p class="font-medium">{{ alert.title }}</p>
                                    <p class="text-sm opacity-80">{{ alert.description }}</p>
                                </div>
                            </div>
                            <button @click="handleAlert(alert)"
                                class="px-3 py-1 text-xs font-medium rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
                                {{ alert.action }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Consistent KPI Summary (Same as ClientDetailView Structure) -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-4 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900">🏢 Relationship Portfolio Summary</h3>
                </div>
                <div class="p-4">
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">{{ totalAccounts }}</div>
                            <div class="text-sm text-gray-600">Total Accounts</div>
                            <div class="text-xs text-blue-500 font-medium">{{ accountsPercentile }}{{
                                getOrdinalSuffix(accountsPercentile) }} percentile</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalDeposits) }}</div>
                            <div class="text-sm text-gray-600">Total Deposits</div>
                            <div class="text-xs text-green-500 font-medium">{{ depositsPercentile }}{{
                                getOrdinalSuffix(depositsPercentile) }} percentile</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(totalLoans) }}</div>
                            <div class="text-sm text-gray-600">Total Loans</div>
                            <div class="text-xs text-orange-500 font-medium">{{ loansPercentile }}{{
                                getOrdinalSuffix(loansPercentile) }} percentile</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-purple-600">{{ loanUtilityRate }}%</div>
                            <div class="text-sm text-gray-600">Loan Utility %</div>
                            <div class="text-xs text-purple-500 font-medium">{{ loanUtilityPercentile }}{{
                                getOrdinalSuffix(loanUtilityPercentile) }} percentile</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-indigo-600">{{ totalOpportunities }}</div>
                            <div class="text-sm text-gray-600">Total Opportunities</div>
                            <div class="text-xs text-indigo-500 font-medium">Top {{ opportunityPercentile }}% potential
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-red-600">{{ totalRiskFlags }}</div>
                            <div class="text-sm text-gray-600">Risk Flags</div>
                            <div class="text-xs text-red-500 font-medium">{{ riskFlagsPercentile }}{{
                                getOrdinalSuffix(riskFlagsPercentile) }} percentile</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Risk & Opportunity Priority Dashboard -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- High Priority Actions -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-4 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-medium text-gray-900">🎯 Priority Actions</h3>
                            <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">{{
                                priorityActions.length }} items</span>
                        </div>
                    </div>
                    <div class="p-4 space-y-3 max-h-80 overflow-y-auto">
                        <div v-for="action in priorityActions" :key="action.id"
                            @click="drillDownToClient(action.client)"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div class="flex items-center space-x-3">
                                <span class="text-lg">{{ action.icon }}</span>
                                <div>
                                    <p class="font-medium text-gray-900">{{ action.client.name }}</p>
                                    <p class="text-sm text-gray-600">{{ action.description }}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm font-medium" :class="action.valueClass">{{ action.value }}</div>
                                <div class="text-xs text-gray-500">{{ action.timeframe }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top Opportunities -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-4 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-medium text-gray-900">💰 Top Opportunities</h3>
                            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{{
                                formatCurrency(totalOpportunityValue) }} potential</span>
                        </div>
                    </div>
                    <div class="p-4 space-y-3 max-h-80 overflow-y-auto">
                        <div v-for="opportunity in topOpportunities" :key="opportunity.id"
                            @click="drillDownToClient(opportunity.client)"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                            <div class="flex items-center space-x-3">
                                <span class="text-lg">{{ opportunity.icon }}</span>
                                <div>
                                    <p class="font-medium text-gray-900">{{ opportunity.client.name }}</p>
                                    <p class="text-sm text-gray-600">{{ opportunity.description }}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm font-medium text-green-600">{{ formatCurrency(opportunity.value) }}
                                </div>
                                <div class="text-xs text-gray-500">{{ opportunity.probability }}% likely</div>
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
                                    Risk Score</th>
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
                                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                                        :class="getRiskScoreClass(client.riskScore)">
                                        {{ client.riskScore || getGeneratedRiskScore(client) }}
                                    </span>
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
                                <span class="px-2 py-1 text-xs font-medium rounded-full"
                                    :class="getRiskScoreClass(client.riskScore)">
                                    {{ client.riskScore || getGeneratedRiskScore(client) }}
                                </span>
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

            <!-- Interactive Trend Charts -->
            <div class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">📈 Interactive Trend Analysis</h3>
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
                                    :class="['px-3 py-1 text-xs rounded-full', trendPeriod === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                    Monthly
                                </button>
                                <button @click="trendPeriod = 'quarterly'"
                                    :class="['px-3 py-1 text-xs rounded-full', trendPeriod === 'quarterly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                                    Quarterly
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <!-- Metric Selection Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div @click="switchMetric('portfolio')"
                            :class="['cursor-pointer text-center p-4 rounded-lg border-2 transition-all',
                                selectedMetric === 'portfolio' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100']">
                            <div class="text-xl font-bold text-green-600">{{ formatCurrency(totalPortfolioValue) }}
                            </div>
                            <div class="text-sm text-gray-600">Portfolio Value</div>
                            <div class="text-xs text-green-500 font-medium">{{ portfolioGrowthYoY }}% YoY Growth</div>
                        </div>
                        <div @click="switchMetric('penetration')"
                            :class="['cursor-pointer text-center p-4 rounded-lg border-2 transition-all',
                                selectedMetric === 'penetration' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100']">
                            <div class="text-xl font-bold text-blue-600">{{ averageProductPenetration }}%</div>
                            <div class="text-sm text-gray-600">Product Penetration</div>
                            <div class="text-xs text-blue-500 font-medium">{{ penetrationGap }}% improvement potential
                            </div>
                        </div>
                        <div @click="switchMetric('risk')"
                            :class="['cursor-pointer text-center p-4 rounded-lg border-2 transition-all',
                                selectedMetric === 'risk' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100']">
                            <div class="text-xl font-bold text-red-600">{{ totalRiskFlags }}</div>
                            <div class="text-sm text-gray-600">Risk Flags</div>
                            <div class="text-xs" :class="riskFlagGrowthYoY > 0 ? 'text-red-500' : 'text-green-500'">
                                {{ riskFlagGrowthYoY > 0 ? '↗️' : '↘️' }} {{ Math.abs(riskFlagGrowthYoY) }}% YoY
                            </div>
                        </div>
                        <div @click="switchMetric('opportunity')"
                            :class="['cursor-pointer text-center p-4 rounded-lg border-2 transition-all',
                                selectedMetric === 'opportunity' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100']">
                            <div class="text-xl font-bold text-purple-600">{{ formatCurrency(totalOpportunityValue) }}
                            </div>
                            <div class="text-sm text-gray-600">Opportunity Value</div>
                            <div class="text-xs text-purple-500 font-medium">{{ totalOpportunities }} opportunities
                            </div>
                        </div>
                    </div>

                    <!-- Chart Container -->
                    <div class="relative">
                        <div class="flex justify-center">
                            <div class="w-full max-w-4xl h-96">
                                <VueApexCharts :key="`chart-${selectedMetric}-${chartKey}`" type="bar"
                                    :options="chartOptions" :series="chartSeries" height="400" width="100%" />
                            </div>
                        </div>

                        <!-- Chart Insights -->
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div v-for="insight in getChartInsights()" :key="insight.id"
                                class="p-4 rounded-lg border border-gray-200 bg-gray-50">
                                <div class="flex items-center space-x-2 mb-2">
                                    <span class="text-lg">{{ insight.icon }}</span>
                                    <span class="font-medium text-gray-900">{{ insight.title }}</span>
                                </div>
                                <div class="text-sm text-gray-600">
                                    <span>{{ insight.text }}</span>
                                </div>
                            </div>
                        </div>
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

export default {
    name: 'RelationshipView',
    components: {
        VueApexCharts
    },
    props: ['relationshipId'],
    setup() {
        const clientViewType = ref('table')
        const riskChartPeriod = ref('monthly')
        const trendPeriod = ref('monthly')
        const selectedMetric = ref('portfolio')
        const selectedTrendClient = ref('all')
        const chartKey = ref(0)
        const chartOptions = ref({})
        const chartSeries = ref([])

        return {
            clientViewType,
            riskChartPeriod,
            trendPeriod,
            selectedMetric,
            selectedTrendClient,
            chartKey,
            chartOptions,
            chartSeries
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

        // Alert and Priority Data
        lastReviewDate() {
            const date = new Date()
            date.setDate(date.getDate() - Math.floor(Math.random() * 30 + 1)) // 1-30 days ago
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        criticalAlerts() {
            const alerts = []

            // Generate dynamic alerts based on portfolio data
            if (this.riskFlagGrowthYoY > 15) {
                alerts.push({
                    id: 'risk-spike',
                    type: 'risk',
                    icon: '🚨',
                    title: 'Risk Flags Increasing',
                    description: `Risk indicators up ${this.riskFlagGrowthYoY}% YoY across portfolio`,
                    action: 'Review Now',
                    client: this.relationshipClients.find(c => (c.riskScore || 5) >= 7)
                })
            }

            if (this.totalOpportunityValue > this.totalPortfolioValue * 0.2) {
                alerts.push({
                    id: 'high-opportunity',
                    type: 'opportunity',
                    icon: '💰',
                    title: 'High Value Opportunities',
                    description: `${this.formatCurrency(this.totalOpportunityValue)} potential identified`,
                    action: 'Review Opportunities',
                    client: this.relationshipClients[0]
                })
            }

            return alerts.slice(0, 3) // Max 3 alerts
        },
        priorityActions() {
            const actions = []

            // Generate priority actions for high-risk or high-opportunity clients
            this.relationshipClients.forEach(client => {
                const riskScore = client.riskScore || this.getGeneratedRiskScore(client)
                const opportunityValue = this.getClientOpportunityValue(client)

                if (riskScore >= 7) {
                    actions.push({
                        id: `risk-${client.id}`,
                        client,
                        icon: '🚨',
                        description: 'High risk score requires attention',
                        value: `Risk Score: ${riskScore}`,
                        valueClass: 'text-red-600',
                        timeframe: 'Urgent'
                    })
                }

                if (opportunityValue > 500000) {
                    actions.push({
                        id: `opp-${client.id}`,
                        client,
                        icon: '💰',
                        description: 'High-value opportunity identified',
                        value: this.formatCurrency(opportunityValue),
                        valueClass: 'text-green-600',
                        timeframe: 'This week'
                    })
                }
            })

            return actions.sort((a, b) => {
                if (a.valueClass === 'text-red-600' && b.valueClass !== 'text-red-600') return -1
                if (b.valueClass === 'text-red-600' && a.valueClass !== 'text-red-600') return 1
                return 0
            }).slice(0, 8) // Top 8 priority actions
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

        getAlertClass(type) {
            switch (type) {
                case 'risk': return 'bg-red-50 border-red-500 text-red-900'
                case 'opportunity': return 'bg-green-50 border-green-500 text-green-900'
                case 'compliance': return 'bg-yellow-50 border-yellow-500 text-yellow-900'
                default: return 'bg-blue-50 border-blue-500 text-blue-900'
            }
        },

        handleAlert(alert) {
            if (alert.client) {
                this.drillDownToClient(alert.client)
            }
        },

        drillDownToClient(client) {
            // Navigate to individual client detail view
            this.$router.push({
                name: 'ClientDetail',
                params: {
                    ...this.$route.params,
                    clientId: client.id
                }
            })
        },

        goBackToRM() {
            if (this.relationship) {
                this.$router.push({ name: 'RelationshipManager', params: { rmId: this.relationship.rmId } })
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
            const data = []

            // Safely generate data with validation
            for (let i = 0; i < labels.length; i++) {
                try {
                    const value = this.getMetricValue(this.selectedMetric, i)
                    // Ensure value is a valid number
                    data.push(isNaN(value) ? 0 : Number(value))
                } catch (error) {
                    console.error('Error getting metric value for index', i, error)
                    data.push(0) // Default to 0 if error
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

        getApexChartOptions() {
            return {
                chart: {
                    type: 'bar',
                    height: 400,
                    toolbar: {
                        show: false
                    },
                    background: 'transparent'
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        columnWidth: '60%',
                        dataLabels: {
                            position: 'top'
                        }
                    }
                },
                colors: [this.getMetricColor(this.selectedMetric)],
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
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: (value) => this.formatYAxisLabel(value),
                        style: {
                            colors: '#6B7280',
                            fontSize: '12px'
                        }
                    }
                },
                grid: {
                    show: false
                },
                title: {
                    text: `${this.getMetricLabel(this.selectedMetric)} Trend (${this.trendPeriod})`,
                    align: 'center',
                    style: {
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1F2937'
                    }
                },
                tooltip: {
                    y: {
                        formatter: (value) => this.formatTooltipValue(value)
                    }
                },
                responsive: [{
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 300
                        }
                    }
                }]
            }
        },

        formatTooltipValue(value) {
            if (this.selectedMetric === 'penetration') {
                return `${value.toFixed(1)}%`
            } else if (this.selectedMetric === 'portfolio' || this.selectedMetric === 'opportunity') {
                return this.formatCurrency(value)
            }
            return value.toString()
        },

        getMetricLabel(metric) {
            const labels = {
                portfolio: 'Portfolio Value',
                penetration: 'Product Penetration',
                risk: 'Risk Flags',
                opportunity: 'Opportunity Value'
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
            if (this.selectedMetric === 'penetration') {
                return `${value}%`
            } else if (this.selectedMetric === 'portfolio' || this.selectedMetric === 'opportunity') {
                if (value >= 1000000) {
                    return `$${(value / 1000000).toFixed(1)}M`
                } else if (value >= 1000) {
                    return `$${(value / 1000).toFixed(0)}K`
                }
                return `$${value}`
            }
            return value
        },

        getMetricValue(metric, index) {
            switch (metric) {
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
                case 'risk':
                    return this.getRiskFlagsForMonth(index)
                case 'opportunity':
                    const baseOpp = this.totalOpportunityValue / 12
                    return baseOpp * (0.8 + Math.random() * 0.4)
                default:
                    return 0
            }
        },

        getChartInsights() {
            const insights = []

            switch (this.selectedMetric) {
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