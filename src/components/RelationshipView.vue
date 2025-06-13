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
            <div class="text-sm text-gray-600">Relationships</div>
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

      <!-- Portfolio Growth & Risk Trends Analysis -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">📊 Portfolio Growth & Risk Evolution</h3>
              <p class="text-sm text-gray-500 mt-1">Track portfolio performance and risk trends over time</p>
            </div>
            <div class="flex space-x-2">
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
        <div class="p-6">
          <!-- Growth & Risk Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="text-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div class="text-2xl font-bold text-green-600">{{ portfolioGrowthYoY }}%</div>
              <div class="text-sm text-gray-600">Portfolio Growth YoY</div>
              <div class="text-xs" :class="portfolioGrowthYoY > 0 ? 'text-green-500' : 'text-red-500'">
                {{ portfolioGrowthYoY > 0 ? '📈 Growing' : '📉 Declining' }}
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ formatCurrency(portfolioGrowthAmount) }} added</div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div class="text-2xl font-bold text-blue-600">{{ portfolioGrowthMoM }}%</div>
              <div class="text-sm text-gray-600">Portfolio Growth MoM</div>
              <div class="text-xs" :class="portfolioGrowthMoM > 0 ? 'text-green-500' : 'text-red-500'">
                {{ portfolioGrowthMoM > 0 ? '📈 Growing' : '📉 Declining' }}
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ formatCurrency(portfolioGrowthAmountMoM) }} this month</div>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div class="text-2xl font-bold text-orange-600">{{ riskFlagGrowthYoY }}%</div>
              <div class="text-sm text-gray-600">Risk Flags Growth YoY</div>
              <div class="text-xs"
                :class="riskFlagGrowthYoY > 0 ? 'text-red-500' : riskFlagGrowthYoY < 0 ? 'text-green-500' : 'text-gray-500'">
                {{ riskFlagGrowthYoY > 0 ? '⚠️ Increasing' : riskFlagGrowthYoY < 0 ? '✅ Decreasing' : '➖ No Change' }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ riskFlagGrowthCount }} new flags</div>
              </div>
              <div class="text-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div class="text-2xl font-bold text-red-600">{{ riskFlagGrowthMoM }}%</div>
                <div class="text-sm text-gray-600">Risk Flags Growth MoM</div>
                <div class="text-xs"
                  :class="riskFlagGrowthMoM > 0 ? 'text-red-500' : riskFlagGrowthMoM < 0 ? 'text-green-500' : 'text-gray-500'">
                  {{ riskFlagGrowthMoM > 0 ? '⚠️ Increasing' : riskFlagGrowthMoM < 0 ? '✅ Decreasing' : '➖ No Change' }}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">{{ riskFlagGrowthCountMoM }} this month</div>
                </div>
              </div>

              <!-- Trend Charts -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Portfolio Value Trend -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-md font-medium text-gray-900">💰 Portfolio Value Trend</h4>
                    <span class="text-xs text-gray-500">Last 12 months</span>
                  </div>
                  <div class="h-64 bg-white rounded p-4">
                    <div class="h-full flex flex-col">
                      <!-- Portfolio trend chart -->
                      <div class="flex-1 relative">
                        <!-- Y-axis labels -->
                        <div
                          class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-3 py-2">
                          <span>{{ formatChartValue(maxPortfolioValue) }}</span>
                          <span>{{ formatChartValue(maxPortfolioValue * 0.75) }}</span>
                          <span>{{ formatChartValue(maxPortfolioValue * 0.5) }}</span>
                          <span>{{ formatChartValue(maxPortfolioValue * 0.25) }}</span>
                          <span>0</span>
                        </div>

                        <!-- Line chart area -->
                        <div class="ml-12 h-full flex flex-col">
                          <div class="flex-1 relative">
                            <svg class="w-full h-full">
                              <polyline :points="portfolioTrendPoints" fill="none" stroke="#10B981" stroke-width="3"
                                stroke-linecap="round" stroke-linejoin="round" />
                              <circle v-for="(point, index) in portfolioTrendPointsArray" :key="index" :cx="point.x"
                                :cy="point.y" r="4" fill="#10B981" class="cursor-pointer"
                                :title="`${trendMonths[index]}: ${formatCurrency(getPortfolioValueForMonth(index))}`" />
                            </svg>
                          </div>
                          <!-- X-axis labels -->
                          <div class="flex justify-between mt-2">
                            <div v-for="month in trendMonths.filter((_, i) => i % 2 === 0)" :key="month"
                              class="text-xs text-gray-500">{{ month }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Risk Flags Trend -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-md font-medium text-gray-900">🚨 Risk Flags by Month</h4>
                    <span class="text-xs text-gray-500">Monthly risk flag count</span>
                  </div>
                  <div class="h-64 bg-white rounded p-4">
                    <div class="h-full flex flex-col">
                      <div class="flex-1 relative">
                        <!-- Y-axis labels -->
                        <div
                          class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-3 py-2">
                          <span>{{ maxRiskFlags }}</span>
                          <span>{{ Math.floor(maxRiskFlags * 0.75) }}</span>
                          <span>{{ Math.floor(maxRiskFlags * 0.5) }}</span>
                          <span>{{ Math.floor(maxRiskFlags * 0.25) }}</span>
                          <span>0</span>
                        </div>

                        <!-- Bar chart -->
                        <div class="ml-12 h-full flex items-end space-x-1">
                          <div v-for="(month, index) in trendMonths" :key="month"
                            class="flex-1 flex flex-col items-center">
                            <div
                              class="w-full bg-red-500 rounded-t transition-all duration-300 hover:bg-red-600 cursor-pointer"
                              :style="{ height: getRiskFlagBarHeight(index) + 'px' }"
                              :title="`${month}: ${getRiskFlagsForMonth(index)} risk flags`">
                            </div>
                          </div>
                        </div>
                        <!-- X-axis labels -->
                        <div class="flex justify-between mt-2">
                          <div v-for="month in trendMonths.filter((_, i) => i % 2 === 0)" :key="month"
                            class="text-xs text-gray-500">{{ month }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Key Insights -->
              <div class="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 class="text-md font-medium text-gray-900 mb-3">🔍 Key Insights</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div class="space-y-2">
                    <div class="flex items-start space-x-2">
                      <span class="text-green-600">✓</span>
                      <span>Portfolio grew by <strong>{{ formatCurrency(portfolioGrowthAmount) }}</strong> over the past
                        year</span>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span
                        :class="riskFlagGrowthYoY > 0 ? 'text-red-600' : riskFlagGrowthYoY < 0 ? 'text-green-600' : 'text-gray-600'">
                        {{ riskFlagGrowthYoY > 0 ? '⚠' : riskFlagGrowthYoY < 0 ? '✓' : '➖' }} </span>
                          <span>Risk flags {{ riskFlagGrowthYoY > 0 ? 'increased' : riskFlagGrowthYoY < 0 ? 'decreased'
                            : 'remained unchanged' }} <strong>{{ riskFlagGrowthYoY === 0 ? '' : 'by ' +
                                Math.abs(riskFlagGrowthYoY) + '%' }}</strong> YoY</span>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-start space-x-2">
                      <span :class="portfolioGrowthMoM > 0 ? 'text-green-600' : 'text-red-600'">
                        {{ portfolioGrowthMoM > 0 ? '📈' : '📉' }}
                      </span>
                      <span>Monthly growth rate: <strong>{{ portfolioGrowthMoM }}%</strong></span>
                    </div>
                    <div class="flex items-start space-x-2">
                      <span class="text-blue-600">ℹ</span>
                      <span>Risk-to-growth ratio: <strong>{{ riskToGrowthRatio }}</strong></span>
                    </div>
                  </div>
                </div>
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
                  <div class="text-xs text-blue-500">{{ Math.round((highRiskClientCount / relationshipClients.length) *
                    100)
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
                  <div class="text-xs text-yellow-500 font-medium">{{ utrPercentile }}{{ getOrdinalSuffix(utrPercentile)
                  }}
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
                <div class="h-80 bg-white rounded p-4">
                  <!-- Risk Transaction Chart -->
                  <div class="h-full flex flex-col">
                    <!-- Legend -->
                    <div class="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
                      <div v-for="(type, index) in riskTransactionTypes.slice(0, 12)" :key="type"
                        class="flex items-center space-x-1">
                        <div class="w-3 h-3 rounded" :class="getRiskTypeColor(index)"></div>
                        <span class="text-gray-600">{{ type }}</span>
                      </div>
                    </div>

                    <!-- Chart Area -->
                    <div class="flex-1 relative">
                      <!-- Y-axis labels -->
                      <div
                        class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-3 py-2">
                        <span>{{ formatChartValue(maxChartValue) }}</span>
                        <span>{{ formatChartValue(maxChartValue * 0.75) }}</span>
                        <span>{{ formatChartValue(maxChartValue * 0.5) }}</span>
                        <span>{{ formatChartValue(maxChartValue * 0.25) }}</span>
                        <span>0</span>
                      </div>

                      <!-- Chart bars -->
                      <div class="ml-12 h-full flex flex-col">
                        <div class="flex-1 flex items-end space-x-1">
                          <div v-for="(month, monthIndex) in chartMonths" :key="month"
                            class="flex-1 flex flex-col items-center">
                            <!-- Stacked bars -->
                            <div class="w-full flex flex-col-reverse bg-gray-100 rounded-t"
                              :style="{ height: 'calc(100% - 40px)', minHeight: '200px' }">
                              <div v-for="(type, typeIndex) in riskTransactionTypes" :key="type"
                                class="w-full transition-all duration-300 hover:opacity-80 cursor-pointer"
                                :class="getRiskTypeColor(typeIndex)"
                                :style="{ height: getBarHeight(monthIndex, typeIndex) + 'px' }"
                                :title="`${type}: ${formatCurrency(getRiskTransactionAmount(monthIndex, typeIndex))}`">
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- X-axis labels -->
                        <div class="flex space-x-1 mt-2">
                          <div v-for="month in chartMonths" :key="month" class="flex-1 text-center">
                            <div class="text-xs text-gray-500 transform rotate-0">{{ month }}</div>
                          </div>
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio
                      Value</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposits
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loans
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk
                      Score
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk
                      Flags
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opportunities
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
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
                      <span class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="getRiskScoreClass(client.riskScore)">
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
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getRiskScoreClass(client.riskScore)">
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
    const trendPeriod = ref('monthly')

    return {
      clientViewType,
      riskChartPeriod,
      trendPeriod
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
    }
  }
}
</script>