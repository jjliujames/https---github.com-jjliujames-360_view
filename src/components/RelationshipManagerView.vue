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
                  <li><span class="mx-2">›</span></li>
                  <li><span>{{ rmData.name }}</span></li>
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
        <!-- Show Net-New Toggle on new line -->
        <div class="mt-4 flex items-center">
          <label class="flex items-center space-x-2 text-sm text-gray-700">
            <input type="checkbox" v-model="showNetNew" class="rounded border-gray-300">
            <span>Show Net-New</span>
          </label>
        </div>
        <!-- Date Range Filter (remains below) -->
        <div class="mt-4 flex items-center">
          <label class="text-sm text-gray-700 mr-3">Date Range:</label>
          <select v-model="selectedDateRange" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option value="ytd">YTD</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </select>
        </div>
        <!-- RM Summary Banner -->
        <div class="mt-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200">
          <div>
            <div class="text-lg font-semibold text-gray-900">{{ rmData.name }}</div>
            <div class="text-sm text-gray-600">Metro: <span class="font-medium">{{ metroName }}</span> | Market: <span
                class="font-medium">{{ marketName }}</span> | Region: <span class="font-medium">{{ regionName }}</span>
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
          <!-- # Relationships -->
          <div class="text-center">
            <div class="text-xl font-bold text-blue-600">{{ totalRelationships }}</div>
            <div class="text-xs text-gray-600"># Relationships</div>
            <div v-if="showNetNew" class="text-xs text-green-500 font-medium mt-1">+{{ relationshipsDelta }} since {{
              netNewPeriod }}</div>
          </div>

          <!-- Deposits -->
          <div class="text-center">
            <div class="text-xl font-bold text-green-600">{{ formatCurrency(totalDeposits) }}</div>
            <div class="text-xs text-gray-600">Deposits</div>
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

          <!-- Loan Utilization -->
          <div class="text-center">
            <div class="text-xl font-bold text-purple-600">{{ loanUtilization }}%</div>
            <div class="text-xs text-gray-600">Loan Utilization</div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div class="bg-purple-600 h-2 rounded-full" :style="{ width: loanUtilization + '%' }"></div>
            </div>
          </div>

          <!-- Revenue YoY -->
          <div class="text-center">
            <div class="text-xl font-bold text-cyan-600">{{ formatCurrency(totalRevenue) }}</div>
            <div class="text-xs text-gray-600">Revenue YTD</div>
            <div class="text-xs font-medium mt-1" :class="revenueYoY >= 0 ? 'text-green-500' : 'text-red-500'">
              {{ revenueYoY >= 0 ? '+' : '' }}{{ revenueYoY }}% YoY
            </div>
          </div>

          <!-- # Leads -->
          <div class="text-center">
            <div class="text-xl font-bold text-indigo-600">{{ totalLeads }}</div>
            <div class="text-xs text-gray-600"># Leads</div>
            <div class="text-xs text-indigo-500 font-medium">Top of funnel</div>
          </div>

          <!-- Closing Rate -->
          <div class="text-center">
            <div class="text-xl font-bold text-pink-600">{{ closingRate }}%</div>
            <div class="text-xs text-gray-600">Closing Rate</div>
            <div class="text-xs text-pink-500 font-medium">{{ closedWon }}/{{ totalClosed }} closed</div>
          </div>

          <!-- Risk Reviews Pending -->
          <div class="text-center">
            <div class="text-xl font-bold text-red-600 flex items-center justify-center">
              {{ riskReviewsPending }}
              <span v-if="riskReviewsPending > 10" class="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-1"></span>
            </div>
            <div class="text-xs text-gray-600">Risk Reviews Pending</div>
            <div class="text-xs text-red-500 font-medium" v-if="riskReviewsPending > 10">Above threshold</div>
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
            <button @click="activeTab = 'portfolio'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'portfolio' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Portfolio
            </button>
            <button @click="activeTab = 'opportunities'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'opportunities' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Opportunities
            </button>
            <button @click="activeTab = 'risk'"
              :class="['whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium', activeTab === 'risk' ? 'border-td-green text-td-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              Risk Appetite Review
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Portfolio Tab -->
          <div v-if="activeTab === 'portfolio'">
            <div class="space-y-6">
              <!-- Relationship Table -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">🏢 Relationship Portfolio</h3>
                <!-- Legend for N/E -->
                <div class="flex items-center mb-2 space-x-4">
                  <div class="flex items-center">
                    <span class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center mr-2">
                      <span class="text-xs font-medium text-white">N</span>
                    </span>
                    <span class="text-xs text-gray-700">New Relationship</span>
                  </div>
                  <div class="flex items-center">
                    <span class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center mr-2">
                      <span class="text-xs font-medium text-white">E</span>
                    </span>
                    <span class="text-xs text-gray-700">Existing Relationship</span>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('name')">
                          Relationship
                          <span v-if="sortField === 'name'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('depositsDelta')">
                          Deposits Δ
                          <span v-if="sortField === 'depositsDelta'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('loansDelta')">
                          Loans Δ
                          <span v-if="sortField === 'loansDelta'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('utilization')">
                          Util %
                          <span v-if="sortField === 'utilization'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('revenueDelta')">
                          Revenue Δ
                          <span v-if="sortField === 'revenueDelta'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('crossSellIndex')">
                          Cross-Sell Index
                          <span v-if="sortField === 'crossSellIndex'" class="ml-1">{{ sortDirection === 'asc' ? '↑' :
                            '↓' }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('pendingReviews')">
                          Pending Reviews
                          <span v-if="sortField === 'pendingReviews'" class="ml-1">{{ sortDirection === 'asc' ? '↑' :
                            '↓' }}</span>
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          @click="sortTable('leadValue')">
                          Leads (# / $)
                          <span v-if="sortField === 'leadValue'" class="ml-1">{{ sortDirection === 'asc' ? '↑' : '↓'
                          }}</span>
                        </th>
                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Relationship Type
                        </th>
                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="relationship in sortedRelationships" :key="relationship.id"
                        class="hover:bg-green-50 cursor-pointer transition-colors"
                        @click="drillDownToRelationship(relationship)">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-8 w-8">
                              <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                <span class="text-xs font-medium text-white">{{ isNewRelationship(relationship) ? 'N' :
                                  'E' }}</span>
                              </div>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ relationship.name }}</div>
                              <div class="text-xs text-gray-500">{{ relationship.industry }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm"
                          :class="relationship.depositsDelta > 0 ? 'text-green-600' : 'text-red-600'">
                          {{ relationship.depositsDelta > 0 ? '+' : '' }}{{ formatCurrency(relationship.depositsDelta)
                          }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm"
                          :class="relationship.loansDelta > 0 ? 'text-green-600' : 'text-red-600'">
                          {{ relationship.loansDelta > 0 ? '+' : '' }}{{ formatCurrency(relationship.loansDelta) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <span class="font-medium" :class="getUtilizationColor(relationship.utilization)">
                            {{ relationship.utilization }}%
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm"
                          :class="relationship.revenueDelta > 0 ? 'text-green-600' : 'text-red-600'">
                          {{ relationship.revenueDelta > 0 ? '+' : '' }}{{ formatCurrency(relationship.revenueDelta) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <span class="font-medium" :class="getCrossSellColor(relationship.crossSellIndex)">
                            {{ relationship.crossSellIndex }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                          <span v-if="relationship.pendingReviews > 0"
                            class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            {{ relationship.pendingReviews }}
                          </span>
                          <span v-else class="text-gray-400">-</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          {{ relationship.leadCount }} / {{ formatCurrency(relationship.leadValue) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                          <span class="px-2 py-1 text-xs font-medium rounded-full"
                            :class="getRelationshipTypeClass(getRelationshipType(relationship))">
                            {{ getRelationshipType(relationship) }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                          <span class="text-td-green font-medium">View Details ›</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Account & Loan Portfolio Balance -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-4">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-2xl">📊</span>
                      <h3 class="text-lg font-bold text-gray-900">Account & Loan Portfolio Balance</h3>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span
                        class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Deposits</span>
                      <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Loans</span>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500 mb-4">Account balances (positive) vs loan utilization (negative)
                  </div>

                  <!-- Relationship Filter (always show) -->
                  <div class="mb-4">
                    <label class="text-sm text-gray-700 mr-3">Filter by Relationship:</label>
                    <select v-model="selectedRelationshipFilter"
                      class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option value="all">All Relationships</option>
                      <option v-for="rel in sortedRelationships" :key="rel.id" :value="rel.id">{{ rel.name }}</option>
                    </select>
                  </div>

                  <!-- Legend (always show) -->
                  <div class="flex flex-wrap items-center mb-4">
                    <div v-for="(item, idx) in accountLoanLegend" :key="item.label"
                      class="flex items-center mr-6 mb-2 cursor-pointer" @click="toggleAccountLoanLegend(item.label)">
                      <span
                        :style="{ backgroundColor: item.color, opacity: accountLoanActiveLegends.includes(item.label) ? 1 : 0.3 }"
                        class="w-4 h-4 rounded-full inline-block mr-2"></span>
                      <span class="text-xs text-gray-700">{{ item.label }}</span>
                    </div>
                  </div>

                  <div class="h-64 p-4">
                    <BarChart v-if="accountLoanPortfolioChartData" :data="accountLoanPortfolioChartData"
                      :options="accountLoanPortfolioChartOptions" />
                  </div>
                </div>
              </div>

              <!-- Revenue Trends by Relationship -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-6">
                  <div class="flex items-center mb-4 justify-between">
                    <div class="flex items-center">
                      <span class="text-2xl">📊</span>
                      <h3 class="text-lg font-bold text-gray-900 ml-2">Revenue Trends by Relationship</h3>
                    </div>
                    <div>
                      <label class="text-sm text-gray-700 mr-2">Filter by Relationship:</label>
                      <select v-model="selectedRevenueRelationship"
                        class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option value="all">All Relationships</option>
                        <option v-for="rel in sortedRelationships" :key="rel.id" :value="rel.id">{{ rel.name }}</option>
                      </select>
                    </div>
                  </div>
                  <!-- Legend for revenue types -->
                  <div class="flex flex-wrap items-center mb-4">
                    <div v-for="(type, idx) in revenueTypeLegend" :key="type.label"
                      class="flex items-center mr-6 mb-2 cursor-pointer" @click="toggleRevenueTypeLegend(type.label)">
                      <span
                        :style="{ backgroundColor: type.color, opacity: revenueTypeActiveLegends.includes(type.label) ? 1 : 0.3 }"
                        class="w-4 h-4 rounded-full inline-block mr-2"></span>
                      <span class="text-xs text-gray-700">{{ type.label }}</span>
                    </div>
                  </div>
                  <div class="h-60 px-10">
                    <BarChart v-if="revenueTypeStackedChartData" :data="revenueTypeStackedChartData"
                      :options="revenueTypeStackedChartOptions" />
                  </div>
                  <!-- Summary Table -->
                  <div class="mt-8">
                    <h4 class="text-md font-semibold text-gray-900 mb-2">Revenue Summary</h4>
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Relationship</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total Revenue</th>
                            <th v-for="type in revenueTypeLegend" :key="type.label"
                              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{{
                                type.label }}</th>
                            <th
                              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Relationship Type
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="rel in revenueSummaryRelationships" :key="rel.id"
                            class="hover:bg-green-50 cursor-pointer transition-colors"
                            @click="drillDownToRelationship(rel)">
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 h-8 w-8">
                                  <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                    <span class="text-xs font-medium text-white">{{ rel.name.charAt(0) }}</span>
                                  </div>
                                </div>
                                <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">{{ rel.name }}</div>
                                  <div class="text-xs text-gray-500">{{ rel.industry }}</div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right font-bold">{{
                              formatCurrency(getRelationshipTotalRevenue(rel)) }}</td>
                            <td v-for="type in revenueTypeLegend" :key="type.label"
                              class="px-6 py-4 whitespace-nowrap text-right">{{
                                formatCurrency(getRelationshipRevenueByType(rel, type.label)) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-center">
                              <span class="px-2 py-1 text-xs font-medium rounded-full"
                                :class="getRelationshipTypeClass(getRelationshipType(rel))">
                                {{ getRelationshipType(rel) }}
                              </span>
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

          <!-- Opportunities Tab -->
          <div v-if="activeTab === 'opportunities'">
            <div class="space-y-6">
              <!-- Opportunities Summary -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ filteredOpportunitiesCount }}</div>
                  <div class="text-xs text-gray-600">Total Opportunities</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ formatCurrency(filteredOpportunitiesValue) }}</div>
                  <div class="text-xs text-gray-600">Total Value</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">{{ avgOpportunityValue }}</div>
                  <div class="text-xs text-gray-600">Avg Opportunity</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600">{{ opportunitiesConversionRate }}%</div>
                  <div class="text-xs text-gray-600">Conversion Rate</div>
                </div>
              </div>
              <!-- Opportunities Summary Table -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Relationship Opportunities Summary</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Opportunities</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Potential Value</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Avg Confidence</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship Type</th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="rel in sortedRelationships" :key="rel.id"
                          class="hover:bg-green-50 cursor-pointer transition-colors"
                          @click="drillDownToRelationship(rel)">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-8 w-8">
                                <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                  <span class="text-xs font-medium text-white">{{ rel.name.charAt(0) }}</span>
                                </div>
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ rel.name }}</div>
                                <div class="text-xs text-gray-500">{{ rel.industry }}</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-600 font-bold">{{
                            getRelationshipOpportunityCount(rel) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-bold">{{
                            formatCurrency(getRelationshipOpportunityValue(rel)) }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-purple-600 font-bold">{{
                            getRelationshipAvgConfidence(rel) }}%</td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span class="px-2 py-1 text-xs font-medium rounded-full"
                              :class="getRelationshipTypeClass(getRelationshipType(rel))">
                              {{ getRelationshipType(rel) }}
                            </span>
                          </td>
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

          <!-- Risk Appetite Review Tab -->
          <div v-if="activeTab === 'risk'">
            <div class="space-y-6">
              <!-- Review Status Counters -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">🚨 Review Status Overview</h3>
                  <div class="grid grid-cols-5 gap-4">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-orange-600">{{ riskMetrics.pending }}</div>
                      <div class="text-xs text-gray-600">Pending</div>
                      <div class="text-xs text-orange-500">Due ≤ 30 days</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-green-600">{{ riskMetrics.completed }}</div>
                      <div class="text-xs text-gray-600">Completed</div>
                      <div class="text-xs text-green-500">This quarter</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-blue-600">{{ riskMetrics.withoutUTR }}</div>
                      <div class="text-xs text-gray-600">w/o UTR</div>
                      <div class="text-xs text-blue-500">No UTR required</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-purple-600">{{ riskMetrics.withUTR }}</div>
                      <div class="text-xs text-gray-600">Closed w/ UTR</div>
                      <div class="text-xs text-purple-500">UTR filed</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-cyan-600">{{ riskMetrics.avgTimeToClose }}</div>
                      <div class="text-xs text-gray-600">Avg Days</div>
                      <div class="text-xs text-cyan-500">To close</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Risk Statistics by Relationship Table -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">🚨 Risk Statistics by Relationship</h3>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            RCI Score
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Risk Flags
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pending Reviews
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Review
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Next Due
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Relationship Type
                          </th>
                          <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="relationship in relationshipsWithRiskStats" :key="relationship.id"
                          class="hover:bg-green-50 cursor-pointer transition-colors"
                          @click="drillDownToRelationship(relationship)">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-8 w-8">
                                <div class="h-8 w-8 rounded-full bg-td-green flex items-center justify-center">
                                  <span class="text-xs font-medium text-white">{{ relationship.name.charAt(0) }}</span>
                                </div>
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ relationship.name }}</div>
                                <div class="text-xs text-gray-500">{{ relationship.industry }}</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span class="font-medium" :class="getRCIColor(relationship.rci)">
                              {{ relationship.rci }}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span v-if="relationship.riskFlags > 0"
                              class="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              {{ relationship.riskFlags }}
                            </span>
                            <span v-else class="text-gray-400">-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span v-if="relationship.pendingReviews > 0"
                              class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              {{ relationship.pendingReviews }}
                            </span>
                            <span v-else class="text-gray-400">-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                            {{ relationship.lastReviewDate }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center text-sm"
                            :class="relationship.daysToDue <= 7 ? 'text-red-600 font-bold' : relationship.daysToDue <= 30 ? 'text-orange-600' : 'text-gray-900'">
                            {{ relationship.nextDueDate }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span
                              :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor(relationship.riskStatus)]">
                              {{ relationship.riskStatus }}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span class="px-2 py-1 text-xs font-medium rounded-full"
                              :class="getRelationshipTypeClass(getRelationshipType(relationship))">
                              {{ getRelationshipType(relationship) }}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-center">
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
        </div>
      </div>
    </div>

    <!-- Alerts Modal -->
    <div v-if="showAlertsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">🚨 Urgent Alerts</h3>
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
                <h4 class="font-medium text-red-900">Global Retail Corp - Overdraft Alert</h4>
                <p class="text-sm text-red-700">Account exceeded limit by $2.3M. Immediate attention required.</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-center">
              <span class="text-yellow-500 text-lg mr-2">⚠️</span>
              <div>
                <h4 class="font-medium text-yellow-900">Johnson Holdings Group - Covenant Breach</h4>
                <p class="text-sm text-yellow-700">Debt-to-equity ratio exceeded 3.5x threshold.</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div class="flex items-center">
              <span class="text-orange-500 text-lg mr-2">⚠️</span>
              <div>
                <h4 class="font-medium text-orange-900">TechCorp Industries - Review Overdue</h4>
                <p class="text-sm text-orange-700">Annual risk review is 15 days overdue.</p>
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
import { formatCurrency, clients } from '../data/mockData.js'
import BarChart from './charts/BarChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'
import LineChart from './charts/LineChart.vue'

const props = defineProps({
  metroId: String,
  marketId: String,
  regionId: String,
  rmId: String
})

const router = useRouter()

// Reactive state
const activeTab = ref('portfolio')
const selectedDateRange = ref('ytd')
const selectedCurrency = ref('usd')
const showNetNew = ref(true)
const showAlertsModal = ref(false)

// Sorting state
const sortField = ref('')
const sortDirection = ref('asc')

// Opportunities filter state
const opportunitiesFilter = ref('all')
const opportunitiesTimePeriod = ref('6m')

// RM Data
const rmData = ref({
  id: props.rmId || 'rm-001',
  name: 'Sarah Johnson',
  region: 'Toronto West',
  market: 'GTA',
  metro: 'Toronto'
})

// Add these after rmData and before computed properties
const metroName = computed(() => {
  // Replace with actual lookup if available
  return props.metroId ? props.metroId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Metro';
})
const marketName = computed(() => {
  return props.marketId ? props.marketId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Market';
})
const regionName = computed(() => {
  return props.regionId ? props.regionId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Region';
})
const lastReviewDate = computed(() => {
  // Mock: last review 2 weeks ago
  return '2024-05-15';
})
const urgentAlertCount = computed(() => {
  // Mock: count of urgent alerts (delinquency + overdraft + urgent tasks)
  return 3;
})

// Computed properties
const breadcrumb = computed(() => {
  return `Metro › Market › Region › ${rmData.value.name} › Portfolio Dashboard`
})

const netNewPeriod = computed(() => {
  switch (selectedDateRange.value) {
    case 'ytd': return '1 Jan'
    case '6m': return '6 months ago'
    case '12m': return '12 months ago'
    default: return '1 Jan'
  }
})

// Sample relationship data for the RM
const relationships = computed(() => [
  {
    id: 'rel-001',
    name: 'Johnson Holdings Group',
    industry: 'Manufacturing',
    deposits: 425000000,
    depositsDelta: 45000000,
    loans: 185000000,
    loansDelta: 25000000,
    utilization: 68,
    revenue: 3200000,
    revenueDelta: 480000,
    crossSellIndex: 3.2,
    rci: 6.8,
    pendingReviews: 2,
    leadCount: 3,
    leadValue: 2400000,
    stage: 'Defend'
  },
  {
    id: 'rel-002',
    name: 'TechCorp Industries',
    industry: 'Technology',
    deposits: 185000000,
    depositsDelta: 12000000,
    loans: 95000000,
    loansDelta: 18000000,
    utilization: 72,
    revenue: 1850000,
    revenueDelta: 220000,
    crossSellIndex: 2.8,
    rci: 4.2,
    pendingReviews: 1,
    leadCount: 5,
    leadValue: 1800000,
    stage: 'Build'
  },
  {
    id: 'rel-003',
    name: 'Global Retail Corp',
    industry: 'Retail',
    deposits: 320000000,
    depositsDelta: -8000000,
    loans: 145000000,
    loansDelta: -5000000,
    utilization: 89,
    revenue: 2100000,
    revenueDelta: -150000,
    crossSellIndex: 2.1,
    rci: 7.8,
    pendingReviews: 4,
    leadCount: 2,
    leadValue: 950000,
    stage: 'Watch'
  }
])

// Sorted relationships
const sortedRelationships = computed(() => {
  if (!sortField.value) return relationships.value

  const sorted = [...relationships.value].sort((a, b) => {
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

// KPI computations
const totalRelationships = computed(() => relationships.value.length)
const relationshipsDelta = computed(() => 2)
const totalDeposits = computed(() => relationships.value.reduce((sum, rel) => sum + rel.deposits, 0))
const depositsDelta = computed(() => relationships.value.reduce((sum, rel) => sum + rel.depositsDelta, 0))
const totalLoanCommitments = computed(() => relationships.value.reduce((sum, rel) => sum + rel.loans, 0))
const loanDelta = computed(() => relationships.value.reduce((sum, rel) => sum + rel.loansDelta, 0))
const loanUtilization = computed(() => {
  const totalUsed = relationships.value.reduce((sum, rel) => sum + rel.loans, 0)
  const totalCommitted = totalUsed * 1.4 // Assuming 40% headroom
  return Math.round((totalUsed / totalCommitted) * 100)
})
const totalRevenue = computed(() => relationships.value.reduce((sum, rel) => sum + rel.revenue, 0))
const revenueYoY = computed(() => {
  const totalDelta = relationships.value.reduce((sum, rel) => sum + rel.revenueDelta, 0)
  const previousRevenue = totalRevenue.value - totalDelta
  return Math.round((totalDelta / previousRevenue) * 100)
})
const depositsGrowth = computed(() => {
  const totalDelta = relationships.value.reduce((sum, rel) => sum + rel.depositsDelta, 0)
  const previousDeposits = totalDeposits.value - totalDelta
  return Math.round((totalDelta / previousDeposits) * 100)
})

const totalLeads = computed(() => relationships.value.reduce((sum, rel) => sum + rel.leadCount, 0))
const closedWon = computed(() => 12)
const totalClosed = computed(() => 18)
const closingRate = computed(() => Math.round((closedWon.value / totalClosed.value) * 100))
const riskReviewsPending = computed(() => relationships.value.reduce((sum, rel) => sum + rel.pendingReviews, 0))

// Opportunities data
const opportunitiesData = computed(() => {
  const baseData = [
    {
      client: 'Johnson Holdings Group',
      pending: 8,
      value: 2400000,
      priority: 'High',
      dateAdded: '2024-11-01',
      category: 'Lending'
    },
    {
      client: 'TechCorp Industries',
      pending: 12,
      value: 1800000,
      priority: 'High',
      dateAdded: '2024-10-15',
      category: 'Treasury'
    },
    {
      client: 'Global Retail Corp',
      pending: 5,
      value: 950000,
      priority: 'Medium',
      dateAdded: '2024-10-28',
      category: 'Investment'
    },
    {
      client: 'Manufacturing Plus',
      pending: 6,
      value: 750000,
      priority: 'Medium',
      dateAdded: '2024-11-10',
      category: 'Deposits'
    },
    {
      client: 'Retail Solutions Inc',
      pending: 4,
      value: 480000,
      priority: 'Low',
      dateAdded: '2024-11-05',
      category: 'FX'
    }
  ]

  // Apply filters
  return baseData.filter(item => {
    if (opportunitiesFilter.value === 'high-value' && item.value <= 500000) return false
    if (opportunitiesFilter.value === 'high-priority' && item.priority !== 'High') return false
    if (opportunitiesFilter.value === 'recent') {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      if (new Date(item.dateAdded) < thirtyDaysAgo) return false
    }
    return true
  })
})

// Use green palette for Opportunities Trends
const opportunitiesPalette = ['#04442c', '#a1e57e', '#6db75c', '#397a43', '#7c978c', '#5c7f6e', '#26563f', '#3b6554']
const opportunitiesChartData = computed(() => {
  const labels = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return date.toLocaleDateString('en-US', { month: 'short' })
  })
  const clients = [...new Set(opportunitiesData.value.map(item => item.client))]
  const datasets = clients.map((client, index) => ({
    label: client,
    data: labels.map(() => Math.floor(Math.random() * 15) + 2), // Mock data for each month
    backgroundColor: opportunitiesPalette[index % opportunitiesPalette.length],
    borderColor: opportunitiesPalette[index % opportunitiesPalette.length],
    borderWidth: 1
  }))
  return { labels, datasets }
})

// Opportunities summary stats
const filteredOpportunitiesCount = computed(() => opportunitiesData.value.reduce((sum, item) => sum + item.pending, 0))
const filteredOpportunitiesValue = computed(() => opportunitiesData.value.reduce((sum, item) => sum + item.value, 0))
const avgOpportunityValue = computed(() => formatCurrency(filteredOpportunitiesValue.value / Math.max(filteredOpportunitiesCount.value, 1)))
const opportunitiesConversionRate = computed(() => 67) // Mock conversion rate

// Product penetration data
const productPenetration = computed(() => [
  { name: 'Deposits', penetration: 100, relationshipCount: totalRelationships.value },
  { name: 'Lending', penetration: 85, relationshipCount: Math.round(totalRelationships.value * 0.85) },
  { name: 'Treasury', penetration: 67, relationshipCount: Math.round(totalRelationships.value * 0.67) },
  { name: 'FX', penetration: 45, relationshipCount: Math.round(totalRelationships.value * 0.45) },
  { name: 'Trade', penetration: 30, relationshipCount: Math.round(totalRelationships.value * 0.30) },
  { name: 'Wealth', penetration: 25, relationshipCount: Math.round(totalRelationships.value * 0.25) }
])

// AI Recommendations
const aiRecommendations = computed(() => [
  {
    id: 1,
    relationship: 'TechCorp Industries',
    recommendation: 'Opportunity to expand treasury management solutions given their rapid growth and multiple subsidiaries',
    confidence: 92,
    impact: 650000,
    priority: 'High'
  },
  {
    id: 2,
    relationship: 'Johnson Holdings Group',
    recommendation: 'Cross-sell FX services for international expansion plans',
    confidence: 88,
    impact: 420000,
    priority: 'Medium'
  },
  {
    id: 3,
    relationship: 'Global Retail Corp',
    recommendation: 'Defensive play - restructure lending facilities to improve utilization',
    confidence: 85,
    impact: 380000,
    priority: 'High'
  }
])

// Lead Funnel
const leadFunnel = computed(() => [
  { name: 'Qualified', count: 24, value: 8500000 },
  { name: 'Proposal', count: 18, value: 6200000 },
  { name: 'Negotiation', count: 12, value: 4100000 },
  { name: 'Closed Won', count: 6, value: 2800000 },
  { name: 'Closed Lost', count: 3, value: 1200000 }
])

// Risk Metrics
const riskMetrics = computed(() => ({
  pending: 15,
  completed: 42,
  withoutUTR: 28,
  withUTR: 14,
  avgTimeToClose: 18
}))

// High RCI Relationships
const highRCIRelationships = computed(() =>
  relationships.value.filter(rel => rel.rci > 6.5).map(rel => ({
    ...rel,
    lastReview: '2 weeks ago',
    riskFlags: Math.floor(rel.rci)
  }))
)

// Chart data
const revenueChartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [850000, 920000, 1100000, 980000, 1150000, 1200000],
    backgroundColor: '#10B981'
  }]
}))

