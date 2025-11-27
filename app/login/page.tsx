"use client"
import { useState } from 'react';
import { VT323 } from 'next/font/google';
const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
});


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add Google OAuth logic here
  };

  return (
    <div className={vt323.className}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Two-tone background */}
        <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0" style={{ height: '50%', backgroundColor: '#68A0A0' }}></div>
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '50%', backgroundColor: '#B9D6D6' }}></div>
            <div className="absolute left-0 right-0" style={{ 
            top: '50%', 
            height: '8px', 
            backgroundColor: '#fff',
            transform: 'translateY(-50%)'
            }}></div>
        </div>
        {/* Navigation Bar */}
        <nav className="relative z-10 px-8 flex justify-between items-center bg-gray-800" style={{ height: '50px' }}>
            {/* Logo */}
            <div>
            <img src="/pokedoro-title.svg" 
                alt="Pokedoro" 
                style={{ height: '40px', width: 'auto' }}
            />
            </div>

            {/* Right Navigation Items */}
            <div className="flex items-center space-x-6">
            <button className="text-white font-semibold text-lg hover:opacity-80 transition-opacity uppercase tracking-wide">
                Settings
            </button>
            <button className="text-white font-semibold text-lg hover:opacity-80 transition-opacity uppercase tracking-wide">
                Login
            </button>
            </div>
        </nav>

        {/* Login Form Container */}
        <div className="relative z-10 flex items-center justify-center px-4" style={{ marginTop: '8vh', minHeight: 'calc(100vh - 50px - 8vh)' }}>
          <div style={{ width: '350px' }}>
            {/* Pokedoro Logo Image */}
            <div className="text-center mb-12">
              <img 
                src="/pokedoro-title.svg" 
                alt="Pokedoro" 
                className="mx-auto"
                style={{ maxWidth: '400px', height: 'auto' }}
              />
            </div>

            {/* Login Card */}
            <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 backdrop-blur-sm" style={{
              border: '3px solid rgba(255, 255, 255, 0.5)',
              width: '350px'
            }}>
              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 mb-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Login with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                  style={{ backgroundColor: '#EFEFEF' }}
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                  style={{ backgroundColor: '#EFEFEF' }}
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors uppercase tracking-wide mb-4"
              >
                Login
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700 underline">
                  Forgot Password
                </a>
              </div>
            </div>

            {/* Sign Up Section */}
            <div className="text-center mt-6 text-white">
              <p className="text-sm">
                Do not have an account?{' '}
                <a href="#" className="font-semibold underline hover:opacity-80">
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}