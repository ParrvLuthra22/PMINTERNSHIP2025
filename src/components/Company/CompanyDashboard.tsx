import React from 'react';
import { 
  Briefcase, 
  Users, 
  Star, 
  TrendingUp,
  Eye,
  MessageCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { mockInternships, mockStudents } from '../../data/mockData';

const CompanyDashboard: React.FC = () => {
  const companyInternships = mockInternships;
  const totalApplications = 247;
  const totalViews = 1523;

  const stats = [
    {
      label: 'Active Internships',
      value: companyInternships.length.toString(),
      icon: Briefcase,
      color: 'blue',
      change: '+2 this month'
    },
    {
      label: 'Total Applications',
      value: totalApplications.toString(),
      icon: Users,
      color: 'green',
      change: '+45 this week'
    },
    {
      label: 'Profile Views',
      value: totalViews.toString(),
      icon: Eye,
      color: 'purple',
      change: '+12% this month'
    },
    {
      label: 'Avg. Match Score',
      value: '78%',
      icon: Star,
      color: 'yellow',
      change: '+3% improvement'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to TechCorp India! 🏢</h1>
            <p className="text-blue-100 mb-4">
              Your AI-powered recruitment dashboard. Discover top talent with intelligent matching.
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="success" className="bg-white/20 text-white">
                Verified Company
              </Badge>
              <Badge variant="info" className="bg-white/20 text-white">
                Premium AI Features
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">This Month's Goal</div>
            <div className="text-xl font-semibold">50 Interns Hired</div>
            <div className="text-sm text-blue-200">17 completed</div>
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

      {/* AI Insights & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Candidate Recommendations */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              🤖 AI-Recommended Candidates
            </h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>

          <div className="space-y-4">
            {mockStudents.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.profile.education.degree}</p>
                    </div>
                  </div>
                  <Badge variant="success">92% Match</Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span>{student.profile.location.state}</span>
                  <span>•</span>
                  <span>CGPA: {student.profile.education.cgpa}</span>
                  <span>•</span>
                  <span>{student.profile.skills.length} skills</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {student.profile.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="default" size="sm">{skill}</Badge>
                  ))}
                  {student.profile.skills.length > 3 && (
                    <Badge variant="default" size="sm">+{student.profile.skills.length - 3}</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {student.profile.category !== 'general' && (
                      <Badge variant="purple" size="sm">Diversity</Badge>
                    )}
                    {student.profile.location.isRural && (
                      <Badge variant="info" size="sm">Rural</Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Applications */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Amit Patel', role: 'Full Stack Development', status: 'under-review', time: '2 hours ago', match: 89 },
              { name: 'Sarah Khan', role: 'AI/ML Research', status: 'shortlisted', time: '4 hours ago', match: 94 },
              { name: 'Ravi Kumar', role: 'Full Stack Development', status: 'new', time: '6 hours ago', match: 76 },
              { name: 'Priya Singh', role: 'AI/ML Research', status: 'interview', time: '1 day ago', match: 88 }
            ].map((application, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                    {application.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{application.name}</div>
                    <div className="text-sm text-gray-600">{application.role}</div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge 
                    variant={
                      application.status === 'shortlisted' ? 'success' :
                      application.status === 'interview' ? 'info' :
                      application.status === 'under-review' ? 'warning' : 'default'
                    }
                    size="sm"
                  >
                    {application.status.replace('-', ' ')}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">{application.time}</div>
                  <div className="text-xs text-green-600 font-medium">{application.match}% match</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Active Internships */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Active Internships</h2>
          <Button>Create New Internship</Button>
        </div>

        <div className="grid gap-4">
          {companyInternships.map((internship) => (
            <div key={internship.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{internship.title}</h3>
                  <p className="text-sm text-gray-600">{internship.sector}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-600">Applications</div>
                  <div className="font-semibold">156</div>
                </div>
                <div>
                  <div className="text-gray-600">Positions</div>
                  <div className="font-semibold">{internship.capacity.filled}/{internship.capacity.total}</div>
                </div>
                <div>
                  <div className="text-gray-600">Duration</div>
                  <div className="font-semibold">{internship.duration.months} months</div>
                </div>
                <div>
                  <div className="text-gray-600">Stipend</div>
                  <div className="font-semibold">₹{internship.stipend.amount.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Ends {internship.duration.endDate.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    AI Matching Active
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View Candidates</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompanyDashboard;