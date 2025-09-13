import React from 'react';
import { Menu, Bell, User, Globe, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage, languages } from '../../hooks/useLanguage';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, title }) => {
  const { user, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <p className="text-xs text-gray-500">भारत सरकार • Government of India</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <div className="relative group">
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-1">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">{currentLanguage.code.toUpperCase()}</span>
          </button>
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-gray-100 transition-colors relative">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* User Menu */}
        <div className="relative group">
          <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">{user?.name}</span>
          </button>
          
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button 
              onClick={logout}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;