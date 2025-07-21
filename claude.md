# Client 360 Business Intelligence Platform

## Project Purpose

This is a comprehensive business intelligence web application designed to help financial institutions grow their business and identify opportunities and risks. The platform provides hierarchical data visualization and analytics capabilities that enable users to drill down from high-level organizational metrics to granular transaction details.

## Core Mission

**Enable data-driven decision making** through intuitive dashboards that surface actionable insights about client relationships, revenue opportunities, and risk exposures across the entire organization.

## Target Users & Personas

### 👔 **Executive Leadership**
- **Chief Risk Officer (CRO)** - Portfolio-wide risk assessment and regulatory compliance
- **Chief Commercial Officer (CCO)** - Revenue optimization and strategic relationship management
- **Regional Presidents** - Geographic performance analysis and market penetration
- **Chief Executive Officer (CEO)** - Multi-metro strategic planning and resource allocation decisions

### 🏢 **Metropolitan & Market Leadership**
- **Metro VP** - Multi-market oversight and resource allocation
- **Market VP** - Market-specific performance and competitive positioning
- **Regional VP** - Regional client portfolio management and growth strategies

### 🤝 **Relationship Management**
- **Relationship Manager (RM)** - Client portfolio optimization and cross-sell opportunities
- **Client Coverage Teams** - Relationship deepening and service delivery
- **Business Development** - Prospect identification and conversion strategies

### 🛡️ **Risk Management**
- **Risk Manager** - Client risk assessment and monitoring
- **Compliance Officers** - Regulatory adherence and reporting
- **Credit Risk Teams** - Lending decision support and portfolio analysis

## Key Business Objectives

### 🎯 **Growth & Opportunity Identification**
- **Revenue Expansion** - Identify cross-sell and upsell opportunities within existing relationships
- **Market Penetration** - Discover underserved segments and geographic opportunities
- **Relationship Deepening** - Strengthen client engagement through data-driven insights
- **Competitive Positioning** - Benchmark performance against market standards
- **Metro Performance Analysis** - Compare metropolitan areas to identify highest-growth potential markets
- **Strategic Resource Allocation** - Optimize investment and staffing across metro regions based on performance data

### ⚠️ **Risk Management & Mitigation**
- **Early Warning Systems** - Proactive identification of relationship and credit risks
- **Compliance Monitoring** - Automated flagging of regulatory and policy violations
- **Portfolio Optimization** - Balance risk exposure across client segments and geographies
- **Predictive Analytics** - Forecast potential issues before they impact the business

## Application Architecture

### 🏗️ **Hierarchical Data Structure**
```
Executive Dashboard
├── Metro VP View
│   ├── Market VP View
│   │   ├── Regional VP View
│   │   │   ├── Relationship Manager View
│   │   │   │   ├── Relationship View (Client Groups)
│   │   │   │   │   ├── Client 360 View
│   │   │   │   │   │   ├── Account View
│   │   │   │   │   │   │   └── Transaction View
```

### 📊 **Core Analytics Capabilities**

#### **Performance Metrics**
- Revenue trends and growth rates
- Client acquisition and retention rates
- Product penetration and wallet share
- Cross-sell success rates and opportunities
- Relationship health scoring

#### **Metro Comparison Analytics**
- **Side-by-Side Performance** - Compare KPIs across multiple metropolitan areas
- **Market Share Analysis** - Metro-specific competitive positioning and market penetration
- **Growth Opportunity Mapping** - Identify highest-potential metros for expansion
- **Resource Allocation Optimization** - Data-driven metro investment decisions
- **Benchmark Performance** - Compare metro performance against regional and national averages
- **Risk Distribution Analysis** - Metro-level risk concentration and exposure patterns

#### **Risk Analytics**
- Real-time risk scoring and alerts
- Beneficial ownership analysis
- Transaction pattern anomaly detection
- Compliance flag management
- Concentration risk monitoring

#### **Predictive Intelligence**
- Client behavior forecasting
- Revenue opportunity scoring
- Risk deterioration prediction
- Market trend analysis
- Competitive threat assessment

