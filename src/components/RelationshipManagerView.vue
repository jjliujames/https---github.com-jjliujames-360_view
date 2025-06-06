<template>
  <div class="rm-view">
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
          <router-link :to="`/metro/${metroId}/market/${marketId}/region/${regionId}`"
            class="text-gray-500 hover:text-td-green">{{ region?.name }}</router-link>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          <span class="text-gray-900 font-medium">{{ rm?.name }}</span>
        </li>
      </ol>
    </nav>

    <!-- Header with Role Context -->
    <div class="mb-8">
      <div class="flex justify-between items-start">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-16 w-16">
            <div class="h-16 w-16 rounded-full bg-td-green flex items-center justify-center">
              <span class="text-xl font-medium text-white">{{rm?.name.split(' ').map(n => n[0]).join('')}}</span>
            </div>
          </div>
          <div class="ml-6">
            <h1 class="text-3xl font-bold text-gray-900">{{ rm?.name }}</h1>
            <p class="text-gray-600">My Book of Business Dashboard</p>
          </div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
          <p class="text-sm font-medium text-green-800">Role: Relationship Manager</p>
          <p class="text-xs text-green-600">Personal portfolio management</p>
        </div>
      </div>
    </div>

    <!-- Daily Action Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div class="metric-card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div class="flex items-center">
          <div class="p-2 bg-red-600 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-red-800">Actions Due Today</p>
            <p class="text-2xl font-bold text-red-900">{{ dailyActions.dueToday }}</p>
            <p class="text-xs text-red-600">{{ dailyActions.overdue }} overdue</p>
          </div>
        </div>
      </div>

      <div class="metric-card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <div class="flex items-center">
          <div class="p-2 bg-orange-600 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z">
              </path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-orange-800">Risk Alerts</p>
            <p class="text-2xl font-bold text-orange-900">{{ dailyActions.riskAlerts }}</p>
            <p class="text-xs text-orange-600">{{ dailyActions.newAlerts }} new</p>
          </div>
        </div>
      </div>

      <div class="metric-card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div class="flex items-center">
          <div class="p-2 bg-green-600 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6">
              </path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-green-800">Opportunities</p>
            <p class="text-2xl font-bold text-green-900">{{ dailyActions.opportunities }}</p>
            <p class="text-xs text-green-600">{{ formatCurrency(dailyActions.opportunityValue) }}</p>
          </div>
        </div>
      </div>

      <div class="metric-card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div class="flex items-center">
          <div class="p-2 bg-blue-600 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-blue-800">Reviews Due</p>
            <p class="text-2xl font-bold text-blue-900">{{ dailyActions.reviewsDue }}</p>
            <p class="text-xs text-blue-600">{{ dailyActions.highPriority }} high priority</p>
          </div>
        </div>
      </div>

      <div class="metric-card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div class="flex items-center">
          <div class="p-2 bg-purple-600 rounded-lg">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
              </path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-purple-800">Calls Scheduled</p>
            <p class="text-2xl font-bold text-purple-900">{{ dailyActions.callsScheduled }}</p>
            <p class="text-xs text-purple-600">{{ dailyActions.meetings }} meetings</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Action List -->
    <div class="card mb-8">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Today's Action List</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Priority tasks and client interactions for today</p>
          </div>
          <div class="flex space-x-2">
            <button @click="filterActions('all')"
              :class="['px-3 py-1 text-xs rounded-full', actionFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
              All ({{ actionItems.length }})
            </button>
            <button @click="filterActions('high')"
              :class="['px-3 py-1 text-xs rounded-full', actionFilter === 'high' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700']">
              High Priority ({{ getActionsByPriority('High').length }})
            </button>
            <button @click="filterActions('calls')"
              :class="['px-3 py-1 text-xs rounded-full', actionFilter === 'calls' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700']">
              Calls ({{ getActionsByType('Call').length }})
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="action in filteredActions" :key="action.id"
            class="flex items-center justify-between p-4 border rounded-lg" :class="getActionRowClass(action)">
            <div class="flex items-center space-x-4">
              <input type="checkbox" v-model="action.completed" @change="updateAction(action)"
                class="h-4 w-4 text-td-green focus:ring-td-green border-gray-300 rounded">
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-900"
                    :class="action.completed ? 'line-through text-gray-500' : ''">
                    {{ action.title }}
                  </span>
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="getPriorityBadgeClass(action.priority)">
                    {{ action.priority }}
                  </span>
                  <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {{ action.type }}
                  </span>
                </div>
                <div class="text-sm text-gray-500 mt-1">
                  <span class="font-medium">{{ action.client }}</span> • {{ action.description }}
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  Due: {{ action.dueDate }} • Est. {{ action.estimatedTime }}
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Start</button>
              <button class="text-gray-400 hover:text-gray-600 text-sm">Reschedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Risk Alert Timeline -->
      <div class="card">
        <div class="p-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Risk Alert Timeline</h3>
          <p class="text-sm text-gray-500">30-day alert history</p>
        </div>
        <div class="p-4">
          <div class="h-48">
            <LineChart v-if="riskTimelineData" :data="riskTimelineData" />
            <div v-else class="h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span class="text-gray-500">Loading chart...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Client Review Status -->
      <div class="card">
        <div class="p-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Client Review Status</h3>
          <p class="text-sm text-gray-500">Review completion status</p>
        </div>
        <div class="p-4">
          <div class="h-48">
            <DoughnutChart v-if="reviewStatusData" :data="reviewStatusData" />
            <div v-else class="h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span class="text-gray-500">Loading chart...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- High Opportunity Clients -->
    <div class="card mb-8">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">High Opportunity Clients</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Clients with significant revenue potential</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="client in highOpportunityClients" :key="client.id"
            class="opportunity-client-card bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            @click="drillDownToClient(client)">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ client.name }}</h4>
                <p class="text-xs text-gray-500">{{ client.industry }}</p>
              </div>
              <span class="text-lg font-bold text-green-600">{{ client.opportunityScore }}/10</span>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Potential Revenue:</span>
                <span class="font-medium text-green-600">{{ formatCurrency(client.potentialRevenue) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Products Missing:</span>
                <span class="font-medium">{{ client.productGaps }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Last Contact:</span>
                <span class="text-gray-500">{{ client.lastContact }}</span>
              </div>
            </div>
            <div class="mt-3">
              <button
                class="w-full text-center text-sm font-medium text-green-700 bg-green-100 rounded-md py-2 hover:bg-green-200 transition-colors">
                View Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Intelligence Layer - AI Action Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-red-900">🚨 Urgent Reviews</h3>
            <span class="text-2xl font-bold text-red-600">{{ intelligenceCards.urgentReviews.count }}</span>
          </div>
          <p class="text-sm text-red-700 mb-3">{{ intelligenceCards.urgentReviews.description }}</p>
          <div class="space-y-2">
            <div v-for="client in intelligenceCards.urgentReviews.clients" :key="client"
              class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              {{ client }}
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-green-900">💰 High Opportunity</h3>
            <span class="text-2xl font-bold text-green-600">{{ intelligenceCards.highOpportunity.count }}</span>
          </div>
          <p class="text-sm text-green-700 mb-3">{{ intelligenceCards.highOpportunity.description }}</p>
          <div class="space-y-2">
            <div v-for="client in intelligenceCards.highOpportunity.clients" :key="client"
              class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {{ client }}
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-purple-900">🔍 Risk Flags</h3>
            <span class="text-2xl font-bold text-purple-600">{{ intelligenceCards.riskFlags.count }}</span>
          </div>
          <p class="text-sm text-purple-700 mb-3">{{ intelligenceCards.riskFlags.description }}</p>
          <div class="space-y-2">
            <div v-for="client in intelligenceCards.riskFlags.clients" :key="client"
              class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {{ client }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Analytics Dashboard -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      <!-- 📈 12-Month Transaction Trend -->
      <div class="card">
        <div class="p-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium text-gray-900">📈 12-Month Transaction Trend</h3>
              <p class="text-sm text-gray-500">Inbound vs Outbound flow with risk percentiles</p>
            </div>
            <div class="flex space-x-2">
              <button @click="transactionViewType = 'all'"
                :class="['px-3 py-1 text-xs rounded-full', transactionViewType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                All
              </button>
              <button @click="transactionViewType = 'financial'"
                :class="['px-3 py-1 text-xs rounded-full', transactionViewType === 'financial' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                Financial
              </button>
              <button @click="transactionViewType = 'nonfinancial'"
                :class="['px-3 py-1 text-xs rounded-full', transactionViewType === 'nonfinancial' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                Non-Financial
              </button>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="h-64">
            <BarChart v-if="transactionTrendData" :data="transactionTrendData" />
          </div>
          <div class="mt-4 flex justify-center space-x-6 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span class="text-gray-600">Inbound Flow</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span class="text-gray-600">Outbound Flow</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span class="text-gray-600">99th Percentile Risk</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 💰 Balance / Revenue Chart -->
      <div class="card">
        <div class="p-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">💰 Balance vs Revenue Analysis</h3>
          <p class="text-sm text-gray-500">Deposit vs Lending balance with revenue trends</p>
        </div>
        <div class="p-4">
          <div class="h-64">
            <LineChart v-if="balanceRevenueData" :data="balanceRevenueData" />
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div class="bg-blue-50 p-3 rounded-lg">
              <p class="text-blue-600 font-medium">Deposit Balance</p>
              <p class="text-2xl font-bold text-blue-900">{{ formatCurrency(portfolioMetrics.totalDeposits) }}</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="text-green-600 font-medium">Lending Balance</p>
              <p class="text-2xl font-bold text-green-900">{{ formatCurrency(portfolioMetrics.totalLoans) }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 🚩 Risk Flag Distribution Chart -->
    <div class="card mb-8">
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">🚩 Risk Flag Distribution</h3>
        <p class="text-sm text-gray-500">Count of each risk flag type across your client portfolio</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="h-64">
            <BarChart v-if="riskFlagDistributionData" :data="riskFlagDistributionData" />
          </div>
          <div class="space-y-4">
            <div v-for="flag in riskFlagBreakdown" :key="flag.type"
              class="flex items-center justify-between p-3 rounded-lg" :class="flag.severity === 'Critical' ? 'bg-red-50 border border-red-200' :
                flag.severity === 'Review' ? 'bg-orange-50 border border-orange-200' :
                  'bg-yellow-50 border border-yellow-200'">
              <div class="flex items-center space-x-3">
                <div :class="['w-4 h-4 rounded-full',
                  flag.severity === 'Critical' ? 'bg-red-500' :
                    flag.severity === 'Review' ? 'bg-orange-500' : 'bg-yellow-500']"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ flag.type }}</p>
                  <p class="text-xs text-gray-600">{{ flag.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold" :class="flag.severity === 'Critical' ? 'text-red-600' :
                  flag.severity === 'Review' ? 'text-orange-600' : 'text-yellow-600'">
                  {{ flag.count }}
                </p>
                <p class="text-xs text-gray-500">clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🧾 RM Portfolio Summary Table -->
    <div class="card">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">🧾 RM Portfolio Summary</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Complete client portfolio with risk assessment and
              recommended actions</p>
          </div>
          <div class="flex space-x-2">
            <input type="text" v-model="searchQuery" placeholder="Search clients..."
              class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-td-green focus:border-td-green">
            <select v-model="clientSort" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option value="name">Sort by Name</option>
              <option value="risk">Sort by Risk</option>
              <option value="opportunity">Sort by Opportunity</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="flags">Sort by Risk Flags</option>
            </select>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client / Tier
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry /
                Geography</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Flags</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Balance
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product
                Penetration</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended
                Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="client in enhancedClientData" :key="client.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors" @click="drillDownToClient(client)">

              <!-- Client / Tier -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{client.name.split(' ').map(n =>
                        n[0]).join('')}}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                    <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getTierBadgeClass(client.tier)">
                      {{ client.tier }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Industry / Geography -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ client.industry }}</div>
                <div class="text-sm text-gray-500">{{ client.location }}</div>
              </td>

              <!-- Risk Score -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm font-bold" :class="getRiskScoreColor(client.riskScore)">{{ client.riskScore
                  }}</span>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div :class="['h-2 rounded-full', getRiskScoreBarColor(client.riskScore)]"
                      :style="{ width: (client.riskScore / 10 * 100) + '%' }"></div>
                  </div>
                </div>
              </td>

              <!-- Risk Flags -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-bold text-gray-900">{{ client.activeRiskFlags }}</span>
                  <div class="flex space-x-1">
                    <div v-for="flag in client.riskFlagIcons" :key="flag.type"
                      class="w-4 h-4 rounded-full flex items-center justify-center" :class="flag.color"
                      :title="flag.type">
                      <span class="text-xs text-white font-bold">!</span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Total Revenue -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(client.annualRevenue) }}
              </td>

              <!-- Total Balance -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(client.portfolioValue) }}
              </td>

              <!-- Product Penetration -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">{{ client.productPenetration }}%</span>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" :style="{ width: client.productPenetration + '%' }"></div>
                  </div>
                </div>
              </td>

              <!-- Recommended Action -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getActionBadgeClass(client.recommendedAction)">
                  {{ client.recommendedAction }}
                </span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRMById, getRegionById, getMarketById, getMetroById, clients, formatCurrency, getRiskColor } from '../data/mockData.js'
