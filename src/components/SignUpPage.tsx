import { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface SignUpPageProps {
  onSignUp: (name: string) => void;
}

export function SignUpPage({ onSignUp }: SignUpPageProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onSignUp(email.split('@')[0] || 'User');
    } else {
      onSignUp(name || 'User');
    }
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">🍔</div>
            <h1 className="text-2xl">BOGO FINDS</h1>
          </div>

          {/* Illustration Placeholder */}
          <div className="bg-gradient-to-br from-yellow-200 via-orange-100 to-yellow-200 rounded-3xl p-12 mb-8 h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-sm">Illustration Area</p>
              <p className="text-xs">(Insert image here)</p>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-4xl mb-4">WELCOME!</h2>
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
        <div className="bg-gradient-to-br from-orange-200 via-pink-100 to-yellow-100 h-64 flex items-center justify-center relative">
          <button 
            onClick={() => setShowWelcome(true)}
            className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center text-gray-400">
            <p className="text-sm">Image Area</p>
            <p className="text-xs">(Insert image here)</p>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-sm w-full">
            <h2 className="text-4xl text-center mb-2" style={{ color: '#E07B7B' }}>
              Login Now
            </h2>
            <p className="text-center text-gray-400 mb-8">Sign in to your account</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {/* Email */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ava.fammi@gmail.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                    style={{ '--tw-ring-color': '#E07B7B' } as any}
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <button type="button" className="text-xs text-gray-400">
                    Forget Password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full text-white py-4 rounded-2xl transition-all hover:opacity-90 mt-6"
                style={{ backgroundColor: '#E07B7B' }}
              >
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-500 text-sm mb-6">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-coral-400"
                style={{ color: '#E07B7B' }}
              >
                Sign Up
              </button>
            </p>

            {/* Social Login */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Or Login With</p>
              <div className="flex justify-center gap-6">
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                  <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                  <svg className="w-6 h-6" fill="#1DA1F2" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Image Placeholder - Stretches to top */}
      <div className="bg-gradient-to-br from-orange-200 via-pink-100 to-yellow-100 h-64 flex items-center justify-center relative">
        <button 
          onClick={() => setShowWelcome(true)}
          className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center text-gray-400">
          <p className="text-sm">Image Area</p>
          <p className="text-xs">(Insert image here)</p>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h2 className="text-4xl text-center mb-2" style={{ color: '#E07B7B' }}>
            Sign up Now
          </h2>
          <p className="text-center text-gray-400 mb-8">Create account and choose favorite menu</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ava Fami"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Phone Number</label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-coral-400 transition-all"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full text-white py-4 rounded-2xl transition-all hover:opacity-90 mt-6"
              style={{ backgroundColor: '#E07B7B' }}
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mb-6">
            Already have an account?{' '}
            <button
              onClick={() => setIsLogin(true)}
              className="text-coral-400"
              style={{ color: '#E07B7B' }}
            >
              Log in
            </button>
          </p>

          {/* Social Login */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Or sign up With</p>
            <div className="flex justify-center gap-6">
              <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                <svg className="w-6 h-6" fill="#1DA1F2" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}