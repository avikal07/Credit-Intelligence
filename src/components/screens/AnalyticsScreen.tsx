import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Globe, Filter, Download } from 'lucide-react';
import { companies } from '../../data/mockData';

export default function AnalyticsScreen() {
  const [viewType, setViewType] = useState<'sector' | 'risk' | 'trend'>('sector');
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '1Y'>('3M');

  // Calculate sector distribution
  const sectorData = companies.reduce((acc, company) => {
    const sector = company.sector;
    if (!acc[sector]) {
      acc[sector] = { count: 0, avgScore: 0, totalScore: 0 };
    }
    acc[sector].count += 1;
    acc[sector].totalScore += company.score;
    acc[sector].avgScore = acc[sector].totalScore / acc[sector].count;
    return acc;
  }, {} as Record<string, { count: number; avgScore: number; totalScore: number }>);

  // Calculate risk distribution
  const riskData = companies.reduce((acc, company) => {
    const risk = company.riskLevel;
    if (!acc[risk]) {
      acc[risk] = 0;
    }
    acc[risk] += 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate trend distribution
  const trendData = companies.reduce((acc, company) => {
    const trend = company.trend;
    if (!acc[trend]) {
      acc[trend] = 0;
    }
    acc[trend] += 1;
    return acc;
  }, {} as Record<string, number>);

  const getSectorColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500', 'bg-yellow-500'];
    return colors[index % colors.length];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'bg-green-500';
      case 'stable': return 'bg-blue-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalCompanies = companies.length;
  const avgScore = Math.round(companies.reduce((sum, c) => sum + c.score, 0) / totalCompanies);
  const highRiskCount = companies.filter(c => c.riskLevel === 'High' || c.riskLevel === 'Critical').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BarChart3 className="text-blue-600 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="mr-2" size={16} />
              Export Data
            </button>
          </div>
          <p className="text-lg text-gray-600">
            Comprehensive analytics and insights across your credit portfolio
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Portfolio Average</span>
              <BarChart3 className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-600">{avgScore}</p>
            <p className="text-sm text-gray-600">Credit Score</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Coverage</span>
              <Globe className="text-green-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-600">{totalCompanies}</p>
            <p className="text-sm text-gray-600">Companies</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">High Risk</span>
              <TrendingUp className="text-orange-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-orange-600">{highRiskCount}</p>
            <p className="text-sm text-gray-600">Companies</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Sectors</span>
              <PieChart className="text-purple-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-purple-600">{Object.keys(sectorData).length}</p>
            <p className="text-sm text-gray-600">Industries</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <Filter className="text-gray-400 mr-2" size={20} />
              <span className="text-sm font-medium text-gray-700 mr-3">View:</span>
            </div>
            
            <div className="flex space-x-2">
              {(['sector', 'risk', 'trend'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setViewType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Analysis
                </button>
              ))}
            </div>
            
            <div className="ml-auto flex space-x-2">
              {(['1M', '3M', '1Y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {viewType === 'sector' && 'Sector Distribution'}
              {viewType === 'risk' && 'Risk Level Distribution'}
              {viewType === 'trend' && 'Trend Analysis'}
            </h3>
            
            <div className="space-y-4">
              {viewType === 'sector' && Object.entries(sectorData).map(([sector, data], index) => (
                <div key={sector} className="flex items-center">
                  <div className="w-32 text-sm text-gray-700 font-medium">{sector}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${getSectorColor(index)}`}
                        style={{ width: `${(data.count / totalCompanies) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="text-sm font-medium text-gray-900">{data.count}</span>
                    <span className="text-xs text-gray-600 block">Avg: {Math.round(data.avgScore)}</span>
                  </div>
                </div>
              ))}
              
              {viewType === 'risk' && Object.entries(riskData).map(([risk, count]) => (
                <div key={risk} className="flex items-center">
                  <div className="w-32 text-sm text-gray-700 font-medium">{risk} Risk</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${getRiskColor(risk)}`}
                        style={{ width: `${(count / totalCompanies) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
              
              {viewType === 'trend' && Object.entries(trendData).map(([trend, count]) => (
                <div key={trend} className="flex items-center">
                  <div className="w-32 text-sm text-gray-700 font-medium capitalize">{trend}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${getTrendColor(trend)}`}
                        style={{ width: `${(count / totalCompanies) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Performance Table */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Sector Performance</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left pb-3 font-semibold text-gray-900">Sector</th>
                    <th className="text-center pb-3 font-semibold text-gray-900">Companies</th>
                    <th className="text-right pb-3 font-semibold text-gray-900">Avg Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(sectorData)
                    .sort(([,a], [,b]) => b.avgScore - a.avgScore)
                    .map(([sector, data]) => (
                      <tr key={sector} className="hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-900">{sector}</td>
                        <td className="py-3 text-center text-gray-600">{data.count}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            data.avgScore >= 85 ? 'text-green-700 bg-green-100' :
                            data.avgScore >= 70 ? 'text-blue-700 bg-blue-100' :
                            data.avgScore >= 55 ? 'text-yellow-700 bg-yellow-100' :
                            'text-red-700 bg-red-100'
                          }`}>
                            {Math.round(data.avgScore)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Technology Sector Leading</p>
                <p className="text-gray-600">Tech companies show highest average scores with strong fundamentals</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Energy Sector Volatility</p>
                <p className="text-gray-600">Increased score volatility due to commodity price fluctuations</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Banking Sector Stability</p>
                <p className="text-gray-600">Financial institutions maintain stable credit profiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}