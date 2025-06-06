<template>
  <div class="client-view">
    <!-- Breadcrumb Navigation -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <router-link :to="`/metro/${metroId}`" class="text-gray-500 hover:text-td-green">{{ metro?.name
            }}</router-link>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <router-link :to="`/metro/${metroId}/market/${marketId}`" class="text-gray-500 hover:text-td-green">{{
            market?.name }}</router-link>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <router-link :to="`/metro/${metroId}/market/${marketId}/region/${regionId}`"
            class="text-gray-500 hover:text-td-green">{{ region?.name }}</router-link>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <router-link :to="`/metro/${metroId}/market/${marketId}/region/${regionId}/rm/${rmId}`"
            class="text-gray-500 hover:text-td-green">{{ rm?.name }}</router-link>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <span class="text-gray-900 font-medium">{{ client?.name }}</span>
        </li>
      </ol>
    </nav>

    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ client?.name }}</h1>
          <p class="text-gray-600">{{ client?.industry }} • {{ client?.location }}</p>
        </div>
        <div class="flex space-x-3">
          <span :class="['px-3 py-1 text-sm font-medium rounded-full', getTierBadgeClass(clientTier)]">
            {{ clientTier }}
          </span>
          <span :class="['px-3 py-1 text-sm font-medium rounded-full', getRiskScoreColor(clientRiskScore)]">
            Risk: {{ clientRiskScore }}
          </span>
        </div>
      </div>
    </div>

    <!-- Three-Panel Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

      <!-- 📁 Client Profile Section (Left Panel) -->
      <div class="lg:col-span-4">
        <div class="card">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">📁 Client Profile</h3>
          </div>
          <div class="p-6 space-y-6">

            <!-- Basic Information -->
            <div class="profile-section">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Basic Information</h4>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Client ID:</span>
                  <span class="text-sm font-medium text-gray-900">{{ client?.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Industry:</span>
                  <span class="text-sm font-medium text-gray-900">{{ client?.industry }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Geography:</span>
                  <span class="text-sm font-medium text-gray-900">{{ client?.location }}</span>
                </div>
              </div>
            </div>

            <!-- Related Parties -->
            <div class="profile-section">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Related Parties</h4>
              <div class="space-y-2">
                <div v-for="party in clientProfile.relatedParties" :key="party.id"
                  class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-900">{{ party.name }}</span>
                    <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{{ party.type }}</span>
                  </div>
                  <button class="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </div>
              </div>
            </div>

            <!-- Beneficial Owners -->
            <div class="profile-section">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Beneficial Owners</h4>
              <div class="space-y-2">
                <div v-for="owner in clientProfile.beneficialOwners" :key="owner.id"
                  class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-900">{{ owner.name }}</span>
                    <span class="text-xs text-gray-500">{{ owner.percentage }}%</span>
                  </div>
                  <button class="text-blue-600 hover:text-blue-800 text-xs underline">Profile</button>
                </div>
              </div>
            </div>

            <!-- Cosigners -->
            <div class="profile-section">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Cosigners</h4>
              <div class="space-y-2">
                <div v-for="cosigner in clientProfile.cosigners" :key="cosigner.id"
                  class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-900">{{ cosigner.name }}</span>
                    <svg v-if="cosigner.highRisk" class="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <button class="text-blue-600 hover:text-blue-800 text-xs">View</button>
                </div>
              </div>
            </div>

            <!-- Conductors -->
            <div class="profile-section">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Conductors</h4>
              <div class="space-y-2">
                <div v-for="conductor in clientProfile.conductors" :key="conductor.id"
                  class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-900">{{ conductor.name }}</span>
                    <span v-if="conductor.flagged"
                      class="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">Flagged</span>
                  </div>
                  <button
                    :class="['text-xs', conductor.flagged ? 'text-red-600 hover:text-red-800 underline' : 'text-blue-600 hover:text-blue-800']">
                    {{ conductor.flagged ? 'Review' : 'View' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Relationship Management -->
            <div class="profile-section">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Relationship Management</h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Assigned RM:</span>
                  <button class="text-sm font-medium text-blue-600 hover:text-blue-800">{{ rm?.name }}</button>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500">Relationship ID:</span>
                  <button class="text-sm font-medium text-blue-600 hover:text-blue-800 underline">#{{
                    clientProfile.relationshipId }}</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 📊 Product & Relationship Summary Section (Middle Panel) -->
      <div class="lg:col-span-5">
        <div class="card">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">📊 Product & Relationship Summary</h3>
          </div>
          <div class="p-6">

            <!-- Product Summary Table -->
            <div class="mb-6">
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="border-b border-gray-200">
                      <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Business
                        Line</th>
                      <th class="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3"># Accounts
                      </th>
                      <th class="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Total
                        Balance</th>
                      <th class="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="product in productSummary" :key="product.businessLine">
                      <td class="py-3 text-sm font-medium text-gray-900">{{ product.businessLine }}</td>
                      <td class="py-3 text-sm text-gray-900 text-right">{{ product.accounts }}</td>
                      <td class="py-3 text-sm text-gray-900 text-right">{{ formatCurrency(product.balance) }}</td>
                      <td class="py-3 text-sm text-gray-900 text-right">{{ formatCurrency(product.revenue) }}</td>
                    </tr>
                  </tbody>
                  <tfoot class="border-t-2 border-gray-300">
                    <tr class="font-semibold">
                      <td class="py-3 text-sm text-gray-900">Total</td>
                      <td class="py-3 text-sm text-gray-900 text-right">{{ totalAccounts }}</td>
                      <td class="py-3 text-sm text-gray-900 text-right">{{ formatCurrency(totalBalance) }}</td>
                      <td class="py-3 text-sm text-gray-900 text-right">{{ formatCurrency(totalRevenue) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- Balance vs Revenue Chart -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Balance vs Revenue Analysis</h4>
              <div class="h-64">
                <BarChart v-if="balanceRevenueChartData" :data="balanceRevenueChartData" />
              </div>
            </div>

            <!-- Product Usage Gaps -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Product Usage Gaps</h4>
              <div class="space-y-3">
                <div v-for="gap in productGaps" :key="gap.product"
                  class="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ gap.product }}</p>
                    <p class="text-xs text-gray-600">{{ gap.reason }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-green-600">{{ formatCurrency(gap.potentialRevenue) }}</p>
                    <p class="text-xs text-gray-500">Potential</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 🚨 Risk Flag Panel (Right Panel) -->
      <div class="lg:col-span-3">
        <div class="card">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">🚨 Risk Flags</h3>
          </div>
          <div class="p-6">

            <!-- Risk Summary -->
            <div class="mb-10">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-gray-700">Total Risk Flags</span>
                <span class="text-2xl font-bold text-red-600">{{ totalRiskFlags }}</span>
              </div>
              <div class="h-56 mb-8">
                <DoughnutChart v-if="riskFlagChartData" :data="riskFlagChartData" />
              </div>
            </div>

            <!-- Risk Flag Details -->
            <div class="space-y-3">
              <div v-for="flag in riskFlags" :key="flag.type" class="risk-flag-item p-3 border rounded-lg"
                :class="getRiskFlagBorderClass(flag.severity)">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <span :class="['w-3 h-3 rounded-full', getRiskFlagColor(flag.severity)]"></span>
                    <span class="text-sm font-medium text-gray-900">{{ flag.type }}</span>
                  </div>
                  <span class="text-sm font-bold text-gray-700">{{ flag.count }}</span>
                </div>
                <div class="space-y-1">
                  <div v-for="source in flag.sources" :key="source" class="text-xs text-gray-600">
                    • {{ source }}
                  </div>
                </div>
                <div class="mt-2">
                  <span :class="['text-xs px-2 py-1 rounded-full', getSeverityBadgeClass(flag.severity)]">
                    {{ flag.severity }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Recommendations -->
            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 class="text-sm font-medium text-blue-900 mb-2">Recommended Actions</h4>
              <div class="space-y-2">
                <div v-for="action in recommendedActions" :key="action.id" class="flex items-center space-x-2">
                  <span :class="['w-2 h-2 rounded-full', getActionPriorityColor(action.priority)]"></span>
                  <span class="text-xs text-blue-800">{{ action.description }}</span>
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
import { getClientById, getRMById, getRegionById, getMarketById, getMetroById, formatCurrency } from '../data/mockData.js'
import BarChart from './charts/BarChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'

const props = defineProps({
  metroId: { type: String, required: true },
  marketId: { type: String, required: true },
  regionId: { type: String, required: true },
  rmId: { type: String, required: true },
  relationshipId: { type: String, required: false },
  clientId: { type: String, required: true }
})

const router = useRouter()

// Computed properties for breadcrumb data
const client = computed(() => getClientById(props.clientId))
const rm = computed(() => getRMById(props.rmId))
const region = computed(() => getRegionById(props.regionId))
const market = computed(() => getMarketById(props.marketId))
const metro = computed(() => getMetroById(props.metroId))

// Client profile data
const clientProfile = ref({
  relatedParties: [
    { id: 'rp1', name: 'TechCorp Holdings Ltd', type: 'Subsidiary' },
    { id: 'rp2', name: 'Innovation Ventures LLC', type: 'Affiliate' }
  ],
  beneficialOwners: [
    { id: 'bo1', name: 'John Smith', percentage: 45 },
    { id: 'bo2', name: 'Sarah Johnson', percentage: 35 },
    { id: 'bo3', name: 'Investment Fund Alpha', percentage: 20 }
  ],
  cosigners: [
    { id: 'cs1', name: 'Michael Chen', highRisk: false },
    { id: 'cs2', name: 'Robert Martinez', highRisk: true }
  ],
  conductors: [
    { id: 'cd1', name: 'Emily Rodriguez', flagged: false },
    { id: 'cd2', name: 'David Thompson', flagged: true }
  ],
  relationshipId: 'REL-2024-001'
})

// Product summary data
const productSummary = ref([
  { businessLine: 'Deposit', accounts: 8, balance: 45000000, revenue: 890000 },
  { businessLine: 'Loan', accounts: 3, balance: 15000000, revenue: 1200000 },
  { businessLine: 'TMS', accounts: 5, balance: 8500000, revenue: 340000 },
  { businessLine: 'MS', accounts: 2, balance: 2300000, revenue: 180000 },
  { businessLine: 'Wealth', accounts: 1, balance: 25000000, revenue: 650000 }
])

// Product gaps
const productGaps = ref([
  { product: 'FX Services', reason: 'High international transaction volume', potentialRevenue: 450000 },
  { product: 'Trade Finance', reason: 'Import/export business activity', potentialRevenue: 280000 }
])

// Risk flags
const riskFlags = ref([
  {
    type: 'High Cash Transactions',
    count: 8,
    severity: 'Critical',
    sources: ['ATM deposits >$10K', 'Cash deposits patterns', 'Structured deposits']
  },
  {
    type: 'Crypto Activity',
    count: 3,
    severity: 'Critical',
    sources: ['Coinbase transfers', 'Crypto exchange wires']
  },
  {
    type: 'Cross-Border Wires',
    count: 12,
    severity: 'Review',
    sources: ['High-risk countries', 'Frequent wire patterns']
  },
  {
    type: 'Industry Risk',
    count: 2,
    severity: 'Watch',
    sources: ['MSB classification', 'Cash-intensive business']
  }
])

// Recommended actions
const recommendedActions = ref([
  { id: 1, description: 'Escalate for Review - Crypto + Wire combination', priority: 'Critical' },
  { id: 2, description: 'Enhanced Due Diligence Review', priority: 'High' },
  { id: 3, description: 'Update Beneficial Owner Documentation', priority: 'Medium' }
])

// Computed values
const totalAccounts = computed(() => {
  return productSummary.value.reduce((sum, product) => sum + product.accounts, 0)
})

const totalBalance = computed(() => {
  return productSummary.value.reduce((sum, product) => sum + product.balance, 0)
})

const clientTier = computed(() => {
  const balance = totalBalance.value
  if (balance >= 100000000) return 'Tier 1'
  if (balance >= 50000000) return 'Tier 2'
  if (balance >= 20000000) return 'Tier 3'
  return 'Tier 4'
})

const clientRiskScore = computed(() => {
  return (Math.random() * 8 + 2).toFixed(1)
})

const totalRevenue = computed(() => {
  return productSummary.value.reduce((sum, product) => sum + product.revenue, 0)
})

const totalRiskFlags = computed(() => {
  return riskFlags.value.reduce((sum, flag) => sum + flag.count, 0)
})

const balanceRevenueChartData = computed(() => {
  return {
    labels: productSummary.value.map(p => p.businessLine),
    datasets: [
      {
        label: 'Balance ($M)',
        data: productSummary.value.map(p => p.balance / 1000000),
        backgroundColor: 'rgba(107, 142, 35, 0.8)',
        borderColor: '#6B8E23',
        borderWidth: 1
      },
      {
        label: 'Revenue ($K)',
        data: productSummary.value.map(p => p.revenue / 1000),
        backgroundColor: 'rgba(34, 139, 34, 0.8)',
        borderColor: '#228B22',
        borderWidth: 1
      }
    ]
  }
})

const riskFlagChartData = computed(() => {
  return {
    labels: riskFlags.value.map(flag => flag.type),
    datasets: [{
      data: riskFlags.value.map(flag => flag.count),
      backgroundColor: riskFlags.value.map(flag => {
        switch (flag.severity) {
          case 'Critical': return '#EF4444'
          case 'Review': return '#F59E0B'
          case 'Watch': return '#10B981'
          default: return '#6B7280'
        }
      }),
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  }
})

// Methods
const getTierBadgeClass = (tier) => {
  switch (tier?.toLowerCase()) {
    case 'tier 1': return 'bg-purple-100 text-purple-800'
    case 'tier 2': return 'bg-blue-100 text-blue-800'
    case 'tier 3': return 'bg-green-100 text-green-800'
    case 'tier 4': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRiskScoreColor = (score) => {
  if (score >= 8) return 'bg-red-100 text-red-800'
  if (score >= 6) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const getRiskFlagColor = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-500'
    case 'Review': return 'bg-yellow-500'
    case 'Watch': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getRiskFlagBorderClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'border-red-200 bg-red-50'
    case 'Review': return 'border-yellow-200 bg-yellow-50'
    case 'Watch': return 'border-green-200 bg-green-50'
    default: return 'border-gray-200 bg-gray-50'
  }
}

const getSeverityBadgeClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-100 text-red-800'
    case 'Review': return 'bg-yellow-100 text-yellow-800'
    case 'Watch': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getActionPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical': return 'bg-red-500'
    case 'High': return 'bg-orange-500'
    case 'Medium': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}

// Lifecycle
onMounted(() => {
  console.log('ClientView mounted for client:', props.clientId)
  console.log('Client data:', client.value)
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.profile-section {
  @apply border-b border-gray-100 pb-4 last:border-b-0 last:pb-0;
}

.risk-flag-item {
  transition: all 0.2s ease-in-out;
}

.risk-flag-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>