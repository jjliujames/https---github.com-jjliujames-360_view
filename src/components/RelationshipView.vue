<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-200 px-6 py-3">
      <nav class="text-sm text-gray-600">
        <span @click="$router.push('/executive')" class="cursor-pointer hover:text-blue-600">Executive Dashboard</span>
        <span class="mx-2">></span>
        <span @click="goBackToRM" class="cursor-pointer hover:text-blue-600">{{ relationship?.rmId }}</span>
        <span class="mx-2">></span>
        <span class="text-gray-900 font-medium">{{ relationship?.name }}</span>
      </nav>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ relationship?.name }}</h1>
              <p class="text-gray-600 mt-1">{{ relationship?.industry }} • Relationship Portfolio</p>
              <div class="flex items-center space-x-4 mt-3">
                <span class="text-sm text-gray-500">RM: {{ relationshipManager?.name }}</span>
                <span class="text-sm text-gray-500">•</span>
                <span class="text-sm text-gray-500">{{ relationshipClients.length }} Client Entities</span>
                <span class="text-sm text-gray-500">•</span>
                <span class="text-sm text-gray-500">Risk Level:
                  <span :class="getRiskLevelClass(portfolioRiskLevel)">{{ portfolioRiskLevel }}</span>
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold text-green-600">{{ formatCurrency(totalPortfolioValue) }}</div>
              <div class="text-sm text-gray-500">Total Portfolio Value</div>
              <div class="text-xs text-green-500 font-medium mt-1">{{ portfolioPercentile }}{{
                getOrdinalSuffix(portfolioPercentile) }} percentile</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Portfolio Summary KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ relationshipClients.length }}</div>
            <div class="text-sm text-gray-600">Client Entities</div>
            <div class="text-xs text-blue-500 font-medium">{{ clientsPercentile }}{{ getOrdinalSuffix(clientsPercentile)
              }} percentile</div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalDeposits) }}</div>
            <div class="text-sm text-gray-600">Total Deposit Balance</div>
            <div class="text-xs text-green-500 font-medium">{{ depositsPercentile }}{{
              getOrdinalSuffix(depositsPercentile) }} percentile</div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(totalLoans) }}</div>
            <div class="text-sm text-gray-600">Total Loans</div>
            <div class="text-xs text-orange-500 font-medium">{{ loansPercentile }}{{ getOrdinalSuffix(loansPercentile)
              }} percentile</div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">{{ loanUtilityRate }}%</div>
            <div class="text-sm text-gray-600">Loan Utility %</div>
            <div class="text-xs text-purple-500 font-medium">{{ loanUtilityPercentile }}{{
              getOrdinalSuffix(loanUtilityPercentile) }} percentile</div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600">{{ totalAccounts }}</div>
            <div class="text-sm text-gray-600">Total Accounts</div>
            <div class="text-xs text-indigo-500 font-medium">{{ accountsPercentile }}{{
              getOrdinalSuffix(accountsPercentile) }} percentile</div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">{{ totalRiskFlags }}</div>
            <div class="text-sm text-gray-600">Total Risk Flags</div>
            <div class="text-xs text-red-500 font-medium">{{ riskFlagsPercentile }}{{
              getOrdinalSuffix(riskFlagsPercentile) }} percentile</div>
          </div>
        </div>
      </div>

      <!-- Portfolio Risk Heat Map -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Risk Heat Map -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">🔥 Portfolio Risk Heat Map</h3>
            <p class="text-sm text-gray-500 mt-1">Risk distribution across client entities</p>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-4 gap-2 mb-4">
              <div v-for="client in relationshipClients" :key="client.id" @click="drillDownToClient(client)"
                class="aspect-square rounded cursor-pointer hover:scale-105 transition-transform flex items-center justify-center text-xs font-medium text-white"
                :class="getRiskHeatMapColor(client.riskScore)"
                :title="`${client.name} - Risk Score: ${client.riskScore || 'N/A'}`">
                {{ client.name.split(' ')[0][0] }}{{ client.name.split(' ')[1]?.[0] || '' }}
              </div>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>Low Risk</span>
              <div class="flex space-x-1">
                <div class="w-4 h-4 bg-green-500 rounded"></div>
                <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                <div class="w-4 h-4 bg-orange-500 rounded"></div>
                <div class="w-4 h-4 bg-red-500 rounded"></div>
              </div>
              <span>High Risk</span>
            </div>
          </div>
        </div>

        <!-- Risk Trend Analysis -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">📈 Risk Trends</h3>
            <p class="text-sm text-gray-500 mt-1">YoY & MoM analysis</p>
          </div>
          <div class="p-6 space-y-4">
            <div class="text-center p-4 bg-red-50 rounded-lg">
              <div class="text-2xl font-bold text-red-600">{{ riskTrendYoY }}%</div>
              <div class="text-sm text-gray-600">YoY Risk Change</div>
              <div class="text-xs" :class="riskTrendYoY > 0 ? 'text-red-500' : 'text-green-500'">
                {{ riskTrendYoY > 0 ? '↗️ Increasing' : '↘️ Decreasing' }}
              </div>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg">
              <div class="text-2xl font-bold text-orange-600">{{ riskTrendMoM }}%</div>
              <div class="text-sm text-gray-600">MoM Risk Change</div>
              <div class="text-xs" :class="riskTrendMoM > 0 ? 'text-red-500' : 'text-green-500'">
                {{ riskTrendMoM > 0 ? '↗️ Increasing' : '↘️ Decreasing' }}
              </div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ highRiskClientCount }}</div>
              <div class="text-sm text-gray-600">High Risk Clients</div>
              <div class="text-xs text-blue-500">{{ Math.round((highRiskClientCount / relationshipClients.length) * 100)
                }}% of portfolio</div>
            </div>
          </div>
        </div>
      </div>

      <!-- High Risk Transaction Analysis -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">🚨 High Risk Transaction Analysis</h3>
          <p class="text-sm text-gray-500 mt-1">Portfolio-wide risk transaction monitoring by type</p>
        </div>
        <div class="p-6">
          <!-- Risk Transaction Summary -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="text-center p-4 bg-red-50 rounded-lg">
              <div class="text-2xl font-bold text-red-600">{{ formatCurrency(totalRiskTransactionAmount) }}</div>
              <div class="text-sm text-gray-600">High Risk Transaction Amount</div>
              <div class="text-xs text-red-500 font-medium">{{ riskAmountPercentile }}{{
                getOrdinalSuffix(riskAmountPercentile) }} percentile</div>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg">
              <div class="text-2xl font-bold text-orange-600">{{ totalRiskTransactionCount }}</div>
              <div class="text-sm text-gray-600">High Risk Transactions</div>
              <div class="text-xs text-orange-500 font-medium">{{ riskCountPercentile }}{{
                getOrdinalSuffix(riskCountPercentile) }} percentile</div>
            </div>
            <div class="text-center p-4 bg-yellow-50 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">{{ totalUTRFiled }}</div>
              <div class="text-sm text-gray-600">UTR Filed</div>
              <div class="text-xs text-yellow-500 font-medium">{{ utrPercentile }}{{ getOrdinalSuffix(utrPercentile) }}
                percentile</div>
            </div>
          </div>

          <!-- Risk Transaction Types Chart -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-md font-medium text-gray-900">🚨 High Risk Transactions by Type (Monthly)</h4>
              <div class="flex space-x-2">
                <button @click="riskChartPeriod = 'monthly'"
                  :class="['px-3 py-1 text-xs rounded-full', riskChartPeriod === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                  Monthly
                </button>
                <button @click="riskChartPeriod = 'quarterly'"
                  :class="['px-3 py-1 text-xs rounded-full', riskChartPeriod === 'quarterly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                  Quarterly
                </button>
              </div>
            </div>
            <div class="h-64 bg-white rounded p-4">
              <!-- Risk Transaction Chart -->
              <div class="h-full">
                <div class="flex items-center justify-between mb-4">
                  <div class="text-sm text-gray-600">Transaction Amount ($M)</div>
                  <div class="flex space-x-4 text-xs">
                    <div v-for="(type, index) in riskTransactionTypes.slice(0, 6)" :key="type"
                      class="flex items-center space-x-1">
                      <div class="w-3 h-3 rounded" :class="getRiskTypeColor(index)"></div>
                      <span class="text-gray-600">{{ type }}</span>
                    </div>
                  </div>
                </div>

                <!-- Chart Area -->
                <div class="relative h-48">
                  <!-- Y-axis labels -->
                  <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                    <span>{{ formatChartValue(maxChartValue) }}</span>
                    <span>{{ formatChartValue(maxChartValue * 0.75) }}</span>
                    <span>{{ formatChartValue(maxChartValue * 0.5) }}</span>
                    <span>{{ formatChartValue(maxChartValue * 0.25) }}</span>
                    <span>0</span>
                  </div>

                  <!-- Chart bars -->
                  <div class="ml-8 h-full flex items-end space-x-2">
                    <div v-for="(month, monthIndex) in chartMonths" :key="month"
                      class="flex-1 flex flex-col items-center">
                      <!-- Stacked bars -->
                      <div class="w-full flex flex-col-reverse" :style="{ height: '192px' }">
                        <div v-for="(type, typeIndex) in riskTransactionTypes.slice(0, 6)" :key="type"
                          class="w-full transition-all duration-300 hover:opacity-80"
                          :class="getRiskTypeColor(typeIndex)"
                          :style="{ height: getBarHeight(monthIndex, typeIndex) + 'px' }"
                          :title="`${type}: ${formatCurrency(getRiskTransactionAmount(monthIndex, typeIndex))}`">
                        </div>
                      </div>
                      <!-- Month label -->
                      <div class="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">{{ month }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Portfolio Opportunities -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">💰 Portfolio Opportunities</h3>
              <p class="text-sm text-gray-500 mt-1">Cross-sell and upsell opportunities across relationship</p>
            </div>
            <span class="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">🤖 ML Powered</span>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalOpportunityValue) }}</div>
              <div class="text-sm text-gray-600">Total Opportunity Value</div>
              <div class="text-xs text-green-500 font-medium">{{ opportunityCount }} opportunities identified</div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ averageProductPenetration }}%</div>
              <div class="text-sm text-gray-600">Avg Product Penetration</div>
              <div class="text-xs text-blue-500 font-medium">{{ penetrationGap }}% gap to target</div>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ topOpportunityClients }}</div>
              <div class="text-sm text-gray-600">High Opportunity Clients</div>
              <div class="text-xs text-purple-500 font-medium">Ready for engagement</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Client Portfolio Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">👥 Client Portfolio Overview</h3>
              <p class="text-sm text-gray-500 mt-1">Click on any client to drill down to detailed 360 profile</p>
            </div>
            <div class="flex space-x-2">
              <button @click="clientViewType = 'table'"
                :class="['px-3 py-1 text-xs rounded-full', clientViewType === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                Table View
              </button>
              <button @click="clientViewType = 'cards'"
                :class="['px-3 py-1 text-xs rounded-full', clientViewType === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                Card View
              </button>
            </div>
          </div>
        </div>

        <!-- Table View -->
        <div v-if="clientViewType === 'table'" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio
                  Value</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposits</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loans</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Flags
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunities
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="client in relationshipClients" :key="client.id"
                class="hover:bg-gray-50 cursor-pointer transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ formatCurrency(client.portfolioValue) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(getClientDeposits(client)) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(getClientLoans(client)) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getRiskScoreClass(client.riskScore)">
                    {{ client.riskScore || 'N/A' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex space-x-1">
                    <span v-for="flag in (client.riskFlags || []).slice(0, 2)" :key="flag.category"
                      class="px-2 py-1 text-xs font-medium rounded-full" :class="getRiskFlagClass(flag.severity)">
                      {{ flag.category }}
                    </span>
                    <span v-if="(client.riskFlags || []).length > 2" class="text-xs text-gray-500">
                      +{{ (client.riskFlags || []).length - 2 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ getClientOpportunityCount(client) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="drillDownToClient(client)" class="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Card View -->
        <div v-if="clientViewType === 'cards'" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="client in relationshipClients" :key="client.id" @click="drillDownToClient(client)"
              class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all border-l-4"
              :class="getRiskBorderClass(client.riskScore)">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-medium text-gray-900">{{ client.name }}</h4>
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getRiskScoreClass(client.riskScore)">
                  {{ client.riskScore || 'N/A' }}
                </span>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Portfolio:</span>
                  <span class="font-medium">{{ formatCurrency(client.portfolioValue) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Risk Flags:</span>
                  <span class="font-medium">{{ (client.riskFlags || []).length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Opportunities:</span>
                  <span class="font-medium">{{ getClientOpportunityCount(client) }}</span>
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
import { ref } from 'vue'
import { relationshipManagers, relationships, clients, formatCurrency, getRiskColor, getClientsByRelationshipId } from '../data/mockData.js'

export default {
  name: 'RelationshipView',
  props: ['relationshipId'],
  setup() {
    const clientViewType = ref('table')
    const riskChartPeriod = ref('monthly')

    return {
      clientViewType,
      riskChartPeriod
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
    opportunityCount() {
      return Math.floor(this.relationshipClients.length * (2 + Math.random() * 4)) // 2-6 per client
    },
    averageProductPenetration() {
      return Math.floor(45 + Math.random() * 30) // 45-75%
    },
    penetrationGap() {
      return 85 - this.averageProductPenetration
    },
    topOpportunityClients() {
      return Math.floor(this.relationshipClients.length * 0.4) // 40% of clients
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
      // Calculate max value for chart scaling
      let max = 0
      for (let monthIndex = 0; monthIndex < this.chartMonths.length; monthIndex++) {
        let monthTotal = 0
        for (let typeIndex = 0; typeIndex < 6; typeIndex++) {
          monthTotal += this.getRiskTransactionAmount(monthIndex, typeIndex)
        }
        max = Math.max(max, monthTotal)
      }
      return Math.ceil(max / 1000000) * 1000000 // Round up to nearest million
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
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-cyan-500',
        'bg-lime-500',
        'bg-amber-500'
      ]
      return colors[index % colors.length]
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
      const amount = this.getRiskTransactionAmount(monthIndex, typeIndex)
      const maxHeight = 192 // Total chart height in pixels
      return Math.max(2, (amount / this.maxChartValue) * maxHeight) // Minimum 2px height for visibility
    },

    formatChartValue(value) {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`
      }
      return `$${value.toFixed(0)}`
    }
  }
}
</script>