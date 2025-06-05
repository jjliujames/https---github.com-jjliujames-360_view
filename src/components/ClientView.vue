<template>
  <div class="client-view">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <span @click="$router.push('/executive')" class="breadcrumb-item">Executive Dashboard</span>
      <span>></span>
      <span @click="goBackToRM" class="breadcrumb-item">{{ client?.relationshipId }}</span>
      <span>></span>
      <span @click="goBackToRelationship" class="breadcrumb-item">Relationship</span>
      <span>></span>
      <span class="text-gray-900">{{ client?.name }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <div class="h-16 w-16 rounded-full bg-td-green flex items-center justify-center mr-4">
            <span class="text-lg font-medium text-white">{{ client?.name?.split(' ')[0][0] }}</span>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ client?.name }}</h1>
            <p class="text-gray-600">{{ client?.industry }} • {{ client?.geography }}</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <span v-for="flag in client?.riskFlags" :key="flag" class="risk-flag risk-medium">
            {{ flag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Client Profile -->
    <div class="card mb-8">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ client.name }}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ client.industry }} • {{ client.location }}</p>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p class="text-sm font-medium text-gray-600">Portfolio Value</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(client.portfolioValue) }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Annual Revenue</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(client.annualRevenue) }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Last Contact</p>
            <p class="text-2xl font-bold text-gray-900">{{ client.lastContact }}</p>
          </div>
        </div>

        <!-- Risk Flags -->
        <div v-if="client.riskFlags && client.riskFlags.length > 0" class="mt-6">
          <p class="text-sm font-medium text-gray-600 mb-2">Risk Flags</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="flag in client.riskFlags" :key="flag" :class="['risk-flag', getRiskFlagColor(flag)]">
              {{ flag }}
            </span>
          </div>
        </div>

        <!-- KRI Details for this client -->
        <div v-if="hasKRIFlags" class="mt-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4">Key Risk Indicators</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- High Cash Activity -->
            <div v-if="hasHighCashFlag" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h5 class="text-sm font-medium text-yellow-800">High Cash Activity</h5>
              </div>
              <p class="text-sm text-yellow-700">Client exhibits unusually high cash transaction patterns requiring
                enhanced monitoring.</p>
              <div class="mt-2 text-xs text-yellow-600">
                <p>Threshold: Transactions >$500K cash equivalent</p>
                <p>Last 30 days: {{ Math.floor(Math.random() * 15) + 5 }} transactions</p>
              </div>
            </div>

            <!-- Crypto Activity -->
            <div v-if="hasCryptoFlag" class="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h5 class="text-sm font-medium text-purple-800">Cryptocurrency Exposure</h5>
              </div>
              <p class="text-sm text-purple-700">Client involved in cryptocurrency transactions or blockchain-related
                business activities.</p>
              <div class="mt-2 text-xs text-purple-600">
                <p>Risk Level: Enhanced Due Diligence Required</p>
                <p>Monitoring: Continuous transaction screening</p>
              </div>
            </div>

            <!-- MSB Activity -->
            <div v-if="hasMSBFlag" class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <h5 class="text-sm font-medium text-orange-800">Money Service Business</h5>
              </div>
              <p class="text-sm text-orange-700">Client operates as a Money Service Business requiring specialized
                compliance oversight.</p>
              <div class="mt-2 text-xs text-orange-600">
                <p>Regulation: BSA/AML enhanced requirements</p>
                <p>Reporting: Monthly MSB activity reports</p>
              </div>
            </div>

            <!-- Cross-Border Activity -->
            <div v-if="hasCrossBorderFlag" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h5 class="text-sm font-medium text-blue-800">Cross-Border Transactions</h5>
              </div>
              <p class="text-sm text-blue-700">Client engages in significant international wire transfers and
                cross-border activities.</p>
              <div class="mt-2 text-xs text-blue-600">
                <p>Countries: {{ Math.floor(Math.random() * 8) + 3 }} jurisdictions</p>
                <p>OFAC Screening: Real-time monitoring enabled</p>
              </div>
            </div>

            <!-- PEP Exposure -->
            <div v-if="hasPEPFlag" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h5 class="text-sm font-medium text-red-800">Politically Exposed Person</h5>
              </div>
              <p class="text-sm text-red-700">Client or beneficial owners have connections to politically exposed
                persons requiring enhanced due diligence.</p>
              <div class="mt-2 text-xs text-red-600">
                <p>Status: Enhanced Due Diligence (EDD) required</p>
                <p>Review: Quarterly senior management approval</p>
              </div>
            </div>

            <!-- Sanctions Exposure -->
            <div v-if="hasSanctionsFlag" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <h5 class="text-sm font-medium text-red-800">Sanctions Screening Alert</h5>
              </div>
              <p class="text-sm text-red-700">Client has potential exposure to sanctioned entities or jurisdictions
                requiring immediate review.</p>
              <div class="mt-2 text-xs text-red-600">
                <p>Action: Immediate compliance review required</p>
                <p>Status: Transaction monitoring escalated</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- TD Relationship Summary -->
    <div class="card mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">TD Relationship Summary</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="metric-card">
          <div class="flex items-center">
            <div class="p-2 bg-blue-500 rounded-lg">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Accounts</p>
              <p class="text-2xl font-bold text-gray-900">{{ client?.accountCount }}</p>
            </div>
          </div>
        </div>

        <div class="metric-card" @click="showAccountDetails = true">
          <div class="flex items-center">
            <div class="p-2 bg-green-500 rounded-lg">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Deposits</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(client?.totalDeposits) }}</p>
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="flex items-center">
            <div class="p-2 bg-orange-500 rounded-lg">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Loans</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(client?.totalLoans) }}</p>
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="flex items-center">
            <div class="p-2 bg-purple-500 rounded-lg">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Annual Revenue</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(client?.totalRevenue) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Beneficial Ownership -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Beneficial Ownership</h3>
        <div class="space-y-4">
          <div v-for="owner in client?.beneficialOwnership" :key="owner.name"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div class="text-sm font-medium text-gray-900">{{ owner.name }}</div>
              <div class="text-sm text-gray-600">{{ owner.role }}</div>
            </div>
            <div class="text-sm font-bold text-gray-900">{{ owner.ownership }}</div>
          </div>
        </div>
      </div>

      <!-- Risk Flags & Markers -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Risk Flags & Markers</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="flag in client?.riskFlags" :key="flag"
            class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                </path>
              </svg>
              <span class="text-sm font-medium text-yellow-800">{{ flag }}</span>
            </div>
          </div>
        </div>
        <div v-if="!client?.riskFlags || client.riskFlags.length === 0" class="text-center py-4 text-gray-500">
          No risk flags identified
        </div>
      </div>
    </div>

    <!-- Transaction Behavior -->
    <div class="card mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Transaction Behavior (6 Months)</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 class="text-md font-medium text-gray-700 mb-3">Volume Trends</h4>
          <LineChart :data="transactionVolumeData" />
        </div>
        <div>
          <h4 class="text-md font-medium text-gray-700 mb-3">Transaction Count</h4>
          <LineChart :data="transactionCountData" />
        </div>
      </div>
    </div>

    <!-- Accounts Table -->
    <div class="card">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Client Accounts</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Click on any account to view transaction details</p>
      </div>
      <div v-if="clientAccounts && clientAccounts.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly
                Activity</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="account in clientAccounts" :key="account.id" @click="drillDownToAccount(account)"
              class="hover:bg-gray-50 cursor-pointer transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                      <span class="text-sm font-medium text-white">{{ account.type.split(' ')[0][0] }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ account.type }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ account.number }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(account.balance) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ account.currency }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ account.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ account.monthlyActivity[account.monthlyActivity.length - 1].transactions }} transactions
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="p-8 text-center text-gray-500">
        No accounts found for this client
      </div>
    </div>

    <!-- Non-Financial Interactions (Future) -->
    <div class="card mt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Non-Financial Interactions</h3>
      <div class="bg-gray-100 rounded-lg p-6 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
        <p class="text-gray-600">Address changes, channel usage, digital activity</p>
        <p class="text-sm text-gray-500 mt-2">(In Development)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { clients, accounts, formatCurrency, getRiskColor } from '../data/mockData.js'