import LineChart from './charts/LineChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'
import BarChart from './charts/BarChart.vue'

const props = defineProps({
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
  },
  rmId: {
    type: String,
    required: true
  }
})

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const clientSort = ref('name')
const actionFilter = ref('all')
const transactionViewType = ref('all')

const dailyActions = reactive({
  dueToday: 8,
  overdue: 2,
  riskAlerts: 5,
  newAlerts: 1,
  opportunities: 12,
  opportunityValue: 2400000,
  reviewsDue: 6,
  highPriority: 3,
  callsScheduled: 4,
  meetings: 2
})
const actionItems = ref([
  {
    id: 'action-001',
    title: 'Follow up on Credit Facility Application',
    client: 'TechCorp Industries',
    description: 'Review credit application status and next steps',
    type: 'Call',
    priority: 'High',
    dueDate: 'Today 2:00 PM',
    estimatedTime: '30 min',
    completed: false
  },
  {
    id: 'action-002',
    title: 'Quarterly Business Review Preparation',
    client: 'Global Manufacturing Corp',
    description: 'Prepare QBR presentation and financial analysis',
    type: 'Meeting Prep',
    priority: 'High',
    dueDate: 'Today 4:00 PM',
    estimatedTime: '45 min',
    completed: false
  },
  {
    id: 'action-003',
    title: 'Risk Pattern Analysis',
    client: 'Financial Services Group',
    description: 'Investigate recent high-cash transaction alert',
    type: 'Review',
    priority: 'Medium',
    dueDate: 'Today 5:00 PM',
    estimatedTime: '20 min',
    completed: false
  },
  {
    id: 'action-004',
    title: 'Treasury Management Presentation',
    client: 'Healthcare Solutions Inc',
    description: 'Present treasury management solutions and benefits',
    type: 'Presentation',
    priority: 'Medium',
    dueDate: 'Tomorrow 10:00 AM',
    estimatedTime: '60 min',
    completed: false
  },
  {
    id: 'action-005',
    title: 'Annual Review Completion',
    client: 'Energy Dynamics LLC',
    description: 'Complete annual client review and documentation',
    type: 'Review',
    priority: 'Low',
    dueDate: 'This Week',
    estimatedTime: '90 min',
    completed: true
  }
])

