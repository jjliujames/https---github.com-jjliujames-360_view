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
              <h1 class="text-2xl font-bold text-gray-900">{{ clientData?.name || 'Client Profile' }}</h1>
              <p class="text-gray-600 mt-1">{{ breadcrumb }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-2">
            <button @click="clientAction('generate-report')"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <!-- Left Column - Client Profile, Product Summary, Risk Assessment -->
        <div class="lg:col-span-1 space-y-6">

          <!-- Client Profile -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-xl font-medium text-gray-700">
                    {{clientData?.name?.split(' ').map(n => n[0]).join('') || 'N/A'}}
                  </span>
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">{{ clientData?.name || 'N/A' }}</h2>
                  <span class="px-3 py-1 text-sm font-medium rounded-full" :class="getTierBadgeClass(clientTier)">
                    {{ clientTier }}
                  </span>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <p class="text-sm font-medium text-gray-500">Industry</p>
                  <p class="text-sm text-gray-900">{{ clientData?.industry || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Location</p>
                  <p class="text-sm text-gray-900">{{ clientData?.location || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">RM No</p>
                  <p class="text-sm text-gray-900">{{ relationshipManager?.id || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Relationship Manager</p>
                  <p class="text-sm text-gray-900">{{ relationshipManager?.name || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Product & Relationship Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Product & Relationship</h3>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Accounts</span>
                <span class="text-sm font-medium">{{ totalAccounts }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Balance</span>
                <span class="text-sm font-medium">{{ formatCurrency(totalBalance) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Annual Revenue</span>
                <span class="text-sm font-medium">{{ formatCurrency(clientData?.annualRevenue || 0) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Relationship Length</span>
                <span class="text-sm font-medium">{{ clientData?.relationshipYears || 0 }} years</span>
              </div>
              <div class="pt-2 border-t border-gray-100">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600">Product Penetration</span>
                  <span class="text-sm font-medium">{{ clientData?.productPenetration || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div class="bg-blue-500 h-2 rounded-full"
                    :style="{ width: (clientData?.productPenetration || 0) + '%' }"></div>
                </div>

                <!-- AI Product Recommendations -->
                <div class="mt-4 pt-3 border-t border-gray-100">
                  <div class="flex items-center justify-between mb-3">
                    <h5 class="text-sm font-medium text-gray-900">🤖 AI Recommendations</h5>
                    <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">ML Powered</span>
                  </div>
                  <div class="space-y-2">
                    <div v-for="recommendation in aiRecommendations" :key="recommendation.product"
                      class="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div class="flex-1">
                        <div class="text-sm font-medium text-blue-900">{{ recommendation.product }}</div>
                        <div class="text-xs text-blue-600">{{ recommendation.reason }}</div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <div class="text-right">
                          <div class="text-xs font-medium text-green-700">{{ recommendation.confidence }}%</div>
                          <div class="text-xs text-gray-500">{{ formatCurrency(recommendation.potentialRevenue) }}</div>
                        </div>
                        <button @click="acceptRecommendation(recommendation)"
                          class="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related party -->
          <div
            v-if="clientData?.beneficialOwners || clientData?.authorizedSigners || clientData?.conductors || clientData?.relatedEntities"
            class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Related party</h3>
              <p class="text-sm text-gray-500 mt-1">Beneficial ownership, authorized signers, and business conductors
              </p>
            </div>
            <div class="p-6">
              <!-- Beneficial Owners -->
              <div v-if="clientData?.beneficialOwners" class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 mb-3">💎 Beneficial Owners</h4>
                <div class="space-y-2">
                  <div v-for="owner in clientData.beneficialOwners" :key="owner.name"
                    class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div class="text-sm font-medium text-blue-900">{{ owner.name }}</div>
                      <div class="text-xs text-blue-500">ID: {{ generateNineDigitId(owner.id || owner.name, 'BO') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Authorized Signers -->
              <div v-if="clientData?.authorizedSigners" class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 mb-3">✍️ Authorized Signers</h4>
                <div class="space-y-2">
                  <div v-for="signer in clientData.authorizedSigners" :key="signer.name"
                    class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div class="text-sm font-medium text-green-900">{{ signer.name }}</div>
                      <div class="text-xs text-green-500">ID: {{ generateNineDigitId(signer.id || signer.name, 'SIG') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Business Conductors -->
              <div v-if="clientData?.conductors" class="mb-6">
                <h4 class="text-sm font-medium text-gray-900 mb-3">🎯 Business Conductors</h4>
                <div class="space-y-2">
                  <div v-for="conductor in clientData.conductors" :key="conductor.name"
                    class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div class="text-sm font-medium text-purple-900">{{ conductor.name }}</div>
                      <div class="text-xs text-purple-500">ID: {{ generateNineDigitId(conductor.id || conductor.name,
                        'CON') }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Related Entities -->
              <div v-if="clientData?.relatedEntities">
                <h4 class="text-sm font-medium text-gray-900 mb-3">🏢 Related Entities</h4>
                <div class="space-y-2">
                  <div v-for="entity in clientData.relatedEntities" :key="entity.name"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ entity.name }}</div>
                      <div class="text-xs text-gray-500">ID: {{ generateNineDigitId(entity.id || entity.name, 'ENT') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column - Charts and Analysis -->
        <div class="lg:col-span-3 space-y-8">

          <!-- Account Portfolio Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">💼 Account Portfolio Summary</h3>
                  <p class="text-sm text-gray-500 mt-1">Client account breakdown with drill-down capability</p>
                </div>
                <div class="flex space-x-2">
                  <button @click="accountViewType = 'cards'"
                    :class="['px-3 py-1 text-xs rounded-full', accountViewType === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                    Card View
                  </button>
                  <button @click="accountViewType = 'table'"
                    :class="['px-3 py-1 text-xs rounded-full', accountViewType === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']">
                    Table View
                  </button>
                </div>
              </div>
            </div>
            <div class="p-6">
              <!-- Account Summary Metrics -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <p class="text-sm text-blue-600 font-medium">Total Accounts</p>
                  <p class="text-2xl font-bold text-blue-900">{{ accountDetails.length }}</p>
                  <p class="text-xs text-blue-600">{{ activeAccountsCount }} active</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                  <p class="text-sm text-green-600 font-medium">Total Deposits</p>
                  <p class="text-2xl font-bold text-green-900">{{ formatCurrency(totalDeposits) }}</p>
                  <p class="text-xs text-green-600">Across all accounts</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                  <p class="text-sm text-orange-600 font-medium">Opportunity</p>
                  <p class="text-2xl font-bold text-orange-900">{{ formatCurrency(productRecommendationVolume) }}</p>
                  <p class="text-xs text-orange-600">Product recommendation volume</p>
                </div>
                <div class="bg-red-50 p-4 rounded-lg">
                  <p class="text-sm text-red-600 font-medium">High Risk Accounts</p>
                  <p class="text-2xl font-bold text-red-900">{{ highRiskAccountsCount }}</p>
                  <p class="text-xs text-red-600">Require attention</p>
                </div>
              </div>

              <!-- Account Cards View -->
              <div v-if="accountViewType === 'cards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div v-for="account in accountDetails" :key="account.id"
                  class="account-card bg-gradient-to-br border rounded-lg p-4 hover:shadow-md transition-all relative group"
                  :class="getAccountCardClass(account.type)">
                  <!-- Account Header -->
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <h4 class="text-sm font-medium text-gray-900">{{ account.name }}</h4>
                        <span v-if="account.riskLevel === 'High'"
                          class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      </div>
                      <p class="text-xs text-gray-500">{{ account.type }} • ****{{ account.number.slice(-4) }}</p>
                    </div>
                    <div class="text-right">
                      <span class="text-lg font-bold" :class="getAccountBalanceColor(account.balance)">
                        {{ formatCurrency(account.balance) }}
                      </span>
                      <!-- Contextual Menu -->
                      <div class="relative">
                        <button @click="toggleAccountMenu(account.id)"
                          class="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <!-- Dropdown Menu -->
                        <div v-if="openMenus[account.id]" @click.stop
                          class="absolute right-0 top-6 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div class="py-1">
                            <button @click="quickAction('view-transactions', account)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              📊 View Transactions
                            </button>
                            <button @click="quickAction('generate-statement', account)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              📄 Generate Statement
                            </button>
                            <button @click="quickAction('flag-review', account)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              🚩 Flag for Review
                            </button>
                            <button @click="quickAction('create-task', account)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              ✅ Create Task
                            </button>
                            <button @click="quickAction('freeze-account', account)"
                              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              ❄️ Freeze Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Account Metrics -->
                  <div class="space-y-2 mb-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Monthly Volume:</span>
                      <span class="font-medium">{{ formatCurrency(account.monthlyVolume) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Last Activity:</span>
                      <span class="text-gray-500">{{ formatDate(account.lastTransaction) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Risk Level:</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        :class="getRiskLevelClass(account.riskLevel)">
                        {{ account.riskLevel }}
                        <span v-if="account.riskLevel === 'High'" class="ml-1">⚠️</span>
                      </span>
                    </div>
                  </div>

                  <!-- Quick Action Buttons -->
                  <div class="grid grid-cols-3 gap-2">
                    <button @click="quickAction('view-transactions', account)"
                      class="text-xs py-1.5 px-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                      Trx
                    </button>
                    <button @click="quickAction('create-task', account)"
                      class="text-xs py-1.5 px-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors">
                      Create Task
                    </button>
                    <button @click="quickAction('flag-review', account)"
                      class="text-xs py-1.5 px-2 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition-colors">
                      Flag Review
                    </button>
                  </div>
                </div>
              </div>

              <!-- Account Table View -->
              <div v-if="accountViewType === 'table'" class="overflow-x-auto mb-6">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Volume</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk
                        Level</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last
                        Activity</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="account in accountDetails" :key="account.id" class="hover:bg-gray-50 cursor-pointer"
                      @click="drillDownToAccount(account)">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ account.name }}</div>
                          <div class="text-sm text-gray-500">****{{ account.number.slice(-4) }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="getAccountTypeClass(account.type)">
                          {{ account.type }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        :class="getAccountBalanceColor(account.balance)">
                        {{ formatCurrency(account.balance) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        {{ formatCurrency(account.monthlyVolume) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="getRiskLevelClass(account.riskLevel)">
                          {{ account.riskLevel }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(account.lastTransaction) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button class="text-blue-600 hover:text-blue-800">View</button>
                        <span class="mx-2 text-gray-300">|</span>
                        <button class="text-gray-600 hover:text-gray-800">History</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Product Summary (if enhanced data is available) -->
          <div v-if="clientData?.productSummary" class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">🏦 Product Portfolio Summary</h3>
              <p class="text-sm text-gray-500 mt-1">Revenue and account breakdown by product line</p>
            </div>
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="border-b border-gray-200">
                      <th class="text-left text-sm font-medium text-gray-500 pb-3">Product</th>
                      <th class="text-right text-sm font-medium text-gray-500 pb-3">Accounts</th>
                      <th class="text-right text-sm font-medium text-gray-500 pb-3">Balance</th>
                      <th class="text-right text-sm font-medium text-gray-500 pb-3">Revenue</th>
                    </tr>
                  </thead>
                  <tbody class="space-y-2">
                    <tr v-for="(product, key) in clientData.productSummary" :key="key" class="border-b border-gray-100">
                      <td class="text-sm font-medium text-gray-900 py-3 capitalize">{{ key }}</td>
                      <td class="text-sm text-gray-900 py-3 text-right">{{ product.accounts }}</td>
                      <td class="text-sm text-gray-900 py-3 text-right">{{ formatCurrency(product.balance) }}</td>
                      <td class="text-sm text-gray-900 py-3 text-right">{{ formatCurrency(product.revenue) }}</td>
                    </tr>
                    <tr class="border-t-2 border-gray-300 font-medium">
                      <td class="text-sm text-gray-900 py-3">Total</td>
                      <td class="text-sm text-gray-900 py-3 text-right">
                        {{Object.values(clientData.productSummary).reduce((sum, p) => sum + p.accounts, 0)}}
                      </td>
                      <td class="text-sm text-gray-900 py-3 text-right">
                        {{formatCurrency(Object.values(clientData.productSummary).reduce((sum, p) => sum + p.balance,
                          0))}}
                      </td>
                      <td class="text-sm text-gray-900 py-3 text-right">
                        {{formatCurrency(Object.values(clientData.productSummary).reduce((sum, p) => sum + p.revenue,
                          0))}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Transaction Volume Trends -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">💳 Transaction Volume Analysis</h3>
                  <p class="text-sm text-gray-500 mt-1">Monthly transaction flows by category (inflows positive,
                    outflows negative)</p>
                </div>
                <div class="flex space-x-2">
                  <button @click="showTransactionModal = true"
                    class="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors">View
                    Trx</button>
                  <button class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Pattern Review</button>
                  <button class="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">Normal Range</button>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="h-80">
                <BarChart v-if="transactionVolumeData" :data="transactionVolumeData" />
              </div>
              <div class="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div class="text-center p-3 bg-green-50 rounded-lg">
                  <p class="text-green-600 font-medium">Total Inflows</p>
                  <p class="text-xl font-bold text-green-900">$2.8M</p>
                  <p class="text-xs text-green-600">+12% vs last month</p>
                </div>
                <div class="text-center p-3 bg-red-50 rounded-lg">
                  <p class="text-red-600 font-medium">Total Outflows</p>
                  <p class="text-xl font-bold text-red-900">$2.1M</p>
                  <p class="text-xs text-red-600">+8% vs last month</p>
                </div>
                <div class="text-center p-3 bg-blue-50 rounded-lg">
                  <p class="text-blue-600 font-medium">Net Flow</p>
                  <p class="text-xl font-bold text-blue-900">$0.7M</p>
                  <p class="text-xs text-blue-600">Positive trend</p>
                </div>
                <div class="text-center p-3 bg-yellow-50 rounded-lg">
                  <p class="text-yellow-600 font-medium">Risk Percentile</p>
                  <p class="text-xl font-bold text-yellow-900">85th</p>
                  <p class="text-xs text-yellow-600">Above normal</p>
                </div>
              </div>
              <div class="mt-4 flex justify-center flex-wrap gap-4 text-sm">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-gray-600">Inbound Flows</span>
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span class="text-gray-600">Outbound Flows</span>
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span class="text-gray-600">Risk Percentile</span>
                </div>
              </div>
            </div>
          </div>



          <!-- Risk Flag Distribution -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">⚠️ Risk Flag Distribution</h3>
              <p class="text-sm text-gray-500 mt-1">Breakdown of active risk flags by category and severity</p>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="h-64">
                  <DoughnutChart v-if="riskFlagDistributionData" :data="riskFlagDistributionData" />
                </div>
                <div class="space-y-4">
                  <div v-for="flag in riskFlagSummary" :key="flag.category"
                    class="flex items-center justify-between p-4 border rounded-lg"
                    :class="getRiskFlagBorderClass(flag.severity)">
                    <div class="flex items-center space-x-3">
                      <div :class="['w-4 h-4 rounded-full', flag.color]"></div>
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ flag.category }}</p>
                        <p class="text-xs text-gray-600">{{ flag.severity }} risk level</p>
                        <p class="text-xs text-gray-500 mt-1">{{ flag.description }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-gray-900">{{ flag.count }} flags</p>
                      <p class="text-xs text-gray-500">{{ flag.percentage }}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm">
                <div class="text-center p-3 bg-red-50 rounded-lg">
                  <p class="text-red-600 font-medium">Critical</p>
                  <p class="text-xl font-bold text-red-900">{{riskFlagSummary.filter(f => f.severity ===
                    'Critical').reduce((sum, f) => sum + f.count, 0)}}</p>
                  <p class="text-xs text-red-600">Immediate action required</p>
                </div>
                <div class="text-center p-3 bg-orange-50 rounded-lg">
                  <p class="text-orange-600 font-medium">Review</p>
                  <p class="text-xl font-bold text-orange-900">{{riskFlagSummary.filter(f => f.severity ===
                    'Review').reduce((sum, f) => sum + f.count, 0)}}</p>
                  <p class="text-xs text-orange-600">Enhanced monitoring</p>
                </div>
                <div class="text-center p-3 bg-yellow-50 rounded-lg">
                  <p class="text-yellow-600 font-medium">Watch</p>
                  <p class="text-xl font-bold text-yellow-900">{{riskFlagSummary.filter(f => f.severity ===
                    'Watch').reduce((sum, f) => sum + f.count, 0)}}</p>
                  <p class="text-xs text-yellow-600">Routine monitoring</p>
                </div>
                <div class="text-center p-3 bg-blue-50 rounded-lg">
                  <p class="text-blue-600 font-medium">Total</p>
                  <p class="text-xl font-bold text-blue-900">{{ clientData?.riskFlags?.length || 0 }}</p>
                  <p class="text-xs text-blue-600">All active flags</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Risk Flag Analysis -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">🚩 Risk Flag Timeline</h3>
              <p class="text-sm text-gray-500 mt-1">Historical risk flag activity and trends</p>
            </div>
            <div class="p-6">
              <div class="h-64 mb-8">
                <LineChart v-if="riskTimelineData" :data="riskTimelineData" />
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="text-center p-4 bg-red-50 rounded-lg">
                  <p class="text-2xl font-bold text-red-600">{{ clientData?.riskFlags?.length || 0 }}</p>
                  <p class="text-sm text-red-600 font-medium">Active Flags</p>
                  <p class="text-xs text-gray-500 mt-1">Requires attention</p>
                </div>
                <div class="text-center p-4 bg-orange-50 rounded-lg">
                  <p class="text-2xl font-bold text-orange-600">7</p>
                  <p class="text-sm text-orange-600 font-medium">Resolved This Month</p>
                  <p class="text-xs text-gray-500 mt-1">Good progress</p>
                </div>
                <div class="text-center p-4 bg-green-50 rounded-lg">
                  <p class="text-2xl font-bold text-green-600">89%</p>
                  <p class="text-sm text-green-600 font-medium">Resolution Rate</p>
                  <p class="text-xs text-gray-500 mt-1">Above average</p>
                </div>
              </div>
            </div>
          </div>



          <!-- Rankings & Performance (if enhanced data is available) -->
          <div v-if="clientData?.rankings" class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">📊 Client Rankings & Performance</h3>
              <p class="text-sm text-gray-500 mt-1">Comparative performance metrics across portfolio</p>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(ranking, key) in clientData.rankings" :key="key"
                  class="text-center p-4 bg-gray-50 rounded-lg">
                  <p class="text-sm font-medium text-gray-700 capitalize">{{ key }} Rank</p>
                  <p class="text-2xl font-bold text-gray-900">#{{ ranking.rank }}</p>
                  <p class="text-sm text-blue-600">{{ ranking.percentile }}th percentile</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Insights (if enhanced data is available) -->
          <div v-if="clientData?.keyInsights" class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">💡 Key Insights & Opportunities</h3>
              <p class="text-sm text-gray-500 mt-1">AI-generated insights and recommendations</p>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div v-for="(insight, index) in clientData.keyInsights" :key="index"
                  class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                  </div>
                  <p class="text-sm text-blue-900">{{ insight }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div v-if="showTransactionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showTransactionModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden mx-4">
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">💳 Transaction Details</h3>
              <p class="text-sm text-gray-600 mt-1">{{ clientData?.name || 'Client' }} - Individual Transaction History
              </p>
            </div>
            <button @click="showTransactionModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Date Range Filters -->
          <div class="mt-4 flex flex-wrap items-center gap-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">From:</label>
              <input v-model="transactionFilters.startDate" type="date"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">To:</label>
              <input v-model="transactionFilters.endDate" type="date"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Type:</label>
              <select v-model="transactionFilters.type"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="transfer">Transfers</option>
                <option value="wire">Wires</option>
                <option value="ach">ACH</option>
                <option value="check">Checks</option>
              </select>
            </div>
            <button @click="loadTransactions"
              class="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
            <button @click="resetFilters"
              class="px-4 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors">
              Reset
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <!-- Transaction Summary -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-green-600 font-medium">Total Inflows</p>
              <p class="text-xl font-bold text-green-900">{{ formatCurrency(transactionSummary.totalInflows) }}</p>
              <p class="text-xs text-green-600">{{ transactionSummary.inflowCount }} transactions</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="text-sm text-red-600 font-medium">Total Outflows</p>
              <p class="text-xl font-bold text-red-900">{{ formatCurrency(transactionSummary.totalOutflows) }}</p>
              <p class="text-xs text-red-600">{{ transactionSummary.outflowCount }} transactions</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-blue-600 font-medium">Net Amount</p>
              <p class="text-xl font-bold text-blue-900">{{ formatCurrency(transactionSummary.netAmount) }}</p>
              <p class="text-xs text-blue-600">{{ transactionSummary.totalCount }} total transactions</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600 font-medium">Average Amount</p>
              <p class="text-xl font-bold text-gray-900">{{ formatCurrency(transactionSummary.averageAmount) }}</p>
              <p class="text-xs text-gray-600">Per transaction</p>
            </div>
          </div>

          <!-- Transaction Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in paginatedTransactions" :key="transaction.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm text-gray-900">{{ formatDate(transaction.date) }}</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getTransactionTypeClass(transaction.type)">
                      {{ transaction.type }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ transaction.description }}</td>
                  <td class="px-4 py-3 text-sm text-gray-600">{{ transaction.account }}</td>
                  <td class="px-4 py-3 text-sm text-right font-medium"
                    :class="transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ formatCurrency(Math.abs(transaction.amount)) }}
                    <span class="text-xs ml-1">{{ transaction.amount >= 0 ? '↗' : '↙' }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(transaction.status)">
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span v-if="transaction.riskFlag"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getRiskFlagClass(transaction.riskFlag)">
                      {{ transaction.riskFlag }}
                    </span>
                    <span v-else class="text-xs text-gray-400">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize,
                filteredTransactions.length) }} of {{ filteredTransactions.length }} transactions
            </div>
            <div class="flex items-center space-x-2">
              <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
                class="px-3 py-1 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <span class="px-3 py-1 text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
              <button @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Task Creation Modal -->
  <div v-if="showTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
      <div class="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Create New Task</h2>
        <button @click="showTaskModal = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6">
        <form @submit.prevent="createTask" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
            <select v-model="newTask.type"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="review">Account Review</option>
              <option value="follow-up">Client Follow-up</option>
              <option value="compliance">Compliance Check</option>
              <option value="meeting">Schedule Meeting</option>
              <option value="documentation">Update Documentation</option>
              <option value="investigation">Risk Investigation</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select v-model="newTask.priority"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input v-model="newTask.title" type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="newTask.description" rows="3"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input v-model="newTask.dueDate" type="date"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Related Account (optional)</label>
            <select v-model="newTask.accountId"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select account...</option>
              <option v-for="account in accountDetails" :key="account.id" :value="account.id">
                {{ account.name }} ({{ account.type }})
              </option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showTaskModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create
              Task</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Notification Toast -->
  <div v-if="showNotification"
    class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd" />
      </svg>
      <span>{{ notificationMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { clients, relationshipManagers, metros, markets, regions, relationships, formatCurrency, getClientById } from '../data/mockData.js'
import BarChart from './charts/BarChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'
import LineChart from './charts/LineChart.vue'

const props = defineProps({
  metroId: { type: String, required: true },
  marketId: { type: String, required: true },
  regionId: { type: String, required: true },
  rmId: { type: String, required: true },
  relationshipId: { type: String, required: false },
  clientId: { type: String, required: true }
})

const router = useRouter()

// Transaction Modal State
const showTransactionModal = ref(false)
const currentPage = ref(1)
const pageSize = 100
const allTransactions = ref([])

// UI State
const accountViewType = ref('cards')
const showBulkActions = ref(false)
const showTaskModal = ref(false)
const showNotification = ref(false)
const notificationMessage = ref('')
const openMenus = ref({})

// Task Creation State
const newTask = ref({
  type: 'review',
  priority: 'medium',
  title: '',
  description: '',
  dueDate: '',
  accountId: ''
})

const transactionFilters = ref({
  startDate: '',
  endDate: '',
  type: ''
})

// Computed properties for data
const clientData = computed(() => {
  return getClientById(props.clientId)
})

const relationshipManager = computed(() => {
  return relationshipManagers.find(rm => rm.id === props.rmId)
})

const breadcrumb = computed(() => {
  const metro = metros.find(m => m.id === props.metroId)
  const market = markets.find(m => m.id === props.marketId)
  const region = regions.find(r => r.id === props.regionId)
  const rm = relationshipManagers.find(r => r.id === props.rmId)

  // Include relationship in breadcrumb for new hierarchy
  if (props.relationshipId) {
    const relationship = relationships[props.rmId]?.find(rel => rel.id === props.relationshipId)
    return `${metro?.name || 'Metro'} > ${market?.name || 'Market'} > ${region?.name || 'Region'} > ${rm?.name || 'RM'} > ${relationship?.name || 'Relationship'} > Client Details`
  }

  return `${metro?.name || 'Metro'} > ${market?.name || 'Market'} > ${region?.name || 'Region'} > ${rm?.name || 'RM'} > Client Details`
})



// Computed values
const totalAccounts = computed(() => {
  if (!clientData.value) return 0
  // Generate mock account count based on portfolio size
  const portfolioValue = clientData.value.portfolioValue || 0
  if (portfolioValue >= 100000000) return Math.floor(Math.random() * 8) + 6 // 6-13 accounts
  if (portfolioValue >= 50000000) return Math.floor(Math.random() * 6) + 4   // 4-9 accounts
  if (portfolioValue >= 10000000) return Math.floor(Math.random() * 4) + 3   // 3-6 accounts
  return Math.floor(Math.random() * 3) + 2                                   // 2-4 accounts
})

const totalBalance = computed(() => {
  if (!clientData.value) return 0
  return clientData.value.portfolioValue || 0
})

const clientTier = computed(() => {
  const balance = totalBalance.value
  if (balance >= 5000000) return 'Commercial'
  return 'Small Business'
})

const riskScore = computed(() => {
  if (!clientData.value) return 0
  if (clientData.value.riskScore) return clientData.value.riskScore

  // Generate risk score based on risk flags and portfolio size
  const flagCount = clientData.value.riskFlags?.length || 0
  const portfolioValue = clientData.value.portfolioValue || 0

  let score = 2.0 // Base score
  score += flagCount * 1.5 // Add 1.5 per risk flag
  if (portfolioValue > 100000000) score += 0.5 // Large portfolios get slight bump

  return Math.min(10, Math.max(1, parseFloat(score.toFixed(1))))
})

// Account Details (Generated based on client portfolio)
const accountDetails = computed(() => {
  if (!clientData.value) return []

  const portfolioValue = clientData.value.portfolioValue || 0
  const accounts = []

  // Generate different account types based on portfolio size
  const accountTypes = [
    { type: 'Business Checking', prefix: 'CHK', balance: 0.15 },
    { type: 'Business Savings', prefix: 'SAV', balance: 0.25 },
    { type: 'Money Market', prefix: 'MM', balance: 0.30 },
    { type: 'Investment Account', prefix: 'INV', balance: 0.20 },
    { type: 'Credit Line', prefix: 'LOC', balance: 0.10 }
  ]

  for (let i = 0; i < totalAccounts.value && i < accountTypes.length; i++) {
    const accountType = accountTypes[i]
    const baseBalance = portfolioValue * accountType.balance
    const balance = baseBalance + (Math.random() - 0.5) * baseBalance * 0.3

    accounts.push({
      id: `acc_${i + 1}`,
      name: `${accountType.type} - ${clientData.value.name}`,
      type: accountType.type,
      number: `${accountType.prefix}${Math.floor(Math.random() * 900000) + 100000}`,
      balance: Math.max(0, balance),
      availableBalance: balance * (0.8 + Math.random() * 0.2),
      monthlyVolume: balance * (0.1 + Math.random() * 0.3),
      monthlyInflows: balance * (0.05 + Math.random() * 0.15),
      monthlyOutflows: balance * (0.03 + Math.random() * 0.12),
      inflowCount: Math.floor(Math.random() * 30) + 10,
      outflowCount: Math.floor(Math.random() * 25) + 8,
      lastTransaction: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      riskLevel: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      riskScore: Math.floor(Math.random() * 40) + 30,
      recentTransactions: [],
      riskFactors: []
    })
  }

  return accounts
})

// Account Summary Computed Properties
const activeAccountsCount = computed(() => {
  return accountDetails.value.filter(acc => acc.balance > 1000).length
})

const totalDeposits = computed(() => {
  return accountDetails.value.reduce((sum, acc) => sum + acc.balance, 0)
})

const totalMonthlyVolume = computed(() => {
  return accountDetails.value.reduce((sum, acc) => sum + acc.monthlyVolume, 0)
})

const highRiskAccountsCount = computed(() => {
  return accountDetails.value.filter(acc => acc.riskLevel === 'High').length
})

const productRecommendationVolume = computed(() => {
  if (!clientData.value) return 0

  // Calculate product recommendation volume based on client profile and portfolio
  const portfolioValue = clientData.value.portfolioValue || 0
  const penetration = clientData.value.productPenetration || 0

  // Generate opportunity volume based on missing products and client size
  const opportunityFactor = (100 - penetration) / 100 // Higher if lower penetration
  const baseOpportunity = portfolioValue * 0.15 // 15% of portfolio as potential

  return Math.floor(baseOpportunity * opportunityFactor)
})

const aiRecommendations = computed(() => {
  if (!clientData.value) return []

  const portfolioValue = clientData.value.portfolioValue || 0
  const penetration = clientData.value.productPenetration || 0
  const industry = clientData.value.industry || ''
  const relationshipYears = clientData.value.relationshipYears || 0
  const tier = clientTier.value

  // AI/ML-based product recommendations based on client profile
  const recommendations = []

  // Treasury Management - High confidence for Commercial clients with high volume
  if (tier === 'Commercial' && portfolioValue > 2000000) {
    recommendations.push({
      product: 'Treasury Management Suite',
      reason: 'High transaction volume suggests need for cash management solutions',
      confidence: 87,
      potentialRevenue: Math.floor(portfolioValue * 0.008), // 0.8% of portfolio
      priority: 'High',
      aiFactors: ['Portfolio size', 'Commercial tier', 'Transaction patterns']
    })
  }

  // Credit Line - Based on industry and relationship length
  if (relationshipYears >= 2 && !industry.includes('Non-Profit')) {
    const creditConfidence = tier === 'Commercial' ? 92 : 78
    recommendations.push({
      product: 'Business Line of Credit',
      reason: `${relationshipYears}+ year relationship with growing transaction volume`,
      confidence: creditConfidence,
      potentialRevenue: Math.floor(portfolioValue * 0.025), // 2.5% of portfolio
      priority: 'Medium',
      aiFactors: ['Relationship tenure', 'Payment history', 'Industry risk']
    })
  }

  // Investment Services - Low penetration but high portfolio
  if (penetration < 40 && portfolioValue > 1000000) {
    recommendations.push({
      product: 'Investment Advisory Services',
      reason: 'Low product penetration with high asset base indicates growth potential',
      confidence: 73,
      potentialRevenue: Math.floor(portfolioValue * 0.015), // 1.5% of portfolio
      priority: 'Medium',
      aiFactors: ['Portfolio concentration', 'Product gaps', 'Wealth management needs']
    })
  }

  // Digital Banking - Based on transaction patterns and business type
  if (industry.includes('Technology') || industry.includes('Retail')) {
    recommendations.push({
      product: 'Digital Banking Platform',
      reason: 'Industry profile suggests high digital adoption likelihood',
      confidence: 84,
      potentialRevenue: Math.floor(portfolioValue * 0.005), // 0.5% of portfolio
      priority: 'Low',
      aiFactors: ['Industry digitization', 'Transaction channels', 'Age demographics']
    })
  }

  // International Services - Based on transaction analysis
  if (Math.random() > 0.6) { // Simulate international activity detection
    recommendations.push({
      product: 'International Trade Finance',
      reason: 'Cross-border transaction patterns detected',
      confidence: 69,
      potentialRevenue: Math.floor(portfolioValue * 0.012), // 1.2% of portfolio
      priority: 'Low',
      aiFactors: ['Wire patterns', 'Currency exposure', 'Trade volumes']
    })
  }

  // Sort by confidence and return top 3
  return recommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3)
})



// Enhanced Transaction Volume Data (Stacked Bar Chart)
const transactionVolumeData = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Generate transaction data by type (amounts in thousands)
  const transactionTypes = {
    // Inflows (positive values)
    'Cash Deposits': months.map(() => Math.floor(Math.random() * 150) + 50),
    'Check Deposits': months.map(() => Math.floor(Math.random() * 250) + 100),
    'ACH In': months.map(() => Math.floor(Math.random() * 200) + 80),
    'Wire In': months.map(() => Math.floor(Math.random() * 300) + 150),

    // Outflows (negative values)
    'Cash Withdrawals': months.map(() => -(Math.floor(Math.random() * 100) + 30)),
    'Check Payments': months.map(() => -(Math.floor(Math.random() * 180) + 70)),
    'ACH Out': months.map(() => -(Math.floor(Math.random() * 220) + 120)),
    'Wire Out': months.map(() => -(Math.floor(Math.random() * 250) + 100))
  }

  const riskPercentile = months.map(() => Math.floor(Math.random() * 20) + 75) // 75-95th percentile

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

const accountDistributionData = computed(() => {
  if (!clientData.value) return null

  // Generate mock account distribution based on portfolio value
  const portfolioValue = clientData.value.portfolioValue || 0
  const accountTypes = {
    'Checking': Math.floor(portfolioValue * 0.15),
    'Savings': Math.floor(portfolioValue * 0.25),
    'Money Market': Math.floor(portfolioValue * 0.20),
    'Certificate of Deposit': Math.floor(portfolioValue * 0.30),
    'Treasury Management': Math.floor(portfolioValue * 0.10)
  }

  return {
    labels: Object.keys(accountTypes),
    datasets: [{
      data: Object.values(accountTypes),
      backgroundColor: [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B', // Yellow
        '#EF4444', // Red
        '#8B5CF6', // Purple
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  }
})

const accountSummary = computed(() => {
  if (!clientData.value) return []

  const portfolioValue = clientData.value.portfolioValue || 0
  const total = totalBalance.value

  // Generate mock account data
  const accountTypes = {
    'Checking': { balance: Math.floor(portfolioValue * 0.15), count: 2 },
    'Savings': { balance: Math.floor(portfolioValue * 0.25), count: 1 },
    'Money Market': { balance: Math.floor(portfolioValue * 0.20), count: 1 },
    'Certificate of Deposit': { balance: Math.floor(portfolioValue * 0.30), count: Math.ceil(totalAccounts.value * 0.4) },
    'Treasury Management': { balance: Math.floor(portfolioValue * 0.10), count: 1 }
  }

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'
  ]

  return Object.entries(accountTypes).map(([type, data], index) => ({
    type,
    balance: data.balance,
    count: data.count,
    percentage: total > 0 ? Math.round((data.balance / total) * 100) : 0,
    color: colors[index % colors.length]
  }))
})

const riskTimelineData = computed(() => {
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })

  const riskFlags = Array.from({ length: 30 }, () => Math.floor(Math.random() * 5))

  return {
    labels: days,
    datasets: [{
      label: 'Risk Flags',
      data: riskFlags,
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }
})

// Risk Flag Distribution Data
const riskFlagSummary = computed(() => {
  if (!clientData.value || !clientData.value.riskFlags) {
    // Generate mock risk flag data matching RM view categories
    const mockFlags = [
      { category: 'Crypto Activity', severity: 'Critical', count: 2, color: 'bg-red-500', description: 'Cryptocurrency transactions or blockchain business' },
      { category: 'High Cash Transactions', severity: 'Critical', count: 4, color: 'bg-red-600', description: 'Cash transactions above threshold' },
      { category: 'Cross-Border Wires', severity: 'Review', count: 3, color: 'bg-orange-500', description: 'International wire transfers to high-risk countries' },
      { category: 'MSB Activity', severity: 'Review', count: 1, color: 'bg-orange-600', description: 'Money Service Business classification' },
      { category: 'Industry Risk', severity: 'Watch', count: 2, color: 'bg-yellow-500', description: 'High-risk industry classification' },
      { category: 'Geographic Risk', severity: 'Watch', count: 1, color: 'bg-yellow-600', description: 'Operations in high-risk jurisdictions' }
    ]

    const total = mockFlags.reduce((sum, flag) => sum + flag.count, 0)
    return mockFlags.map(flag => ({
      ...flag,
      percentage: total > 0 ? Math.round((flag.count / total) * 100) : 0
    }))
  }

  // Process actual risk flags if available
  const flagCounts = {}
  const flagSeverities = {}

  clientData.value.riskFlags.forEach(flag => {
    const category = flag.type || flag.category || 'Other'
    const severity = flag.severity || 'Watch'

    flagCounts[category] = (flagCounts[category] || 0) + (flag.count || 1)
    flagSeverities[category] = severity
  })

  const total = Object.values(flagCounts).reduce((sum, count) => sum + count, 0)
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500']

  return Object.entries(flagCounts).map(([category, count], index) => ({
    category,
    severity: flagSeverities[category],
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    color: colors[index % colors.length]
  }))
})

const riskFlagDistributionData = computed(() => {
  if (!riskFlagSummary.value || riskFlagSummary.value.length === 0) return null

  return {
    labels: riskFlagSummary.value.map(flag => flag.category),
    datasets: [{
      data: riskFlagSummary.value.map(flag => flag.count),
      backgroundColor: riskFlagSummary.value.map(flag => {
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

// Transaction Computed Properties
const filteredTransactions = computed(() => {
  let filtered = allTransactions.value

  if (transactionFilters.value.startDate) {
    const startDate = new Date(transactionFilters.value.startDate)
    filtered = filtered.filter(t => new Date(t.date) >= startDate)
  }

  if (transactionFilters.value.endDate) {
    const endDate = new Date(transactionFilters.value.endDate)
    endDate.setHours(23, 59, 59, 999) // Include the entire end date
    filtered = filtered.filter(t => new Date(t.date) <= endDate)
  }

  if (transactionFilters.value.type) {
    filtered = filtered.filter(t => t.type.toLowerCase().includes(transactionFilters.value.type.toLowerCase()))
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredTransactions.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / pageSize)
})

const transactionSummary = computed(() => {
  const transactions = filteredTransactions.value

  const totalInflows = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const totalOutflows = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const inflowCount = transactions.filter(t => t.amount > 0).length
  const outflowCount = transactions.filter(t => t.amount < 0).length
  const totalCount = transactions.length

  return {
    totalInflows,
    totalOutflows,
    netAmount: totalInflows - totalOutflows,
    averageAmount: totalCount > 0 ? (totalInflows + totalOutflows) / totalCount : 0,
    inflowCount,
    outflowCount,
    totalCount
  }
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getTierBadgeClass = (tier) => {
  switch (tier?.toLowerCase()) {
    case 'commercial': return 'bg-blue-100 text-blue-800'
    case 'small business': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRiskScoreColor = (score) => {
  if (score >= 8) return 'text-red-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-green-600'
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

// New risk flag styling methods for enhanced data structure
const getRiskFlagBgClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-50'
    case 'Review': return 'bg-orange-50'
    case 'Watch': return 'bg-yellow-50'
    default: return 'bg-gray-50'
  }
}

const getRiskFlagDotClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'bg-red-500'
    case 'Review': return 'bg-orange-500'
    case 'Watch': return 'bg-yellow-500'
    default: return 'bg-gray-500'
  }
}

const getRiskFlagTextClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'text-red-800'
    case 'Review': return 'text-orange-800'
    case 'Watch': return 'text-yellow-800'
    default: return 'text-gray-800'
  }
}

const getRiskFlagBadgeClass = (severity) => {
  switch (severity) {
    case 'Critical': return 'text-red-600'
    case 'Review': return 'text-orange-600'
    case 'Watch': return 'text-yellow-600'
    default: return 'text-gray-600'
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

const getRiskScoreBarColor = (score) => {
  if (score >= 8) return 'bg-red-500'
  if (score >= 6) return 'bg-yellow-500'
  return 'bg-green-500'
}

// Transaction Methods
const generateMockTransactions = () => {
  const transactions = []
  const types = ['deposit', 'withdrawal', 'transfer', 'wire', 'ach', 'check']
  const descriptions = {
    deposit: ['Cash Deposit', 'Check Deposit', 'Direct Deposit', 'Mobile Deposit'],
    withdrawal: ['ATM Withdrawal', 'Cash Withdrawal', 'Teller Withdrawal'],
    transfer: ['Internal Transfer', 'Wire Transfer', 'Online Transfer'],
    wire: ['Incoming Wire', 'Outgoing Wire', 'International Wire'],
    ach: ['ACH Credit', 'ACH Debit', 'Payroll ACH', 'Vendor Payment'],
    check: ['Check Payment', 'Cashier Check', 'Certified Check']
  }
  const accounts = ['Checking - ****1234', 'Savings - ****5678', 'Money Market - ****9012']
  const statuses = ['Completed', 'Pending', 'Processed', 'Cleared']
  const riskFlags = ['High Cash', 'Crypto Activity', 'Cross-Border', 'MSB Related', 'Geographic Risk', null, null, null] // Most transactions have no flags

  // Generate transactions for the last 90 days
  for (let i = 0; i < 300; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const isInflow = type === 'deposit' || type === 'ach' || (type === 'wire' && Math.random() > 0.3)
    const amount = isInflow
      ? Math.floor(Math.random() * 50000) + 1000 // $1K - $50K for inflows
      : -(Math.floor(Math.random() * 30000) + 500) // $500 - $30K for outflows

    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 90))

    transactions.push({
      id: `txn-${i + 1}`,
      date: date.toISOString().split('T')[0],
      type: type.charAt(0).toUpperCase() + type.slice(1),
      description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
      account: accounts[Math.floor(Math.random() * accounts.length)],
      amount: amount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      riskFlag: riskFlags[Math.floor(Math.random() * riskFlags.length)]
    })
  }

  return transactions
}

const loadTransactions = () => {
  // Reset pagination when filtering
  currentPage.value = 1

  // In a real app, this would make an API call with the filters
  if (allTransactions.value.length === 0) {
    allTransactions.value = generateMockTransactions()
  }
}

const resetFilters = () => {
  transactionFilters.value.startDate = ''
  transactionFilters.value.endDate = ''
  transactionFilters.value.type = ''
  currentPage.value = 1

  // Set default date range to last 30 days
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)

  transactionFilters.value.endDate = endDate.toISOString().split('T')[0]
  transactionFilters.value.startDate = startDate.toISOString().split('T')[0]
}

const getTransactionTypeClass = (type) => {
  switch (type.toLowerCase()) {
    case 'deposit': return 'bg-green-100 text-green-800'
    case 'withdrawal': return 'bg-red-100 text-red-800'
    case 'transfer': return 'bg-blue-100 text-blue-800'
    case 'wire': return 'bg-purple-100 text-purple-800'
    case 'ach': return 'bg-indigo-100 text-indigo-800'
    case 'check': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-green-100 text-green-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'processed': return 'bg-blue-100 text-blue-800'
    case 'cleared': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRiskFlagClass = (riskFlag) => {
  switch (riskFlag) {
    case 'High Cash': return 'bg-red-100 text-red-800'
    case 'Crypto Activity': return 'bg-purple-100 text-purple-800'
    case 'Cross-Border': return 'bg-orange-100 text-orange-800'
    case 'MSB Related': return 'bg-orange-100 text-orange-800'
    case 'Geographic Risk': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Lifecycle
onMounted(() => {
  console.log('ClientDetailView mounted for client:', props.clientId)
  console.log('Client data:', clientData.value)

  // Initialize default date range for transactions (last 30 days)
  resetFilters()

  // Close menus when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      Object.keys(openMenus.value).forEach(key => {
        openMenus.value[key] = false
      })
      showBulkActions.value = false
    }
  })
})

// Action Helper Functions
const toggleAccountMenu = (accountId) => {
  // Close all other menus first
  Object.keys(openMenus.value).forEach(key => {
    if (key !== accountId) {
      openMenus.value[key] = false
    }
  })
  // Toggle the clicked menu
  openMenus.value[accountId] = !openMenus.value[accountId]
}

const quickAction = (action, account) => {
  openMenus.value[account.id] = false // Close menu

  switch (action) {
    case 'view-transactions':
      showTransactionModal.value = true
      loadTransactions()
      showNotification.value = true
      notificationMessage.value = `Viewing transactions for ${account.name}`
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'create-task':
      newTask.value.accountId = account.id
      newTask.value.title = `Review ${account.name}`
      newTask.value.description = `Account review for ${account.type} ending in ****${account.number.slice(-4)}`
      showTaskModal.value = true
      break
    case 'flag-review':
      showNotification.value = true
      notificationMessage.value = `${account.name} flagged for review`
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'generate-statement':
      showNotification.value = true
      notificationMessage.value = `Statement generated for ${account.name}`
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'freeze-account':
      if (confirm(`Are you sure you want to freeze ${account.name}?`)) {
        showNotification.value = true
        notificationMessage.value = `${account.name} has been frozen`
        setTimeout(() => showNotification.value = false, 3000)
      }
      break
  }
}

const bulkAction = (action) => {
  showBulkActions.value = false

  switch (action) {
    case 'review-all':
      const highRiskCount = accountDetails.value.filter(acc => acc.riskLevel === 'High').length
      showNotification.value = true
      notificationMessage.value = `Reviewing ${highRiskCount} high-risk accounts`
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'generate-statements':
      showNotification.value = true
      notificationMessage.value = `Generating statements for all ${accountDetails.value.length} accounts`
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'schedule-review':
      newTask.value.type = 'meeting'
      newTask.value.title = `Relationship Review - ${clientData.value?.name}`
      newTask.value.description = 'Comprehensive relationship review including all accounts and risk assessment'
      showTaskModal.value = true
      break
    case 'compliance-check':
      showNotification.value = true
      notificationMessage.value = 'Running compliance check on all accounts'
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'freeze-all':
      if (confirm(`Are you sure you want to freeze ALL accounts for ${clientData.value?.name}? This is irreversible.`)) {
        showNotification.value = true
        notificationMessage.value = `All accounts for ${clientData.value?.name} have been frozen`
        setTimeout(() => showNotification.value = false, 3000)
      }
      break
  }
}

const clientAction = (action) => {
  switch (action) {
    case 'create-task':
      newTask.value.title = `Client Follow-up - ${clientData.value?.name}`
      newTask.value.description = 'General client relationship management task'
      showTaskModal.value = true
      break
    case 'schedule-meeting':
      newTask.value.type = 'meeting'
      newTask.value.title = `Meeting - ${clientData.value?.name}`
      newTask.value.description = 'Client meeting to discuss relationship and services'
      showTaskModal.value = true
      break
    case 'generate-report':
      showNotification.value = true
      notificationMessage.value = `Comprehensive report generated for ${clientData.value?.name}`
      setTimeout(() => showNotification.value = false, 3000)
      break
    case 'export-data':
      showNotification.value = true
      notificationMessage.value = `Data exported for ${clientData.value?.name}`
      setTimeout(() => showNotification.value = false, 3000)
      break
  }
}

const createTask = () => {
  // Simulate task creation
  showNotification.value = true
  notificationMessage.value = `Task "${newTask.value.title}" created successfully`

  // Reset form
  newTask.value = {
    type: 'review',
    priority: 'medium',
    title: '',
    description: '',
    dueDate: '',
    accountId: ''
  }

  showTaskModal.value = false
  setTimeout(() => showNotification.value = false, 3000)
}

const generateAccountTransactions = () => {
  const transactions = []
  const types = ['Deposit', 'Withdrawal', 'Transfer', 'Wire', 'ACH', 'Check']
  const descriptions = {
    'Deposit': ['Cash Deposit', 'Check Deposit', 'Direct Deposit'],
    'Withdrawal': ['ATM Withdrawal', 'Cash Withdrawal'],
    'Transfer': ['Internal Transfer', 'Wire Transfer'],
    'Wire': ['Incoming Wire', 'Outgoing Wire'],
    'ACH': ['ACH Credit', 'ACH Debit'],
    'Check': ['Check Payment', 'Cashier Check']
  }

  for (let i = 0; i < 10; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const isInflow = type === 'Deposit' || (type === 'Wire' && Math.random() > 0.5)
    const amount = isInflow
      ? Math.floor(Math.random() * 10000) + 500
      : -(Math.floor(Math.random() * 5000) + 200)

    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    transactions.push({
      id: `acc-txn-${i + 1}`,
      type,
      description: descriptions[type][Math.floor(Math.random() * descriptions[type].length)],
      amount,
      date: date.toISOString().split('T')[0],
      status: ['Completed', 'Pending', 'Processed'][Math.floor(Math.random() * 3)]
    })
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const generateAccountRiskFactors = () => {
  const riskTypes = [
    { type: 'High Cash Volume', severity: 'Medium', description: 'Frequent large cash transactions' },
    { type: 'Unusual Wire Activity', severity: 'High', description: 'Wires to high-risk countries' },
    { type: 'Velocity Alerts', severity: 'Low', description: 'Transaction frequency above normal' },
    { type: 'Geographic Risk', severity: 'Medium', description: 'Activity in high-risk locations' }
  ]

  // Return 1-3 random risk factors
  const count = Math.floor(Math.random() * 3) + 1
  return riskTypes.slice(0, count)
}

const getAccountCardClass = (type) => {
  switch (type) {
    case 'Business Checking': return 'from-blue-50 to-blue-100 border-blue-200'
    case 'Business Savings': return 'from-green-50 to-green-100 border-green-200'
    case 'Money Market': return 'from-purple-50 to-purple-100 border-purple-200'
    case 'Investment Account': return 'from-orange-50 to-orange-100 border-orange-200'
    case 'Credit Line': return 'from-red-50 to-red-100 border-red-200'
    default: return 'from-gray-50 to-gray-100 border-gray-200'
  }
}

const getAccountBalanceColor = (balance) => {
  if (balance >= 1000000) return 'text-green-600'
  if (balance >= 100000) return 'text-blue-600'
  if (balance >= 10000) return 'text-gray-900'
  return 'text-orange-600'
}

const getRiskLevelClass = (level) => {
  switch (level) {
    case 'High': return 'bg-red-100 text-red-800'
    case 'Medium': return 'bg-yellow-100 text-yellow-800'
    case 'Low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getAccountTypeClass = (type) => {
  switch (type) {
    case 'Business Checking': return 'bg-blue-100 text-blue-800'
    case 'Business Savings': return 'bg-green-100 text-green-800'
    case 'Money Market': return 'bg-purple-100 text-purple-800'
    case 'Investment Account': return 'bg-orange-100 text-orange-800'
    case 'Credit Line': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getAccountActionClass = (type) => {
  switch (type) {
    case 'Business Checking': return 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    case 'Business Savings': return 'bg-green-100 text-green-700 hover:bg-green-200'
    case 'Money Market': return 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    case 'Investment Account': return 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    case 'Credit Line': return 'bg-red-100 text-red-700 hover:bg-red-200'
    default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }
}

const getTransactionIconClass = (type) => {
  switch (type.toLowerCase()) {
    case 'deposit': return 'bg-green-100 text-green-600'
    case 'withdrawal': return 'bg-red-100 text-red-600'
    case 'transfer': return 'bg-blue-100 text-blue-600'
    case 'wire': return 'bg-purple-100 text-purple-600'
    case 'ach': return 'bg-indigo-100 text-indigo-600'
    case 'check': return 'bg-orange-100 text-orange-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getRiskFactorClass = (severity) => {
  switch (severity) {
    case 'High': return 'border-red-200 bg-red-50'
    case 'Medium': return 'border-yellow-200 bg-yellow-50'
    case 'Low': return 'border-green-200 bg-green-50'
    default: return 'border-gray-200 bg-gray-50'
  }
}

const getRiskIndicatorClass = (severity) => {
  switch (severity) {
    case 'High': return 'bg-red-500'
    case 'Medium': return 'bg-yellow-500'
    case 'Low': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getRiskSeverityClass = (severity) => {
  switch (severity) {
    case 'High': return 'bg-red-100 text-red-800'
    case 'Medium': return 'bg-yellow-100 text-yellow-800'
    case 'Low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const generateNineDigitId = (id, prefix) => {
  // Generate a hash-based 9-digit ID from the input
  let hash = 0
  const str = (id || '').toString()
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  // Convert to positive and ensure 9 digits
  const numericId = Math.abs(hash).toString().padStart(9, '0').slice(-9)
  return numericId
}

const drillDownToAccount = (account) => {
  // Implement drill-down functionality
  console.log('Drill down to account:', account)
}

const acceptRecommendation = (recommendation) => {
  // Simulate accepting an AI recommendation
  showNotification.value = true
  notificationMessage.value = `Recommendation accepted: ${recommendation.product} (${recommendation.confidence}% confidence)`

  // In a real app, this would:
  // 1. Create a task or opportunity
  // 2. Notify the relationship manager
  // 3. Update the client's opportunity pipeline
  // 4. Send to CRM system

  setTimeout(() => showNotification.value = false, 4000)
}
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
npm