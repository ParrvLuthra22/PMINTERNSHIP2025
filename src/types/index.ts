export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  aadhaar?: string;
  type: 'student' | 'company' | 'government';
  createdAt: Date;
}

export interface Student extends User {
  type: 'student';
  profile: StudentProfile;
  applications: Application[];
}

export interface StudentProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  category: 'general' | 'sc' | 'st' | 'obc';
  location: {
    state: string;
    district: string;
    isRural: boolean;
  };
  education: {
    degree: string;
    institution: string;
    year: number;
    cgpa: number;
  };
  skills: string[];
  interests: string[];
  experience: string[];
  languages: string[];
  disabilities?: string[];
  resume?: string;
  documents: {
    aadhaar?: string;
    marksheet?: string;
    certificate?: string;
  };
}

export interface Company extends User {
  type: 'company';
  profile: CompanyProfile;
  internships: Internship[];
}

export interface CompanyProfile {
  name: string;
  sector: string;
  size: 'startup' | 'small' | 'medium' | 'large';
  location: {
    headquarters: string;
    branches: string[];
  };
  description: string;
  website?: string;
  verified: boolean;
}

export interface Government extends User {
  type: 'government';
  role: 'admin' | 'district' | 'state' | 'central';
  jurisdiction: {
    level: 'district' | 'state' | 'national';
    area: string;
  };
}

export interface Internship {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  sector: string;
  location: {
    state: string;
    district: string;
    isRemote: boolean;
  };
  duration: {
    months: number;
    startDate: Date;
    endDate: Date;
  };
  stipend: {
    amount: number;
    currency: 'INR';
  };
  capacity: {
    total: number;
    filled: number;
    reserved: {
      sc: number;
      st: number;
      obc: number;
      women: number;
      rural: number;
      disabled: number;
    };
  };
  status: 'draft' | 'active' | 'closed' | 'completed';
  createdAt: Date;
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  status: 'draft' | 'submitted' | 'under-review' | 'shortlisted' | 'selected' | 'rejected';
  matchScore: number;
  dropoutRisk: 'low' | 'medium' | 'high';
  affinityBonus: number;
  appliedAt: Date;
  updatedAt: Date;
}

export interface Match {
  internshipId: string;
  studentId: string;
  skillsScore: number;
  locationScore: number;
  preferenceScore: number;
  affinityScore: number;
  totalScore: number;
  dropoutRisk: number;
  explanation: string[];
}

export interface Analytics {
  overview: {
    totalInternships: number;
    totalApplications: number;
    totalMatches: number;
    completionRate: number;
  };
  demographics: {
    genderDistribution: Record<string, number>;
    categoryDistribution: Record<string, number>;
    locationDistribution: Record<string, number>;
  };
  trends: {
    applications: { month: string; count: number }[];
    matches: { month: string; count: number }[];
    sectors: { name: string; count: number }[];
  };
  heatmaps: {
    skillGaps: { district: string; gap: number; lat: number; lng: number }[];
    dropoutRisk: { district: string; risk: number; lat: number; lng: number }[];
    demandSupply: { district: string; demand: number; supply: number; lat: number; lng: number }[];
  };
}

export interface Language {
  code: 'en' | 'hi';
  name: string;
  nativeName: string;
}