const highOpportunityClients = ref([
  {
    id: 'opportunity-001',
    name: 'TechCorp Industries',
    industry: 'Technology',
    opportunityScore: 9.2,
    potentialRevenue: 850000,
    productGaps: 3,
    lastContact: '2 days ago'
  },
  {
    id: 'opportunity-002',
    name: 'Global Manufacturing Corp',
    industry: 'Manufacturing',
    opportunityScore: 8.7,
    potentialRevenue: 640000,
    productGaps: 2,
    lastContact: '1 week ago'
  },
  {
    id: 'opportunity-003',
    name: 'Financial Services Group',
    industry: 'Financial Services',
    opportunityScore: 8.4,
    potentialRevenue: 920000,
    productGaps: 4,
    lastContact: '3 days ago'
  }
])

// Intelligence Layer Data
const intelligenceCards = reactive({
  urgentReviews: {
    count: 3,
    description: 'Clients need review today',
    clients: ['TechCorp Industries', 'Global Manufacturing', 'Energy Dynamics']
  },
  highOpportunity: {
    count: 2,
    description: 'Clients match product offer fit ≥ 85%',
    clients: ['Financial Services Group', 'Healthcare Solutions']
  },
  riskFlags: {
    count: 1,
    description: 'Client flagged for Crypto + Wire',
    clients: ['Digital Assets Corp']
  }
})

