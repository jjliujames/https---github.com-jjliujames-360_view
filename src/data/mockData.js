// Mock data for Client 360 Portfolio Management Tool

// Executive level metrics - Enhanced with AI-driven opportunities
export const executiveMetrics = {
    totalPortfolioValue: 2400000000, // $2.4B
    totalClients: 1247,
    totalRevenue: 180000000, // $180M annually
    totalRMs: 12,

    // Enhanced Metrics
    transactionVolume12Mo: 45600000000, // $45.6B in transactions
    highRiskClientPercentage: 5.7, // 71/1247 clients
    totalRevenuePotential: 245000000, // $245M potential from opportunities
    productPenetrationOverall: 67.3, // Overall product penetration percentage

    // AI Opportunity Insights
    opportunityInsights: {
        totalOpportunityValue: 65000000, // $65M potential revenue
        clientsNeedingUpsell: 523, // 41.9% of clients
        avgOpportunityPerClient: 124500,
        topOpportunityTypes: [
            { type: 'Treasury Management', clients: 187, potential: 18700000, penetration: 45 },
            { type: 'FX Services', clients: 156, potential: 12480000, penetration: 62 },
            { type: 'Commercial Lending', clients: 134, potential: 20100000, penetration: 38 },
            { type: 'Investment Services', clients: 98, potential: 9800000, penetration: 72 },
            { type: 'Trade Finance', clients: 67, potential: 4020000, penetration: 81 }
        ]
    },

    // Product Penetration Dashboard
    productPenetration: {
        treasuryManagement: { penetration: 45, clients: 562, potential: 685, gap: 123 },
        fxServices: { penetration: 62, clients: 773, potential: 1247, gap: 474 },
        commercialLending: { penetration: 38, clients: 474, potential: 800, gap: 326 },
        investmentServices: { penetration: 72, clients: 898, potential: 1000, gap: 102 },
        tradeFinance: { penetration: 81, clients: 1010, potential: 1100, gap: 90 },
        cashManagement: { penetration: 89, clients: 1110, potential: 1247, gap: 137 }
    },

    // AI Opportunity Score Heatmap
    aiOpportunityHeatmap: [
        { metro: 'New York', score: 8.7, opportunities: 89, potential: 12500000 },
        { metro: 'London', score: 8.2, opportunities: 34, potential: 8200000 },
        { metro: 'Miami', score: 7.9, opportunities: 28, potential: 6800000 },
        { metro: 'Boston', score: 7.4, opportunities: 42, potential: 7100000 },
        { metro: 'Chicago', score: 7.1, opportunities: 31, potential: 5900000 },
        { metro: 'Philadelphia', score: 6.8, opportunities: 35, potential: 5200000 },
        { metro: 'Atlanta', score: 6.5, opportunities: 29, potential: 4800000 },
        { metro: 'Toronto', score: 6.2, opportunities: 23, potential: 3900000 }
    ],

    // Top Opportunities by Metro/Market
    topOpportunitiesByMetro: [
        {
            metro: 'New York Metro',
            opportunities: [
                { type: 'Treasury Management Upsell', clients: 45, revenue: 4500000, priority: 'High' },
                { type: 'FX Service Gap', clients: 38, revenue: 3040000, priority: 'High' },
                { type: 'Commercial Credit Facility', clients: 28, revenue: 4200000, priority: 'Medium' }
            ]
        },
        {
            metro: 'London Metro',
            opportunities: [
                { type: 'Cross-Border Payment Solutions', clients: 23, revenue: 2760000, priority: 'High' },
                { type: 'Investment Advisory', clients: 18, revenue: 1800000, priority: 'Medium' },
                { type: 'Trade Finance Expansion', clients: 15, revenue: 1050000, priority: 'Medium' }
            ]
        },
        {
            metro: 'Miami Metro',
            opportunities: [
                { type: 'Latin America FX Corridor', clients: 19, revenue: 2280000, priority: 'High' },
                { type: 'Commercial Real Estate Lending', clients: 16, revenue: 2400000, priority: 'High' },
                { type: 'Treasury Management', clients: 21, revenue: 2100000, priority: 'Medium' }
            ]
        }
    ],

    riskDistribution: {
        low: 892,
        medium: 284,
        high: 71
    },
    riskTrends: [
        { month: 'Jul 2024', low: 865, medium: 278, high: 78 },
        { month: 'Aug 2024', low: 873, medium: 281, high: 74 },
        { month: 'Sep 2024', low: 881, medium: 275, high: 82 },
        { month: 'Oct 2024', low: 887, medium: 279, high: 76 },
        { month: 'Nov 2024', low: 895, medium: 282, high: 69 },
        { month: 'Dec 2024', low: 892, medium: 284, high: 71 }
    ],
    monthlyTrends: [
        { month: 'Jul 2024', revenue: 14500000, newClients: 23, portfolioValue: 2200000000, clientCount: 1180, opportunities: 78 },
        { month: 'Aug 2024', revenue: 15200000, newClients: 31, portfolioValue: 2250000000, clientCount: 1195, opportunities: 82 },
        { month: 'Sep 2024', revenue: 14800000, newClients: 18, portfolioValue: 2180000000, clientCount: 1210, opportunities: 85 },
        { month: 'Oct 2024', revenue: 16100000, newClients: 28, portfolioValue: 2350000000, clientCount: 1225, opportunities: 89 },
        { month: 'Nov 2024', revenue: 15900000, newClients: 25, portfolioValue: 2320000000, clientCount: 1240, opportunities: 92 },
        { month: 'Dec 2024', revenue: 16200000, newClients: 22, portfolioValue: 2400000000, clientCount: 1247, opportunities: 95 }
    ],
    portfolioTrend: [
        { month: 'Jul 2024', portfolioValue: 2200000000 },
        { month: 'Aug 2024', portfolioValue: 2250000000 },
        { month: 'Sep 2024', portfolioValue: 2180000000 },
        { month: 'Oct 2024', portfolioValue: 2350000000 },
        { month: 'Nov 2024', portfolioValue: 2320000000 },
        { month: 'Dec 2024', portfolioValue: 2400000000 }
    ],
    clientGrowth: [
        { month: 'Jul 2024', clientCount: 1180 },
        { month: 'Aug 2024', clientCount: 1195 },
        { month: 'Sep 2024', clientCount: 1210 },
        { month: 'Oct 2024', clientCount: 1225 },
        { month: 'Nov 2024', clientCount: 1240 },
        { month: 'Dec 2024', clientCount: 1247 }
    ],
    sparklines: {
        portfolioValue: [2200, 2250, 2180, 2350, 2320, 2400], // 6-month trend in millions
        clientCount: [1180, 1195, 1210, 1225, 1240, 1247], // 6-month client growth
        revenue: [145, 152, 148, 161, 159, 162], // 6-month revenue in millions
        highRiskClients: [78, 74, 82, 76, 69, 71], // 6-month high risk client count
        opportunities: [78, 82, 85, 89, 92, 95] // 6-month opportunity count trend
    },
    keyRiskIndicators: {
        highRiskIndustry: {
            clientCount: 45,
            totalVolume: 890000000, // $890M
            categories: [
                { name: 'Cannabis', clients: 12, volume: 245000000 },
                { name: 'Gaming/Gambling', clients: 8, volume: 156000000 },
                { name: 'Cryptocurrency', clients: 15, volume: 289000000 },
                { name: 'Arms/Defense', clients: 6, volume: 134000000 },
                { name: 'Adult Entertainment', clients: 4, volume: 66000000 }
            ]
        },
        moneyServiceBusiness: {
            clientCount: 23,
            totalVolume: 456000000, // $456M
            transactionCount: 12450,
            categories: [
                { name: 'Money Transmitters', clients: 14, volume: 298000000, transactions: 8200 },
                { name: 'Currency Exchangers', clients: 6, volume: 112000000, transactions: 2800 },
                { name: 'Check Cashers', clients: 3, volume: 46000000, transactions: 1450 }
            ]
        },
        highCashTransactions: {
            clientCount: 67,
            totalVolume: 1200000000, // $1.2B
            transactionCount: 2340,
            thresholds: [
                { range: '$500K - $1M', clients: 45, volume: 580000000, transactions: 1890 },
                { range: '$1M - $5M', clients: 18, volume: 420000000, transactions: 380 },
                { range: '$5M+', clients: 4, volume: 200000000, transactions: 70 }
            ]
        },
        correspondentBanking: {
            clientCount: 34,
            totalVolume: 2100000000, // $2.1B
            transactionCount: 8900,
            countries: [
                { name: 'Mexico', clients: 12, volume: 890000000, transactions: 3200 },
                { name: 'Canada', clients: 8, volume: 567000000, transactions: 2100 },
                { name: 'UK', clients: 6, volume: 345000000, transactions: 1800 },
                { name: 'Germany', clients: 5, volume: 198000000, transactions: 1200 },
                { name: 'Others', clients: 3, volume: 100000000, transactions: 600 }
            ]
        },
        highRiskCountries: {
            clientCount: 19,
            totalVolume: 234000000, // $234M
            transactionCount: 890,
            countries: [
                { name: 'Iran', clients: 3, volume: 89000000, transactions: 230, riskLevel: 'Extreme' },
                { name: 'North Korea', clients: 1, volume: 12000000, transactions: 45, riskLevel: 'Extreme' },
                { name: 'Russia', clients: 8, volume: 78000000, transactions: 340, riskLevel: 'High' },
                { name: 'China', clients: 5, volume: 45000000, transactions: 180, riskLevel: 'Medium' },
                { name: 'Others', clients: 2, volume: 10000000, transactions: 95, riskLevel: 'Medium' }
            ]
        },
        personalSpending: {
            clientCount: 89,
            totalVolume: 145000000, // $145M
            transactionCount: 4560,
            categories: [
                { name: 'Luxury Goods', clients: 34, volume: 67000000, transactions: 1200 },
                { name: 'Cryptocurrency', clients: 28, volume: 45000000, transactions: 2100 },
                { name: 'Real Estate (Personal)', clients: 15, volume: 23000000, transactions: 890 },
                { name: 'Jewelry/Art', clients: 8, volume: 7000000, transactions: 240 },
                { name: 'Other Personal', clients: 4, volume: 3000000, transactions: 130 }
            ]
        },
        utrFilings: {
            totalFilings: 156,
            totalVolume: 890000000, // $890M
            categories: [
                { type: 'Structuring', filings: 45, volume: 234000000 },
                { type: 'Unusual Patterns', filings: 38, volume: 189000000 },
                { type: 'High-Risk Geography', filings: 29, volume: 156000000 },
                { type: 'MSB Related', filings: 24, volume: 167000000 },
                { type: 'Other Suspicious', filings: 20, volume: 144000000 }
            ]
        }
    }
}

