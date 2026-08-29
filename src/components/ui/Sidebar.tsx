'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  activeTab: 'training' | 'dashboard' | 'leaderboard';
  onTabChange: (tab: 'training' | 'dashboard' | 'leaderboard') => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ activeTab, onTabChange, onCollapsedChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapsedChange) {
      onCollapsedChange(newState);
    }
  };

  const menuItems = [
    { id: 'training' as const, label: 'Training', icon: '🎯', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'dashboard' as const, label: 'Dashboard', icon: '📊', gradient: 'from-purple-500 to-pink-500' },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: '🏆', gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <>
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
              <img src="/images/logo.jpg" alt="PhishTrainer AI Logo" className="w-full h-full object-cover" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">PhishTrainer</h1>
                <p className="text-xs text-slate-400">AI Security</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split('-')[1]}-500/20`
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={handleToggle}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Toggle Button (always visible) */}
      <button
        onClick={handleToggle}
        className="fixed top-6 left-6 z-50 w-10 h-10 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center shadow-lg"
        style={{ left: isCollapsed ? '6rem' : '19rem' }}
      >
        {isCollapsed ? '☰' : '✕'}
      </button>
    </>
  );
}
