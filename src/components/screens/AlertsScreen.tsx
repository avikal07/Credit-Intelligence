import React, { useState } from 'react';
import { AlertTriangle, Bell, TrendingDown, TrendingUp, Calendar, Filter, ExternalLink } from 'lucide-react';
import { recentAlerts, companies } from '../../data/mockData';
import type { Alert } from '../../types';

export default function AlertsScreen() {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAlerts = recentAlerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    return matchesSeverity && matchesType;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'score_change':
        return <TrendingDown className="text-red-600" size={20} />;
      case 'news_event':
        return <ExternalLink className="text-blue-600" size={20} />;
      case 'financial_update':
        return <TrendingUp className="text-purple-600" size={20} />;
      case 'rating_change':
        return <Calendar className="text-green-600" size={20} />;
      default:
        return <AlertTriangle className="text-orange-600" size={20} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-700 bg-red-100 border-red-300';
      case 'high':
        return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'low':
        return 'text-blue-700 bg-blue-100 border-blue-300';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'score_change':
        return 'Score Change';
      case 'news_event':
        return 'News Event';
      case 'financial_update':
        return 'Financial Update';
      case 'rating_change':
        return 'Rating Change';
      default:
        return 'Alert';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${Math.floor(diffHours / 24)}d ago`;
    }
  };

  const getCompanyName = (companyId?: string) => {
    if (!companyId) return 'System';
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const severityStats = {
    critical: recentAlerts.filter(a => a.severity === 'critical').length,
    high: recentAlerts.filter(a => a.severity === 'high').length,
    medium: recentAlerts.filter(a => a.severity === 'medium').length,
    low: recentAlerts.filter(a => a.severity === 'low').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Bell className="text-blue-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Alerts & Monitoring</h1>
          </div>
          <p className="text-lg text-gray-600">
            Real-time alerts and notifications for significant credit events
          </p>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-600 font-medium">Critical</span>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{severityStats.critical}</p>
            <p className="text-sm text-gray-600">Immediate attention required</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-orange-600 font-medium">High</span>
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{severityStats.high}</p>
            <p className="text-sm text-gray-600">Review within 4 hours</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-yellow-600 font-medium">Medium</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{severityStats.medium}</p>
            <p className="text-sm text-gray-600">Monitor closely</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 font-medium">Low</span>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{severityStats.low}</p>
            <p className="text-sm text-gray-600">Informational</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <Filter className="text-gray-400 mr-2" size={20} />
              <span className="text-sm font-medium text-gray-700 mr-3">Filters:</span>
            </div>
            
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="score_change">Score Changes</option>
              <option value="news_event">News Events</option>
              <option value="financial_update">Financial Updates</option>
              <option value="rating_change">Rating Changes</option>
            </select>
            
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredAlerts.length} of {recentAlerts.length} alerts
            </div>
          </div>
        </div>

        {/* Alert Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Recent Alert Feed</h3>
            <p className="text-sm text-gray-600 mt-1">Real-time notifications sorted by timestamp</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border mr-3 ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {getTypeLabel(alert.type)}
                        </span>
                      </div>
                      
                      <p className="text-gray-900 font-medium mb-1">{alert.message}</p>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{getCompanyName(alert.companyId)}</span>
                        <span className="mx-2">•</span>
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-4">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredAlerts.length === 0 && (
            <div className="p-12 text-center">
              <Bell className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-lg text-gray-600">No alerts match your current filters</p>
              <p className="text-sm text-gray-500">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>

        {/* Alert Configuration */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Alert Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-gray-600">Receive alerts via email for critical and high severity events</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">SMS Alerts</p>
                <p className="text-gray-600">Instant SMS notifications for score changes  10%</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Webhook Integration</p>
                <p className="text-gray-600">Real-time API callbacks to your systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}