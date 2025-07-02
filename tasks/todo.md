# RelationshipManagerView Redesign Plan

## Project Overview
Redesign the RelationshipManagerView to serve as a **balanced portfolio management dashboard** for Commercial Banking Relationship Managers, providing equal prominence to portfolio growth/performance metrics AND risk management/operational concerns.

## Analysis Summary
- **Current State**: Basic daily actions, RM relationship table
- **Target State**: **Balanced RM dashboard** integrating portfolio performance with risk monitoring
- **Key Focus**: **BALANCED VIEW** - Portfolio Growth + Risk Management + Relationship Trends

## TODO List

### Phase 1: Balanced Core Dashboard (PRIORITY)
- [x] **Task 1.1**: Create balanced metric overview ✅ COMPLETED
  - **Left Side**: Portfolio performance (growth, revenue, opportunities)
  - **Right Side**: Risk management (overdrafts, delinquencies, compliance)
  - **Center**: Relationship health and trends

- [x] **Task 1.2**: Add portfolio performance panel ✅ COMPLETED
  - Portfolio value growth trends (monthly/quarterly)
  - Revenue performance vs targets
  - New relationships gained/lost this period
  - Cross-sell opportunities and success rates

- [x] **Task 1.3**: Add risk management panel ✅ COMPLETED
  - Current overdraft exposure and incidents
  - Active delinquent loans (30/60/90+ days)
  - High-priority risk alerts requiring action
  - Compliance review status and UTR filings

### Phase 2: Enhanced Analytics
- [ ] **Task 2.1**: Add relationship growth tracking
  - Relationship acquisition trends and pipeline
  - Relationship retention rates and churn analysis
  - Average relationship age and lifecycle stages
  - Territory/market penetration analysis

- [ ] **Task 2.2**: Add comprehensive risk scoring
  - Portfolio-level risk scores and trends
  - Client risk distribution and concentration
  - Early warning indicators and predictive analytics
  - Regulatory compliance dashboard

### Phase 3: Performance Optimization
- [ ] **Task 3.1**: Add RM performance benchmarking
  - Peer comparison metrics (portfolio size, growth, risk)
  - Goal achievement tracking (revenue, client acquisition)
  - Market share within assigned territory
  - Efficiency metrics (revenue per relationship, risk-adjusted returns)

- [ ] **Task 3.2**: Add actionable insights
  - Priority action recommendations (portfolio + risk)
  - Opportunity prioritization with risk considerations
  - Client engagement optimization
  - Resource allocation suggestions

### Phase 4: Advanced Features
- [ ] **Task 4.1**: Add predictive analytics
  - Relationship churn risk modeling
  - Portfolio growth forecasting
  - Risk event prediction (defaults, overdrafts)
  - Revenue opportunity scoring

- [ ] **Task 4.2**: Add interactive features
  - Drill-down capabilities to relationship/client details
  - Customizable dashboard widgets
  - Alert management and workflow integration
  - Mobile-responsive design

## **BALANCED DASHBOARD LAYOUT**

### **Header: RM Overview** 📊
```
Portfolio Value: $847M (+5.2% QTD) | Risk Score: 6.4/10 (Stable) | Relationships: 23 (+2 this quarter)
```

### **Row 1: BALANCED PERFORMANCE & RISK CARDS** ⚖️
```
📈 PORTFOLIO PERFORMANCE          |  ⚠️ RISK MANAGEMENT
├── $847M Total Portfolio (+5.2%)  |  ├── $2.3M Overdraft Exposure
├── $12.4M Revenue (103% of target)|  ├── $1.8M Delinquent Loans (5 accounts)
├── +2 New Relationships (Q4)      |  ├── 7 High-Risk Alerts (3 critical)
└── 15 Active Opportunities ($8.2M)|  └── 2 UTR Filings (this month)
```

### **Row 2: TRENDS & ANALYTICS** 📈📉
```
🔄 RELATIONSHIP TRENDS             |  📊 RISK ANALYTICS
├── Relationship Growth: +8.7% YTD |  ├── Portfolio Risk: 6.4/10 (↔️ Stable)
├── Retention Rate: 96.2%          |  ├── Problem Accounts: 8 (3.4% of portfolio)
├── Avg Relationship: 4.2 years    |  ├── Collection Pipeline: $920K
└── Territory Coverage: 67%        |  └── Compliance: 91% current reviews
```

