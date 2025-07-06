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

    <!-- Executive Performance Scorecard Header -->
    <div class="card mb-8">
      <div class="px-6 py-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">Portfolio Performance Dashboard</h2>
            <p class="text-sm text-gray-500 mt-1">Comprehensive portfolio management and performance tracking</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-td-green">87<span class="text-lg text-gray-500">/100</span></div>
            <div class="text-sm text-gray-600 font-medium">Performance Score</div>
            <div class="text-xs text-gray-500">Regional Rank: Top 15%</div>
          </div>
        </div>
      </div>

      <!-- Executive Summary Row -->
      <div class="px-6 py-4 bg-gray-50">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">$234M</div>
            <div class="text-sm text-gray-600">Portfolio Value</div>
            <div class="text-xs text-blue-500 font-medium">+8.2% YTD</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">23</div>
            <div class="text-sm text-gray-600">Active Relationships</div>
            <div class="text-xs text-green-500 font-medium">+2 new this quarter</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-emerald-600">$18.7M</div>
            <div class="text-sm text-gray-600">Annual Revenue</div>
            <div class="text-xs text-emerald-500 font-medium">+12.4% YTD</div>
          </div>
        </div>

        <!-- Target Achievement -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-center space-x-6 text-sm">
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">Growth Target:</span>
              <span class="font-semibold text-green-600">112%</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">Revenue Target:</span>
              <span class="font-semibold text-emerald-600">103%</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">Risk Management:</span>
              <span class="font-semibold text-blue-600">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced RM Performance Scorecard -->
    <div class="card mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Portfolio Performance Scorecard</h2>
            <p class="text-sm text-gray-500">Comprehensive portfolio and risk management overview</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Benchmark Toggle -->
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Benchmark:</label>
              <select v-model="benchmarkType"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-td-green">
                <option value="regional">Regional</option>
                <option value="national">National</option>
              </select>
            </div>
            <!-- Overall Performance Score -->
            <div class="text-right">
              <div class="text-2xl font-bold text-td-green">{{ overallScore }}/100</div>
              <div class="text-xs text-gray-500">
                {{ benchmarkType === 'regional' ? 'Regional Rank: ' + regionalRank : 'National Rank: ' + nationalRank }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal Metrics Bar -->
      <div class="bg-gray-50 p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          <!-- Total Accounts -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('accounts')">
            <div class="text-3xl font-bold text-blue-600">{{ metricsComparisons.accounts.current }}</div>
            <div class="text-sm text-gray-600 mt-1">Total Accounts</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('accounts')"
              @click.stop="cycleComparison('accounts')">
              {{ getComparisonText('accounts') }}
            </div>
          </div>

          <!-- Total Deposit Balance -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('deposits')">
            <div class="text-3xl font-bold text-green-600">{{ formatCurrency(metricsComparisons.deposits.current) }}
            </div>
            <div class="text-sm text-gray-600 mt-1">Total Deposit Balance</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('deposits')"
              @click.stop="cycleComparison('deposits')">
              {{ getComparisonText('deposits') }}
            </div>
          </div>

          <!-- Total Loans -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('loans')">
            <div class="text-3xl font-bold text-orange-600">{{ formatCurrency(metricsComparisons.loans.current) }}</div>
            <div class="text-sm text-gray-600 mt-1">Total Loans</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('loans')"
              @click.stop="cycleComparison('loans')">
              {{ getComparisonText('loans') }}
            </div>
          </div>

          <!-- Loan Utility % -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('utility')">
            <div class="text-3xl font-bold text-purple-600">{{ metricsComparisons.utility.current }}%</div>
            <div class="text-sm text-gray-600 mt-1">Loan Utility %</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('utility')"
              @click.stop="cycleComparison('utility')">
              {{ getComparisonText('utility') }}
            </div>
          </div>

          <!-- Revenue -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('revenue')">
            <div class="text-3xl font-bold text-blue-600">{{ formatCurrency(metricsComparisons.revenue.current) }}</div>
            <div class="text-sm text-gray-600 mt-1">Revenue</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('revenue')"
              @click.stop="cycleComparison('revenue')">
              {{ getComparisonText('revenue') }}
            </div>
          </div>

          <!-- Opportunities -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('opportunities')">
            <div class="text-3xl font-bold text-blue-600">{{ metricsComparisons.opportunities.current }}</div>
            <div class="text-sm text-gray-600 mt-1">Opportunities</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('opportunities')"
              @click.stop="cycleComparison('opportunities')">
              {{ getComparisonText('opportunities') }}
            </div>
          </div>

          <!-- Risk Flags -->
          <div class="text-center cursor-pointer hover:bg-white rounded-lg p-4 transition-colors"
            @click="expandKPI('risk')">
            <div class="text-3xl font-bold text-red-600">{{ metricsComparisons.risk.current }}</div>
            <div class="text-sm text-gray-600 mt-1">Risk Flags</div>
            <div class="text-xs font-medium cursor-pointer hover:underline" :class="getComparisonClass('risk')"
              @click.stop="cycleComparison('risk')">
              {{ getComparisonText('risk') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Action Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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

    <!-- Top Contributors Analysis (Phase 2) - Compact Design -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <!-- Top Revenue Contributors -->
      <div class="card">
        <div class="px-4 py-2 border-b border-gray-200 bg-gray-50">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-semibold text-gray-900">💰 Top Revenue Contributors</h3>
            <span class="text-xs text-gray-600 font-medium">115.1% of portfolio</span>
          </div>
        </div>
        <div class="p-3">
          <div class="space-y-2">
            <div v-for="(relationship, index) in topContributors.byRevenue" :key="relationship.id"
              class="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              @click="drillDownToRelationship(relationship)">
              <div class="flex items-center space-x-3">
                <span
                  class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">#{{
                    index + 1 }}</span>
                <div>
                  <div class="flex items-center space-x-2">
                    <h4 class="text-sm font-medium text-gray-900">{{ relationship.name }}</h4>
                    <span class="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{{ relationship.industry
                    }}</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ relationship.portfolioShare }}% • Risk {{ relationship.riskScore }}/10
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-bold text-green-600">{{ formatCurrency(relationship.revenue) }}</div>
                <div class="text-xs text-green-500">+{{ relationship.revenueGrowth }}% YTD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Growth Contributors -->
      <div class="card">
        <div class="px-4 py-2 border-b border-gray-200 bg-gray-50">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-semibold text-gray-900">📈 Top Growth Contributors</h3>
            <span class="text-xs text-gray-600 font-medium">{{ formatCurrency(2305000) }} growth</span>
          </div>
        </div>
        <div class="p-3">
          <div class="space-y-2">
            <div v-for="(relationship, index) in topContributors.byGrowth" :key="relationship.id"
              class="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              @click="drillDownToRelationship(relationship)">
              <div class="flex items-center space-x-3">
                <span
                  class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-medium text-emerald-600">#{{
                    index + 1 }}</span>
                <div>
                  <div class="flex items-center space-x-2">
                    <h4 class="text-sm font-medium text-gray-900">{{ relationship.name }}</h4>
                    <span class="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{{ relationship.industry
                    }}</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ formatCurrency(relationship.revenue) }} • Risk {{ relationship.riskScore }}/10
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-bold text-emerald-600">+{{ relationship.revenueGrowth }}%</div>
                <div class="text-xs text-emerald-500">{{ formatCurrency(relationship.growthValue) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Attention Required Dashboard (Phase 2B) - Compact Design -->
    <div class="card mb-6">
      <div class="px-4 py-2 border-b border-gray-200 bg-red-50">
        <div class="flex justify-between items-center">
          <h3 class="text-sm font-semibold text-gray-900">🚨 Attention Required</h3>
          <div class="flex space-x-1">
            <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded font-medium">3 Critical</span>
            <span class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded font-medium">2 Review</span>
          </div>
        </div>
      </div>
      <div class="p-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Underperforming Relationships -->
          <div class="bg-red-50 border border-red-200 rounded p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6 6"></path>
                  </svg>
                </div>
                <h4 class="text-xs font-semibold text-red-900">Underperforming</h4>
              </div>
              <span class="text-xs bg-red-200 text-red-800 px-1.5 py-0.5 rounded font-medium">2</span>
            </div>
            <div class="space-y-2">
              <div class="bg-white rounded p-2 border border-red-100">
                <div class="flex justify-between items-start mb-1">
                  <div>
                    <h5 class="text-xs font-medium text-gray-900">Healthcare Solutions</h5>
                    <p class="text-xs text-gray-500">Healthcare</p>
                  </div>
                  <span class="text-xs text-red-600 font-medium">-12%</span>
                </div>
                <div class="text-xs text-gray-600">{{ formatCurrency(2900000) }} vs {{ formatCurrency(3300000) }}</div>
              </div>
              <div class="bg-white rounded p-2 border border-red-100">
                <div class="flex justify-between items-start mb-1">
                  <div>
                    <h5 class="text-xs font-medium text-gray-900">Regional Logistics</h5>
                    <p class="text-xs text-gray-500">Transportation</p>
                  </div>
                  <span class="text-xs text-red-600 font-medium">-8%</span>
                </div>
                <div class="text-xs text-gray-600">{{ formatCurrency(1840000) }} vs {{ formatCurrency(2000000) }}</div>
              </div>
            </div>
          </div>

          <!-- Risk Concentration Alerts -->
          <div class="bg-orange-50 border border-orange-200 rounded p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z">
                    </path>
                  </svg>
                </div>
                <h4 class="text-xs font-semibold text-orange-900">Risk Concentration</h4>
              </div>
              <span class="text-xs bg-orange-200 text-orange-800 px-1.5 py-0.5 rounded font-medium">1</span>
            </div>
            <div class="bg-white rounded p-2 border border-orange-100">
              <div class="flex justify-between items-start mb-1">
                <div>
                  <h5 class="text-xs font-medium text-gray-900">Energy Dynamics LLC</h5>
                  <p class="text-xs text-gray-500">Energy Sector</p>
                </div>
                <span class="text-xs text-orange-600 font-medium">4.1/10</span>
              </div>
              <div class="text-xs text-gray-600 mb-1">12.0% portfolio share</div>
              <div class="flex space-x-1">
                <span class="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">High Cash</span>
                <span class="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">Cross-Border</span>
              </div>
            </div>
          </div>

          <!-- Compliance Priorities -->
          <div class="bg-blue-50 border border-blue-200 rounded p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 class="text-xs font-semibold text-blue-900">Compliance</h4>
              </div>
              <span class="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded font-medium">3</span>
            </div>
            <div class="space-y-2">
              <div class="bg-white rounded p-2 border border-blue-100">
                <div class="flex justify-between items-start mb-1">
                  <div>
                    <h5 class="text-xs font-medium text-gray-900">TechCorp Industries</h5>
                    <p class="text-xs text-gray-500">Annual Review</p>
                  </div>
                  <span class="text-xs text-blue-600 font-medium">Dec 15</span>
                </div>
                <div class="text-xs text-gray-600">Last: Jan 2024</div>
              </div>
              <div class="bg-white rounded p-2 border border-blue-100">
                <div class="flex justify-between items-start mb-1">
                  <div>
                    <h5 class="text-xs font-medium text-gray-900">Global Manufacturing</h5>
                    <p class="text-xs text-gray-500">Credit Review</p>
                  </div>
                  <span class="text-xs text-blue-600 font-medium">Dec 18</span>
                </div>
                <div class="text-xs text-gray-600">{{ formatCurrency(45000000) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Action List -->
    <div class="card mb-6">
      <div class="px-4 py-3 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Today's Action List</h3>
            <p class="text-xs text-gray-500">Priority tasks and client interactions for today</p>
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
      <div class="p-4">
        <div class="space-y-3">
          <div v-for="action in filteredActions" :key="action.id"
            class="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
            :class="getActionRowClass(action)">
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <!-- Risk Alert Timeline -->
      <div class="card">
        <div class="px-4 py-2 border-b border-gray-200 bg-gray-50">
          <h3 class="text-sm font-semibold text-gray-900">Risk Alert Timeline</h3>
          <p class="text-xs text-gray-500">30-day alert history</p>
        </div>
        <div class="p-3">
          <div class="h-40">
            <LineChart v-if="riskTimelineData" :data="riskTimelineData" />
            <div v-else class="h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span class="text-gray-500">Loading chart...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Client Review Status -->
      <div class="card">
        <div class="px-4 py-2 border-b border-gray-200 bg-gray-50">
          <h3 class="text-sm font-semibold text-gray-900">Client Review Status</h3>
          <p class="text-xs text-gray-500">Review completion status</p>
        </div>
        <div class="p-3">
          <div class="h-40">
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

    <!-- RM Coaching Analytics (RM Manager View) -->
    <div class="card mb-8">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">👨‍🏫 RM Coaching Analytics</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Performance insights and development opportunities for {{
              rm?.name }}</p>
          </div>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Performance Score: 87/100
          </span>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- Client Touch Frequency -->
          <div class="coaching-metric">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-600">Client Touch Rate</span>
              <span class="text-lg font-bold text-green-600">2.3x/mo</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Target: 2.0x/mo | Top Performer: 3.1x</p>
          </div>

          <!-- Cross-Selling Success -->
          <div class="coaching-metric">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-600">Cross-Sell Rate</span>
              <span class="text-lg font-bold text-blue-600">34%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 68%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Target: 50% | Peer Avg: 42%</p>
          </div>

          <!-- Revenue per Client -->
          <div class="coaching-metric">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-600">Revenue/Client</span>
              <span class="text-lg font-bold text-purple-600">$180K</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-purple-500 h-2 rounded-full" style="width: 72%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Peer Avg: $165K | Top: $250K</p>
          </div>

          <!-- Risk Management -->
          <div class="coaching-metric">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-600">Risk Flag Resolution</span>
              <span class="text-lg font-bold text-orange-600">3.2 days</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-orange-500 h-2 rounded-full" style="width: 80%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Target: <3 days | Avg: 4.1 days</p>
          </div>
        </div>

        <!-- Development Focus Areas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Strengths -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="text-sm font-medium text-green-800 mb-3">🎯 Strengths</h4>
            <div class="space-y-2">
              <div class="text-xs text-green-700">• Excellent client retention (98%)</div>
              <div class="text-xs text-green-700">• Strong deposit growth (+15% YoY)</div>
              <div class="text-xs text-green-700">• Timely risk flag resolution</div>
              <div class="text-xs text-green-700">• High client satisfaction (4.8/5)</div>
            </div>
          </div>

          <!-- Areas for Development -->
          <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 class="text-sm font-medium text-orange-800 mb-3">📈 Development Areas</h4>
            <div class="space-y-2">
              <div class="text-xs text-orange-700">• Cross-selling opportunities (-16% vs target)</div>
              <div class="text-xs text-orange-700">• Lending product knowledge gap</div>
              <div class="text-xs text-orange-700">• New client acquisition below goal</div>
              <div class="text-xs text-orange-700">• Digital platform utilization low</div>
            </div>
          </div>

          <!-- Action Plan -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-sm font-medium text-blue-800 mb-3">🎓 Recommended Training</h4>
            <div class="space-y-2">
              <div class="text-xs text-blue-700">• Treasury Mgmt Solutions cert (Q1)</div>
              <div class="text-xs text-blue-700">• Lending conversations workshop</div>
              <div class="text-xs text-blue-700">• Digital banking platform training</div>
              <div class="text-xs text-blue-700">• Prospecting techniques course</div>
            </div>
          </div>
        </div>

        <!-- Goal Tracking -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-700 mb-4">2024 Goal Progress</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="goal-tracker">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">New Revenue</span>
                <span class="font-medium">$2.8M / $3.2M</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 87.5%"></div>
              </div>
            </div>
            <div class="goal-tracker">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">New Clients</span>
                <span class="font-medium">18 / 25</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 72%"></div>
              </div>
            </div>
            <div class="goal-tracker">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">Cross-Sell Products</span>
                <span class="font-medium">42 / 60</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full" style="width: 70%"></div>
              </div>
            </div>
            <div class="goal-tracker">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">Training Hours</span>
                <span class="font-medium">28 / 40</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-600 h-2 rounded-full" style="width: 70%"></div>
              </div>
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
              <p class="text-2xl font-bold text-blue-900">{{ formatCurrency(portfolioSummary.totalDeposits) }}</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="text-green-600 font-medium">Lending Balance</p>
              <p class="text-2xl font-bold text-green-900">{{ formatCurrency(portfolioSummary.totalLoans) }}</p>
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

    <!-- 🧾 RM Relationship Portfolio Table -->
    <div class="card">
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">🧾 RM Relationship Portfolio</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Click on any relationship to view client entities and
              detailed analytics</p>
          </div>
          <div class="flex space-x-2">
            <input type="text" v-model="searchQuery" placeholder="Search relationships..."
              class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-td-green focus:border-td-green">
            <select v-model="clientSort" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option value="name">Sort by Name</option>
              <option value="risk">Sort by Risk</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="client_count">Sort by Client Count</option>
            </select>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship
                Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Entities
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Portfolio
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Revenue
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Review
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="relationship in rmRelationships" :key="relationship.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors" @click="drillDownToRelationship(relationship)">

              <!-- Relationship Name -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-td-green flex items-center justify-center">
                      <span class="text-sm font-medium text-white">{{ relationship.name.split(' ')[0][0] }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ relationship.name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ relationship.id }}</div>
                  </div>
                </div>
              </td>

              <!-- Client Entities -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ relationship.clientCount }} entities</div>
                <div class="text-sm text-gray-500">{{ relationship.tier || 'Platinum' }} Tier</div>
              </td>

              <!-- Industry -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ relationship.industry }}</div>
              </td>

              <!-- Total Portfolio -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(relationship.totalValue) }}
              </td>

              <!-- Annual Revenue -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(relationship.revenue) }}
              </td>

              <!-- Risk Level -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getRiskBadgeClass(relationship.riskLevel)">
                  {{ relationship.riskLevel }}
                </span>
              </td>

              <!-- Last Review -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ relationship.lastReview || '3 weeks ago' }}
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
import { getRMById, getRegionById, getMarketById, getMetroById, clients, relationships, formatCurrency, getRiskColor } from '../data/mockData.js'
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

