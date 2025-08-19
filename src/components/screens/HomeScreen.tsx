import React from 'react';
import { TrendingUp, TrendingDown, Building2, AlertTriangle, Activity, Clock, Server, Zap } from 'lucide-react';
import { platformMetrics } from '../../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: number) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const formatTrend = (trend: number) => {
    const isPositive = trend > 0;
    return {
      value: `${isPositive ? '+' : ''}${trend.toFixed(1)}%`,
      color: isPositive ? 'text-green-600' : 'text-red-600',
      icon: isPositive ? TrendingUp : TrendingDown
    };
  };

  const trendData = formatTrend(platformMetrics.averageScoreTrend);
  const TrendIcon = trendData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
              <Activity className="text-white" size={40} />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Credit Intelligence
            </h1>
            <p className="text-xl text-blue-600 font-semibold mb-6">
              Real-time Explainable Ratings
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced financial technology platform providing transparent, real-time creditworthiness 
              assessments for corporate issuers with complete explainability and faster-than-market insights.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Platform Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="text-blue-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {platformMetrics.totalIssuers.toLocaleString()}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Active Issuers</h3>
              <p className="text-sm text-gray-600">Companies currently tracked</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendIcon className="text-green-600" size={24} />
                </div>
                <span className={`text-2xl font-bold ${trendData.color}`}>
                  {trendData.value}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Avg Score Trend</h3>
              <p className="text-sm text-gray-600">Stable last 7 days</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertTriangle className="text-orange-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {platformMetrics.recentAlerts}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Recent Alerts</h3>
              <p className="text-sm text-gray-600">Last 24 hours</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Zap className="text-purple-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {platformMetrics.avgResponseTime}ms
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
              <p className="text-sm text-gray-600">Average API latency</p>
            </div>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Data Freshness</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${platformMetrics.dataFreshness}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-2xl font-bold text-blue-600">
                  {platformMetrics.dataFreshness}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Scores updated within 15-minute SLA
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Server className="text-green-600 mr-3" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">System Uptime</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${platformMetrics.systemUptime}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-2xl font-bold text-green-600">
                  {platformMetrics.systemUptime}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Platform availability last 30 days
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={() => onNavigate(2)}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Activity className="mr-3" size={20} />
              Go to Dashboard
            </button>
            <p className="text-sm text-gray-600 mt-3">
              Access real-time credit scores and analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}