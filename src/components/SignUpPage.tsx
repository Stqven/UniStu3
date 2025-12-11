import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function SignUpPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Sign up with Supabase and include metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim(),
            phone: phone.trim() || null,
          }
        }
      });
    
      if (authError) throw authError;
    
      // No need to create separate profile - data is in user_metadata
      setMessage('Account created successfully! You can now login.');
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      
    } catch (err: any) {
      // Handle specific error messages
      if (err.message?.includes('already registered')) {
        setError('This email is already registered. Please login instead.');
      } else if (err.message?.includes('password')) {
        setError('Password must be at least 6 characters');
      } else {
        setError(err.message || 'An error occurred during sign up');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;
      
      // Session is automatically managed by Supabase
      // App.tsx will detect the session change via useAuth hook
      
    } catch (err: any) {
      if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please verify your email before logging in');
      } else {
        setError(err.message || 'An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          {/* Logo */}
          {/* <div className="text-center mb-8">
            <div className="text-4xl mb-2">🍔</div>
            <h1 className="text-2xl">BOGO FINDS</h1>
          </div> */}

          {/* Illustration Placeholder */}
          {/* <div className="bg-gradient-to-br from-yellow-200 via-orange-100 to-yellow-200 rounded-3xl p-12 mb-8 h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-sm">Illustration Area</p>
              <p className="text-xs">(Insert image here)</p>
            </div>
          </div> */}

          <div>
             <img
              src="src/components/images/banner.png" 
              alt="banner"
              className="h-24 w-24 mx-auto mb-4 object-contain"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            {/* <h2 className="text-4xl mb-4">WELCOME!</h2> */}
            <p className="text-gray-500">
              Find the best BOGO deals with easy, on-demand discovery
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => {
                setShowWelcome(false);
                setIsLogin(true);
                setError(null);
                setMessage(null);
              }}
              className="w-full bg-coral-400 hover:bg-coral-500 text-white py-4 rounded-2xl transition-all"
              style={{ backgroundColor: '#E07B7B' }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowWelcome(false);
                setIsLogin(false);
                setError(null);
                setMessage(null);
              }}
              className="w-full bg-white text-coral-400 py-4 rounded-2xl border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: '#E07B7B', color: '#E07B7B' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (isLogin) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Image Placeholder - Stretches to top */}
        <div className="flex items-center justify-center relative">
          <button 
            onClick={() => {
              setShowWelcome(true);
              setError(null);
              setMessage(null);
            }}
            className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          {/* <div className="text-center text-gray-400">
            <p className="text-sm">Image Area</p>
            <p className="text-xs">(Insert image here)</p>
          </div> */}
        </div>
{/* 
        <div className='flex justify-center items-center pt-6'>
             <img
              src="src/components/images/banner.png"   // put image in /public
              alt="banner"
              className="h-16 w-auto mx-auto mb-4 object-contain"
            />
          </div> */}

        {/* Content Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-sm w-full">
            <h2 className="text-4xl text-center mb-2" style={{ color: '#E07B7B' }}>
              Login Now
            </h2>
            <p className="text-center text-gray-400 mb-8">Sign in to your account</p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              {/* Email */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="NikolajKim@gmail.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                    style={{ '--tw-ring-color': '#E07B7B' } as any}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <button 
                    type="button" 
                    className="text-xs text-gray-400 hover:text-coral-400 transition-colors"
                    onClick={handlePasswordReset}
                    disabled={loading}
                    style={{ color: loading ? '#9CA3AF' : undefined }}
                  >
                    Forget Password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-4 rounded-2xl transition-all mt-6 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#E07B7B' }}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-500 text-sm mb-6">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                  setMessage(null);
                }}
                className="text-coral-400 hover:underline"
                style={{ color: '#E07B7B' }}
                disabled={loading}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Image Placeholder - Stretches to top */}
      <div className="flex items-center justify-center relative">
        <button 
          onClick={() => {
            setShowWelcome(true);
            setError(null);
            setMessage(null);
          }}
          className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {/* <div className="text-center text-gray-400">
          <p className="text-sm">Image Area</p>
          <p className="text-xs">(Insert image here)</p>
        </div> */}
      </div>

      {/* <div className='flex justify-center items-center pt-6'>
             <img
              src="src/components/images/banner.png"   // put image in /public
              alt="banner"
              className="h-10 sm:h-12 md:h-14 w-auto flex items-center"
            />
          </div> */}

      {/* Content Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h2 className="text-4xl text-center mb-2" style={{ color: '#E07B7B' }}>
            Sign up Now
          </h2>
          <p className="text-center text-gray-400 mb-8">Create account and choose favorite menu</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4 mb-6">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nikolaj Kim"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email address"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                  disabled={loading}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-4 rounded-2xl transition-all mt-6 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              style={{ backgroundColor: '#E07B7B' }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mb-6">
            Already have an account?{' '}
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
                setMessage(null);
              }}
              className="text-coral-400 hover:underline"
              style={{ color: '#E07B7B' }}
              disabled={loading}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}