'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/features/Dashboard';
import TrainingInterface from '@/components/features/TrainingInterface';
import Leaderboard from '@/components/features/Leaderboard';
import Sidebar from '@/components/ui/Sidebar';
import { authManager } from '@/lib/auth/auth';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'training' | 'dashboard' | 'leaderboard'>('training');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authManager.isAuthenticated());
  }, []);

  const handleLogout = () => {
    authManager.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

        <div className="text-center relative z-10">
          <div className="mb-6 animate-bounce">
            <img src="/images/logo.jpg" alt="PhishTrainer AI Logo" className="w-32 h-32 mx-auto rounded-2xl shadow-2xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PhishTrainer AI
          </h1>
          <p className="text-xl text-slate-300 mb-8">Master cybersecurity with AI-powered training</p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-12 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform"
          >
            Get Started
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>

      <div className="relative z-10 flex w-full">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onCollapsedChange={setIsSidebarCollapsed}
        />

        {/* Main Content */}
        <main className={`p-8 transition-all duration-300 flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
          <div className="max-w-7xl mx-auto">
            {activeTab === 'training' ? (
              <TrainingInterface />
            ) : activeTab === 'dashboard' ? (
              <Dashboard />
            ) : (
              <Leaderboard />
            )}
          </div>
        </main>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="fixed top-6 right-6 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transition-all shadow-lg shadow-red-500/20 z-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
