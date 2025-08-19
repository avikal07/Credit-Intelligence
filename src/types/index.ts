export interface Company {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  lastUpdated: Date;
  alerts: Alert[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  marketCap: number;
  debtToEquity: number;
  currentRatio: number;
  roe: number;
  sentimentScore: number;
}

export interface Alert {
  id: string;
  type: 'score_change' | 'news_event' | 'financial_update' | 'rating_change';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  companyId?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'structured' | 'unstructured';
  status: 'active' | 'failed' | 'warning';
  lastUpdate: Date;
  recordsCount: number;
  description: string;
}

export interface ScoreBreakdown {
  financial: number;
  sentiment: number;
  macro: number;
  timeSeries: number;
  explanation: string;
}

export interface HistoricalScore {
  date: Date;
  score: number;
  event?: string;
}