## Executive Metro Comparison Features

### 🏙️ **Metro Performance Dashboard**
Executive leadership requires comprehensive tools to compare performance across metropolitan areas for strategic decision-making and resource allocation.

#### **Key Comparison Metrics**
- **Revenue Performance** - Total revenue, growth rates, and year-over-year trends by metro
- **Client Metrics** - Client count, acquisition rates, retention rates, and average relationship value
- **Market Share** - Competitive positioning and market penetration by metropolitan area
- **Risk Profiles** - Risk distribution, concentration levels, and compliance metrics by metro
- **Profitability Analysis** - ROI, profit margins, and cost efficiency by metropolitan market
- **Growth Potential** - Market size, opportunity pipeline, and expansion potential scoring

#### **Interactive Comparison Tools**
- **Side-by-Side Grid View** - Tabular comparison of key metrics across selected metros
- **Ranking Tables** - Sortable metro performance rankings by any metric
- **Trend Analysis** - Historical performance trends and trajectory analysis
- **Benchmark Comparison** - Metro performance vs. regional and national averages
- **Heat Maps** - Geographic visualization of performance metrics across metro areas
- **Drill-Down Capability** - Click any metro to dive into detailed market analysis

#### **Decision Support Features**
- **Resource Allocation Simulator** - Model impact of investment reallocation across metros
- **Growth Opportunity Scoring** - AI-powered ranking of metros by growth potential
- **Risk-Adjusted Returns** - Performance metrics adjusted for market risk levels
- **Competitive Gap Analysis** - Identify metros where competition is gaining ground
- **Investment Recommendation Engine** - Data-driven suggestions for metro-specific investments

#### **Executive Actions**
- **Strategic Planning** - Long-term metro investment and growth strategies
- **Resource Reallocation** - Shift capital, personnel, and marketing resources between metros
- **Performance Review** - Quarterly metro performance assessments and target setting
- **Market Entry/Exit Decisions** - Data-driven expansion or consolidation decisions
- **Leadership Deployment** - Optimize executive and management assignments across metros

## User Journey Framework

### 🔍 **Executive Journey**
1. **Portfolio Overview** - High-level KPIs and trend analysis
2. **Metro Comparison Dashboard** - Side-by-side performance analysis across metropolitan areas
3. **Performance Drill-Down** - Identify top/bottom performers by region/market
4. **Risk Assessment** - Portfolio-wide risk exposure and concentration
5. **Strategic Planning** - Resource allocation and growth target setting based on metro performance

### 📈 **Regional Leadership Journey**
1. **Market Performance** - Regional KPIs vs. targets and benchmarks
2. **RM Performance** - Individual relationship manager effectiveness
3. **Client Portfolio Health** - Relationship strength and growth potential
4. **Opportunity Pipeline** - Prospect identification and conversion tracking

### 🎯 **Relationship Manager Journey**
1. **Portfolio Dashboard** - Personal KPIs and client relationship health
2. **Client Prioritization** - Risk-adjusted opportunity scoring
3. **Action Planning** - Next best actions based on client insights
4. **Performance Tracking** - Goal progress and achievement metrics

### 🛡️ **Risk Manager Journey**
1. **Risk Dashboard** - Portfolio-wide risk exposure and alerts
2. **Client Risk Analysis** - Individual client risk profiles and trends
3. **Compliance Monitoring** - Regulatory flag management and reporting
4. **Remediation Tracking** - Issue resolution and follow-up actions

## Key Features & Capabilities

### 🎨 **User Experience Design**
- **Persona-First Design** - Tailored interfaces for each user role
- **Progressive Disclosure** - Drill-down navigation from summary to detail
- **Contextual Actions** - Role-appropriate next steps and recommendations
- **Responsive Design** - Optimized for desktop, tablet, and mobile access

### 📱 **Interactive Dashboards**
- **Real-Time Data** - Live updates and notifications
- **Customizable Views** - Personalized KPI selection and layout
- **Interactive Charts** - Clickable visualizations for deeper analysis
- **Export Capabilities** - PDF reports and data extraction
- **Metro Comparison View** - Executive dashboard with multi-metro performance grids and ranking tables