// Metros data from CSV - Enhanced with AI-driven opportunities  
export const metros = [
    {
        id: 'new-york',
        name: 'New York Metro',
        portfolioValue: 950000000,
        clientCount: 487,
        revenue: 71250000,
        marketCount: 2,
        riskScore: 'Medium',

        // Enhanced Metro Metrics
        avgClientRiskScore: 6.8,
        revenuePerRM: 8906250, // revenue / total RMs in metro
        clientGrowthRate: 12.5, // annual %
        transactionVolume: 15800000000,

        // Opportunity Roll-Up
        opportunityMetrics: {
            totalOpportunityValue: 12500000,
            clientsNeedingUpsell: 89,
            avgOpportunitySize: 140450,
            conversionRate: 23.4
        },

        // Top 3 Product Gaps
        productGaps: [
            { product: 'Treasury Management', clientsWithoutProduct: 45, potential: 4500000, priority: 'High' },
            { product: 'FX Services', clientsWithoutProduct: 38, potential: 3040000, priority: 'High' },
            { product: 'Commercial Lending', clientsWithoutProduct: 28, potential: 4200000, priority: 'Medium' }
        ],

        // Unused High-Margin Services
        unusedServices: [
            { service: 'Investment Advisory', missedRevenue: 2100000, eligibleClients: 67 },
            { service: 'Trade Finance', missedRevenue: 1890000, eligibleClients: 34 },
            { service: 'Cash Management Premium', missedRevenue: 1230000, eligibleClients: 23 }
        ],

        // Top High-Risk Clients
        highRiskClients: [
            { name: 'Global Trading LLC', riskScore: 9.2, volume: 45000000, flags: ['Cross-Border', 'High-Cash'] },
            { name: 'International Holdings', riskScore: 8.9, volume: 38000000, flags: ['PEP', 'Sanctions'] },
            { name: 'Crypto Exchange Corp', riskScore: 8.7, volume: 28000000, flags: ['Crypto', 'MSB'] }
        ]
    },
    {
        id: 'boston',
        name: 'Boston Metro',
        portfolioValue: 420000000,
        clientCount: 218,
        revenue: 31500000,
        marketCount: 1,
        riskScore: 'Low',

        avgClientRiskScore: 4.2,
        revenuePerRM: 6300000,
        clientGrowthRate: 8.7,
        transactionVolume: 7200000000,

        opportunityMetrics: {
            totalOpportunityValue: 7100000,
            clientsNeedingUpsell: 42,
            avgOpportunitySize: 169050,
            conversionRate: 28.1
        },

        productGaps: [
            { product: 'Commercial Lending', clientsWithoutProduct: 28, potential: 2800000, priority: 'High' },
            { product: 'Investment Services', clientsWithoutProduct: 19, potential: 1900000, priority: 'Medium' },
            { product: 'Treasury Management', clientsWithoutProduct: 15, potential: 1500000, priority: 'Medium' }
        ],

        unusedServices: [
            { service: 'Portfolio Management', missedRevenue: 1450000, eligibleClients: 34 },
            { service: 'FX Premium Services', missedRevenue: 890000, eligibleClients: 18 },
            { service: 'Escrow Services', missedRevenue: 670000, eligibleClients: 12 }
        ],

        highRiskClients: [
            { name: 'Biotech Research Inc', riskScore: 7.1, volume: 18000000, flags: ['Research', 'International'] },
            { name: 'Maritime Logistics', riskScore: 6.8, volume: 15000000, flags: ['Cross-Border'] }
        ]
    },
    {
        id: 'philadelphia',
        name: 'Philadelphia Metro',
        portfolioValue: 380000000,
        clientCount: 195,
        revenue: 28500000,
        marketCount: 1,
        riskScore: 'Medium',

        avgClientRiskScore: 5.9,
        revenuePerRM: 5700000,
        clientGrowthRate: 9.2,
        transactionVolume: 6800000000,

        opportunityMetrics: {
            totalOpportunityValue: 5200000,
            clientsNeedingUpsell: 35,
            avgOpportunitySize: 148570,
            conversionRate: 25.7
        },

        productGaps: [
            { product: 'Treasury Management', clientsWithoutProduct: 23, potential: 2300000, priority: 'High' },
            { product: 'FX Services', clientsWithoutProduct: 18, potential: 1440000, priority: 'Medium' },
            { product: 'Trade Finance', clientsWithoutProduct: 12, potential: 840000, priority: 'Medium' }
        ],

        unusedServices: [
            { service: 'Commercial Real Estate Finance', missedRevenue: 1200000, eligibleClients: 28 },
            { service: 'Equipment Financing', missedRevenue: 780000, eligibleClients: 15 },
            { service: 'Letter of Credit Services', missedRevenue: 450000, eligibleClients: 8 }
        ],

        highRiskClients: [
            { name: 'Energy Trading Partners', riskScore: 8.3, volume: 22000000, flags: ['Energy', 'Cross-Border'] },
            { name: 'Chemical Imports LLC', riskScore: 7.9, volume: 19000000, flags: ['Chemical', 'Sanctions'] }
        ]
    },
    {
        id: 'atlanta',
        name: 'Atlanta Metro',
        portfolioValue: 340000000,
        clientCount: 167,
        revenue: 25500000,
        marketCount: 1,
        riskScore: 'Medium',

        avgClientRiskScore: 6.1,
        revenuePerRM: 6375000,
        clientGrowthRate: 11.3,
        transactionVolume: 5900000000,

        opportunityMetrics: {
            totalOpportunityValue: 4800000,
            clientsNeedingUpsell: 29,
            avgOpportunitySize: 165520,
            conversionRate: 22.8
        },

        productGaps: [
            { product: 'Commercial Lending', clientsWithoutProduct: 19, potential: 2280000, priority: 'High' },
            { product: 'Treasury Management', clientsWithoutProduct: 16, potential: 1600000, priority: 'Medium' },
            { product: 'Investment Services', clientsWithoutProduct: 14, potential: 1400000, priority: 'Low' }
        ],

        unusedServices: [
            { service: 'Supply Chain Finance', missedRevenue: 980000, eligibleClients: 22 },
            { service: 'International Wire Services', missedRevenue: 670000, eligibleClients: 13 },
            { service: 'Merchant Services', missedRevenue: 540000, eligibleClients: 18 }
        ],

        highRiskClients: [
            { name: 'Logistics Hub Corp', riskScore: 7.6, volume: 16000000, flags: ['Transportation', 'High-Cash'] },
            { name: 'Export Trading Co', riskScore: 7.2, volume: 13000000, flags: ['Export', 'Cross-Border'] }
        ]
    },
    {
        id: 'miami',
        name: 'Miami Metro',
        portfolioValue: 310000000,
        clientCount: 154,
        revenue: 23250000,
        marketCount: 2,
        riskScore: 'High',

        avgClientRiskScore: 7.8,
        revenuePerRM: 7750000,
        clientGrowthRate: 15.6,
        transactionVolume: 8900000000,

        opportunityMetrics: {
            totalOpportunityValue: 6800000,
            clientsNeedingUpsell: 28,
            avgOpportunitySize: 242860,
            conversionRate: 19.3
        },

        productGaps: [
            { product: 'Latin America FX Corridor', clientsWithoutProduct: 19, potential: 2280000, priority: 'High' },
            { product: 'Commercial Real Estate Finance', clientsWithoutProduct: 16, potential: 2400000, priority: 'High' },
            { product: 'Cross-Border Payment Solutions', clientsWithoutProduct: 21, potential: 2100000, priority: 'Medium' }
        ],

        unusedServices: [
            { service: 'International Trade Finance', missedRevenue: 1890000, eligibleClients: 31 },
            { service: 'Multi-Currency Accounts', missedRevenue: 1340000, eligibleClients: 24 },
            { service: 'Correspondent Banking', missedRevenue: 980000, eligibleClients: 17 }
        ],

        highRiskClients: [
            { name: 'Caribbean Trading Ltd', riskScore: 9.1, volume: 34000000, flags: ['Offshore', 'High-Cash', 'PEP'] },
            { name: 'Latin Export Partners', riskScore: 8.8, volume: 28000000, flags: ['Cross-Border', 'MSB'] },
            { name: 'Real Estate Holdings SA', riskScore: 8.4, volume: 25000000, flags: ['Real Estate', 'High-Cash'] }
        ]
    },
    {
        id: 'chicago',
        name: 'Chicago Metro',
        portfolioValue: 290000000,
        clientCount: 142,
        revenue: 21750000,
        marketCount: 1,
        riskScore: 'Medium',

        avgClientRiskScore: 5.6,
        revenuePerRM: 5437500,
        clientGrowthRate: 7.9,
        transactionVolume: 5200000000,

        opportunityMetrics: {
            totalOpportunityValue: 5900000,
            clientsNeedingUpsell: 31,
            avgOpportunitySize: 190320,
            conversionRate: 26.4
        },

        productGaps: [
            { product: 'Agricultural Finance', clientsWithoutProduct: 21, potential: 2520000, priority: 'High' },
            { product: 'Equipment Financing', clientsWithoutProduct: 18, potential: 1800000, priority: 'Medium' },
            { product: 'Supply Chain Finance', clientsWithoutProduct: 15, potential: 1350000, priority: 'Medium' }
        ],

        unusedServices: [
            { service: 'Commodity Trading Finance', missedRevenue: 1450000, eligibleClients: 29 },
            { service: 'Manufacturing Finance', missedRevenue: 890000, eligibleClients: 19 },
            { service: 'Transportation Finance', missedRevenue: 670000, eligibleClients: 14 }
        ],

        highRiskClients: [
            { name: 'Commodity Exchange Inc', riskScore: 7.3, volume: 19000000, flags: ['Commodity', 'High-Volume'] },
            { name: 'Manufacturing Consortium', riskScore: 6.9, volume: 16000000, flags: ['Manufacturing', 'Cross-Border'] }
        ]
    },
    {
        id: 'london',
        name: 'London Metro',
        portfolioValue: 250000000,
        clientCount: 128,
        revenue: 18750000,
        marketCount: 2,
        riskScore: 'High',

        avgClientRiskScore: 7.4,
        revenuePerRM: 9375000,
        clientGrowthRate: 13.8,
        transactionVolume: 12300000000,

        opportunityMetrics: {
            totalOpportunityValue: 8200000,
            clientsNeedingUpsell: 34,
            avgOpportunitySize: 241180,
            conversionRate: 18.7
        },

        productGaps: [
            { product: 'Cross-Border Payment Solutions', clientsWithoutProduct: 23, potential: 2760000, priority: 'High' },
            { product: 'Investment Advisory', clientsWithoutProduct: 18, potential: 1800000, priority: 'Medium' },
            { product: 'Trade Finance Expansion', clientsWithoutProduct: 15, potential: 1050000, priority: 'Medium' }
        ],

        unusedServices: [
            { service: 'European Regulatory Finance', missedRevenue: 2100000, eligibleClients: 28 },
            { service: 'Multi-Currency Treasury', missedRevenue: 1680000, eligibleClients: 21 },
            { service: 'Brexit Trade Solutions', missedRevenue: 1340000, eligibleClients: 19 }
        ],

        highRiskClients: [
            { name: 'European Trading Holdings', riskScore: 9.3, volume: 42000000, flags: ['Trading', 'High-Volume', 'PEP'] },
            { name: 'Offshore Investment Ltd', riskScore: 8.9, volume: 35000000, flags: ['Offshore', 'Investment', 'High-Cash'] },
            { name: 'Energy Futures Corp', riskScore: 8.6, volume: 31000000, flags: ['Energy', 'Derivatives'] }
        ]
    },
    {
        id: 'toronto',
        name: 'Toronto Metro',
        portfolioValue: 250000000,
        clientCount: 125,
        revenue: 18750000,
        marketCount: 1,
        riskScore: 'Medium',

        avgClientRiskScore: 5.2,
        revenuePerRM: 6250000,
        clientGrowthRate: 10.4,
        transactionVolume: 4800000000,

        opportunityMetrics: {
            totalOpportunityValue: 3900000,
            clientsNeedingUpsell: 23,
            avgOpportunitySize: 169570,
            conversionRate: 31.2
        },

        productGaps: [
            { product: 'US-Canada Cross-Border', clientsWithoutProduct: 17, potential: 1530000, priority: 'High' },
            { product: 'Resource Finance', clientsWithoutProduct: 14, potential: 1400000, priority: 'Medium' },
            { product: 'Export Finance', clientsWithoutProduct: 12, potential: 960000, priority: 'Medium' }
        ],

        unusedServices: [
            { service: 'NAFTA Trade Finance', missedRevenue: 980000, eligibleClients: 22 },
            { service: 'Resource Sector Banking', missedRevenue: 780000, eligibleClients: 16 },
            { service: 'Currency Hedging Solutions', missedRevenue: 590000, eligibleClients: 13 }
        ],

        highRiskClients: [
            { name: 'Resource Extraction Corp', riskScore: 7.1, volume: 21000000, flags: ['Resource', 'Environmental'] },
            { name: 'Cross-Border Holdings', riskScore: 6.8, volume: 18000000, flags: ['Cross-Border', 'Investment'] }
        ]
    }
]