// Portfolio Metrics
const portfolioMetrics = reactive({
  totalDeposits: 245000000,
  totalLoans: 89000000,
  totalRevenue: 12400000,
  clientCount: 35
})

// Risk Flag Breakdown
const riskFlagBreakdown = ref([
  {
    type: 'Crypto Activity',
    count: 8,
    severity: 'Critical',
    description: 'Cryptocurrency transactions or blockchain business'
  },
  {
    type: 'High Cash Transactions',
    count: 12,
    severity: 'Critical',
    description: 'Cash transactions above threshold'
  },
  {
    type: 'Cross-Border Wires',
    count: 15,
    severity: 'Review',
    description: 'International wire transfers to high-risk countries'
  },
  {
    type: 'MSB Activity',
    count: 6,
    severity: 'Review',
    description: 'Money Service Business classification'
  },
  {
    type: 'Industry Risk',
    count: 9,
    severity: 'Watch',
    description: 'High-risk industry classification'
  },
  {
    type: 'Geographic Risk',
    count: 4,
    severity: 'Watch',
    description: 'Operations in high-risk jurisdictions'
  }
])
// Computed properties
const rm = computed(() => getRMById(props.rmId))
const region = computed(() => getRegionById(props.regionId))
const market = computed(() => getMarketById(props.marketId))
const metro = computed(() => getMetroById(props.metroId))

