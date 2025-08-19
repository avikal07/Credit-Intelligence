import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Filter, Search, Building2 } from 'lucide-react';
import { companies } from '../../data/mockData';
import type { Company } from '../../types';

interface ScoreboardScreenProps {
  onSelectCompany: (company: Company) => void;
  onNavigate: (screen: number) => void;
}

export default function ScoreboardScreen({ onSelectCompany, onNavigate }: ScoreboardScreenProps) {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'trend'>('score');

  const sectors = [...new Set(companies.map(c => c.sector))];
  const riskLevels = ['Low', 'Medium', 'High', 'Critical'];

  const filteredCompanies = companies
    .filter(company => {
      const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
      const matchesRisk = riskFilter === 'all' || company.riskLevel === riskFilter;
      const matchesSearch = searchQuery === '' || 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.ticker.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSector && matchesRisk && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'trend':
          return Math.abs(b.trendPercentage) - Math.abs(a.trendPercentage);
        default:
          return 0;
      }
    });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-green-600" size={16} />;
      case 'down':
        return <TrendingDown className="text-red-600" size={16} />;
      default:
        return <Minus className="text-gray-400" size={16} />;
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

  const handleCompanyClick = (company: Company) => {
    onSelectCompany(company);
    onNavigate(3); // Navigate to company details screen
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Building2 className="text-blue-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Credit Scoreboard</h1>
          </div>
          <p className="text-lg text-gray-600">
            Real-time creditworthiness scores for {companies.length} tracked issuers
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">High Performers</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {companies.filter(c => c.score >= 85).length}
            </p>
            <p className="text-sm text-green-600">Score ≥ 85</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Stable</span>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {companies.filter(c => c.score >= 70 && c.score < 85).length}
            </p>
            <p className="text-sm text-blue-600">Score 70-84</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Watch List</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {companies.filter(c => c.score >= 55 && c.score < 70).length}
            </p>
            <p className="text-sm text-yellow-600">Score 55-69</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">High Risk</span>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {companies.filter(c => c.score < 55).length}
            </p>
            <p className="text-sm text-red-600">Score &lt; 55</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <Filter className="text-gray-400 mr-2" size={20} />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Risk Levels</option>
              {riskLevels.map(risk => (
                <option key={risk} value={risk}>{risk} Risk</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'name' | 'trend')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="trend">Sort by Trend</option>
            </select>
          </div>
        </div>

        {/* Company List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Company</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Sector</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Score</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Trend</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Risk Level</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Last Updated</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Alerts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCompanies.map((company) => (
                  <tr 
                    key={company.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleCompanyClick(company)}
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-900">{company.name}</p>
                        <p className="text-sm text-gray-600">{company.ticker}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {company.sector}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getScoreColor(company.score)}`}>
                        {company.score}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {getTrendIcon(company.trend)}
                        <span className={`ml-2 text-sm font-medium ${
                          company.trend === 'up' ? 'text-green-600' : 
                          company.trend === 'down' ? 'text-red-600' : 
                          'text-gray-600'
                        }`}>
                          {company.trend === 'stable' ? '0.0%' : `${company.trendPercentage > 0 ? '+' : ''}${company.trendPercentage}%`}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(company.riskLevel)}`}>
                        {company.riskLevel}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">
                        {Math.floor((Date.now() - company.lastUpdated.getTime()) / (1000 * 60))}m ago
                      </span>
                    </td>
                    <td className="p-4">
                      {company.alerts.length > 0 ? (
                        <div className="flex items-center">
                          <AlertTriangle className="text-orange-500 mr-1" size={16} />
                          <span className="text-sm font-medium text-orange-600">
                            {company.alerts.length}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="text-gray-400 mx-auto mb-4" size={48} />
            <p className="text-lg text-gray-600">No companies match your current filters</p>
            <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}