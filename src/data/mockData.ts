import { Student, Company, Government, Internship, Application, Analytics } from '../types';

export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Priya Kumari',
    email: 'priya@example.com',
    phone: '+91-9876543210',
    aadhaar: '1234-5678-9012',
    type: 'student',
    createdAt: new Date('2024-01-15'),
    profile: {
      age: 20,
      gender: 'female',
      category: 'general',
      location: {
        state: 'Uttar Pradesh',
        district: 'Lucknow',
        isRural: false
      },
      education: {
        degree: 'B.Tech Computer Science',
        institution: 'IIT Lucknow',
        year: 2025,
        cgpa: 8.5
      },
      skills: ['JavaScript', 'React', 'Python', 'Data Analysis'],
      interests: ['Technology', 'AI/ML', 'Web Development'],
      experience: ['College Projects', 'Hackathon Winner'],
      languages: ['English', 'Hindi'],
      documents: {
        aadhaar: 'aadhaar1.pdf',
        marksheet: 'marksheet1.pdf'
      }
    },
    applications: []
  },
  {
    id: 'student2',
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '+91-9876543211',
    type: 'student',
    createdAt: new Date('2024-01-20'),
    profile: {
      age: 21,
      gender: 'male',
      category: 'sc',
      location: {
        state: 'Bihar',
        district: 'Patna',
        isRural: true
      },
      education: {
        degree: 'BCA',
        institution: 'Patna University',
        year: 2024,
        cgpa: 7.2
      },
      skills: ['Java', 'Spring Boot', 'Database Management'],
      interests: ['Backend Development', 'Software Engineering'],
      experience: ['Academic Projects'],
      languages: ['Hindi', 'English']
    },
    applications: []
  }
];

export const mockCompanies: Company[] = [
  {
    id: 'company1',
    name: 'TechCorp India',
    email: 'hr@techcorp.com',
    phone: '+91-11-12345678',
    type: 'company',
    createdAt: new Date('2023-12-01'),
    profile: {
      name: 'TechCorp India',
      sector: 'Information Technology',
      size: 'large',
      location: {
        headquarters: 'Bangalore, Karnataka',
        branches: ['Mumbai', 'Delhi', 'Chennai', 'Pune']
      },
      description: 'Leading technology company specializing in software development and AI solutions.',
      website: 'https://techcorp.com',
      verified: true
    },
    internships: []
  },
  {
    id: 'company2',
    name: 'GreenEnergy Solutions',
    email: 'careers@greenenergy.com',
    phone: '+91-22-87654321',
    type: 'company',
    createdAt: new Date('2023-11-15'),
    profile: {
      name: 'GreenEnergy Solutions',
      sector: 'Renewable Energy',
      size: 'medium',
      location: {
        headquarters: 'Mumbai, Maharashtra',
        branches: ['Pune', 'Ahmedabad']
      },
      description: 'Innovative renewable energy solutions for sustainable development.',
      verified: true
    },
    internships: []
  }
];