### 🔔 **Alert & Notification System**
- **Risk Alerts** - Immediate notification of risk threshold breaches
- **Opportunity Alerts** - Proactive identification of growth opportunities
- **Compliance Notifications** - Regulatory deadline and requirement tracking
- **Performance Alerts** - Goal progress and achievement notifications

## Technical Implementation

### 🛠️ **Technology Stack**
- **Frontend**: Vue.js 3 with Composition API
- **Build Tool**: Vite 4.4.9 with Vue plugin and HMR
- **Styling**: Tailwind CSS 3.3.3 for responsive design with TD Bank branding
- **Charts**: Chart.js 4.5.0, D3.js 7.9.0, and ApexCharts 4.7.0 for interactive visualizations
- **Routing**: Vue Router 4.2.4 with history mode for SPA navigation
- **Database**: SQLite with comprehensive banking schema
- **State Management**: Vue reactive system with computed properties
- **Development**: PostCSS with Autoprefixer for cross-browser compatibility

### 🏗️ **Component Architecture**
- **Shared Components** - Reusable UI elements (KPICard, RiskBadge, AlertIndicator, ProductDotIndicator)
- **Layout Components** - Standardized page structures (BaseDetailView, DetailViewHeader)
- **View Components** - Role-specific dashboards and detail views
- **Chart Components** - Interactive data visualization components (LineChart, BarChart, DoughnutChart, Sparkline)
- **Specialized Components** - AIChat for contextual assistance, KRIPanel for risk indicators

### 📊 **Data Integration Strategy**
- **Mock Data Layer** - Comprehensive sample data for prototyping with realistic banking scenarios
- **API Integration Points** - Ready for real-time data connection
- **Hierarchical Data Structure** - Metro → Market → Region → RM → Relationship → Client → Account → Transaction
- **Database Schema** - Complete SQLite schema with relationships, constraints, and indexes
- **Caching Strategy** - Optimized performance for large datasets
- **Security Framework** - Role-based access control and data privacy

## Project Structure

```
src/
├── components/
│   ├── shared/              # Reusable UI components
│   │   ├── BaseDetailView.vue        # Common layout structure
│   │   ├── DetailViewHeader.vue      # Standardized header with breadcrumbs
│   │   ├── KPICard.vue              # Interactive metric display
│   │   ├── AlertIndicator.vue        # Risk and compliance alerts
│   │   ├── RiskBadge.vue            # Risk level visualization
│   │   └── ProductDotIndicator.vue   # Product penetration visualization
│   ├── charts/              # Data visualization components
│   │   ├── LineChart.vue            # Trend analysis with Chart.js
│   │   ├── BarChart.vue             # Comparative data visualization
│   │   ├── DoughnutChart.vue        # Distribution displays
│   │   └── Sparkline.vue            # Compact trend indicators
│   ├── ExecutiveView.vue            # Top-level portfolio dashboard
│   ├── MetroView.vue               # Metropolitan area analysis
│   ├── MarketView.vue              # Market-specific performance
│   ├── RegionView.vue              # Regional performance oversight
│   ├── RelationshipManagerView.vue  # RM portfolio management
│   ├── RelationshipView.vue         # Business relationship analysis
│   ├── ClientDetailView.vue         # Client 360-degree profile
│   ├── AccountView.vue             # Account-level details
│   ├── AIChat.vue                  # Contextual AI assistant
│   └── KRIPanel.vue                # Key Risk Indicators dashboard
├── data/
│   ├── mockData.js                 # Comprehensive sample dataset
│   └── schema.sql                  # Complete database schema
├── router/
│   └── index.js                    # Hierarchical routing configuration
└── styles/
    └── tailwind.css                # Custom Tailwind configuration
```

## Success Metrics

### 📈 **Business Impact**
- **Revenue Growth** - Measurable increase in client wallet share
- **Risk Reduction** - Decreased portfolio risk exposure
- **Efficiency Gains** - Reduced time-to-insight for decision makers
- **Client Satisfaction** - Improved relationship health scores