// Markets data from CSV
export const markets = [
    {
        id: 'north-america-east',
        name: 'North America East',
        metroId: 'new-york',
        portfolioValue: 580000000,
        clientCount: 295,
        revenue: 43500000,
        regionCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'international-europe',
        name: 'International Europe',
        metroId: 'new-york',
        portfolioValue: 370000000,
        clientCount: 192,
        revenue: 27750000,
        regionCount: 2,
        riskScore: 'High'
    },
    {
        id: 'new-england',
        name: 'New England',
        metroId: 'boston',
        portfolioValue: 420000000,
        clientCount: 218,
        revenue: 31500000,
        regionCount: 2,
        riskScore: 'Low'
    },
    {
        id: 'mid-atlantic-south',
        name: 'Mid-Atlantic South',
        metroId: 'philadelphia',
        portfolioValue: 380000000,
        clientCount: 195,
        revenue: 28500000,
        regionCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'southeast',
        name: 'Southeast',
        metroId: 'atlanta',
        portfolioValue: 340000000,
        clientCount: 167,
        revenue: 25500000,
        regionCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'south-florida',
        name: 'South Florida',
        metroId: 'miami',
        portfolioValue: 185000000,
        clientCount: 92,
        revenue: 13875000,
        regionCount: 2,
        riskScore: 'High'
    },
    {
        id: 'latin-america',
        name: 'Latin America',
        metroId: 'miami',
        portfolioValue: 125000000,
        clientCount: 62,
        revenue: 9375000,
        regionCount: 2,
        riskScore: 'High'
    },
    {
        id: 'midwest',
        name: 'Midwest',
        metroId: 'chicago',
        portfolioValue: 290000000,
        clientCount: 142,
        revenue: 21750000,
        regionCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'europe-west',
        name: 'Europe West',
        metroId: 'london',
        portfolioValue: 150000000,
        clientCount: 77,
        revenue: 11250000,
        regionCount: 2,
        riskScore: 'High'
    },
    {
        id: 'europe-east',
        name: 'Europe East',
        metroId: 'london',
        portfolioValue: 100000000,
        clientCount: 51,
        revenue: 7500000,
        regionCount: 2,
        riskScore: 'High'
    },
    {
        id: 'canada',
        name: 'Canada',
        metroId: 'toronto',
        portfolioValue: 250000000,
        clientCount: 125,
        revenue: 18750000,
        regionCount: 3,
        riskScore: 'Medium'
    }
]

