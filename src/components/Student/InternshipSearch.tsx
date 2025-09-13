import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Briefcase,
  Building2,
  IndianRupee
} from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { mockInternships, mockStudents } from '../../data/mockData';
import { AIMatchingService } from '../../services/aiMatchingService';

const InternshipSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sector: '',
    location: '',
    duration: '',
    stipend: '',
    remote: false
  });
  const [showFilters, setShowFilters] = useState(false);

  const student = mockStudents[0];
  const matches = AIMatchingService.generateMatches(student, mockInternships);

  const filteredInternships = matches.filter(match => {
    const internship = mockInternships.find(i => i.id === match.internshipId)!;
    
    if (searchTerm && !internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !internship.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filters.sector && internship.sector !== filters.sector) return false;
    if (filters.location && internship.location.state !== filters.location) return false;
    if (filters.remote && !internship.location.isRemote) return false;
    
    return true;
  });

  const sectors = [...new Set(mockInternships.map(i => i.sector))];
  const locations = [...new Set(mockInternships.map(i => i.location.state))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Internship</h1>
        <p className="text-gray-600">
          AI-powered search with personalized recommendations based on your profile
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                <select
                  value={filters.sector}
                  onChange={(e) => setFilters({...filters, sector: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Sectors</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({...filters, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Duration</option>
                  <option value="1-3">1-3 months</option>
                  <option value="4-6">4-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remote</label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.remote}
                    onChange={(e) => setFilters({...filters, remote: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remote only</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">
            Showing {filteredInternships.length} internships • Sorted by AI match score
          </span>
        </div>
      </div>

      {/* Internship Cards */}
      <div className="space-y-4">
        {filteredInternships.map((match) => {
          const internship = mockInternships.find(i => i.id === match.internshipId)!;
          const company = { 
            name: internship.companyId === 'company1' ? 'TechCorp India' : 'GreenEnergy Solutions',
            logo: internship.companyId === 'company1' ? 'TC' : 'GE'
          };
          
          return (
            <Card key={match.internshipId} hover className="relative">
              {/* Match Score Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="success" className="text-xs">
                  {Math.round(match.totalScore)}% Match
                </Badge>
              </div>

              <div className="flex items-start space-x-4">
                {/* Company Logo */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {company.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{internship.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {company.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {internship.location.isRemote ? 'Remote' : internship.location.state}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {internship.duration.months} months
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      ₹{internship.stipend.amount.toLocaleString()}/month
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {internship.capacity.total - internship.capacity.filled} positions left
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {internship.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {internship.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                    {internship.skills.length > 4 && (
                      <Badge variant="default" size="sm">
                        +{internship.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* AI Insights */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="text-xs text-blue-800 font-medium mb-1">🤖 AI Insights:</div>
                    <div className="text-xs text-blue-700 space-y-1">
                      {match.explanation.slice(0, 2).map((insight, idx) => (
                        <div key={idx}>• {insight}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {match.affinityScore > 0 && (
                        <Badge variant="purple" size="sm">
                          <Star className="w-3 h-3 mr-1" />
                          Priority Candidate
                        </Badge>
                      )}
                      <Badge 
                        variant={match.dropoutRisk < 30 ? 'success' : match.dropoutRisk < 60 ? 'warning' : 'error'}
                        size="sm"
                      >
                        {match.dropoutRisk < 30 ? 'Low' : match.dropoutRisk < 60 ? 'Med' : 'High'} Risk
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredInternships.length === 0 && (
        <Card className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setFilters({ sector: '', location: '', duration: '', stipend: '', remote: false });
          }}>
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
};

export default InternshipSearch;