<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-4">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <KPICard
          :value="totalAccounts"
          label="Total Accounts"
          value-color="blue"
        />
        <KPICard
          :value="totalDeposits"
          label="Total Deposit Balance"
          :percentile="depositsPercentile"
          value-color="green"
          format-as-currency
        />
        <KPICard
          :value="totalLoanAmount"
          label="Total Loans"
          :percentile="loansPercentile"
          value-color="orange"
          format-as-currency
        />
        <KPICard
          :value="`${loanUtilityRate}%`"
          label="Loan Utility %"
          :percentile="loanUtilityPercentile"
          value-color="purple"
        />
        <KPICard
          :value="annualRevenue"
          label="Revenue"
          :percentile="revenuePercentile"
          value-color="cyan"
          format-as-currency
        />
        <KPICard
          :value="numberOfOpportunities"
          label="Opportunities"
          value-color="indigo"
        />
        <KPICard
          :value="totalRiskFlags"
          label="Risk Flags"
          :percentile="riskFlagsPercentile"
          value-color="red"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import KPICard from '../shared/KPICard.vue'

const props = defineProps({
  totalAccounts: { type: Number, required: true },
  totalDeposits: { type: Number, required: true },
  totalLoanAmount: { type: Number, required: true },
  loanUtilityRate: { type: Number, required: true },
  annualRevenue: { type: Number, required: true },
  numberOfOpportunities: { type: Number, required: true },
  totalRiskFlags: { type: Number, required: true },
  depositsPercentile: { type: Number, required: true },
  loansPercentile: { type: Number, required: true },
  loanUtilityPercentile: { type: Number, required: true },
  revenuePercentile: { type: Number, required: true },
  riskFlagsPercentile: { type: Number, required: true }
})
</script> 