// Regions data from CSV
export const regions = [
    {
        id: 'northeast-corridor',
        name: 'Northeast Corridor',
        marketId: 'north-america-east',
        portfolioValue: 320000000,
        clientCount: 165,
        revenue: 24000000,
        rmCount: 3,
        riskScore: 'Medium'
    },
    {
        id: 'mid-atlantic',
        name: 'Mid-Atlantic',
        marketId: 'north-america-east',
        portfolioValue: 260000000,
        clientCount: 130,
        revenue: 19500000,
        rmCount: 3,
        riskScore: 'Medium'
    },
    {
        id: 'uk-ireland',
        name: 'UK & Ireland',
        marketId: 'international-europe',
        portfolioValue: 200000000,
        clientCount: 105,
        revenue: 15000000,
        rmCount: 2,
        riskScore: 'High'
    },
    {
        id: 'continental-europe',
        name: 'Continental Europe',
        marketId: 'international-europe',
        portfolioValue: 170000000,
        clientCount: 87,
        revenue: 12750000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'greater-boston',
        name: 'Greater Boston',
        marketId: 'new-england',
        portfolioValue: 250000000,
        clientCount: 130,
        revenue: 18750000,
        rmCount: 3,
        riskScore: 'Low'
    },
    {
        id: 'northern-new-england',
        name: 'Northern New England',
        marketId: 'new-england',
        portfolioValue: 170000000,
        clientCount: 88,
        revenue: 12750000,
        rmCount: 2,
        riskScore: 'Low'
    },
    {
        id: 'philadelphia-metro',
        name: 'Philadelphia Metro Region',
        marketId: 'mid-atlantic-south',
        portfolioValue: 220000000,
        clientCount: 115,
        revenue: 16500000,
        rmCount: 3,
        riskScore: 'Medium'
    },
    {
        id: 'delaware-valley',
        name: 'Delaware Valley',
        marketId: 'mid-atlantic-south',
        portfolioValue: 160000000,
        clientCount: 80,
        revenue: 12000000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'georgia-metro',
        name: 'Georgia Metro',
        marketId: 'southeast',
        portfolioValue: 200000000,
        clientCount: 98,
        revenue: 15000000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'carolinas',
        name: 'Carolinas',
        marketId: 'southeast',
        portfolioValue: 140000000,
        clientCount: 69,
        revenue: 10500000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'miami-dade',
        name: 'Miami-Dade',
        marketId: 'south-florida',
        portfolioValue: 110000000,
        clientCount: 55,
        revenue: 8250000,
        rmCount: 2,
        riskScore: 'High'
    },
    {
        id: 'broward-palm-beach',
        name: 'Broward-Palm Beach',
        marketId: 'south-florida',
        portfolioValue: 75000000,
        clientCount: 37,
        revenue: 5625000,
        rmCount: 1,
        riskScore: 'Medium'
    },
    {
        id: 'caribbean',
        name: 'Caribbean',
        marketId: 'latin-america',
        portfolioValue: 70000000,
        clientCount: 35,
        revenue: 5250000,
        rmCount: 1,
        riskScore: 'High'
    },
    {
        id: 'central-america',
        name: 'Central America',
        marketId: 'latin-america',
        portfolioValue: 55000000,
        clientCount: 27,
        revenue: 4125000,
        rmCount: 1,
        riskScore: 'High'
    },
    {
        id: 'illinois-metro',
        name: 'Illinois Metro',
        marketId: 'midwest',
        portfolioValue: 170000000,
        clientCount: 83,
        revenue: 12750000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'great-lakes',
        name: 'Great Lakes',
        marketId: 'midwest',
        portfolioValue: 120000000,
        clientCount: 59,
        revenue: 9000000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'uk-metro',
        name: 'UK Metro',
        marketId: 'europe-west',
        portfolioValue: 90000000,
        clientCount: 46,
        revenue: 6750000,
        rmCount: 1,
        riskScore: 'High'
    },
    {
        id: 'western-europe',
        name: 'Western Europe',
        marketId: 'europe-west',
        portfolioValue: 60000000,
        clientCount: 31,
        revenue: 4500000,
        rmCount: 1,
        riskScore: 'Medium'
    },
    {
        id: 'eastern-europe',
        name: 'Eastern Europe',
        marketId: 'europe-east',
        portfolioValue: 60000000,
        clientCount: 31,
        revenue: 4500000,
        rmCount: 1,
        riskScore: 'High'
    },
    {
        id: 'nordic',
        name: 'Nordic',
        marketId: 'europe-east',
        portfolioValue: 40000000,
        clientCount: 20,
        revenue: 3000000,
        rmCount: 1,
        riskScore: 'Medium'
    },
    {
        id: 'ontario',
        name: 'Ontario',
        marketId: 'canada',
        portfolioValue: 150000000,
        clientCount: 75,
        revenue: 11250000,
        rmCount: 2,
        riskScore: 'Medium'
    },
    {
        id: 'western-canada',
        name: 'Western Canada',
        marketId: 'canada',
        portfolioValue: 60000000,
        clientCount: 30,
        revenue: 4500000,
        rmCount: 1,
        riskScore: 'Medium'
    },
    {
        id: 'eastern-canada',
        name: 'Eastern Canada',
        marketId: 'canada',
        portfolioValue: 40000000,
        clientCount: 20,
        revenue: 3000000,
        rmCount: 1,
        riskScore: 'Low'
    }
]