// Benchmarking and performance scorecard data
const benchmarkType = ref('regional')
const overallScore = ref(87)
const regionalRank = ref('Top 15%')
const nationalRank = ref('Top 28%')

// Enhanced KPI metrics with benchmarking
const portfolioMetricsEnhanced = reactive({
  totalValue: 234000000,
  ytdGrowth: 8.2,
  vsTarget: 112,
  regionalPercentile: 85,
  nationalPercentile: 72
})

const revenueMetrics = reactive({
  annual: 18700000,
  ytdGrowth: 12.4,
  vsTarget: 103,
  regionalPercentile: 78,
  nationalPercentile: 65
})

const relationshipMetrics = reactive({
  active: 23,
  newThisYear: 2,
  retention: 96,
  regionalPercentile: 82,
  nationalPercentile: 69
})

const pipelineMetrics = reactive({
  opportunityCount: 47,
  totalValue: 15200000,
  conversionRate: 34,
  regionalPercentile: 91,
  nationalPercentile: 79
})

const riskMetrics = reactive({
  score: 2.8,
  status: 'Good',
  problemAccounts: 1,
  regionalPercentile: 88,
  nationalPercentile: 75
})

const complianceMetrics = reactive({
  currentRate: 94,
  status: 'Excellent',
  reviewsPending: 3,
  regionalPercentile: 92,
  nationalPercentile: 84
})