### **Row 3: ACTION PRIORITIES** 🎯
```
TODAY'S PRIORITIES (Balanced Portfolio + Risk Actions)
├── 🚨 Review: $450K overdraft at Johnson Holdings (Risk)
├── 💰 Close: $2.1M lending opportunity at Tech Corp (Portfolio)
├── 📞 Call: Delinquent payment follow-up - Manufacturing LLC (Risk)
├── 🤝 Meeting: Cross-sell treasury services - Real Estate Group (Portfolio)
└── 📋 Complete: KYC renewal for International Trading (Compliance)
```

## Proposed Balanced Metrics

### **PORTFOLIO PERFORMANCE METRICS** 📈
1. **Portfolio Value Growth**: YTD/QTD/MTD growth rates
2. **Revenue Performance**: Current vs targets with trends
3. **Relationship Count**: New/lost/net growth
4. **Cross-sell Success**: Opportunities closed vs pipeline
5. **Client Penetration**: Products per relationship
6. **Territory Coverage**: Market share in assigned area

### **RISK MANAGEMENT METRICS** ⚠️
7. **Overdraft Exposure**: Current balances and incident frequency
8. **Delinquency Status**: Aging buckets and collection progress
9. **Portfolio Risk Score**: Weighted average with trends
10. **Compliance Currency**: Review status and regulatory alerts
11. **UTR Activity**: Filings and suspicious activity monitoring
12. **Problem Account Ratio**: Percentage requiring attention

### **RELATIONSHIP HEALTH METRICS** 🤝
13. **Relationship Retention**: Churn rate and longevity
14. **Client Engagement**: Touch frequency and response rates
15. **Health Score**: Combined portfolio + risk assessment
16. **Lifecycle Stage**: New/growing/mature/at-risk distribution

### **OPERATIONAL EXCELLENCE METRICS** ⚡
17. **Goal Achievement**: Portfolio and risk targets
18. **Response Time**: Client request and alert resolution
19. **Meeting Completion**: Scheduled vs actual client interactions
20. **Efficiency Ratio**: Revenue per relationship vs risk exposure

## **Balanced Design Principles**

### **Visual Balance** ⚖️
- **50/50 Layout**: Equal screen real estate for portfolio and risk
- **Color Coordination**: Green (portfolio growth) + Red (risk alerts) + Blue (neutral metrics)
- **Priority Weighting**: Critical items from both sides get top placement

### **Workflow Integration** 🔄
- **Action Items**: Mix portfolio opportunities with risk mitigation tasks
- **Drill-down Paths**: Navigate to both relationship growth AND risk details
- **Alert System**: Balanced notifications for both opportunity and risk events

### **Performance Context** 📊
- **Risk-Adjusted Returns**: Portfolio performance metrics include risk considerations
- **Opportunity Scoring**: Risk factors included in opportunity prioritization
- **Balanced KPIs**: Success measures include both growth AND risk management

## Implementation Approach
- **Balanced Priority**: Equal development focus on portfolio and risk features
- **Incremental**: Phase-based rollout maintaining balance in each phase
- **Simple**: Each task impacts minimal code with balanced complexity
- **Integrated**: Portfolio and risk metrics work together, not in isolation
- **User-Centric**: RM workflow needs both perspectives simultaneously

## Validation Required
- Confirm equal importance of portfolio vs risk metrics for daily RM workflow
- Validate balanced visual layout with equal prominence
- Approve integrated action priority system (portfolio + risk)
- Define drill-down paths that support both portfolio growth and risk management decisions 

# RelationshipManagerView Enhanced Trend Analysis Implementation Plan

## Overview
Implement comprehensive trend analysis system for RelationshipManagerView with:
- High-level summary metrics with variance options (MoM, YoY, 6-month)
- Expandable trend analysis area with interactive charts
- Identification of top relationships driving variance
- Clickable drill-down to relationship-specific trend analysis

## Phase 1: Core Infrastructure Setup ✅ COMPLETED
- [x] Add reactive data properties for trend analysis
  - [x] Add variance type selection (MoM, YoY, 6-month, QTD)
  - [x] Add show/hide toggle for detailed trend area
  - [x] Add current variance calculations
  - [x] Add selected relationship tracking

