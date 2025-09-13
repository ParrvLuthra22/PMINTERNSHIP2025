import React, { useState } from 'react';
import { Phone, Shield, Users, Building2, Crown, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

const AuthPage: React.FC = () => {
  const [step, setStep] = useState<'select' | 'phone' | 'otp' | 'aadhaar'>('select');
  const [userType, setUserType] = useState<'student' | 'company' | 'government'>('student');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t, currentLanguage } = useLanguage();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login({ phone, otp, aadhaar });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      type: 'student',
      icon: Users,
      title: currentLanguage.code === 'hi' ? 'छात्र' : 'Student',
      description: currentLanguage.code === 'hi' 
        ? 'इंटर्नशिप खोजें और आवेदन करें' 
        : 'Find and apply for internships',
      features: ['AI-powered matching', 'Skill assessments', 'Career guidance', 'Free access']
    },
    {
      type: 'company',
      icon: Building2,
      title: currentLanguage.code === 'hi' ? 'कंपनी' : 'Company',
      description: currentLanguage.code === 'hi' 
        ? 'प्रतिभा खोजें और इंटर्न हायर करें' 
        : 'Find talent and hire interns',
      features: ['Smart candidate matching', 'Bulk applications', 'Analytics dashboard', 'Verified profiles']
    },
    {
      type: 'government',
      icon: Crown,
      title: currentLanguage.code === 'hi' ? 'सरकारी' : 'Government',
      description: currentLanguage.code === 'hi' 
        ? 'नीति और विश्लेषण डैशबोर्ड' 
        : 'Policy and analytics dashboard',
      features: ['National analytics', 'Heatmaps', 'Policy insights', 'Progress tracking']
    }
  ];

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">AI</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('home.title')}
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              {t('home.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>🇮🇳 भारत सरकार</span>
              <span>•</span>
              <span>Government of India</span>
              <span>•</span>
              <span>Secure & Trusted</span>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.type}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    userType === type.type 
                      ? 'ring-2 ring-blue-500 border-blue-300 bg-blue-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setUserType(type.type as any)}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                      userType === type.type 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                    
                    <div className="space-y-2">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={() => setStep('phone')}
              className="px-8 py-3 text-lg flex items-center space-x-2 mx-auto"
              size="lg"
            >
              <span>Continue as {userTypes.find(t => t.type === userType)?.title}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'phone' && 'Enter Your Mobile Number'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'aadhaar' && 'Aadhaar Verification'}
          </h2>
          <p className="text-gray-600">
            {step === 'phone' && 'We\'ll send you a verification code'}
            {step === 'otp' && `Code sent to ${phone}`}
            {step === 'aadhaar' && 'Last step for secure authentication'}
          </p>
        </div>

        <div className="space-y-4">
          {step === 'phone' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <Button 
                onClick={() => setStep('otp')} 
                className="w-full"
                disabled={!phone}
              >
                Send OTP
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                />
              </div>
              <Button 
                onClick={() => setStep('aadhaar')} 
                className="w-full"
                disabled={otp.length !== 6}
              >
                Verify OTP
              </Button>
              <Button variant="ghost" className="w-full text-sm">
                Resend OTP
              </Button>
            </>
          )}

          {step === 'aadhaar' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Number (Optional)
                </label>
                <input
                  type="text"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  placeholder="1234 5678 9012"
                  maxLength={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Required for government schemes and priority matching
                </p>
              </div>
              <Button 
                onClick={handleLogin} 
                className="w-full"
                loading={loading}
              >
                Complete Registration
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogin}
                className="w-full text-sm"
                disabled={loading}
              >
                Skip for now
              </Button>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secured by DigiLocker & Aadhaar</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;