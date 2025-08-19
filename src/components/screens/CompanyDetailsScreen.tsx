import React, { useState } from 'react';
import { Building2, TrendingUp, TrendingDown, Minus, BarChart3, PieChart, LineChart, AlertTriangle, ArrowLeft } from 'lucide-react';
import type { Company } from '../../types';

interface CompanyDetailsScreenProps {
  company: Company | null;
  onBack: () => void;
}

export default function CompanyDetailsScreen({ company, onBack }: CompanyDetailsScreenProps) {
  const [timeRange, setTimeRange] = useState<'1M' | '6M' | '1Y'>('6M');

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="text-gray-400 mx-auto mb-4" size={64} />
          <p className="text-xl text-gray-600">No company selected</p>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Scoreboard
          </button>
        </div>
      </div>
    );
  }

  const scoreBreakdown = {
    financial: 35,
    sentiment: 18,
    macro: 12,
    timeSeries: 25
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-green-600" size={20} />;
      case 'down':
        return <TrendingDown className="text-red-600" size={20} />;
      default:
        return <Minus className="text-gray-400" size={20} />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 55) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-700 bg-green-100 border-green-300';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'High':
        return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Critical':
        return 'text-red-700 bg-red-100 border-red-300';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  // Mock historical data
  const historicalScores = [
    { date: '2024-07', score: company.score + 8 },
    { date: '2024-08', score: company.score + 5 },
    { date: '2024-09', score: company.score + 3 },
    { date: '2024-10', score: company.score + 1 },
    { date: '2024-11', score: company.score - 1 },
    { date: '2024-12', score: company.score },
    { date: '2025-01', score: company.score }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Scoreboard
          </button>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Building2 className="text-blue-600 mr-4" size={40} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-lg text-gray-600">{company.ticker} • {company.sector}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getRiskColor(company.riskLevel)}`}>
                {company.riskLevel} Risk
              </span>
              <span className={`px-6 py-3 rounded-xl text-xl font-bold border-2 ${getScoreColor(company.score)}`}>
                {company.score}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Score</span>
              {getTrendIcon(company.trend)}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{company.score}</p>
            <p className={`text-sm font-medium ${
              company.trend === 'up' ? 'text-green-600' : 
              company.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {company.trend === 'stable' ? 'Stable' : `${company.trendPercentage > 0 ? '+' : ''}${company.trendPercentage}% this week`}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Market Cap</span>
              <BarChart3 className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">${(company.marketCap / 1000).toFixed(0)}B</p>
            <p className="text-sm text-gray-600">USD</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Debt/Equity</span>
              <PieChart className="text-purple-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{company.debtToEquity}</p>
            <p className="text-sm text-gray-600">Ratio</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">ROE</span>
              <LineChart className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{(company.roe * 100).toFixed(1)}%</p>
            <p className="text-sm text-gray-600">Return on Equity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Score Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Score Breakdown & Attribution</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Financial Ratios</span>
                  <span className="text-sm font-bold text-gray-900">{scoreBreakdown.financial} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(scoreBreakdown.financial / company.score) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Time-Series Trends</span>
                  <span className="text-sm font-bold text-gray-900">{scoreBreakdown.timeSeries} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(scoreBreakdown.timeSeries / company.score) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Market Sentiment</span>
                  <span className="text-sm font-bold text-gray-900">{scoreBreakdown.sentiment} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(scoreBreakdown.sentiment / company.score) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Macro Factors</span>
                  <span className="text-sm font-bold text-gray-900">{scoreBreakdown.macro} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-orange-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(scoreBreakdown.macro / company.score) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Plain Language Explanation */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">AI Explanation</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                {company.name}'s credit score of {company.score} reflects strong financial fundamentals with stable debt management. 
                The {company.trend === 'down' ? 'recent decline' : company.trend === 'up' ? 'recent improvement' : 'stability'} 
                is primarily driven by {
                  company.trend === 'down' ? 'negative sentiment factors and market volatility concerns' : 
                  company.trend === 'up' ? 'positive earnings guidance and improved market sentiment' : 
                  'consistent operational performance and balanced risk profile'
                }.
              </p>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Financial Metrics</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Current Ratio</span>
                <span className="font-semibold text-gray-900">{company.currentRatio}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Debt/Equity</span>
                <span className="font-semibold text-gray-900">{company.debtToEquity}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">ROE</span>
                <span className="font-semibold text-gray-900">{(company.roe * 100).toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Sentiment Score</span>
                <span className={`font-semibold ${company.sentimentScore > 0.6 ? 'text-green-600' : company.sentimentScore > 0.4 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {(company.sentimentScore * 100).toFixed(0)}%
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Last Updated</span>
                <span className="text-sm text-gray-500">
                  {Math.floor((Date.now() - company.lastUpdated.getTime()) / (1000 * 60))} mins ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Score History</h3>
            <div className="flex space-x-2">
              {(['1M', '6M', '1Y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {historicalScores.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-blue-600 rounded-t w-full transition-all duration-500 hover:bg-blue-700"
                  style={{ height: `${(point.score / 100) * 200}px` }}
                  title={`Score: ${point.score}`}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{point.date}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Key Events:</strong> Score changes typically correlate with earnings announcements, 
              regulatory updates, and significant market movements. The recent trend reflects 
              {company.trend === 'down' ? ' increased market volatility and sector-specific concerns' : 
               company.trend === 'up' ? ' improved fundamentals and positive market sentiment' : 
               ' stable operational performance with balanced risk factors'}.
            </p>
          </div>
        </div>

        {/* Alerts */}
        {company.alerts.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Alerts</h3>
            
            <div className="space-y-4">
              {company.alerts.map((alert) => (
                <div key={alert.id} className="flex items-start p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertTriangle className="text-orange-600 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.timestamp.toLocaleString()} • {alert.severity} severity
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}