'use client';

import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  level: number;
  accuracy: number;
  scenariosCompleted: number;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'all'>('all');

  useEffect(() => {
    // Simuler des données de leaderboard réelles
    // Dans une vraie app, cela viendrait d'une base de données
    const mockLeaderboardData: LeaderboardEntry[] = [
      {
        rank: 1,
        username: 'CyberNinja',
        score: 9850,
        level: 25,
        accuracy: 98.5,
        scenariosCompleted: 342
      },
      {
        rank: 2,
        username: 'SecurityPro',
        score: 9720,
        level: 24,
        accuracy: 97.2,
        scenariosCompleted: 315
      },
      {
        rank: 3,
        username: 'PhishHunter',
        score: 9580,
        level: 23,
        accuracy: 95.8,
        scenariosCompleted: 298
      },
      {
        rank: 4,
        username: 'DataGuard',
        score: 9450,
        level: 22,
        accuracy: 94.5,
        scenariosCompleted: 287
      },
      {
        rank: 5,
        username: 'NetShield',
        score: 9320,
        level: 21,
        accuracy: 93.2,
        scenariosCompleted: 275
      },
      {
        rank: 6,
        username: 'CyberDefender',
        score: 9180,
        level: 20,
        accuracy: 91.8,
        scenariosCompleted: 263
      },
      {
        rank: 7,
        username: 'SecureMind',
        score: 9050,
        level: 19,
        accuracy: 90.5,
        scenariosCompleted: 251
      },
      {
        rank: 8,
        username: 'ThreatStopper',
        score: 8920,
        level: 18,
        accuracy: 89.2,
        scenariosCompleted: 239
      },
      {
        rank: 9,
        username: 'PhishBuster',
        score: 8790,
        level: 17,
        accuracy: 87.9,
        scenariosCompleted: 227
      },
      {
        rank: 10,
        username: 'SafeSurfer',
        score: 8660,
        level: 16,
        accuracy: 86.6,
        scenariosCompleted: 215
      }
    ];

    // Simuler un délai de chargement
    setTimeout(() => {
      setEntries(mockLeaderboardData);
      setLoading(false);
    }, 500);
  }, [timeFilter]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-amber-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-300 to-orange-400';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🏆 Leaderboard
        </h1>
        <p className="text-slate-400 text-lg">Top cybersecurity defenders</p>
      </div>

      {/* Time Filter */}
      <div className="flex justify-center gap-3 mb-8">
        {(['daily', 'weekly', 'all'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              timeFilter === filter
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-6xl animate-bounce">⏳</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Scenarios
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {entries.map((entry) => (
                  <tr
                    key={entry.rank}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(entry.rank)} text-white font-bold text-lg`}>
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold mr-3">
                          {entry.username.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{entry.username}</div>
                          <div className="text-slate-400 text-sm">Level {entry.level}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">⭐</span>
                        <span className="text-white font-medium">{entry.level}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-bold text-lg">
                        {entry.score.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${entry.accuracy}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{entry.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-slate-300">{entry.scenariosCompleted}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Your Position */}
      <div className="mt-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-4xl mr-4">🎯</div>
            <div>
              <div className="text-white font-bold text-lg">Your Position</div>
              <div className="text-slate-400 text-sm">Keep training to climb the ranks!</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-purple-400 font-bold text-2xl">#42</div>
            <div className="text-slate-400 text-sm">2,450 points</div>
          </div>
        </div>
      </div>
    </div>
  );
}
