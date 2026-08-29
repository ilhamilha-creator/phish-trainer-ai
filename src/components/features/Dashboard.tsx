'use client';

import { progressManager } from '@/lib/progress/user-progress';
import { useEffect, useState } from 'react';

interface Stats {
  level: number;
  xp: number;
  streak: number;
  accuracy: string;
  totalCompleted: number;
  skillLevels: {
    credential_harvesting: number;
    malware: number;
    social_engineering: number;
    business_email_compromise: number;
  };
  currentDifficulty: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    setStats(progressManager.getStats());
  }, []);

  if (!stats) return null;

  const skillLabels = {
    credential_harvesting: 'Credential Harvesting',
    malware: 'Malware Detection',
    social_engineering: 'Social Engineering',
    business_email_compromise: 'Business Email Compromise'
  };

  const skillGradients = {
    credential_harvesting: 'from-red-500 to-pink-500',
    malware: 'from-orange-500 to-yellow-500',
    social_engineering: 'from-purple-500 to-pink-500',
    business_email_compromise: 'from-blue-500 to-cyan-500'
  };

  const skillIcons = {
    credential_harvesting: '🔐',
    malware: '🦠',
    social_engineering: '🎭',
    business_email_compromise: '💼'
  };

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 uppercase tracking-wider">Current Level</p>
              <p className="text-6xl font-bold">{stats.level}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 uppercase tracking-wider">Total XP</p>
              <p className="text-4xl font-bold">{stats.xp}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to next level</span>
              <span className="font-semibold">{stats.xp % 100}/100 XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 backdrop-blur-sm">
              <div 
                className="bg-white rounded-full h-4 transition-all duration-700 shadow-lg shadow-white/30"
                style={{ width: `${stats.xp % 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105 transform">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20">
              🔥
            </div>
            <div>
              <p className="text-sm text-slate-400">Streak</p>
              <p className="text-3xl font-bold text-white">{stats.streak} days</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105 transform">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">
              🎯
            </div>
            <div>
              <p className="text-sm text-slate-400">Accuracy</p>
              <p className="text-3xl font-bold text-white">{stats.accuracy}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105 transform">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-green-500/20">
              ✅
            </div>
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-3xl font-bold text-white">{stats.totalCompleted}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105 transform">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
              📊
            </div>
            <div>
              <p className="text-sm text-slate-400">Difficulty</p>
              <p className="text-xl font-bold text-white capitalize">{stats.currentDifficulty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Levels */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          Skill Levels
        </h3>
        <div className="space-y-5">
          {Object.entries(stats.skillLevels).map(([key, value]) => (
            <div key={key} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skillIcons[key as keyof typeof skillIcons]}</span>
                  <span className="text-white font-medium">{skillLabels[key as keyof typeof skillLabels]}</span>
                </div>
                <span className="font-bold text-white text-lg">{value}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 backdrop-blur-sm">
                <div 
                  className={`bg-gradient-to-r ${skillGradients[key as keyof typeof skillGradients]} rounded-full h-3 transition-all duration-700 shadow-lg`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