// Relationship Managers - Updated for new CSV structure
export const relationshipManagers = [
    // Northeast Corridor
    {
        id: 'rm-001',
        name: 'Sarah Johnson',
        regionId: 'northeast-corridor',
        portfolioValue: 120000000,
        clientCount: 60,
        revenue: 9000000,
        riskScore: 'Low',
        clientIds: ['client-001', 'client-002', 'client-003', 'client-004']
    },
    {
        id: 'rm-002',
        name: 'Michael Chen',
        regionId: 'northeast-corridor',
        portfolioValue: 110000000,
        clientCount: 55,
        revenue: 8250000,
        riskScore: 'Medium',
        clientIds: ['client-005', 'client-006', 'client-007']
    },
    {
        id: 'rm-003',
        name: 'Emily Rodriguez',
        regionId: 'northeast-corridor',
        portfolioValue: 90000000,
        clientCount: 50,
        revenue: 6750000,
        riskScore: 'Medium',
        clientIds: ['client-008', 'client-009']
    },
    // Mid-Atlantic
    {
        id: 'rm-004',
        name: 'David Thompson',
        regionId: 'mid-atlantic',
        portfolioValue: 95000000,
        clientCount: 48,
        revenue: 7125000,
        riskScore: 'Medium',
        clientIds: ['client-010', 'client-011', 'client-012']
    },
    {
        id: 'rm-005',
        name: 'Lisa Wang',
        regionId: 'mid-atlantic',
        portfolioValue: 85000000,
        clientCount: 42,
        revenue: 6375000,
        riskScore: 'Low',
        clientIds: ['client-013', 'client-014']
    },
    {
        id: 'rm-006',
        name: 'Robert Martinez',
        regionId: 'mid-atlantic',
        portfolioValue: 80000000,
        clientCount: 40,
        revenue: 6000000,
        riskScore: 'Medium',
        clientIds: ['client-015', 'client-016']
    },
    // Greater Boston
    {
        id: 'rm-007',
        name: 'Jennifer Kim',
        regionId: 'greater-boston',
        portfolioValue: 90000000,
        clientCount: 45,
        revenue: 6750000,
        riskScore: 'Low',
        clientIds: ['client-017', 'client-018']
    },
    {
        id: 'rm-008',
        name: 'Christopher Lee',
        regionId: 'greater-boston',
        portfolioValue: 85000000,
        clientCount: 43,
        revenue: 6375000,
        riskScore: 'Low',
        clientIds: ['client-019', 'client-020']
    },
    {
        id: 'rm-009',
        name: 'Amanda Foster',
        regionId: 'greater-boston',
        portfolioValue: 75000000,
        clientCount: 42,
        revenue: 5625000,
        riskScore: 'Low',
        clientIds: ['client-021']
    },
    // UK & Ireland
    {
        id: 'rm-010',
        name: 'Oliver Schmidt',
        regionId: 'uk-ireland',
        portfolioValue: 110000000,
        clientCount: 55,
        revenue: 8250000,
        riskScore: 'High',
        clientIds: ['client-022', 'client-023']
    },
    {
        id: 'rm-011',
        name: 'Sophie Dubois',
        regionId: 'uk-ireland',
        portfolioValue: 90000000,
        clientCount: 50,
        revenue: 6750000,
        riskScore: 'High',
        clientIds: ['client-024', 'client-025']
    },
    // Continental Europe
    {
        id: 'rm-012',
        name: 'Hiroshi Tanaka',
        regionId: 'continental-europe',
        portfolioValue: 85000000,
        clientCount: 44,
        revenue: 6375000,
        riskScore: 'Medium',
        clientIds: ['client-026', 'client-027']
    },
    {
        id: 'rm-013',
        name: 'Maria Gonzalez',
        regionId: 'continental-europe',
        portfolioValue: 85000000,
        clientCount: 43,
        revenue: 6375000,
        riskScore: 'Medium',
        clientIds: ['client-028', 'client-029']
    },
    // Philadelphia Metro
    {
        id: 'rm-014',
        name: 'James Wilson',
        regionId: 'philadelphia-metro',
        portfolioValue: 80000000,
        clientCount: 40,
        revenue: 6000000,
        riskScore: 'Medium',
        clientIds: ['client-030', 'client-031']
    },
    {
        id: 'rm-015',
        name: 'Rachel Adams',
        regionId: 'philadelphia-metro',
        portfolioValue: 75000000,
        clientCount: 38,
        revenue: 5625000,
        riskScore: 'Medium',
        clientIds: ['client-032', 'client-033']
    },
    {
        id: 'rm-016',
        name: 'Kevin O\'Brien',
        regionId: 'philadelphia-metro',
        portfolioValue: 65000000,
        clientCount: 37,
        revenue: 4875000,
        riskScore: 'Low',
        clientIds: ['client-034']
    },
    // Miami-Dade
    {
        id: 'rm-017',
        name: 'Carlos Rodriguez',
        regionId: 'miami-dade',
        portfolioValue: 60000000,
        clientCount: 30,
        revenue: 4500000,
        riskScore: 'High',
        clientIds: ['client-035', 'client-036']
    },
    {
        id: 'rm-018',
        name: 'Ana Morales',
        regionId: 'miami-dade',
        portfolioValue: 50000000,
        clientCount: 25,
        revenue: 3750000,
        riskScore: 'High',
        clientIds: ['client-037']
    },
    // Ontario
    {
        id: 'rm-019',
        name: 'William Fraser',
        regionId: 'ontario',
        portfolioValue: 80000000,
        clientCount: 40,
        revenue: 6000000,
        riskScore: 'Medium',
        clientIds: ['client-038', 'client-039']
    },
    {
        id: 'rm-020',
        name: 'Marie Tremblay',
        regionId: 'ontario',
        portfolioValue: 70000000,
        clientCount: 35,
        revenue: 5250000,
        riskScore: 'Medium',
        clientIds: ['client-040']
    }
]

