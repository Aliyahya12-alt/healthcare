import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/store/authStore';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Stethoscope, 
  Users,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import type { UserRole } from '@/types';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  initialRole: UserRole;
  onBack: () => void;
  onSuccess: () => void;
}

export default function AuthPage({ initialMode, initialRole, onBack, onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  
  const { login, signup, googleLogin } = useAuthStore();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (!agreeTerms) {
          setError('Please agree to the terms and conditions');
          setIsLoading(false);
          return;
        }
        const success = await signup(email, password, name, role);
        if (success) {
          setShowVerification(true);
        } else {
          setError('Failed to create account. Please try again.');
        }
      } else {
        const success = await login(email, password, role);
        if (success) {
          onSuccess();
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const success = await googleLogin();
      if (success) {
        onSuccess();
      } else {
        setError('Google login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify Your Email</h2>
            <p className="text-gray-600 mb-6">
              We have sent a verification email to <strong>{email}</strong>. 
              Please check your inbox and click the verification link to complete your registration.
            </p>
            {role === 'doctor' && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <p className="text-sm text-blue-800">
                  <strong>Next Step:</strong> After email verification, you will need to upload your 
                  medical license for admin approval before you can start consulting patients.
                </p>
              </div>
            )}
            <Button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Auth Form */}
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="CareConnect" className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'Sign in to access your CareConnect account' 
                : 'Join our community of patients and doctors'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {/* Role Selection (Signup only) */}
            {mode === 'signup' && (
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">I am signing up as:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('patient')}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      role === 'patient' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Users className={`w-6 h-6 mb-2 ${role === 'patient' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`font-medium ${role === 'patient' ? 'text-blue-600' : 'text-gray-600'}`}>
                      Patient
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('doctor')}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      role === 'doctor' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Stethoscope className={`w-6 h-6 mb-2 ${role === 'doctor' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`font-medium ${role === 'doctor' ? 'text-blue-600' : 'text-gray-600'}`}>
                      Doctor
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Google Login */}
            <Button 
              variant="outline" 
              className="w-full mb-4"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={8}
                    />
                  </div>
                  {mode === 'signup' && (
                    <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                  )}
                </div>

                {mode === 'signup' && (
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                      {role === 'doctor' && (
                        <span className="block mt-1 text-gray-500">
                          I confirm that I am a licensed medical professional and will provide 
                          accurate information about my credentials.
                        </span>
                      )}
                    </Label>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError('');
                  }}
                  className="ml-1 text-blue-600 hover:underline font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
