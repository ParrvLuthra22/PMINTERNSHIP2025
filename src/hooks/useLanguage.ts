import { useState, createContext, useContext } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
];

const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.internships': 'Internships',
    'nav.applications': 'Applications',
    'nav.analytics': 'Analytics',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.phone': 'Phone Number',
    'auth.otp': 'Enter OTP',
    'auth.aadhaar': 'Aadhaar Number',
    'home.title': 'AI-Powered Internship Matchmaking',
    'home.subtitle': 'Connecting talent with opportunities across India',
    'student.dashboard': 'Student Dashboard',
    'company.dashboard': 'Company Dashboard',
    'government.dashboard': 'Government Dashboard',
    'skills.match': 'Skill Match',
    'apply.now': 'Apply Now',
    'view.details': 'View Details'
  },
  hi: {
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.internships': 'इंटर्नशिप',
    'nav.applications': 'आवेदन',
    'nav.analytics': 'विश्लेषण',
    'auth.login': 'लॉगिन',
    'auth.register': 'रजिस्टर करें',
    'auth.phone': 'फोन नंबर',
    'auth.otp': 'OTP दर्ज करें',
    'auth.aadhaar': 'आधार नंबर',
    'home.title': 'AI-संचालित इंटर्नशिप मैचमेकिंग',
    'home.subtitle': 'भारत भर में प्रतिभा को अवसरों से जोड़ना',
    'student.dashboard': 'छात्र डैशबोर्ड',
    'company.dashboard': 'कंपनी डैशबोर्ड',
    'government.dashboard': 'सरकारी डैशबोर्ड',
    'skills.match': 'कौशल मैच',
    'apply.now': 'अभी आवेदन करें',
    'view.details': 'विवरण देखें'
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageState = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang.code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  return { currentLanguage, setLanguage, t, languages };
};

export { LanguageContext, languages };