export const relationships = {
    'rm1': [
        {
            id: 'rel1',
            name: 'TechCorp Holdings',
            industry: 'Technology',
            totalValue: 85e6,
            clientCount: 12,
            revenue: 5.2e6,
            riskLevel: 'Low',
            rmId: 'rm1'
        },
        {
            id: 'rel2',
            name: 'Manufacturing Plus Group',
            industry: 'Manufacturing',
            totalValue: 67e6,
            clientCount: 8,
            revenue: 4.1e6,
            riskLevel: 'Medium',
            rmId: 'rm1'
        }
    ],
    'rm2': [
        {
            id: 'rel3',
            name: 'Pacific Retail Ventures',
            industry: 'Retail',
            totalValue: 92e6,
            clientCount: 15,
            revenue: 6.8e6,
            riskLevel: 'Low',
            rmId: 'rm2'
        }
    ]
}

export const clients = {
    'client-001': {
        id: 'client-001',
        name: 'TechCorp Industries',
        industry: 'Technology',
        location: 'New York, NY',
        portfolioValue: 85000000,
        annualRevenue: 5200000,
        riskFlags: ['High-Cash', 'Crypto'],
        lastContact: '2024-01-15'
    },
    'client-002': {
        id: 'client-002',
        name: 'Global Manufacturing Corp',
        industry: 'Manufacturing',
        location: 'Boston, MA',
        portfolioValue: 67000000,
        annualRevenue: 4100000,
        riskFlags: ['Cross-Border'],
        lastContact: '2024-01-12'
    },
    'client-003': {
        id: 'client-003',
        name: 'Financial Services Group',
        industry: 'Financial Services',
        location: 'Hartford, CT',
        portfolioValue: 92000000,
        annualRevenue: 6800000,
        riskFlags: ['MSB', 'High-Cash'],
        lastContact: '2024-01-18'
    },
    'client-004': {
        id: 'client-004',
        name: 'Healthcare Solutions Inc',
        industry: 'Healthcare',
        location: 'Philadelphia, PA',
        portfolioValue: 36000000,
        annualRevenue: 2400000,
        riskFlags: [],
        lastContact: '2024-01-10'
    },
    'client-005': {
        id: 'client-005',
        name: 'Energy Dynamics LLC',
        industry: 'Energy',
        location: 'Albany, NY',
        portfolioValue: 78000000,
        annualRevenue: 5800000,
        riskFlags: ['Cross-Border', 'High-Cash'],
        lastContact: '2024-01-16'
    },
    'client-006': {
        id: 'client-006',
        name: 'Retail Solutions Corp',
        industry: 'Retail',
        location: 'Burlington, VT',
        portfolioValue: 45000000,
        annualRevenue: 3200000,
        riskFlags: ['Crypto'],
        lastContact: '2024-01-14'
    },
    'client-007': {
        id: 'client-007',
        name: 'Construction Partners',
        industry: 'Construction',
        location: 'Providence, RI',
        portfolioValue: 117000000,
        annualRevenue: 8000000,
        riskFlags: ['High-Cash'],
        lastContact: '2024-01-13'
    },
    'client-008': {
        id: 'client-008',
        name: 'Aerospace Technologies',
        industry: 'Aerospace',
        location: 'Worcester, MA',
        portfolioValue: 134000000,
        annualRevenue: 9500000,
        riskFlags: ['Cross-Border', 'PEP'],
        lastContact: '2024-01-17'
    },
    'client-009': {
        id: 'client-009',
        name: 'Agricultural Holdings',
        industry: 'Agriculture',
        location: 'Manchester, NH',
        portfolioValue: 66000000,
        annualRevenue: 4500000,
        riskFlags: [],
        lastContact: '2024-01-11'
    },
    'client-010': {
        id: 'client-010',
        name: 'Logistics Network Inc',
        industry: 'Logistics',
        location: 'Miami, FL',
        portfolioValue: 89000000,
        annualRevenue: 6200000,
        riskFlags: ['Cross-Border', 'High-Cash'],
        lastContact: '2024-01-19'
    },
    'client-011': {
        id: 'client-011',
        name: 'Tourism Ventures',
        industry: 'Tourism',
        location: 'Orlando, FL',
        portfolioValue: 52000000,
        annualRevenue: 3800000,
        riskFlags: ['High-Cash'],
        lastContact: '2024-01-12'
    },
    'client-012': {
        id: 'client-012',
        name: 'Maritime Solutions',
        industry: 'Maritime',
        location: 'Jacksonville, FL',
        portfolioValue: 109000000,
        annualRevenue: 7750000,
        riskFlags: ['Cross-Border', 'MSB'],
        lastContact: '2024-01-15'
    },
    'client-013': {
        id: 'client-013',
        name: 'Real Estate Holdings',
        industry: 'Real Estate',
        location: 'Atlanta, GA',
        portfolioValue: 156000000,
        annualRevenue: 11200000,
        riskFlags: ['High-Cash', 'PEP'],
        lastContact: '2024-01-18'
    },
    'client-014': {
        id: 'client-014',
        name: 'Media Enterprises',
        industry: 'Media',
        location: 'Charlotte, NC',
        portfolioValue: 64000000,
        annualRevenue: 4300000,
        riskFlags: ['Crypto'],
        lastContact: '2024-01-13'
    },
    'client-015': {
        id: 'client-015',
        name: 'Chemical Industries',
        industry: 'Chemical',
        location: 'Charleston, SC',
        portfolioValue: 98000000,
        annualRevenue: 7000000,
        riskFlags: ['Cross-Border', 'Sanctions'],
        lastContact: '2024-01-16'
    },
    'client-016': {
        id: 'client-016',
        name: 'Pharmaceutical Corp',
        industry: 'Pharmaceutical',
        location: 'Nashville, TN',
        portfolioValue: 82000000,
        annualRevenue: 5500000,
        riskFlags: ['MSB', 'High-Cash'],
        lastContact: '2024-01-14'
    },
    'client-017': {
        id: 'client-017',
        name: 'Automotive Solutions',
        industry: 'Automotive',
        location: 'Detroit, MI',
        portfolioValue: 91000000,
        annualRevenue: 6300000,
        riskFlags: ['Cross-Border'],
        lastContact: '2024-01-17'
    },
    'client-018': {
        id: 'client-018',
        name: 'Food Processing Inc',
        industry: 'Food Processing',
        location: 'Chicago, IL',
        portfolioValue: 69000000,
        annualRevenue: 4700000,
        riskFlags: ['High-Cash'],
        lastContact: '2024-01-11'
    },
    'client-019': {
        id: 'client-019',
        name: 'Software Development',
        industry: 'Technology',
        location: 'Milwaukee, WI',
        portfolioValue: 75000000,
        annualRevenue: 5100000,
        riskFlags: ['Crypto', 'High-Cash'],
        lastContact: '2024-01-19'
    },
    'client-020': {
        id: 'client-020',
        name: 'Mining Operations',
        industry: 'Mining',
        location: 'Minneapolis, MN',
        portfolioValue: 65000000,
        annualRevenue: 4400000,
        riskFlags: [],
        lastContact: '2024-01-12'
    },
    'client-021': {
        id: 'client-021',
        name: 'Telecommunications Corp',
        industry: 'Telecommunications',
        location: 'Kansas City, MO',
        portfolioValue: 130000000,
        annualRevenue: 9750000,
        riskFlags: ['Cross-Border', 'High-Cash'],
        lastContact: '2024-01-18'
    },
    'client-022': {
        id: 'client-022',
        name: 'European Trading Ltd',
        industry: 'Trading',
        location: 'London, UK',
        portfolioValue: 112000000,
        annualRevenue: 8200000,
        riskFlags: ['Cross-Border', 'PEP', 'High-Cash'],
        lastContact: '2024-01-15'
    },
    'client-023': {
        id: 'client-023',
        name: 'Financial Services Europe',
        industry: 'Financial Services',
        location: 'Frankfurt, Germany',
        portfolioValue: 88000000,
        annualRevenue: 6800000,
        riskFlags: ['MSB', 'Cross-Border'],
        lastContact: '2024-01-13'
    },
    'client-024': {
        id: 'client-024',
        name: 'Luxury Goods SA',
        industry: 'Luxury Goods',
        location: 'Paris, France',
        portfolioValue: 95000000,
        annualRevenue: 7100000,
        riskFlags: ['High-Cash', 'PEP'],
        lastContact: '2024-01-16'
    },
    'client-025': {
        id: 'client-025',
        name: 'Investment Holdings',
        industry: 'Investment',
        location: 'Zurich, Switzerland',
        portfolioValue: 85000000,
        annualRevenue: 6400000,
        riskFlags: ['Cross-Border', 'High-Cash'],
        lastContact: '2024-01-14'
    },
    'client-026': {
        id: 'client-026',
        name: 'Asia Pacific Trading',
        industry: 'Trading',
        location: 'Tokyo, Japan',
        portfolioValue: 124000000,
        annualRevenue: 9200000,
        riskFlags: ['Cross-Border', 'High-Cash', 'MSB'],
        lastContact: '2024-01-17'
    },
    'client-027': {
        id: 'client-027',
        name: 'Technology Solutions Asia',
        industry: 'Technology',
        location: 'Singapore',
        portfolioValue: 96000000,
        annualRevenue: 7300000,
        riskFlags: ['Cross-Border', 'Crypto'],
        lastContact: '2024-01-12'
    },
    'rel1': [
        {
            id: 'client1',
            name: 'TechCorp Inc.',
            taxId: '***-**-1234',
            industry: 'Software Development',
            geography: 'New York, NY',
            relationshipId: 'rel1',
            totalDeposits: 45e6,
            totalLoans: 15e6,
            totalRevenue: 2.8e6,
            accountCount: 8,
            riskFlags: ['High-Cash', 'Crypto'],
            riskLevel: 'Low',
            beneficialOwnership: [
                { name: 'John Smith', role: 'CEO', ownership: '45%' },
                { name: 'TechVentures LLC', role: 'Investor', ownership: '35%' },
                { name: 'Employee Stock Plan', role: 'Trust', ownership: '20%' }
            ],
            transactionTrends: [
                { month: 'Jan', volume: 12.5e6, count: 245 },
                { month: 'Feb', volume: 15.2e6, count: 289 },
                { month: 'Mar', volume: 18.1e6, count: 312 },
                { month: 'Apr', volume: 16.8e6, count: 298 },
                { month: 'May', volume: 22.3e6, count: 354 },
                { month: 'Jun', volume: 19.7e6, count: 331 }
            ]
        },
        {
            id: 'client2',
            name: 'TechCorp Services',
            taxId: '***-**-1235',
            industry: 'Professional Services',
            geography: 'New York, NY',
            relationshipId: 'rel1',
            totalDeposits: 28e6,
            totalLoans: 8e6,
            totalRevenue: 1.9e6,
            accountCount: 5,
            riskFlags: ['MSB'],
            riskLevel: 'Medium',
            beneficialOwnership: [
                { name: 'TechCorp Inc.', role: 'Parent Company', ownership: '100%' }
            ],
            transactionTrends: [
                { month: 'Jan', volume: 8.2e6, count: 156 },
                { month: 'Feb', volume: 9.1e6, count: 178 },
                { month: 'Mar', volume: 11.3e6, count: 201 },
                { month: 'Apr', volume: 10.7e6, count: 189 },
                { month: 'May', volume: 13.8e6, count: 234 },
                { month: 'Jun', volume: 12.4e6, count: 218 }
            ]
        }
    ]
}

