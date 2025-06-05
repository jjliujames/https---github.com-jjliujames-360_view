<template>
  <div class="relationship-view">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <span @click="$router.push('/executive')" class="breadcrumb-item">Executive Dashboard</span>
      <span>></span>
      <span @click="goBackToRM" class="breadcrumb-item">{{ relationship?.rmId }}</span>
      <span>></span>
      <span class="text-gray-900">{{ relationship?.name }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center mb-4">
        <div class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mr-4">
          <span class="text-lg font-medium text-white">{{ relationship?.name?.split(' ')[0][0] }}</span>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ relationship?.name }}</h1>
          <p class="text-gray-600">{{ relationship?.industry }} • Relationship Group</p>
        </div>
      </div>
    </div>

    <!-- Relationship Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-td-green rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(relationship?.totalValue) }}</p>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-blue-500 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Client Entities</p>
            <p class="text-2xl font-bold text-gray-900">{{ relationship?.clientCount }}</p>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-purple-500 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Annual Revenue</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(relationship?.revenue) }}</p>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-orange-500 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Risk Level</p>
            <p class="text-2xl font-bold text-gray-900">
              <span :class="['risk-flag', getRiskColor(relationship?.riskLevel)]">{{ relationship?.riskLevel }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Relationship Summary Chart -->
    <div class="card mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Relationship Summary</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-sm font-medium text-gray-600">Total Deposits</span>
            <span class="text-lg font-bold text-gray-900">{{ formatCurrency(totalDeposits) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-sm font-medium text-gray-600">Total Loans</span>
            <span class="text-lg font-bold text-gray-900">{{ formatCurrency(totalLoans) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-sm font-medium text-gray-600">Total Accounts</span>
            <span class="text-lg font-bold text-gray-900">{{ totalAccounts }}</span>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div class="text-center">
            <div class="text-4xl font-bold text-td-green mb-2">{{ relationshipClients.length }}</div>
            <div class="text-gray-600">Active Client Entities</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Clients Table -->
    <div class="card">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Client Entities in Relationship</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Click on any client to view detailed 360 profile</p>
      </div>
      <div v-if="relationshipClients && relationshipClients.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geography</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposits</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loans</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Flags</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="client in relationshipClients" 
              :key="client.id"
              @click="drillDownToClient(client)"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-td-green flex items-center justify-center">
                      <span class="text-sm font-medium text-white">{{ client.name.split(' ')[0][0] }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                    <div class="text-sm text-gray-500">{{ client.taxId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ client.industry }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ client.geography }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(client.totalDeposits) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(client.totalLoans) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(client.totalRevenue) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="flag in client.riskFlags" 
                    :key="flag"
                    class="risk-flag risk-medium"
                  >
                    {{ flag }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="p-8 text-center text-gray-500">
        No clients found for this relationship
      </div>
    </div>
  </div>
</template>

<script>
import { relationshipManagers, relationships, clients, formatCurrency, getRiskColor } from '../data/mockData.js'

export default {
  name: 'RelationshipView',
  props: ['relationshipId'],
  computed: {
    relationship() {
      // Find the relationship across all RMs
      for (const rmId in relationships) {
        const found = relationships[rmId].find(rel => rel.id === this.relationshipId)
        if (found) return found
      }
      return null
    },
    relationshipClients() {
      return clients[this.relationshipId] || []
    },
    totalDeposits() {
      return this.relationshipClients.reduce((sum, client) => sum + client.totalDeposits, 0)
    },
    totalLoans() {
      return this.relationshipClients.reduce((sum, client) => sum + client.totalLoans, 0)
    },
    totalAccounts() {
      return this.relationshipClients.reduce((sum, client) => sum + client.accountCount, 0)
    }
  },
  methods: {
    formatCurrency,
    getRiskColor,
    drillDownToClient(client) {
      this.$router.push({ name: 'Client', params: { clientId: client.id } })
    },
    goBackToRM() {
      if (this.relationship) {
        this.$router.push({ name: 'RelationshipManager', params: { rmId: this.relationship.rmId } })
      }
    }
  }
}
</script> 