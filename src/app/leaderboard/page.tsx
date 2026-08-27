'use client';

import { useState, useEffect } from 'react';
import Leaderboard from '@/components/Leaderboard';
import { authManager } from '@/lib/auth';

export default function LeaderboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authManager.isAuthenticated());
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
        <div className="text-center relative z-10">
          <div className="mb-6 animate-bounce">
            <img src="/logo.jpg" alt="PhishTrainer AI Logo" className="w-32 h-32 mx-auto rounded-2xl shadow-2xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PhishTrainer AI
          </h1>
          <p className="text-xl text-slate-300 mb-8">Please login to view the leaderboard</p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-12 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full p-8">
        <div className="max-w-7xl mx-auto">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