const rmClients = computed(() => {
  if (!rm.value?.clientIds) return []
  return rm.value.clientIds.map(clientId => {
    const client = clients[clientId]
    if (!client) return null

    // Enhanced client data with tier, scores, and actions
    return {
      ...client,
      tier: generateTier(client.portfolioValue),
      riskScore: generateRiskScore(),
      opportunityScore: generateOpportunityScore(),
      nextAction: generateNextAction(),
      nextActionDate: generateNextActionDate()
    }
  }).filter(Boolean)
})

const filteredActions = computed(() => {
  if (actionFilter.value === 'all') return actionItems.value
  return actionItems.value.filter(action => {
    switch (actionFilter.value) {
      case 'high': return action.priority === 'High'
      case 'calls': return action.type === 'Call'
      default: return true
    }
  })
})

const sortedAndFilteredClients = computed(() => {
  let filtered = rmClients.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.industry.toLowerCase().includes(query) ||
      client.location.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (clientSort.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'risk':
        return b.riskScore - a.riskScore
      case 'opportunity':
        return b.opportunityScore - a.opportunityScore
      case 'revenue':
        return b.annualRevenue - a.annualRevenue
      default:
        return 0
    }
  })
})

const enhancedClientData = computed(() => {
  if (!rm.value?.clientIds) return []

  return rm.value.clientIds.map(clientId => {
    const client = clients[clientId]
    if (!client) return null

    // Generate enhanced client data
    const riskScore = parseFloat(generateRiskScore())
    const activeRiskFlags = Math.floor(Math.random() * 6)
    const productPenetration = Math.floor(Math.random() * 60) + 40 // 40-100%

    // Generate risk flag icons
    const riskFlagIcons = []
    const flagTypes = ['Crypto', 'Cash', 'Wire', 'MSB', 'PEP']
    for (let i = 0; i < Math.min(activeRiskFlags, 3); i++) {
      riskFlagIcons.push({
        type: flagTypes[i],
        color: i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : 'bg-yellow-500'
      })
    }

    // Generate recommended action
    let recommendedAction = 'Monitor'
    if (activeRiskFlags >= 3) {
      recommendedAction = 'Send for Review'
    } else if (riskScore >= 8 && activeRiskFlags >= 1) {
      recommendedAction = 'Escalate to Review'
    } else if (productPenetration < 60 && activeRiskFlags === 0) {
      recommendedAction = 'Upsell Product'
    }

    return {
      ...client,
      tier: generateTier(client.portfolioValue),
      riskScore: riskScore,
      activeRiskFlags: activeRiskFlags,
      riskFlagIcons: riskFlagIcons,
      productPenetration: productPenetration,
      recommendedAction: recommendedAction,
      opportunityScore: generateOpportunityScore(),
      nextAction: generateNextAction(),
      nextActionDate: generateNextActionDate()
    }
  }).filter(Boolean)
})

