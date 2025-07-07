<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="$router.go(-1)" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div>
              <!-- Breadcrumbs with specific names -->
              <nav class="text-sm text-gray-500 mb-1" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-2">
                  <li><span>{{ metroName }}</span></li>
                  <li><span class="mx-2">›</span></li>
                  <li><span>{{ marketName }}</span></li>
                  <li><span class="mx-2">›</span></li>
                  <li><span>{{ regionName }}</span></li>
                </ol>
              </nav>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-2">
            <button @click="exportData"
              class="px-4 py-2 bg-td-green text-white rounded-lg hover:bg-green-600 transition-colors">
              Export CSV / PPTX
            </button>
          </div>
        </div>

        <!-- Show Net-New and Date Range inline -->
        <div class="mt-4 flex items-center space-x-8">
          <label class="flex items-center space-x-2 text-sm text-gray-700">
            <input type="checkbox" v-model="showNetNew" class="rounded border-gray-300">
            <span>Show Net-New</span>
          </label>
          <div class="flex items-center">
            <label class="text-sm text-gray-700 mr-3">Date Range:</label>
            <select v-model="selectedDateRange" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option value="ytd">YTD</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
            </select>
          </div>
        </div>

        <!-- Regional VP Summary Banner -->
        <div class="mt-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200">
          <div>
            <div class="text-lg font-semibold text-gray-900">{{ regionData.vpName }}</div>
            <div class="text-sm text-gray-600">Region: <span class="font-medium">{{ regionName }}</span> | Market: <span
                class="font-medium">{{ marketName }}</span> | Metro: <span class="font-medium">{{ metroName }}</span>
            </div>
            <div class="text-xs text-gray-500 mt-1">Last Review: <span class="font-medium">{{ lastReviewDate }}</span>
            </div>
          </div>
          <button @click="showAlertsModal = true"
            class="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
            <span class="text-lg">⚠️</span>
            <span>Alerts</span>
            <span v-if="urgentAlertCount > 0"
              class="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{{ urgentAlertCount
              }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Executive KPI Ribbon -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-8 py-6">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <!-- # Relationship Managers -->
          <div class="text-center">
            <div class="text-xl font-bold text-blue-600">{{ totalRMs }}</div>
            <div class="text-xs text-gray-600"># Relationship Managers</div>
            <div v-if="showNetNew" class="text-xs text-green-500 font-medium mt-1">+{{ rmsDelta }} since {{
              netNewPeriod }}</div>
          </div>

          <!-- Total Relationships -->
          <div class="text-center">
            <div class="text-xl font-bold text-purple-600">{{ totalRelationships }}</div>
            <div class="text-xs text-gray-600">Total Relationships</div>
            <div v-if="showNetNew" class="text-xs text-green-500 font-medium mt-1">+{{ relationshipsDelta }} since {{
              netNewPeriod }}</div>
          </div>

          <!-- Regional Portfolio -->
          <div class="text-center">
            <div class="text-xl font-bold text-green-600">{{ formatCurrency(totalDeposits) }}</div>
            <div class="text-xs text-gray-600">Total Deposits</div>
            <div class="text-xs text-green-500 font-medium">{{ depositsGrowth }}% YoY</div>
            <div v-if="showNetNew" class="text-xs text-green-500 font-medium mt-1">+{{ formatCurrency(depositsDelta) }}
              since {{ netNewPeriod }}</div>
          </div>

          <!-- Loan Commitments -->
          <div class="text-center">
            <div class="text-xl font-bold text-orange-600">{{ formatCurrency(totalLoanCommitments) }}</div>
            <div class="text-xs text-gray-600">Loan Commitments</div>
            <div class="text-xs text-orange-500 font-medium">{{ loanUtilization }}% utilized</div>
            <div v-if="showNetNew" class="text-xs text-green-500 font-medium mt-1">+{{ formatCurrency(loanDelta) }}
              since {{ netNewPeriod }}</div>
          </div>

          <!-- Revenue YTD -->
          <div class="text-center">
            <div class="text-xl font-bold text-cyan-600">{{ formatCurrency(totalRevenue) }}</div>
            <div class="text-xs text-gray-600">Revenue YTD</div>
            <div class="text-xs font-medium mt-1" :class="revenueYoY >= 0 ? 'text-green-500' : 'text-red-500'">
              {{ revenueYoY >= 0 ? '+' : '' }}{{ revenueYoY }}% YoY
            </div>
          </div>

          <!-- Credit Relationships -->
          <div class="text-center">
            <div class="text-xl font-bold text-indigo-600">{{ newCreditRelationships }}</div>
            <div class="text-xs text-gray-600">New Credit Relationships</div>
            <div class="text-xs text-indigo-500 font-medium">vs target {{ creditTarget }}</div>
          </div>

          <!-- New Commitments -->
          <div class="text-center">
            <div class="text-xl font-bold text-pink-600">{{ formatCurrency(newCommitments) }}</div>
            <div class="text-xs text-gray-600">New Commitments</div>
            <div class="text-xs text-pink-500 font-medium">vs target {{ formatCurrency(commitmentsTarget) }}</div>
          </div>

          <!-- Risk Reviews Pending -->
          <div class="text-center">
            <div class="text-xl font-bold text-red-600 flex items-center justify-center">
              {{ riskReviewsPending }}
              <span v-if="riskReviewsPending > 20" class="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-1"></span>
            </div>
            <div class="text-xs text-gray-600">Risk Reviews Pending</div>
            <div class="text-xs text-red-500 font-medium" v-if="riskReviewsPending > 20">Above threshold</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-1 py-5">
      <!-- Tab Navigation -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6" aria-label="Tabs">
            <button @click="activeTab = 'overview'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'overview' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Regional Overview
            </button>
            <button @click="activeTab = 'rms'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'rms' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Relationship Managers
            </button>
            <button @click="activeTab = 'opportunities'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'opportunities' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Opportunities & Growth
            </button>
            <button @click="activeTab = 'risk'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'risk' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Risk Management
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Regional Overview Tab -->
          <div v-if="activeTab === 'overview'">
            <div class="space-y-6">
              <!-- Regional Performance Chart -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-6">
                  <div class="flex items-center mb-4">
                    <span class="text-2xl">📊</span>
                    <h3 class="text-lg font-bold text-gray-900 ml-2">Regional Portfolio Balance Trends</h3>
                  </div>
                  <div class="h-60 px-10">
                    <BarChart v-if="regionalPortfolioChartData" :data="regionalPortfolioChartData"
                      :options="regionalPortfolioChartOptions" />
                  </div>
                </div>
              </div>

              <!-- Revenue by RM -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-6">
                  <div class="flex items-center mb-4">
                    <span class="text-2xl">💰</span>
                    <h3 class="text-lg font-bold text-gray-900 ml-2">Revenue by Relationship Manager</h3>
                  </div>
                  <div class="h-60 px-10">
                    <BarChart v-if="revenueByRMChartData" :data="revenueByRMChartData"
                      :options="revenueByRMChartOptions" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Relationship Managers Tab -->
          <div v-if="activeTab === 'rms'">
            <div class="space-y-6">
              <!-- Relationship Managers Table -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">👥 Relationship Manager Portfolio</h3>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('name')">
                          Relationship Manager
                          <span v-if="sortField === 'name'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('relationships')">
                          # Relationships
                          <span v-if="sortField === 'relationships'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('portfolioValue')">
                          Portfolio Value
                          <span v-if="sortField === 'portfolioValue'" class="ml-1">{{ sortDirection === 'asc' ? '↑' :
                            '↓'
                            }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('revenue')">
                          YTD Revenue
                          <span v-if="sortField === 'revenue'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                            }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('utilization')">
                          Loan Utilization
                          <span v-if="sortField === 'utilization'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                            }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('riskScore')">
                          Risk Score
                          <span v-if="sortField === 'riskScore'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                            }}</span>
                        </th>
                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="rm in sortedRMs" :key="rm.id"
                        class="hover:bg-green-50 cursor-pointer transition-colors" @click="drillDownToRM(rm)">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-8 w-8">
                              <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                <span class="text-xs font-medium text-white">{{rm.name.split(' ').map(n =>
                                  n[0]).join('')}}</span>
                              </div>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ rm.name }}</div>
                              <div class="text-xs text-gray-500">ID: {{ rm.id }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {{ rm.relationships }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {{ formatCurrency(rm.portfolioValue) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm"
                          :class="rm.revenueDelta > 0 ? 'text-green-600' : 'text-red-600'">
                          {{ formatCurrency(rm.revenue) }}
                          <div class="text-xs">{{ rm.revenueDelta > 0 ? '+' : '' }}{{ rm.revenueDelta }}% YoY</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <span class="font-medium" :class="getUtilizationColor(rm.utilization)">
                            {{ rm.utilization }}%
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                          <span class="px-2 py-1 text-xs font-medium rounded-full"
                            :class="getRiskScoreColor(rm.riskScore)">
                            {{ rm.riskScore }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                          <span class="text-td-green font-medium">View Portfolio ›</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Opportunities & Growth Tab -->
          <div v-if="activeTab === 'opportunities'">
            <div class="space-y-6">
              <!-- Growth Metrics -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(newDepositVolume) }}</div>
                  <div class="text-xs text-gray-600">New Deposit Volume</div>
                  <div class="text-xs text-blue-500 font-medium">vs target {{ formatCurrency(depositTarget) }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ newCreditRelationships }}</div>
                  <div class="text-xs text-gray-600">New Credit Relationships</div>
                  <div class="text-xs text-green-500 font-medium">vs target {{ creditTarget }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(incrementalTMSRevenue) }}</div>
                  <div class="text-xs text-gray-600">Incremental TMS Revenue</div>
                  <div class="text-xs text-orange-500 font-medium">vs target {{ formatCurrency(tmsTarget) }}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600">{{ totalReferrals }}</div>
                  <div class="text-xs text-gray-600">Total Referrals</div>
                  <div class="text-xs text-purple-500 font-medium">{{ retailReferrals }} Retail | {{ wealthReferrals }}
                    Wealth</div>
                </div>
              </div>

              <!-- Opportunities by RM Table -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Growth Opportunities by RM</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship Manager</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Opportunities</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Potential Value</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Conversion Rate</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="rm in sortedRMs" :key="rm.id"
                          class="hover:bg-green-50 cursor-pointer transition-colors" @click="drillDownToRM(rm)">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-8 w-8">
                                <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                  <span class="text-xs font-medium text-white">{{rm.name.split(' ').map(n =>
                                    n[0]).join('')}}</span>
                                </div>
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ rm.name }}</div>
                                <div class="text-xs text-gray-500">{{ rm.relationships }} relationships</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-600 font-bold">{{
                            getRMOpportunityCount(rm) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-bold">{{
                            formatCurrency(getRMOpportunityValue(rm)) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-purple-600 font-bold">{{
                            getRMConversionRate(rm) }}%</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                            <span class="text-td-green font-medium">View Details ›</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Risk Management Tab -->
          <div v-if="activeTab === 'risk'">
            <div class="space-y-6">
              <!-- Risk Status Overview -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">🚨 Regional Risk Overview</h3>
                  <div class="grid grid-cols-5 gap-4">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-orange-600">{{ riskMetrics.totalRiskFlags }}</div>
                      <div class="text-xs text-gray-600">Total Risk Flags</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-red-600">{{ riskMetrics.pending }}</div>
                      <div class="text-xs text-gray-600">Pending Reviews</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-blue-600">{{ riskMetrics.reviewedWithAction }}</div>
                      <div class="text-xs text-gray-600">Reviewed w/ Action</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-purple-600">{{ riskMetrics.reviewedWithoutAction }}</div>
                      <div class="text-xs text-gray-600">Reviewed w/o Action</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-cyan-600">{{ riskMetrics.avgTimeToClose }}</div>
                      <div class="text-xs text-gray-600">Avg Days to Close</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Risk by RM Table -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">🚨 Risk Management by RM</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship Manager</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Flags</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pending Reviews</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            High Risk Relationships</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            UTR Filed</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="rm in sortedRMs" :key="rm.id"
                          class="hover:bg-green-50 cursor-pointer transition-colors" @click="drillDownToRM(rm)">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-8 w-8">
                                <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                  <span class="text-xs font-medium text-white">{{rm.name.split(' ').map(n =>
                                    n[0]).join('')}}</span>
                                </div>
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ rm.name }}</div>
                                <div class="text-xs text-gray-500">{{ rm.relationships }} relationships</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span v-if="rm.riskFlags > 0"
                              class="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              {{ rm.riskFlags }}
                            </span>
                            <span v-else class="text-gray-400">-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span v-if="rm.pendingReviews > 0"
                              class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              {{ rm.pendingReviews }}
                            </span>
                            <span v-else class="text-gray-400">-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span v-if="rm.highRiskRelationships > 0"
                              class="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                              {{ rm.highRiskRelationships }}
                            </span>
                            <span v-else class="text-gray-400">-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span v-if="rm.utrFiled > 0"
                              class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                              {{ rm.utrFiled }}
                            </span>
                            <span v-else class="text-gray-400">-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                            <span class="text-td-green font-medium">Review Portfolio ›</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">🚨 Regional Alerts</h3>
          <button @click="showAlertsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center">
              <span class="text-red-500 text-lg mr-2">⚠️</span>
              <div>
                <h4 class="font-medium text-red-900">Global Retail Corp - Covenant Breach</h4>
                <p class="text-sm text-red-700">Debt-to-equity ratio exceeded 3.5x threshold. RM: Sarah Johnson</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-center">
              <span class="text-yellow-500 text-lg mr-2">⚠️</span>
              <div>
                <h4 class="font-medium text-yellow-900">Region Risk Review Overdue</h4>
                <p class="text-sm text-yellow-700">15 relationships have overdue risk reviews across the region.</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div class="flex items-center">
              <span class="text-orange-500 text-lg mr-2">⚠️</span>
              <div>
                <h4 class="font-medium text-orange-900">Target Performance Alert</h4>
                <p class="text-sm text-orange-700">New credit relationships 40% below YTD target.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="showAlertsModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRegionById, getMarketById, getMetroById, getRMsByRegion, formatCurrency, getRiskColor } from '../data/mockData.js'
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
  }
})