- [x] Create base trend data structure
  - [x] Define trend data for each metric (portfolio, revenue, opportunities, risk)
  - [x] Create variance calculation methods
  - [x] Implement period-based data generation

## Phase 2: Enhanced Metrics Display ✅ COMPLETED
- [x] Update existing metric cards with variance indicators
  - [x] Add variance percentage display (+18.7%, -5.2%, etc.)
  - [x] Add trend direction indicators (📈📉)
  - [x] Add variance period labels (6M, YoY, MoM)
  - [x] Color-code based on positive/negative variance

- [x] Add variance type selector
  - [x] Create dropdown for MoM, YoY, 6-month, QTD selection
  - [x] Implement real-time variance updates on selection change
  - [x] Add "Show Details" toggle button

## Phase 3: Expandable Trend Analysis Area
- [ ] Create collapsible trend section
  - [ ] Add summary variance card with current metric and change
  - [ ] Implement interactive trend charts (line charts for time series)
  - [ ] Add period selector (3M, 6M, 1Y) for chart detail level

- [ ] Build variance contributors section
  - [ ] Create "Top Contributors to Growth" panel (green)
  - [ ] Create "Areas Requiring Attention" panel (red)
  - [ ] Show specific relationships driving variance
  - [ ] Display variance percentage and impact amount for each relationship

## Phase 4: Relationship Drill-Down Functionality
- [ ] Implement clickable relationship cards
  - [ ] Add hover effects and click handlers
  - [ ] Route to relationship-specific trend view
  - [ ] Pass selected metric and variance type as context

- [ ] Create relationship-specific trend analysis
  - [ ] Show individual relationship performance vs portfolio average
  - [ ] Display relationship rank within portfolio
  - [ ] Add actionable recommendations based on trend

- [ ] Add cross-metric analysis
  - [ ] Allow switching between metrics while maintaining relationship focus
  - [ ] Show correlation between different metrics for selected relationship

## Phase 5: Advanced Features
- [ ] Add variance attribution analysis
  - [ ] Calculate which relationships contribute most to overall variance
  - [ ] Show percentage breakdown of variance by relationship
  - [ ] Implement threshold-based alerts for significant variances

- [ ] Create trend insights and recommendations
  - [ ] Generate automatic insights based on variance patterns
  - [ ] Suggest action items for relationships with concerning trends
  - [ ] Highlight opportunities for growth based on positive trends

- [ ] Add export and reporting capabilities
  - [ ] Enable export of trend analysis data
  - [ ] Create printable trend reports
  - [ ] Add scheduled trend monitoring alerts

## Technical Implementation Details

### Data Structure
```javascript
// Trend data structure per relationship
relationshipTrends: {
  [relationshipId]: {
    portfolio: { current: 0, mom: 0, yoy: 0, '6month': 0, qtd: 0 },
    revenue: { current: 0, mom: 0, yoy: 0, '6month': 0, qtd: 0 },
    opportunities: { current: 0, mom: 0, yoy: 0, '6month': 0, qtd: 0 },
    risk: { current: 0, mom: 0, yoy: 0, '6month': 0, qtd: 0 }
  }
}
```

### Key Components
1. **Enhanced Metric Cards** - Display current value + variance
2. **Variance Selector** - Dropdown for MoM/YoY/6M/QTD
3. **Trend Chart Area** - Expandable section with ApexCharts
4. **Variance Contributors** - Lists of relationships with impact
5. **Drill-Down Navigation** - Routes to relationship detail with context

### User Experience Flow
1. User sees metric cards with variance indicators
2. User selects variance type (MoM, YoY, etc.)
3. User clicks "Show Details" to expand trend analysis
4. User sees trend chart and variance contributors
5. User clicks on specific relationship to drill down
6. User sees relationship-specific trend analysis with recommendations

## Success Criteria
- [ ] All metrics show variance with clear visual indicators
- [ ] Trend analysis area smoothly expands/collapses
- [ ] Charts update dynamically based on variance type selection
- [ ] Relationship drill-down provides actionable insights
- [ ] Performance remains smooth with all features active
- [ ] UI is intuitive and follows existing design patterns

## Testing Plan
- [ ] Test variance calculations for accuracy
- [ ] Verify chart rendering performance with large datasets
- [ ] Test drill-down navigation and context preservation
- [ ] Validate responsive design on different screen sizes
- [ ] Test accessibility of new interactive elements 