import React, { useState } from 'react';
import { MapPin, TrendingDown, AlertTriangle, BarChart3, Filter } from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { mockAnalytics } from '../../data/mockData';

const Heatmaps: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<'skillGaps' | 'dropoutRisk' | 'demandSupply'>('skillGaps');
  const [selectedState, setSelectedState] = useState('all');

  const mapData = mockAnalytics.heatmaps;

  const getMapTitle = () => {
    switch (selectedMap) {
      case 'skillGaps': return 'Skill Gap Analysis';
      case 'dropoutRisk': return 'Dropout Risk Prediction';
      case 'demandSupply': return 'Demand vs Supply Analysis';
    }
  };

  const getMapDescription = () => {
    switch (selectedMap) {
      case 'skillGaps': return 'Districts with higher values indicate greater skill mismatches between student capabilities and industry requirements.';
      case 'dropoutRisk': return 'Predicted dropout probability based on historical data, location factors, and demographic patterns.';
      case 'demandSupply': return 'Gap between internship demand from students and supply from companies across different districts.';
    }
  };

  const getColorIntensity = (value: number, max: number) => {
    const intensity = (value / max) * 100;
    if (intensity > 75) return 'bg-red-500';
    if (intensity > 50) return 'bg-orange-500';
    if (intensity > 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCurrentData = () => {
    const data = mapData[selectedMap];
    if (selectedMap === 'demandSupply') {
      return data.map(item => ({
        ...item,
        value: item.demand - item.supply,
        display: `Demand: ${item.demand}, Supply: ${item.supply}`
      }));
    }
    return data.map(item => ({
      ...item,
      value: selectedMap === 'skillGaps' ? item.gap : item.risk,
      display: selectedMap === 'skillGaps' ? `${item.gap}% gap` : `${item.risk}% risk`
    }));
  };

  const currentData = getCurrentData();
  const maxValue = Math.max(...currentData.map(item => Math.abs(item.value)));

  const insights = {
    skillGaps: [
      'Bihar shows the highest skill gaps (60%), primarily in technical skills',
      'Urban centers have 25% lower skill gaps than rural areas',
      'AI/ML skills shortage is most acute in Tier-2 cities'
    ],
    dropoutRisk: [
      'Rural areas show 3x higher dropout risk than urban centers',
      'Financial constraints are the primary dropout factor (65%)',
      'Early intervention programs reduced risk by 18% in pilot districts'
    ],
    demandSupply: [
      'Bangalore has 1,500 more applications than available positions',
      'Rural districts have 4x more demand than supply',
      'Government intervention needed in underserved areas'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Geographic Analytics & Heatmaps 🗺️
          </h1>
          <p className="text-gray-600">
            AI-powered spatial analysis for policy decision making
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All States</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="karnataka">Karnataka</option>
            <option value="uttar-pradesh">Uttar Pradesh</option>
            <option value="bihar">Bihar</option>
          </select>

          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </Button>
        </div>
      </div>

      {/* Map Selection */}
      <Card>
        <div className="flex items-center space-x-1 mb-6">
          {[
            { id: 'skillGaps', label: 'Skill Gaps', icon: BarChart3 },
            { id: 'dropoutRisk', label: 'Dropout Risk', icon: AlertTriangle },
            { id: 'demandSupply', label: 'Demand vs Supply', icon: TrendingDown }
          ].map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedMap(option.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedMap === option.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{getMapTitle()}</h2>
          <p className="text-sm text-gray-600">{getMapDescription()}</p>
        </div>

        {/* Heatmap Visualization */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 mb-2">Interactive District-Level Heatmap</div>
            <div className="text-xs text-gray-500">
              🗺️ In a production version, this would show an interactive map of India with color-coded districts
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Critical</span>
            </div>
          </div>

          {/* District Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentData.map((district, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getColorIntensity(Math.abs(district.value), maxValue)}`}></div>
                    <span className="font-medium text-sm text-gray-900">{district.district}</span>
                  </div>
                  <Badge 
                    variant={Math.abs(district.value) < maxValue * 0.25 ? 'success' : 
                            Math.abs(district.value) < maxValue * 0.5 ? 'warning' : 'error'}
                    size="sm"
                  >
                    {district.display}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Lat: {district.lat.toFixed(2)}, Lng: {district.lng.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            🤖 AI-Generated Insights
          </h3>
          <ul className="space-y-2">
            {insights[selectedMap].map((insight, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Affected Districts */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Most Affected Districts
          </h2>
          <div className="space-y-3">
            {currentData
              .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
              .slice(0, 5)
              .map((district, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{district.district}</div>
                      <div className="text-sm text-gray-500">{district.display}</div>
                    </div>
                  </div>
                  <Badge variant="error">High Priority</Badge>
                </div>
              ))}
          </div>
        </Card>

        {/* Policy Recommendations */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Policy Recommendations
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-900 mb-1">Immediate Actions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Increase skill development programs in high-gap districts</li>
                <li>• Deploy mobile training units to rural areas</li>
                <li>• Partner with local industries for targeted training</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900 mb-1">Medium-term Strategy</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Establish regional skill centers in underserved areas</li>
                <li>• Incentivize companies to hire from priority districts</li>
                <li>• Implement digital literacy programs</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-gray-900 mb-1">Long-term Vision</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Create innovation hubs in Tier-2 and Tier-3 cities</li>
                <li>• Develop comprehensive rural employment ecosystem</li>
                <li>• Establish AI-powered career guidance systems</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Heatmaps;