const growthMetrics = reactive({
  ytdRate: 11.8,
  vsRegional: 2.3,
  vsNational: 4.1,
  regionalPercentile: 89,
  nationalPercentile: 81
})

const engagementMetrics = reactive({
  touchesPerMonth: 8.4,
  vsTarget: 115,
  regionalPercentile: 87,
  nationalPercentile: 73
})

// Cycling comparison view states (0: percentile, 1: target, 2: regional, 3: national)
const comparisonViews = reactive({
  accounts: 0,
  deposits: 0,
  loans: 0,
  utility: 0,
  revenue: 0,
  opportunities: 0,
  risk: 0
})

// Enhanced metrics with target and average comparisons
const metricsComparisons = reactive({
  accounts: {
    current: 23,
    target: 25,
    regionalAvg: 19,
    nationalAvg: 17,
    percentile: 82
  },
  deposits: {
    current: 245000000,
    target: 220000000,
    regionalAvg: 189000000,
    nationalAvg: 156000000,
    percentile: 85
  },
  loans: {
    current: 89000000,
    target: 85000000,
    regionalAvg: 67000000,
    nationalAvg: 52000000,
    percentile: 85
  },
  utility: {
    current: 36.3, // calculated: loans/deposits * 100
    target: 38.6,
    regionalAvg: 35.4,
    nationalAvg: 33.3,
    percentile: 82
  },
  revenue: {
    current: 18700000,
    target: 18000000,
    regionalAvg: 14200000,
    nationalAvg: 12800000,
    percentile: 78
  },
  opportunities: {
    current: 47,
    currentValue: 15200000,
    target: 40,
    targetValue: 12000000,
    regionalAvg: 32,
    regionalAvgValue: 9800000,
    nationalAvg: 28,
    nationalAvgValue: 8500000,
    percentile: 91
  },
  risk: {
    current: 3,
    target: 2,
    regionalAvg: 4,
    nationalAvg: 5,
    percentile: 49
  }
})