### 🎯 **User Adoption**
- **Login Frequency** - Daily active users by role
- **Feature Utilization** - Dashboard and drill-down usage patterns
- **Action Completion** - Follow-through on system recommendations
- **User Satisfaction** - Feedback scores and feature requests

## Future Roadmap

### 🚀 **Phase 1: Foundation** (Current)
- Core dashboard implementation
- Basic drill-down navigation
- Risk alert system
- Shared component library
- **Executive Metro Comparison Dashboard** - Multi-metro performance analysis and ranking

### 🔄 **Phase 2: Intelligence**
- Machine learning integration
- Predictive analytics
- Advanced risk modeling
- Automated insights generation
- **Metro Performance Forecasting** - Predictive analytics for metro-level growth potential

### 🌐 **Phase 3: Integration**
- Real-time data feeds
- External system connectivity
- Mobile application
- Advanced reporting suite
- **Cross-Metro Benchmarking** - Integration with external market data for competitive analysis

### 🎯 **Phase 4: Innovation**
- AI-powered recommendations
- Natural language interfaces
- Advanced visualization
- Workflow automation
- **Intelligent Resource Allocation** - AI-driven metro investment recommendations

## Development Guidelines

### 🎨 **Design Principles**
- **Clarity First** - Information hierarchy and visual simplicity
- **Action-Oriented** - Clear next steps and recommendations
- **Context-Aware** - Role-appropriate information and actions
- **Performance-Optimized** - Fast loading and responsive interactions

### 🔒 **Security Considerations**
- **Data Privacy** - Client information protection and access controls
- **Regulatory Compliance** - Banking regulation adherence
- **Audit Trail** - User action logging and data lineage
- **Secure Authentication** - Role-based access and session management

## Routing Configuration

### **Hierarchical Navigation Routes**
```javascript
// Executive level
/executive

// Metro level drill-down
/metro/:metroId

// Market level within metro
/metro/:metroId/market/:marketId

// Regional level within market
/metro/:metroId/market/:marketId/region/:regionId

// Relationship Manager level
/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId

// Business Relationship level
/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/relationship/:relationshipId

// Client level
/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/relationship/:relationshipId/client/:clientId

// Account level
/metro/:metroId/market/:marketId/region/:regionId/rm/:rmId/relationship/:relationshipId/client/:clientId/account/:accountId

// Direct client access shortcuts
/client/:clientId
```

### **Route Features**
- Props-based parameter passing for all hierarchy levels
- Automatic scroll-to-top on route changes
- Back button navigation support
- Breadcrumb navigation with contextual links

## Styling Guidelines