export const accounts = {
    'client1': [
        {
            id: 'acc1',
            type: 'Operating Account',
            number: '****1234',
            balance: 15.8e6,
            currency: 'USD',
            status: 'Active',
            clientId: 'client1',
            monthlyActivity: [
                { month: 'Jan', deposits: 8.5e6, withdrawals: 6.2e6, transactions: 145 },
                { month: 'Feb', deposits: 9.8e6, withdrawals: 7.1e6, transactions: 167 },
                { month: 'Mar', deposits: 12.1e6, withdrawals: 8.9e6, transactions: 189 },
                { month: 'Apr', deposits: 11.2e6, withdrawals: 8.3e6, transactions: 172 },
                { month: 'May', deposits: 14.7e6, withdrawals: 10.2e6, transactions: 201 },
                { month: 'Jun', deposits: 13.1e6, withdrawals: 9.6e6, transactions: 186 }
            ]
        },
        {
            id: 'acc2',
            type: 'Savings Account',
            number: '****5678',
            balance: 29.2e6,
            currency: 'USD',
            status: 'Active',
            clientId: 'client1',
            monthlyActivity: [
                { month: 'Jan', deposits: 4.0e6, withdrawals: 1.3e6, transactions: 25 },
                { month: 'Feb', deposits: 5.4e6, withdrawals: 2.1e6, transactions: 31 },
                { month: 'Mar', deposits: 6.0e6, withdrawals: 1.8e6, transactions: 28 },
                { month: 'Apr', deposits: 5.6e6, withdrawals: 2.5e6, transactions: 33 },
                { month: 'May', deposits: 7.6e6, withdrawals: 3.1e6, transactions: 39 },
                { month: 'Jun', deposits: 6.6e6, withdrawals: 2.7e6, transactions: 35 }
            ]
        }
    ]
}