import LineChart from './charts/LineChart.vue'

export default {
  name: 'ClientView',
  components: {
    LineChart
  },
  props: ['clientId'],
  data() {
    return {
      showAccountDetails: false
    }
  },
  computed: {
    client() {
      return this.clients[this.clientId]
    },
    hasKRIFlags() {
      if (!this.client?.riskFlags) return false
      return this.client.riskFlags.some(flag =>
        ['High-Cash', 'Crypto', 'MSB', 'Cross-Border', 'PEP', 'Sanctions'].includes(flag)
      )
    },
    hasHighCashFlag() {
      return this.client?.riskFlags?.includes('High-Cash')
    },
    hasCryptoFlag() {
      return this.client?.riskFlags?.includes('Crypto')
    },
    hasMSBFlag() {
      return this.client?.riskFlags?.includes('MSB')
    },
    hasCrossBorderFlag() {
      return this.client?.riskFlags?.includes('Cross-Border')
    },
    hasPEPFlag() {
      return this.client?.riskFlags?.includes('PEP')
    },
    hasSanctionsFlag() {
      return this.client?.riskFlags?.includes('Sanctions')
    },
    clientAccounts() {
      return accounts[this.clientId] || []
    },
    transactionVolumeData() {
      if (!this.client?.transactionTrends) return { labels: [], datasets: [] }

      return {
        labels: this.client.transactionTrends.map(trend => trend.month),
        datasets: [
          {
            label: 'Transaction Volume ($M)',
            data: this.client.transactionTrends.map(trend => trend.volume / 1e6),
            borderColor: '#00A651',
            backgroundColor: 'rgba(0, 166, 81, 0.1)',
            tension: 0.4
          }
        ]
      }
    },
    transactionCountData() {
      if (!this.client?.transactionTrends) return { labels: [], datasets: [] }

      return {
        labels: this.client.transactionTrends.map(trend => trend.month),
        datasets: [
          {
            label: 'Transaction Count',
            data: this.client.transactionTrends.map(trend => trend.count),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }
        ]
      }
    }
  },
  methods: {
    formatCurrency,
    getRiskColor,
    getRiskFlagColor(flag) {
      const colors = {
        'High-Cash': 'bg-yellow-100 text-yellow-800',
        'Crypto': 'bg-purple-100 text-purple-800',
        'MSB': 'bg-orange-100 text-orange-800',
        'Cross-Border': 'bg-blue-100 text-blue-800',
        'PEP': 'bg-red-100 text-red-800',
        'Sanctions': 'bg-red-600 text-white'
      }
      return colors[flag] || 'bg-gray-100 text-gray-800'
    },
    drillDownToAccount(account) {
      console.log('Navigating to Account:', account.id)
      this.$router.push({ name: 'Account', params: { accountId: account.id } })
    },
    goBackToRM() {
      // Navigate back to RM view
      this.$router.push({ name: 'RelationshipManager', params: { rmId: 'rm1' } })
    },
    goBackToRelationship() {
      if (this.client) {
        this.$router.push({ name: 'Relationship', params: { relationshipId: this.client.relationshipId } })
      }
    }
  }
}
</script>