const penetrationChartData = computed(() => ({
  labels: productPenetration.value.map(p => p.name),
  datasets: [{
    data: productPenetration.value.map(p => p.penetration),
    backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
  }]
}))

// Add these computed properties in the script section
const chartLabels = computed(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])
const revenueTrendsActiveLegends = ref(sortedRelationships.value.map(rel => rel.name))
const revenuePalette = ['#04442c', '#a1e57e', '#5c7f6e', '#7c978c', '#6db75c', '#26563f', '#3b6554', '#397a43']
const toggleRevenueTrendsLegend = (name) => {
  if (revenueTrendsActiveLegends.value.includes(name)) {
    revenueTrendsActiveLegends.value = revenueTrendsActiveLegends.value.filter(n => n !== name)
  } else {
    revenueTrendsActiveLegends.value.push(name)
  }
}
const revenueTrendsStackedChartData = computed(() => {
  const labels = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return date.toLocaleDateString('en-US', { month: 'short' })
  })
  const datasets = sortedRelationships.value
    .filter((rel) => revenueTrendsActiveLegends.value.includes(rel.name))
    .map((rel, idx) => ({
      label: rel.name,
      data: labels.map(() => Math.floor(rel.revenue / 12 * (0.8 + Math.random() * 0.4))),
      backgroundColor: revenuePalette[idx % revenuePalette.length],
      stack: 'revenue'
    }))
  return { labels, datasets }
})
const depositTrendsChartData = computed(() => ({
  labels: chartLabels.value,
  datasets: sortedRelationships.value.map((rel, idx) => ({
    label: rel.name,
    data: chartLabels.value.map(() => Math.floor(rel.deposits / 6 * (0.8 + Math.random() * 0.4))),
    borderColor: ['#3B82F6', '#10B981', '#F59E0B'][idx % 3],
    backgroundColor: 'rgba(59,130,246,0.1)',
    tension: 0.4
  }))
}))
const loanTrendsChartData = computed(() => ({
  labels: chartLabels.value,
  datasets: sortedRelationships.value.map((rel, idx) => ({
    label: rel.name,
    data: chartLabels.value.map(() => Math.floor(rel.loans / 6 * (0.8 + Math.random() * 0.4))),
    borderColor: ['#F59E0B', '#10B981', '#3B82F6'][idx % 3],
    backgroundColor: 'rgba(245,158,11,0.1)',
    tension: 0.4
  }))
}))