const router = useRouter()

// Reactive state
const activeTab = ref('overview')
const selectedDateRange = ref('ytd')
const showNetNew = ref(true)
const showAlertsModal = ref(false)

// Sorting state
const sortField = ref('')
const sortDirection = ref('asc')

// Regional Data
const regionData = ref({
  vpName: 'David Johnson',
  id: props.regionId || 'toronto-west',
  name: 'Toronto West'
})

// Computed properties for names
const metroName = computed(() => {
  return props.metroId ? props.metroId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Mid South Metro';
})
const marketName = computed(() => {
  return props.marketId ? props.marketId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Market';
})
const regionName = computed(() => {
  return props.regionId ? props.regionId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Toronto West';
})
const lastReviewDate = computed(() => {
  return '2024-11-15';
})
const urgentAlertCount = computed(() => {
  return 3;
})

const netNewPeriod = computed(() => {
  switch (selectedDateRange.value) {
    case 'ytd': return '1 Jan'
    case '6m': return '6 months ago'
    case '12m': return '12 months ago'
    default: return '1 Jan'
  }
})

// Sample RM data for the region with Sarah Johnson as example
const relationshipManagers = computed(() => [
  {
    id: 'rm-001',
    name: 'Sarah Johnson',
    relationships: 15,
    portfolioValue: 950000000,
    revenue: 5650000,
    revenueDelta: 12,
    utilization: 75,
    riskScore: 6.2,
    riskFlags: 3,
    pendingReviews: 5,
    highRiskRelationships: 2,
    utrFiled: 1,
    opportunityCount: 25,
    opportunityValue: 5150000,
    conversionRate: 72
  },
  {
    id: 'rm-002',
    name: 'Michael Chen',
    relationships: 12,
    portfolioValue: 780000000,
    revenue: 4320000,
    revenueDelta: 8,
    utilization: 68,
    riskScore: 4.8,
    riskFlags: 1,
    pendingReviews: 2,
    highRiskRelationships: 1,
    utrFiled: 0,
    opportunityCount: 18,
    opportunityValue: 3200000,
    conversionRate: 65
  },
  {
    id: 'rm-003',
    name: 'Jennifer Wu',
    relationships: 18,
    portfolioValue: 1200000000,
    revenue: 6800000,
    revenueDelta: -3,
    utilization: 82,
    riskScore: 7.1,
    riskFlags: 4,
    pendingReviews: 7,
    highRiskRelationships: 3,
    utrFiled: 2,
    opportunityCount: 22,
    opportunityValue: 4100000,
    conversionRate: 58
  },
  {
    id: 'rm-004',
    name: 'Robert Taylor',
    relationships: 14,
    portfolioValue: 890000000,
    revenue: 4950000,
    revenueDelta: 15,
    utilization: 71,
    riskScore: 5.3,
    riskFlags: 2,
    pendingReviews: 3,
    highRiskRelationships: 1,
    utrFiled: 0,
    opportunityCount: 20,
    opportunityValue: 3800000,
    conversionRate: 69
  }
])