// Top Contributors Data for Phase 2
const topContributors = reactive({
  byRevenue: [
    {
      id: 'rel-001',
      name: 'TechCorp Industries',
      industry: 'Technology',
      revenue: 4200000,
      revenueGrowth: 18.5,
      portfolioValue: 89000000,
      portfolioShare: 38.1,
      riskScore: 2.1,
      lastContact: '2 days ago',
      nextAction: 'Quarterly Review',
      actionDate: 'Dec 15'
    },
    {
      id: 'rel-002',
      name: 'Global Manufacturing Corp',
      industry: 'Manufacturing',
      revenue: 3800000,
      revenueGrowth: 12.3,
      portfolioValue: 67000000,
      portfolioShare: 28.7,
      riskScore: 3.2,
      lastContact: '1 week ago',
      nextAction: 'Credit Review',
      actionDate: 'Dec 18'
    },
    {
      id: 'rel-003',
      name: 'Financial Services Group',
      industry: 'Financial Services',
      revenue: 3200000,
      revenueGrowth: 24.1,
      portfolioValue: 52000000,
      portfolioShare: 22.3,
      riskScore: 1.8,
      lastContact: '3 days ago',
      nextAction: 'Product Presentation',
      actionDate: 'Dec 12'
    },
    {
      id: 'rel-004',
      name: 'Healthcare Solutions Inc',
      industry: 'Healthcare',
      revenue: 2900000,
      revenueGrowth: 8.7,
      portfolioValue: 34000000,
      portfolioShare: 14.6,
      riskScore: 2.9,
      lastContact: '5 days ago',
      nextAction: 'Treasury Consultation',
      actionDate: 'Dec 20'
    },
    {
      id: 'rel-005',
      name: 'Energy Dynamics LLC',
      industry: 'Energy',
      revenue: 2400000,
      revenueGrowth: 15.2,
      portfolioValue: 28000000,
      portfolioShare: 12.0,
      riskScore: 4.1,
      lastContact: '1 week ago',
      nextAction: 'Risk Assessment',
      actionDate: 'Dec 14'
    }
  ],
  byGrowth: [
    {
      id: 'rel-003',
      name: 'Financial Services Group',
      industry: 'Financial Services',
      revenue: 3200000,
      revenueGrowth: 24.1,
      portfolioValue: 52000000,
      growthValue: 620000,
      riskScore: 1.8,
      lastContact: '3 days ago'
    },
    {
      id: 'rel-001',
      name: 'TechCorp Industries',
      industry: 'Technology',
      revenue: 4200000,
      revenueGrowth: 18.5,
      portfolioValue: 89000000,
      growthValue: 780000,
      riskScore: 2.1,
      lastContact: '2 days ago'
    },
    {
      id: 'rel-005',
      name: 'Energy Dynamics LLC',
      industry: 'Energy',
      revenue: 2400000,
      revenueGrowth: 15.2,
      portfolioValue: 28000000,
      growthValue: 365000,
      riskScore: 4.1,
      lastContact: '1 week ago'
    },
    {
      id: 'rel-002',
      name: 'Global Manufacturing Corp',
      industry: 'Manufacturing',
      revenue: 3800000,
      revenueGrowth: 12.3,
      portfolioValue: 67000000,
      growthValue: 468000,
      riskScore: 3.2,
      lastContact: '1 week ago'
    },
    {
      id: 'rel-004',
      name: 'Healthcare Solutions Inc',
      industry: 'Healthcare',
      revenue: 2900000,
      revenueGrowth: 8.7,
      portfolioValue: 34000000,
      growthValue: 252000,
      riskScore: 2.9,
      lastContact: '5 days ago'
    }
  ]
})

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

