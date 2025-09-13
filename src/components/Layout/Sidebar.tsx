import React from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Building2, 
  Users, 
  Settings,
  BookOpen,
  Star,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getMenuItems = () => {
    switch (user?.type) {
      case 'student':
        return [
          { id: 'dashboard', icon: Home, label: t('nav.dashboard') },
          { id: 'profile', icon: User, label: 'Profile' },
          { id: 'internships', icon: Briefcase, label: t('nav.internships') },
          { id: 'applications', icon: FileText, label: t('nav.applications') },
          { id: 'recommendations', icon: Star, label: 'AI Recommendations' },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ];
      case 'company':
        return [
          { id: 'dashboard', icon: Home, label: t('nav.dashboard') },
          { id: 'profile', icon: Building2, label: 'Company Profile' },
          { id: 'internships', icon: Briefcase, label: 'My Internships' },
          { id: 'candidates', icon: Users, label: 'Candidates' },
          { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ];
      case 'government':
        return [
          { id: 'dashboard', icon: Home, label: t('nav.dashboard') },
          { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
          { id: 'heatmaps', icon: MapPin, label: 'Heatmaps' },
          { id: 'internships', icon: Briefcase, label: 'All Internships' },
          { id: 'students', icon: BookOpen, label: 'Students' },
          { id: 'companies', icon: Building2, label: 'Companies' },
          { id: 'reports', icon: FileText, label: 'Reports' },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-200 ease-in-out z-50 lg:z-0
      `}>
        <nav className="h-full px-3 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${
                      activeTab === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="absolute bottom-6 left-3 right-3">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
              <div className="text-xs text-blue-800 font-semibold">AI Internship Platform</div>
              <div className="text-xs text-blue-600 mt-1">Powered by Advanced ML</div>
              <div className="mt-2 text-xs text-gray-500">
                Target: 10M internships by 2029
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;