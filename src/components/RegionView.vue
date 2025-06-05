<template>
  <div class="region-view">
    <!-- Breadcrumb Navigation -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2">
        <li>
          <router-link to="/executive" class="text-gray-500 hover:text-td-green">Executive</router-link>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
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
          <span class="text-gray-900 font-medium">{{ region?.name }}</span>
        </li>
      </ol>
    </nav>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ region?.name }}</h1>
      <p class="text-gray-600">Relationship Manager Performance Overview</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-td-green rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
              </path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Region Portfolio</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(region?.portfolioValue) }}</p>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-blue-500 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Clients</p>
            <p class="text-2xl font-bold text-gray-900">{{ region?.clientCount.toLocaleString() }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(region?.revenue) }}</p>
          </div>
        </div>
      </div>

      <div class="metric-card">
        <div class="flex items-center">
          <div class="p-2 bg-orange-500 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
              </path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Risk Level</p>
            <p class="text-2xl font-bold text-gray-900">{{ region?.riskScore }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Relationship Managers Table -->
    <div class="card">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Relationship Managers</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Click on any row to view RM's client portfolio</p>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio Value
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="rm in regionRMs" :key="rm.id" @click="drillDownToRM(rm)"
              class="hover:bg-gray-50 cursor-pointer transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-td-green flex items-center justify-center">
                      <span class="text-sm font-medium text-white">{{rm.name.split(' ').map(n => n[0]).join('')
                        }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ rm.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(rm.portfolioValue) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rm.clientCount.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(rm.revenue) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['risk-flag', getRiskColor(rm.riskScore)]">{{ rm.riskScore }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegionById, getMarketById, getMetroById, getRMsByRegion, formatCurrency, getRiskColor } from '../data/mockData.js'

export default {
  name: 'RegionView',
  props: {
    metroId: {
      type: String,
      required: true
    },
    marketId: {
      type: String,
      required: true
    },
    regionId: {
      type: String,
      required: true
    }
  },
  computed: {
    region() {
      return getRegionById(this.regionId)
    },
    market() {
      return getMarketById(this.marketId)
    },
    metro() {
      return getMetroById(this.metroId)
    },
    regionRMs() {
      return getRMsByRegion(this.regionId)
    }
  },
  methods: {
    formatCurrency,
    getRiskColor,
    drillDownToRM(rm) {
      console.log('Navigating to RM:', rm.id)
      this.$router.push({
        name: 'RelationshipManager',
        params: {
          metroId: this.metroId,
          marketId: this.marketId,
          regionId: this.regionId,
          rmId: rm.id
        }
      })
    }
  },
  mounted() {
    console.log('RegionView mounted for region:', this.regionId)
    console.log('Region data:', this.region)
    console.log('Region RMs:', this.regionRMs)
  }
}
</script>