### 🎨 **Design System**
- **TD Bank Branding** - Primary green (#00A651) with professional gray palette
- **Component Classes** - Standardized utility classes for consistency
- **Responsive Design** - Mobile-first approach with touch-friendly interfaces
- **Accessibility** - WCAG compliance considerations throughout

### **Key CSS Classes**
```css
.card              /* Standard white cards with shadow and borders */
.metric-card       /* Interactive metric displays with hover effects */
.risk-flag         /* Risk level indicators with color coding */
.breadcrumb        /* Navigation breadcrumb styling */
.ai-suggestion     /* AI-powered insight styling */
.kpi-grid          /* KPI dashboard grid layouts */
```

### **Color Scheme**
- **Primary Brand**: TD Green (#00A651, #007A3D)
- **Risk Indicators**: Red (high), Yellow (medium), Green (low)
- **Status Colors**: Success green, Warning amber, Error red
- **Neutral Palette**: Professional grays for text and backgrounds

## Business Logic & Domain Concepts

### 🏦 **Banking Domain Models**
- **Portfolio Management** - Hierarchical client relationship structure with aggregated metrics
- **Risk Assessment** - Multi-level risk scoring including credit, operational, and compliance risks
- **Product Penetration** - Cross-sell opportunity identification across banking products
- **Regulatory Compliance** - AML, KYC, and suspicious activity monitoring with automated flagging

### 💼 **Business Intelligence Features**
- **Opportunity Scoring** - AI-driven revenue potential analysis with prioritization
- **Performance Benchmarking** - Metro, market, and peer comparison analytics
- **Risk Monitoring** - Real-time compliance and risk indicator tracking with alerts
- **Relationship Health** - Client relationship strength assessment with predictive analytics

### 📈 **Financial Calculations**
- **Portfolio Valuation** - Aggregated client portfolio values with growth trends
- **Revenue Tracking** - Monthly and annual revenue analysis with variance reporting
- **Risk Metrics** - Risk-adjusted return calculations and concentration analysis
- **Transaction Analysis** - Pattern detection and anomaly identification for compliance

## Data Privacy & Security

### 🔒 **Compliance Requirements**
- **Restricted Data Handling** - TIN (Tax Identification Numbers) removed as restricted information
- **Role-Based Access** - User persona-specific data visibility controls
- **Audit Trail** - User action logging and data lineage tracking
- **Data Masking** - Sensitive information protection in non-production environments

### **Security Best Practices**
- Client information protection with appropriate access controls
- Banking regulation adherence (SOX, Basel III, GDPR)
- Secure authentication with role-based permissions
- Session management and timeout controls

## Development Guidelines

### 🎯 **Code Standards**
- **Vue 3 Composition API** - Modern reactive programming patterns
- **Single File Components** - Template, script, and style organization
- **TypeScript-Ready** - Structured for easy TypeScript adoption
- **Performance Optimization** - Computed properties and efficient rendering

### **Component Development**
- **Reusability First** - Design components for maximum reuse across views
- **Props Validation** - Proper prop typing and validation
- **Event Handling** - Clear parent-child communication patterns
- **Error Boundaries** - Graceful error handling and user feedback

### **Data Patterns**
- **Hierarchical Data Flow** - Route params → Props → Data fetching → Child components
- **Computed Properties** - Derived data calculations for performance
- **Reactive State** - Vue 3 reactivity for real-time updates
- **Mock Data Integration** - Comprehensive sample data for development and testing

## AI Integration

### 🤖 **Contextual AI Assistant**
- **AIChat Component** - Integrated across all views for contextual assistance
- **Business Intelligence** - AI-powered insights and recommendations
- **Opportunity Identification** - Automated revenue potential analysis
- **Risk Pattern Detection** - Machine learning for compliance monitoring

### **AI Features**
- Context-aware suggestions based on current view and user role
- Natural language queries for data exploration
- Automated insight generation with actionable recommendations
- Predictive analytics for relationship and portfolio management

## Key Implementation Notes

### ⚠️ **Important Development Considerations**
- **Data Privacy Compliance** - TIN data has been removed from ClientDetailView as restricted information
- **Terminology Standardization** - "Risk Analysis" has been updated to "Risk Assessment" across all components
- **UI/UX Optimizations** - Font sizes, spacing, and layout have been optimized for professional banking interface
- **KPI Dashboard Order** - RelationshipManagerView displays metrics in specific order: Revenue FYTD, Net New Deposits, Net New Commitments, New Credit Relationships, Referrals
- **Risk Flag Modals** - Clickable risk flags provide detailed analysis borrowed from ClientDetailView implementation

### 🔧 **Technical Debt & Optimization**
- **Performance Monitoring** - Large dataset handling optimization needed for production scale
- **Accessibility** - Enhanced WCAG compliance implementation across all components
- **Testing Coverage** - Comprehensive unit and integration testing framework needed
- **Error Handling** - Robust error boundaries and user feedback systems

## Development Commands

### 🛠️ **Common Development Tasks**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

### **File Structure Best Practices**
- Keep components focused on single responsibilities
- Use descriptive file names that match component purposes
- Maintain consistent prop and event naming conventions
- Follow Vue 3 Composition API patterns throughout
- Implement proper component lifecycle management

This platform represents a comprehensive approach to business intelligence in commercial banking, providing each user persona with the tools and insights they need to drive growth, manage risk, and optimize performance across the entire organization.

This documentation provides comprehensive guidance for future Claude Code instances working on this Client 360 Business Intelligence Platform.