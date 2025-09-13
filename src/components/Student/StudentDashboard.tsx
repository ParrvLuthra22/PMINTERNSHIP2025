import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Star, 
  TrendingUp, 
  MapPin, 
  Clock,
  Users,
  Award
} from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { mockInternships, mockStudents } from '../../data/mockData';
import { AIMatchingService } from '../../services/aiMatchingService';

const StudentDashboard: React.FC = () => {
  const student = mockStudents[0]; // Mock current student
  const matches = AIMatchingService.generateMatches(student, mockInternships).slice(0, 3);

  const stats = [
    {
      label: 'Applications Sent',
      value: '12',
      icon: FileText,
      color: 'blue',
      change: '+3 this week'
    },
    {
      label: 'Profile Views',
      value: '48',
      icon: Users,
      color: 'green',
      change: '+12 this week'
    },
    {
      label: 'Skill Match Rate',
      value: '85%',
      icon: Star,
      color: 'purple',
      change: '+5% improvement'
    },
    {
      label: 'Interview Calls',
      value: '3',
      icon: Award,
      color: 'yellow',
      change: '2 pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {student.name}! 👋</h1>
            <p className="text-blue-100 mb-4">
              Your AI-powered internship journey continues. We've found {matches.length} new matches for you.
            </p>
            <Badge variant="info" className="bg-white/20 text-white">
              Profile Completion: 95%
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Next Application Deadline</div>
            <div className="text-xl font-semibold">March 15, 2024</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.change}</div>
            </Card>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              🤖 AI-Powered Recommendations
            </h2>
            <p className="text-gray-600">
              Based on your skills, preferences, and profile, here are your top matches
            </p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid gap-4">
          {matches.map((match) => {
            const internship = mockInternships.find(i => i.id === match.internshipId)!;
            const company = { name: internship.companyId === 'company1' ? 'TechCorp India' : 'GreenEnergy Solutions' };
            
            return (
              <div key={match.internshipId} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{internship.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{company.name}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {internship.location.state}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {internship.duration.months} months
                      </div>
                      <div className="font-medium text-green-600">
                        ₹{internship.stipend.amount.toLocaleString()}/month
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="success">
                        {Math.round(match.skillsScore)}% Skills Match
                      </Badge>
                      {match.affinityScore > 0 && (
                        <Badge variant="purple">
                          Affirmative Action Bonus
                        </Badge>
                      )}
                      <Badge variant={match.dropoutRisk < 30 ? 'success' : match.dropoutRisk < 60 ? 'warning' : 'error'}>
                        {match.dropoutRisk < 30 ? 'Low' : match.dropoutRisk < 60 ? 'Medium' : 'High'} Risk
                      </Badge>
                    </div>

                    <div className="text-xs text-gray-500">
                      <div className="font-medium mb-1">Why this recommendation?</div>
                      <ul className="space-y-1">
                        {match.explanation.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="ml-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {Math.round(match.totalScore)}%
                    </div>
                    <div className="text-xs text-gray-500 mb-3">Match Score</div>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
            <p className="text-gray-600 mb-4">
              Add more skills and experience to get better matches
            </p>
            <Button variant="outline">Update Profile</Button>
          </div>
        </Card>

        <Card>
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Assessment</h3>
            <p className="text-gray-600 mb-4">
              Take AI-powered skill tests to improve your ranking
            </p>
            <Button variant="outline">Start Assessment</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;