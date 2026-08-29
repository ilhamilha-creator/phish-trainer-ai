'use client';

import { useState, useEffect } from 'react';
import { PhishingScenario, ScenarioResult } from '@/types';
import { progressManager } from '@/lib/progress/user-progress';

type GameState = 'intro' | 'question' | 'feedback' | 'complete' | 'loading';

export default function TrainingInterface() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentScenario, setCurrentScenario] = useState<PhishingScenario | null>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSuspiciousParts, setSelectedSuspiciousParts] = useState<string[]>([]);
  const [aiFeedback, setAiFeedback] = useState<any>(null);

  const generateScenario = async () => {
    setIsGenerating(true);
    setGameState('loading');
    
    const progress = progressManager.getProgress();
    
    // Randomly decide if phishing or legitimate (70% phishing for training)
    const isPhishing = Math.random() < 0.7;
    
    // Randomly select type and category
    const types: ('email' | 'sms' | 'link' | 'email_pro' | 'sms_banque' | 'social_network')[] = 
      ['email', 'sms', 'link', 'email_pro', 'sms_banque', 'social_network'];
    const categories: ('credential_harvesting' | 'malware' | 'social_engineering' | 'business_email_compromise')[] = 
      ['credential_harvesting', 'malware', 'social_engineering', 'business_email_compromise'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          difficulty: progress.currentDifficulty,
          category,
          userLevel: progress.currentLevel,
          userSkillLevels: progress.skillLevels,
          isPhishing
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate scenario');
      }
      
      const scenario = await response.json();
      setCurrentScenario(scenario);
      setGameState('question');
      setUserAnswer(null);
      setStartTime(Date.now());
      setShowExplanation(false);
    } catch (error) {
      console.error('Error generating scenario:', error);
      // Fallback to static scenario if AI fails
      const { getRandomScenario } = await import('@/lib/data/phishing-data');
      const fallbackScenario = getRandomScenario(progress.currentDifficulty);
      setCurrentScenario(fallbackScenario);
      setGameState('question');
      setUserAnswer(null);
      setStartTime(Date.now());
      setShowExplanation(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const startScenario = () => {
    generateScenario();
  };

  const toggleSuspiciousPart = (part: string) => {
    setSelectedSuspiciousParts(prev => 
      prev.includes(part) 
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };

  const submitAnswer = async (answer: boolean) => {
    if (!currentScenario) return;
    
    const time = (Date.now() - startTime) / 1000;
    setTimeTaken(time);
    setUserAnswer(answer);
    
    const isCorrect = answer === currentScenario.isPhishing;
    
    const result: ScenarioResult = {
      scenarioId: currentScenario.id,
      userAnswer: answer,
      correct: isCorrect,
      timeTaken: time,
      difficulty: currentScenario.difficulty,
      category: currentScenario.category
    };
    
    progressManager.submitAnswer(result);
    
    // Generate AI feedback
    try {
      const feedbackResponse = await fetch('/api/generate-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: currentScenario,
          userAnswer: answer,
          isCorrect,
          selectedSuspiciousParts
        })
      });
      
      if (feedbackResponse.ok) {
        const feedbackData = await feedbackResponse.json();
        setAiFeedback(feedbackData);
      }
    } catch (error) {
      console.error('Error generating AI feedback:', error);
    }
    
    setGameState('feedback');
  };

  const continueTraining = () => {
    setGameState('question');
    setSelectedSuspiciousParts([]);
    setAiFeedback(null);
    startScenario();
  };

  const resetToIntro = () => {
    setGameState('intro');
    setCurrentScenario(null);
    setSelectedSuspiciousParts([]);
    setAiFeedback(null);
  };

  if (gameState === 'intro') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-6 animate-bounce">
            <img src="/images/logo.jpg" alt="PhishTrainer AI Logo" className="w-32 h-32 mx-auto rounded-2xl shadow-2xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PhishTrainer AI
          </h1>
          <p className="text-xl text-slate-300 mb-4">Master cybersecurity with AI-powered training</p>
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium">
            <span>🤖</span>
            <span>AI-Generated Scenarios</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 mb-6">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            How it works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">AI generates unique scenarios</h3>
                <p className="text-slate-400">Each training session features custom-generated emails, SMS, and links</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Adaptive difficulty</h3>
                <p className="text-slate-400">The AI adjusts complexity based on your skill level and performance</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Make your decision</h3>
                <p className="text-slate-400">Analyze each scenario and decide if it's legitimate or phishing</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Learn and improve</h3>
                <p className="text-slate-400">Get instant feedback with detailed explanations and watch your skills grow</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={startScenario}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-5 px-8 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Generating Scenario...
            </span>
          ) : (
            'Start Training'
          )}
        </button>
      </div>
    );
  }

  if (gameState === 'loading') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 text-center">
          <div className="text-8xl mb-6 animate-bounce">🤖</div>
          <h2 className="text-3xl font-bold text-white mb-3">Generating Scenario</h2>
          <p className="text-slate-400 mb-6">Our AI is creating a unique phishing scenario for you...</p>
          <div className="w-full bg-slate-700/50 rounded-full h-3 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full animate-pulse shadow-lg shadow-blue-500/30" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'question' && currentScenario) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
              currentScenario.difficulty === 'beginner' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
              currentScenario.difficulty === 'intermediate' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
              'bg-gradient-to-r from-red-500 to-pink-500 text-white'
            }`}>
              {currentScenario.difficulty}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              {currentScenario.type}
            </span>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            {currentScenario.category.replace(/_/g, ' ')}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 mb-6">
          <h2 className="text-3xl font-bold text-white mb-6">{currentScenario.title}</h2>
          
          {currentScenario.type === 'email' || currentScenario.type === 'email_pro' ? (
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
              <div 
                className="whitespace-pre-wrap font-mono text-sm text-slate-300 cursor-pointer"
                onClick={(e) => {
                  const selection = window.getSelection();
                  if (selection && selection.toString().trim()) {
                    toggleSuspiciousPart(selection.toString());
                  }
                }}
              >
                {currentScenario.content}
              </div>
              {selectedSuspiciousParts.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-xl">
                  <p className="text-yellow-400 text-sm font-medium">
                    Selected suspicious parts: {selectedSuspiciousParts.length}
                  </p>
                  <div className="mt-2 space-y-1">
                    {selectedSuspiciousParts.map((part, idx) => (
                      <div key={idx} className="text-xs text-yellow-300 bg-yellow-900/50 p-2 rounded">
                        "{part}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : currentScenario.type === 'sms' || currentScenario.type === 'sms_banque' ? (
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-6 border border-blue-700/50 max-w-md mx-auto">
              <div 
                className="text-sm text-slate-300 cursor-pointer"
                onClick={(e) => {
                  const selection = window.getSelection();
                  if (selection && selection.toString().trim()) {
                    toggleSuspiciousPart(selection.toString());
                  }
                }}
              >
                {currentScenario.content}
              </div>
              {selectedSuspiciousParts.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-xl">
                  <p className="text-yellow-400 text-sm font-medium">
                    Selected suspicious parts: {selectedSuspiciousParts.length}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
              <div 
                className="font-mono text-sm text-cyan-400 break-all cursor-pointer"
                onClick={(e) => {
                  const selection = window.getSelection();
                  if (selection && selection.toString().trim()) {
                    toggleSuspiciousPart(selection.toString());
                  }
                }}
              >
                {currentScenario.content}
              </div>
              {selectedSuspiciousParts.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-xl">
                  <p className="text-yellow-400 text-sm font-medium">
                    Selected suspicious parts: {selectedSuspiciousParts.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => submitAnswer(false)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transform"
          >
            ✅ Legitimate
          </button>
          <button
            onClick={() => submitAnswer(true)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transform"
          >
            🚨 Phishing
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'feedback' && currentScenario) {
    const isCorrect = userAnswer === currentScenario.isPhishing;
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-3xl p-8 mb-6 border-2 backdrop-blur-sm ${
          isCorrect 
            ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50' 
            : 'bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/50'
        }`}>
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">
              {isCorrect ? '🎉' : '😔'}
            </div>
            <h2 className={`text-4xl font-bold mb-3 ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h2>
            <p className="text-slate-300 text-lg">
              {isCorrect 
                ? `Great job! You earned ${Math.round(10 * (currentScenario.difficulty === 'beginner' ? 1 : currentScenario.difficulty === 'intermediate' ? 2 : 3))} XP`
                : `This was actually ${currentScenario.isPhishing ? 'phishing' : 'legitimate'}`
              }
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-slate-700/50">
            <h3 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Explanation
            </h3>
            {aiFeedback ? (
              <div>
                <p className="text-slate-300 mb-4">{aiFeedback.feedback}</p>
                {aiFeedback.score && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-500/30">
                    <p className="text-blue-400 font-bold text-lg">Score: {aiFeedback.score}/100</p>
                  </div>
                )}
                {aiFeedback.tips && aiFeedback.tips.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <span>📚</span>
                      Tips for improvement:
                    </h4>
                    <ul className="space-y-2">
                      {aiFeedback.tips.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span className="text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-3 text-sm text-cyan-400 font-medium flex items-center gap-2">
                  <span>🤖</span>
                  <span>AI-generated personalized feedback</span>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-slate-300">{currentScenario.explanation}</p>
                {(currentScenario as any).generated && (
                  <div className="mt-3 text-sm text-cyan-400 font-medium flex items-center gap-2">
                    <span>🤖</span>
                    <span>AI-generated scenario</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {currentScenario.indicators && currentScenario.indicators.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Key Indicators
              </h3>
              <ul className="space-y-3">
                {currentScenario.indicators.map((indicator, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1 text-xl">⚠️</span>
                    <span className="text-slate-300">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={continueTraining}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transform"
          >
            Continue Training
          </button>
          <button
            onClick={resetToIntro}
            className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600/50 text-slate-300 py-5 px-8 rounded-2xl font-bold text-lg hover:bg-slate-700/50 hover:text-white transition-all"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return null;
}
