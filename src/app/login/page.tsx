'use client';

import { useState } from 'react';
import { authManager } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = authManager.login(username);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } else {
      if (!username || !email) {
        setError('Please fill in all fields');
        return;
      }
      const result = authManager.register(username, email);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-700/50">
          <div className="text-center mb-8">
            <div className="mb-6 animate-bounce">
              <img src="/logo.jpg" alt="PhishTrainer AI Logo" className="w-24 h-24 mx-auto rounded-2xl shadow-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Join PhishTrainer'}
            </h1>
            <p className="text-slate-400 text-lg">
              {isLogin ? 'Login to continue your training' : 'Create an account to start learning'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all"
                placeholder="Enter your username"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 backdrop-blur-sm border border-red-500/50 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-cyan-400 hover:text-cyan-300 font-bold text-lg transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