// Portfolio Summary (Legacy)
const portfolioSummary = reactive({
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

const rmRelationships = computed(() => {
  // Get relationships for this RM
  if (!props.rmId) return []
  const relationshipsForRM = relationships[props.rmId] || []

  // Apply search filter
  let filtered = relationshipsForRM
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(rel =>
      rel.name.toLowerCase().includes(query) ||
      rel.industry.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    switch (clientSort.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'risk':
        const riskOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
        return (riskOrder[b.riskLevel] || 0) - (riskOrder[a.riskLevel] || 0)
      case 'revenue':
        return b.revenue - a.revenue
      case 'client_count':
        return b.clientCount - a.clientCount
      default:
        return 0
    }
  })
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

const drillDownToRelationship = (relationship) => {
  console.log('Drill down clicked! Relationship:', relationship.name, 'ID:', relationship.id)
  router.push({
    name: 'Relationship',
    params: {
      metroId: props.metroId,
      marketId: props.marketId,
      regionId: props.regionId,
      rmId: props.rmId,
      relationshipId: relationship.id
    }
  })
}

// Keep for backward compatibility with existing table structure
const drillDownToClient = (client) => {
  // For now, redirect to a default relationship if client doesn't have relationshipId
  const defaultRelationshipId = `rel_${client.id}_default`
  router.push({
    name: 'DirectClient',
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

const getRiskBadgeClass = (riskLevel) => {
  switch (riskLevel?.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Lifecycle
onMounted(() => {
  console.log('RelationshipManagerView mounted for RM:', props.rmId)
  console.log('RM data:', rm.value)
})

// Cycling comparison functionality
const cycleComparison = (metricKey) => {
  comparisonViews[metricKey] = (comparisonViews[metricKey] + 1) % 4
}

const getComparisonText = (metricKey) => {
  const metric = metricsComparisons[metricKey]
  const view = comparisonViews[metricKey]

  switch (view) {
    case 0: // Percentile
      return `${metric.percentile}th percentile`
    case 1: // vs Target
      if (metricKey === 'opportunities') {
        const diff = metric.current - metric.target
        const valueDiff = metric.currentValue - metric.targetValue
        return `vs Target: ${diff > 0 ? '+' : ''}${diff} (${formatCurrency(valueDiff)})`
      } else if (metricKey === 'utility') {
        const diff = (metric.current - metric.target).toFixed(1)
        return `vs Target: ${diff > 0 ? '+' : ''}${diff}%`
      } else if (['deposits', 'loans', 'revenue'].includes(metricKey)) {
        const diff = metric.current - metric.target
        const pct = ((diff / metric.target) * 100).toFixed(1)
        return `vs Target: ${pct > 0 ? '+' : ''}${pct}%`
      } else {
        const diff = metric.current - metric.target
        return `vs Target: ${diff > 0 ? '+' : ''}${diff}`
      }
    case 2: // vs Regional
      if (metricKey === 'opportunities') {
        const diff = metric.current - metric.regionalAvg
        const valueDiff = metric.currentValue - metric.regionalAvgValue
        return `vs Regional: ${diff > 0 ? '+' : ''}${diff} (${formatCurrency(valueDiff)})`
      } else if (metricKey === 'utility') {
        const diff = (metric.current - metric.regionalAvg).toFixed(1)
        return `vs Regional: ${diff > 0 ? '+' : ''}${diff}%`
      } else if (['deposits', 'loans', 'revenue'].includes(metricKey)) {
        const diff = metric.current - metric.regionalAvg
        const pct = ((diff / metric.regionalAvg) * 100).toFixed(1)
        return `vs Regional: ${pct > 0 ? '+' : ''}${pct}%`
      } else {
        const diff = metric.current - metric.regionalAvg
        return `vs Regional: ${diff > 0 ? '+' : ''}${diff}`
      }
    case 3: // vs National
      if (metricKey === 'opportunities') {
        const diff = metric.current - metric.nationalAvg
        const valueDiff = metric.currentValue - metric.nationalAvgValue
        return `vs National: ${diff > 0 ? '+' : ''}${diff} (${formatCurrency(valueDiff)})`
      } else if (metricKey === 'utility') {
        const diff = (metric.current - metric.nationalAvg).toFixed(1)
        return `vs National: ${diff > 0 ? '+' : ''}${diff}%`
      } else if (['deposits', 'loans', 'revenue'].includes(metricKey)) {
        const diff = metric.current - metric.nationalAvg
        const pct = ((diff / metric.nationalAvg) * 100).toFixed(1)
        return `vs National: ${pct > 0 ? '+' : ''}${pct}%`
      } else {
        const diff = metric.current - metric.nationalAvg
        return `vs National: ${diff > 0 ? '+' : ''}${diff}`
      }
    default:
      return `${metric.percentile}th percentile`
  }
}

const getComparisonClass = (metricKey) => {
  const metric = metricsComparisons[metricKey]
  const view = comparisonViews[metricKey]

  if (view === 0) return 'text-blue-500' // Percentile - neutral blue

  let isPositive = false
  switch (view) {
    case 1: // vs Target
      isPositive = metric.current > metric.target
      break
    case 2: // vs Regional
      isPositive = metric.current > metric.regionalAvg
      break
    case 3: // vs National
      isPositive = metric.current > metric.nationalAvg
      break
  }

  // For risk, lower is better
  if (metricKey === 'risk') {
    isPositive = !isPositive
  }

  return isPositive ? 'text-green-500' : 'text-red-500'
}

const expandKPI = (kpiType) => {
  console.log('Expanding KPI:', kpiType)
  // TODO: Add KPI expansion logic in next chunk
}

// Computed properties for template calculations
const totalGrowthValue = computed(() => {
  return topContributors.byGrowth.reduce((sum, rel) => sum + rel.growthValue, 0)
})

const totalPortfolioShare = computed(() => {
  return topContributors.byRevenue.reduce((sum, rel) => sum + rel.portfolioShare, 0)
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

.kpi-card {
  @apply bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-all duration-200;
}
</style>