export const transactions = {
    'acc1': [
        {
            id: 'txn1',
            date: '2024-01-15',
            type: 'Wire Transfer',
            amount: 2.5e6,
            direction: 'Inbound',
            counterparty: 'Global Tech Solutions',
            status: 'Completed',
            flags: ['Large Amount'],
            accountId: 'acc1'
        },
        {
            id: 'txn2',
            date: '2024-01-16',
            type: 'ACH Transfer',
            amount: 485000,
            direction: 'Outbound',
            counterparty: 'Vendor Services Inc',
            status: 'Completed',
            flags: [],
            accountId: 'acc1'
        },
        {
            id: 'txn3',
            date: '2024-01-17',
            type: 'Wire Transfer',
            amount: 1.8e6,
            direction: 'Outbound',
            counterparty: 'International Partners Ltd',
            status: 'Completed',
            flags: ['International', 'Large Amount'],
            accountId: 'acc1'
        }
    ]
}

// Helper functions
export const formatCurrency = (amount) => {
    if (amount >= 1e9) {
        return `$${(amount / 1e9).toFixed(1)}B`
    } else if (amount >= 1e6) {
        return `$${(amount / 1e6).toFixed(1)}M`
    } else if (amount >= 1e3) {
        return `$${(amount / 1e3).toFixed(1)}K`
    }
    return `$${amount.toLocaleString()}`
}

export const getRiskColor = (riskScore) => {
    switch (riskScore.toLowerCase()) {
        case 'low': return 'bg-green-100 text-green-800'
        case 'medium': return 'bg-yellow-100 text-yellow-800'
        case 'high': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

// Navigation helpers
export const getMetroById = (metroId) => metros.find(m => m.id === metroId)
export const getMarketsByMetro = (metroId) => markets.filter(m => m.metroId === metroId)
export const getMarketById = (marketId) => markets.find(m => m.id === marketId)
export const getRegionById = (regionId) => regions.find(r => r.id === regionId)
export const getRMById = (rmId) => relationshipManagers.find(rm => rm.id === rmId)
export const getRegionsByMarket = (marketId) => regions.filter(r => r.marketId === marketId)
export const getRMsByRegion = (regionId) => relationshipManagers.filter(rm => rm.regionId === regionId) 