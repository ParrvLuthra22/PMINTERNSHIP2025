import React, { useState, useEffect } from 'react';
import { AuthContext, useAuthState } from './hooks/useAuth';
import { LanguageContext, useLanguageState } from './hooks/useLanguage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import AuthPage from './components/Auth/AuthPage';
import StudentDashboard from './components/Student/StudentDashboard';
import InternshipSearch from './components/Student/InternshipSearch';
import CompanyDashboard from './components/Company/CompanyDashboard';
import GovernmentDashboard from './components/Government/GovernmentDashboard';
import Heatmaps from './components/Government/Heatmaps';
import Card from './components/UI/Card';

function App() {
  const authState = useAuthState();
  const languageState = useLanguageState();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load preferred language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      const lang = languageState.languages.find(l => l.code === savedLang);
      if (lang) languageState.setLanguage(lang);
    }
  }, []);

  const renderContent = () => {
    if (!authState.user) return null;

    switch (authState.user.type) {
      case 'student':
        switch (activeTab) {
          case 'dashboard':
            return <StudentDashboard />;
          case 'internships':
            return <InternshipSearch />;
          case 'applications':
            return (
              <Card className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Applications</h2>
                <p className="text-gray-600">View and track your internship applications</p>
              </Card>
            );
          case 'recommendations':
            return (
              <Card className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Recommendations</h2>
                <p className="text-gray-600">Personalized internship recommendations</p>
              </Card>
            );
          case 'profile':
            return (
              <Card className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile</h2>
                <p className="text-gray-600">Manage your profile and documents</p>
              </Card>
            );
          default:
            return <StudentDashboard />;
        }

      case 'company':
        switch (activeTab) {
          case 'dashboard':
            return <CompanyDashboard />;
          case 'candidates':
            return (
              <Card className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Candidates</h2>
                <p className="text-gray-600">Review and manage candidate applications</p>
              </Card>
            );
          case 'analytics':
            return (
              <Card className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h2>
                <p className="text-gray-600">Performance metrics and insights</p>
              </Card>
            );
          default:
            return <CompanyDashboard />;
        }

      case 'government':
        switch (activeTab) {
          case 'dashboard':
            return <GovernmentDashboard />;
          case 'heatmaps':
            return <Heatmaps />;
          case 'analytics':
            return <GovernmentDashboard />;
          default:
            return <GovernmentDashboard />;
        }

      default:
        return null;
    }
  };

  const getPageTitle = () => {
    if (!authState.user) return 'AI Internship Platform';
    
    const titles: Record<string, string> = {
      dashboard: `${authState.user.type.charAt(0).toUpperCase() + authState.user.type.slice(1)} Dashboard`,
      internships: 'Find Internships',
      applications: 'My Applications',
      recommendations: 'AI Recommendations',
      profile: 'Profile',
      candidates: 'Candidate Management',
      analytics: 'Analytics',
      heatmaps: 'Geographic Analytics',
      students: 'Student Management',
      companies: 'Company Management',
      reports: 'Reports'
    };
    
    return titles[activeTab] || 'Dashboard';
  };

  if (authState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!authState.user) {
    return (
      <AuthContext.Provider value={authState}>
        <LanguageContext.Provider value={languageState}>
          <AuthPage />
        </LanguageContext.Provider>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={authState}>
      <LanguageContext.Provider value={languageState}>
        <div className="min-h-screen bg-gray-50">
          <Header 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
            title={getPageTitle()}
          />
          
          <div className="flex">
            <Sidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              isOpen={sidebarOpen}
            />
            
            <main className="flex-1 lg:ml-0 p-6">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;