const riskTimelineData = computed(() => {
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })

  const alerts = Array.from({ length: 30 }, () => Math.floor(Math.random() * 8))

  return {
    labels: days,
    datasets: [{
      label: 'Risk Alerts',
      data: alerts,
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }
})

const reviewStatusData = computed(() => {
  return {
    labels: ['Completed', 'In Progress', 'Overdue', 'Scheduled'],
    datasets: [{
      data: [18, 8, 3, 6],
      backgroundColor: [
        '#10B981',
        '#3B82F6',
        '#EF4444',
        '#F59E0B'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  }
})



const transactionTrendData = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Generate transaction data by type (amounts in millions)
  const transactionTypes = {
    // Inflows (positive values)
    'Cash Deposits': months.map(() => Math.floor(Math.random() * 15) + 5),
    'Check Deposits': months.map(() => Math.floor(Math.random() * 25) + 10),
    'ACH In': months.map(() => Math.floor(Math.random() * 20) + 8),
    'Wire In': months.map(() => Math.floor(Math.random() * 30) + 15),

    // Outflows (negative values)
    'Cash Withdrawals': months.map(() => -(Math.floor(Math.random() * 10) + 3)),
    'Check Payments': months.map(() => -(Math.floor(Math.random() * 18) + 7)),
    'ACH Out': months.map(() => -(Math.floor(Math.random() * 22) + 12)),
    'Wire Out': months.map(() => -(Math.floor(Math.random() * 25) + 10))
  }

  const riskPercentile = months.map(() => Math.floor(Math.random() * 20) + 80) // 80-100th percentile

  return {
    labels: months,
    datasets: [
      // Inflow transactions
      {
        label: 'Cash Deposits',
        data: transactionTypes['Cash Deposits'],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: '#22C55E',
        borderWidth: 1,
        stack: 'transactions'
      },
      {
        label: 'Check Deposits',
        data: transactionTypes['Check Deposits'],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3B82F6',
        borderWidth: 1,
        stack: 'transactions'
      },
      {
        label: 'ACH In',
        data: transactionTypes['ACH In'],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: '#A855F7',
        borderWidth: 1,
        stack: 'transactions'
      },
      {
        label: 'Wire In',
        data: transactionTypes['Wire In'],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderColor: '#0EA5E9',
        borderWidth: 1,
        stack: 'transactions'
      },
      // Outflow transactions (negative values)
      {
        label: 'Cash Withdrawals',
        data: transactionTypes['Cash Withdrawals'],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: '#EF4444',
        borderWidth: 1,
        stack: 'transactions'
      },
      {
        label: 'Check Payments',
        data: transactionTypes['Check Payments'],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: '#F59E0B',
        borderWidth: 1,
        stack: 'transactions'
      },
      {
        label: 'ACH Out',
        data: transactionTypes['ACH Out'],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: '#EC4899',
        borderWidth: 1,
        stack: 'transactions'
      },
      {
        label: 'Wire Out',
        data: transactionTypes['Wire Out'],
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
        borderColor: '#9CA3AF',
        borderWidth: 1,
        stack: 'transactions'
      },
      // Risk percentile overlay line
      {
        label: 'Risk Percentile',
        data: riskPercentile,
        type: 'line',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: '#F59E0B',
        borderWidth: 3,
        yAxisID: 'y1',
        pointBackgroundColor: '#F59E0B',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4
      }
    ]
  }
})

const balanceRevenueData = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return {
    labels: months,
    datasets: [
      {
        label: 'Deposit Balance ($M)',
        data: months.map(() => Math.floor(Math.random() * 50) + 200),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Lending Balance ($M)',
        data: months.map(() => Math.floor(Math.random() * 30) + 80),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Revenue ($K)',
        data: months.map(() => Math.floor(Math.random() * 500) + 1000),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y1'
      }
    ]
  }
})

const riskFlagDistributionData = computed(() => {
  return {
    labels: riskFlagBreakdown.value.map(flag => flag.type),
    datasets: [{
      label: 'Risk Flag Count',
      data: riskFlagBreakdown.value.map(flag => flag.count),
      backgroundColor: riskFlagBreakdown.value.map(flag => {
        switch (flag.severity) {
          case 'Critical': return '#EF4444'
          case 'Review': return '#F59E0B'
          case 'Watch': return '#10B981'
          default: return '#6B7280'
        }
      }),
      borderWidth: 1,
      borderColor: '#ffffff'
    }]
  }
})
// Methods
const getRiskFlagColor = (flag) => {
  const colors = {
    'MSB': 'bg-red-100 text-red-800',
    'High-Cash': 'bg-yellow-100 text-yellow-800',
    'Crypto': 'bg-purple-100 text-purple-800',
    'Cross-Border': 'bg-blue-100 text-blue-800',
    'PEP': 'bg-red-100 text-red-800',
    'Sanctions': 'bg-red-100 text-red-800'
  }
  return colors[flag] || 'bg-gray-100 text-gray-800'
}

const drillDownToClient = (client) => {
  console.log('Drill down clicked! Client:', client.name, 'ID:', client.id)
  console.log('Route params:', {
    metroId: props.metroId,
    marketId: props.marketId,
    regionId: props.regionId,
    rmId: props.rmId,
    clientId: client.id
  })
  router.push({
    name: 'RMClient',
    params: {
      metroId: props.metroId,
      marketId: props.marketId,
      regionId: props.regionId,
      rmId: props.rmId,
      clientId: client.id
    }
  })
}

const filterActions = (filter) => {
  actionFilter.value = filter
}

const getActionsByPriority = (priority) => {
  return actionItems.value.filter(action => action.priority === priority)
}

const getActionsByType = (type) => {
  return actionItems.value.filter(action => action.type === type)
}

const getActionRowClass = (action) => {
  if (action.completed) return 'bg-gray-50 border-gray-200'
  if (action.priority === 'High') return 'bg-red-50 border-red-200'
  if (action.priority === 'Medium') return 'bg-yellow-50 border-yellow-200'
  return 'bg-white border-gray-200'
}

const getPriorityBadgeClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

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
  if (score >= 8) return 'text-red-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-green-600'
}

const getOpportunityScoreColor = (score) => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-red-600'
}

const updateAction = (action) => {
  console.log(`Action ${action.id} ${action.completed ? 'completed' : 'reopened'}`)
}

const generateTier = (portfolioValue) => {
  if (portfolioValue >= 100000000) return 'Tier 1'
  if (portfolioValue >= 50000000) return 'Tier 2'
  if (portfolioValue >= 20000000) return 'Tier 3'
  return 'Tier 4'
}

const generateRiskScore = () => {
  return (Math.random() * 8 + 2).toFixed(1)
}

const generateOpportunityScore = () => {
  return (Math.random() * 8 + 2).toFixed(1)
}

const generateNextAction = () => {
  const actions = ['Quarterly Review', 'Product Presentation', 'Risk Assessment', 'Follow-up Call', 'Credit Review', 'Compliance Check']
  return actions[Math.floor(Math.random() * actions.length)]
}

const generateNextActionDate = () => {
  const dates = ['Today', 'Tomorrow', 'This Week', 'Next Week', '2 weeks', '1 month']
  return dates[Math.floor(Math.random() * dates.length)]
}

const getRiskScoreBarColor = (score) => {
  if (score >= 8) return 'bg-red-500'
  if (score >= 6) return 'bg-yellow-500'
  return 'bg-green-500'
}

const getActionBadgeClass = (action) => {
  switch (action) {
    case 'Send for Review': return 'bg-red-100 text-red-800'
    case 'Escalate to Review': return 'bg-red-100 text-red-800'
    case 'Upsell Product': return 'bg-green-100 text-green-800'
    case 'Monitor': return 'bg-gray-100 text-gray-800'
    default: return 'bg-blue-100 text-blue-800'
  }
}

// Lifecycle
onMounted(() => {
  console.log('RelationshipManagerView mounted for RM:', props.rmId)
  console.log('RM data:', rm.value)
  console.log('RM clients:', rmClients.value)
})
</script>

<style scoped>
.metric-card {
  @apply bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow;
}

.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.risk-flag {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.opportunity-client-card {
  transition: all 0.2s ease-in-out;
}

.opportunity-client-card:hover {
  transform: translateY(-2px);
}
</style>