// Helper methods
const getUtilizationColor = (utilization) => {
  if (utilization > 85) return 'text-red-600'
  if (utilization > 70) return 'text-yellow-600'
  return 'text-green-600'
}

const getCrossSellColor = (index) => {
  if (index >= 3.0) return 'text-green-600'
  if (index >= 2.0) return 'text-yellow-600'
  return 'text-red-600'
}

const getRCIColor = (rci) => {
  if (rci > 7) return 'text-red-600'
  if (rci > 5) return 'text-yellow-600'
  return 'text-green-600'
}

const getStageColor = (stage) => {
  switch (stage) {
    case 'Build': return 'bg-green-100 text-green-800'
    case 'Defend': return 'bg-blue-100 text-blue-800'
    case 'Watch': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Methods
const createLead = () => {
  console.log('Creating new lead...')
  // Implement lead creation logic
}

const refreshData = () => {
  console.log('Refreshing data...')
  // Implement data refresh logic
}

const exportData = () => {
  console.log('Exporting data...')
  // Implement export logic
}

const sortTable = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const drillDownToRelationship = (relationship) => {
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

const actOnRecommendation = (recommendation) => {
  console.log('Acting on recommendation:', recommendation)
  // Implement recommendation action logic
}

const reviewRisk = (relationship) => {
  console.log('Reviewing risk for:', relationship.name)
  // Implement risk review logic
}

// Add these below the other helper methods
const getRelationshipOpportunityCount = (rel) => {
  // Mock: use leadCount as opportunity count
  return rel.leadCount || 0;
}
const getRelationshipOpportunityValue = (rel) => {
  // Mock: use leadValue as opportunity value
  return rel.leadValue || 0;
}
const getRelationshipAvgConfidence = (rel) => {
  // Mock: random confidence between 80-95
  return 85 + Math.floor(Math.random() * 10);
}

// Add after other chart data
const accountLoanLegend = [
  { label: 'Business Checking', color: '#04442c' },
  { label: 'Business Savings', color: '#a1e57e' },
  { label: 'Money Market', color: '#dce4e0' },
  { label: 'Investment Account', color: '#5c7f6e' },
  { label: 'Commercial Lending', color: '#26563f' },
  { label: 'Term Loans', color: '#3b6554' },
  { label: 'Equipment Financing', color: '#397a43' }
]

// Green color palette for relationships from the image
const relationshipGreenPalette = ['#ABE3C4', '#122A2C', '#F3DDCC', '#626058', '#577564', '#6A8E7C', '#959488', '#88B59A', '#102428']

// Add state for chart segmentation and legend filter
const accountLoanSegment = ref('account') // 'relationship' or 'account'
const accountLoanActiveLegends = ref(accountLoanLegend.map(l => l.label))
const selectedRelationshipFilter = ref('all')

// Add the toggleAccountLoanLegend method
const toggleAccountLoanLegend = (label) => {
  if (accountLoanActiveLegends.value.includes(label)) {
    accountLoanActiveLegends.value = accountLoanActiveLegends.value.filter(l => l !== label)
  } else {
    accountLoanActiveLegends.value.push(label)
  }
}

// Update accountLoanPortfolioChartData for the new segmentation logic
const accountLoanPortfolioChartData = computed(() => {
  const labels = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return date.toLocaleDateString('en-US', { month: 'short' })
  })

  let datasets = []

  if (accountLoanSegment.value === 'relationship') {
    // Simple mode: each relationship gets one positive bar (deposits) and one negative bar (loans)
    sortedRelationships.value.forEach((rel, idx) => {
      // Deposits (positive) - use green palette
      datasets.push({
        label: `${rel.name} - Deposits`,
        backgroundColor: relationshipGreenPalette[idx % relationshipGreenPalette.length],
        data: labels.map(() => Math.floor(rel.deposits / 12 * (0.9 + Math.random() * 0.2)))
      })
      // Loans (negative) - use red shades
      datasets.push({
        label: `${rel.name} - Loans`,
        backgroundColor: '#e57373',
        data: labels.map(() => -Math.floor(rel.loans / 12 * (0.9 + Math.random() * 0.2)))
      })
    })
  } else {
    // Account type mode: stacked by account types, filtered by relationship
    const depositTypes = [
      { label: 'Business Checking', color: '#04442c' },
      { label: 'Business Savings', color: '#a1e57e' },
      { label: 'Money Market', color: '#dce4e0' },
      { label: 'Investment Account', color: '#5c7f6e' }
    ]
    const loanTypes = [
      { label: 'Commercial Lending', color: '#e57373' },
      { label: 'Term Loans', color: '#c62828' },
      { label: 'Equipment Financing', color: '#ad1d1d' }
    ]

    // Filter relationships based on dropdown selection
    const filteredRelationships = selectedRelationshipFilter.value === 'all'
      ? sortedRelationships.value
      : sortedRelationships.value.filter(rel => rel.id === selectedRelationshipFilter.value)

    // Create datasets for each account type
    depositTypes.forEach((type) => {
      if (!accountLoanActiveLegends.value.includes(type.label)) return
      datasets.push({
        label: type.label,
        backgroundColor: type.color,
        data: labels.map(() => {
          return filteredRelationships.reduce((sum, rel) => {
            return sum + Math.floor(rel.deposits / depositTypes.length / 12 * (0.8 + Math.random() * 0.4))
          }, 0)
        })
      })
    })

    loanTypes.forEach((type) => {
      if (!accountLoanActiveLegends.value.includes(type.label)) return
      datasets.push({
        label: type.label,
        backgroundColor: type.color,
        data: labels.map(() => {
          return -filteredRelationships.reduce((sum, rel) => {
            return sum + Math.floor(rel.loans / loanTypes.length / 12 * (0.8 + Math.random() * 0.4))
          }, 0)
        })
      })
    })
  }

  return { labels, datasets }
})

const accountLoanPortfolioChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
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

const revenueTrendsStackedChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
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

// Add computed property for relationships with risk statistics
const relationshipsWithRiskStats = computed(() => {
  return relationships.value.map(rel => ({
    ...rel,
    riskFlags: Math.max(0, Math.floor(rel.rci) - 4), // Mock: higher RCI = more flags
    lastReviewDate: '2024-05-15',
    nextDueDate: '2024-12-31',
    daysToDue: Math.floor(Math.random() * 60) + 1, // Mock: 1-60 days
    riskStatus: rel.rci > 7 ? 'Critical' : rel.rci > 5 ? 'Moderate' : 'Low'
  }))
})

// Add helper method for status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'Critical': return 'bg-red-100 text-red-800'
    case 'Moderate': return 'bg-yellow-100 text-yellow-800'
    case 'Low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Add after other chart data
const revenueTypeLegend = [
  { label: 'Loan Fee', color: '#ABE3C4' },
  { label: 'TMS Fee', color: '#577564' },
  { label: 'NII', color: '#6A8E7C' },
  { label: 'Loan NII', color: '#122A2C' }
]
const selectedRevenueRelationship = ref('all')
const revenueTypeActiveLegends = ref(revenueTypeLegend.map(t => t.label))
const toggleRevenueTypeLegend = (label) => {
  if (revenueTypeActiveLegends.value.includes(label)) {
    revenueTypeActiveLegends.value = revenueTypeActiveLegends.value.filter(l => l !== label)
  } else {
    revenueTypeActiveLegends.value.push(label)
  }
}
// Mock revenue data by type per relationship per month
const revenueTypeData = computed(() => {
  // 12 months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return date.toLocaleDateString('en-US', { month: 'short' })
  })
  // For each relationship, generate revenue by type
  return sortedRelationships.value.map((rel, idx) => {
    const base = rel.revenue / 12
    return {
      id: rel.id,
      name: rel.name,
      industry: rel.industry,
      months,
      data: months.map(() => ({
        'Loan Fee': Math.floor(base * 0.25 * (0.9 + Math.random() * 0.2)),
        'TMS Fee': Math.floor(base * 0.18 * (0.9 + Math.random() * 0.2)),
        'NII': Math.floor(base * 0.32 * (0.9 + Math.random() * 0.2)),
        'Loan NII': Math.floor(base * 0.25 * (0.9 + Math.random() * 0.2)),
      }))
    }
  })
})
// Chart data for stacked bar
const revenueTypeStackedChartData = computed(() => {
  const rels = selectedRevenueRelationship.value === 'all'
    ? revenueTypeData.value
    : revenueTypeData.value.filter(r => r.id === selectedRevenueRelationship.value)
  if (!rels.length) return null
  const months = rels[0].months
  // For each revenue type, sum across relationships (if all), or just one
  return {
    labels: months,
    datasets: revenueTypeLegend
      .filter(type => revenueTypeActiveLegends.value.includes(type.label))
      .map(type => ({
        label: type.label,
        backgroundColor: type.color,
        data: months.map((_, i) => rels.reduce((sum, rel) => sum + rel.data[i][type.label], 0))
      }))
  }
})
const revenueTypeStackedChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
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
// Table helpers
const revenueSummaryRelationships = computed(() => {
  return selectedRevenueRelationship.value === 'all'
    ? sortedRelationships.value
    : sortedRelationships.value.filter(r => r.id === selectedRevenueRelationship.value)
})
const getRelationshipTotalRevenue = (rel) => {
  // Sum all types for all months
  const relData = revenueTypeData.value.find(r => r.id === rel.id)
  if (!relData) return 0
  return relData.data.reduce((sum, month) => sum + Object.values(month).reduce((s, v) => s + v, 0), 0)
}
const getRelationshipRevenueByType = (rel, type) => {
  const relData = revenueTypeData.value.find(r => r.id === rel.id)
  if (!relData) return 0
  return relData.data.reduce((sum, month) => sum + (month[type] || 0), 0)
}

// Add helper for relationship type
const getRelationshipType = (rel) => {
  const hasDeposits = rel.deposits > 0
  const hasLoans = rel.loans > 0
  if (hasDeposits && hasLoans) return 'Deposit and Loan Relationship'
  if (hasDeposits) return 'Deposit Only'
  if (hasLoans) return 'Loan Only'
  return 'No Products'
}
const getRelationshipTypeClass = (type) => {
  switch (type) {
    case 'Deposit and Loan Relationship': return 'bg-green-100 text-green-800'
    case 'Deposit Only': return 'bg-blue-100 text-blue-800'
    case 'Loan Only': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Add helper in <script setup>
const isNewRelationship = (rel) => {
  // Mock logic: new if depositsDelta > 0 or loansDelta > 0
  return rel.depositsDelta > 0 || rel.loansDelta > 0
}

onMounted(() => {
  console.log('RelationshipManagerView mounted for RM:', props.rmId)
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
</style>