// Sorted RMs
const sortedRMs = computed(() => {
  if (!sortField.value) return relationshipManagers.value

  const sorted = [...relationshipManagers.value].sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]

    // Handle string sorting
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return sorted
})

// Regional KPI computations
const totalRMs = computed(() => relationshipManagers.value.length)
const rmsDelta = computed(() => 1)
const totalRelationships = computed(() => relationshipManagers.value.reduce((sum, rm) => sum + rm.relationships, 0))
const relationshipsDelta = computed(() => 8)
const totalDeposits = computed(() => relationshipManagers.value.reduce((sum, rm) => sum + rm.portfolioValue * 0.6, 0))
const depositsDelta = computed(() => 125000000)
const totalLoanCommitments = computed(() => relationshipManagers.value.reduce((sum, rm) => sum + rm.portfolioValue * 0.4, 0))
const loanDelta = computed(() => 78000000)
const loanUtilization = computed(() => {
  const totalUsed = relationshipManagers.value.reduce((sum, rm) => sum + rm.portfolioValue * 0.4 * (rm.utilization / 100), 0)
  const totalCommitted = totalLoanCommitments.value
  return Math.round((totalUsed / totalCommitted) * 100)
})
const totalRevenue = computed(() => relationshipManagers.value.reduce((sum, rm) => sum + rm.revenue, 0))
const revenueYoY = computed(() => {
  const weightedDelta = relationshipManagers.value.reduce((sum, rm) => sum + (rm.revenue * rm.revenueDelta / 100), 0)
  return Math.round((weightedDelta / totalRevenue.value) * 100)
})
const depositsGrowth = computed(() => 18) // Mock YoY growth


