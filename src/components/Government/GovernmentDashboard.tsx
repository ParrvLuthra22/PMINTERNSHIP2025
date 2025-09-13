import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  TrendingUp, 
  MapPin,
  Target,
  Award,
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { mockAnalytics } from '../../data/mockData';

interface ChartProps {
  data: Array<{ name: string; count: number }>;
  title: string;
}

const SimpleBarChart: React.FC<ChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.count));
  
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-16">{item.name}</span>
            <div className="flex-1 mx-3">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(item.count / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 w-16 text-right">
              {item.count.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GovernmentDashboard: React.FC = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  
  const stats = [
    {
      label: 'Total Internships',
      value: mockAnalytics.overview.totalInternships.toLocaleString(),
      icon: Target,
      color: 'blue',
      change: '+12.5% vs last quarter',
      target: '10M by 2029'
    },
    {
      label: 'Active Applications',
      value: mockAnalytics.overview.totalApplications.toLocaleString(),
      icon: Users,
      color: 'green',
      change: '+8.3% this month',
      target: '95% participation target'
    },
    {
      label: 'Successful Matches',
      value: mockAnalytics.overview.totalMatches.toLocaleString(),
      icon: Award,
      color: 'purple',
      change: '+15.2% improvement',
      target: `${mockAnalytics.overview.completionRate}% completion rate`
    },
    {
      label: 'Verified Companies',
      value: '2,847',
      icon: Building2,
      color: 'yellow',
      change: '+156 new this month',
      target: 'Quality partners'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'High Dropout Risk in Rural Bihar',
      description: '45% of candidates showing high dropout probability',
      action: 'View Heatmap',
      priority: 'High'
    },
    {
      type: 'info',
      title: 'Skill Gap Alert: AI/ML in Tier-2 Cities',
      description: 'Increasing demand vs supply mismatch detected',
      action: 'Generate Report',
      priority: 'Medium'
    },
    {
      type: 'success',
      title: 'Diversity Target Met in Maharashtra',
      description: '55% internships filled by priority categories',
      action: 'View Details',
      priority: 'Low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            National Internship Dashboard 🇮🇳
          </h1>
          <p className="text-gray-600">
            Real-time analytics and insights for the AI-powered internship ecosystem
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
          
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>

          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                <div className="text-xs text-gray-500">{stat.target}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Critical Alerts
            </h2>
            <Badge variant="warning">3 Active</Badge>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                alert.type === 'info' ? 'border-blue-200 bg-blue-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <Badge 
                    variant={alert.type === 'warning' ? 'warning' : alert.type === 'info' ? 'info' : 'success'}
                    size="sm"
                  >
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">{alert.description}</p>
                <Button variant="outline" size="sm">{alert.action}</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            🤖 AI-Generated Insights
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-900 mb-1">Skill Demand Forecast</h3>
              <p className="text-sm text-gray-600 mb-2">
                AI/ML skills demand expected to grow 45% in Q2 2024, primarily in Karnataka and Maharashtra.
              </p>
              <Button variant="outline" size="sm">View Forecast</Button>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900 mb-1">Inclusion Success</h3>
              <p className="text-sm text-gray-600 mb-2">
                Rural participation increased by 23% after implementing location-based matching algorithms.
              </p>
              <Button variant="outline" size="sm">View Analysis</Button>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-gray-900 mb-1">Dropout Prevention</h3>
              <p className="text-sm text-gray-600 mb-2">
                Early intervention reduced dropout rates by 18% in high-risk districts.
              </p>
              <Button variant="outline" size="sm">View Strategy</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SimpleBarChart 
            data={mockAnalytics.trends.applications} 
            title="Monthly Application Trends" 
          />
        </Card>

        <Card>
          <SimpleBarChart 
            data={mockAnalytics.trends.sectors} 
            title="Applications by Sector" 
          />
        </Card>
      </div>

      {/* Demographics Overview */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Demographics & Inclusion Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Gender Distribution</h3>
            <div className="space-y-2">
              {Object.entries(mockAnalytics.demographics.genderDistribution).map(([gender, percentage]) => (
                <div key={gender} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{gender}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category Distribution</h3>
            <div className="space-y-2">
              {Object.entries(mockAnalytics.demographics.categoryDistribution).map(([category, percentage]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category.toUpperCase()}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Location Distribution</h3>
            <div className="space-y-2">
              {Object.entries(mockAnalytics.demographics.locationDistribution).map(([location, percentage]) => (
                <div key={location} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{location}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GovernmentDashboard;