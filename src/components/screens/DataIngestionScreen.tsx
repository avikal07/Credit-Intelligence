import React, { useState } from 'react';
import { Database, CheckCircle, AlertCircle, XCircle, RefreshCw, Clock, BarChart3 } from 'lucide-react';
import { dataSources } from '../../data/mockData';

export default function DataIngestionScreen() {
  const [activeTab, setActiveTab] = useState<'structured' | 'unstructured'>('structured');
  
  const structuredData = dataSources.filter(source => source.type === 'structured');
  const unstructuredData = dataSources.filter(source => source.type === 'unstructured');
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'failed':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffMinutes / 1440)}d ago`;
    }
  };

  const currentData = activeTab === 'structured' ? structuredData : unstructuredData;
  const totalRecords = dataSources.reduce((sum, source) => sum + source.recordsCount, 0);
  const activeCount = dataSources.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Database className="text-blue-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Data Ingestion Pipeline</h1>
          </div>
          <p className="text-lg text-gray-600">
            Real-time transparency into our data sources and ingestion status
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sources</p>
                <p className="text-2xl font-bold text-gray-900">{dataSources.length}</p>
              </div>
              <Database className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Sources</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{totalRecords.toLocaleString()}</p>
              </div>
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Refresh Rate</p>
                <p className="text-2xl font-bold text-blue-600">15min</p>
              </div>
              <RefreshCw className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        {/* Data Source Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('structured')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'structured'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Structured Data Sources ({structuredData.length})
              </button>
              <button
                onClick={() => setActiveTab('unstructured')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'unstructured'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Unstructured Data Sources ({unstructuredData.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4 font-semibold text-gray-900">Source</th>
                    <th className="text-left pb-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left pb-4 font-semibold text-gray-900">Records</th>
                    <th className="text-left pb-4 font-semibold text-gray-900">Last Update</th>
                    <th className="text-left pb-4 font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentData.map((source) => (
                    <tr key={source.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getStatusIcon(source.status)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{source.name}</p>
                            <p className="text-sm text-gray-600">
                              {source.type === 'structured' ? 'Financial Data' : 'Text/Media Analysis'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(source.status)}`}>
                          {source.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-medium text-gray-900">
                          {source.recordsCount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-600">
                          {formatTimestamp(source.lastUpdate)}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-600 max-w-md">
                          {source.description}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Data Pipeline Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Pipeline Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Real-time Ingestion</p>
                <p className="text-gray-600">Apache Kafka streams with 15-minute batch processing</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Data Validation</p>
                <p className="text-gray-600">Multi-layer validation with anomaly detection</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Quality Monitoring</p>
                <p className="text-gray-600">Automated alerts for data quality issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}