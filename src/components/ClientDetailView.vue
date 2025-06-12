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
        <div class="lg:col-span-1 space-y-4">

          <!-- Client Profile -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-4">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-gray-700">
                    {{clientData?.name?.split(' ').map(n => n[0]).join('') || 'N/A'}}
                  </span>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">{{ clientData?.name || 'N/A' }}</h2>
                  <p class="text-xs text-gray-500 mt-1">TIN: 12-3456789</p>
                  <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getTierBadgeClass(clientTier)">
                    {{ clientTier }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <div>
                  <p class="text-xs font-medium text-gray-500">Industry</p>
                  <p class="text-sm text-gray-900">{{ clientData?.industry || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Location</p>
                  <p class="text-sm text-gray-900">{{ clientData?.location || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">RM No</p>
                  <p class="text-sm text-gray-900">{{ relationshipManager?.id || 'N/A' }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Relationship Manager</p>
                  <p class="text-sm text-gray-900">{{ relationshipManager?.name || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Product & Relationship Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-3 border-b border-gray-200">
              <h3 class="text-base font-medium text-gray-900">Product & Relationship</h3>
            </div>
            <div class="p-4 space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">Total Accounts</span>
                <span class="text-sm font-medium">{{ totalAccounts }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">Total Balance</span>
                <span class="text-sm font-medium">{{ formatCurrency(totalBalance) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">Annual Revenue</span>
                <span class="text-sm font-medium">{{ formatCurrency(clientData?.annualRevenue || 0) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">Relationship Length</span>
                <span class="text-sm font-medium">{{ clientData?.relationshipYears || 0 }} years</span>
              </div>
            </div>
          </div>



          <!-- Related party -->
          <div
            v-if="clientData?.beneficialOwners || clientData?.authorizedSigners || clientData?.conductors || clientData?.relatedEntities"
            class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-3 border-b border-gray-200">
              <h3 class="text-base font-medium text-gray-900">Related party</h3>
              <p class="text-xs text-gray-500 mt-1">Beneficial ownership, authorized signers, and business conductors
              </p>
            </div>
            <div class="p-4">
              <!-- Beneficial Owners -->
              <div v-if="clientData?.beneficialOwners" class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">💎 Beneficial Owners</h4>
                <div class="space-y-2">
                  <div v-for="owner in clientData.beneficialOwners" :key="owner.name"
                    class="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div>
                      <div class="text-sm font-medium text-blue-900">{{ owner.name }}</div>
                      <div class="text-xs text-blue-500">ID: {{ generateNineDigitId(owner.id || owner.name, 'BO') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Authorized Signers -->
              <div v-if="clientData?.authorizedSigners" class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">✍️ Authorized Signers</h4>
                <div class="space-y-2">
                  <div v-for="signer in clientData.authorizedSigners" :key="signer.name"
                    class="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div>
                      <div class="text-sm font-medium text-green-900">{{ signer.name }}</div>
                      <div class="text-xs text-green-500">ID: {{ generateNineDigitId(signer.id || signer.name, 'SIG') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Business Conductors -->
              <div v-if="clientData?.conductors" class="mb-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">🎯 Business Conductors</h4>
                <div class="space-y-2">
                  <div v-for="conductor in clientData.conductors" :key="conductor.name"
                    class="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
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
                <h4 class="text-sm font-medium text-gray-900 mb-2">🏢 Related Entities</h4>
                <div class="space-y-2">
                  <div v-for="entity in clientData.relatedEntities" :key="entity.name"
                    class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
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

          <!-- Industry Risk Flags -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-3 border-b border-gray-200">
              <h3 class="text-base font-medium text-gray-900">🚨 Industry Risk Flags</h3>
              <p class="text-xs text-gray-500 mt-1">High-risk business classifications</p>
            </div>
            <div class="p-3">
              <div class="space-y-2">
                <div v-for="industry in riskIndustries" :key="industry.name"
                  class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full" :class="industry.confirmed ? 'bg-red-500' : 'bg-gray-400'">
                    </div>
                    <span class="text-xs text-gray-700">{{ industry.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column - Charts and Analysis -->
        <div class="lg:col-span-3 space-y-6">

          <!-- Section Title -->
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Company Opportunities & Portfolio</h2>
          </div>

          <!-- Summary KPIs Row -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-4">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ totalAccounts }}</div>
                  <div class="text-sm text-gray-600">Total Accounts</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalDeposits) }}</div>
                  <div class="text-sm text-gray-600">Total Deposits</div>
                  <div class="text-xs text-green-500 font-medium">{{ depositsPercentile }}{{
                    getOrdinalSuffix(depositsPercentile) }} percentile</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(totalLoanAmount) }}</div>
                  <div class="text-sm text-gray-600">Total Loans</div>
                  <div class="text-xs text-orange-500 font-medium">{{ loansPercentile }}{{
                    getOrdinalSuffix(loansPercentile) }} percentile</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600">{{ formatCurrency(totalBalance) }}</div>
                  <div class="text-sm text-gray-600">Total Account Balance</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-indigo-600">{{ numberOfOpportunities }}</div>
                  <div class="text-sm text-gray-600">Number of Opportunities</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Penetration & AI Recommendations -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">📈 Product Penetration & AI Recommendations</h3>
                  <p class="text-sm text-gray-500 mt-1">Current product penetration with ML-powered growth opportunities
                  </p>
                </div>
                <span class="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">🤖 ML Powered</span>
              </div>
            </div>
            <div class="p-6">
              <!-- Product Portfolio Breakdown -->
              <div class="mb-8">
                <h4 class="text-lg font-medium text-gray-900 mb-4">🏦 Product Portfolio Breakdown</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  <!-- Business Deposit Product -->
                  <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 class="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                      🟦 Business Deposit Product
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Checking</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Debit Cards</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">CDs</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Savings and Money Market</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Business Lending Product -->
                  <div class="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h5 class="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
                      🟦 Business Lending Product
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Credit Cards</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Loans and Lines of Credit</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Securities-Based Lending</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Real Estate Financing</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Paycheck Protection Program (PPP)</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Commercial Lending Solutions -->
                  <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h5 class="text-sm font-semibold text-orange-900 mb-3 flex items-center">
                      🟧 Commercial Lending Solutions
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Asset Based Lending</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Commercial Lending</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Commercial Real Estate</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Equipment Finance</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Treasury & Cash Management -->
                  <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h5 class="text-sm font-semibold text-yellow-900 mb-3 flex items-center">
                      🟨 Treasury & Cash Management
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Liquidity Management</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Payables</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Receivables</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Fraud Control</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Information Services</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Treasury Overview & Articles</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Business Services & Support -->
                  <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 class="text-sm font-semibold text-green-900 mb-3 flex items-center">
                      🟩 Business Services & Support
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Online Banking</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Online Accounting</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Payroll</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Business Payment Suite</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Overdraft Services</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Merchant Solutions</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">New to Small Business Checking</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Healthcare Professionals</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Wealth & Investment Services -->
                  <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 class="text-sm font-semibold text-purple-900 mb-3 flex items-center">
                      🟪 Wealth & Investment Services
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Investments</span>
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Wealth & Retirement Planning</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-700">Private Client Banking</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>

                <!-- Legend -->
                <div class="mt-6 flex justify-center items-center space-x-6 text-sm">
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">Client Has Product</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">AI Recommended</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">Not Available/Recommended</span>
                  </div>
                </div>
              </div>

              <!-- Product Penetration Overview -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-1">
                  <div class="text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">{{ clientData?.productPenetration || 0 }}%</div>
                    <div class="text-sm text-gray-600 mb-4">Current Product Penetration</div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                      <div
                        class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        :style="{ width: (clientData?.productPenetration || 0) + '%' }"></div>
                    </div>
                    <div class="mt-3 text-xs text-gray-500">
                      {{ 100 - (clientData?.productPenetration || 0) }}% growth opportunity remaining
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-2">
                  <h4 class="text-lg font-medium text-gray-900 mb-4">🤖 AI-Powered Product Recommendations</h4>
                  <div class="space-y-3">
                    <div v-for="recommendation in aiRecommendations" :key="recommendation.product"
                      class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <div class="flex items-center space-x-2 mb-2">
                            <h5 class="text-sm font-semibold text-blue-900">{{ recommendation.product }}</h5>
                            <span class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                              {{ recommendation.confidence }}% confidence
                            </span>
                          </div>
                          <p class="text-sm text-blue-700 mb-2">{{ recommendation.reason }}</p>
                          <div class="flex items-center space-x-4 text-xs text-gray-600">
                            <span>💰 {{ formatCurrency(recommendation.potentialRevenue) }} potential</span>
                            <span>🎯 {{ recommendation.priority }} priority</span>
                          </div>
                        </div>
                        <div class="ml-4 flex flex-col space-y-2">
                          <button @click="acceptRecommendation(recommendation)"
                            class="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                            Accept
                          </button>
                          <button
                            class="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- AI Factors Summary -->
                  <div v-if="aiRecommendations.length > 0" class="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h6 class="text-xs font-medium text-gray-700 mb-2">AI Analysis Factors:</h6>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="factor in [...new Set(aiRecommendations.flatMap(r => r.aiFactors))]" :key="factor"
                        class="text-xs px-2 py-1 bg-white text-gray-600 rounded border">
                        {{ factor }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account and Loan Portfolio Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">💼 Account and Loan Portfolio Summary</h3>
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
                  </div>

                  <!-- Quick Action Buttons -->
                  <div class="grid grid-cols-2 gap-2">
                    <button @click="quickAction('view-transactions', account)"
                      class="text-xs py-1.5 px-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                      Trx
                    </button>
                    <button @click="quickAction('view-trends', account)"
                      title="Explore monthly trends in deposits, loans, and flagged activity over time"
                      class="text-xs py-1.5 px-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors">
                      📊 View Trends
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

              <!-- Account & Loan Portfolio Chart -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-medium text-gray-900">📊 Account & Loan Portfolio Balance</h4>
                    <p class="text-sm text-gray-500">Account balances (positive) vs loan utilization (negative) with
                      available credit line</p>
                  </div>
                  <div class="flex space-x-2">
                    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Deposits</span>
                    <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Loans</span>
                  </div>
                </div>
                <div class="h-80 bg-gray-50 rounded-lg p-4">
                  <BarChart v-if="accountLoanPortfolioData" :data="accountLoanPortfolioData" />
                </div>

              </div>
            </div>
          </div>

          <!-- Transaction Volume Analysis -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">💸 Transaction Volume Analysis</h3>
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
              <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div class="text-center p-3 bg-green-50 rounded-lg">
                  <p class="text-green-600 font-medium">Total Inflows</p>
                  <p class="text-xl font-bold text-green-900">$2.8M</p>
                  <p class="text-xs text-green-500 font-medium">{{ inflowsPercentile }}{{
                    getOrdinalSuffix(inflowsPercentile) }} percentile</p>
                </div>
                <div class="text-center p-3 bg-red-50 rounded-lg">
                  <p class="text-red-600 font-medium">Total Outflows</p>
                  <p class="text-xl font-bold text-red-900">$2.1M</p>
                  <p class="text-xs text-red-500 font-medium">{{ outflowsPercentile }}{{
                    getOrdinalSuffix(outflowsPercentile) }} percentile</p>
                </div>
                <div class="text-center p-3 bg-blue-50 rounded-lg">
                  <p class="text-blue-600 font-medium">Net Flow</p>
                  <p class="text-xl font-bold text-blue-900">$0.7M</p>
                  <p class="text-xs text-blue-600">Positive trend</p>
                </div>
              </div>
            </div>
          </div>



          <!-- Risk Analysis Section -->
          <div class="text-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">🚨 Risk Analysis</h2>
          </div>

          <!-- Risk Analysis Content -->
          <!-- Risk Flag Distribution -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-base font-medium text-gray-900">⚠️ Risk Flag Distribution</h3>
                  <p class="text-xs text-gray-500 mt-1">Risk categories with detailed analysis - click for
                    investigation details</p>
                </div>
                <div class="flex space-x-2">
                  <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">High Risk</span>
                  <span class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Medium Risk</span>
                  <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Low Risk</span>
                </div>
              </div>
            </div>
            <div class="p-4">
              <!-- Risk Flag Breakdown -->
              <div class="mb-6">
                <h4 class="text-base font-medium text-gray-900 mb-3">🚨 Risk Flag Categories</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  <!-- Non-Transaction Flags -->
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h5 class="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      📋 Non-Transaction Flags
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'UTR', type: 'non-transaction', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">UTR (Unusual Transaction Reports)</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'MSB Industry', type: 'non-transaction', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">MSB Industry Classification</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Crypto Industry', type: 'non-transaction', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">Crypto Industry Classification</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Correspondent Bank Flag', type: 'non-transaction', riskLevel: 'low' })">
                        <span class="text-sm text-gray-700">Correspondent Bank Flag</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- High Cash Activities -->
                  <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h5 class="text-sm font-semibold text-yellow-900 mb-3 flex items-center">
                      💰 High Cash Activities
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between cursor-pointer hover:bg-yellow-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'High Cash Deposits', type: 'high-cash', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">High Cash Deposits</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-yellow-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'High Cash Withdrawals', type: 'high-cash', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">High Cash Withdrawals</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-yellow-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Cash Transaction Flagged', type: 'high-cash', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">Cash Transaction Flagged</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- High Risk Transactions -->
                  <div class="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h5 class="text-sm font-semibold text-red-900 mb-3 flex items-center">
                      🚨 High Risk Transactions
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between cursor-pointer hover:bg-red-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'MSB Transactions', type: 'high-risk-trx', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">MSB Transactions</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-red-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Crypto Activities', type: 'high-risk-trx', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">Crypto Activities</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-red-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Luxury Spending', type: 'high-risk-trx', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">Luxury Spending</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-red-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'HRJ Wire Transfers', type: 'high-risk-trx', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">HRJ Wire In/Out</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- International Activities -->
                  <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h5 class="text-sm font-semibold text-orange-900 mb-3 flex items-center">
                      🌍 International Activities
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between cursor-pointer hover:bg-orange-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'HRJ ATM Withdrawals', type: 'international', riskLevel: 'high' })">
                        <span class="text-sm text-gray-700">HRJ ATM Withdrawals</span>
                        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-orange-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Correspondent Bank Activities', type: 'international', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">Correspondent Bank Activities</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-orange-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Correspondent Bank Deposits', type: 'international', riskLevel: 'low' })">
                        <span class="text-sm text-gray-700">Correspondent Bank Deposits</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Compliance & Monitoring -->
                  <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 class="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                      🛡️ Compliance & Monitoring
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between cursor-pointer hover:bg-blue-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Enhanced Due Diligence', type: 'compliance', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">Enhanced Due Diligence</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-blue-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'KYC Updates Required', type: 'compliance', riskLevel: 'low' })">
                        <span class="text-sm text-gray-700">KYC Updates Required</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-blue-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Sanctions Screening', type: 'compliance', riskLevel: 'low' })">
                        <span class="text-sm text-gray-700">Sanctions Screening</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Business Activities -->
                  <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 class="text-sm font-semibold text-purple-900 mb-3 flex items-center">
                      🏢 Business Activities
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between cursor-pointer hover:bg-purple-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'High Velocity Transactions', type: 'business', riskLevel: 'medium' })">
                        <span class="text-sm text-gray-700">High Velocity Transactions</span>
                        <div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-purple-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Round Dollar Amounts', type: 'business', riskLevel: 'low' })">
                        <span class="text-sm text-gray-700">Round Dollar Amounts</span>
                        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="flex items-center justify-between cursor-pointer hover:bg-purple-100 p-2 rounded"
                        @click="openRiskFlagModal({ category: 'Off-Hours Transactions', type: 'business', riskLevel: 'low' })">
                        <span class="text-sm text-gray-700">Off-Hours Transactions</span>
                        <div class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Legend -->
                <div class="mt-6 flex justify-center items-center space-x-6 text-sm">
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">High Risk - Immediate Action</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">Medium Risk - Review Required</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">Low Risk - Monitoring</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
                      <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-gray-700">No Risk/Cleared</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Risk Analytics & Time Series -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">📊 Risk Analytics & Time Series</h3>
                  <p class="text-sm text-gray-500 mt-1">Historical risk pattern analysis with drill-down
                    capabilities
                  </p>
                </div>
                <div class="flex items-center space-x-3">
                  <select v-model="riskTimeframe" class="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option value="3M">Last 3 Months</option>
                    <option value="6M">Last 6 Months</option>
                    <option value="1Y">Last 12 Months</option>
                    <option value="2Y">Last 24 Months</option>
                  </select>
                  <button @click="exportRiskData"
                    class="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                    Export Data
                  </button>
                </div>
              </div>
            </div>

            <div class="p-6">
              <!-- Filter Controls -->
              <div class="mb-6 flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-2">
                  <label class="text-sm font-medium text-gray-700">Transaction Types:</label>
                  <div class="flex space-x-2">
                    <label v-for="txnType in transactionTypes" :key="txnType" class="flex items-center space-x-1">
                      <input type="checkbox" v-model="selectedTxnTypes" :value="txnType" class="rounded">
                      <span class="text-xs text-gray-600">{{ txnType }}</span>
                    </label>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <label class="text-sm font-medium text-gray-700">Risk Flags:</label>
                  <div class="flex space-x-2">
                    <label v-for="flagType in flagTypes" :key="flagType" class="flex items-center space-x-1">
                      <input type="checkbox" v-model="selectedFlagTypes" :value="flagType" class="rounded">
                      <span class="text-xs text-gray-600">{{ flagType }}</span>
                    </label>
                  </div>
                </div>
                <button @click="resetRiskFilters" class="text-xs text-blue-600 hover:text-blue-800">Reset
                  All</button>
              </div>

              <!-- Charts Grid -->
              <div class="grid grid-cols-1 gap-6">

                <!-- High Risk Transactions by Type -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-md font-medium text-gray-900">🚨 High Risk Transactions by Type</h4>
                    <button @click="drillDownRiskTxn" class="text-xs text-blue-600 hover:text-blue-800">View Details
                      →</button>
                  </div>
                  <div class="h-64">
                    <BarChart :data="riskTransactionTimeSeriesData" :options="stackedBarOptions" />
                  </div>
                  <div class="mt-3 flex justify-between text-xs text-gray-600">
                    <span>Total High Risk: {{ totalHighRiskTransactions }}</span>
                    <span>↑ {{ riskTrend }}% vs prev period</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Risk Flag Event Timeline -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">🕐 Risk Flag Event Timeline</h3>
                  <p class="text-sm text-gray-500 mt-1">Chronological view of risk events by severity and type</p>
                </div>
                <div class="flex items-center space-x-3">
                  <select v-model="timelineRange" class="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option value="1M">Last Month</option>
                    <option value="3M">Last 3 Months</option>
                    <option value="6M">Last 6 Months</option>
                    <option value="1Y">Last Year</option>
                  </select>
                  <button @click="exportTimelineData"
                    class="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                    Export Timeline
                  </button>
                </div>
              </div>
            </div>

            <div class="p-6">
              <!-- Timeline Chart -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-md font-medium text-gray-900">Risk Event Timeline by Category</h4>
                  <div class="flex space-x-2 text-xs">
                    <span class="flex items-center space-x-1">
                      <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>High Risk</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Medium Risk</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low Risk</span>
                    </span>
                  </div>
                </div>

                <!-- Timeline Grid -->
                <div class="relative">
                  <!-- Time axis -->
                  <div class="flex justify-between text-xs text-gray-500 mb-4 px-24">
                    <span v-for="timeLabel in timelineLabels" :key="timeLabel">{{ timeLabel }}</span>
                  </div>

                  <!-- Risk events by category -->
                  <div class="space-y-4">
                    <!-- UTR Category -->
                    <div class="flex items-center">
                      <div class="w-20 text-xs font-medium text-gray-700">UTR Filed</div>
                      <div class="flex-1 h-8 bg-gray-100 rounded relative">
                        <div v-for="event in utrCategoryEvents" :key="event.id"
                          class="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                          :class="getEventColorClass(event.risk)" :style="getCircleEventPosition(event)"
                          :title="event.description" @click="viewEventDetails(event)">
                        </div>
                      </div>
                    </div>

                    <!-- MSB Category -->
                    <div class="flex items-center">
                      <div class="w-20 text-xs font-medium text-gray-700">MSB Activity</div>
                      <div class="flex-1 h-8 bg-gray-100 rounded relative">
                        <div v-for="event in msbCategoryEvents" :key="event.id"
                          class="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                          :class="getEventColorClass(event.risk)" :style="getCircleEventPosition(event)"
                          :title="event.description" @click="viewEventDetails(event)">
                        </div>
                      </div>
                    </div>

                    <!-- High Cash Category -->
                    <div class="flex items-center">
                      <div class="w-20 text-xs font-medium text-gray-700">High Cash</div>
                      <div class="flex-1 h-8 bg-gray-100 rounded relative">
                        <div v-for="event in cashCategoryEvents" :key="event.id"
                          class="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                          :class="getEventColorClass(event.risk)" :style="getCircleEventPosition(event)"
                          :title="event.description" @click="viewEventDetails(event)">
                        </div>
                      </div>
                    </div>

                    <!-- Crypto Category -->
                    <div class="flex items-center">
                      <div class="w-20 text-xs font-medium text-gray-700">Crypto</div>
                      <div class="flex-1 h-8 bg-gray-100 rounded relative">
                        <div v-for="event in cryptoCategoryEvents" :key="event.id"
                          class="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                          :class="getEventColorClass(event.risk)" :style="getCircleEventPosition(event)"
                          :title="event.description" @click="viewEventDetails(event)">
                        </div>
                      </div>
                    </div>

                    <!-- Sanctions Category -->
                    <div class="flex items-center">
                      <div class="w-20 text-xs font-medium text-gray-700">Sanctions</div>
                      <div class="flex-1 h-8 bg-gray-100 rounded relative">
                        <div v-for="event in sanctionsCategoryEvents" :key="event.id"
                          class="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                          :class="getEventColorClass(event.risk)" :style="getCircleEventPosition(event)"
                          :title="event.description" @click="viewEventDetails(event)">
                        </div>
                      </div>
                    </div>

                    <!-- Compliance Category -->
                    <div class="flex items-center">
                      <div class="w-20 text-xs font-medium text-gray-700">Compliance</div>
                      <div class="flex-1 h-8 bg-gray-100 rounded relative">
                        <div v-for="event in complianceCategoryEvents" :key="event.id"
                          class="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                          :class="getEventColorClass(event.risk)" :style="getCircleEventPosition(event)"
                          :title="event.description" @click="viewEventDetails(event)">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Risk Flag Summary - Horizontal Layout -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-md font-medium text-gray-900 mb-4">📊 Flag Summary</h4>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  <!-- UTR Summary -->
                  <div class="p-3 bg-white rounded border">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-900">UTR Filed</span>
                      <span class="text-lg font-bold text-orange-600">{{ utrStats.total }}</span>
                    </div>
                    <div class="text-xs text-gray-600">
                      <div>Rank: #{{ utrStats.rank }}/{{ utrStats.totalClients }}</div>
                      <div>{{ utrStats.percentile }}th percentile</div>
                      <div class="mt-1 text-orange-600">{{ utrStats.trend }}</div>
                    </div>
                  </div>

                  <!-- MSB Classification -->
                  <div class="p-3 bg-white rounded border">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-900">MSB Status</span>
                      <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Active</span>
                    </div>
                    <div class="text-xs text-gray-600">
                      <div>Money Services Business</div>
                      <div>Since: {{ msbStats.classifiedDate }}</div>
                      <div class="mt-1 text-red-600">Permanent</div>
                    </div>
                  </div>

                  <!-- High Cash Flags -->
                  <div class="p-3 bg-white rounded border">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-900">High Cash</span>
                      <span class="text-lg font-bold text-yellow-600">{{ cashStats.flags }}</span>
                    </div>
                    <div class="text-xs text-gray-600">
                      <div>90 days: {{ cashStats.recent }}</div>
                      <div>Breaches: {{ cashStats.breaches }}</div>
                      <div class="mt-1 text-yellow-600">{{ cashStats.status }}</div>
                    </div>
                  </div>

                  <!-- Crypto Flags -->
                  <div class="p-3 bg-white rounded border">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-900">Crypto</span>
                      <span class="text-lg font-bold text-purple-600">{{ cryptoStats.flags }}</span>
                    </div>
                    <div class="text-xs text-gray-600">
                      <div>Exchanges: {{ cryptoStats.exchanges }}</div>
                      <div>Volume: {{ formatCurrency(cryptoStats.volume) }}</div>
                      <div class="mt-1 text-purple-600">{{ cryptoStats.trend }}</div>
                    </div>
                  </div>

                  <!-- Sanctions Screening -->
                  <div class="p-3 bg-white rounded border">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-900">Sanctions</span>
                      <span class="text-lg font-bold text-gray-600">{{ sanctionsStats.hits }}</span>
                    </div>
                    <div class="text-xs text-gray-600">
                      <div>False+: {{ sanctionsStats.falsePositives }}</div>
                      <div>Last: {{ sanctionsStats.lastScreen }}</div>
                      <div class="mt-1 text-green-600">{{ sanctionsStats.status }}</div>
                    </div>
                  </div>

                  <!-- Overall Risk Status -->
                  <div class="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded border border-red-200">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-red-900">Overall Risk</span>
                      <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full font-bold">HIGH</span>
                    </div>
                    <div class="text-xs text-red-700">
                      <div>Score: {{ overallRisk.score }}/100</div>
                      <div>MSB, High Cash</div>
                      <div class="mt-1 font-medium">Enhanced monitoring</div>
                    </div>
                  </div>
                </div>
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
            <p class="text-sm text-gray-600 mt-1">{{ clientData?.name || 'Client' }} - Individual Transaction
              History
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
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account
                </th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                </th>
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
            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages"
              class="px-3 py-1 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
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

  <!-- Risk Flag Details Modal -->
  <div v-if="showRiskFlagModal && selectedRiskFlag"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeRiskFlagModal">
    <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden mx-4">
      <!-- Modal Header -->
      <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="selectedRiskFlag.riskLevel === 'high' ? 'bg-red-500' :
              selectedRiskFlag.riskLevel === 'medium' ? 'bg-yellow-500' :
                selectedRiskFlag.riskLevel === 'low' ? 'bg-green-500' : 'bg-gray-400'">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="selectedRiskFlag.riskLevel === 'high' || selectedRiskFlag.riskLevel === 'medium'"
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd" />
                <path v-else-if="selectedRiskFlag.riskLevel === 'low'" fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
                <path v-else fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ selectedRiskFlag.category }} - Investigation
                Details
              </h3>
              <p class="text-sm text-gray-600 mt-1">{{ selectedRiskFlag.type || 'Risk flag analysis' }} | Risk
                Level: {{
                  selectedRiskFlag.riskLevel || 'Medium' }}</p>
            </div>
            <span class="px-3 py-1 text-sm font-medium rounded-full" :class="selectedRiskFlag.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
              selectedRiskFlag.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                selectedRiskFlag.riskLevel === 'low' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
              {{ selectedRiskFlag.riskLevel || 'Medium' }} Risk
            </span>
          </div>
          <button @click="closeRiskFlagModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div v-if="generateRiskFlagData(selectedRiskFlag.category)" class="space-y-6">

          <!-- Summary Section -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-lg font-medium text-blue-900 mb-2">📋 Risk Assessment Summary</h4>
            <p class="text-sm text-blue-800">{{ generateRiskFlagData(selectedRiskFlag.category).summary }}</p>
          </div>

          <!-- Time Series Chart for Risk Flag -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-medium text-gray-900">📈 {{ selectedRiskFlag.category }} - Historical Trend
              </h4>
              <div class="flex space-x-2">
                <select v-model="modalTimeframe" class="text-xs border border-gray-300 rounded px-2 py-1">
                  <option value="3M">3 Months</option>
                  <option value="6M">6 Months</option>
                  <option value="1Y">12 Months</option>
                </select>
                <button @click="exportModalData"
                  class="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                  Export
                </button>
              </div>
            </div>
            <div class="h-48">
              <LineChart :data="generateModalTimeSeriesData(selectedRiskFlag.category)" :options="modalChartOptions" />
            </div>
            <div class="mt-3 flex justify-between text-xs text-gray-600">
              <span>Trend: {{ getModalTrend(selectedRiskFlag.category) }}</span>
              <span>Peak: {{ getModalPeak(selectedRiskFlag.category) }}</span>
            </div>
          </div>

          <!-- Flag Details Section (for non-transaction flags) -->
          <div v-if="generateRiskFlagData(selectedRiskFlag.category).flagDetails">
            <h4 class="text-lg font-medium text-gray-900 mb-4">🚩 Flag Details & Notes</h4>
            <div class="space-y-4">
              <div v-for="detail in generateRiskFlagData(selectedRiskFlag.category).flagDetails"
                :key="detail.date || detail.category" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div v-if="detail.officer" class="flex items-start justify-between mb-2">
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ formatDate(detail.date) }}</div>
                    <div class="text-sm text-gray-700 mt-1">{{ detail.note }}</div>
                    <div class="text-xs text-gray-500 mt-1">Officer: {{ detail.officer }}</div>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="text-xs px-2 py-1 rounded" :class="detail.status === 'Filed' ? 'bg-green-100 text-green-800' :
                      detail.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'">
                      {{ detail.status }}
                    </span>
                    <span class="text-xs text-gray-500 mt-1">{{ detail.referenceNo }}</span>
                  </div>
                </div>
                <div v-else class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ detail.category }}</div>
                    <div class="text-sm text-gray-700 mt-1">{{ detail.detail }}</div>
                    <div class="text-xs text-gray-500 mt-1">Last Review: {{ formatDate(detail.lastReview) }}</div>
                  </div>
                  <span class="text-xs px-2 py-1 rounded" :class="detail.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                    detail.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      detail.riskLevel === 'Compliant' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'">
                    {{ detail.riskLevel }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Transaction Details Section -->
          <div v-if="generateRiskFlagData(selectedRiskFlag.category).transactions">
            <h4 class="text-lg font-medium text-gray-900 mb-4">💳 Transaction Analysis</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description</th>
                    <th v-if="selectedRiskFlag.category.includes('Cash')"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch/Teller</th>
                    <th v-if="selectedRiskFlag.category === 'MSB Transactions'"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Counterparty</th>
                    <th v-if="selectedRiskFlag.category === 'Crypto Activities'"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exchange/Crypto</th>
                    <th v-if="selectedRiskFlag.category === 'HRJ Wire Transfers'"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country/Bank</th>
                    <th v-if="selectedRiskFlag.category === 'HRJ ATM Withdrawals'"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in generateRiskFlagData(selectedRiskFlag.category).transactions"
                    :key="transaction.date" class="hover:bg-gray-50">
                    <td class="px-4 py-4 text-sm text-gray-900">{{ formatDate(transaction.date) }}</td>
                    <td class="px-4 py-4 text-sm font-medium text-right"
                      :class="transaction.amount >= 10000 ? 'text-red-600' : 'text-gray-900'">
                      {{ formatCurrency(transaction.amount) }}
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-900">{{ transaction.description || transaction.purpose ||
                      'N/A' }}</td>

                    <!-- Cash Transactions -->
                    <td v-if="selectedRiskFlag.category.includes('Cash')" class="px-4 py-4 text-sm text-gray-500">
                      {{ transaction.branch }}
                      <div class="text-xs text-gray-400">{{ transaction.teller || transaction.manager }}</div>
                    </td>

                    <!-- MSB Transactions -->
                    <td v-if="selectedRiskFlag.category === 'MSB Transactions'" class="px-4 py-4 text-sm text-gray-500">
                      {{ transaction.counterparty }}
                      <div class="text-xs text-gray-400">{{ transaction.country }} - {{ transaction.type }}</div>
                    </td>

                    <!-- Crypto Activities -->
                    <td v-if="selectedRiskFlag.category === 'Crypto Activities'"
                      class="px-4 py-4 text-sm text-gray-500">
                      {{ transaction.exchange }}
                      <div class="text-xs text-gray-400">{{ transaction.crypto }} ({{ transaction.type }})</div>
                    </td>

                    <!-- HRJ Wire Transfers -->
                    <td v-if="selectedRiskFlag.category === 'HRJ Wire Transfers'"
                      class="px-4 py-4 text-sm text-gray-500">
                      {{ transaction.country }}
                      <div class="text-xs text-gray-400">{{ transaction.bank }}</div>
                      <div class="text-xs" :class="transaction.sanctions === 'Blocked' ? 'text-red-600' :
                        transaction.sanctions === 'Flagged' ? 'text-yellow-600' : 'text-green-600'">
                        Sanctions: {{ transaction.sanctions }}
                      </div>
                    </td>

                    <!-- HRJ ATM Withdrawals -->
                    <td v-if="selectedRiskFlag.category === 'HRJ ATM Withdrawals'"
                      class="px-4 py-4 text-sm text-gray-500">
                      {{ transaction.city }}, {{ transaction.country }}
                      <div class="text-xs text-gray-400">{{ transaction.terminal }} ({{ transaction.network }})
                      </div>
                      <div class="text-xs text-gray-400">{{ transaction.time }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Investigations Section -->
          <div v-if="generateRiskFlagData(selectedRiskFlag.category).investigations">
            <h4 class="text-lg font-medium text-gray-900 mb-4">🔍 Active Investigations</h4>
            <div class="space-y-3">
              <div v-for="investigation in generateRiskFlagData(selectedRiskFlag.category).investigations"
                :key="investigation.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ investigation.id }}</div>
                    <div class="text-sm text-gray-700 mt-1">{{ investigation.description }}</div>
                    <div class="text-xs text-gray-500 mt-1">Assigned to: {{ investigation.assignedTo }}</div>
                  </div>
                  <span class="text-xs px-2 py-1 rounded" :class="investigation.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                    investigation.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      investigation.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        investigation.priority === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'">
                    {{ investigation.priority }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button @click="closeRiskFlagModal" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              Close
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Flag for Investigation
            </button>
          </div>
        </div>
      </div>
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

// Risk Flag Modal State
const showRiskFlagModal = ref(false)
const selectedRiskFlag = ref(null)

// Risk Analytics State
const riskTimeframe = ref('6M')
const modalTimeframe = ref('3M')
const timelineRange = ref('3M')
const showAllEvents = ref(false)
const selectedTxnTypes = ref(['Wire', 'Cash', 'Crypto', 'MSB'])
const selectedFlagTypes = ref(['UTR', 'High Cash', 'MSB', 'Crypto'])

// Filter and chart options
const transactionTypes = ['Wire', 'Cash', 'Crypto', 'MSB', 'ATM', 'ACH', 'Check']
const flagTypes = ['UTR', 'High Cash', 'MSB', 'Crypto', 'HRJ', 'Sanctions', 'EDD']

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
  if (!accountDetails.value || accountDetails.value.length === 0) return 0
  return accountDetails.value.reduce((sum, acc) => sum + (acc.balance || 0), 0)
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

const totalLoanAmount = computed(() => {
  if (!clientData.value) return 0

  // Calculate total loan amount based on portfolio value and client tier
  const portfolioValue = clientData.value.portfolioValue || 0
  const tier = clientTier.value

  // Commercial clients typically have higher loan ratios
  const loanRatio = tier === 'Commercial' ? 0.35 : 0.25

  return Math.floor(portfolioValue * loanRatio)
})

const loanUtilityRate = computed(() => {
  if (!clientData.value) return 0

  // Calculate utility rate as percentage of loan usage
  // Based on client activity and risk profile
  const baseRate = Math.floor(Math.random() * 40) + 45 // 45-85%
  return baseRate
})

const highRiskTrxVolume = computed(() => {
  if (!clientData.value) return 0

  // Calculate high risk transaction volume from monthly volumes
  const totalVolume = totalMonthlyVolume.value
  const riskPercentage = 0.12 // 12% of transactions flagged as high risk

  return Math.floor(totalVolume * riskPercentage)
})

const totalAvailableCredit = computed(() => {
  if (!clientData.value) return 0

  // Calculate total available credit based on portfolio and client tier
  const portfolioValue = clientData.value.portfolioValue || 0
  const tier = clientTier.value

  // Commercial clients typically have higher credit lines
  const creditMultiplier = tier === 'Commercial' ? 0.6 : 0.4
  const totalCreditLine = Math.floor(portfolioValue * creditMultiplier)
  const usedCredit = totalLoanAmount.value

  return Math.max(0, totalCreditLine - usedCredit)
})

const netPortfolioPosition = computed(() => {
  return totalDeposits.value - totalLoanAmount.value
})

// New KPI computed properties
const depositsPercentile = computed(() => {
  // Generate percentile rank for deposits (higher is better)
  return Math.floor(Math.random() * 30) + 70 // 70-99th percentile
})

const loansPercentile = computed(() => {
  // Generate percentile rank for loans (higher is better)
  return Math.floor(Math.random() * 25) + 75 // 75-99th percentile
})

const numberOfOpportunities = computed(() => {
  // Calculate number of opportunities based on product penetration
  const penetration = clientData.value?.productPenetration || 0
  const maxOpportunities = 8
  return Math.floor((100 - penetration) / 100 * maxOpportunities) + 2
})

const inflowsPercentile = computed(() => {
  // Generate percentile rank for inflows
  return Math.floor(Math.random() * 20) + 80 // 80-99th percentile
})

const outflowsPercentile = computed(() => {
  // Generate percentile rank for outflows
  return Math.floor(Math.random() * 25) + 65 // 65-89th percentile
})

// Account & Loan Portfolio Chart Data
const accountLoanPortfolioData = computed(() => {
  if (!accountDetails.value || accountDetails.value.length === 0) return null

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Group accounts by type and get their actual balances
  const accountsByType = {}
  accountDetails.value.forEach(account => {
    if (!accountsByType[account.type]) {
      accountsByType[account.type] = 0
    }
    accountsByType[account.type] += account.balance
  })

  // Generate historical data based on current balances with small variations
  const accountDatasets = []
  const colors = [
    { bg: 'rgba(34, 197, 94, 0.8)', border: '#22C55E' },
    { bg: 'rgba(16, 185, 129, 0.8)', border: '#10B981' },
    { bg: 'rgba(6, 182, 212, 0.8)', border: '#06B6D4' },
    { bg: 'rgba(59, 130, 246, 0.8)', border: '#3B82F6' },
    { bg: 'rgba(99, 102, 241, 0.8)', border: '#6366F1' }
  ]

  let colorIndex = 0
  Object.entries(accountsByType).forEach(([accountType, balance]) => {
    if (balance > 0 && !accountType.toLowerCase().includes('credit') && !accountType.toLowerCase().includes('loan')) {
      // For deposit accounts (positive values)
      const baseValue = balance / 1000 // Convert to thousands
      const monthlyData = months.map((month, index) => {
        if (index === months.length - 1) {
          // Last month (December) should match exact current balance
          return Math.floor(baseValue)
        }
        // Historical months with variation
        const variation = (Math.random() - 0.5) * 0.2 // ±10% variation
        return Math.floor(baseValue * (1 + variation))
      })

      accountDatasets.push({
        label: accountType,
        data: monthlyData,
        backgroundColor: colors[colorIndex % colors.length].bg,
        borderColor: colors[colorIndex % colors.length].border,
        borderWidth: 1,
        stack: 'assets'
      })
      colorIndex++
    }
  })

  // Add loan data (negative values)
  const loanColors = [
    { bg: 'rgba(239, 68, 68, 0.8)', border: '#EF4444' },
    { bg: 'rgba(220, 38, 38, 0.8)', border: '#DC2626' },
    { bg: 'rgba(185, 28, 28, 0.8)', border: '#B91C1C' }
  ]

  // Generate loan utilization based on totalLoanAmount
  const loanAmount = totalLoanAmount.value / 1000 // Convert to thousands
  const loanDatasets = [
    {
      label: 'Commercial Lending',
      data: months.map((month, index) => {
        if (index === months.length - 1) {
          // Last month (December) should match exact proportion of current total loans
          return -(Math.floor(loanAmount * 0.4))
        }
        // Historical months with variation
        return -(Math.floor(loanAmount * 0.4 * (0.9 + Math.random() * 0.2)))
      }),
      backgroundColor: loanColors[0].bg,
      borderColor: loanColors[0].border,
      borderWidth: 1,
      stack: 'liabilities'
    },
    {
      label: 'Term Loans',
      data: months.map((month, index) => {
        if (index === months.length - 1) {
          // Last month (December) should match exact proportion of current total loans
          return -(Math.floor(loanAmount * 0.4))
        }
        // Historical months with variation
        return -(Math.floor(loanAmount * 0.4 * (0.9 + Math.random() * 0.2)))
      }),
      backgroundColor: loanColors[1].bg,
      borderColor: loanColors[1].border,
      borderWidth: 1,
      stack: 'liabilities'
    },
    {
      label: 'Equipment Financing',
      data: months.map((month, index) => {
        if (index === months.length - 1) {
          // Last month (December) should match exact proportion of current total loans
          return -(Math.floor(loanAmount * 0.2))
        }
        // Historical months with variation
        return -(Math.floor(loanAmount * 0.2 * (0.9 + Math.random() * 0.2)))
      }),
      backgroundColor: loanColors[2].bg,
      borderColor: loanColors[2].border,
      borderWidth: 1,
      stack: 'liabilities'
    }
  ]

  return {
    labels: months,
    datasets: [
      ...accountDatasets,
      ...loanDatasets
    ]
  }
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

  // Liquidity Management - High confidence for Commercial clients with high volume
  if (tier === 'Commercial' && portfolioValue > 2000000) {
    recommendations.push({
      product: 'Liquidity Management',
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
      product: 'Commercial Lending',
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
      product: 'Investments',
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



  // Sort by confidence and return top 3
  return recommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3)
})

// Risk Analytics Computed Properties
const riskTransactionTimeSeriesData = computed(() => {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  return {
    labels: months,
    datasets: [
      {
        label: 'Wire Transfers',
        data: [12, 18, 25, 22, 28, 31],
        backgroundColor: '#EF4444',
        borderColor: '#DC2626',
        borderWidth: 1
      },
      {
        label: 'Cash Transactions',
        data: [8, 15, 18, 16, 22, 25],
        backgroundColor: '#F59E0B',
        borderColor: '#D97706',
        borderWidth: 1
      },
      {
        label: 'Crypto Activities',
        data: [3, 7, 12, 8, 15, 18],
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 1
      },
      {
        label: 'MSB Related',
        data: [5, 8, 14, 11, 16, 20],
        backgroundColor: '#EC4899',
        borderColor: '#DB2777',
        borderWidth: 1
      }
    ]
  }
})

const riskFlagTimeSeriesData = computed(() => {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  return {
    labels: months,
    datasets: [
      {
        label: 'UTR Flags',
        data: [2, 3, 5, 4, 6, 7],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3
      },
      {
        label: 'High Cash Flags',
        data: [1, 2, 4, 3, 5, 6],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3
      },
      {
        label: 'MSB Flags',
        data: [0, 1, 2, 1, 3, 4],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3
      },
      {
        label: 'Crypto Flags',
        data: [1, 1, 3, 2, 4, 5],
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.3
      }
    ]
  }
})

const riskScoreTimeSeriesData = computed(() => {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  return {
    labels: months,
    datasets: [
      {
        label: 'Risk Score',
        data: [45, 52, 67, 58, 71, 74],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  }
})

const complianceActionsData = computed(() => {
  return {
    labels: ['SARs Filed', 'UTRs Filed', 'EDD Reviews', 'Sanctions Screening'],
    datasets: [{
      data: [3, 7, 12, 8],
      backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#6B7280'],
      borderWidth: 0
    }]
  }
})

const totalHighRiskTransactions = computed(() => 132)
const riskTrend = computed(() => 15.3)
const totalRiskFlags = computed(() => 22)
const activeInvestigations = computed(() => 8)
const currentRiskScore = computed(() => 74)
const riskScoreChange = computed(() => 3)

const complianceStats = computed(() => ({
  sars: 3,
  utrs: 7,
  edd: 12,
  sanctions: 8
}))

const filteredRiskEvents = computed(() => {
  const events = [
    {
      id: 1,
      title: 'Large Cash Deposit Flagged',
      description: '$25,000 cash deposit exceeds threshold',
      date: '2024-03-01',
      type: 'cash',
      severity: 'High'
    },
    {
      id: 2,
      title: 'UTR Filed - Structured Transactions',
      description: 'Pattern of deposits under $10,000',
      date: '2024-02-28',
      type: 'utr',
      severity: 'Medium'
    },
    {
      id: 3,
      title: 'Crypto Exchange Wire Transfer',
      description: 'Wire to Coinbase Pro for $45,000',
      date: '2024-02-25',
      type: 'crypto',
      severity: 'High'
    },
    {
      id: 4,
      title: 'MSB Transaction Review',
      description: 'Transaction with Western Union flagged',
      date: '2024-02-22',
      type: 'msb',
      severity: 'Medium'
    },
    {
      id: 5,
      title: 'EDD Review Completed',
      description: 'Enhanced due diligence review finalized',
      date: '2024-02-20',
      type: 'compliance',
      severity: 'Low'
    }
  ]

  return showAllEvents.value ? events : events.slice(0, 3)
})

// Timeline Data
const timelineLabels = computed(() => {
  switch (timelineRange.value) {
    case '1M': return ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    case '3M': return ['Jan', 'Feb', 'Mar']
    case '6M': return ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
    case '1Y': return ['Q1', 'Q2', 'Q3', 'Q4']
    default: return ['Jan', 'Feb', 'Mar']
  }
})

const severeEvents = computed(() => [
  {
    id: 'sev-1',
    label: 'MSB_flag',
    description: 'MSB classification flagged',
    startTime: 20,
    duration: 15,
    type: 'msb'
  },
  {
    id: 'sev-2',
    label: 'crypto_wire',
    description: 'Large crypto wire transfer',
    startTime: 65,
    duration: 10,
    type: 'crypto'
  }
])

const elevatedEvents = computed(() => [
  {
    id: 'elev-1',
    label: 'cash_deposit',
    description: 'High cash deposit flagged',
    startTime: 10,
    duration: 12,
    type: 'cash'
  },
  {
    id: 'elev-2',
    label: 'utr_filed',
    description: 'UTR filed for structured transactions',
    startTime: 30,
    duration: 8,
    type: 'utr'
  },
  {
    id: 'elev-3',
    label: 'sanctions_hit',
    description: 'Sanctions screening hit',
    startTime: 75,
    duration: 6,
    type: 'sanctions'
  }
])

const lowEvents = computed(() => [
  {
    id: 'low-1',
    label: 'routine_review',
    description: 'Routine compliance review',
    startTime: 45,
    duration: 20,
    type: 'compliance'
  },
  {
    id: 'low-2',
    label: 'kyc_update',
    description: 'KYC information updated',
    startTime: 85,
    duration: 8,
    type: 'kyc'
  }
])

// Category-based timeline events
const utrCategoryEvents = computed(() => [
  {
    id: 'utr-1',
    description: 'UTR filed for structured transactions',
    startTime: 30,
    risk: 'medium',
    type: 'utr'
  },
  {
    id: 'utr-2',
    description: 'UTR filed for suspicious activity',
    startTime: 65,
    risk: 'high',
    type: 'utr'
  },
  {
    id: 'utr-3',
    description: 'UTR filed for cash activity',
    startTime: 85,
    risk: 'medium',
    type: 'utr'
  }
])

const msbCategoryEvents = computed(() => [
  {
    id: 'msb-1',
    description: 'MSB classification flagged',
    startTime: 20,
    risk: 'high',
    type: 'msb'
  },
  {
    id: 'msb-2',
    description: 'MSB transaction review',
    startTime: 55,
    risk: 'medium',
    type: 'msb'
  }
])

const cashCategoryEvents = computed(() => [
  {
    id: 'cash-1',
    description: 'High cash deposit flagged',
    startTime: 10,
    risk: 'medium',
    type: 'cash'
  },
  {
    id: 'cash-2',
    description: 'Large cash withdrawal',
    startTime: 40,
    risk: 'high',
    type: 'cash'
  },
  {
    id: 'cash-3',
    description: 'Pattern of cash transactions',
    startTime: 70,
    risk: 'medium',
    type: 'cash'
  }
])

const cryptoCategoryEvents = computed(() => [
  {
    id: 'crypto-1',
    description: 'Large crypto wire transfer',
    startTime: 25,
    risk: 'high',
    type: 'crypto'
  },
  {
    id: 'crypto-2',
    description: 'Crypto exchange transaction',
    startTime: 60,
    risk: 'medium',
    type: 'crypto'
  }
])

const sanctionsCategoryEvents = computed(() => [
  {
    id: 'sanctions-1',
    description: 'Sanctions screening hit',
    startTime: 75,
    risk: 'high',
    type: 'sanctions'
  },
  {
    id: 'sanctions-2',
    description: 'False positive resolved',
    startTime: 90,
    risk: 'low',
    type: 'sanctions'
  }
])

const complianceCategoryEvents = computed(() => [
  {
    id: 'compliance-1',
    description: 'Routine compliance review',
    startTime: 45,
    risk: 'low',
    type: 'compliance'
  },
  {
    id: 'compliance-2',
    description: 'Enhanced due diligence',
    startTime: 80,
    risk: 'medium',
    type: 'compliance'
  }
])

// Risk Statistics
const utrStats = computed(() => ({
  total: 15,
  rank: 23,
  totalClients: 2847,
  percentile: 92,
  trend: '↑ 3 filed this month'
}))

const msbStats = computed(() => ({
  classifiedDate: 'Jan 15, 2024',
  status: 'Active',
  riskLevel: 'High'
}))

const cashStats = computed(() => ({
  flags: 28,
  recent: 8,
  breaches: 12,
  status: 'Active monitoring'
}))

const cryptoStats = computed(() => ({
  flags: 18,
  exchanges: 5,
  volume: 245000,
  trend: '↑ Increasing activity'
}))

const sanctionsStats = computed(() => ({
  hits: 3,
  falsePositives: 2,
  lastScreen: 'Mar 10, 2024',
  status: 'Clean - no matches'
}))

const overallRisk = computed(() => ({
  score: 87,
  level: 'HIGH',
  factors: ['MSB Classification', 'High Cash Activity', 'Crypto Transactions']
}))

// Computed properties for Performance Summary
const topPercentile = computed(() => {
  if (!clientData.value?.rankings) return 95
  const percentiles = Object.values(clientData.value.rankings).map(r => r.percentile)
  return Math.min(...percentiles)
})

const bestCategory = computed(() => {
  if (!clientData.value?.rankings) return 'Revenue Growth'
  const best = Object.entries(clientData.value.rankings).reduce(
    (best, [key, val]) => val.percentile > best.percentile ? { key, percentile: val.percentile } : best,
    { key: '', percentile: 0 }
  )
  return best.key.replace(/([A-Z])/g, ' $1').trim()
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
    'Liquidity Management': Math.floor(portfolioValue * 0.10)
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
    'Liquidity Management': { balance: Math.floor(portfolioValue * 0.10), count: 1 }
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
      { category: 'Foreign ATM', severity: 'Critical', count: 3, color: 'bg-red-400', description: 'ATM withdrawals in high-risk countries' },
      { category: 'High-Risk Wires', severity: 'Review', count: 3, color: 'bg-orange-500', description: 'International wire transfers to high-risk countries' },
      { category: 'Luxury Spend', severity: 'Review', count: 2, color: 'bg-orange-400', description: 'Large purchases of luxury goods using business funds' },
      { category: 'UTR', severity: 'Review', count: 1, color: 'bg-orange-600', description: 'Unusual Transaction Reports filed by staff' }
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

// Filtered risk flag summary (excludes Watch level)
const riskFlagSummaryFiltered = computed(() => {
  const filtered = riskFlagSummary.value.filter(flag => flag.severity !== 'Watch')
  const total = filtered.reduce((sum, flag) => sum + flag.count, 0)

  return filtered.map(flag => ({
    ...flag,
    percentage: total > 0 ? Math.round((flag.count / total) * 100) : 0
  }))
})

// Risk Industries computed property
const riskIndustries = computed(() => {
  if (!clientData.value) return []

  const clientIndustry = clientData.value.industry?.toLowerCase() || ''

  const industries = [
    { name: 'Gambling industry', confirmed: clientIndustry.includes('gambling') || clientIndustry.includes('casino') || clientIndustry.includes('gaming') },
    { name: 'Crypto industry', confirmed: clientIndustry.includes('crypto') || clientIndustry.includes('bitcoin') || clientIndustry.includes('blockchain') || clientIndustry.includes('digital asset') },
    { name: 'High cash Business', confirmed: clientIndustry.includes('cash') || clientIndustry.includes('retail') || clientIndustry.includes('restaurant') || clientIndustry.includes('convenience') },
    { name: 'Real Estate', confirmed: clientIndustry.includes('real estate') || clientIndustry.includes('property') || clientIndustry.includes('development') },
    { name: 'Cannabis Industry', confirmed: clientIndustry.includes('cannabis') || clientIndustry.includes('marijuana') || clientIndustry.includes('hemp') },
    { name: 'Money Service Business (MSB)', confirmed: clientIndustry.includes('money service') || clientIndustry.includes('msb') || clientIndustry.includes('money transfer') || clientIndustry.includes('currency exchange') },
    { name: 'Import/Export Business', confirmed: clientIndustry.includes('import') || clientIndustry.includes('export') || clientIndustry.includes('trade') || clientIndustry.includes('international commerce') }
  ]

  return industries
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

const getOrdinalSuffix = (num) => {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) {
    return 'st'
  }
  if (j === 2 && k !== 12) {
    return 'nd'
  }
  if (j === 3 && k !== 13) {
    return 'rd'
  }
  return 'th'
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

  // Load transactions data
  loadTransactions()

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

const openRiskFlagModal = (flag) => {
  selectedRiskFlag.value = flag
  showRiskFlagModal.value = true
}

const closeRiskFlagModal = () => {
  showRiskFlagModal.value = false
  selectedRiskFlag.value = null
}

// Generate mock data for risk flag details
// Chart Options
const stackedBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { stacked: true },
    y: { stacked: true }
  },
  plugins: {
    legend: { position: 'top' }
  }
}

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' }
  }
}

const riskScoreOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { min: 0, max: 100 }
  },
  plugins: {
    legend: { position: 'top' }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
}

const modalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  }
}

// Risk Analytics Methods
const resetRiskFilters = () => {
  selectedTxnTypes.value = ['Wire', 'Cash', 'Crypto', 'MSB']
  selectedFlagTypes.value = ['UTR', 'High Cash', 'MSB', 'Crypto']
}

const exportRiskData = () => {
  // Implement risk data export
  console.log('Exporting risk analytics data...')
}

const drillDownRiskTxn = () => {
  // Open detailed risk transaction view
  console.log('Drilling down into risk transactions...')
}

const drillDownRiskFlags = () => {
  // Open detailed risk flags view
  console.log('Drilling down into risk flags...')
}

const drillDownRiskScore = () => {
  // Open detailed risk score analysis
  console.log('Drilling down into risk score...')
}

const drillDownCompliance = () => {
  // Open detailed compliance view
  console.log('Drilling down into compliance actions...')
}

const openRiskEventModal = () => {
  // Open risk event timeline modal
  console.log('Opening risk event timeline...')
}

const viewEventDetails = (event) => {
  // View specific risk event details
  console.log('Viewing event details:', event)
}

const getRiskEventColor = (type) => {
  const colors = {
    cash: 'bg-yellow-500',
    utr: 'bg-orange-500',
    crypto: 'bg-purple-500',
    msb: 'bg-pink-500',
    compliance: 'bg-green-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getRiskEventBadge = (severity) => {
  const badges = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  }
  return badges[severity] || 'bg-gray-100 text-gray-800'
}

const generateModalTimeSeriesData = (category) => {
  const months = modalTimeframe.value === '3M' ? ['Jan', 'Feb', 'Mar'] :
    modalTimeframe.value === '6M' ? ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'] :
      ['Q1', 'Q2', 'Q3', 'Q4']

  // Generate data based on category
  const dataMap = {
    'UTR': [2, 4, 7, 5, 6, 8],
    'High Cash Deposits': [3, 6, 8, 7, 9, 11],
    'MSB Transactions': [1, 3, 5, 4, 6, 7],
    'Crypto Activities': [2, 5, 8, 6, 9, 12],
    'HRJ Wire Transfers': [1, 2, 4, 3, 5, 6]
  }

  const data = dataMap[category] || [1, 2, 3, 2, 4, 5]

  return {
    labels: months.slice(0, modalTimeframe.value === '3M' ? 3 : months.length),
    datasets: [{
      label: category,
      data: data.slice(0, modalTimeframe.value === '3M' ? 3 : data.length),
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.3,
      fill: true
    }]
  }
}

const getModalTrend = (category) => {
  const trends = {
    'UTR': 'Increasing',
    'High Cash Deposits': 'Decreasing',
    'MSB Transactions': 'Stable',
    'Crypto Activities': 'Increasing',
    'HRJ Wire Transfers': 'Increasing'
  }
  return trends[category] || 'Stable'
}

const getModalPeak = (category) => {
  const peaks = {
    'UTR': 'Feb 2024',
    'High Cash Deposits': 'Jan 2024',
    'MSB Transactions': 'Mar 2024',
    'Crypto Activities': 'Mar 2024',
    'HRJ Wire Transfers': 'Feb 2024'
  }
  return peaks[category] || 'Mar 2024'
}

const exportModalData = () => {
  console.log('Exporting modal chart data...')
}

// Timeline Methods
const getEventPosition = (event) => {
  return {
    left: `${event.startTime}%`,
    width: `${event.duration}%`,
    top: '1px'
  }
}

const exportTimelineData = () => {
  console.log('Exporting timeline data...')
}

// New methods for category-based timeline
const getCircleEventPosition = (event) => {
  return {
    left: `${event.startTime}%`,
    top: '1px'
  }
}

const getEventColorClass = (risk) => {
  switch (risk) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

const generateRiskFlagData = (flagCategory) => {
  const baseDate = new Date()

  switch (flagCategory) {
    // Non-Transaction Flags
    case 'UTR':
      return {
        flagDetails: [
          { date: '2024-01-10', officer: 'Sarah Johnson', note: 'Client inquired about CTR reporting thresholds and structuring laws', status: 'Filed', referenceNo: 'UTR-2024-001' },
          { date: '2024-01-25', officer: 'Mike Rodriguez', note: 'Structured deposits of $9,900 made consistently over 2-week period', status: 'Under Review', referenceNo: 'UTR-2024-002' },
          { date: '2024-02-03', officer: 'Jennifer Chen', note: 'Multiple cash deposits just under reporting threshold detected', status: 'Escalated', referenceNo: 'UTR-2024-003' }
        ],
        investigations: [
          { id: 'INV-2024-UTR-001', description: 'Pattern analysis of structured transactions', priority: 'High', assignedTo: 'BSA Compliance Team' },
          { id: 'INV-2024-UTR-002', description: 'Customer interview regarding cash sourcing', priority: 'Medium', assignedTo: 'Relationship Manager' }
        ],
        summary: 'Client has shown patterns consistent with potential structuring behavior requiring enhanced monitoring.'
      }

    case 'MSB Industry':
      return {
        flagDetails: [
          { category: 'Business Classification', detail: 'Check Cashing - Money Services Business', riskLevel: 'High', lastReview: '2024-01-15' },
          { category: 'License Status', detail: 'Active MSB license in California (License #CA-MSB-2024-001)', riskLevel: 'Compliant', lastReview: '2024-01-15' },
          { category: 'Transaction Volume', detail: 'Monthly volume exceeds $500K in check cashing services', riskLevel: 'High', lastReview: '2024-02-01' }
        ],
        investigations: [
          { id: 'MSB-REVIEW-2024-Q1', description: 'Quarterly MSB compliance review', priority: 'Standard', assignedTo: 'MSB Compliance Officer' },
          { id: 'MSB-EDD-2024-001', description: 'Enhanced due diligence for high-volume MSB', priority: 'High', assignedTo: 'Senior Compliance Manager' }
        ],
        summary: 'Client operates as licensed MSB requiring enhanced monitoring per regulatory requirements.'
      }

    case 'Crypto Industry':
      return {
        flagDetails: [
          { category: 'Business Type', detail: 'Cryptocurrency Exchange Platform', riskLevel: 'High', lastReview: '2024-01-20' },
          { category: 'Virtual Currency License', detail: 'BitLicense approved in New York (License #NY-BC-001)', riskLevel: 'Compliant', lastReview: '2024-01-20' },
          { category: 'AML Program', detail: 'Crypto-specific AML program implemented', riskLevel: 'Medium', lastReview: '2024-02-01' }
        ],
        investigations: [
          { id: 'CRYPTO-AML-2024-001', description: 'Review of cryptocurrency AML compliance', priority: 'High', assignedTo: 'Digital Assets Team' },
          { id: 'CRYPTO-SAR-2024-001', description: 'Suspicious activity monitoring for crypto transactions', priority: 'Ongoing', assignedTo: 'BSA Analyst' }
        ],
        summary: 'High-risk cryptocurrency business requiring specialized monitoring and compliance oversight.'
      }

    // High Cash Activities
    case 'High Cash Deposits':
      return {
        transactions: [
          { date: '2024-01-05', amount: 24500, description: 'Cash deposit - retail sales revenue', branch: 'Main St Branch', teller: 'Teller #3', cumulative: 24500 },
          { date: '2024-01-12', amount: 29800, description: 'Large cash deposit - business operations', branch: 'Downtown Branch', teller: 'Teller #7', cumulative: 54300 },
          { date: '2024-01-20', amount: 31200, description: 'Cash deposit exceeding daily threshold', branch: 'Main St Branch', teller: 'Teller #1', cumulative: 85500 }
        ],
        investigations: [
          { id: 'CASH-INV-2024-001', description: 'Source of funds verification for large cash deposits', priority: 'High', assignedTo: 'AML Investigator' },
          { id: 'CASH-PROF-2024-001', description: 'Business profile review - cash-intensive operations', priority: 'Medium', assignedTo: 'Risk Assessment Team' }
        ],
        summary: 'Pattern of large cash deposits exceeding normal business profile requires investigation.'
      }

    case 'High Cash Withdrawals':
      return {
        transactions: [
          { date: '2024-01-08', amount: 18500, description: 'Cash withdrawal for payroll', purpose: 'Employee wages', branch: 'Main St Branch', manager: 'Branch Manager' },
          { date: '2024-01-15', amount: 22000, description: 'Large cash withdrawal - business expenses', purpose: 'Vendor payments', branch: 'Downtown Branch', manager: 'Asst. Manager' },
          { date: '2024-01-22', amount: 25500, description: 'Cash withdrawal exceeding normal patterns', purpose: 'Operational costs', branch: 'Main St Branch', manager: 'Branch Manager' }
        ],
        investigations: [
          { id: 'CASH-OUT-2024-001', description: 'Verification of cash usage for business operations', priority: 'Medium', assignedTo: 'Compliance Officer' },
          { id: 'CASH-PAT-2024-001', description: 'Analysis of cash withdrawal patterns', priority: 'Low', assignedTo: 'Risk Analyst' }
        ],
        summary: 'Cash withdrawal amounts require verification of business necessity and usage patterns.'
      }

    // High Risk Transactions
    case 'MSB Transactions':
      return {
        transactions: [
          { date: '2024-01-10', amount: 15000, counterparty: 'Western Union Financial', type: 'Money Transfer', country: 'Mexico', purpose: 'Remittance Services' },
          { date: '2024-01-18', amount: 23500, counterparty: 'MoneyGram International', type: 'Bulk Transfer', country: 'Philippines', purpose: 'Agent Settlement' },
          { date: '2024-01-25', amount: 18700, counterparty: 'Ria Money Transfer', type: 'Cross-border Payment', country: 'India', purpose: 'Customer Remittance' }
        ],
        investigations: [
          { id: 'MSB-TXN-2024-001', description: 'Review of MSB counterparty relationships', priority: 'High', assignedTo: 'MSB Specialist' },
          { id: 'MSB-VOL-2024-001', description: 'Transaction volume analysis with MSB entities', priority: 'Medium', assignedTo: 'Transaction Monitoring' }
        ],
        summary: 'High-frequency transactions with MSB entities require enhanced monitoring.'
      }

    case 'Crypto Activities':
      return {
        transactions: [
          { date: '2024-01-12', amount: 45000, exchange: 'Coinbase Pro', crypto: 'Bitcoin', type: 'Purchase', wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
          { date: '2024-01-20', amount: 32500, exchange: 'Binance US', crypto: 'Ethereum', type: 'Sale', wallet: '0x742d35Cc6635C0532925a3b8D50d1f8A' },
          { date: '2024-02-01', amount: 28000, exchange: 'Kraken', crypto: 'Litecoin', type: 'Exchange', wallet: 'LTC1qw508d6qejxtdg4y5r3zarvary0c5xw7k' }
        ],
        investigations: [
          { id: 'CRYPTO-MON-2024-001', description: 'Cryptocurrency transaction monitoring', priority: 'High', assignedTo: 'Digital Assets Unit' },
          { id: 'CRYPTO-SOURCE-2024-001', description: 'Source of funds for crypto investments', priority: 'Medium', assignedTo: 'AML Analyst' }
        ],
        summary: 'Large cryptocurrency transactions require enhanced due diligence and source verification.'
      }

    case 'HRJ Wire Transfers':
      return {
        transactions: [
          { date: '2024-01-15', amount: 35000, country: 'Iran', bank: 'Bank Melli Iran', beneficiary: 'Tehran Trading Co', purpose: 'Equipment Purchase', sanctions: 'Reviewed' },
          { date: '2024-01-22', amount: 28500, country: 'Syria', bank: 'Commercial Bank of Syria', beneficiary: 'Damascus Import LLC', purpose: 'Goods Import', sanctions: 'Flagged' },
          { date: '2024-01-30', amount: 42000, country: 'North Korea', bank: 'Foreign Trade Bank', beneficiary: 'Pyongyang Industries', purpose: 'Raw Materials', sanctions: 'Blocked' }
        ],
        investigations: [
          { id: 'HRJ-WIRE-2024-001', description: 'High-risk jurisdiction wire transfer review', priority: 'Critical', assignedTo: 'Sanctions Compliance' },
          { id: 'HRJ-SANC-2024-001', description: 'Enhanced sanctions screening', priority: 'High', assignedTo: 'OFAC Specialist' }
        ],
        summary: 'Wire transfers to high-risk jurisdictions require immediate sanctions review and compliance clearance.'
      }

    // International Activities  
    case 'HRJ ATM Withdrawals':
      return {
        transactions: [
          { date: '2024-01-18', amount: 500, country: 'Afghanistan', city: 'Kabul', terminal: 'ATM-KAB-001', network: 'VISA', time: '14:32 UTC' },
          { date: '2024-01-25', amount: 800, country: 'Syria', city: 'Damascus', terminal: 'ATM-DAM-003', network: 'MasterCard', time: '09:15 UTC' },
          { date: '2024-02-02', amount: 300, country: 'Iran', city: 'Tehran', terminal: 'ATM-TEH-007', network: 'VISA', time: '16:45 UTC' }
        ],
        investigations: [
          { id: 'HRJ-ATM-2024-001', description: 'ATM usage in high-risk jurisdictions', priority: 'High', assignedTo: 'International Risk Team' },
          { id: 'HRJ-TRAVEL-2024-001', description: 'Travel pattern analysis', priority: 'Medium', assignedTo: 'Geographic Risk Analyst' }
        ],
        summary: 'ATM withdrawals in high-risk jurisdictions require enhanced monitoring and travel verification.'
      }

    default:
      return {
        flagDetails: [{ category: 'General', detail: 'Risk flag under review', riskLevel: 'Medium', lastReview: '2024-01-01' }],
        investigations: [{ id: 'GEN-REV-2024-001', description: 'General risk assessment', priority: 'Standard', assignedTo: 'Compliance Team' }],
        summary: 'General risk flag requiring standard compliance review.'
      }
  }
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