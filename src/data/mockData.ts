import { Company, Alert, DataSource } from '../types';

export const companies: Company[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    sector: 'Technology',
    score: 92,
    trend: 'stable',
    trendPercentage: 0.5,
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    alerts: [],
    riskLevel: 'Low',
    marketCap: 3000000,
    debtToEquity: 1.73,
    currentRatio: 1.07,
    roe: 0.26,
    sentimentScore: 0.75
  },
  {
    id: '2',
    name: 'Tesla Inc.',
    ticker: 'TSLA',
    sector: 'Automotive',
    score: 78,
    trend: 'down',
    trendPercentage: -3.2,
    lastUpdated: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    alerts: [
      {
        id: 'alert1',
        type: 'score_change',
        message: 'Score decreased due to production concerns',
        severity: 'medium',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ],
    riskLevel: 'Medium',
    marketCap: 800000,
    debtToEquity: 0.17,
    currentRatio: 1.29,
    roe: 0.19,
    sentimentScore: 0.45
  },
  {
    id: '3',
    name: 'JPMorgan Chase & Co.',
    ticker: 'JPM',
    sector: 'Banking',
    score: 85,
    trend: 'up',
    trendPercentage: 2.1,
    lastUpdated: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    alerts: [],
    riskLevel: 'Low',
    marketCap: 450000,
    debtToEquity: 1.21,
    currentRatio: 1.15,
    roe: 0.14,
    sentimentScore: 0.68
  },
  {
    id: '4',
    name: 'Exxon Mobil Corporation',
    ticker: 'XOM',
    sector: 'Energy',
    score: 71,
    trend: 'up',
    trendPercentage: 4.7,
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    alerts: [
      {
        id: 'alert2',
        type: 'news_event',
        message: 'Positive earnings guidance announced',
        severity: 'low',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ],
    riskLevel: 'Medium',
    marketCap: 380000,
    debtToEquity: 0.24,
    currentRatio: 1.43,
    roe: 0.17,
    sentimentScore: 0.52
  },
  {
    id: '5',
    name: 'General Electric Company',
    ticker: 'GE',
    sector: 'Industrial',
    score: 65,
    trend: 'down',
    trendPercentage: -5.8,
    lastUpdated: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    alerts: [
      {
        id: 'alert3',
        type: 'financial_update',
        message: 'Debt restructuring concerns raised',
        severity: 'high',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ],
    riskLevel: 'High',
    marketCap: 95000,
    debtToEquity: 2.45,
    currentRatio: 0.89,
    roe: 0.08,
    sentimentScore: 0.32
  },
  {
    id: '6',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    sector: 'Technology',
    score: 89,
    trend: 'stable',
    trendPercentage: 1.2,
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    alerts: [],
    riskLevel: 'Low',
    marketCap: 2800000,
    debtToEquity: 0.47,
    currentRatio: 1.89,
    roe: 0.36,
    sentimentScore: 0.82
  }
];

export const recentAlerts: Alert[] = [
  {
    id: 'recent1',
    type: 'score_change',
    message: 'General Electric score dropped 6% due to debt restructuring concerns',
    severity: 'high',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    companyId: '5'
  },
  {
    id: 'recent2',
    type: 'news_event',
    message: 'Exxon Mobil upgraded outlook following positive earnings guidance',
    severity: 'medium',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    companyId: '4'
  },
  {
    id: 'recent3',
    type: 'rating_change',
    message: 'JPMorgan Chase maintains stable rating despite market volatility',
    severity: 'low',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    companyId: '3'
  },
  {
    id: 'recent4',
    type: 'financial_update',
    message: 'Tesla production metrics below expectations - monitoring closely',
    severity: 'medium',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    companyId: '2'
  }
];

export const dataSources: DataSource[] = [
  {
    id: 'bloomberg',
    name: 'Bloomberg Terminal API',
    type: 'structured',
    status: 'active',
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
    recordsCount: 125000,
    description: 'Real-time financial data, market prices, and company fundamentals'
  },
  {
    id: 'sec-edgar',
    name: 'SEC EDGAR Database',
    type: 'structured',
    status: 'active',
    lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
    recordsCount: 8500,
    description: 'Company filings, 10-K, 10-Q, 8-K reports and financial statements'
  },
  {
    id: 'reuters',
    name: 'Reuters News Feed',
    type: 'unstructured',
    status: 'active',
    lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
    recordsCount: 45000,
    description: 'Financial news, earnings announcements, and market commentary'
  },
  {
    id: 'twitter',
    name: 'Twitter Sentiment API',
    type: 'unstructured',
    status: 'active',
    lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
    recordsCount: 250000,
    description: 'Social media sentiment analysis for public companies and executives'
  },
  {
    id: 'fred',
    name: 'Federal Reserve Economic Data',
    type: 'structured',
    status: 'active',
    lastUpdate: new Date(Date.now() - 60 * 60 * 1000),
    recordsCount: 15000,
    description: 'Macroeconomic indicators, interest rates, and policy data'
  },
  {
    id: 'earnings-calls',
    name: 'Earnings Call Transcripts',
    type: 'unstructured',
    status: 'warning',
    lastUpdate: new Date(Date.now() - 120 * 60 * 1000),
    recordsCount: 1200,
    description: 'Management commentary analysis and forward guidance extraction'
  },
  {
    id: 'bond-data',
    name: 'Corporate Bond Pricing',
    type: 'structured',
    status: 'failed',
    lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    recordsCount: 0,
    description: 'Bond yields, credit spreads, and fixed income market data'
  },
  {
    id: 'analyst-ratings',
    name: 'Wall Street Analyst Ratings',
    type: 'structured',
    status: 'active',
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
    recordsCount: 25000,
    description: 'Buy/sell/hold recommendations and price targets from major firms'
  }
];

export const platformMetrics = {
  totalIssuers: 2847,
  averageScoreTrend: 0.8,
  recentAlerts: 23,
  dataFreshness: 99.7,
  systemUptime: 99.9,
  avgResponseTime: 147
};