export const mockInternships: Internship[] = [
  {
    id: 'internship1',
    companyId: 'company1',
    title: 'Full Stack Development Internship',
    description: 'Work on cutting-edge web applications using modern frameworks and technologies.',
    requirements: [
      'Currently pursuing B.Tech/MCA',
      'Strong programming fundamentals',
      'Familiarity with web technologies'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Database Management'],
    sector: 'Information Technology',
    location: {
      state: 'Karnataka',
      district: 'Bangalore Urban',
      isRemote: true
    },
    duration: {
      months: 6,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-08-31')
    },
    stipend: {
      amount: 25000,
      currency: 'INR'
    },
    capacity: {
      total: 50,
      filled: 12,
      reserved: {
        sc: 8,
        st: 4,
        obc: 13,
        women: 17,
        rural: 10,
        disabled: 2
      }
    },
    status: 'active',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'internship2',
    companyId: 'company1',
    title: 'AI/ML Research Internship',
    description: 'Join our research team to work on machine learning projects and data analysis.',
    requirements: [
      'Strong mathematical background',
      'Experience with Python',
      'Understanding of ML algorithms'
    ],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
    sector: 'Information Technology',
    location: {
      state: 'Karnataka',
      district: 'Bangalore Urban',
      isRemote: false
    },
    duration: {
      months: 4,
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-07-31')
    },
    stipend: {
      amount: 30000,
      currency: 'INR'
    },
    capacity: {
      total: 20,
      filled: 3,
      reserved: {
        sc: 3,
        st: 2,
        obc: 5,
        women: 7,
        rural: 4,
        disabled: 1
      }
    },
    status: 'active',
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'internship3',
    companyId: 'company2',
    title: 'Renewable Energy Engineering Internship',
    description: 'Work on solar and wind energy projects, contributing to sustainable development goals.',
    requirements: [
      'Engineering background preferred',
      'Interest in renewable energy',
      'Analytical skills'
    ],
    skills: ['Project Management', 'Data Analysis', 'Technical Writing'],
    sector: 'Renewable Energy',
    location: {
      state: 'Maharashtra',
      district: 'Mumbai',
      isRemote: false
    },
    duration: {
      months: 3,
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-07-31')
    },
    stipend: {
      amount: 18000,
      currency: 'INR'
    },
    capacity: {
      total: 15,
      filled: 2,
      reserved: {
        sc: 2,
        st: 1,
        obc: 4,
        women: 5,
        rural: 3,
        disabled: 1
      }
    },
    status: 'active',
    createdAt: new Date('2024-01-18')
  }
];

export const mockAnalytics: Analytics = {
  overview: {
    totalInternships: 1247,
    totalApplications: 15678,
    totalMatches: 8945,
    completionRate: 78.5
  },
  demographics: {
    genderDistribution: {
      'Male': 58,
      'Female': 40,
      'Other': 2
    },
    categoryDistribution: {
      'General': 35,
      'OBC': 27,
      'SC': 22,
      'ST': 16
    },
    locationDistribution: {
      'Urban': 62,
      'Rural': 38
    }
  },
  trends: {
    applications: [
      { month: 'Jan', count: 1200 },
      { month: 'Feb', count: 1800 },
      { month: 'Mar', count: 2100 },
      { month: 'Apr', count: 2500 },
      { month: 'May', count: 2200 },
      { month: 'Jun', count: 1900 }
    ],
    matches: [
      { month: 'Jan', count: 800 },
      { month: 'Feb', count: 1200 },
      { month: 'Mar', count: 1400 },
      { month: 'Apr', count: 1600 },
      { month: 'May', count: 1500 },
      { month: 'Jun', count: 1300 }
    ],
    sectors: [
      { name: 'IT', count: 4500 },
      { name: 'Finance', count: 2800 },
      { name: 'Healthcare', count: 2200 },
      { name: 'Manufacturing', count: 1800 },
      { name: 'Education', count: 1500 }
    ]
  },
  heatmaps: {
    skillGaps: [
      { district: 'Bangalore Urban', gap: 25, lat: 12.9716, lng: 77.5946 },
      { district: 'Mumbai', gap: 35, lat: 19.0760, lng: 72.8777 },
      { district: 'Delhi', gap: 30, lat: 28.7041, lng: 77.1025 },
      { district: 'Chennai', gap: 20, lat: 13.0827, lng: 80.2707 },
      { district: 'Patna', gap: 60, lat: 25.5941, lng: 85.1376 }
    ],
    dropoutRisk: [
      { district: 'Rural Bihar', risk: 45, lat: 25.0961, lng: 85.3131 },
      { district: 'Rural UP', risk: 40, lat: 26.8467, lng: 80.9462 },
      { district: 'Urban Maharashtra', risk: 15, lat: 19.7515, lng: 75.7139 },
      { district: 'Urban Karnataka', risk: 12, lat: 15.3173, lng: 75.7139 }
    ],
    demandSupply: [
      { district: 'Bangalore Urban', demand: 5000, supply: 3500, lat: 12.9716, lng: 77.5946 },
      { district: 'Mumbai', demand: 4500, supply: 4200, lat: 19.0760, lng: 72.8777 },
      { district: 'Delhi', demand: 4000, supply: 3800, lat: 28.7041, lng: 77.1025 },
      { district: 'Patna', demand: 800, supply: 200, lat: 25.5941, lng: 85.1376 }
    ]
  }
};