const newCreditRelationships = computed(() => 7)
const creditTarget = computed(() => 12)
const newCommitments = computed(() => 20282018)
const commitmentsTarget = computed(() => 10062500)
const riskReviewsPending = computed(() => relationshipManagers.value.reduce((sum, rm) => sum + rm.pendingReviews, 0))

// Opportunities metrics
const newDepositVolume = computed(() => 1232264)
const depositTarget = computed(() => 5366669)
const incrementalTMSRevenue = computed(() => 92659)
const tmsTarget = computed(() => 54292)
const totalReferrals = computed(() => 3)
const retailReferrals = computed(() => 1)
const wealthReferrals = computed(() => 2)

// Risk Metrics
const riskMetrics = computed(() => ({
  totalRiskFlags: relationshipManagers.value.reduce((sum, rm) => sum + rm.riskFlags, 0),
  pending: relationshipManagers.value.reduce((sum, rm) => sum + rm.pendingReviews, 0),
  reviewedWithAction: 28, // mock
  reviewedWithoutAction: 15, // mock
  avgTimeToClose: 22
}))

// Chart data
const regionalPortfolioChartData = computed(() => {
  const labels = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return date.toLocaleDateString('en-US', { month: 'short' })
  })

  const datasets = [
    {
      label: 'Deposits',
      data: labels.map(() => Math.floor(totalDeposits.value / 12 * (0.8 + Math.random() * 0.4))),
      backgroundColor: '#10B981'
    },
    {
      label: 'Loans',
      data: labels.map(() => -Math.floor(totalLoanCommitments.value / 12 * (0.8 + Math.random() * 0.4))),
      backgroundColor: '#EF4444'
    }
  ]

  return { labels, datasets }
})

const regionalPortfolioChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { mode: 'index', intersect: false }
  },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        callback: function (value) {
          return `$${Math.abs(value / 1e6).toFixed(0)}M`;
        }
      }
    }
  }
}

const revenueByRMChartData = computed(() => ({
  labels: relationshipManagers.value.map(rm => rm.name),
  datasets: [{
    label: 'YTD Revenue',
    data: relationshipManagers.value.map(rm => rm.revenue),
    backgroundColor: '#10B981'
  }]
}))

const revenueByRMChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        callback: function (value) {
          return `$${(value / 1e6).toFixed(1)}M`;
        }
      }
    }
  }
}

// Helper methods
const getUtilizationColor = (utilization) => {
  if (utilization > 85) return 'text-red-600'
  if (utilization > 70) return 'text-yellow-600'
  return 'text-green-600'
}

const getRiskScoreColor = (score) => {
  if (score > 7) return 'bg-red-100 text-red-800'
  if (score > 5) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}

const getRMOpportunityCount = (rm) => rm.opportunityCount || 0
const getRMOpportunityValue = (rm) => rm.opportunityValue || 0
const getRMConversionRate = (rm) => rm.conversionRate || 0

// Methods
const exportData = () => {
  console.log('Exporting regional data...')
}

const sortTable = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const drillDownToRM = (rm) => {
  console.log('Navigating to RM:', rm.id)
  router.push({
    name: 'RelationshipManager',
    params: {
      metroId: props.metroId,
      marketId: props.marketId,
      regionId: props.regionId,
      rmId: rm.id
    }
  })
}

// Legacy computed properties for compatibility
const region = computed(() => getRegionById(props.regionId))
const market = computed(() => getMarketById(props.marketId))
const metro = computed(() => getMetroById(props.metroId))
const regionRMs = computed(() => getRMsByRegion(props.regionId))

// Lifecycle
onMounted(() => {
  console.log('RegionView mounted for region:', props.regionId)
  console.log('Regional VP:', regionData.value.vpName)
  console.log('Total RMs:', totalRMs.value)
})
</script>